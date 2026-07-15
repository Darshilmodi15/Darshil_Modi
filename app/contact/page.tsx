import { ContactForm } from "@/components/contact-form";
import { FileIcon, GithubIcon, LinkedinIcon, MailIcon } from "@/components/icons";
import { PageIntro } from "@/components/section-blocks";
import { personalInfo, resume, socialLinks } from "@/lib/portfolio-data";

export const metadata = { title: "Contact | Darshil Modi" };

export default function ContactPage() {
  const github = socialLinks.find((link) => link.label === "GitHub");
  const linkedin = socialLinks.find((link) => link.label === "LinkedIn");

  return (
    <main>
      <PageIntro eyebrow="Contact" title="Let’s talk." text="Have an opportunity, project, or idea in mind? Send me a message." />
      <section className="section container contact-layout">
        <div className="panel">
          <h2>Send a message</h2>
          <p className="muted">I usually respond best to clear notes about the project, role, or collaboration you have in mind.</p>
          <ContactForm />
        </div>
        <aside className="contact-sidebar">
          <div className="panel">
            <h3>Direct links</h3>
            <a className="contact-link with-icon" href={`mailto:${personalInfo.email}`}><MailIcon /> Email</a>
            {github && <a className="contact-link with-icon" href={github.href} target="_blank" rel="noopener noreferrer"><GithubIcon /> GitHub</a>}
            {linkedin && <a className="contact-link with-icon" href={linkedin.href} target="_blank" rel="noopener noreferrer"><LinkedinIcon /> LinkedIn</a>}
            <a className="contact-link with-icon" href={resume.url} target="_blank" rel="noopener noreferrer"><FileIcon /> Resume</a>
            <span className="contact-link">Discord: @{personalInfo.discord}</span>
          </div>
          <div className="panel">
            <h3>Good reasons to reach out</h3>
            <p>Internships, collaborations, hackathons, project feedback, or conversations around AI products and software engineering.</p>
          </div>
        </aside>
      </section>
    </main>
  );
}
