import type { Project, ProjectCategory } from "@/types";
import projectsData from "../../data/projects.json";

// ---------------------------------------------------------------------------
// Guard: assert no duplicate project IDs at module load time
// ---------------------------------------------------------------------------
const ids = (projectsData as Project[]).map((p: Project) => p.id);
const uniqueIds = new Set(ids);
if (uniqueIds.size !== ids.length) {
  const seen = new Set<string>();
  const duplicates = ids.filter((id: string) => {
    if (seen.has(id)) return true;
    seen.add(id);
    return false;
  });
  throw new Error(
    `Duplicate project IDs found in projects.json: ${[...new Set(duplicates)].join(", ")}`,
  );
}

// Cast through the Project type — the JSON shape matches the interface exactly.
const projects: Project[] = projectsData as Project[];

// ---------------------------------------------------------------------------
// Public API
// ---------------------------------------------------------------------------

/** Returns the full array of all projects. */
export function getAllProjects(): Project[] {
  return projects;
}

/** Returns only projects marked as featured. */
export function getFeaturedProjects(): Project[] {
  return projects.filter((p) => p.featured);
}

/**
 * Returns projects matching the given category.
 * Returns an empty array (never null) when no matches exist.
 */
export function getProjectsByCategory(category: ProjectCategory): Project[] {
  return projects.filter((p) => p.category === category);
}

/**
 * Returns a deduplicated, sorted array of every category present
 * across all projects in the data file.
 */
export function getAllCategories(): ProjectCategory[] {
  const categories = new Set(projects.map((p) => p.category));
  return Array.from(categories).sort();
}