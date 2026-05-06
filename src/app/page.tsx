import Link from "next/link";
import { getAllProjects, getFeaturedProjects } from "@/lib/projects";
import ProjectCard from "@/components/molecules/ProjectCard";
import Timeline from "@/components/molecules/Timeline";

export default function Home() {
  const featured = getFeaturedProjects();
  const allProjects = getAllProjects();

  // Sort by completion date ascending for the timeline (oldest first)
  const timelineProjects = [...allProjects].sort(
    (a, b) =>
      new Date(a.completionDate).getTime() -
      new Date(b.completionDate).getTime(),
  );

  return (
    <div className="flex flex-1 flex-col">
      {/* Hero Section */}
      <section className="flex flex-col items-center justify-center px-4 py-24 sm:px-6">
        <div className="flex max-w-2xl flex-col items-center gap-6 text-center">
          <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
            Vince Bautista
          </h1>
          <p className="text-lg leading-8 text-muted-foreground">
            Portfolio and activity log showcasing projects, work, and weekly
            internship progress.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <Link
              href="/work"
              className="rounded-md bg-brand px-5 py-2.5 text-sm font-medium text-brand-foreground transition-colors hover:bg-brand/90"
            >
              View Work
            </Link>
            <Link
              href="/logs"
              className="rounded-md border border-border px-5 py-2.5 text-sm font-medium text-foreground transition-colors hover:bg-muted"
            >
              Activity Logs
            </Link>
          </div>
        </div>
      </section>

      {/* Featured Highlights Section */}
      {featured.length > 0 && (
        <section className="border-t border-border px-4 py-16 sm:px-6">
          <div className="mx-auto max-w-5xl">
            <div className="mb-8 flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-bold tracking-tight text-foreground">
                  Featured Work
                </h2>
                <p className="mt-1 text-sm text-muted-foreground">
                  Highlighted projects that demonstrate key capabilities.
                </p>
              </div>
              <Link
                href="/work"
                className="text-sm font-medium text-brand hover:underline"
              >
                View all →
              </Link>
            </div>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
              {featured.map((project) => (
                <ProjectCard key={project.id} project={project} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Live Internship Timeline Section */}
      <section className="border-t border-border px-4 py-16 sm:px-6">
        <div className="mx-auto max-w-3xl">
          <div className="mb-8">
            <h2 className="text-2xl font-bold tracking-tight text-foreground">
              Internship Timeline
            </h2>
            <p className="mt-1 text-sm text-muted-foreground">
              A chronological view of all internship activities and project
              completions.
            </p>
          </div>
          <Timeline projects={timelineProjects} />
        </div>
      </section>
    </div>
  );
}