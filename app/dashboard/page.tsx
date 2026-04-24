import { createClient } from "@/lib/supabase/server";
import DashboardClient from "@/components/dashboard/DashboardClient";
import type { GeneratedAd } from "@/lib/types";

export default async function DashboardPage() {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const { data: recentAds } = await supabase
    .from("generated_ads")
    .select("id, ad_result, prompt_input, created_at")
    .eq("user_id", user!.id)
    .order("created_at", { ascending: false })
    .limit(10);

  const { data: profile } = await supabase
    .from("profiles")
    .select("subscription_status")
    .eq("id", user!.id)
    .single();

  const adsThisMonth = recentAds?.length ?? 0;
  const isPro = profile?.subscription_status === "active";

  return (
    <DashboardClient
      initialAds={(recentAds as GeneratedAd[]) ?? []}
      adsThisMonth={adsThisMonth}
      isPro={isPro}
    />
  );
}
