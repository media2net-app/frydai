"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { GlassCard } from "@/components/ui/GlassCard";
import { DEMO_LOGIN } from "@/lib/demo-auth";
import { copy } from "@/lib/copy";

export function DemoLoginForm() {
  const { login: t } = copy;
  const router = useRouter();
  const [email, setEmail] = useState<string>(DEMO_LOGIN.email);
  const [password, setPassword] = useState<string>(DEMO_LOGIN.password);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const res = await fetch("/api/demo/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      if (!res.ok) {
        const data = (await res.json().catch(() => ({}))) as { error?: string };
        setError(data.error ?? t.errorGeneric);
        setLoading(false);
        return;
      }

      router.push("/dashboard");
      router.refresh();
    } catch {
      setError(t.errorGeneric);
      setLoading(false);
    }
  }

  return (
    <GlassCard className="w-full max-w-md p-6 sm:p-8">
      <div className="mb-6 text-center">
        <p className="font-mono text-[10px] font-medium uppercase tracking-[0.2em] text-teal-300/80">
          {t.eyebrow}
        </p>
        <h1 className="mt-2 text-2xl font-bold tracking-tight text-white">{t.title}</h1>
        <p className="mt-2 text-sm text-white/55">{t.subtitle}</p>
      </div>

      <div className="mb-5 rounded-xl border border-violet-500/25 bg-violet-500/10 px-3 py-2.5 text-center">
        <p className="text-xs text-violet-200/90">{t.demoHint}</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="email" className="mb-1.5 block text-xs font-medium text-white/50">
            {t.emailLabel}
          </label>
          <input
            id="email"
            name="email"
            type="email"
            autoComplete="username"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full rounded-xl border border-white/10 bg-white/[0.04] px-4 py-3 text-sm text-white outline-none transition-colors focus:border-violet-500/50 focus:ring-1 focus:ring-violet-500/30"
          />
        </div>

        <div>
          <label htmlFor="password" className="mb-1.5 block text-xs font-medium text-white/50">
            {t.passwordLabel}
          </label>
          <input
            id="password"
            name="password"
            type="password"
            autoComplete="current-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full rounded-xl border border-white/10 bg-white/[0.04] px-4 py-3 text-sm text-white outline-none transition-colors focus:border-violet-500/50 focus:ring-1 focus:ring-violet-500/30"
          />
        </div>

        {error ? (
          <p className="rounded-lg border border-rose-500/30 bg-rose-500/10 px-3 py-2 text-sm text-rose-200">
            {error}
          </p>
        ) : null}

        <button
          type="submit"
          disabled={loading}
          className="w-full rounded-full bg-gradient-to-r from-violet-600 via-purple-600 to-indigo-500 px-8 py-3.5 text-base font-semibold text-white shadow-lg shadow-violet-500/30 transition-all hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {loading ? t.submitting : t.submit}
        </button>
      </form>

      <p className="mt-5 text-center text-xs text-white/40">
        <a href="/" className="text-white/55 underline-offset-2 hover:text-white hover:underline">
          {t.backHome}
        </a>
      </p>
    </GlassCard>
  );
}
