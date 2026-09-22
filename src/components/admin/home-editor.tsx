"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Loader2, RotateCcw, Save } from "lucide-react";
import { toast } from "sonner";

import { ImagePickerField } from "@/components/admin/image-picker-field";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

export type AdminHome = {
  heroKicker: string;
  heroLine1: string;
  heroLine2: string;
  heroLine3: string;
  heroSub: string;
  heroImage: string;
  heroImageAlt: string;
  bookingNote: string;
  locationStrip: string;
  slogans: string;
  followers: string;
  posts: string;
};

/** /admin/home — every editable piece of the home page, as plain forms. */
export function HomeEditor({ initial }: { initial: AdminHome }) {
  const router = useRouter();
  const [form, setForm] = useState<AdminHome>(initial);
  const [busy, setBusy] = useState(false);

  const set = <K extends keyof AdminHome>(key: K, value: AdminHome[K]) =>
    setForm((f) => ({ ...f, [key]: value }));

  async function save(e: React.FormEvent) {
    e.preventDefault();
    setBusy(true);
    try {
      const res = await fetch("/api/admin/home", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = (await res.json()) as { ok: boolean; error?: string };
      if (!res.ok || !data.ok) {
        toast.error(data.error ?? "Could not save.");
        return;
      }
      toast.success("Home page saved — refresh the site to see it live.");
      router.refresh();
    } catch {
      toast.error("Network error while saving.");
    } finally {
      setBusy(false);
    }
  }

  return (
    <form onSubmit={save} className="space-y-6">
      <header className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="label-micro text-brand">CONTENT</p>
          <h1 className="mt-1 font-display text-4xl tracking-wide text-ink">
            HOME PAGE
          </h1>
          <p className="mt-2 max-w-2xl text-sm text-steel">
            The hero headline, intro copy, marquee slogans and trust stats —
            all editable without touching a line of code.
          </p>
        </div>
        <div className="flex gap-2">
          <Button
            type="button"
            variant="outline"
            onClick={() => setForm(initial)}
            className="h-11 rounded-none border-ink/20 bg-cream hover:bg-cream hover:text-brand"
          >
            <RotateCcw className="h-4 w-4" aria-hidden="true" />
            RESET
          </Button>
          <Button
            type="submit"
            disabled={busy}
            className="h-11 rounded-none bg-brand font-display text-lg tracking-wider text-white hover:bg-ink"
          >
            {busy ? (
              <Loader2 className="h-5 w-5 animate-spin" aria-hidden="true" />
            ) : (
              <Save className="h-5 w-5" aria-hidden="true" />
            )}
            SAVE HOME PAGE
          </Button>
        </div>
      </header>

      <section className="border border-ink/10 bg-white">
        <div className="border-b border-ink/10 bg-paper px-5 py-3">
          <h2 className="font-display text-2xl tracking-wide text-ink">
            HERO SECTION
          </h2>
        </div>
        <div className="grid gap-5 p-5 sm:grid-cols-2">
          <div className="space-y-2 sm:col-span-2">
            <Label htmlFor="h-kicker">KICKER (SMALL RED LINE ABOVE TITLE)</Label>
            <Input
              id="h-kicker"
              value={form.heroKicker}
              onChange={(e) => set("heroKicker", e.target.value)}
              className="h-10 rounded-none border-ink/20 bg-paper"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="h-line1">HEADLINE LINE 1</Label>
            <Input
              id="h-line1"
              value={form.heroLine1}
              onChange={(e) => set("heroLine1", e.target.value)}
              className="h-10 rounded-none border-ink/20 bg-paper font-display text-lg"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="h-line2">HEADLINE LINE 2</Label>
            <Input
              id="h-line2"
              value={form.heroLine2}
              onChange={(e) => set("heroLine2", e.target.value)}
              className="h-10 rounded-none border-ink/20 bg-paper font-display text-lg"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="h-line3">HEADLINE LINE 3 (RED HIGHLIGHT)</Label>
            <Input
              id="h-line3"
              value={form.heroLine3}
              onChange={(e) => set("heroLine3", e.target.value)}
              className="h-10 rounded-none border-ink/20 bg-paper font-display text-lg text-brand"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="h-strip">MICRO-LOCATION STRIP</Label>
            <Input
              id="h-strip"
              value={form.locationStrip}
              onChange={(e) => set("locationStrip", e.target.value)}
              className="h-10 rounded-none border-ink/20 bg-paper"
            />
          </div>
          <div className="space-y-2 sm:col-span-2">
            <Label htmlFor="h-sub">INTRO PARAGRAPH</Label>
            <Textarea
              id="h-sub"
              rows={2}
              value={form.heroSub}
              onChange={(e) => set("heroSub", e.target.value)}
              className="rounded-none border-ink/20 bg-paper"
            />
          </div>
          <div className="space-y-2 sm:col-span-2">
            <Label htmlFor="h-note">BOOKING NOTE (UNDER THE BUTTONS)</Label>
            <Input
              id="h-note"
              value={form.bookingNote}
              onChange={(e) => set("bookingNote", e.target.value)}
              className="h-10 rounded-none border-ink/20 bg-paper"
            />
          </div>
          <div className="sm:col-span-2">
            <ImagePickerField
              id="h-image"
              label="HERO PHOTO"
              value={form.heroImage}
              onChange={(v) => set("heroImage", v)}
              previewAspect="aspect-[3/4]"
            />
          </div>
          <div className="space-y-2 sm:col-span-2">
            <Label htmlFor="h-alt">HERO PHOTO ALT TEXT</Label>
            <Input
              id="h-alt"
              value={form.heroImageAlt}
              onChange={(e) => set("heroImageAlt", e.target.value)}
              className="h-10 rounded-none border-ink/20 bg-paper"
            />
          </div>
        </div>
      </section>

      <section className="border border-ink/10 bg-white">
        <div className="border-b border-ink/10 bg-paper px-5 py-3">
          <h2 className="font-display text-2xl tracking-wide text-ink">
            SLOGANS MARQUEE
          </h2>
        </div>
        <div className="space-y-2 p-5">
          <Label htmlFor="h-slogans">ONE SLOGAN PER LINE</Label>
          <Textarea
            id="h-slogans"
            rows={5}
            value={form.slogans}
            onChange={(e) => set("slogans", e.target.value)}
            className="rounded-none border-ink/20 bg-paper font-mono text-sm"
          />
          <p className="text-xs text-steel">
            Each line scrolls through the red marquee band on the home page.
          </p>
        </div>
      </section>

      <section className="border border-ink/10 bg-white">
        <div className="border-b border-ink/10 bg-paper px-5 py-3">
          <h2 className="font-display text-2xl tracking-wide text-ink">
            TRUST STATS
          </h2>
        </div>
        <div className="grid gap-5 p-5 sm:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="h-followers">FOLLOWERS LABEL</Label>
            <Input
              id="h-followers"
              value={form.followers}
              onChange={(e) => set("followers", e.target.value)}
              className="h-10 rounded-none border-ink/20 bg-paper"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="h-posts">POSTS LABEL</Label>
            <Input
              id="h-posts"
              value={form.posts}
              onChange={(e) => set("posts", e.target.value)}
              className="h-10 rounded-none border-ink/20 bg-paper"
            />
          </div>
        </div>
      </section>
    </form>
  );
}
