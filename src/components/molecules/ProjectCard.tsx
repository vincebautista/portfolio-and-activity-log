import type { Project } from "@/types";
import Badge from "@/components/atoms/Badge";

// ---------------------------------------------------------------------------
// ProjectCard — molecule composing Badge atoms to display a project summary
// ---------------------------------------------------------------------------

export interface ProjectCardProps {
  project: Project;
}

/** Maximum number of tech stack badges to render before showing overflow */
const MAX_VISIBLE_TECHS = 4;

export default function ProjectCard({ project }: ProjectCardProps) {
  const { title, description, category, techStack, completionDate } = project;

  const visibleTechs = techStack.slice(0, MAX_VISIBLE_TECHS);
  const overflowCount = techStack.length - MAX_VISIBLE_TECHS;

  const formattedDate = new Date(completionDate).toLocaleDateString("en-SG", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });

  return (
    <article className="flex flex-col gap-4 rounded-xl border border-border bg-background p-5 shadow-sm transition-shadow hover:shadow-md">
      {/* Title */}
      <h3 className="text-lg font-semibold leading-snug text-foreground">
        {title}
      </h3>

      {/* Description — truncated to 2 lines via CSS */}
      <p className="line-clamp-2 text-sm leading-relaxed text-muted-foreground">
        {description}
      </p>

      {/* Category badge */}
      <Badge
        label={category}
        color="bg-brand/10 text-brand"
      />

      {/* Tech stack badges */}
      {techStack.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {visibleTechs.map((tech) => (
            <Badge key={tech} label={tech} />
          ))}
          {overflowCount > 0 && (
            <Badge
              label={`+${overflowCount} more`}
              color="bg-muted text-muted-foreground"
            />
          )}
        </div>
      )}

      {/* Completion date */}
      <time
        dateTime={completionDate}
        className="text-xs text-muted-foreground"
      >
        Completed {formattedDate}
      </time>
    </article>
  );
}