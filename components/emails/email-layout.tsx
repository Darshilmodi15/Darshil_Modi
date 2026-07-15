import type { ReactNode } from "react";

const colors = {
  charcoal: "#171714",
  muted: "#615c52",
  border: "#e6dfd2",
  accent: "#9d6717",
  body: "#faf8f3",
  white: "#ffffff"
};

export function EmailLayout({
  eyebrow,
  title,
  children,
  footer
}: {
  eyebrow: string;
  title: string;
  children: ReactNode;
  footer?: ReactNode;
}) {
  return (
    <div style={{ margin: 0, padding: "28px 12px", backgroundColor: colors.body, fontFamily: "Arial, Helvetica, sans-serif", color: colors.charcoal }}>
      <div style={{ maxWidth: 600, margin: "0 auto", backgroundColor: colors.white, border: `1px solid ${colors.border}`, borderRadius: 14, overflow: "hidden" }}>
        <div style={{ padding: "22px 28px", backgroundColor: colors.charcoal, color: "#f4efe6" }}>
          <div style={{ fontSize: 12, fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", color: "#d9a74f" }}>{eyebrow}</div>
          <h1 style={{ margin: "8px 0 0", fontSize: 24, lineHeight: "30px", fontWeight: 700 }}>{title}</h1>
        </div>
        <div style={{ padding: "28px" }}>{children}</div>
        <div style={{ padding: "18px 28px", borderTop: `1px solid ${colors.border}`, color: colors.muted, fontSize: 13, lineHeight: "20px" }}>
          {footer || (
            <>
              <strong style={{ color: colors.charcoal }}>Darshil Modi</strong>
              <br />
              AI/ML and Software Engineering
              <br />
              <a href="https://darshilmodi.in" style={{ color: colors.accent }}>darshilmodi.in</a>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export const emailStyles = {
  colors,
  row: { margin: "0 0 14px" },
  label: { margin: "0 0 4px", color: colors.muted, fontSize: 12, fontWeight: 700, textTransform: "uppercase" as const, letterSpacing: "0.08em" },
  value: { margin: 0, color: colors.charcoal, fontSize: 15, lineHeight: "23px" },
  messageBlock: { margin: "18px 0", padding: "16px", border: `1px solid ${colors.border}`, borderRadius: 10, backgroundColor: "#fffdf8", whiteSpace: "pre-wrap" as const, color: colors.charcoal, fontSize: 15, lineHeight: "24px" },
  button: { display: "inline-block", marginTop: 10, padding: "12px 16px", borderRadius: 999, backgroundColor: colors.accent, color: "#ffffff", textDecoration: "none", fontWeight: 700, fontSize: 14 },
  secondaryButton: { display: "inline-block", marginTop: 10, marginRight: 10, padding: "11px 15px", borderRadius: 999, border: `1px solid ${colors.border}`, color: colors.charcoal, textDecoration: "none", fontWeight: 700, fontSize: 14 }
};
