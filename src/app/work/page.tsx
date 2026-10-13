import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { featuredProjects } from "@/data/site";
import { SectionHeading } from "@/components/ui/section-heading";
import { createPageMetadata } from "@/lib/metadata";

export const metadata = createPageMetadata(
  "Work",
  "Explore Rapidlyon's published digital work, including a live personal e-commerce storefront.",
  "/work",
);

export default function WorkPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
      <SectionHeading
        eyebrow="Live project"
        title="A real project, with no invented case-study results."
        description="Explore a live personal e-commerce project. The portfolio currently includes this published project only; no fictional client work or performance metrics are presented."
        level="h1"
      />

      <div className="mt-12 grid max-w-5xl gap-6">
        {featuredProjects.map((project) => (
          <Link
            key={project.slug}
            href={`/work/${project.slug}`}
            className="group overflow-hidden rounded-[28px] border border-black/5 bg-white p-6 shadow-[0_18px_40px_rgba(23,25,22,0.05)] transition hover:-translate-y-1"
          >
            <div className="mb-6 rounded-[22px] bg-[#171916] p-6 text-[#F5F5EF] sm:p-8">
              <div className="flex items-center justify-between text-[10px] uppercase tracking-[0.2em] text-white/80">
                <span>{project.type}</span>
                <ArrowUpRight size={16} className="transition group-hover:translate-x-1 group-hover:-translate-y-1" />
              </div>
              <div className="mt-14">
                <p className="text-3xl font-semibold tracking-tight">{project.title}</p>
                <p className="mt-2 text-sm text-white/70">Wholesale & retail · mobile spare parts</p>
                <div className="mt-5 flex flex-wrap gap-2">
                  {["Displays", "Batteries", "Charging parts", "Camera parts"].map((category) => (
                    <span key={category} className="rounded-full border border-white/20 px-3 py-1.5 text-xs text-white/85">
                      {category}
                    </span>
                  ))}
                </div>
              </div>
            </div>
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-xs font-medium uppercase tracking-[0.2em] text-[#73776D]">{project.type}</p>
                <h2 className="mt-3 text-3xl tracking-[-0.06em] text-[#171916]">{project.title}</h2>
              </div>
              <span className="rounded-full border border-black/10 px-2 py-1 text-[10px] uppercase tracking-[0.18em] text-[#171916]">{project.label}</span>
            </div>
            <p className="mt-4 text-sm leading-7 text-[#4f544d]">{project.summary}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
