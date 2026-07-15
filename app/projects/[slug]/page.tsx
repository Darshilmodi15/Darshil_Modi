import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRightIcon, BookIcon, ExternalIcon, GithubIcon } from "@/components/icons";
import { getProject, getRelatedProjects, projects } from "@/lib/portfolio-data";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const project = getProject(slug);
  return { title: project ? `${project.title} | Projects | Darshil Modi` : "Project | Darshil Modi" };
}

function ShortList({ title, items }: { title: string; items: string[] }) {
  return (
    <section className="case-block">
      <h2>{title}</h2>
      <ul>{items.slice(0, 6).map((item) => <li key={item}>{item}</li>)}</ul>
    </section>
  );
}

export default async function ProjectCaseStudy({ params }: Props) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) notFound();
  const related = getRelatedProjects(project.slug);
  const index = projects.findIndex((item) => item.slug === project.slug);
  const prev = projects[index - 1];
  const next = projects[index + 1];

  return (
    <main>
      <section className="case-hero container">
        <div>
          <p className="eyebrow">{project.category} / {project.year}</p>
          <h1>{project.title}</h1>
          <p>{project.fullDescription}</p>
          <div className="project-meta"><span>{project.status}</span><span>{project.teamType}</span><span>{project.demoStatus === "working" ? "Demo available" : "No public demo"}</span></div>
          <div className="hero-actions">
            {project.demoUrl && project.demoStatus === "working" && <a href={project.demoUrl} className="button primary" target="_blank" rel="noopener noreferrer"><ExternalIcon /> Live demo</a>}
            <a href={project.repositoryUrl} className="button" target="_blank" rel="noopener noreferrer"><GithubIcon /> Source code</a>
            <Link className="button" href="/projects"><BookIcon /> All projects</Link>
          </div>
        </div>
        <aside className="case-summary">
          <div><span>My role</span><strong>{project.role}</strong></div>
          <div><span>Status</span><strong>{project.status}</strong></div>
          <div><span>Team</span><strong>{project.teamType}</strong></div>
          <div><span>Stack</span><strong>{project.technologies.slice(0, 4).join(", ")}</strong></div>
        </aside>
      </section>

      <section className="container">
        <div className="project-media" aria-label={`${project.title} media placeholder`}>
          <div>
            <span>Media</span>
            <strong>Project media coming soon.</strong>
            <p>I am currently preparing a short product walkthrough.</p>
          </div>
        </div>
      </section>

      <section className="section container case-grid compact-case">
        <section className="case-block wide"><h2>Overview</h2><p>{project.problem} {project.solution}</p></section>
        <ShortList title="My role" items={project.contributions} />
        <ShortList title="What I built" items={project.features} />
        <section className="case-block"><h2>Project status</h2><p>{project.status}. {project.demoStatus === "working" ? "A public demo is available." : "No public demo is available right now."}</p></section>
        <ShortList title="What I learned" items={project.learnings} />
      </section>

      <section className="section container">
        <div className="section-header"><p className="eyebrow">Related</p><h2>Continue exploring.</h2></div>
        <div className="cards-grid">
          {related.map((item) => <Link className="panel linked-panel" key={item.slug} href={`/projects/${item.slug}`}><span>{item.category}</span><h3>{item.title}</h3><p>{item.shortDescription}</p></Link>)}
        </div>
        <div className="project-pager">
          {prev ? <Link className="text-link" href={`/projects/${prev.slug}`}>{prev.title}</Link> : <span />}
          {next ? <Link className="text-link" href={`/projects/${next.slug}`}>{next.title} <ArrowRightIcon /></Link> : <span />}
        </div>
      </section>
    </main>
  );
}
