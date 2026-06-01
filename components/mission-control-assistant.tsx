"use client";

import { useMemo, useState } from "react";
import { assistantQuestions } from "@/lib/portfolio-data";

export function MissionControlAssistant() {
  const [selected, setSelected] = useState(assistantQuestions[0]);
  const [customQuestion, setCustomQuestion] = useState("");

  const fallbackAnswer = useMemo(
    () =>
      "Mission Control can only answer from the portfolio content on this site. Try one of the logged questions for a grounded answer.",
    []
  );

  async function selectQuestion(question: (typeof assistantQuestions)[number]) {
    setSelected(question);

    await fetch("/api/mission-control/interactions", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ question: question.question })
    }).catch(() => undefined);
  }

  function askCustomQuestion() {
    const match = assistantQuestions.find((item) =>
      customQuestion
        .trim()
        .toLowerCase()
        .includes(item.question.toLowerCase().replace(".", ""))
    );

    setSelected(
      match || {
        question: customQuestion || "Mission Control",
        answer: fallbackAnswer
      }
    );
  }

  return (
    <div className="mission-control-panel">
      <div className="panel-heading">
        <p className="eyebrow">Mission Control</p>
        <h2>Portfolio assistant</h2>
      </div>

      <div className="assistant-grid">
        <div className="question-bank" aria-label="Mission Control questions">
          {assistantQuestions.map((item) => (
            <button
              key={item.question}
              className={selected.question === item.question ? "question is-active" : "question"}
              type="button"
              onClick={() => selectQuestion(item)}
            >
              {item.question}
            </button>
          ))}
        </div>

        <div className="answer-console" aria-live="polite">
          <span className="console-label">Active Query</span>
          <h3>{selected.question}</h3>
          <p>{selected.answer}</p>

          <div className="assistant-input-row">
            <input
              value={customQuestion}
              onChange={(event) => setCustomQuestion(event.target.value)}
              placeholder="Ask from the portfolio content"
              aria-label="Ask Mission Control"
            />
            <button type="button" onClick={askCustomQuestion}>
              Query
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
