---
title: "Testing Strategies & CI/CD Pipeline Automation"
date: "2025-06-20T00:00:00.000Z"
summary: "Focused on testing methodologies — unit, integration, and E2E — and automating quality gates through GitHub Actions CI/CD pipelines."
tags:
  - testing
  - vitest
  - playwright
  - ci-cd
  - github-actions
---

## Monday — Testing Philosophy

Started the week with a team discussion about the testing strategy. The project follows the **testing trophy** approach (not the pyramid):

```
        /\
       /E2E\          ← Few: critical user flows only
      /------\
     /Integration\    ← Many: how units work together
    /--------------\
   /    Unit         \ ← Some: pure logic, utilities
  /------------------\
```

The rationale: unit tests are cheap but brittle when testing implementation details. Integration tests give more confidence per test because they verify behavior, not code structure.

## Tuesday — Writing Unit Tests with Vitest

Wrote unit tests for a date formatting utility. Key patterns learned:

```typescript
// utils/formatDate.ts
export function formatRelative(date: Date): string {
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

  if (diffDays === 0) return "Today";
  if (diffDays === 1) return "Yesterday";
  if (diffDays < 7) return `${diffDays} days ago`;
  return date.toLocaleDateString("en-SG");
}
```

```typescript
// utils/formatDate.test.ts
import { describe, it, expect, vi } from "vitest";
import { formatRelative } from "./formatDate";

describe("formatRelative", () => {
  it('returns "Today" for the current date', () => {
    vi.useFakeTimers();
    vi.setSystemTime(new Date("2025-06-17T12:00:00Z"));
    expect(formatRelative(new Date("2025-06-17T10:00:00Z"))).toBe("Today");
    vi.useRealTimers();
  });

  it('returns "Yesterday" for one day ago', () => {
    vi.useFakeTimers();
    vi.setSystemTime(new Date("2025-06-17T12:00:00Z"));
    expect(formatRelative(new Date("2025-06-16T10:00:00Z"))).toBe("Yesterday");
    vi.useRealTimers();
  });

  it("returns formatted date for dates older than a week", () => {
    vi.useFakeTimers();
    vi.setSystemTime(new Date("2025-06-17T12:00:00Z"));
    expect(formatRelative(new Date("2025-01-01T00:00:00Z"))).toBe("1/1/2025");
    vi.useRealTimers();
  });
});
```

The `vi.useFakeTimers()` pattern was new to me — it makes time-dependent tests deterministic and fast.

## Wednesday — Integration Tests

Moved up the trophy to integration tests. Tested the user profile data flow end-to-end within the application boundary:

```typescript
import { render, screen, waitFor } from "@testing-library/react";
import { UserProfile } from "./UserProfile";

describe("UserProfile integration", () => {
  it("renders user data after successful fetch", async () => {
    // Mock the fetch at the network boundary
    vi.stubGlobal("fetch", vi.fn().mockResolvedValue({
      ok: true,
      json: () => Promise.resolve({
        id: "1",
        name: "Jane Doe",
        email: "jane@example.com",
      }),
    }));

    render(<UserProfile userId="1" />);

    // Should show loading state first
    expect(screen.getByText("Loading...")).toBeInTheDocument();

    // Wait for data to render
    await waitFor(() => {
      expect(screen.getByText("Jane Doe")).toBeInTheDocument();
    });
  });

  it("shows error state when fetch fails", async () => {
    vi.stubGlobal("fetch", vi.fn().mockRejectedValue(new Error("Network error")));

    render(<UserProfile userId="1" />);

    await waitFor(() => {
      expect(screen.getByText(/something went wrong/i)).toBeInTheDocument();
    });
  });
});
```

Key insight: mock at the **network boundary** (fetch), not at the component level. This tests the real data flow through the component.

## Thursday — E2E with Playwright

Set up Playwright for end-to-end testing of the login flow:

```typescript
// e2e/login.spec.ts
import { test, expect } from "@playwright/test";

test.describe("Login flow", () => {
  test("successful login redirects to dashboard", async ({ page }) => {
    await page.goto("/login");

    await page.fill('input[name="email"]', "user@example.com");
    await page.fill('input[name="password"]', "password123");
    await page.click('button[type="submit"]');

    await expect(page).toHaveURL("/dashboard");
    await expect(page.locator("h1")).toContainText("Dashboard");
  });

  test("invalid credentials show error message", async ({ page }) => {
    await page.goto("/login");

    await page.fill('input[name="email"]', "wrong@example.com");
    await page.fill('input[name="password"]', "wrong");
    await page.click('button[type="submit"]');

    await expect(page.locator('[role="alert"]')).toContainText("Invalid credentials");
    await expect(page).toHaveURL("/login"); // Should stay on login page
  });
});
```

Playwright's locator API is much more intuitive than older E2E tools. The `[role="alert"]` selector is particularly nice — it ties tests to accessibility semantics rather than CSS classes.

## Friday — CI/CD Pipeline

Configured a GitHub Actions workflow that runs on every PR:

```yaml
name: Quality Gates
on:
  pull_request:
    branches: [main]

jobs:
  check:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: 20
          cache: "npm"

      - run: npm ci
      - run: npx tsc --noEmit        # Type checking
      - run: npm run lint             # ESLint
      - run: npm run test -- --run    # Vitest (unit + integration)
      - run: npx playwright test      # E2E tests

      # Bundle analysis — fails if bundle grows >10%
      - run: npm run build
      - run: npx bundlesize
```

The pipeline catches issues before code review, which saves the team significant time. The `bundlesize` check is particularly clever — it prevents accidental bundle bloat by failing the build if the JavaScript bundle grows beyond a configured threshold.

Also learned about **required status checks** in GitHub branch protection rules — even if all checks pass, you can enforce that specific checks must pass before merge is allowed. Set this up for `tsc`, `lint`, and `test` on the main branch.

---

**Week 3 reflection**: Testing felt tedious at first, but after writing tests for a few features, I started catching regressions that would have otherwise made it to production. The CI pipeline gives me confidence that my changes don't break existing functionality. Moving forward, I want to explore visual regression testing with Percy or Chromatic.