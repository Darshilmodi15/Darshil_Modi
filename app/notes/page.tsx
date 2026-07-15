import { PageIntro } from "@/components/section-blocks";
import { notes } from "@/lib/portfolio-data";

export const metadata = { title: "Notes | Darshil Modi" };

export default function NotesPage() {
  return (
    <main>
      <PageIntro eyebrow="Notes and experiments" title="Short research logs I’m preparing from current projects." text="No fake long-form articles are published here. These are visible writing topics and working notes that will become more complete over time." />
      <section className="section container">
        <div className="notes-grid">
          {notes.map((note) => (
            <article className="note-card" key={note.slug}>
              <span className="tag">{note.status}</span>
              <h2>{note.title}</h2>
              <p>{note.summary}</p>
              <div className="tech-row">{note.topics.map((topic) => <span key={topic}>{topic}</span>)}</div>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}
