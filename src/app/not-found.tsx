import Link from "next/link";

/**
 * Global 404 Not Found page.
 *
 * Rendered when:
 * - A route doesn't match any page
 * - notFound() is called from a Server Component (e.g., invalid log slug)
 */
export default function NotFound() {
  return (
    <main className="flex flex-1 flex-col items-center justify-center px-4 py-24 sm:px-6">
      <div className="flex max-w-md flex-col items-center gap-4 text-center">
        <p className="text-6xl font-bold text-muted-foreground">404</p>
        <h1 className="text-xl font-semibold text-foreground">
          Page Not Found
        </h1>
        <p className="text-sm text-muted-foreground">
          The page you are looking for does not exist or has been moved.
        </p>
        <Link
          href="/"
          className="mt-4 rounded-md bg-brand px-5 py-2.5 text-sm font-medium text-brand-foreground transition-colors hover:bg-brand/90"
        >
          Go Home
        </Link>
      </div>
    </main>
  );
}