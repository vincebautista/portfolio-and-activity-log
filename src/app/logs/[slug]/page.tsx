import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { getAllLogs, getLogBySlug } from "@/lib/logs";
import { markdownToHtml } from "@/lib/markdown";

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

interface PageParams {
  slug: string;
}

interface PageProps {
  params: Promise<PageParams>;
}

// ---------------------------------------------------------------------------
// generateStaticParams
// ---------------------------------------------------------------------------

export async function generateStaticParams(): Promise<Array<{ slug: string }>> {
  const logs = getAllLogs();
  return logs.map((log) => ({ slug: log.slug }));
}

// ---------------------------------------------------------------------------
// generateMetadata
// ---------------------------------------------------------------------------

export async function generateMetadata({
  params,
}: {
  params: Promise<PageParams>;
}): Promise<Metadata> {
  const { slug } = await params;
  const log = getLogBySlug(slug);

  // Safe fallback — do NOT throw or call notFound() here
  if (!log) {
    return {
      title: "Log Not Found",
      description: "The requested activity log could not be found.",
    };
  }

  return {
    title: log.title,
    description: log.summary,
    openGraph: {
      title: log.title,
      description: log.summary,
      type: "article",
      publishedTime: log.date,
    },
  };
}

// ---------------------------------------------------------------------------
// Page Component (Server Component — no 'use client')
// ---------------------------------------------------------------------------

export default async function LogPage({ params }: PageProps) {
  const { slug } = await params;
  const log = getLogBySlug(slug);

  if (!log) {
    notFound();
  }

  const htmlContent = await markdownToHtml(log.body);

  const formattedDate = new Date(log.date).toLocaleDateString("en-SG", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <main className="mx-auto w-full max-w-2xl px-4 py-12 sm:px-6">
      {/* Back link */}
      <Link
        href="/logs"
        className="mb-8 inline-flex items-center gap-1 text-sm text-muted-foreground transition-colors hover:text-foreground"
      >
        ← Back to logs
      </Link>

      {/* Header */}
      <header className="mb-10">
        <h1 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
          {log.title}
        </h1>
        <div className="mt-3 flex items-center gap-3 text-sm text-muted-foreground">
          <time dateTime={log.date}>{formattedDate}</time>
          <span aria-hidden="true">·</span>
          <span>{log.readingTimeMinutes} min read</span>
        </div>
      </header>

      {/* Article body */}
      <article
        className="prose prose-neutral max-w-none dark:prose-invert"
        dangerouslySetInnerHTML={{ __html: htmlContent }}
      />
    </main>
  );
}