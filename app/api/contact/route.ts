import { NextResponse } from "next/server";
import { getSupabaseAdminClient } from "@/lib/supabase";

const ADMIN_EMAIL = process.env.ADMIN_EMAIL;

async function sendEmailNotification(name: string, email: string, subject: string, message: string) {
  if (!process.env.RESEND_API_KEY || !ADMIN_EMAIL) {
    console.error("RESEND_API_KEY or ADMIN_EMAIL not configured; skipping email notification.");
    return;
  }

  try {
    const { Resend } = await import("resend");
    const resend = new Resend(process.env.RESEND_API_KEY);
    
    const result = await resend.emails.send({
      from: "onboarding@resend.dev",
      to: ADMIN_EMAIL,
      subject: `New Contact: ${subject || "(No Subject)"}`,
      html: `<div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;"><h2>New Contact Submission</h2><p><strong>Name:</strong> ${name}</p><p><strong>Email:</strong> ${email}</p><p><strong>Subject:</strong> ${subject || "(No Subject)"}</p><hr /><p><strong>Message:</strong></p><p style="white-space: pre-wrap;">${message}</p></div>`
    });

    console.log("Resend result:", JSON.stringify(result));
  } catch (error) {
    console.error("Email notification failed:", error);
  }
}

export async function POST(request: Request) {
  const body = await request.json().catch(() => null);

  if (!body?.name || !body?.email || !body?.message) {
    return NextResponse.json(
      { ok: false, error: "Missing required fields: name, email, message" },
      { status: 400 }
    );
  }

  const { name, email, subject, message } = body;
  const supabase = getSupabaseAdminClient();

  if (!supabase) {
    return NextResponse.json(
      { ok: false, error: "Supabase is not configured." },
      { status: 500 }
    );
  }

  const { error: dbError } = await supabase.from("contact_messages").insert({
    name,
    email,
    subject: subject || "(No Subject)",
    message,
    created_at: new Date().toISOString()
  });

  if (dbError) {
    return NextResponse.json(
      { ok: false, error: `Database error: ${dbError.message}` },
      { status: 500 }
    );
  }

  // Send email notification and log result for visibility
  await sendEmailNotification(name, email, subject, message);

  return NextResponse.json({ ok: true });
}
