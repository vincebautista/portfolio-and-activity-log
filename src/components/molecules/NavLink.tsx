"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { ReactNode } from "react";

// ---------------------------------------------------------------------------
// NavLink — molecule wrapping Next.js Link with active-state styling
// ---------------------------------------------------------------------------

export interface NavLinkProps {
  /** Target route */
  href: string;
  /** Link display content */
  children: ReactNode;
  /** Optional additional CSS classes */
  className?: string;
  /**
   * Matching strategy for determining active state.
   * - "exact": only active when pathname === href
   * - "prefix": active when pathname starts with href (default)
   */
  match?: "exact" | "prefix";
}

export default function NavLink({
  href,
  children,
  className = "",
  match = "prefix",
}: NavLinkProps) {
  const pathname = usePathname();

  const isActive =
    match === "exact" ? pathname === href : pathname.startsWith(href);

  return (
    <Link
      href={href}
      className={`rounded-md px-3 py-2 text-sm font-medium transition-colors ${
        isActive
          ? "bg-brand text-brand-foreground"
          : "text-muted-foreground hover:bg-muted hover:text-foreground"
      } ${className}`}
      aria-current={isActive ? "page" : undefined}
    >
      {children}
    </Link>
  );
}