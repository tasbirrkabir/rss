import { HomeEditor } from "@/components/admin/home-editor";
import { db } from "@/lib/db";

export const dynamic = "force-dynamic";

export default async function AdminHomePage() {
  const row = await db.homeContent.findUnique({ where: { id: 1 } });
  if (!row) {
    return (
      <p className="border border-ink/10 bg-white p-6 text-sm text-steel">
        Home content is not seeded yet. Run the database seed once.
      </p>
    );
  }
  return <HomeEditor initial={row} />;
}
