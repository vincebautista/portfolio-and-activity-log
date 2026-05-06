"use client";

import ProjectCard from "@/components/molecules/ProjectCard";
import ProjectFilter from "@/components/molecules/ProjectFilter";
import type { Project, ProjectCategory } from "@/types";

interface WorkGalleryProps {
  projects: Project[];
  categories: ProjectCategory[];
  allTechStacks: string[];
}

export default function WorkGallery({
  projects,
  categories,
  allTechStacks,
}: WorkGalleryProps) {
  return (
    <ProjectFilter
      projects={projects}
      categories={categories}
      allTechStacks={allTechStacks}
    >
      {(filtered) =>
        filtered.length === 0 ? (
          <p className="py-12 text-center text-muted-foreground">
            No projects match the selected filters. Try a different combination.
          </p>
        ) : (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {filtered.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </div>
        )
      }
    </ProjectFilter>
  );
}