import type { Metadata } from "next";
import { getAllProjects, getAllCategories } from "@/lib/projects";
import { deriveTechStacks } from "@/lib/tech-stacks";
import WorkGallery from "./WorkGallery";

export const metadata: Metadata = {
  title: "Work",
  description:
    "A gallery of all internship activities and projects, filterable by category and tech stack.",
};

export default function WorkPage() {
  const projects = getAllProjects();
  const categories = getAllCategories();
  const allTechStacks = deriveTechStacks(projects);

  return (
    <main className="mx-auto w-full max-w-5xl px-4 py-12 sm:px-6">
      <header className="mb-10">
        <h1 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
          Work
        </h1>
        <p className="mt-3 text-muted-foreground">
          A gallery of all internship activities — filter by category or tech
          stack to explore specific areas of work.
        </p>
      </header>

      <WorkGallery
        projects={projects}
        categories={categories}
        allTechStacks={allTechStacks}
      />
    </main>
  );
}