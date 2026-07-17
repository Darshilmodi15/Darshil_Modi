import { createClient, SupabaseClient } from "@supabase/supabase-js";

// Types for analytics data structures
export type ActivityEvent = {
  id: string;
  type: "visitor" | "contact" | "question";
  title: string;
  detail: string;
  timestamp: string;
};

export type RecentVisitor = {
  id: string;
  country: string;
  city: string;
  visitedAt: string;
};

export type ContactMessage = {
  id: string;
  name: string;
  email: string;
  subject?: string;
  message: string;
  is_read: boolean;
  createdAt: string;
};

export type DashboardMetrics = {
  totalVisitors: number;
  todayVisitors: number;
  weekVisitors: number;
  monthVisitors: number;
  countriesReached: number;
  totalMessages: number;
  unreadMessages: number;
  latestMessage?: ContactMessage;
  recentMessages: ContactMessage[];
  topCountries: { country: string; count: number }[];
  topCities: { city: string; count: number }[];
};

export function getSupabaseAdminClient() {
  const url = process.env.SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.SUPABASE_SECRET_KEY || process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!url) {
    console.error("Missing environment variable: SUPABASE_URL");
  }

  if (!key) {
    console.error("Missing environment variable: SUPABASE_SECRET_KEY");
  }

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

// Helper: Count rows in a table with optional filters
async function countRows(
  supabase: SupabaseClient,
  table: string,
  filters?: { column: string; operator: string; value: any }[]
) {
  let query = supabase.from(table).select("*", { head: true, count: "exact" });

  if (filters) {
    for (const filter of filters) {
      query = query.filter(filter.column, filter.operator, filter.value);
    }
  }

  const response = await query;
  if (response.error) {
    return 0;
  }

  return response.count ?? 0;
}

// Helper: Get date N days ago in ISO format
function getDateRangeFilters(days: number) {
  const now = new Date();
  const pastDate = new Date(now.getTime() - days * 24 * 60 * 60 * 1000);
  return pastDate.toISOString();
}

// Helper: Count distinct values in a column
async function countDistinct(
  supabase: SupabaseClient,
  table: string,
  column: string,
  filters?: { column: string; operator: string; value: any }[]
): Promise<number> {
  let query = supabase.from(table).select(column, { head: true });

  if (filters) {
    for (const filter of filters) {
      query = query.filter(filter.column, filter.operator, filter.value);
    }
  }

  const response = await query;
  if (response.error) {
    return 0;
  }

  // Note: Supabase doesn't provide distinct count directly
  // We'll fetch all and count unique values client-side
  const fullQuery = supabase.from(table).select(column);
  if (filters) {
    for (const filter of filters) {
      fullQuery.filter(filter.column, filter.operator, filter.value);
    }
  }

  const result = await fullQuery;
  if (result.error) {
    return 0;
  }

  const uniqueValues = new Set(
    (result.data ?? [])
      .map((row: any) => row[column])
      .filter((val: any) => val)
  );
  return uniqueValues.size;
}

export async function getDashboardMetrics(): Promise<DashboardMetrics> {
  const supabase = getSupabaseAdminClient();

  if (!supabase) {
    return {
      totalVisitors: 0,
      todayVisitors: 0,
      weekVisitors: 0,
      monthVisitors: 0,
      countriesReached: 0,
      totalMessages: 0,
      unreadMessages: 0,
      recentMessages: [],
      topCountries: [],
      topCities: []
    };
  }

  // Calculate date ranges
  const todayDate = getDateRangeFilters(0);
  const weekDate = getDateRangeFilters(7);
  const monthDate = getDateRangeFilters(30);

  // Batch 1: Count metrics for all time periods
  const [
    totalVisitors,
    todayVisitors,
    weekVisitors,
    monthVisitors,
    totalMessages,
    unreadMessages
  ] = await Promise.all([
    countRows(supabase, "visitors"),
    countRows(supabase, "visitors", [
      { column: "created_at", operator: "gte", value: todayDate }
    ]),
    countRows(supabase, "visitors", [
      { column: "created_at", operator: "gte", value: weekDate }
    ]),
    countRows(supabase, "visitors", [
      { column: "created_at", operator: "gte", value: monthDate }
    ]),
    countRows(supabase, "contact_messages"),
    countRows(supabase, "contact_messages", [
      { column: "is_read", operator: "eq", value: false }
    ])
  ]);

  // Batch 2: Fetch detailed data for analytics
  const [latestMessageRes, allVisitorsRes] = await Promise.all([
    supabase
      .from("contact_messages")
      .select("id, name, email, subject, message, is_read, created_at")
      .order("created_at", { ascending: false })
      .limit(1),
    supabase
      .from("visitors")
      .select("country, city, created_at")
      .order("created_at", { ascending: false })
  ]);

  // Batch 3: Fetch recent messages and count unique countries
  const [recentMessagesRes, uniqueCountriesRes] = await Promise.all([
    supabase
      .from("contact_messages")
      .select("id, name, email, subject, message, is_read, created_at")
      .order("created_at", { ascending: false })
      .limit(20),
    supabase
      .from("visitors")
      .select("country")
      .not("country", "is", null)
  ]);

  // Process latest message
  const latestMessage: ContactMessage | undefined = latestMessageRes.data?.[0]
    ? {
        id: latestMessageRes.data[0].id,
        name: latestMessageRes.data[0].name,
        email: latestMessageRes.data[0].email,
        subject: latestMessageRes.data[0].subject,
        message: latestMessageRes.data[0].message,
        is_read: latestMessageRes.data[0].is_read,
        createdAt: latestMessageRes.data[0].created_at
      }
    : undefined;

  // Process recent messages
  const recentMessages: ContactMessage[] = (recentMessagesRes.data ?? []).map(
    (m: any) => ({
      id: m.id,
      name: m.name,
      email: m.email,
      subject: m.subject,
      message: m.message,
      is_read: !!m.is_read,
      createdAt: m.created_at
    })
  );

  // Compute top countries
  const countryMap = new Map<string, number>();
  (allVisitorsRes.data ?? []).forEach((visitor: any) => {
    if (visitor.country) {
      countryMap.set(
        visitor.country,
        (countryMap.get(visitor.country) || 0) + 1
      );
    }
  });

  const topCountries = Array.from(countryMap.entries())
    .map(([country, count]) => ({ country, count }))
    .sort((a, b) => b.count - a.count)
    .slice(0, 10);

  // Compute top cities
  const cityMap = new Map<string, number>();
  (allVisitorsRes.data ?? []).forEach((visitor: any) => {
    if (visitor.city) {
      cityMap.set(visitor.city, (cityMap.get(visitor.city) || 0) + 1);
    }
  });

  const topCities = Array.from(cityMap.entries())
    .map(([city, count]) => ({ city, count }))
    .sort((a, b) => b.count - a.count)
    .slice(0, 10);

  // Count unique countries
  const uniqueCountries = new Set(
    (uniqueCountriesRes.data ?? [])
      .map((row: any) => row.country)
      .filter((val: any) => val)
  ).size;

  return {
    totalVisitors,
    todayVisitors,
    weekVisitors,
    monthVisitors,
    countriesReached: uniqueCountries,
    totalMessages,
    unreadMessages,
    latestMessage,
    recentMessages,
    topCountries,
    topCities
  };
}
