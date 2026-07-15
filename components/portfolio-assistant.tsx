"use client";

import { useMemo, useState } from "react";
import { assistantKnowledge } from "@/lib/portfolio-data";

export function PortfolioAssistant() {
  const [selected, setSelected] = useState(assistantKnowledge[0]);
  const [customQuestion, setCustomQuestion] = useState("");

  const fallbackAnswer = useMemo(
    () =>
      "I can only answer from the verified portfolio data on this site. Try one of the suggested questions or use the contact page for anything specific.",
    []
  );

  async function selectQuestion(question: (typeof assistantKnowledge)[number]) {
    setSelected(question);
    await fetch("/api/mission-control/interactions", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ question: question.question })
    }).catch(() => undefined);
  }

  function askCustomQuestion() {
    const normalized = customQuestion.trim().toLowerCase();
    if (!normalized) return;

    const match = assistantKnowledge.find((item) => {
      const q = item.question.toLowerCase();
      return normalized.includes(q.replace(/[?’.]/g, "").slice(0, 16)) || q.includes(normalized);
    });

    setSelected(
      match || {
        question: customQuestion,
        answer: fallbackAnswer
      }
    );
  }

  return (
    <section className="assistant-panel" aria-labelledby="assistant-title">
      <div>
        <p className="eyebrow">Guided navigator</p>
        <h2 id="assistant-title">Ask from the portfolio</h2>
        <p className="muted">This is a constrained portfolio navigator, not a general AI chatbot. It avoids inventing facts.</p>
      </div>
      <div className="assistant-layout">
        <div className="question-bank" aria-label="Suggested questions">
          {assistantKnowledge.map((item) => (
            <button key={item.question} type="button" className={selected.question === item.question ? "is-active" : undefined} onClick={() => selectQuestion(item)}>
              {item.question}
            </button>
          ))}
        </div>
        <div className="answer-card" aria-live="polite">
          <span>Selected question</span>
          <h3>{selected.question}</h3>
          <p>{selected.answer}</p>
          <div className="assistant-input-row">
            <input value={customQuestion} onChange={(event) => setCustomQuestion(event.target.value)} placeholder="Ask a question from this portfolio" aria-label="Ask from portfolio content" />
            <button type="button" onClick={askCustomQuestion}>Ask</button>
          </div>
        </div>
      </div>
    </section>
  );
}
