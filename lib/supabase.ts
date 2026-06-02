import { createClient, SupabaseClient } from "@supabase/supabase-js";

export type DashboardMetrics = {
  visitors: number;
  countries: string[];
  contactMessages: number;
  aiInteractions: number;
  recentInteractions: string[];
};

export function getSupabaseAdminClient() {
  const url = process.env.SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!url || !key) {
    return null;
  }

  return createClient(url, key, {
    auth: {
      persistSession: false,
      autoRefreshToken: false
    }
  });
}

async function countRows(supabase: SupabaseClient, table: string) {
  const response = await supabase.from(table).select("*", { head: true, count: "exact" });
  if (response.error) {
    return 0;
  }

  return response.count ?? 0;
}

async function fetchDistinctCountries(supabase: SupabaseClient) {
  const candidateTables = ["visitors", "visitor_sessions", "analytics_events"];

  for (const table of candidateTables) {
    const response = await supabase.from(table).select("country");
    if (response.error || !response.data) {
      continue;
    }

    const countries = response.data
      .map((row: any) => row.country)
      .filter(Boolean)
      .map((country: string) => country.trim()) as string[];

    if (countries.length > 0) {
      return Array.from(new Set(countries));
    }
  }

  return [];
}

export async function getDashboardMetrics(): Promise<DashboardMetrics> {
  const supabase = getSupabaseAdminClient();

  if (!supabase) {
    return {
      visitors: 0,
      countries: [],
      contactMessages: 0,
      aiInteractions: 0,
      recentInteractions: []
    };
  }

  const [contactMessages, aiInteractions, visitors, countriesResponse] = await Promise.all([
    countRows(supabase, "contact_messages"),
    countRows(supabase, "assistant_interactions"),
    countRows(supabase, "visitors"),
    fetchDistinctCountries(supabase)
  ]);

  const recentResponse = await supabase
    .from("assistant_interactions")
    .select("question")
    .order("created_at", { ascending: false })
    .limit(5);

  const recentInteractions = recentResponse.error
    ? []
    : (recentResponse.data ?? []).map((item: any) => item.question).filter(Boolean);

  return {
    visitors,
    countries: countriesResponse,
    contactMessages,
    aiInteractions,
    recentInteractions
  };
}
