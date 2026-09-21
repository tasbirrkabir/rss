"use client";

import { ArrowRight } from "lucide-react";

import { Button } from "@/components/ui/button";
import { track } from "@/lib/analytics";
import { useBookingStore } from "@/lib/booking-store";

type BookRideButtonProps = {
  source: string;
  vehicleId?: string;
  presetMessage?: string;
  className?: string;
  children?: React.ReactNode;
  ariaLabel?: string;
};

/**
 * Client wrapper so server sections can trigger the booking drawer.
 */
export function BookRideButton({
  source,
  vehicleId,
  presetMessage,
  className,
  children,
  ariaLabel,
}: BookRideButtonProps) {
  const openBooking = useBookingStore((s) => s.openBooking);

  return (
    <Button
      className={className}
      aria-label={ariaLabel}
      onClick={() => {
        track("click_booking", { source });
        openBooking({ vehicleId, presetMessage });
      }}
    >
      {children ?? (
        <>
          BOOK A RIDE <ArrowRight className="ml-2 h-5 w-5" aria-hidden="true" />
        </>
      )}
    </Button>
  );
}
