"use client";

import { useMemo, useState } from "react";
import type { Project, ProjectCategory } from "@/types";
import Button from "@/components/atoms/Button";

// ---------------------------------------------------------------------------
// ProjectFilter — pure filtering logic separated from UI display (SOLID)
// ---------------------------------------------------------------------------

export interface ProjectFilterProps {
  /** All available projects to filter */
  projects: Project[];
  /** All unique categories across projects */
  categories: ProjectCategory[];
  /** All unique tech stack items across projects */
  allTechStacks: string[];
  /** Render prop — receives filtered projects and renders them */
  children: (filtered: Project[]) => React.ReactNode;
}

export default function ProjectFilter({
  projects,
  categories,
  allTechStacks,
  children,
}: ProjectFilterProps) {
  const [selectedCategory, setSelectedCategory] = useState<ProjectCategory | "all">("all");
  const [selectedTech, setSelectedTech] = useState<string | "all">("all");

  const filtered = useMemo(() => {
    let result = projects;

    if (selectedCategory !== "all") {
      result = result.filter((p) => p.category === selectedCategory);
    }

    if (selectedTech !== "all") {
      result = result.filter((p) => p.techStack.includes(selectedTech));
    }

    return result;
  }, [projects, selectedCategory, selectedTech]);

  return (
    <div>
      {/* Filter controls */}
      <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        {/* Category filter */}
        <fieldset>
          <legend className="mb-2 text-sm font-medium text-muted-foreground">
            Filter by Category
          </legend>
          <div className="flex flex-wrap gap-2">
            <Button
              variant={selectedCategory === "all" ? "primary" : "ghost"}
              size="sm"
              onClick={() => setSelectedCategory("all")}
            >
              All
            </Button>
            {categories.map((cat) => (
              <Button
                key={cat}
                variant={selectedCategory === cat ? "primary" : "ghost"}
                size="sm"
                onClick={() => setSelectedCategory(cat)}
              >
                {cat}
              </Button>
            ))}
          </div>
        </fieldset>

        {/* Tech stack filter */}
        <fieldset>
          <legend className="mb-2 text-sm font-medium text-muted-foreground">
            Filter by Tech
          </legend>
          <div className="flex flex-wrap gap-2">
            <Button
              variant={selectedTech === "all" ? "primary" : "ghost"}
              size="sm"
              onClick={() => setSelectedTech("all")}
            >
              All
            </Button>
            {allTechStacks.map((tech) => (
              <Button
                key={tech}
                variant={selectedTech === tech ? "primary" : "ghost"}
                size="sm"
                onClick={() => setSelectedTech(tech)}
              >
                {tech}
              </Button>
            ))}
          </div>
        </fieldset>
      </div>

      {/* Results count */}
      <p className="mb-6 text-sm text-muted-foreground">
        Showing {filtered.length} of {projects.length} project
        {projects.length !== 1 ? "s" : ""}
      </p>

      {/* Render prop — consumer decides how to display */}
      {children(filtered)}
    </div>
  );
}