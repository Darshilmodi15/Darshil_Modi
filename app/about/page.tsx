import Link from "next/link";
import { PageIntro } from "@/components/section-blocks";
import { experience, personalInfo, programs, resume, skillGroups, socialLinks } from "@/lib/portfolio-data";

export const metadata = { title: "About | Darshil Modi" };

export default function AboutPage() {
  return (
    <main>
      <PageIntro eyebrow="About" title="I’m building toward applied AI and useful software products." text={personalInfo.intro} />
      <section className="section container about-grid">
        <article className="rich-copy">
          <h2>Current direction</h2>
          <p>
            My strongest interests are machine learning, generative AI, multi-agent systems, LLM reasoning workflows, intelligent automation, backend systems, and full-stack product development. I enjoy projects where an idea becomes a working system with APIs, databases, AI workflows, and a clear user experience.
          </p>
          <p>
            I am not presenting myself as a senior engineer or researcher. I am an early-career student developer building practical depth through projects, internships, hackathons, and continuous learning.
          </p>
          <h2>How I approach building</h2>
          <p>
            I care about making systems understandable: what problem they solve, what evidence they use, where the limitations are, and how a user can trust the output. That is especially important in AI projects such as talent intelligence, education, and agriculture.
          </p>
          <h2>What I am looking for</h2>
          <p>{personalInfo.availability}</p>
          <div className="card-actions">
            <Link className="button primary" href="/projects">Explore projects</Link>
            <Link className="button" href="/experience">View experience</Link>
            <a className="button" href={resume.url} target="_blank" rel="noopener noreferrer">Open Résumé</a>
          </div>
        </article>
        <aside className="profile-facts">
          <div><span>Location</span><strong>{personalInfo.location}</strong></div>
          <div><span>Education</span><strong>{personalInfo.education}</strong></div>
          <div><span>Graduation</span><strong>{personalInfo.graduation}</strong></div>
          <div><span>Current focus</span><strong>{personalInfo.currentFocus}</strong></div>
          <div><span>Current experience</span><strong>{experience[0].role} · {experience[0].organization}</strong></div>
          <div><span>Program</span><strong>{programs[0].title} · {programs[0].period}</strong></div>
          <div className="fact-links">
            {socialLinks.map((link) => <a key={link.href} href={link.href} target="_blank" rel="noopener noreferrer">{link.label}</a>)}
          </div>
        </aside>
      </section>
      <section className="section container">
        <div className="section-header"><p className="eyebrow">Skills</p><h2>Curated toolkit, grouped by how I use it.</h2></div>
        <div className="skill-grid">
          {skillGroups.map((group) => (
            <article className="skill-card" key={group.title}>
              <h3>{group.title}</h3>
              <ul>{group.items.map((item) => <li key={item}>{item}</li>)}</ul>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}
