"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

type Message = {
  id: string;
  name: string;
  email: string;
  subject?: string;
  message: string;
  is_read: boolean;
  createdAt: string;
};

export default function RecentMessages({ initialMessages }: { initialMessages: Message[] }) {
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [loading, setLoading] = useState<string | null>(null);
  const router = useRouter();

  async function toggleRead(id: string, current: boolean) {
    setLoading(id);
    const res = await fetch("/api/contact/mark-read", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id, is_read: !current })
    });

    if (res.ok) {
      setMessages((prev) =>
        prev.map((m) =>
          m.id === id ? { ...m, is_read: !current } : m
        )
      );
      router.refresh();
    } else {
      console.error("Failed to toggle read state", await res.text());
    }

    setLoading(null);
  }

  async function deleteMessage(id: string) {
    if (!confirm("Are you sure you want to delete this message?")) {
      return;
    }

    setLoading(id);
    const res = await fetch("/api/contact/delete", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id })
    });

    if (res.ok) {
      setMessages((prev) => prev.filter((m) => m.id !== id));
      router.refresh();
    } else {
      console.error("Failed to delete message", await res.text());
      alert("Failed to delete message. Please try again.");
    }

    setLoading(null);
  }

  if (messages.length === 0) {
    return (
      <div className="msg-empty">
        <p>No messages yet</p>
      </div>
    );
  }

  return (
    <div className="msg-list">
      {messages.map((m) => (
        <article
          key={m.id}
          className={`msg-card${m.is_read ? "" : " unread"}`}
        >
          <div className="msg-header">
            <div>
              <div className="msg-sender">
                <span>{m.name}</span>
                {!m.is_read && <span className="msg-dot" title="Unread" />}
              </div>
              <div className="msg-email">{m.email}</div>
              <div className="msg-subject">{m.subject || "(No Subject)"}</div>
            </div>
            <div className="msg-actions">
              <button
                onClick={() => toggleRead(m.id, m.is_read)}
                disabled={loading === m.id}
                title={m.is_read ? "Mark as unread" : "Mark as read"}
              >
                {m.is_read ? "Unread" : "Read"}
              </button>
              <button
                className="msg-delete"
                onClick={() => deleteMessage(m.id)}
                disabled={loading === m.id}
                title="Delete message"
              >
                Delete
              </button>
            </div>
          </div>

          <p className="msg-body">
            {m.message.substring(0, 300)}
            {m.message.length > 300 ? "..." : ""}
          </p>

          <div className="msg-time">
            {new Date(m.createdAt).toLocaleString()}
          </div>
        </article>
      ))}
    </div>
  );
}
