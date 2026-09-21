import { cn } from "@/lib/utils";

type DemoBadgeProps = {
  children?: React.ReactNode;
  className?: string;
};

/**
 * Honesty marker for clearly-labelled demo data (brief: DEMO DATA RULE).
 * Dashed border reads as "placeholder" at a glance.
 */
export function DemoBadge({ children = "DEMO DATA", className }: DemoBadgeProps) {
  return (
    <span
      className={cn(
        "label-micro inline-flex items-center gap-1 border border-dashed border-steel px-1.5 py-0.5 text-steel",
        className,
      )}
    >
      {children}
    </span>
  );
}
