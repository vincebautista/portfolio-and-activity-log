import Image from "next/image";
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
  const { title, description, category, techStack, completionDate, imageUrl } =
    project;

  const visibleTechs = techStack.slice(0, MAX_VISIBLE_TECHS);
  const overflowCount = techStack.length - MAX_VISIBLE_TECHS;

  const formattedDate = new Date(completionDate).toLocaleDateString("en-SG", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });

  return (
    <article className="flex flex-col overflow-hidden rounded-xl border border-border bg-background shadow-sm transition-shadow hover:shadow-md">
      {/* Project image — uses next/image for optimization, with fallback */}
      {imageUrl ? (
        <div className="relative aspect-video w-full overflow-hidden bg-muted">
          <Image
            src={imageUrl}
            alt={`${title} project thumbnail`}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className="object-cover"
          />
        </div>
      ) : (
        <div className="flex aspect-video w-full items-center justify-center bg-muted">
          <span className="text-sm text-muted-foreground">No image</span>
        </div>
      )}

      <div className="flex flex-col gap-4 p-5">
        {/* Title */}
        <h3 className="text-lg font-semibold leading-snug text-foreground">
          {title}
        </h3>

        {/* Description — truncated to 2 lines via CSS */}
        <p className="line-clamp-2 text-sm leading-relaxed text-muted-foreground">
          {description}
        </p>

        {/* Category badge */}
        <Badge label={category} color="bg-brand/10 text-brand" />

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
        <time dateTime={completionDate} className="text-xs text-muted-foreground">
          Completed {formattedDate}
        </time>
      </div>
    </article>
  );
}
