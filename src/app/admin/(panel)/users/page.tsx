import { redirect } from "next/navigation";

import { UsersManager } from "@/components/admin/users-manager";
import { db } from "@/lib/db";
import { getSessionUser } from "@/lib/admin-auth";

export const dynamic = "force-dynamic";

/** OWNER-only page — non-owners are bounced back to the dashboard. */
export default async function AdminUsersPage() {
  const user = await getSessionUser();
  if (!user) redirect("/admin/login");
  if (user.role !== "OWNER") redirect("/admin");

  const rows = await db.user.findMany({
    select: {
      id: true,
      email: true,
      name: true,
      role: true,
      active: true,
      createdAt: true,
      lastLoginAt: true,
    },
    orderBy: { createdAt: "asc" },
  });

  return (
    <UsersManager
      initial={rows.map((r) => ({
        ...r,
        createdAt: r.createdAt.toISOString(),
        lastLoginAt: r.lastLoginAt ? r.lastLoginAt.toISOString() : null,
      }))}
      currentUserEmail={user.email}
    />
  );
}
