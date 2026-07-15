import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { authOptions } from "@/lib/auth";
import { getSupabaseAdminClient } from "@/lib/supabase";

export const dynamic = "force-dynamic";

type TableDiagnostic = {
  table: "contact_messages" | "visitors";
  canQuery: boolean;
  returnedRecords: number;
  latestRecordTimestamp: string | null;
  error?: { code?: string; message: string };
};

function getProjectRef(url?: string) {
  if (!url) return null;
  try {
    const host = new URL(url).hostname;
    const [ref] = host.split(".");
    return ref || null;
  } catch {
    return null;
  }
}

async function diagnoseTable(table: "contact_messages" | "visitors"): Promise<TableDiagnostic> {
  const supabase = getSupabaseAdminClient();
  if (!supabase) {
    return {
      table,
      canQuery: false,
      returnedRecords: 0,
      latestRecordTimestamp: null,
      error: { message: "Supabase admin client is not configured" }
    };
  }

  const { data, error } = await supabase
    .from(table)
    .select("id, created_at")
    .order("created_at", { ascending: false })
    .limit(5);

  if (error) {
    return {
      table,
      canQuery: false,
      returnedRecords: 0,
      latestRecordTimestamp: null,
      error: { code: error.code, message: error.message }
    };
  }

  return {
    table,
    canQuery: true,
    returnedRecords: data?.length ?? 0,
    latestRecordTimestamp: data?.[0]?.created_at ?? null
  };
}

export async function GET() {
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({ ok: false, error: "Unauthorized" }, { status: 401 });
  }

  const supabaseUrl = process.env.SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL;
  const projectRef = getProjectRef(supabaseUrl);
  const [contactMessages, visitors] = await Promise.all([
    diagnoseTable("contact_messages"),
    diagnoseTable("visitors")
  ]);

  return NextResponse.json({
    ok: true,
    projectRef,
    urlHost: supabaseUrl ? new URL(supabaseUrl).hostname : null,
    tables: { contactMessages, visitors },
    checkedAt: new Date().toISOString(),
    note: "Compare projectRef with the project reference shown in your Supabase dashboard URL. No secret key is returned."
  });
}
