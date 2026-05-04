import fs from "fs";
import path from "path";
import matter from "gray-matter";
import type { LogEntry } from "@/types";

// ---------------------------------------------------------------------------
// Constants
// ---------------------------------------------------------------------------
const LOGS_DIRECTORY = path.join(process.cwd(), "content", "logs");
const WORDS_PER_MINUTE = 200;

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

/** Strip the .md extension from a filename to derive the slug. */
function slugFromFilename(filename: string): string {
  return filename.replace(/\.md$/, "");
}

/** Count words in a string. Splits on whitespace and filters empty strings. */
function countWords(text: string): number {
  return text.trim().split(/\s+/).filter(Boolean).length;
}

/** Calculate reading time in minutes, rounded up to the nearest integer. */
function calcReadingTime(body: string): number {
  const words = countWords(body);
  return Math.ceil(words / WORDS_PER_MINUTE);
}

// ---------------------------------------------------------------------------
// Core parser
// ---------------------------------------------------------------------------

interface ParsedLogEntry extends LogEntry {
  body: string;
}

/**
 * Parse a single .md file into a ParsedLogEntry.
 * Returns null if the file cannot be read or frontmatter is malformed.
 */
function parseLogFile(filePath: string): ParsedLogEntry | null {
  try {
    const raw = fs.readFileSync(filePath, "utf-8");
    const { data, content } = matter(raw);

    // Guard: missing required fields
    if (!data.title || !data.date || !data.summary) {
      console.warn(
        `Skipping ${filePath}: missing required frontmatter (title, date, summary)`,
      );
      return null;
    }

    const slug = slugFromFilename(path.basename(filePath));

    return {
      slug,
      title: String(data.title),
      date: String(data.date),
      summary: String(data.summary),
      tags: Array.isArray(data.tags) ? data.tags.map(String) : [],
      readingTimeMinutes: calcReadingTime(content),
      body: content,
    };
  } catch (err) {
    console.warn(`Failed to parse ${filePath}:`, err);
    return null;
  }
}

// ---------------------------------------------------------------------------
// Public API
// ---------------------------------------------------------------------------

/**
 * Read all .md files from /content/logs, parse frontmatter, and return
 * an array of LogEntry objects sorted by date descending (newest first).
 * Files without a .md extension are silently ignored.
 */
export function getAllLogs(): LogEntry[] {
  if (!fs.existsSync(LOGS_DIRECTORY)) {
    return [];
  }

  const dirents = fs.readdirSync(LOGS_DIRECTORY, { withFileTypes: true });
  const mdFiles = dirents
    .filter((d) => d.isFile() && d.name.endsWith(".md"))
    .map((d) => path.join(LOGS_DIRECTORY, d.name));

  const entries = mdFiles
    .map(parseLogFile)
    .filter((entry): entry is ParsedLogEntry => entry !== null);

  // Sort by date descending (newest first)
  entries.sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
  );

  // Strip the body before returning — the public LogEntry type doesn't include it
  return entries.map(({ body: _body, ...logEntry }) => logEntry);
}

/**
 * Return a single log entry by its slug, including the raw Markdown body.
 * Returns null (does not throw) if the slug doesn't match any file.
 */
export function getLogBySlug(
  slug: string,
): (LogEntry & { body: string }) | null {
  const filePath = path.join(LOGS_DIRECTORY, `${slug}.md`);

  if (!fs.existsSync(filePath)) {
    return null;
  }

  const parsed = parseLogFile(filePath);
  return parsed ?? null;
}