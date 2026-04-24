import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import type { Platform } from "@/lib/types";

const FREE_TIER_LIMIT = 5;

export async function POST(req: NextRequest) {
  try {
    // Auth check
    const supabase = createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json({ error: "No autorizado." }, { status: 401 });
    }

    // Payload validation
    const body = await req.json();
    const { product, offer, platform } = body as {
      product?: string;
      offer?: string;
      platform?: Platform;
    };

    if (!product?.trim() || !offer?.trim() || !platform) {
      return NextResponse.json(
        { error: "Faltan campos requeridos." },
        { status: 400 }
      );
    }

    const validPlatforms: Platform[] = ["Facebook", "Instagram", "WhatsApp"];
    if (!validPlatforms.includes(platform)) {
      return NextResponse.json({ error: "Plataforma inválida." }, { status: 400 });
    }

    // Free tier check
    const { data: profile } = await supabase
      .from("profiles")
      .select("subscription_status")
      .eq("id", user.id)
      .single();

    if (profile?.subscription_status !== "active") {
      const { count } = await supabase
        .from("generated_ads")
        .select("id", { count: "exact", head: true })
        .eq("user_id", user.id)
        .gte(
          "created_at",
          new Date(new Date().getFullYear(), new Date().getMonth(), 1).toISOString()
        );

      if ((count ?? 0) >= FREE_TIER_LIMIT) {
        return NextResponse.json(
          {
            error:
              "Alcanzaste el límite de 5 anuncios gratuitos este mes. Actualizá a Pro para generar ilimitados.",
          },
          { status: 402 }
        );
      }
    }

    // Generate the ad — try n8n webhook first, fall back to OpenAI directly
    const adText = await generateAd({ product, offer, platform });

    // Persist to Supabase
    await supabase.from("generated_ads").insert({
      user_id: user.id,
      prompt_input: { product, offer, platform },
      ad_result: adText,
    });

    return NextResponse.json({ adText });
  } catch (err) {
    console.error("[generate-ad]", err);
    return NextResponse.json(
      { error: "Error interno. Intentá de nuevo en un momento." },
      { status: 500 }
    );
  }
}

async function generateAd({
  product,
  offer,
  platform,
}: {
  product: string;
  offer: string;
  platform: Platform;
}): Promise<string> {
  // Route 1: n8n webhook (preferred — processes via n8n flow and saves to Supabase there too)
  const n8nUrl = process.env.N8N_WEBHOOK_URL;
  if (n8nUrl) {
    const n8nRes = await fetch(n8nUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ product, offer, platform }),
    });

    if (n8nRes.ok) {
      const data = await n8nRes.json();
      const adText: string = data.adText ?? data.ad_text ?? data.output ?? data.result;
      if (adText) return adText;
    }
  }

  // Route 2: OpenAI directly (fallback when n8n is not configured)
  const openaiKey = process.env.OPENAI_API_KEY;
  if (!openaiKey) {
    throw new Error("No hay servicio de IA configurado.");
  }

  const prompt = buildPrompt({ product, offer, platform });

  const openaiRes = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${openaiKey}`,
    },
    body: JSON.stringify({
      model: "gpt-4o-mini",
      messages: [{ role: "user", content: prompt }],
      max_tokens: 400,
      temperature: 0.8,
    }),
  });

  if (!openaiRes.ok) {
    const err = await openaiRes.text();
    throw new Error(`OpenAI error: ${err}`);
  }

  const openaiData = await openaiRes.json();
  return openaiData.choices[0].message.content.trim();
}

function buildPrompt({
  product,
  offer,
  platform,
}: {
  product: string;
  offer: string;
  platform: Platform;
}): string {
  const platformHints: Record<Platform, string> = {
    Facebook: "texto más largo (4-6 párrafos), con emojis moderados y llamada a la acción clara",
    Instagram:
      "texto corto y visual (2-3 párrafos), con emojis expresivos y hashtags relevantes al final",
    WhatsApp:
      "mensaje directo y conversacional (2-3 oraciones), como si viniera de un amigo de confianza, con un enlace o número de contacto al final",
  };

  return `Actúa como un experto en marketing directo especializado en el mercado costarricense.

Crea un anuncio persuasivo para ${platform} con las siguientes características:
- Formato: ${platformHints[platform]}
- Producto/Servicio: ${product}
- Oferta/Promoción: ${offer}
- Público: dueños de locales y emprendedores en Costa Rica

Usa la estructura AIDA:
1. ATENCIÓN: Abre con una pregunta o frase impactante que llame la atención del público costarricense.
2. INTERÉS: Presenta el producto/servicio de manera atractiva.
3. DESEO: Destaca los beneficios y la oferta especial, creando urgencia.
4. ACCIÓN: Cierra con una llamada a la acción clara (llamar, escribir al WhatsApp, visitar el local).

Tono: profesional pero cercano y auténtico, usando expresiones naturales del español de Costa Rica cuando sea apropiado.

Escribe solo el texto del anuncio, sin explicaciones adicionales.`;
}
