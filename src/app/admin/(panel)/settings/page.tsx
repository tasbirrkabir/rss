import { SettingsEditor } from "@/components/admin/settings-editor";
import { db } from "@/lib/db";

export const dynamic = "force-dynamic";

export default async function AdminSettingsPage() {
  const row = await db.siteConfig.findUnique({ where: { id: 1 } });
  if (!row) {
    return (
      <p className="border border-ink/10 bg-white p-6 text-sm text-steel">
        Site config is not seeded yet. Run the database seed once.
      </p>
    );
  }
  return <SettingsEditor initial={row} />;
}
