import Link from "next/link";
import { personalInfo, resume, socialLinks } from "@/lib/portfolio-data";

export function PageIntro({ eyebrow, title, text }: { eyebrow: string; title: string; text?: string }) {
  return (
    <section className="page-intro container">
      <p className="eyebrow">{eyebrow}</p>
      <h1>{title}</h1>
      {text && <p>{text}</p>}
    </section>
  );
}

export function ContactCTA() {
  return (
    <section className="section container">
      <div className="contact-cta">
        <p className="eyebrow">Contact</p>
        <h2>Let’s talk.</h2>
        <p>Have an opportunity, project, or idea in mind? Send me a message.</p>
        <div className="hero-actions">
          <Link className="button primary" href="/contact">Start a conversation</Link>
          <a className="button" href={resume.url} target="_blank" rel="noopener noreferrer">Open Resume</a>
          {socialLinks.map((link) => (
            <a className="button quiet" key={link.href} href={link.href} target="_blank" rel="noopener noreferrer">{link.label}</a>
          ))}
        </div>
      </div>
    </section>
  );
}

export function ExternalLink({ href, children, className = "text-link" }: { href: string; children: React.ReactNode; className?: string }) {
  return <a className={className} href={href} target="_blank" rel="noopener noreferrer">{children}</a>;
}
