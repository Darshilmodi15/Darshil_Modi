import { ContactForm } from "@/components/contact-form";
import { PortfolioAssistant } from "@/components/portfolio-assistant";
import { PageIntro } from "@/components/section-blocks";
import { personalInfo, resume, socialLinks } from "@/lib/portfolio-data";

export const metadata = { title: "Contact | Darshil Modi" };

export default function ContactPage() {
  return (
    <main>
      <PageIntro eyebrow="Contact" title="Open to AI/ML internships, collaborations, and focused technical conversations." text={personalInfo.availability} />
      <section className="section container contact-layout">
        <div className="panel">
          <h2>Send a message</h2>
          <p className="muted">Use the form for opportunities, project conversations, hackathons, or collaboration ideas.</p>
          <ContactForm />
        </div>
        <aside className="contact-sidebar">
          <div className="panel">
            <h3>Direct links</h3>
            <a className="contact-link" href={`mailto:${personalInfo.email}`}>Email: {personalInfo.email}</a>
            <span className="contact-link">Discord: @{personalInfo.discord}</span>
            {socialLinks.map((link) => <a className="contact-link" key={link.href} href={link.href} target="_blank" rel="noopener noreferrer">{link.label}</a>)}
            <a className="contact-link" href={resume.url} target="_blank" rel="noopener noreferrer">Open Résumé</a>
            <a className="contact-link" href={personalInfo.siteUrl}>Portfolio</a>
          </div>
          <div className="panel">
            <h3>Best fit</h3>
            <p>AI/ML internships, software engineering opportunities, hackathon teams, multi-agent systems, LLM applications, backend APIs, and full-stack product builds.</p>
          </div>
        </aside>
      </section>
      <div className="container"><PortfolioAssistant /></div>
    </main>
  );
}
