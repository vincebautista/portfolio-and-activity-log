import type { ReactNode } from "react";

// ---------------------------------------------------------------------------
// Badge — atomic label / tag element
// ---------------------------------------------------------------------------

export interface BadgeProps {
  /** Text content displayed inside the badge */
  label: string;
  /** Optional Tailwind background color class (defaults to muted) */
  color?: string;
  /** Optional icon or prefix element */
  children?: ReactNode;
}

const DEFAULT_COLOR = "bg-muted text-muted-foreground";

export default function Badge({
  label,
  color = DEFAULT_COLOR,
  children,
}: BadgeProps) {
  return (
    <span
      className={`inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-xs font-medium ${color}`}
    >
      {children}
      {label}
    </span>
  );
}