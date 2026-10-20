import Link from "next/link";
import { Project } from "@/data/projects";

interface NextProjectNavProps {
  currentProject: Project;
  allProjects: Project[];
}

export function NextProjectNav({ currentProject, allProjects }: NextProjectNavProps) {
  const currentIndex = allProjects.findIndex((p) => p.slug === currentProject.slug);
  const prevProject =
    currentIndex > 0 ? allProjects[currentIndex - 1] : allProjects[allProjects.length - 1];
  const nextProject =
    currentIndex < allProjects.length - 1 ? allProjects[currentIndex + 1] : allProjects[0];

  return (
    <section className="py-20 bg-[var(--color-surface)]/25">
      <div className="max-w-[1440px] mx-auto px-6 sm:px-8 lg:px-32">
        <div className="flex items-center justify-between pb-6 font-mono text-xs text-[var(--color-muted)] uppercase tracking-widest">
          <span>Project Navigation</span>
          <Link
            href="/work"
            className="hover:text-[var(--color-foreground)] transition-colors underline underline-offset-4"
          >
            All Projects Index ↑
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-4">
          {/* Previous Project */}
          {prevProject && (
            <Link
              href={`/work/${prevProject.slug}`}
              className="group p-8 bg-[#FBFBF9] hover:-translate-y-1 hover:bg-[var(--color-surface)]/50 transition-[transform,background-color] duration-300"
            >
              <div className="font-mono text-xs text-[var(--color-muted)] mb-2 flex items-center space-x-2">
                <span>← PREVIOUS PROJECT</span>
              </div>
              <h4 className="text-2xl font-normal tracking-tight text-[var(--color-foreground)] group-hover:text-[var(--color-accent-terracotta)] transition-colors">
                {prevProject.title}
              </h4>
              <p className="text-sm text-[var(--color-muted)] mt-1 font-light">
                {prevProject.subtitle}
              </p>
            </Link>
          )}

          {/* Next Project */}
          {nextProject && (
            <Link
              href={`/work/${nextProject.slug}`}
              className="group p-8 bg-[#FBFBF9] hover:-translate-y-1 hover:bg-[var(--color-surface)]/50 transition-[transform,background-color] duration-300 text-right"
            >
              <div className="font-mono text-xs text-[var(--color-muted)] mb-2 flex items-center justify-end space-x-2">
                <span>NEXT PROJECT →</span>
              </div>
              <h4 className="text-2xl font-normal tracking-tight text-[var(--color-foreground)] group-hover:text-[var(--color-accent-terracotta)] transition-colors">
                {nextProject.title}
              </h4>
              <p className="text-sm text-[var(--color-muted)] mt-1 font-light">
                {nextProject.subtitle}
              </p>
            </Link>
          )}
        </div>
      </div>
    </section>
  );
}
