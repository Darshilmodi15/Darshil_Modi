import Image from "next/image";
import { PageIntro } from "@/components/section-blocks";
import { experience, programs } from "@/lib/portfolio-data";

export const metadata = { title: "Experience | Darshil Modi" };

export default function ExperiencePage() {
  return (
    <main>
      <PageIntro eyebrow="Experience" title="Internships, programs, and technical leadership." text="A concise record of current and completed roles. Details are intentionally restrained where public deliverables are not yet verifiable." />
      <section className="section container timeline-page">
        {experience.map((item) => (
          <article className="timeline-card" key={item.id}>
            <div className="timeline-date"><span>{item.period}</span><strong>{item.status}</strong></div>
            <div className="experience-content">
              <div className="experience-header">
                {item.logo && (
                  <div className="company-logo-wrapper">
                    <Image
                      src={item.logo}
                      alt={`${item.organization} logo`}
                      width={48}
                      height={48}
                      className="company-logo"
                    />
                  </div>
                )}
                <div>
                  <p className="eyebrow">{item.type || "Experience"}</p>
                  <h2>{item.role}</h2>
                  <h3>{item.organization}</h3>
                </div>
              </div>
              <p>{item.summary}</p>
              <ul>{item.bullets.map((bullet) => <li key={bullet}>{bullet}</li>)}</ul>
              {item.location && <p className="muted">Location: {item.location}</p>}
            </div>
          </article>
        ))}
      </section>
      <section className="section container">
        <div className="section-header"><p className="eyebrow">Programs</p><h2>Campus and community involvement.</h2></div>
        <div className="cards-grid">
          {programs.map((program) => (
            <article className="panel program-card" key={program.id}>
              <div className="program-header">
                {program.logo && (
                  <div className="program-logo-wrapper">
                    <Image
                      src={program.logo}
                      alt={`${program.organization} logo`}
                      width={40}
                      height={40}
                      className="program-logo"
                    />
                  </div>
                )}
                <div>
                  <span className="tag">{program.status}</span>
                  <h3>{program.title}</h3>
                  <p className="muted">{program.organization} / {program.period}</p>
                </div>
              </div>
              <p>{program.summary}</p>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}
