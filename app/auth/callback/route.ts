import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url);
  const code = searchParams.get("code");
  const next = searchParams.get("next") ?? "/dashboard";

  // Supabase can send error details in the URL (e.g. expired link)
  const urlError = searchParams.get("error_description") ?? searchParams.get("error");
  if (urlError) {
    return NextResponse.redirect(
      `${origin}/login?error=${encodeURIComponent(urlError)}`
    );
  }

  if (!code) {
    return NextResponse.redirect(
      `${origin}/login?error=${encodeURIComponent("Enlace inválido. Solicitá uno nuevo.")}`
    );
  }

  const cookieStore = cookies();

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll();
        },
        setAll(cookiesToSet: { name: string; value: string; options?: Record<string, unknown> }[]) {
          cookiesToSet.forEach(({ name, value, options }) =>
            cookieStore.set(name, value, options as Parameters<typeof cookieStore.set>[2])
          );
        },
      },
    }
  );

  const { error } = await supabase.auth.exchangeCodeForSession(code);

  if (error) {
    return NextResponse.redirect(
      `${origin}/login?error=${encodeURIComponent(
        error.message.includes("expired")
          ? "El enlace expiró. Solicitá uno nuevo desde el login."
          : "No se pudo verificar tu sesión. Intentá de nuevo."
      )}`
    );
  }

  // Sesión establecida — redirigir al destino
  return NextResponse.redirect(`${origin}${next}`);
}
