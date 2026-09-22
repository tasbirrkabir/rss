"use client";

import { track, type AnalyticsEvent } from "@/lib/analytics";

type TrackedLinkProps = {
  event: AnalyticsEvent;
  source: string;
  href: string;
  className?: string;
  children: React.ReactNode;
  external?: boolean;
  ariaLabel?: string;
};

/**
 * Anchor with analytics tracking (PRD section 29 events) usable from
 * server components.
 */
export function TrackedLink({
  event,
  source,
  href,
  className,
  children,
  external = false,
  ariaLabel,
}: TrackedLinkProps) {
  return (
    <a
      href={href}
      className={className}
      aria-label={ariaLabel}
      onClick={() => track(event, { source })}
      {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
    >
      {children}
    </a>
  );
}
