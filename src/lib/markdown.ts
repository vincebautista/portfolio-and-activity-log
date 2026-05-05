import { remark } from "remark";
import remarkRehype from "remark-rehype";
import rehypeSanitize from "rehype-sanitize";
import rehypeStringify from "rehype-stringify";

/**
 * Convert a raw Markdown string to sanitized HTML.
 *
 * Pipeline: remark (parse Markdown) → remark-rehype (convert MDAST to HAST) →
 * rehype-sanitize (strip dangerous tags/attributes like <script>, onerror=, etc.) →
 * rehype-stringify (serialize HAST to HTML string)
 *
 * Returns an empty string when given an empty or whitespace-only input —
 * it does not throw.
 */
export async function markdownToHtml(content: string): Promise<string> {
  if (!content || content.trim().length === 0) {
    return "";
  }

  const result = await remark()
    .use(remarkRehype)
    .use(rehypeSanitize)
    .use(rehypeStringify)
    .process(content);

  return result.toString();
}