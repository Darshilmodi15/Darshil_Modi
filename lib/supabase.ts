import { createClient, SupabaseClient } from "@supabase/supabase-js";

export type ActivityEvent = {
  id: string;
  type: "visitor" | "contact" | "question";
  title: string;
  detail: string;
  timestamp: string;
};

export type DashboardMetrics = {
  totalVisitors: number;
  todayVisitors: number;
  weekVisitors: number;
  monthVisitors: number;
  totalMessages: number;
  unreadMessages: number;
  latestMessage?: {
    name: string;
    email: string;
    subject?: string;
    message: string;
    createdAt: string;
  };
  totalInteractions: number;
  recentInteractions: { question: string; timestamp: string }[];
  recentMessages: { id: string; name: string; email: string; subject?: string; message: string; is_read: boolean; createdAt: string }[];
  topCountries: { country: string; count: number }[];
  topCities: { city: string; count: number }[];
  recentActivity: ActivityEvent[];
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

async function countRows(supabase: SupabaseClient, table: string, filters?: { column: string; operator: string; value: any }[]) {
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

function getDateRangeFilters(days: number) {
  const now = new Date();
  const pastDate = new Date(now.getTime() - days * 24 * 60 * 60 * 1000);
  return pastDate.toISOString();
}

export async function getDashboardMetrics(): Promise<DashboardMetrics> {
  const supabase = getSupabaseAdminClient();

  if (!supabase) {
    return {
      totalVisitors: 0,
      todayVisitors: 0,
      weekVisitors: 0,
      monthVisitors: 0,
      totalMessages: 0,
      unreadMessages: 0,
      totalInteractions: 0,
      recentInteractions: [],
      recentMessages: [],
      topCountries: [],
      topCities: [],
      recentActivity: []
    };
  }

  const todayDate = getDateRangeFilters(0);
  const weekDate = getDateRangeFilters(7);
  const monthDate = getDateRangeFilters(30);

  const [totalVisitors, todayVisitors, weekVisitors, monthVisitors, totalMessages, unreadMessages, totalInteractions] = await Promise.all([
    countRows(supabase, "visitors"),
    countRows(supabase, "visitors", [{ column: "created_at", operator: "gte", value: todayDate }]),
    countRows(supabase, "visitors", [{ column: "created_at", operator: "gte", value: weekDate }]),
    countRows(supabase, "visitors", [{ column: "created_at", operator: "gte", value: monthDate }]),
    countRows(supabase, "contact_messages"),
    countRows(supabase, "contact_messages", [{ column: "is_read", operator: "eq", value: false }]),
    countRows(supabase, "assistant_interactions")
  ]);

  const [latestMessageRes, recentQuestionsRes, visitorsRes] = await Promise.all([
    supabase.from("contact_messages").select("name, email, subject, message, created_at").order("created_at", { ascending: false }).limit(1),
    supabase.from("assistant_interactions").select("question, created_at").order("created_at", { ascending: false }).limit(5),
    supabase.from("visitors").select("country, city, created_at").order("created_at", { ascending: false })
  ]);

  const latestMessage = latestMessageRes.data?.[0]
    ? {
        name: latestMessageRes.data[0].name,
        email: latestMessageRes.data[0].email,
        subject: latestMessageRes.data[0].subject,
        message: latestMessageRes.data[0].message,
        createdAt: latestMessageRes.data[0].created_at
      }
    : undefined;

  const recentInteractions = (recentQuestionsRes.data ?? []).map((item: any) => ({
    question: item.question,
    timestamp: item.created_at
  }));

  // Fetch recent messages (with read state)
  const recentMessagesRes = await supabase
    .from("contact_messages")
    .select("id, name, email, subject, message, is_read, created_at")
    .order("created_at", { ascending: false })
    .limit(5);

  const recentMessages = (recentMessagesRes.error ? [] : (recentMessagesRes.data ?? [])).map((m: any) => ({
    id: m.id,
    name: m.name,
    email: m.email,
    subject: m.subject,
    message: m.message,
    is_read: !!m.is_read,
    createdAt: m.created_at
  }));

  // Compute top countries from visitor data
  const countryMap = new Map<string, number>();
  (visitorsRes.data ?? []).forEach((visitor: any) => {
    if (visitor.country) {
      countryMap.set(visitor.country, (countryMap.get(visitor.country) || 0) + 1);
    }
  });

  const topCountries = Array.from(countryMap.entries())
    .map(([country, count]) => ({ country, count }))
    .sort((a, b) => b.count - a.count)
    .slice(0, 5);

  // Compute top cities from visitor data
  const cityMap = new Map<string, number>();
  (visitorsRes.data ?? []).forEach((visitor: any) => {
    if (visitor.city) {
      cityMap.set(visitor.city, (cityMap.get(visitor.city) || 0) + 1);
    }
  });

  const topCities = Array.from(cityMap.entries())
    .map(([city, count]) => ({ city, count }))
    .sort((a, b) => b.count - a.count)
    .slice(0, 5);

  const recentActivity: ActivityEvent[] = [
    ...(visitorsRes.data ?? []).slice(0, 5).map((visitor: any, idx: number) => ({
      id: `visitor-${idx}`,
      type: "visitor" as const,
      title: `Visitor from ${visitor.city || visitor.country || "Unknown"}`,
      detail: `${visitor.country || ""} ${visitor.city || ""}`.trim(),
      timestamp: visitor.created_at
    })),
    ...(latestMessageRes.data ?? []).slice(0, 1).map((msg: any, idx: number) => ({
      id: `contact-${idx}`,
      type: "contact" as const,
      title: `Contact from ${msg.name}`,
      detail: msg.subject || msg.message.substring(0, 50),
      timestamp: msg.created_at
    })),
    ...(recentQuestionsRes.data ?? []).slice(0, 3).map((qa: any, idx: number) => ({
      id: `question-${idx}`,
      type: "question" as const,
      title: `Question: ${qa.question.substring(0, 40)}...`,
      detail: qa.question,
      timestamp: qa.created_at
    }))
  ].sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());

  return {
    totalVisitors,
    todayVisitors,
    weekVisitors,
    monthVisitors,
    totalMessages,
    unreadMessages,
    latestMessage,
    totalInteractions,
    recentInteractions,
    recentMessages,
    topCountries,
    topCities,
    recentActivity
  };
}
