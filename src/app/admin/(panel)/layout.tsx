import type { Metadata } from "next";
import { redirect } from "next/navigation";

import { AdminShell } from "@/components/admin/admin-shell";
import { getSessionUser } from "@/lib/admin-auth";
import { Toaster } from "@/components/ui/sonner";

export const metadata: Metadata = {
  title: "Admin — Demo Scooty Rental",
  robots: { index: false, follow: false },
};

/**
 * /admin/* (except /admin/login) requires a valid session.
 * The layout is the single enforcement point for page access.
 */
export default async function AdminPanelLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await getSessionUser();
  if (!user) redirect("/admin/login");

  return (
    <AdminShell user={user}>
      {children}
      <Toaster position="bottom-right" richColors />
    </AdminShell>
  );
}
