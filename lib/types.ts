export type Json = string | number | boolean | null | { [key: string]: Json } | Json[];

export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string;
          email: string;
          stripe_customer_id: string | null;
          subscription_status: "free" | "active" | "canceled" | "past_due";
          created_at: string;
        };
        Insert: {
          id: string;
          email: string;
          stripe_customer_id?: string | null;
          subscription_status?: "free" | "active" | "canceled" | "past_due";
          created_at?: string;
        };
        Update: {
          stripe_customer_id?: string | null;
          subscription_status?: "free" | "active" | "canceled" | "past_due";
        };
      };
      businesses: {
        Row: {
          id: string;
          user_id: string;
          name: string;
          industry: string;
          created_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          name: string;
          industry: string;
        };
        Update: {
          name?: string;
          industry?: string;
        };
      };
      generated_ads: {
        Row: {
          id: string;
          user_id: string;
          business_id: string | null;
          prompt_input: {
            product: string;
            offer: string;
            platform: Platform;
          };
          ad_result: string;
          created_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          business_id?: string | null;
          prompt_input: {
            product: string;
            offer: string;
            platform: Platform;
          };
          ad_result: string;
        };
        Update: never;
      };
    };
  };
}

export type Platform = "Facebook" | "Instagram" | "WhatsApp";

export interface AdFormInput {
  product: string;
  offer: string;
  platform: Platform;
}

export interface GeneratedAd {
  id: string;
  ad_result: string;
  prompt_input: AdFormInput;
  created_at: string;
}
