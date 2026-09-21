/**
 * Lightweight analytics event layer (PRD section 29).
 * Pushes to window.dataLayer (GTM-compatible) when present; logs in dev.
 * No third-party script is loaded in the demo.
 */

export type AnalyticsEvent =
  | "click_call"
  | "click_whatsapp"
  | "click_booking"
  | "view_fleet"
  | "view_destination"
  | "start_booking"
  | "submit_booking"
  | "get_directions"
  | "click_facebook"
  | "click_instagram"
  | "click_youtube";

declare global {
  interface Window {
    dataLayer?: Array<Record<string, unknown>>;
  }
}

export function track(
  event: AnalyticsEvent,
  params?: Record<string, unknown>,
) {
  if (typeof window === "undefined") return;
  window.dataLayer = window.dataLayer ?? [];
  window.dataLayer.push({ event, ...params });
  if (process.env.NODE_ENV === "development") {
    console.debug("[analytics]", event, params ?? {});
  }
}
