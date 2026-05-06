"use client";

import { useEffect } from "react";
import Link from "next/link";

// ---------------------------------------------------------------------------
// Global Error Boundary — catches errors in the root layout and home page
// ---------------------------------------------------------------------------

interface ErrorPageProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function ErrorPage({ error, reset }: ErrorPageProps) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error("Unhandled error:", error);
  }, [error]);

  return (
    <main className="flex flex-1 flex-col items-center justify-center px-4 py-24 sm:px-6">
      <div className="flex max-w-md flex-col items-center gap-4 text-center">
        <p className="text-6xl font-bold text-muted-foreground" aria-hidden="true">
          500
        </p>
        <h1 className="text-xl font-semibold text-foreground">
          Something went wrong
        </h1>
        <p className="text-sm text-muted-foreground">
          An unexpected error occurred. Please try again, or go back to the home
          page.
        </p>
        <div className="mt-4 flex flex-wrap items-center justify-center gap-3">
          <button
            onClick={reset}
            className="rounded-md bg-brand px-5 py-2.5 text-sm font-medium text-brand-foreground transition-colors hover:bg-brand/90"
          >
            Try Again
          </button>
          <Link
            href="/"
            className="rounded-md border border-border px-5 py-2.5 text-sm font-medium text-foreground transition-colors hover:bg-muted"
          >
            Go Home
          </Link>
        </div>
      </div>
    </main>
  );
}