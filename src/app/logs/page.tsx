import type { Metadata } from "next";
import Link from "next/link";
import { getAllLogs } from "@/lib/logs";
import Badge from "@/components/atoms/Badge";

export const metadata: Metadata = {
  title: "Activity Logs",
  description:
    "Weekly internship activity logs covering onboarding, tooling, React Server Components, testing strategies, and more.",
};

export default function LogsPage() {
  const logs = getAllLogs();

  return (
    <main className="mx-auto w-full max-w-3xl px-4 py-12 sm:px-6">
      <header className="mb-10">
        <h1 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
          Activity Logs
        </h1>
        <p className="mt-3 text-muted-foreground">
          Weekly internship logs documenting learning progress, technical deep
          dives, and project work.
        </p>
      </header>

      {logs.length === 0 ? (
        <p className="text-muted-foreground">No logs published yet.</p>
      ) : (
        <ol className="flex flex-col gap-6">
          {logs.map((log) => {
            const formattedDate = new Date(log.date).toLocaleDateString(
              "en-SG",
              {
                year: "numeric",
                month: "long",
                day: "numeric",
              },
            );

            return (
              <li key={log.slug}>
                <Link
                  href={`/logs/${log.slug}`}
                  className="group block rounded-xl border border-border bg-background p-5 shadow-sm transition-shadow hover:shadow-md"
                >
                  <article>
                    <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
                      <h2 className="text-lg font-semibold text-foreground group-hover:text-brand transition-colors">
                        {log.title}
                      </h2>
                      <span className="shrink-0 text-sm text-muted-foreground">
                        {formattedDate}
                      </span>
                    </div>
                    <p className="mt-2 text-sm leading-relaxed text-muted-foreground line-clamp-2">
                      {log.summary}
                    </p>
                    <div className="mt-3 flex flex-wrap items-center gap-2">
                      {log.tags.map((tag) => (
                        <Badge key={tag} label={tag} />
                      ))}
                      <span className="ml-auto text-xs text-muted-foreground">
                        {log.readingTimeMinutes} min read
                      </span>
                    </div>
                  </article>
                </Link>
              </li>
            );
          })}
        </ol>
      )}
    </main>
  );
}