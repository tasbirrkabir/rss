"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import {
  Bike,
  Eye,
  EyeOff,
  Loader2,
  Pencil,
  Plus,
  Save,
  Trash2,
  X,
} from "lucide-react";
import { toast } from "sonner";

import { ImagePickerField } from "@/components/admin/image-picker-field";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";

export type AdminScooty = {
  id: string;
  slug: string;
  name: string;
  category: string;
  tagline: string;
  description: string;
  priceLabel: string;
  priceNote: string;
  features: string; // JSON array string
  image: string;
  imageAlt: string;
  badge: string;
  active: boolean;
  sortOrder: number;
};

type Draft = {
  id: string | null; // null = create
  slug: string;
  name: string;
  category: string;
  tagline: string;
  description: string;
  priceLabel: string;
  priceNote: string;
  features: string[];
  image: string;
  imageAlt: string;
  badge: string;
  active: boolean;
  sortOrder: number;
};

function emptyDraft(): Draft {
  return {
    id: null,
    slug: "",
    name: "",
    category: "",
    tagline: "",
    description: "",
    priceLabel: "৳ — / DAY",
    priceNote: "",
    features: ["Automatic"],
    image: "",
    imageAlt: "",
    badge: "",
    active: true,
    sortOrder: 10,
  };
}

function toDraft(s: AdminScooty): Draft {
  let features: string[] = [];
  try {
    const parsed: unknown = JSON.parse(s.features);
    if (Array.isArray(parsed)) {
      features = parsed.filter((f): f is string => typeof f === "string");
    }
  } catch {
    features = [];
  }
  return { ...s, features };
}

