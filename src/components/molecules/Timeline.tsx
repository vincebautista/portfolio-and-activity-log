import type { Project } from "@/types";
import Badge from "@/components/atoms/Badge";

// ---------------------------------------------------------------------------
// Timeline — chronological display of internship activities
// ---------------------------------------------------------------------------

export interface TimelineProps {
  /** Projects sorted by completion date ascending (oldest first) */
  projects: Project[];
}

export default function Timeline({ projects }: TimelineProps) {
  if (projects.length === 0) {
    return (
      <p className="text-sm text-muted-foreground">
        No timeline entries yet.
      </p>
    );
  }

  return (
    <ol className="relative border-l border-border">
      {projects.map((project) => {
        const formattedDate = new Date(project.completionDate).toLocaleDateString(
          "en-SG",
          { year: "numeric", month: "short" },
        );

        return (
          <li key={project.id} className="mb-8 ml-6 last:mb-0">
            {/* Timeline dot */}
            <span
              className="absolute -left-2 mt-1.5 flex h-4 w-4 items-center justify-center rounded-full border-2 border-brand bg-background"
              aria-hidden="true"
            >
              <span className="h-2 w-2 rounded-full bg-brand" />
            </span>

            {/* Content */}
            <div className="flex flex-col gap-1">
              <time
                dateTime={project.completionDate}
                className="text-xs font-medium text-brand"
              >
                {formattedDate}
              </time>
              <h3 className="text-base font-semibold text-foreground">
                {project.title}
              </h3>
              <p className="text-sm leading-relaxed text-muted-foreground line-clamp-2">
                {project.description}
              </p>
              <div className="mt-1 flex flex-wrap items-center gap-2">
                <Badge
                  label={project.category}
                  color="bg-brand/10 text-brand"
                />
                {project.techStack.slice(0, 3).map((tech) => (
                  <Badge key={tech} label={tech} />
                ))}
                {project.techStack.length > 3 && (
                  <Badge
                    label={`+${project.techStack.length - 3}`}
                    color="bg-muted text-muted-foreground"
                  />
                )}
              </div>
            </div>
          </li>
        );
      })}
    </ol>
  );
}