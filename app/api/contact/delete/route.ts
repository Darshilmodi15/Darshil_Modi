import { NextResponse } from "next/server";
import { getSupabaseAdminClient } from "@/lib/supabase";

export async function POST(request: Request) {
  const body = await request.json().catch(() => null);

  if (!body?.id) {
    return NextResponse.json(
      { ok: false, error: "Missing message ID" },
      { status: 400 }
    );
  }

  const supabase = getSupabaseAdminClient();

  if (!supabase) {
    return NextResponse.json(
      { ok: false, error: "Database not configured" },
      { status: 500 }
    );
  }

  const { error } = await supabase
    .from("contact_messages")
    .delete()
    .eq("id", body.id);

  if (error) {
    console.error("Delete error:", error);
    return NextResponse.json(
      { ok: false, error: error.message },
      { status: 500 }
    );
  }

  return NextResponse.json({ ok: true });
}
