"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Loader2, LockKeyhole } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { SITE } from "@/data/site";

/** /admin/login — standalone sign-in screen. */
export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setBusy(true);
    setError(null);
    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const data = (await res.json()) as { ok: boolean; error?: string };
      if (!res.ok || !data.ok) {
        setError(data.error ?? "Sign in failed.");
        return;
      }
      router.replace("/admin");
      router.refresh();
    } catch {
      setError("Network error. Please try again.");
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-ink px-4 py-10">
      <div className="w-full max-w-sm">
        <div className="mb-8 text-center">
          <p className="font-display text-5xl tracking-wide text-cream">
            DEMO SCOOTY
          </p>
          <p className="label-micro mt-2 flex items-center justify-center gap-2 text-brand">
            <LockKeyhole className="h-3.5 w-3.5" aria-hidden="true" />
            MANAGEMENT PANEL
          </p>
        </div>

        <form
          onSubmit={submit}
          className="space-y-5 border border-cream/10 bg-cream p-6 shadow-lift sm:p-8"
        >
          <div className="space-y-2">
            <Label htmlFor="email">EMAIL</Label>
            <Input
              id="email"
              type="email"
              autoComplete="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@demoscooty.com"
              className="h-11 rounded-none border-ink/20 bg-paper"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="password">PASSWORD</Label>
            <Input
              id="password"
              type="password"
              autoComplete="current-password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="h-11 rounded-none border-ink/20 bg-paper"
            />
          </div>

          {error ? (
            <p
              role="alert"
              className="border-l-2 border-brand bg-brand/10 px-3 py-2 text-sm text-ink"
            >
              {error}
            </p>
          ) : null}

          <Button
            type="submit"
            disabled={busy}
            className="h-12 w-full rounded-none bg-brand font-display text-xl tracking-wider text-white hover:bg-ink"
          >
            {busy ? (
              <>
                <Loader2 className="h-5 w-5 animate-spin" aria-hidden="true" />
                SIGNING IN…
              </>
            ) : (
              "SIGN IN"
            )}
          </Button>
        </form>

        <div className="mt-6 text-center">
          <Link
            href="/"
            className="label-micro inline-flex items-center gap-1.5 text-cream/60 transition-colors hover:text-cream"
          >
            <ArrowLeft className="h-3.5 w-3.5" aria-hidden="true" />
            BACK TO {SITE.name} WEBSITE
          </Link>
        </div>
      </div>
    </div>
  );
}
