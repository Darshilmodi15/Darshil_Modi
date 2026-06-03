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
      <div style={{ textAlign: "center", padding: "32px", color: "#999" }}>
        <p>No messages yet</p>
      </div>
    );
  }

  return (
    <div>
      <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
        {messages.map((m) => (
          <li
            key={m.id}
            style={{
              marginBottom: 12,
              padding: 12,
              border: "1px solid #eee",
              borderRadius: 6,
              backgroundColor: m.is_read ? "#ffffff" : "#fffbf0"
            }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "flex-start",
                marginBottom: 8
              }}
            >
              <div style={{ flex: 1 }}>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "8px",
                    marginBottom: "4px"
                  }}
                >
                  <strong>{m.name}</strong>
                  {!m.is_read && (
                    <span
                      style={{
                        display: "inline-block",
                        width: "8px",
                        height: "8px",
                        backgroundColor: "#d4af37",
                        borderRadius: "50%"
                      }}
                      title="Unread"
                    />
                  )}
                </div>
                <div style={{ fontSize: 12, color: "#666" }}>
                  {m.email}
                </div>
                <div style={{ fontSize: 12, color: "#999", marginTop: "2px" }}>
                  {m.subject || "(No Subject)"}
                </div>
              </div>
              <div
                style={{
                  display: "flex",
                  gap: "8px",
                  marginLeft: "12px"
                }}
              >
                <button
                  onClick={() => toggleRead(m.id, m.is_read)}
                  disabled={loading === m.id}
                  style={{
                    padding: "4px 8px",
                    fontSize: "12px",
                    cursor: loading === m.id ? "default" : "pointer",
                    opacity: loading === m.id ? 0.6 : 1
                  }}
                  title={m.is_read ? "Mark as unread" : "Mark as read"}
                >
                  {m.is_read ? "Unread" : "Read"}
                </button>
                <button
                  onClick={() => deleteMessage(m.id)}
                  disabled={loading === m.id}
                  style={{
                    padding: "4px 8px",
                    fontSize: "12px",
                    cursor: loading === m.id ? "default" : "pointer",
                    opacity: loading === m.id ? 0.6 : 1,
                    color: "#d32f2f"
                  }}
                  title="Delete message"
                >
                  Delete
                </button>
              </div>
            </div>

            <p
              style={{
                margin: "8px 0",
                whiteSpace: "pre-wrap",
                fontSize: "14px",
                color: "#555",
                lineHeight: 1.5
              }}
            >
              {m.message.substring(0, 300)}
              {m.message.length > 300 ? "..." : ""}
            </p>

            <div style={{ fontSize: 12, color: "#999", marginTop: 8 }}>
              {new Date(m.createdAt).toLocaleString()}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