/** Full fleet CRUD — list + editor panel. No code, all forms. */
export function ScootiesManager({ initial }: { initial: AdminScooty[] }) {
  const router = useRouter();
  const [items, setItems] = useState<AdminScooty[]>(initial);
  const [draft, setDraft] = useState<Draft | null>(null);
  const [busy, setBusy] = useState(false);

  async function refresh() {
    const res = await fetch("/api/admin/scooties");
    if (!res.ok) return;
    const data = (await res.json()) as { scooties: AdminScooty[] };
    setItems(data.scooties);
    router.refresh();
  }

  async function save() {
    if (!draft) return;
    if (draft.name.trim().length < 2) {
      toast.error("Give the scooty a name (at least 2 characters).");
      return;
    }
    setBusy(true);
    try {
      const payload = {
        ...draft,
        features: draft.features.filter((f) => f.trim().length > 0),
      };
      const res = await fetch(
        draft.id ? `/api/admin/scooties/${draft.id}` : "/api/admin/scooties",
        {
          method: draft.id ? "PATCH" : "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        },
      );
      const data = (await res.json()) as { ok: boolean; error?: string };
      if (!res.ok || !data.ok) {
        toast.error(data.error ?? "Could not save.");
        return;
      }
      toast.success(draft.id ? "Scooty updated." : "Scooty added.");
      setDraft(null);
      await refresh();
    } catch {
      toast.error("Network error while saving.");
    } finally {
      setBusy(false);
    }
  }

  async function toggleActive(s: AdminScooty) {
    const res = await fetch(`/api/admin/scooties/${s.id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ active: !s.active }),
    });
    if (!res.ok) {
      toast.error("Could not change visibility.");
      return;
    }
    toast.success(s.active ? "Hidden from the website." : "Now visible on the website.");
    await refresh();
  }

  async function remove(s: AdminScooty) {
    if (!window.confirm(`Delete "${s.name}" from the fleet? This cannot be undone.`)) {
      return;
    }
    const res = await fetch(`/api/admin/scooties/${s.id}`, { method: "DELETE" });
    if (!res.ok) {
      toast.error("Could not delete.");
      return;
    }
    toast.success("Scooty deleted.");
    await refresh();
  }

  const set = <K extends keyof Draft>(key: K, value: Draft[K]) =>
    setDraft((d) => (d ? { ...d, [key]: value } : d));

  return (
    <div className="space-y-6">
      <header className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="label-micro text-brand">FLEET</p>
          <h1 className="mt-1 font-display text-4xl tracking-wide text-ink">
            SCOOTIES
          </h1>
          <p className="mt-2 text-sm text-steel">
            Add machines, upload photos, set prices and control what visitors
            see on /scooties and the home page.
          </p>
        </div>
        <Button
          onClick={() => setDraft(emptyDraft())}
          disabled={draft !== null}
          className="h-11 rounded-none bg-brand font-display text-lg tracking-wider text-white hover:bg-ink"
        >
          <Plus className="h-5 w-5" aria-hidden="true" />
          ADD SCOOTY
        </Button>
      </header>

      {/* Editor panel */}
      {draft ? (
        <div className="border border-ink/15 bg-white shadow-lift">
          <div className="flex items-center justify-between border-b border-ink/10 bg-paper px-5 py-3">
            <p className="font-display text-2xl tracking-wide text-ink">
              {draft.id ? "EDIT SCOOTY" : "NEW SCOOTY"}
            </p>
            <Button
              variant="ghost"
              size="icon"
              aria-label="Close editor"
              onClick={() => setDraft(null)}
              className="rounded-none hover:bg-ink/5"
            >
              <X className="h-5 w-5" aria-hidden="true" />
            </Button>
          </div>

          <form
            onSubmit={(e) => {
              e.preventDefault();
              void save();
            }}
            className="grid gap-5 p-5 sm:grid-cols-2"
          >
            <div className="space-y-2">
              <Label htmlFor="s-name">NAME *</Label>
              <Input
                id="s-name"
                value={draft.name}
                onChange={(e) => set("name", e.target.value)}
                placeholder="MINI SCOOTY"
                className="h-10 rounded-none border-ink/20 bg-paper"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="s-category">CATEGORY LABEL</Label>
              <Input
                id="s-category"
                value={draft.category}
                onChange={(e) => set("category", e.target.value)}
                placeholder="LIGHT & EASY"
                className="h-10 rounded-none border-ink/20 bg-paper"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="s-price">PRICE LINE (SHOWN ON CARD)</Label>
              <Input
                id="s-price"
                value={draft.priceLabel}
                onChange={(e) => set("priceLabel", e.target.value)}
                placeholder="৳ 800 / DAY"
                className="h-10 rounded-none border-ink/20 bg-paper"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="s-badge">BADGE (OPTIONAL)</Label>
              <Input
                id="s-badge"
                value={draft.badge}
                onChange={(e) => set("badge", e.target.value)}
                placeholder="POPULAR"
                className="h-10 rounded-none border-ink/20 bg-paper"
              />
            </div>
            <div className="space-y-2 sm:col-span-2">
              <Label htmlFor="s-tagline">TAGLINE</Label>
              <Input
                id="s-tagline"
                value={draft.tagline}
                onChange={(e) => set("tagline", e.target.value)}
                placeholder="Compact, light and effortless on the tea-garden lanes."
                className="h-10 rounded-none border-ink/20 bg-paper"
              />
            </div>
            <div className="space-y-2 sm:col-span-2">
              <Label htmlFor="s-desc">DESCRIPTION</Label>
              <Textarea
                id="s-desc"
                value={draft.description}
                onChange={(e) => set("description", e.target.value)}
                rows={3}
                className="rounded-none border-ink/20 bg-paper"
              />
            </div>
            <div className="space-y-2 sm:col-span-2">
              <Label htmlFor="s-pricenote">PRICE NOTE (SMALL PRINT)</Label>
              <Input
                id="s-pricenote"
                value={draft.priceNote}
                onChange={(e) => set("priceNote", e.target.value)}
                placeholder="Rate confirmed personally on request — never guessed."
                className="h-10 rounded-none border-ink/20 bg-paper"
              />
            </div>

            <div className="sm:col-span-2">
              <ImagePickerField
                id="s-image"
                label="PHOTO"
                value={draft.image}
                onChange={(v) => set("image", v)}
                previewAspect="aspect-[4/3]"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="s-alt">PHOTO ALT TEXT (ACCESSIBILITY)</Label>
              <Input
                id="s-alt"
                value={draft.imageAlt}
                onChange={(e) => set("imageAlt", e.target.value)}
                placeholder="Red mini scooty parked against a cream background"
                className="h-10 rounded-none border-ink/20 bg-paper"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="s-order">DISPLAY ORDER (LOW = FIRST)</Label>
              <Input
                id="s-order"
                type="number"
                min={0}
                max={999}
                value={draft.sortOrder}
                onChange={(e) => set("sortOrder", Number(e.target.value) || 0)}
                className="h-10 rounded-none border-ink/20 bg-paper"
              />
            </div>

            <div className="space-y-2 sm:col-span-2">
              <Label>FEATURE LIST (UP TO 8)</Label>
              <ul className="space-y-2">
                {draft.features.map((f, i) => (
                  <li key={i} className="flex gap-2">
                    <Input
                      value={f}
                      onChange={(e) =>
                        set(
                          "features",
                          draft.features.map((x, j) => (j === i ? e.target.value : x)),
                        )
                      }
                      placeholder="Automatic"
                      className="h-10 rounded-none border-ink/20 bg-paper"
                    />
                    <Button
                      type="button"
                      variant="outline"
                      size="icon"
                      aria-label={`Remove feature ${i + 1}`}
                      onClick={() =>
                        set(
                          "features",
                          draft.features.filter((_, j) => j !== i),
                        )
                      }
                      className="h-10 w-10 shrink-0 rounded-none border-ink/20 bg-cream hover:bg-cream hover:text-brand"
                    >
                      <Trash2 className="h-4 w-4" aria-hidden="true" />
                    </Button>
                  </li>
                ))}
              </ul>
              {draft.features.length < 8 ? (
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => set("features", [...draft.features, ""])}
                  className="rounded-none border-ink/20 bg-cream hover:bg-cream hover:text-brand"
                >
                  <Plus className="h-4 w-4" aria-hidden="true" />
                  ADD FEATURE
                </Button>
              ) : null}
            </div>

            <div className="flex items-center justify-between gap-4 border border-ink/10 bg-paper px-4 py-3 sm:col-span-2">
              <div>
                <p className="text-sm font-semibold text-ink">
                  Visible on the website
                </p>
                <p className="text-xs text-steel">
                  Turn off to keep the entry as a draft without deleting it.
                </p>
              </div>
              <Switch
                checked={draft.active}
                onCheckedChange={(v) => set("active", v)}
                aria-label="Toggle visibility"
              />
            </div>

            <div className="flex gap-3 sm:col-span-2">
              <Button
                type="submit"
                disabled={busy}
                className="h-12 flex-1 rounded-none bg-brand font-display text-xl tracking-wider text-white hover:bg-ink sm:flex-none sm:px-10"
              >
                {busy ? (
                  <Loader2 className="h-5 w-5 animate-spin" aria-hidden="true" />
                ) : (
                  <Save className="h-5 w-5" aria-hidden="true" />
                )}
                {draft.id ? "SAVE CHANGES" : "CREATE SCOOTY"}
              </Button>
              <Button
                type="button"
                variant="outline"
                onClick={() => setDraft(null)}
                className="h-12 rounded-none border-ink/20 bg-cream hover:bg-cream hover:text-brand"
              >
                CANCEL
              </Button>
            </div>
          </form>
        </div>
      ) : null}

      {/* Fleet list */}
      {items.length === 0 ? (
        <div className="flex flex-col items-center gap-3 border border-dashed border-ink/25 bg-white px-6 py-14 text-center">
          <Bike className="h-8 w-8 text-steel" aria-hidden="true" />
          <p className="text-sm text-steel">
            No scooties yet. Add your first machine to fill /scooties and the
            home page showcase.
          </p>
        </div>
      ) : (
        <ul className="grid gap-4 md:grid-cols-2">
          {items.map((s) => (
            <li
              key={s.id}
              className={cn(
                "flex gap-4 border border-ink/10 bg-white p-4 transition-opacity",
                !s.active && "opacity-60",
              )}
            >
              <div className="relative h-24 w-28 shrink-0 overflow-hidden border border-ink/10 bg-paper">
                {s.image ? (
                  <img
                    src={s.image}
                    alt=""
                    className="absolute inset-0 h-full w-full object-cover"
                  />
                ) : (
                  <div className="absolute inset-0 flex items-center justify-center text-steel">
                    <Bike className="h-6 w-6" aria-hidden="true" />
                  </div>
                )}
              </div>
              <div className="min-w-0 flex-1">
                <div className="flex items-start justify-between gap-2">
                  <div className="min-w-0">
                    <p className="truncate font-display text-2xl leading-none tracking-wide text-ink">
                      {s.name}
                    </p>
                    <p className="label-micro mt-1 text-steel">
                      {s.category || "NO CATEGORY"} · {s.priceLabel}
                    </p>
                  </div>
                  {s.active ? (
                    <Badge className="shrink-0 rounded-none bg-emerald-100 text-emerald-800 hover:bg-emerald-100">
                      LIVE
                    </Badge>
                  ) : (
                    <Badge className="shrink-0 rounded-none bg-ink/10 text-steel hover:bg-ink/10">
                      DRAFT
                    </Badge>
                  )}
                </div>
                <p className="mt-1.5 line-clamp-2 text-xs leading-relaxed text-steel">
                  {s.tagline || s.description || "No description yet."}
                </p>
                <div className="mt-2.5 flex flex-wrap gap-2">
                  <Button
                    size="sm"
                    onClick={() => setDraft(toDraft(s))}
                    className="h-8 rounded-none bg-ink px-3 text-xs text-cream hover:bg-brand"
                  >
                    <Pencil className="h-3.5 w-3.5" aria-hidden="true" />
                    EDIT
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => void toggleActive(s)}
                    className="h-8 rounded-none border-ink/20 bg-cream px-3 text-xs hover:bg-cream hover:text-brand"
                  >
                    {s.active ? (
                      <>
                        <EyeOff className="h-3.5 w-3.5" aria-hidden="true" />
                        HIDE
                      </>
                    ) : (
                      <>
                        <Eye className="h-3.5 w-3.5" aria-hidden="true" />
                        SHOW
                      </>
                    )}
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => void remove(s)}
                    className="h-8 rounded-none border-ink/20 bg-cream px-3 text-xs text-brand hover:bg-cream hover:text-brand"
                  >
                    <Trash2 className="h-3.5 w-3.5" aria-hidden="true" />
                    DELETE
                  </Button>
                </div>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
