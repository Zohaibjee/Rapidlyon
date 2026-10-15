"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { ArrowRight, ArrowUpRight, Code2, Compass } from "lucide-react";
import type { Project } from "@/data/site";

type WorkFilter = "all" | "ux-design" | "development";

const filters: { id: WorkFilter; label: string }[] = [
  { id: "all", label: "All work" },
  { id: "ux-design", label: "UX design" },
  { id: "development", label: "Development" },
];

const uxCaseStudyStages = [
  "Discovery",
  "Define",
  "Sitemap + IA",
  "Wireframes",
  "UI design",
  "Design audit",
  "Prototype testing",
  "Developer handoff",
];

function matchesDiscipline(project: Project, filter: WorkFilter) {
  if (filter === "all") {
    return true;
  }

  return project.discipline === filter || project.discipline === "design-development";
}

function StorefrontCover({ project }: { project: Project }) {
  if (project.coverMedia) {
    return (
      <div className="relative aspect-[16/8] overflow-hidden rounded-control bg-ink">
        <Image
          src={project.coverMedia.src}
          alt={project.coverMedia.alt}
          fill
          unoptimized
          sizes="(max-width: 768px) 100vw, 1200px"
          className="object-cover"
        />
        {project.coverMedia.caption ? (
          <span className="absolute bottom-3 left-3 rounded-full bg-ink/70 px-3 py-1.5 text-xs text-on-dark">
            {project.coverMedia.caption}
          </span>
        ) : null}
      </div>
    );
  }

  if (project.slug !== "umer-mobile-parts") {
    return (
      <div className="flex aspect-[16/8] flex-col justify-between rounded-control work-artwork-concept p-6 text-paper sm:p-9">
        <p className="text-xs font-medium uppercase tracking-label-wide text-accent">{project.projectType}</p>
        <div>
          <p className="max-w-3xl text-3xl font-semibold tracking-display-tight sm:text-5xl">{project.title}</p>
          <p className="mt-3 max-w-2xl text-sm leading-6 text-on-dark/70">{project.summary}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="overflow-hidden rounded-control bg-navy text-on-dark">
      <div className="flex items-center justify-between gap-4 border-b border-on-dark/10 px-5 py-4">
        <div className="flex items-center gap-3">
          <span className="flex size-9 items-center justify-center rounded-lg bg-storefront-orange font-bold">U</span>
          <div>
            <p className="text-sm font-semibold">{project.title}</p>
            <p className="text-micro font-semibold uppercase tracking-label-compact text-storefront-orange-soft">Wholesale & retail</p>
          </div>
        </div>
        <span className="hidden rounded-lg border border-on-dark/15 px-3 py-2 text-xs text-on-dark/55 sm:block">Search parts, brands or mobile models...</span>
        <span className="hidden text-caption uppercase tracking-label-small text-on-dark/45 sm:inline">Visual summary · live project link</span>
        <ArrowUpRight size={18} aria-hidden="true" className="shrink-0 text-on-dark/70" />
      </div>
      <div className="relative min-h-60 overflow-hidden px-6 py-8 sm:min-h-72 sm:px-9 sm:py-10">
        <div aria-hidden="true" className="absolute inset-0 work-artwork-storefront" />
        <div className="relative max-w-2xl">
          <p className="inline-flex rounded-full border border-on-dark/25 px-3 py-1.5 text-caption font-semibold uppercase tracking-label-tiny text-storefront-orange-pale">
            Live storefront · {project.projectType}
          </p>
          <p className="mt-7 text-3xl font-bold leading-display-open tracking-display-tight sm:text-5xl">
            Your repair starts<br />with the right part.
          </p>
          <p className="mt-4 max-w-lg text-sm leading-6 text-on-dark/70">
            Browse displays, batteries, charging parts, and mobile models.
          </p>
        </div>
      </div>
      <div className="flex flex-wrap items-center gap-x-5 gap-y-2 border-t border-on-dark/10 px-5 py-3 text-caption font-medium text-on-dark/65 sm:px-7">
        {["All categories", "Home", "Products", "Track order", "Contact", "For retailers"].map((label) => (
          <span key={label}>{label}</span>
        ))}
      </div>
    </div>
  );
}

function ProjectCard({ project }: { project: Project }) {
  return (
    <article className="overflow-hidden rounded-feature border border-divider bg-on-dark shadow-floating">
      <Link href={`/work/${project.slug}`} className="group block p-4 sm:p-6">
        <StorefrontCover project={project} />
        <div className="flex flex-col gap-5 px-2 pb-2 pt-6 sm:flex-row sm:items-end sm:justify-between sm:px-3 sm:pt-8">
          <div>
            <div className="flex flex-wrap items-center gap-2 text-caption font-medium uppercase tracking-label-tight text-muted">
              <span>{project.projectType}</span>
              <span aria-hidden="true">·</span>
              <span>{project.visibilityLabel}</span>
            </div>
            <h3 className="mt-3 text-3xl font-semibold tracking-display text-ink sm:text-4xl">{project.title}</h3>
            <p className="mt-3 max-w-3xl text-sm leading-7 text-body">{project.summary}</p>
          </div>
          <span className="inline-flex shrink-0 items-center gap-2 text-sm font-semibold text-ink group-hover:text-accent-deep">
            Read case study <ArrowRight size={17} className="transition group-hover:translate-x-1" />
          </span>
        </div>
      </Link>
      <div className="grid border-t border-divider sm:grid-cols-3 sm:divide-x sm:divide-black/5">
        {[
          { title: "Project", text: project.clientOrContext },
          { title: "Role", text: project.role },
          { title: "Scope", text: project.services.join(" · ") },
        ].map((fact) => (
          <div key={fact.title} className="border-b border-divider px-5 py-4 last:border-b-0 sm:border-b-0 sm:px-6">
            <p className="text-caption font-semibold uppercase tracking-label-compact text-muted">{fact.title}</p>
            <p className="mt-1 text-sm leading-6 text-body-strong">{fact.text}</p>
          </div>
        ))}
      </div>
    </article>
  );
}

export function WorkPortfolio({ projects }: { projects: Project[] }) {
  const [activeFilter, setActiveFilter] = useState<WorkFilter>("all");
  const publishedProjects = projects
    .filter((project) => project.status === "published")
    .sort((left, right) => left.displayOrder - right.displayOrder);
  const visibleProjects = publishedProjects.filter((project) => matchesDiscipline(project, activeFilter));

  return (
    <>
      <div className="mt-10 flex flex-col gap-5 border-b border-divider-strong pb-6 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h2 className="text-xl font-semibold tracking-display-tight text-ink">Browse by discipline</h2>
          <p className="mt-1 text-sm text-body-muted">Client work and concept studies are labeled clearly, so you can tell which is which.</p>
        </div>
        <div role="group" aria-label="Filter portfolio by discipline" className="flex flex-wrap gap-2">
          {filters.map((filter) => (
            <button
              key={filter.id}
              type="button"
              aria-pressed={activeFilter === filter.id}
              onClick={() => setActiveFilter(filter.id)}
              className={`rounded-full px-4 py-2.5 text-sm font-medium transition ${
                activeFilter === filter.id
                  ? "bg-ink text-on-dark"
                  : "border border-divider-strong bg-on-dark text-body hover:border-black/30"
              }`}
            >
              {filter.label}
            </button>
          ))}
        </div>
      </div>

      <div className="mt-8" aria-live="polite">
        {visibleProjects.length > 0 ? (
          <div className="grid gap-7">
            {visibleProjects.map((project) => <ProjectCard key={project.slug} project={project} />)}
          </div>
        ) : activeFilter === "ux-design" ? (
          <section className="rounded-card border border-divider bg-on-dark p-6 sm:p-9">
            <div className="flex size-12 items-center justify-center rounded-2xl bg-accent-soft text-ink">
              <Compass size={23} aria-hidden="true" />
            </div>
            <p className="mt-5 text-xs font-semibold uppercase tracking-label-wide text-muted">UX case studies</p>
            <h3 className="mt-2 text-3xl font-semibold tracking-display-tight text-ink">A case study should show the thinking—not just the final screens.</h3>
            <p className="mt-4 max-w-3xl text-sm leading-7 text-body">
              UX projects are documented through the actual work: the brief, discovery, decisions, and design artefacts. We have not published a UX case study yet, so no process is attributed to the live development project.
            </p>
            <div className="mt-7 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
              {uxCaseStudyStages.map((stage, index) => (
                <div key={stage} className="flex items-center gap-3 rounded-xl bg-paper px-4 py-3">
                  <span className="text-xs font-semibold text-accent-mid">0{index + 1}</span>
                  <span className="text-sm font-medium text-body-strong">{stage}</span>
                </div>
              ))}
            </div>
            <p className="mt-5 text-xs leading-5 text-muted">
              This is the case-study structure, not a claim that every project contains every activity. Each published story will identify what was actually done and what can be shared.
            </p>
            <Link href="/contact?intent=service&service=ux-ui-design" className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-ink underline decoration-black/20 underline-offset-4 hover:decoration-black">
              Discuss a UX design project <ArrowRight size={16} />
            </Link>
          </section>
        ) : (
          <section className="rounded-card border border-divider bg-on-dark p-6 sm:p-9">
            <div className="flex size-12 items-center justify-center rounded-2xl bg-accent-soft text-ink">
              <Code2 size={23} aria-hidden="true" />
            </div>
            <h3 className="mt-5 text-2xl font-semibold tracking-display-tight text-ink">No development case studies published yet.</h3>
            <p className="mt-3 max-w-2xl text-sm leading-7 text-body">We only show work that is cleared and supported by verifiable project details.</p>
          </section>
        )}
      </div>
    </>
  );
}
