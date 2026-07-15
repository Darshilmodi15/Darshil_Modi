import Image from "next/image";
import Link from "next/link";
import { ArrowRightIcon, ExternalIcon, GithubIcon } from "@/components/icons";
import { ContactCTA } from "@/components/section-blocks";
import { achievements, experience, featuredProjects, personalInfo, programs, resume, socialLinks } from "@/lib/portfolio-data";

export function HomePage() {
  return (
    <main>
      <section className="hero container">
        <div className="hero-copy">
          <p className="eyebrow">Darshil Modi</p>
          <h1>I build AI products and full-stack software.</h1>
          <p className="hero-lede">B.Tech CSE (AI & ML) student at Adani University, currently working as a Software Engineer Intern at The Gap.</p>
          <p className="hero-subtle">I enjoy turning ambitious ideas into working products through AI, backend engineering, and thoughtful interfaces.</p>
          <div className="hero-actions">
            <Link className="button primary" href="/projects">View Projects</Link>
            <Link className="button" href="/about">About Me</Link>
            <a className="button" href={resume.url} target="_blank" rel="noopener noreferrer">Resume</a>
          </div>
          <div className="inline-links" aria-label="Public profiles">
            {socialLinks.map((link) => (
              <a key={link.href} href={link.href} target="_blank" rel="noopener noreferrer">{link.label}</a>
            ))}
          </div>
        </div>
        <div className="hero-visual" aria-label="Portrait and profile summary">
          <div className="portrait-card">
            <Image src="/darshil-photo.jpg" alt="Darshil Modi" width={720} height={720} priority />
          </div>
          <div className="profile-card">
            <span>Current direction</span>
            <strong>{personalInfo.currentStatus}</strong>
            <p>{personalInfo.achievementLine}</p>
          </div>
        </div>
      </section>

      <section className="section container">
        <div className="section-header split">
          <div>
            <p className="eyebrow">Selected projects</p>
            <h2>Practical AI and product work.</h2>
          </div>
          <Link className="text-link" href="/projects">View all projects</Link>
        </div>
        <div className="featured-projects">
          {featuredProjects.map((project, index) => (
            <article className="project-feature" key={project.slug}>
              <div className="project-index">0{index + 1}</div>
              <div>
                <div className="project-meta"><span>{project.category}</span><span>{project.status}</span><span>{project.teamType}</span></div>
                <h3>{project.title}</h3>
                <p>{project.shortDescription}</p>
                <ul>
                  {project.features.slice(0, 3).map((feature) => <li key={feature}>{feature}</li>)}
                </ul>
                <div className="card-actions">
                  <Link className="text-link with-icon" href={`/projects/${project.slug}`}><ArrowRightIcon /> View case study</Link>
                  {project.demoUrl && project.demoStatus === "working" && <a className="text-link with-icon" href={project.demoUrl} target="_blank" rel="noopener noreferrer"><ExternalIcon /> Live demo</a>}
                  <a className="text-link with-icon" href={project.repositoryUrl} target="_blank" rel="noopener noreferrer"><GithubIcon /> Source code</a>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="section container two-column">
        <div className="panel about-preview">
          <p className="eyebrow">About</p>
          <h2>Student builder focused on applied AI.</h2>
          <p>{personalInfo.intro}</p>
          <Link className="text-link" href="/about">More about me</Link>
        </div>
        <div className="panel compact-list">
          <p className="eyebrow">Experience preview</p>
          <h2>Current and recent roles.</h2>
          {[...experience.map((item) => ({ id: item.id, period: item.period, title: item.role, organization: item.organization })), ...programs.map((item) => ({ id: item.id, period: item.period, title: item.title, organization: item.organization }))].slice(0, 3).map((item) => (
            <div className="list-row" key={item.id}>
              <span>{item.period}</span>
              <strong>{item.title}</strong>
              <p>{item.organization}</p>
            </div>
          ))}
          <Link className="text-link" href="/experience">View full experience</Link>
        </div>
      </section>

      <section className="section container">
        <div className="section-header split">
          <div>
            <p className="eyebrow">Achievements</p>
            <h2>Hackathon momentum and leadership signals.</h2>
          </div>
          <Link className="text-link" href="/achievements">View all achievements</Link>
        </div>
        <div className="achievement-strip">
          {achievements.slice(0, 3).map((achievement) => (
            <article key={achievement.title}>
              <span>{achievement.year}</span>
              <h3>{achievement.title}</h3>
              <p>{achievement.detail}</p>
            </article>
          ))}
        </div>
      </section>

      <ContactCTA />
    </main>
  );
}
