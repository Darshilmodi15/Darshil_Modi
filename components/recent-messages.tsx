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
      setMessages((prev) => prev.map((m) => (m.id === id ? { ...m, is_read: !current } : m)));
      // optionally refresh server props
      router.refresh();
    } else {
      console.error("Failed to toggle read state", await res.text());
    }

    setLoading(null);
  }

  return (
    <div>
      <ul style={{ listStyle: "none", padding: 0 }}>
        {messages.map((m) => (
          <li key={m.id} style={{ marginBottom: 12, padding: 12, border: "1px solid #eee", borderRadius: 6 }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <div>
                <strong>{m.name}</strong>
                <div style={{ fontSize: 12, color: "#666" }}>{m.subject || "(No Subject)"}</div>
              </div>
              <div>
                <button
                  onClick={() => toggleRead(m.id, m.is_read)}
                  disabled={loading === m.id}
                >
                  {m.is_read ? "Mark unread" : "Mark read"}
                </button>
              </div>
            </div>
            <p style={{ marginTop: 8, whiteSpace: "pre-wrap" }}>{m.message.substring(0, 250)}{m.message.length>250?"...":""}</p>
            <div style={{ fontSize: 12, color: "#999", marginTop: 8 }}>{new Date(m.createdAt).toLocaleString()}</div>
          </li>
        ))}
      </ul>
    </div>
  );
}
