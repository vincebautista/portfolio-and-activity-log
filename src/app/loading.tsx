import SkeletonCard from "@/components/atoms/SkeletonCard";

/**
 * Loading skeleton for the Home page (/).
 *
 * Matches the layout structure of the real page (hero + featured grid + timeline)
 * to prevent Cumulative Layout Shift (CLS).
 */
export default function HomeLoading() {
  return (
    <div className="flex flex-1 flex-col">
      {/* Hero skeleton */}
      <section className="flex flex-col items-center justify-center px-4 py-24 sm:px-6">
        <div className="flex max-w-2xl flex-col items-center gap-6 text-center">
          <div className="h-12 w-64 animate-pulse rounded bg-muted sm:h-14" />
          <div className="h-6 w-full animate-pulse rounded bg-muted" />
          <div className="h-6 w-3/4 animate-pulse rounded bg-muted" />
          <div className="flex gap-4">
            <div className="h-10 w-28 animate-pulse rounded-md bg-muted" />
            <div className="h-10 w-28 animate-pulse rounded-md bg-muted" />
          </div>
        </div>
      </section>

      {/* Featured section skeleton */}
      <section className="border-t border-border px-4 py-16 sm:px-6">
        <div className="mx-auto max-w-5xl">
          <div className="mb-8">
            <div className="h-8 w-48 animate-pulse rounded bg-muted" />
            <div className="mt-1 h-5 w-72 animate-pulse rounded bg-muted" />
          </div>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            <SkeletonCard />
            <SkeletonCard />
          </div>
        </div>
      </section>

      {/* Timeline section skeleton */}
      <section className="border-t border-border px-4 py-16 sm:px-6">
        <div className="mx-auto max-w-3xl">
          <div className="mb-8">
            <div className="h-8 w-56 animate-pulse rounded bg-muted" />
            <div className="mt-1 h-5 w-80 animate-pulse rounded bg-muted" />
          </div>
          {/* Timeline skeleton — 3 entries */}
          <div className="relative border-l border-border">
            {Array.from({ length: 3 }).map((_, i) => (
              <div key={i} className="mb-8 ml-6 last:mb-0">
                <div className="flex flex-col gap-2">
                  <div className="h-4 w-20 animate-pulse rounded bg-muted" />
                  <div className="h-5 w-3/4 animate-pulse rounded bg-muted" />
                  <div className="h-4 w-full animate-pulse rounded bg-muted" />
                  <div className="h-4 w-5/6 animate-pulse rounded bg-muted" />
                  <div className="mt-1 flex gap-2">
                    <div className="h-5 w-16 animate-pulse rounded-full bg-muted" />
                    <div className="h-5 w-14 animate-pulse rounded-full bg-muted" />
                    <div className="h-5 w-12 animate-pulse rounded-full bg-muted" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}