"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  KeyRound,
  Loader2,
  Plus,
  ShieldCheck,
  Trash2,
  UserRound,
} from "lucide-react";
import { toast } from "sonner";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";

export type AdminUser = {
  id: string;
  email: string;
  name: string;
  role: string;
  active: boolean;
  createdAt: string;
  lastLoginAt: string | null;
};

/** OWNER-only access management: add/remove users, reset passwords, roles. */
export function UsersManager({
  initial,
  currentUserEmail,
}: {
  initial: AdminUser[];
  currentUserEmail: string;
}) {
  const router = useRouter();
  const [users, setUsers] = useState<AdminUser[]>(initial);
  const [addOpen, setAddOpen] = useState(false);
  const [busy, setBusy] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", password: "", role: "ADMIN" });
  const [resetTarget, setResetTarget] = useState<AdminUser | null>(null);
  const [resetPassword, setResetPassword] = useState("");

  async function refresh() {
    const res = await fetch("/api/admin/users");
    if (!res.ok) return;
    const data = (await res.json()) as { users: AdminUser[] };
    setUsers(data.users);
    router.refresh();
  }

  async function addUser(e: React.FormEvent) {
    e.preventDefault();
    setBusy(true);
    try {
      const res = await fetch("/api/admin/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = (await res.json()) as { ok: boolean; error?: string };
      if (!res.ok || !data.ok) {
        toast.error(data.error ?? "Could not create the user.");
        return;
      }
      toast.success(`${form.name} can now sign in.`);
      setAddOpen(false);
      setForm({ name: "", email: "", password: "", role: "ADMIN" });
      await refresh();
    } finally {
      setBusy(false);
    }
  }

  async function patch(user: AdminUser, body: Record<string, unknown>) {
    const res = await fetch(`/api/admin/users/${user.id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });
    const data = (await res.json()) as { ok: boolean; error?: string };
    if (!res.ok || !data.ok) {
      toast.error(data.error ?? "Could not update the user.");
      return false;
    }
    await refresh();
    return true;
  }

  async function remove(user: AdminUser) {
    if (
      !window.confirm(
        `Delete ${user.name} (${user.email})? They will lose access immediately.`,
      )
    ) {
      return;
    }
    const res = await fetch(`/api/admin/users/${user.id}`, { method: "DELETE" });
    const data = (await res.json()) as { ok: boolean; error?: string };
    if (!res.ok || !data.ok) {
      toast.error(data.error ?? "Could not delete the user.");
      return;
    }
    toast.success("User deleted.");
    await refresh();
  }

  async function submitReset(e: React.FormEvent) {
    e.preventDefault();
    if (!resetTarget) return;
    if (resetPassword.length < 8) {
      toast.error("Password must be at least 8 characters.");
      return;
    }
    setBusy(true);
    try {
      const ok = await patch(resetTarget, { password: resetPassword });
      if (ok) {
        toast.success(`Password reset for ${resetTarget.name}.`);
        setResetTarget(null);
        setResetPassword("");
      }
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="space-y-6">
      <header className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="label-micro text-brand">OWNER AREA</p>
          <h1 className="mt-1 font-display text-4xl tracking-wide text-ink">
            ACCESS
          </h1>
          <p className="mt-2 max-w-2xl text-sm text-steel">
            <ShieldCheck className="mr-1 inline h-4 w-4 text-brand" aria-hidden="true" />
            <strong>OWNER</strong> — full control, including this page.{" "}
            <UserRound className="mr-1 inline h-4 w-4 text-steel" aria-hidden="true" />
            <strong>ADMIN</strong> — manages content, fleet and bookings but
            cannot touch user accounts.
          </p>
        </div>
        <Button
          onClick={() => setAddOpen(true)}
          className="h-11 rounded-none bg-brand font-display text-lg tracking-wider text-white hover:bg-ink"
        >
          <Plus className="h-5 w-5" aria-hidden="true" />
          ADD USER
        </Button>
      </header>

      <ul className="grid gap-4 md:grid-cols-2">
        {users.map((u) => {
          const isSelf = u.email === currentUserEmail;
          return (
            <li
              key={u.id}
              className={cn(
                "border border-ink/10 bg-white p-5",
                !u.active && "opacity-60",
              )}
            >
              <div className="flex items-start justify-between gap-3">
                <div className="min-w-0">
                  <p className="truncate font-display text-2xl leading-none tracking-wide text-ink">
                    {u.name}
                    {isSelf ? (
                      <span className="label-micro ml-2 align-middle text-brand">
                        (YOU)
                      </span>
                    ) : null}
                  </p>
                  <p className="mt-1 truncate text-sm text-steel">{u.email}</p>
                  <p className="label-micro mt-2 text-steel">
                    Last sign-in:{" "}
                    {u.lastLoginAt
                      ? new Date(u.lastLoginAt).toLocaleString("en-GB")
                      : "never"}
                  </p>
                </div>
                <div className="flex shrink-0 flex-col items-end gap-1.5">
                  <Badge
                    className={cn(
                      "rounded-none",
                      u.role === "OWNER"
                        ? "bg-brand text-white hover:bg-brand"
                        : "bg-ink/10 text-ink hover:bg-ink/10",
                    )}
                  >
                    {u.role}
                  </Badge>
                  <Badge
                    className={cn(
                      "rounded-none",
                      u.active
                        ? "bg-emerald-100 text-emerald-800 hover:bg-emerald-100"
                        : "bg-ink/10 text-steel hover:bg-ink/10",
                    )}
                  >
                    {u.active ? "ACTIVE" : "BLOCKED"}
                  </Badge>
                </div>
              </div>

              <div className="mt-4 flex flex-wrap gap-2">
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => setResetTarget(u)}
                  className="h-8 rounded-none border-ink/20 bg-cream px-3 text-xs hover:bg-cream hover:text-brand"
                >
                  <KeyRound className="h-3.5 w-3.5" aria-hidden="true" />
                  RESET PASSWORD
                </Button>
                {!isSelf ? (
                  <>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => void patch(u, { active: !u.active })}
                      className="h-8 rounded-none border-ink/20 bg-cream px-3 text-xs hover:bg-cream hover:text-brand"
                    >
                      {u.active ? "BLOCK" : "UNBLOCK"}
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() =>
                        void patch(u, { role: u.role === "OWNER" ? "ADMIN" : "OWNER" })
                      }
                      className="h-8 rounded-none border-ink/20 bg-cream px-3 text-xs hover:bg-cream hover:text-brand"
                    >
                      MAKE {u.role === "OWNER" ? "ADMIN" : "OWNER"}
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => void remove(u)}
                      className="h-8 rounded-none border-ink/20 bg-cream px-3 text-xs text-brand hover:bg-cream hover:text-brand"
                    >
                      <Trash2 className="h-3.5 w-3.5" aria-hidden="true" />
                      DELETE
                    </Button>
                  </>
                ) : null}
              </div>
            </li>
          );
        })}
      </ul>

      {/* Add user dialog */}
      <Dialog open={addOpen} onOpenChange={setAddOpen}>
        <DialogContent className="rounded-none border-ink/15 bg-cream sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="font-display text-3xl tracking-wide">
              ADD USER
            </DialogTitle>
            <DialogDescription className="text-steel">
              Create an admin or another owner. They can sign in immediately.
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={addUser} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="u-name">NAME</Label>
              <Input
                id="u-name"
                required
                value={form.name}
                onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
                className="h-10 rounded-none border-ink/20 bg-paper"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="u-email">EMAIL</Label>
              <Input
                id="u-email"
                type="email"
                required
                value={form.email}
                onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
                className="h-10 rounded-none border-ink/20 bg-paper"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="u-pass">PASSWORD (MIN 8 CHARACTERS)</Label>
              <Input
                id="u-pass"
                type="text"
                required
                minLength={8}
                value={form.password}
                onChange={(e) => setForm((f) => ({ ...f, password: e.target.value }))}
                className="h-10 rounded-none border-ink/20 bg-paper"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="u-role">ROLE</Label>
              <Select
                value={form.role}
                onValueChange={(v) => setForm((f) => ({ ...f, role: v }))}
              >
                <SelectTrigger
                  id="u-role"
                  className="w-full rounded-none border-ink/20 bg-paper"
                >
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="ADMIN">ADMIN — content & bookings</SelectItem>
                  <SelectItem value="OWNER">OWNER — full control</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <DialogFooter>
              <Button
                type="submit"
                disabled={busy}
                className="h-11 w-full rounded-none bg-brand font-display text-lg tracking-wider text-white hover:bg-ink"
              >
                {busy ? (
                  <Loader2 className="h-5 w-5 animate-spin" aria-hidden="true" />
                ) : (
                  <Plus className="h-5 w-5" aria-hidden="true" />
                )}
                CREATE USER
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      {/* Reset password dialog */}
      <Dialog
        open={resetTarget !== null}
        onOpenChange={(open) => !open && setResetTarget(null)}
      >
        <DialogContent className="rounded-none border-ink/15 bg-cream sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="font-display text-3xl tracking-wide">
              RESET PASSWORD
            </DialogTitle>
            <DialogDescription className="text-steel">
              {resetTarget ? `${resetTarget.name} · ${resetTarget.email}` : ""}
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={submitReset} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="u-newpass">NEW PASSWORD (MIN 8 CHARACTERS)</Label>
              <Input
                id="u-newpass"
                type="text"
                required
                minLength={8}
                value={resetPassword}
                onChange={(e) => setResetPassword(e.target.value)}
                className="h-10 rounded-none border-ink/20 bg-paper"
              />
            </div>
            <DialogFooter>
              <Button
                type="submit"
                disabled={busy}
                className="h-11 w-full rounded-none bg-brand font-display text-lg tracking-wider text-white hover:bg-ink"
              >
                {busy ? (
                  <Loader2 className="h-5 w-5 animate-spin" aria-hidden="true" />
                ) : (
                  <KeyRound className="h-5 w-5" aria-hidden="true" />
                )}
                SET PASSWORD
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
