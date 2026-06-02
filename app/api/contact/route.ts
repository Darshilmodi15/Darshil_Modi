import { NextResponse } from "next/server";
import { getSupabaseAdminClient } from "@/lib/supabase";

async function sendEmailNotification(name: string, email: string, subject: string, message: string) {
  if (!process.env.RESEND_API_KEY) {
    return;
  }

  try {
    const { Resend } = await import("resend");
    const resend = new Resend(process.env.RESEND_API_KEY);
    
    await resend.emails.send({
      from: "noreply@mission-log.dev",
      to: "darshilmodi99@gmail.com",
      subject: `New Contact: ${subject || "(No Subject)"}`,
      html: `<div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;"><h2>New Contact Submission</h2><p><strong>Name:</strong> ${name}</p><p><strong>Email:</strong> ${email}</p><p><strong>Subject:</strong> ${subject || "(No Subject)"}</p><hr /><p><strong>Message:</strong></p><p style="white-space: pre-wrap;">${message}</p></div>`
    });
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

  // Send email notification (non-blocking)
  sendEmailNotification(name, email, subject, message);

  return NextResponse.json({ ok: true });
}
