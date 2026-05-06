import SkeletonCard from "@/components/atoms/SkeletonCard";

/**
 * Loading skeleton for /work page.
 *
 * Renders a grid of SkeletonCard placeholders matching the 3-column
 * desktop layout to prevent Cumulative Layout Shift (CLS).
 */
export default function WorkLoading() {
  return (
    <main className="mx-auto w-full max-w-5xl px-4 py-12 sm:px-6">
      {/* Header skeleton */}
      <div className="mb-10">
        <div className="h-9 w-32 animate-pulse rounded bg-muted sm:h-10" />
        <div className="mt-3 h-5 w-96 animate-pulse rounded bg-muted" />
      </div>

      {/* Filter controls skeleton */}
      <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-wrap gap-2">
          {Array.from({ length: 6 }).map((_, i) => (
            <div
              key={i}
              className="h-8 w-20 animate-pulse rounded-md bg-muted"
            />
          ))}
        </div>
        <div className="flex flex-wrap gap-2">
          {Array.from({ length: 5 }).map((_, i) => (
            <div
              key={i}
              className="h-8 w-16 animate-pulse rounded-md bg-muted"
            />
          ))}
        </div>
      </div>

      {/* Results count skeleton */}
      <div className="mb-6 h-5 w-40 animate-pulse rounded bg-muted" />

      {/* Project card grid skeleton */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 6 }).map((_, i) => (
          <SkeletonCard key={i} />
        ))}
      </div>
    </main>
  );
}