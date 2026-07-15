"use client";

import { FormEvent, useState } from "react";

type FormState = "idle" | "sending" | "sent" | "error";

export function ContactForm() {
  const [state, setState] = useState<FormState>("idle");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  async function submitContact(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setState("sending");
    setErrorMessage(null);

    const form = event.currentTarget;
    const formData = new FormData(form);
    const payload = Object.fromEntries(formData.entries());

    const response = await fetch("/api/contact", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload)
    }).catch(() => null);

    if (response?.ok) {
      setState("sent");
      form.reset();
      return;
    }

    const body = response ? await response.json().catch(() => null) : null;
    setErrorMessage(body?.error || "Message could not be sent. Please try LinkedIn if the issue continues.");
    setState("error");
  }

  return (
    <form className="contact-form" onSubmit={submitContact} noValidate>
      <div className="form-grid">
        <label>
          <span>Name</span>
          <input name="name" required autoComplete="name" minLength={2} placeholder="Your name" />
        </label>
        <label>
          <span>Email</span>
          <input name="email" type="email" required autoComplete="email" placeholder="you@example.com" />
        </label>
      </div>
      <label>
        <span>Subject</span>
        <input name="subject" type="text" required minLength={3} maxLength={120} placeholder="Internship, collaboration, hackathon..." />
      </label>
      <label className="honeypot" aria-hidden="true">
        <span>Company website</span>
        <input name="website" tabIndex={-1} autoComplete="off" />
      </label>
      <label>
        <span>Message</span>
        <textarea name="message" required rows={6} minLength={20} maxLength={4000} placeholder="Tell me what you are building or how I can help." />
      </label>
      <button type="submit" disabled={state === "sending"}>
        {state === "sending" ? "Sending…" : "Send Message"}
      </button>
      <p className="form-status" role="status" aria-live="polite">
        {state === "sent" && "Message sent. Thank you — I’ll review it soon."}
        {state === "error" && errorMessage}
      </p>
    </form>
  );
}
