import { NextResponse } from "next/server";
import { getSupabaseAdminClient } from "@/lib/supabase";

export async function POST(request: Request) {
  const body = await request.json().catch(() => null);

  if (!body?.country) {
    return NextResponse.json(
      { ok: false, error: "Missing country data" },
      { status: 400 }
    );
  }

  const supabase = getSupabaseAdminClient();

  if (!supabase) {
    return NextResponse.json(
      { ok: false, error: "Supabase not configured" },
      { status: 500 }
    );
  }

  const { error } = await supabase.from("visitors").insert({
    country: body.country,
    city: body.city || null,
    ip_hash: body.ipHash || null,
    user_agent: request.headers.get("user-agent") || null,
    created_at: new Date().toISOString()
  });

  if (error) {
    console.error("Visitor tracking error:", error);
    return NextResponse.json({ ok: false }, { status: 500 });
  }

  return NextResponse.json({ ok: true });
}
