"use client";

import { useEffect } from "react";
import Link from "next/link";

interface ErrorPageProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function LogsError({ error, reset }: ErrorPageProps) {
  useEffect(() => {
    console.error("Logs page error:", error);
  }, [error]);

  return (
    <main className="flex flex-1 flex-col items-center justify-center px-4 py-24 sm:px-6">
      <div className="flex max-w-md flex-col items-center gap-4 text-center">
        <p className="text-6xl font-bold text-muted-foreground" aria-hidden="true">
          500
        </p>
        <h1 className="text-xl font-semibold text-foreground">
          Failed to load activity logs
        </h1>
        <p className="text-sm text-muted-foreground">
          Something went wrong while loading the activity logs. Please try
          again.
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