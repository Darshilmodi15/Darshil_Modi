import { EmailLayout, emailStyles } from "@/components/emails/email-layout";

export type ContactAdminEmailProps = {
  name: string;
  email: string;
  subject: string;
  message: string;
  submittedAt: string;
  submissionId?: string;
  storageWarning?: string;
};

export function ContactAdminEmail({ name, email, subject, message, submittedAt, submissionId, storageWarning }: ContactAdminEmailProps) {
  const replyHref = `mailto:${encodeURIComponent(email)}?subject=${encodeURIComponent(`Re: ${subject}`)}`;

  return (
    <EmailLayout eyebrow="Darshil Modi" title="Portfolio contact">
      {storageWarning && (
        <div style={{ margin: "0 0 18px", padding: "12px 14px", borderRadius: 10, backgroundColor: "#fff3dc", color: "#6f4307", border: "1px solid #f0cf91", fontSize: 14, lineHeight: "21px" }}>
          {storageWarning}
        </div>
      )}
      <div style={emailStyles.row}>
        <p style={emailStyles.label}>Sender</p>
        <p style={emailStyles.value}>{name}</p>
      </div>
      <div style={emailStyles.row}>
        <p style={emailStyles.label}>Email</p>
        <p style={emailStyles.value}><a href={`mailto:${email}`} style={{ color: emailStyles.colors.accent }}>{email}</a></p>
      </div>
      <div style={emailStyles.row}>
        <p style={emailStyles.label}>Subject</p>
        <p style={emailStyles.value}>{subject}</p>
      </div>
      <div style={emailStyles.row}>
        <p style={emailStyles.label}>Submitted</p>
        <p style={emailStyles.value}>{submittedAt}</p>
      </div>
      <div style={emailStyles.row}>
        <p style={emailStyles.label}>Source</p>
        <p style={emailStyles.value}>darshilmodi.in{submissionId ? ` / ${submissionId}` : ""}</p>
      </div>
      <p style={emailStyles.label}>Message</p>
      <div style={emailStyles.messageBlock}>{message}</div>
      <a href={replyHref} style={emailStyles.button}>Reply to {name}</a>
    </EmailLayout>
  );
}
