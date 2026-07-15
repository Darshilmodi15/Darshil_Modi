import Link from "next/link";
import { notFound } from "next/navigation";
import { ExternalLink } from "@/components/section-blocks";
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

function ListBlock({ title, items }: { title: string; items: string[] }) {
  return (
    <section className="case-block">
      <h2>{title}</h2>
      <ul>{items.map((item) => <li key={item}>{item}</li>)}</ul>
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
          <p className="eyebrow">{project.category} · {project.year}</p>
          <h1>{project.title}</h1>
          <p>{project.fullDescription}</p>
          <div className="project-meta"><span>{project.status}</span><span>{project.teamType}</span><span>{project.demoStatus === "working" ? "Demo available" : "No public demo"}</span></div>
          <div className="hero-actions">
            <ExternalLink href={project.repositoryUrl} className="button primary">GitHub repository</ExternalLink>
            {project.demoUrl && project.demoStatus === "working" && <ExternalLink href={project.demoUrl} className="button">Live demo</ExternalLink>}
            <Link className="button" href="/projects">All projects</Link>
          </div>
        </div>
        <aside className="case-summary">
          <div><span>My role</span><strong>{project.role}</strong></div>
          <div><span>Status</span><strong>{project.status}</strong></div>
          <div><span>Team</span><strong>{project.teamType}</strong></div>
          <div><span>Stack</span><strong>{project.technologies.slice(0, 5).join(", ")}</strong></div>
        </aside>
      </section>

      <section className="container">
        <div className="project-media" aria-label={`${project.title} media placeholder`}>
          <div>
            <span>Project media</span>
            <strong>{project.media?.caption || "Screenshots, GIFs, or videos will be added here."}</strong>
            <p>{project.media?.src ? project.media.alt : "Temporary placeholder — no fake screenshots are used. Add a WebM, MP4, GIF, or optimized image path in the central project data to replace this block."}</p>
          </div>
        </div>
      </section>

      <section className="section container case-grid">
        <section className="case-block wide"><h2>Problem</h2><p>{project.problem}</p></section>
        <section className="case-block wide"><h2>Approach</h2><p>{project.solution}</p></section>
        <ListBlock title="My contribution" items={project.contributions} />
        <ListBlock title="Key features" items={project.features} />
        <ListBlock title="Engineering decisions" items={project.engineering} />
        <ListBlock title="Challenges and trade-offs" items={project.challenges} />
        <ListBlock title="What I learned" items={project.learnings} />
      </section>

      <section className="section container">
        <div className="section-header"><p className="eyebrow">Related</p><h2>Continue exploring.</h2></div>
        <div className="cards-grid">
          {related.map((item) => <Link className="panel linked-panel" key={item.slug} href={`/projects/${item.slug}`}><span>{item.category}</span><h3>{item.title}</h3><p>{item.shortDescription}</p></Link>)}
        </div>
        <div className="project-pager">
          {prev ? <Link className="text-link" href={`/projects/${prev.slug}`}>← {prev.title}</Link> : <span />}
          {next ? <Link className="text-link" href={`/projects/${next.slug}`}>{next.title} →</Link> : <span />}
        </div>
      </section>
    </main>
  );
}
