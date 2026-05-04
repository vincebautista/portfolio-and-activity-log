import { z } from "zod";

// ---------------------------------------------------------------------------
// ProjectCategory — closed string union (not an enum) so it serializes to JSON
// ---------------------------------------------------------------------------
export type ProjectCategory =
  | "SEO Audit"
  | "Frontend"
  | "Research"
  | "Backend"
  | "Design";

// ---------------------------------------------------------------------------
// Project
// ---------------------------------------------------------------------------
export interface Project {
  id: string;
  title: string;
  description: string;
  techStack: string[];
  completionDate: string; // ISO 8601
  category: ProjectCategory;
  featured: boolean;
  imageUrl: string | undefined;
}

// ---------------------------------------------------------------------------
// LogEntry
// ---------------------------------------------------------------------------
export interface LogEntry {
  slug: string;
  title: string;
  date: string; // ISO 8601
  summary: string;
  tags: string[];
  readingTimeMinutes: number;
}

// ---------------------------------------------------------------------------
// Zod schemas — runtime validation layer for JSON data files
// ---------------------------------------------------------------------------

const projectCategorySchema = z.enum([
  "SEO Audit",
  "Frontend",
  "Research",
  "Backend",
  "Design",
]);

export const projectSchema = z.object({
  id: z.string().min(1),
  title: z.string().min(1),
  description: z.string().min(1),
  techStack: z.array(z.string().min(1)).min(1),
  completionDate: z.string().datetime({ message: "Must be an ISO 8601 date" }),
  category: projectCategorySchema,
  featured: z.boolean().default(false),
  imageUrl: z.string().url().optional(),
});

export const logEntrySchema = z.object({
  slug: z.string().min(1),
  title: z.string().min(1),
  date: z.string().datetime({ message: "Must be an ISO 8601 date" }),
  summary: z.string().min(1),
  tags: z.array(z.string().min(1)).min(1),
  readingTimeMinutes: z.number().int().positive(),
});

// Inferred types from schemas (alternative to hand-written interfaces)
export type ProjectFromSchema = z.infer<typeof projectSchema>;
export type LogEntryFromSchema = z.infer<typeof logEntrySchema>;