import type { Project } from "@/types";

/**
 * Derives a deduplicated, sorted list of every tech stack item
 * present across the given projects array.
 *
 * This is a pure utility function — no React, no hooks, no "use client".
 * Safe to call from Server Components.
 */
export function deriveTechStacks(projects: Project[]): string[] {
  const techs = new Set(projects.flatMap((p) => p.techStack));
  return Array.from(techs).sort();
}