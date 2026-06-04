import { NextResponse } from "next/server";
import { getSupabaseAdminClient } from "@/lib/supabase";

const ADMIN_EMAIL = process.env.ADMIN_EMAIL;
const ADMIN_NAME = process.env.ADMIN_NAME || "Darshil Modi";

// Helper: Send email using Resend
async function sendEmail(
  to: string,
  subject: string,
  html: string
): Promise<boolean> {
  if (!process.env.RESEND_API_KEY) {
    console.error("RESEND_API_KEY not configured");
    return false;
  }

  try {
    const { Resend } = await import("resend");
    const resend = new Resend(process.env.RESEND_API_KEY);

    const result = await resend.emails.send({
      from: "contact@darshilmodi.in",
      to,
      subject,
      html
    });

    if (result.error) {
      console.error("Resend error:", result.error);
      return false;
    }

    console.log(`Email sent to ${to}:`, result.data);
    return true;
  } catch (error) {
    console.error("Email sending failed:", error);
    return false;
  }
}

// Send admin notification
async function sendAdminNotification(
  name: string,
  email: string,
  subject: string,
  message: string
): Promise<void> {
  if (!ADMIN_EMAIL) {
    console.warn("ADMIN_EMAIL not configured; skipping admin notification");
    return;
  }

  const html = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; color: #333;">
      <h2 style="color: #1a1a1a; border-bottom: 2px solid #d4af37; padding-bottom: 10px;">
        New Contact Submission
      </h2>
      
      <div style="background-color: #f9f9f9; padding: 16px; border-radius: 8px; margin: 16px 0;">
        <p style="margin: 0 0 12px 0;">
          <strong>Name:</strong> ${name}
        </p>
        <p style="margin: 0 0 12px 0;">
          <strong>Email:</strong> <a href="mailto:${email}">${email}</a>
        </p>
        <p style="margin: 0 0 12px 0;">
          <strong>Subject:</strong> ${subject || "(No Subject)"}
        </p>
        <p style="margin: 0 0 12px 0;">
          <strong>Submitted:</strong> ${new Date().toLocaleString()}
        </p>
      </div>

      <div style="background-color: #f5f5f5; padding: 16px; border-left: 4px solid #d4af37; margin: 16px 0;">
        <h3 style="margin-top: 0; color: #1a1a1a;">Message:</h3>
        <p style="white-space: pre-wrap; margin: 0; color: #555;">
          ${message}
        </p>
      </div>

      <p style="margin-top: 24px; padding-top: 16px; border-top: 1px solid #e0e0e0; font-size: 12px; color: #999;">
        Sent from Mission Log contact form
      </p>
    </div>
  `;

  await sendEmail(ADMIN_EMAIL, `New Contact: ${subject || "(No Subject)"}`, html);
}

// Send auto-reply to sender
async function sendAutoReply(name: string, email: string): Promise<void> {
  const html = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; color: #333;">
      <div style="text-align: center; margin-bottom: 32px;">
        <h1 style="color: #d4af37; margin: 0;">Mission Log</h1>
        <p style="color: #999; margin: 8px 0 0 0;">Portfolio & Analytics</p>
      </div>

      <h2 style="color: #1a1a1a;">Thank you for contacting me, ${name}!</h2>

      <p style="line-height: 1.6; color: #555;">
        I've received your message and appreciate you taking the time to reach out. 
        I'll review your submission carefully and get back to you as soon as possible.
      </p>

      <div style="background-color: #f9f9f9; padding: 16px; border-radius: 8px; margin: 24px 0;">
        <h3 style="margin-top: 0; color: #1a1a1a;">What happens next?</h3>
        <ul style="color: #555; line-height: 1.8;">
          <li>I review all submissions personally</li>
          <li>You'll hear back within 24-48 hours</li>
          <li>Watch for a reply from <strong>${ADMIN_EMAIL}</strong></li>
        </ul>
      </div>

      <p style="color: #555; line-height: 1.6;">
        In the meantime, feel free to explore my portfolio or check out my latest projects. 
        If you have any urgent matters, please mention it in your message.
      </p>

      <div style="margin-top: 32px; padding-top: 16px; border-top: 1px solid #e0e0e0;">
        <p style="color: #999; font-size: 12px; margin: 0;">
          This is an automated response. Please don't reply to this email.
          Your original message has been safely stored and will be addressed shortly.
        </p>
      </div>

      <div style="text-align: center; margin-top: 24px; color: #999; font-size: 12px;">
        <p>© ${new Date().getFullYear()} ${ADMIN_NAME}. All rights reserved.</p>
      </div>
    </div>
  `;

  await sendEmail(email, "Thank you for contacting me", html);
}

// Main POST handler
export async function POST(request: Request) {
  const body = await request.json().catch(() => null);

  // Validate input
  if (!body?.name || !body?.email || !body?.message) {
    return NextResponse.json(
      {
        ok: false,
        error: "Missing required fields: name, email, message"
      },
      { status: 400 }
    );
  }

  // Validate email format
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(body.email)) {
    return NextResponse.json(
      { ok: false, error: "Invalid email format" },
      { status: 400 }
    );
  }

  const { name, email, subject, message } = body;
  const supabase = getSupabaseAdminClient();

  if (!supabase) {
    return NextResponse.json(
      { ok: false, error: "Database not configured" },
      { status: 500 }
    );
  }

  // Store in database
  const { error: dbError } = await supabase
    .from("contact_messages")
    .insert({
      name,
      email,
      subject: subject || null,
      message,
      is_read: false,
      created_at: new Date().toISOString()
    });

  if (dbError) {
    console.error("Database error:", dbError);
    return NextResponse.json(
      { ok: false, error: "Failed to save message" },
      { status: 500 }
    );
  }

  // Send notifications in parallel (don't wait for them to complete)
  Promise.all([
    sendAdminNotification(name, email, subject, message),
    sendAutoReply(name, email)
  ]).catch((error) => {
    console.error("Error sending emails:", error);
  });

  return NextResponse.json({ ok: true });
}
