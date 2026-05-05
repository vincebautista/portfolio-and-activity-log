/**
 * Loading skeleton for /logs/[slug] pages.
 *
 * Matches the exact column layout of the real page (max-w-2xl, centered)
 * to prevent Cumulative Layout Shift (CLS) when the real content loads.
 */
export default function LogPageLoading() {
  return (
    <main className="mx-auto w-full max-w-2xl px-4 py-12 sm:px-6">
      {/* Back link placeholder */}
      <div className="mb-8 h-5 w-28 animate-pulse rounded bg-gray-200 dark:bg-gray-700" />

      {/* Title placeholder — wide rectangle */}
      <div className="mb-10">
        <div className="h-9 w-3/4 animate-pulse rounded bg-gray-200 dark:bg-gray-700 sm:h-10" />
        {/* Date / reading time placeholder */}
        <div className="mt-3 h-5 w-48 animate-pulse rounded bg-gray-200 dark:bg-gray-700" />
      </div>

      {/* Article body skeleton — 8 lines of varying width */}
      <div className="space-y-4">
        <div className="h-4 w-full animate-pulse rounded bg-gray-200 dark:bg-gray-700" />
        <div className="h-4 w-11/12 animate-pulse rounded bg-gray-200 dark:bg-gray-700" />
        <div className="h-4 w-full animate-pulse rounded bg-gray-200 dark:bg-gray-700" />
        <div className="h-4 w-5/6 animate-pulse rounded bg-gray-200 dark:bg-gray-700" />
        <div className="h-4 w-full animate-pulse rounded bg-gray-200 dark:bg-gray-700" />
        <div className="h-4 w-3/4 animate-pulse rounded bg-gray-200 dark:bg-gray-700" />
        <div className="h-4 w-full animate-pulse rounded bg-gray-200 dark:bg-gray-700" />
        <div className="h-4 w-2/3 animate-pulse rounded bg-gray-200 dark:bg-gray-700" />
      </div>
    </main>
  );
}