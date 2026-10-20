"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "motion/react";
import { Project } from "@/data/projects";
import { CurvedProjectGallery } from "./CurvedProjectGallery";

interface ProjectIndexProps {
  projects: Project[];
}

export function ProjectIndex({ projects }: ProjectIndexProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [viewMode, setViewMode] = useState<"editorial" | "table">("editorial");
  const [hoveredProject, setHoveredProject] = useState<Project | null>(null);

  const categories = ["All", "Web Application", "UI/UX & E-Commerce", "Mobile & Architecture"];

  const filteredProjects = useMemo(
    () => selectedCategory === "All"
      ? projects
      : projects.filter((project) => project.category.includes(selectedCategory)),
    [projects, selectedCategory]
  );
  return (
    <section id="work" className="py-24 md:py-32">
      <div className="max-w-[1440px] mx-auto px-6 sm:px-8 lg:px-32">
        {/* Section Header with Controls - Balanced Scale */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-12">
          <div>
            <div className="flex items-center space-x-2 font-mono text-xs uppercase tracking-widest text-[var(--color-accent-terracotta)] mb-2">
              <span>01 / SELECTED WORK</span>
              <span>•</span>
              <span>INDEX ({filteredProjects.length})</span>
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-normal tracking-tight text-[var(--color-foreground)]">
              Curated Projects & Engineering Case Studies
            </h2>
          </div>

          {/* Filtering and Mode Toggle */}
          <div className="flex flex-wrap items-center gap-3 font-mono text-xs">
            {/* Category Filter */}
            <div className="flex items-center bg-[var(--color-surface)] p-1 rounded-sm">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-3 py-1.5 transition-all duration-200 ${
                    selectedCategory === cat
                      ? "bg-[var(--color-foreground)] text-[#FBFBF9] shadow-sm"
                      : "text-[var(--color-muted)] hover:text-[var(--color-foreground)]"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* View Mode Toggle */}
            <div className="hidden sm:flex items-center bg-[var(--color-surface)] p-1 rounded-sm">
              <button
                onClick={() => setViewMode("editorial")}
                className={`px-3 py-1.5 transition-all duration-200 ${
                  viewMode === "editorial"
                    ? "bg-[var(--color-foreground)] text-[#FBFBF9] shadow-sm"
                    : "text-[var(--color-muted)] hover:text-[var(--color-foreground)]"
                }`}
                title="Curved project gallery"
              >
                Gallery
              </button>
              <button
                onClick={() => setViewMode("table")}
                className={`px-3 py-1.5 transition-all duration-200 ${
                  viewMode === "table"
                    ? "bg-[var(--color-foreground)] text-[#FBFBF9] shadow-sm"
                    : "text-[var(--color-muted)] hover:text-[var(--color-foreground)]"
                }`}
                title="Index Catalog View"
              >
                Catalogue
              </button>
            </div>
          </div>
        </div>

        {/* ================= EDITORIAL GALLERY MODE ================= */}
        {viewMode === "editorial" && (
          <div className="pt-4">
            <CurvedProjectGallery
              key={filteredProjects.map((project) => project.slug).join("|")}
              projects={filteredProjects}
            />
          </div>
        )}
        {/* ================= CATALOGUE TABLE MODE ================= */}
        {viewMode === "table" && (
          <div className="pt-4">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-[var(--color-border)] font-mono text-xs uppercase text-[var(--color-muted)]">
                    <th className="py-4 px-3 w-16">No.</th>
                    <th className="py-4 px-3">Project Title</th>
                    <th className="py-4 px-3 hidden md:table-cell">Category</th>
                    <th className="py-4 px-3 hidden lg:table-cell">Key Technologies</th>
                    <th className="py-4 px-3 w-20">Year</th>
                    <th className="py-4 px-3 text-right">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[var(--color-border)] text-sm">
                  {filteredProjects.map((project, idx) => (
                    <tr
                      key={project.slug}
                      onMouseEnter={() => setHoveredProject(project)}
                      onMouseLeave={() => setHoveredProject(null)}
                      className="group hover:bg-[var(--color-surface)]/50 transition-colors"
                    >
                      <td className="py-5 px-3 font-mono text-xs text-[var(--color-muted)]">
                        0{idx + 1}
                      </td>
                      <td className="py-5 px-3">
                        <Link
                          href={`/work/${project.slug}`}
                          className="font-medium text-[var(--color-foreground)] group-hover:text-[var(--color-accent-terracotta)] transition-colors flex items-center space-x-2"
                        >
                          <span>{project.title}</span>
                          <span className="text-xs text-[var(--color-muted)] font-normal hidden sm:inline">
                            — {project.subtitle}
                          </span>
                        </Link>
                      </td>
                      <td className="py-5 px-3 font-mono text-xs text-[var(--color-muted)] hidden md:table-cell">
                        {project.categoryShort}
                      </td>
                      <td className="py-5 px-3 font-mono text-xs text-[var(--color-muted)] hidden lg:table-cell">
                        {project.tech.slice(0, 3).join(", ")}
                      </td>
                      <td className="py-5 px-3 font-mono text-xs text-[var(--color-muted)]">
                        {project.year}
                      </td>
                      <td className="py-5 px-3 text-right font-mono text-xs">
                        <Link
                          href={`/work/${project.slug}`}
                          className="inline-block px-3 py-1 bg-[var(--color-foreground)] text-[#FBFBF9] hover:bg-neutral-800 transition-colors"
                        >
                          View →
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Hover Floating Thumbnail Preview for Table */}
            <AnimatePresence>
              {hoveredProject && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.96, y: 8 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.96, y: 8 }}
                  transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
                  className="hidden lg:block fixed bottom-10 right-10 z-40 pointer-events-none w-80 aspect-[16/10] overflow-hidden bg-[var(--color-surface)] shadow-2xl"
                >
                  <Image
                    src={hoveredProject.heroImage}
                    alt={hoveredProject.title}
                    fill
                    className="object-cover object-top"
                  />
                  <div className="absolute bottom-0 inset-x-0 bg-neutral-900/85 p-3 font-mono text-xs text-[#FBFBF9]">
                    <div className="font-medium">{hoveredProject.title}</div>
                    <div className="text-[10px] text-neutral-400">{hoveredProject.categoryShort} • {hoveredProject.year}</div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        )}
      </div>
    </section>
  );
}
