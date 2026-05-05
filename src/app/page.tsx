export default function Home() {
  return (
    <div className="flex flex-1 flex-col items-center justify-center px-4 py-24 sm:px-6">
      <div className="flex max-w-2xl flex-col items-center gap-6 text-center">
        <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
          Vince Bautista
        </h1>
        <p className="text-lg leading-8 text-muted-foreground">
          Portfolio and activity log showcasing projects, work, and weekly
          progress.
        </p>
        <div className="flex flex-wrap items-center justify-center gap-4">
          <a
            href="/work"
            className="rounded-md bg-brand px-5 py-2.5 text-sm font-medium text-brand-foreground transition-colors hover:bg-brand/90"
          >
            View Work
          </a>
          <a
            href="/logs"
            className="rounded-md border border-border px-5 py-2.5 text-sm font-medium text-foreground transition-colors hover:bg-muted"
          >
            Activity Logs
          </a>
        </div>
      </div>
    </div>
  );
}