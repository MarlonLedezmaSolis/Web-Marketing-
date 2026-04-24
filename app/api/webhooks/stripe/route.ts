import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

// Stripe webhook handler — updates subscription status in profiles table
export async function POST(req: NextRequest) {
  const sig = req.headers.get("stripe-signature");
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

  if (!sig || !webhookSecret) {
    return NextResponse.json({ error: "Missing signature" }, { status: 400 });
  }

  let event: { type: string; data: { object: Record<string, unknown> } };

  try {
    // In production use the official stripe library: stripe.webhooks.constructEvent(body, sig, webhookSecret)
    // Here we parse the raw body and trust the signature check above as a placeholder
    const body = await req.text();
    event = JSON.parse(body);
  } catch {
    return NextResponse.json({ error: "Invalid payload" }, { status: 400 });
  }

  const supabase = createClient();
  const obj = event.data.object as Record<string, unknown>;

  switch (event.type) {
    case "customer.subscription.created":
    case "customer.subscription.updated": {
      const customerId = obj.customer as string;
      const status = obj.status as string;
      const mappedStatus =
        status === "active"
          ? "active"
          : status === "canceled"
          ? "canceled"
          : "past_due";

      await supabase
        .from("profiles")
        .update({ subscription_status: mappedStatus })
        .eq("stripe_customer_id", customerId);
      break;
    }

    case "customer.subscription.deleted": {
      const customerId = obj.customer as string;
      await supabase
        .from("profiles")
        .update({ subscription_status: "canceled" })
        .eq("stripe_customer_id", customerId);
      break;
    }
  }

  return NextResponse.json({ received: true });
}
