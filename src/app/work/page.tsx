import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { featuredProjects } from "@/data/site";
import { WorkPortfolio } from "@/components/work/work-portfolio";
import { createPageMetadata } from "@/lib/metadata";

export const metadata = createPageMetadata(
  "Selected UX design and development work",
  "Explore Rapidlyon case studies by UX design and development. Each project separates real process, decisions, deliverables, and verified outcomes.",
  "/work",
);

export default function WorkPage() {
  return (
    <div className="bg-paper">
      <section className="bg-ink px-4 py-16 text-paper sm:px-6 sm:py-20 lg:px-8">
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[1fr_0.55fr] lg:items-end">
          <div>
            <p className="text-xs font-medium uppercase tracking-label text-accent">Selected work · process · proof</p>
            <h1 className="mt-5 max-w-4xl text-5xl font-semibold leading-display tracking-display sm:text-6xl lg:text-7xl">
              The thinking behind the work matters.
            </h1>
            <p className="mt-6 max-w-2xl text-base leading-8 text-on-dark/70 sm:text-lg">
              Browse by discipline. Each case study is built to explain the context, decisions, work, and evidence—not just show a finished screen.
            </p>
          </div>
          <div className="rounded-panel border border-on-dark/10 bg-on-dark/[0.04] p-5">
            <p className="text-xs font-medium uppercase tracking-label-tight text-accent">A note on proof</p>
            <p className="mt-3 text-sm leading-7 text-on-dark/70">
              We publish only work and project details that can be represented honestly. A method is not presented as a project result, and private or unverified details stay out.
            </p>
            <Link href="/contact?intent=conversation" className="mt-4 inline-flex items-center gap-2 text-sm font-medium text-on-dark underline decoration-white/30 underline-offset-4 hover:decoration-white">
              Talk about a project <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <WorkPortfolio projects={featuredProjects} />
      </section>

      <section className="border-t border-divider bg-on-dark">
        <div className="mx-auto flex max-w-7xl flex-col gap-5 px-4 py-10 sm:px-6 md:flex-row md:items-center md:justify-between lg:px-8">
          <div>
            <p className="text-xs font-medium uppercase tracking-label-wide text-muted">Have a project to show?</p>
            <h2 className="mt-2 text-2xl font-semibold tracking-display-tight text-ink">Let’s make the next case study yours.</h2>
          </div>
          <div className="flex flex-wrap gap-3">
            <Link href="/contact?intent=conversation" className="inline-flex items-center gap-2 rounded-full bg-ink px-5 py-3 text-sm font-medium text-on-dark hover:bg-ink-hover">
              Start a conversation <ArrowRight size={16} />
            </Link>
            <Link href="/pricing" className="inline-flex items-center rounded-full border border-black/15 px-5 py-3 text-sm font-medium text-ink hover:border-black/35">
              View project packages
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
