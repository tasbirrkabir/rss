import { BookingsManager } from "@/components/admin/bookings-manager";
import { db } from "@/lib/db";

export const dynamic = "force-dynamic";

export default async function AdminBookingsPage() {
  const rows = await db.bookingRequest.findMany({
    orderBy: { createdAt: "desc" },
  });
  const serialised = rows.map((r) => ({
    ...r,
    createdAt: r.createdAt.toISOString(),
  }));
  return <BookingsManager initial={serialised} />;
}
