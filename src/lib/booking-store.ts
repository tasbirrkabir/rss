"use client";

import { create } from "zustand";

type OpenBookingOptions = {
  vehicleId?: string;
  presetMessage?: string;
};

type BookingStore = {
  open: boolean;
  vehicleId?: string;
  presetMessage?: string;
  openBooking: (opts?: OpenBookingOptions) => void;
  closeBooking: () => void;
};

/** Shared control for the booking drawer/dialog (PRD section 36: booking modal). */
export const useBookingStore = create<BookingStore>((set) => ({
  open: false,
  vehicleId: undefined,
  presetMessage: undefined,
  openBooking: (opts) =>
    set({
      open: true,
      vehicleId: opts?.vehicleId,
      presetMessage: opts?.presetMessage,
    }),
  closeBooking: () =>
    set({ open: false, vehicleId: undefined, presetMessage: undefined }),
}));
