import Link from "next/link";
import type { Metadata } from "next";
import { ArrowRight, ArrowUpRight, Check, Search } from "lucide-react";
import { featuredProjects } from "@/data/site";
import { SectionHeading } from "@/components/ui/section-heading";
import { createPageMetadata } from "@/lib/metadata";

export const metadata: Metadata = createPageMetadata(
  "UX design and web development for growing teams",
  "Rapidlyon is an independent digital design and development studio helping founders and teams shape clear user experiences and responsive websites.",
  "/",
);

const serviceHighlights = [
  {
    title: "UX / UI design",
    description: "Turn an early idea or confusing journey into a clear structure, useful flows, and considered responsive interfaces.",
    points: ["Discovery and project framing", "Sitemap, flows, and wireframes", "UI design, prototype, and handoff"],
    href: "/services/ux-ui-design",
  },
  {
    title: "Web development",
    description: "Build a responsive, maintainable website from approved designs, with the agreed details checked before handoff.",
    points: ["Responsive implementation", "Agreed forms and integrations", "Quality review and launch handoff"],
    href: "/services/web-development",
  },
  {
    title: "Product & MVP work",
    description: "Focus the first release around the essential product journey instead of trying to build every possible feature at once.",
    points: ["Product framing and scope", "Critical UX flows", "A practical path from design to build"],
    href: "/services/saas-mvp",
  },
];

const project = featuredProjects[0];

