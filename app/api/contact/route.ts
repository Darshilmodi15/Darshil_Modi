import { NextResponse } from "next/server";
import { getSupabaseAdminClient } from "@/lib/supabase";

export async function POST(request: Request) {
  const body = await request.json().catch(() => null);

  if (!body?.name || !body?.email || !body?.message) {
    return NextResponse.json({ ok: false }, { status: 400 });
  }

  const supabase = getSupabaseAdminClient();

  if (supabase) {
    const { error } = await supabase.from("contact_messages").insert({
      name: body.name,
      email: body.email,
      message: body.message,
      created_at: new Date().toISOString()
    });

    if (error) {
      return NextResponse.json({ ok: false }, { status: 500 });
    }
  }

  return NextResponse.json({ ok: true });
}
