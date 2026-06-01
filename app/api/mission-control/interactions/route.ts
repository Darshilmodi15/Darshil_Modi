import { NextResponse } from "next/server";
import { getSupabaseAdminClient } from "@/lib/supabase";

export async function POST(request: Request) {
  const body = await request.json().catch(() => null);

  if (!body?.question) {
    return NextResponse.json({ ok: false }, { status: 400 });
  }

  const supabase = getSupabaseAdminClient();

  if (supabase) {
    await supabase.from("assistant_interactions").insert({
      question: body.question,
      created_at: new Date().toISOString()
    });
  }

  return NextResponse.json({ ok: true });
}
