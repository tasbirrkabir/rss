"use client";

import { useIsMobile } from "@/hooks/use-mobile";
import { useBookingStore } from "@/lib/booking-store";
import { BookingForm } from "@/components/site/booking-form";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer";

/**
 * Booking surface (PRD sections 23 / 36):
 * bottom drawer on mobile (thumb-friendly), centered dialog on desktop.
 * Shares state with every CTA on the page through the booking store.
 */
export function BookingOverlay() {
  const open = useBookingStore((s) => s.open);
  const vehicleId = useBookingStore((s) => s.vehicleId);
  const presetMessage = useBookingStore((s) => s.presetMessage);
  const closeBooking = useBookingStore((s) => s.closeBooking);
  const isMobile = useIsMobile();

  const formKey = `${vehicleId ?? "any"}-${presetMessage ?? "nomsg"}`;
  const form = (
    <BookingForm
      key={formKey}
      defaultVehicleId={vehicleId}
      defaultMessage={presetMessage}
      compact
    />
  );

  if (isMobile) {
    return (
      <Drawer open={open} onOpenChange={(o) => !o && closeBooking()}>
        <DrawerContent className="max-h-[92vh] rounded-t-none border-2 border-ink bg-paper">
          <DrawerHeader className="border-b-2 border-ink bg-ink text-left">
            <DrawerTitle className="font-display text-4xl tracking-wide text-cream">
              BOOK A SCOOTY
            </DrawerTitle>
            <p className="label-micro mt-1 text-cream/60">
              REQUEST NOW · CONFIRMED PERSONALLY
            </p>
          </DrawerHeader>
          <div className="scrollbar-brutal overflow-y-auto">{form}</div>
        </DrawerContent>
      </Drawer>
    );
  }

  return (
    <Dialog open={open} onOpenChange={(o) => !o && closeBooking()}>
      <DialogContent
        aria-describedby={undefined}
        className="max-h-[90vh] overflow-hidden rounded-none border-2 border-ink bg-paper p-0 shadow-hard-lg sm:max-w-lg"
      >
        <DialogHeader className="border-b-2 border-ink bg-ink p-5 text-left">
          <DialogTitle className="font-display text-4xl tracking-wide text-cream">
            BOOK A SCOOTY
          </DialogTitle>
          <p className="label-micro mt-1 text-cream/60">
            REQUEST NOW · CONFIRMED PERSONALLY
          </p>
        </DialogHeader>
        <div className="scrollbar-brutal max-h-[calc(90vh-96px)] overflow-y-auto">
          {form}
        </div>
      </DialogContent>
    </Dialog>
  );
}
