---
title: "Onboarding & Tooling Setup"
date: "2025-06-06T00:00:00.000Z"
summary: "First week of the internship covering development environment setup, introduction to the team's tech stack, and initial exploration of the codebase."
tags:
  - onboarding
  - tooling
  - git
  - typescript
---

## Monday — First Day

Arrived at the office and met the team. Spent the morning getting access to all the internal systems — GitHub Enterprise, Jira, Figma, and the internal wiki. The onboarding doc was thorough but a bit outdated; made notes on what needs updating.

Set up my local development environment:

```bash
git clone git@github.com:company/primary-repo.git
cd primary-repo
npm install
cp .env.example .env.local
npm run dev
```

Hit a Node version mismatch — the project pinned Node 20 but I had 22 installed via nvm. Learned about `.nvmrc` and how to switch versions:

```bash
nvm install 20
nvm use 20
```

## Tuesday — Codebase Walkthrough

Senior dev walked me through the monorepo structure. Key observations:

- **`/packages/shared`** — shared types and utilities used across all apps
- **`/apps/web`** — the main Next.js dashboard
- **`/apps/api`** — Express backend with Prisma ORM
- **`/packages/ui`** — internal component library built on Radix primitives

The architecture follows a **feature-sliced design** pattern. Each feature is self-contained with its own components, hooks, and API layer. This keeps things modular but the boundary rules take some getting used to.

## Wednesday — First Bug Fix

Got assigned my first ticket: a CSS layout bug where the sidebar collapsed incorrectly at exactly 1024px viewport width. The issue was a missing breakpoint in the responsive grid:

```tsx
// Before (broken)
const columns = width < 1024 ? 1 : 2;

// After (fixed)
const columns = width <= 1024 ? 1 : 2;
```

Small fix, but it taught me the team's PR process: branch naming convention (`fix/PORT-124-sidebar-breakpoint`), required reviewers, and the CI pipeline that runs linting + type checking + unit tests before merge is allowed.

## Thursday — TypeScript Deep Dive

Spent the day studying the project's TypeScript patterns. The team uses strict mode with a few notable conventions:

1. **No enums** — string unions only, for better JSON serialization
2. **Zod for runtime validation** — every API boundary is validated
3. **`satisfies` keyword** — used extensively for config objects to preserve literal types
4. **Branded types** — for IDs to prevent mixing up different entity IDs

```typescript
type UserId = string & { __brand: "UserId" };
type OrderId = string & { __brand: "OrderId" };

function getUser(id: UserId) { /* ... */ }
// getUser(orderId) would be a compile error
```

## Friday — Team Retro & Reflection

Joined the bi-weekly sprint retro. The team uses a "start, stop, continue" format. Key takeaways:

- **Start**: Adding more integration tests for critical user flows
- **Stop**: Merging PRs without at least one approval (a few slipped through)
- **Continue**: The weekly knowledge-sharing sessions on Friday afternoons

Wrote my first weekly summary for my internship log. Feeling comfortable with the tooling and excited to pick up more substantial tickets next week.