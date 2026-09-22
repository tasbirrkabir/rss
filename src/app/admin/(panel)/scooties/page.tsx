import { ScootiesManager } from "@/components/admin/scooties-manager";
import { db } from "@/lib/db";

export const dynamic = "force-dynamic";

export default async function AdminScootiesPage() {
  const rows = await db.scooty.findMany({
    orderBy: [{ sortOrder: "asc" }, { createdAt: "asc" }],
  });
  return <ScootiesManager initial={rows} />;
}
