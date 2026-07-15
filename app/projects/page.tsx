import Link from "next/link";
import { ArrowRightIcon, ExternalIcon, GithubIcon } from "@/components/icons";
import { PageIntro } from "@/components/section-blocks";
import { projects } from "@/lib/portfolio-data";

export const metadata = { title: "Projects | Darshil Modi" };

const groups = ["Featured", "AI/ML", "Full-Stack", "Hackathon", "Experiment", "Developer Tool"] as const;

export default function ProjectsPage() {
  return (
    <main>
      <PageIntro eyebrow="Projects" title="A curated archive of AI, full-stack, and hackathon builds." text="Not every repository is shown here. This page focuses on projects that best explain my current direction and practical experience." />
      <section className="section container">
        <div className="filter-note" aria-label="Project groups">
          {groups.map((group) => <span key={group}>{group}</span>)}
        </div>
        <div className="project-archive">
          {projects.map((project) => (
            <article className="archive-card" key={project.slug}>
              <div>
                <div className="project-meta"><span>{project.category}</span><span>{project.status}</span><span>{project.teamType}</span></div>
                <h2>{project.title}</h2>
                <p>{project.shortDescription}</p>
                <p className="muted"><strong>My role:</strong> {project.role}</p>
                <div className="tech-row">{project.technologies.slice(0, 4).map((tech) => <span key={tech}>{tech}</span>)}</div>
              </div>
              <div className="archive-actions">
                <Link className="text-link with-icon" href={`/projects/${project.slug}`}><ArrowRightIcon /> View case study</Link>
                {project.demoUrl && project.demoStatus === "working" && <a className="text-link with-icon" href={project.demoUrl} target="_blank" rel="noopener noreferrer"><ExternalIcon /> Live demo</a>}
                <a className="text-link with-icon" href={project.repositoryUrl} target="_blank" rel="noopener noreferrer"><GithubIcon /> Source code</a>
              </div>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}
