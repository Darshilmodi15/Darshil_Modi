"use client";

import { FormEvent, useState } from "react";

type FormState = "idle" | "sending" | "sent" | "error";

export function ContactForm() {
  const [state, setState] = useState<FormState>("idle");

  async function submitContact(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setState("sending");

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

    setState("error");
  }

  return (
    <form className="contact-form" onSubmit={submitContact}>
      <label>
        <span>Name</span>
        <input name="name" required autoComplete="name" />
      </label>
      <label>
        <span>Email</span>
        <input name="email" type="email" required autoComplete="email" />
      </label>
      <label>
        <span>Message</span>
        <textarea name="message" required rows={5} />
      </label>
      <button type="submit" disabled={state === "sending"}>
        {state === "sending" ? "Sending" : "Send Message"}
      </button>
      <p className="form-status" role="status">
        {state === "sent" && "Message logged."}
        {state === "error" && "Message could not be sent."}
      </p>
    </form>
  );
}
