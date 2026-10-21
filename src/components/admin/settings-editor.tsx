"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Loader2, RotateCcw, Save } from "lucide-react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export type AdminSettings = {
  phoneDisplay: string;
  phoneIntl: string;
  whatsappNumber: string;
  email: string;
  addressLine1: string;
  addressLine2: string;
  plusCode: string;
  facebookUrl: string;
  youtubeId: string;
  mapsUrl: string;
  lat: number;
  lng: number;
};

/** /admin/settings — contact details used across the whole website. */
export function SettingsEditor({ initial }: { initial: AdminSettings }) {
  const router = useRouter();
  const [form, setForm] = useState<AdminSettings>(initial);
  const [busy, setBusy] = useState(false);

  const set = <K extends keyof AdminSettings>(key: K, value: AdminSettings[K]) =>
    setForm((f) => ({ ...f, [key]: value }));

  async function save(e: React.FormEvent) {
    e.preventDefault();
    setBusy(true);
    try {
      const res = await fetch("/api/admin/settings", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = (await res.json()) as { ok: boolean; error?: string };
      if (!res.ok || !data.ok) {
        toast.error(data.error ?? "Could not save.");
        return;
      }
      toast.success("Contact details saved.");
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
          <p className="label-micro text-brand">SITE SETTINGS</p>
          <h1 className="mt-1 font-display text-4xl tracking-wide text-ink">
            CONTACT DETAILS
          </h1>
          <p className="mt-2 max-w-2xl text-sm text-steel">
            Phone, WhatsApp, email, address and socials — these flow into the
            header, footer, mobile bar, booking form and contact page.
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
            SAVE DETAILS
          </Button>
        </div>
      </header>

      <section className="border border-ink/10 bg-white">
        <div className="border-b border-ink/10 bg-paper px-5 py-3">
          <h2 className="font-display text-2xl tracking-wide text-ink">
            PHONE & MESSAGING
          </h2>
        </div>
        <div className="grid gap-5 p-5 sm:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="c-phone">PHONE (DISPLAY)</Label>
            <Input
              id="c-phone"
              value={form.phoneDisplay}
              onChange={(e) => set("phoneDisplay", e.target.value)}
              className="h-10 rounded-none border-ink/20 bg-paper"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="c-intl">PHONE (INTERNATIONAL, FOR tel: LINKS)</Label>
            <Input
              id="c-intl"
              value={form.phoneIntl}
              onChange={(e) => set("phoneIntl", e.target.value)}
              placeholder="+8801700000000"
              className="h-10 rounded-none border-ink/20 bg-paper"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="c-wa">WHATSAPP NUMBER (DIGITS, WITH COUNTRY CODE)</Label>
            <Input
              id="c-wa"
              value={form.whatsappNumber}
              onChange={(e) => set("whatsappNumber", e.target.value)}
              placeholder="8801700000000"
              className="h-10 rounded-none border-ink/20 bg-paper"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="c-email">EMAIL</Label>
            <Input
              id="c-email"
              type="email"
              value={form.email}
              onChange={(e) => set("email", e.target.value)}
              className="h-10 rounded-none border-ink/20 bg-paper"
            />
          </div>
        </div>
      </section>

      <section className="border border-ink/10 bg-white">
        <div className="border-b border-ink/10 bg-paper px-5 py-3">
          <h2 className="font-display text-2xl tracking-wide text-ink">
            ADDRESS & LOCATION
          </h2>
        </div>
        <div className="grid gap-5 p-5 sm:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="c-addr1">ADDRESS LINE 1</Label>
            <Input
              id="c-addr1"
              value={form.addressLine1}
              onChange={(e) => set("addressLine1", e.target.value)}
              className="h-10 rounded-none border-ink/20 bg-paper"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="c-addr2">ADDRESS LINE 2</Label>
            <Input
              id="c-addr2"
              value={form.addressLine2}
              onChange={(e) => set("addressLine2", e.target.value)}
              className="h-10 rounded-none border-ink/20 bg-paper"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="c-plus">PLUS CODE</Label>
            <Input
              id="c-plus"
              value={form.plusCode}
              onChange={(e) => set("plusCode", e.target.value)}
              className="h-10 rounded-none border-ink/20 bg-paper"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="c-maps">GOOGLE MAPS LINK</Label>
            <Input
              id="c-maps"
              value={form.mapsUrl}
              onChange={(e) => set("mapsUrl", e.target.value)}
              className="h-10 rounded-none border-ink/20 bg-paper"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="c-lat">MAP LATITUDE</Label>
            <Input
              id="c-lat"
              type="number"
              step="any"
              value={form.lat}
              onChange={(e) => set("lat", Number(e.target.value))}
              className="h-10 rounded-none border-ink/20 bg-paper"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="c-lng">MAP LONGITUDE</Label>
            <Input
              id="c-lng"
              type="number"
              step="any"
              value={form.lng}
              onChange={(e) => set("lng", Number(e.target.value))}
              className="h-10 rounded-none border-ink/20 bg-paper"
            />
          </div>
        </div>
      </section>

      <section className="border border-ink/10 bg-white">
        <div className="border-b border-ink/10 bg-paper px-5 py-3">
          <h2 className="font-display text-2xl tracking-wide text-ink">SOCIAL</h2>
        </div>
        <div className="grid gap-5 p-5 sm:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="c-fb">FACEBOOK PAGE URL</Label>
            <Input
              id="c-fb"
              value={form.facebookUrl}
              onChange={(e) => set("facebookUrl", e.target.value)}
              className="h-10 rounded-none border-ink/20 bg-paper"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="c-yt">YOUTUBE VIDEO ID (FOR THE VIDEO BAND)</Label>
            <Input
              id="c-yt"
              value={form.youtubeId}
              onChange={(e) => set("youtubeId", e.target.value)}
              placeholder="vk0oyKnZVPs"
              className="h-10 rounded-none border-ink/20 bg-paper"
            />
          </div>
        </div>
      </section>
    </form>
  );
}
