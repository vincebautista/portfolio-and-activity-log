---
title: "React Server Components & Data Fetching Patterns"
date: "2025-06-13T00:00:00.000Z"
summary: "Deep dive into React Server Components, exploring the mental model shift from client-side data fetching to server-driven rendering with Next.js App Router."
tags:
  - react
  - nextjs
  - server-components
  - data-fetching
  - performance
---

## Monday — RSC Mental Model

Started the week by reading the [React Server Components documentation](https://react.dev/reference/rsc/server-components) cover to cover. The key paradigm shift:

> Server Components run **only on the server** and their code is never shipped to the client bundle. This means you can directly access databases, filesystems, and backend services without an API layer.

The rules that govern RSC usage:

| Can Do | Cannot Do |
|--------|-----------|
| `async/await` data fetching | `useState` / `useEffect` |
| Access databases directly | `onClick` handlers |
| Import server-only packages | Browser APIs (`localStorage`, etc.) |
| Render Client Components | Use Context providers |

The "server boundary" concept clicked when I realized that **any component importing a Client Component becomes a Client Component boundary**, not the other way around.

## Tuesday — Data Fetching Patterns

Explored three different data fetching patterns in the App Router:

### Pattern 1: Direct fetch in Server Component

```tsx
// app/dashboard/page.tsx
export default async function DashboardPage() {
  const data = await fetch("https://api.example.com/stats", {
    next: { revalidate: 60 }, // ISR every 60 seconds
  });
  const stats = await data.json();
  return <Dashboard stats={stats} />;
}
```

### Pattern 2: Parallel data fetching

```tsx
export default async function Page() {
  const [user, posts] = await Promise.all([
    getUser(),
    getPosts(),
  ]);
  return <Profile user={user} posts={posts} />;
}
```

### Pattern 3: Streaming with Suspense

```tsx
import { Suspense } from "react";

export default function Page() {
  return (
    <div>
      <Suspense fallback={<Skeleton />}>
        <SlowComponent />
      </Suspense>
    </div>
  );
}
```

Pattern 3 was the most interesting — it lets you stream HTML progressively so users see content faster without waiting for the slowest component.

## Wednesday — Building a Data Layer

Applied the patterns by building a small feature: a user profile page that fetches from a mock API. Key learnings:

1. **Colocate data fetching** with the component that needs it — don't hoist everything to the page level
2. **Use `cache()` for deduplication** — React's `cache()` wraps a function so multiple components calling it in the same render only trigger one fetch
3. **Error boundaries are essential** — wrap data-dependent components in error boundaries to prevent whole-page crashes

```tsx
import { cache } from "react";

const getUser = cache(async (id: string) => {
  const res = await fetch(`https://api.example.com/users/${id}`);
  if (!res.ok) throw new Error("Failed to fetch user");
  return res.json();
});
```

## Thursday — Performance Deep Dive

Ran Lighthouse audits on a few pages and identified common issues:

- **Layout shift (CLS)** — images without explicit width/height attributes
- **Large JavaScript bundles** — third-party analytics libraries being loaded synchronously
- **Unoptimized fonts** — Google Fonts loaded via CSS `@import` instead of `next/font`

Fixed the font loading issue across the project:

```tsx
// Before: render-blocking CSS import
// @import url('https://fonts.googleapis.com/css2?family=Inter');

// After: optimized with next/font
import { Inter } from "next/font/google";
const inter = Inter({ subsets: ["latin"] });
```

This single change reduced First Contentful Paint by ~300ms on the dashboard page.

## Friday — Knowledge Sharing Session

Presented my findings on RSC patterns to the team during the Friday knowledge share. Prepared a short demo showing the bundle size difference between a page using only Server Components vs. one with unnecessary Client Components. The team decided to audit existing pages for components that could be converted to Server Components — added a tech debt ticket to the backlog.

Also learned about the `"use server"` directive for Server Actions, which lets you call server-side functions directly from form submissions without creating API routes. Planning to explore this more next week.