export default function HomePage() {
  return (
    <div className="bg-paper">
      <section className="overflow-hidden bg-ink text-paper">
        <div className="mx-auto grid max-w-7xl gap-12 px-4 pb-16 pt-16 sm:px-6 sm:pb-20 sm:pt-20 lg:grid-cols-[1.15fr_0.85fr] lg:items-end lg:px-8 lg:pt-24">
          <div>
            <p className="mb-6 text-xs font-medium uppercase tracking-label text-accent">
                Independent digital design & development studio
            </p>
            <h1 className="max-w-4xl text-display font-semibold leading-display tracking-display-tight">
              Make your offer easier to understand—and act on.
            </h1>
            <p className="mt-7 max-w-2xl text-lg leading-8 text-on-dark/75 sm:text-xl">
              We work with founders and teams to make digital products easier to understand, navigate, and build—from the first product decisions through to a responsive website.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link
                href="/contact?intent=conversation"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-accent px-6 py-3.5 text-sm font-semibold text-ink transition hover:bg-accent-bright"
              >
                Tell us what you’re building <ArrowRight size={16} />
              </Link>
              <Link
                href="/work"
                className="inline-flex items-center justify-center gap-2 rounded-full border border-on-dark/25 px-6 py-3.5 text-sm font-medium text-on-dark transition hover:border-on-dark/60"
              >
                Explore our work <ArrowRight size={16} />
              </Link>
            </div>
            <p className="mt-5 text-sm text-on-dark/60">
              Not sure where to start?{" "}
              <Link href="/contact?intent=conversation" className="text-on-dark underline decoration-white/40 underline-offset-4 hover:decoration-white">
                A short first conversation is enough.
              </Link>
            </p>
          </div>

          <div className="rounded-card border border-on-dark/10 bg-on-dark/[0.04] p-6 sm:p-7">
            <p className="text-xs font-medium uppercase tracking-label-wide text-accent">Who we are</p>
            <h2 className="mt-4 text-2xl font-semibold leading-tight tracking-display-tight sm:text-3xl">
              A small independent studio, close to the work.
            </h2>
            <p className="mt-4 text-sm leading-7 text-on-dark/75">
              Rapidlyon brings UX thinking, interface design, and web development together. We keep the conversation direct, make decisions visible, and agree on the work before moving into delivery.
            </p>
            <div className="mt-6 flex flex-wrap gap-2">
              {["Independent studio", "Design and engineering", "Remote-first"].map((item) => (
                <span key={item} className="rounded-full border border-on-dark/15 px-3 py-1.5 text-xs text-on-dark/75">{item}</span>
              ))}
            </div>
            <Link href="/about" className="mt-7 inline-flex items-center gap-2 text-sm font-medium text-accent hover:text-on-dark">
              Get to know Rapidlyon <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>

      <section aria-label="Rapidlyon project facts" className="border-b border-divider-strong bg-on-dark">
        <div className="mx-auto grid max-w-7xl gap-5 px-4 py-5 text-sm sm:grid-cols-2 sm:px-6 lg:grid-cols-4 lg:px-8">
          {[
            "One-to-one project communication",
            "Scope and deliverables agreed before work",
            "A real project you can inspect",
            "Clear handoff and next steps",
          ].map((fact) => (
            <p key={fact} className="flex items-center gap-3 text-body-strong">
              <Check size={16} aria-hidden="true" className="shrink-0 text-accent-deep" />
              {fact}
            </p>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:items-center">
          <div>
            <p className="text-xs font-medium uppercase tracking-label text-muted">Work you can inspect</p>
            <h2 className="mt-4 text-4xl font-semibold leading-tight tracking-display-tight text-ink md:text-5xl">
              Not just a polished promise. A live storefront.
            </h2>
            <p className="mt-5 text-base leading-8 text-body">
              {project.summary} See how the visible catalog gives shoppers ways to browse parts, brands, and product listings.
            </p>
            <p className="mt-4 text-sm leading-6 text-muted">
              This is a published independent personal project. We do not present it as client work or claim unverified sales or conversion results.
            </p>
            <Link href={`/work/${project.slug}`} className="mt-7 inline-flex items-center gap-2 rounded-full bg-ink px-5 py-3 text-sm font-medium text-on-dark hover:bg-ink-hover">
              Explore the project breakdown <ArrowRight size={16} />
            </Link>
          </div>

          <div className="rounded-card bg-ink p-5 text-paper sm:p-7">
            <div className="flex items-center justify-between border-b border-on-dark/15 pb-4">
              <div>
                <p className="text-xs uppercase tracking-label-tight text-on-dark/55">Live personal project</p>
                <h3 className="mt-1 text-xl font-semibold">{project.title}</h3>
              </div>
              <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" aria-label="Visit Umer Mobile Parts storefront" className="rounded-full border border-on-dark/20 p-3 text-on-dark hover:border-accent hover:text-accent">
                <ArrowUpRight size={18} />
              </a>
            </div>
            <p className="mt-5 text-sm leading-6 text-on-dark/70">Visible product discovery paths on the storefront</p>
            <div className="mt-4 grid gap-3 sm:grid-cols-3">
              {[
                { label: "Search", text: "Find a product in the catalog", icon: Search },
                { label: "Browse", text: "Explore by part category", icon: ArrowRight },
                { label: "Choose", text: "Review brand and model listings", icon: Check },
              ].map((step, index) => {
                const Icon = step.icon;

                return (
                  <div key={step.label} className="rounded-2xl border border-on-dark/10 bg-on-dark/5 p-4">
                    <span className="flex size-9 items-center justify-center rounded-full bg-accent text-ink">
                      <Icon size={17} aria-hidden="true" />
                    </span>
                    <p className="mt-4 text-xs uppercase tracking-label-small text-accent">0{index + 1} · {step.label}</p>
                    <p className="mt-2 text-sm leading-6 text-on-dark/85">{step.text}</p>
                  </div>
                );
              })}
            </div>
            <p className="mt-5 text-xs leading-5 text-on-dark/45">
              These are observable storefront paths—not user-research claims or performance metrics.
            </p>
          </div>
        </div>
      </section>

      <section className="bg-on-dark py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow="What we do"
            title="From a product question to a working digital experience."
            description="Choose the kind of help you need. Design, development, and product work can be scoped separately or brought together around your goals."
          />
          <div className="mt-10 grid gap-5 lg:grid-cols-3">
            {serviceHighlights.map((service) => (
              <article key={service.title} className="flex flex-col rounded-soft border border-divider bg-paper p-6 text-ink">
                <h3 className="text-2xl font-semibold tracking-display-tight">{service.title}</h3>
                <p className="mt-3 text-sm leading-6 text-body-muted">{service.description}</p>
                <ul className="mt-6 flex-1 space-y-3">
                  {service.points.map((item) => (
                    <li key={item} className="flex items-start gap-2 text-sm leading-6 text-body">
                      <Check size={16} aria-hidden="true" className="mt-1 shrink-0 text-accent-deep" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
                <Link href={service.href} className="mt-7 inline-flex items-center gap-2 text-sm font-semibold text-ink hover:text-accent-deep">
                  Explore {service.title} <ArrowRight size={16} />
                </Link>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-ink py-20 text-paper">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow="A working rhythm"
            title="Know what happens before the first screen—and after it."
            description="A small, visible set of decisions keeps scope understandable and feedback useful."
            tone="dark"
          />
          <ol className="mt-10 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            {[
              { title: "Discover", text: "Align on audience, goals, constraints, and what the project must help someone do." },
              { title: "Define", text: "Agree pages, unique templates, deliverables, revision rounds, assumptions, and exclusions." },
              { title: "Design", text: "Map and review the journeys, wireframes, responsive UI, and prototype for the selected scope." },
              { title: "Build & hand off", text: "Implement the approved scope, check the agreed experience, and prepare the build for handoff." },
            ].map((step, index) => (
              <li key={step.title} className="rounded-control border border-on-dark/10 bg-on-dark/[0.04] p-5">
                <p className="text-xs font-medium uppercase tracking-label-tight text-accent">Step 0{index + 1}</p>
                <h3 className="mt-4 text-xl font-semibold">{step.title}</h3>
                <p className="mt-3 text-sm leading-7 text-on-dark/70">{step.text}</p>
              </li>
            ))}
          </ol>
          <Link href="/process" className="mt-8 inline-flex items-center gap-2 text-sm font-medium text-accent hover:text-on-dark">
            See the detailed process <ArrowRight size={16} />
          </Link>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <div className="grid gap-8 rounded-feature border border-divider bg-accent-soft p-7 md:grid-cols-[1fr_auto] md:items-center md:p-10">
          <div>
            <p className="text-xs font-medium uppercase tracking-label-wide text-accent-deep">Start with a conversation</p>
            <h2 className="mt-3 max-w-3xl text-3xl font-semibold leading-tight tracking-display-tight text-ink md:text-4xl">
              You do not need a perfect brief. Tell us what you are trying to make better.
            </h2>
            <p className="mt-4 max-w-2xl text-sm leading-7 text-body">
              Share a few details or send a longer discovery brief when you are ready. We will start by understanding the problem, not pushing you into a preset solution.
            </p>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row md:flex-col">
            <Link href="/contact?intent=conversation" className="inline-flex items-center justify-center gap-2 rounded-full bg-ink px-5 py-3 text-sm font-medium text-on-dark hover:bg-ink-hover">
              Start a conversation <ArrowRight size={16} />
            </Link>
            <Link href="/discovery" className="inline-flex items-center justify-center rounded-full border border-ink/20 px-5 py-3 text-sm font-medium text-ink hover:bg-on-dark/50">
              Share a detailed brief
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
