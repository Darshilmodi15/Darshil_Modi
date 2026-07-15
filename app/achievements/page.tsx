import { PageIntro } from "@/components/section-blocks";
import { achievements, certifications, programs } from "@/lib/portfolio-data";

export const metadata = { title: "Achievements | Darshil Modi" };

export default function AchievementsPage() {
  return (
    <main>
      <PageIntro eyebrow="Achievements" title="Hackathons, recognitions, and learning signals." text="This page keeps hackathon outcomes separate from professional learning credentials and avoids overstating results." />
      <section className="section container">
        <div className="achievement-list">
          {achievements.map((item) => (
            <article className="timeline-card" key={item.title}>
              <div className="timeline-date"><span>{item.year}</span>{item.project && <strong>{item.project}</strong>}</div>
              <div>
                <h2>{item.title}</h2>
                {item.organization && <p className="muted">{item.organization}</p>}
                <p>{item.detail}</p>
                {item.credentialUrl && (
                  <a className="text-link" href={item.credentialUrl} target="_blank" rel="noopener noreferrer" aria-label={`Verify supporting credential for ${item.title}`}>
                    Verify supporting credential ↗
                  </a>
                )}
              </div>
            </article>
          ))}
        </div>
      </section>
      <section className="section container">
        <div className="section-header"><p className="eyebrow">Programs</p><h2>Current campus/community program.</h2></div>
        <div className="cards-grid">{programs.map((program) => <article className="panel" key={program.id}><span className="tag">{program.status}</span><h3>{program.title}</h3><p className="muted">{program.organization} / {program.period}</p><p>{program.summary}</p></article>)}</div>
      </section>
      <section className="section container">
        <div className="section-header"><p className="eyebrow">Certifications</p><h2>Verified learning credentials.</h2></div>
        <div className="cert-grid">
          {certifications.map((cert) => (
            <article className="cert-card" key={cert.name}>
              <h3>{cert.name}</h3>
              <p>{cert.issuer}{cert.year ? ` / ${cert.year}` : ""}</p>
              {cert.credentialUrl ? <a className="text-link" href={cert.credentialUrl} target="_blank" rel="noopener noreferrer" aria-label={`Verify credential for ${cert.name}`}>Verify credential ↗</a> : <span className="muted">Credential link needed</span>}
              {cert.note && <small>{cert.note}</small>}
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}
