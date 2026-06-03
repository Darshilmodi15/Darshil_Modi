import { NextResponse } from "next/server";
import { getSupabaseAdminClient } from "@/lib/supabase";
import crypto from "crypto";

// Helper: Hash IP address for privacy
function hashIP(ip: string): string {
  return crypto.createHash("sha256").update(ip + "mission-log-salt").digest("hex");
}

// Helper: Extract client IP from request
function getClientIP(request: Request): string {
  const forwarded = request.headers.get("x-forwarded-for");
  const ip = forwarded ? forwarded.split(",")[0].trim() : request.headers.get("x-real-ip") || "0.0.0.0";
  return ip;
}

export async function POST(request: Request) {
  const body = await request.json().catch(() => null);

  // Validate input
  if (!body?.country) {
    return NextResponse.json(
      { ok: false, error: "Missing country data" },
      { status: 400 }
    );
  }

  const supabase = getSupabaseAdminClient();

  if (!supabase) {
    console.error("Supabase not configured");
    return NextResponse.json(
      { ok: false, error: "Not configured" },
      { status: 500 }
    );
  }

  // Extract visitor information
  const country = body.country;
  const city = body.city || null;
  const userAgent = request.headers.get("user-agent") || null;
  const clientIP = getClientIP(request);
  const ipHash = hashIP(clientIP);

  // Check for duplicate: same IP within last 5 minutes
  // This prevents rapid page refresh double-counting
  const fiveMinutesAgo = new Date(Date.now() - 5 * 60 * 1000).toISOString();

 const { data: recentVisit, error: recentVisitError } = await supabase
  .from("visitors")
  .select("id")
  .eq("ip_hash", ipHash)
  .gte("created_at", fiveMinutesAgo)
  .limit(1)
  .maybeSingle();

  // If duplicate found, return success but don't insert
   if (recentVisit) {
  return NextResponse.json({ ok: true });
}

  // Insert new visitor record
  const { error: insertError } = await supabase
    .from("visitors")
    .insert({
      country,
      city,
      ip_hash: ipHash,
      user_agent: userAgent,
      created_at: new Date().toISOString()
    });

  if (insertError) {
    console.error("Visitor tracking error:", insertError);
    // Return success even if insert fails (don't block page load)
    return NextResponse.json({ ok: true, error: insertError.message });
  }

  return NextResponse.json({ ok: true, isDuplicate: false });
}
