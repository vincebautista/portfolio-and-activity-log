// ---------------------------------------------------------------------------
// SkeletonCard — loading placeholder matching ProjectCard dimensions
// ---------------------------------------------------------------------------

export default function SkeletonCard() {
  return (
    <article
      className="flex flex-col gap-4 rounded-xl border border-border bg-background p-5 shadow-sm"
      aria-hidden="true"
    >
      {/* Title placeholder */}
      <div className="h-6 w-3/4 rounded-md bg-muted animate-pulse" />

      {/* Description placeholder (2 lines) */}
      <div className="flex flex-col gap-2">
        <div className="h-4 w-full rounded-md bg-muted animate-pulse" />
        <div className="h-4 w-5/6 rounded-md bg-muted animate-pulse" />
      </div>

      {/* Category badge placeholder */}
      <div className="h-5 w-20 rounded-full bg-muted animate-pulse" />

      {/* Tech stack badges placeholder */}
      <div className="flex flex-wrap gap-2">
        <div className="h-5 w-16 rounded-full bg-muted animate-pulse" />
        <div className="h-5 w-14 rounded-full bg-muted animate-pulse" />
        <div className="h-5 w-12 rounded-full bg-muted animate-pulse" />
        <div className="h-5 w-18 rounded-full bg-muted animate-pulse" />
      </div>

      {/* Completion date placeholder */}
      <div className="h-4 w-28 rounded-md bg-muted animate-pulse" />
    </article>
  );
}