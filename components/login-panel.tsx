"use client";

import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";

type LoginPanelProps = {
  devMode: boolean;
  devEmail: string;
  devPassword: string;
};

export function LoginPanel({ devMode, devEmail, devPassword }: LoginPanelProps) {
  const router = useRouter();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function submitLogin(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    setError("");

    const formData = new FormData(event.currentTarget);
    const result = await signIn("credentials", {
      email: formData.get("email"),
      password: formData.get("password"),
      redirect: false,
      callbackUrl: "/mission-control"
    });

    setLoading(false);

    if (result?.ok) {
      router.push("/mission-control");
      router.refresh();
      return;
    }

    setError("Invalid Mission Control credentials.");
  }

  return (
    <main className="login-shell">
      <section className="login-panel" aria-labelledby="login-title">
        <p className="eyebrow">Private Route</p>
        <h1 id="login-title">Mission Control</h1>
        <form onSubmit={submitLogin}>
          <label>
            <span>Email</span>
            <input
              name="email"
              type="email"
              required
              defaultValue={devMode ? devEmail : ""}
              autoComplete="email"
            />
          </label>
          <label>
            <span>Password</span>
            <input
              name="password"
              type="password"
              required
              defaultValue={devMode ? devPassword : ""}
              autoComplete="current-password"
            />
          </label>
          <button type="submit" disabled={loading}>
            {loading ? "Checking" : "Enter Dashboard"}
          </button>
        </form>
        {devMode && (
          <p className="login-note">
            Local credentials are visible because Mission Control environment variables are not set.
          </p>
        )}
        {error && <p className="login-error">{error}</p>}
      </section>
    </main>
  );
}
