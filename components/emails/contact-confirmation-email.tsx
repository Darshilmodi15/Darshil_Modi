import { EmailLayout, emailStyles } from "@/components/emails/email-layout";

export type ContactConfirmationEmailProps = {
  firstName: string;
  subject: string;
  message: string;
  submittedAt: string;
};

export function ContactConfirmationEmail({ firstName, subject, message, submittedAt }: ContactConfirmationEmailProps) {
  return (
    <EmailLayout eyebrow="Darshil Modi" title={`Thanks for reaching out, ${firstName}.`}>
      <p style={{ margin: "0 0 18px", color: emailStyles.colors.muted, fontSize: 15, lineHeight: "24px" }}>
        I received your message and will read it soon. Here is a quick copy of what you sent.
      </p>
      <div style={emailStyles.row}>
        <p style={emailStyles.label}>Subject</p>
        <p style={emailStyles.value}>{subject}</p>
      </div>
      <div style={emailStyles.row}>
        <p style={emailStyles.label}>Date submitted</p>
        <p style={emailStyles.value}>{submittedAt}</p>
      </div>
      <p style={emailStyles.label}>Your message</p>
      <div style={emailStyles.messageBlock}>{message}</div>
      <p style={{ margin: "16px 0 0", color: emailStyles.colors.muted, fontSize: 14, lineHeight: "22px" }}>
        You can reply directly to this email if you need to add anything.
      </p>
      <div style={{ marginTop: 16 }}>
        <a href="https://darshilmodi.in" style={emailStyles.secondaryButton}>Visit Portfolio</a>
        <a href="https://darshilmodi.in/projects" style={emailStyles.button}>View Projects</a>
      </div>
    </EmailLayout>
  );
}
