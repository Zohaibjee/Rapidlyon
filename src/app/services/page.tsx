import Link from "next/link";
import { ArrowRight, Blocks, Code2, Compass, Layers3, Search, Sparkles } from "lucide-react";
import { SectionHeading } from "@/components/ui/section-heading";
import { createPageMetadata } from "@/lib/metadata";

export const metadata = createPageMetadata(
  "UX/UI design, website development, and SEO services",
  "Explore Rapidlyon's product design, website development, and SEO and website optimization services, each scoped around business and user needs.",
  "/services",
);

const servicePaths = [
  {
    id: "design",
    eyebrow: "Understand people. Shape the experience.",
    title: "UX/UI & product design",
    summary:
      "We help you understand the audience and problem, then shape clear product journeys and interfaces before implementation decisions lock the experience in.",
    href: "/services/ux-ui-design",
    detailsLink: "Explore UX/UI design",
    contactHref: "/contact?intent=service&service=ux-ui-design",
    icon: Compass,
    services: [
      {
        title: "Product discovery",
        text: "Align user needs, business goals, existing evidence, and project constraints.",
        icon: Search,
      },
      {
        title: "Information architecture",
        text: "Organize content and define the paths people need to move through.",
        icon: Layers3,
      },
      {
        title: "Wireframes & interaction design",
        text: "Work through structure, key states, and flows before detailed UI.",
        icon: Blocks,
      },
      {
        title: "Interface design & handoff",
        text: "Create responsive visual designs and practical notes for implementation.",
        icon: Sparkles,
      },
    ],
    process: [
      ["Discover", "Understand the people, problem, goals, and available evidence."],
      ["Define", "Agree the priority journeys, structure, and design direction."],
      ["Design & hand off", "Create the agreed screens and prototype, refine them, then prepare implementation notes."],
    ],
    linkLabel: "See the UX/UI design service",
  },
  {
    id: "development",
    eyebrow: "Plan clearly. Build for real use.",
    title: "Website development",
    summary:
      "We turn an agreed design and content structure into a responsive, accessible website that is maintainable and ready to launch.",
    href: "/services/web-development",
    detailsLink: "Explore web development",
    contactHref: "/contact?intent=service&service=web-development",
    icon: Code2,
    services: [
      {
        title: "Website implementation",
        text: "Build approved pages and reusable layouts for desktop, tablet, and mobile.",
        icon: Blocks,
      },
      {
        title: "Frontend engineering",
        text: "Create fast, maintainable interfaces with careful responsive behavior.",
        icon: Code2,
      },
      {
        title: "Content & integrations",
        text: "Connect the agreed forms, content needs, and third-party services in scope.",
        icon: Layers3,
      },
      {
        title: "Quality & launch",
        text: "Check key journeys, accessibility, and production readiness before handoff.",
        icon: Sparkles,
      },
    ],
    process: [
      ["Plan", "Confirm the approved designs, content, requirements, and technical constraints."],
      ["Build", "Implement the responsive pages and agreed functionality in clear, reusable parts."],
      ["Check & launch", "Review the experience against the scope, resolve issues, and prepare the handoff."],
    ],
    linkLabel: "See the web development service",
  },
  {
    id: "optimization",
    eyebrow: "Improve what people and search engines can find",
    title: "SEO & website optimization",
    summary: "Review technical SEO, metadata, indexability, performance, accessibility, and content structure, then prioritize changes that fit the site and its constraints.",
    href: "/services/seo-website-optimization",
    detailsLink: "Explore SEO & optimization",
    contactHref: "/contact?intent=service&service=seo-website-optimization",
    icon: Search,
    services: [
      { title: "Technical SEO", text: "Review crawlability, indexability, canonical behavior, and technical foundations.", icon: Search },
      { title: "On-page foundations", text: "Improve page titles, descriptions, headings, and internal linking where appropriate.", icon: Layers3 },
      { title: "Performance & accessibility", text: "Identify practical experience improvements across devices and assistive use.", icon: Sparkles },
      { title: "Content recommendations", text: "Clarify information structure without promising rankings or traffic.", icon: Blocks },
    ],
    process: [
      ["Review", "Understand the site, business goals, available data, and constraints."],
      ["Prioritize", "Separate observed issues from assumptions and agree practical scope."],
      ["Improve", "Implement or document the agreed work, then validate the changes."],
    ],
    linkLabel: "See SEO & website optimization",
  },
];

const specialistServices = [
  {
    title: "Website redesign",
    description: "Improve the clarity, content structure, and journeys of an existing website.",
    href: "/services/website-redesign",
  },
  {
    title: "SaaS & MVP",
    description: "A project type that begins with discovery, feasibility, and agreed first-release scope.",
    href: "/services/saas-mvp",
  },
  {
    title: "Next.js development",
    description: "A technology capability within website development, selected where it fits the project.",
    href: "/services/nextjs-development",
  },
];

export default function ServicesPage() {
  return (
    <div className="bg-paper">
      <section className="bg-ink px-4 py-16 text-paper sm:px-6 sm:py-20 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <SectionHeading
            eyebrow="Services · discovery before solutions"
            title="Three ways to make a digital product work better."
            description="Start with the problem, audience, business model, and constraints. Then choose product design, website development, or SEO and website optimization; the scope can connect these where it makes sense."
            level="h1"
            tone="dark"
          />
          <div className="mt-8 flex flex-wrap gap-3">
            <Link href="#ux-ui-design" className="inline-flex items-center gap-2 rounded-full bg-accent px-5 py-3 text-sm font-semibold text-ink transition hover:bg-accent-bright">
              Explore the services <ArrowRight size={16} />
            </Link>
            <Link href="/contact?intent=conversation" className="inline-flex items-center rounded-full border border-on-dark/25 px-5 py-3 text-sm font-medium text-on-dark transition hover:border-on-dark/60">
              Talk through what you need
            </Link>
          </div>
        </div>
      </section>

      <section aria-label="Core services" className="mx-auto max-w-7xl space-y-8 px-4 py-14 sm:px-6 sm:py-16 lg:px-8">
        {servicePaths.map((path, index) => {
          const PathIcon = path.icon;

          return (
            <article
              id={index === 0 ? "ux-ui-design" : path.id === "development" ? "web-development" : "seo-website-optimization"}
              key={path.id}
              className="scroll-mt-28 overflow-hidden rounded-feature border border-divider bg-on-dark shadow-subtle"
            >
              <div className="grid lg:grid-cols-[0.82fr_1.18fr]">
                <div className={`p-6 sm:p-9 lg:p-10 ${index === 0 ? "bg-accent-soft" : "bg-divider-soft"}`}>
                  <div className="flex size-12 items-center justify-center rounded-2xl bg-ink text-accent">
                    <PathIcon size={23} aria-hidden="true" />
                  </div>
                  <p className="mt-6 text-xs font-semibold uppercase tracking-label-tight text-accent-deep">{path.eyebrow}</p>
                  <h2 className="mt-3 text-3xl font-semibold tracking-display-tight text-ink sm:text-4xl">{path.title}</h2>
                  <p className="mt-4 max-w-xl text-sm leading-7 text-body">{path.summary}</p>
                  <div className="mt-7 flex flex-col gap-3 sm:flex-row lg:flex-col xl:flex-row">
                    <Link href={path.href} className="inline-flex items-center justify-center gap-2 rounded-full bg-ink px-5 py-3 text-sm font-medium text-on-dark transition hover:bg-ink-hover">
                      {path.detailsLink} <ArrowRight size={16} />
                    </Link>
                    <Link href={path.contactHref} className="inline-flex items-center justify-center rounded-full border border-ink/20 px-5 py-3 text-sm font-medium text-ink transition hover:bg-on-dark/60">
                      Ask about this service
                    </Link>
                  </div>
                </div>

                <div className="p-6 sm:p-9 lg:p-10">
                  <h3 className="text-xs font-semibold uppercase tracking-label-tight text-muted">What we can help with</h3>
                  <div className="mt-5 grid gap-x-6 gap-y-5 sm:grid-cols-2">
                    {path.services.map((service) => {
                      const ServiceIcon = service.icon;

                      return (
                        <div key={service.title} className="flex gap-3">
                          <span className="mt-0.5 flex size-9 shrink-0 items-center justify-center rounded-xl bg-paper text-accent-deep">
                            <ServiceIcon size={18} aria-hidden="true" />
                          </span>
                          <div>
                            <h4 className="text-sm font-semibold text-ink">{service.title}</h4>
                            <p className="mt-1 text-sm leading-6 text-body-muted">{service.text}</p>
                          </div>
                        </div>
                      );
                    })}
                  </div>

                  <div className="mt-8 border-t border-divider-strong pt-6">
                    <h3 className="text-xs font-semibold uppercase tracking-label-tight text-muted">A simple path through the work</h3>
                    <ol className="mt-4 grid gap-4 sm:grid-cols-3">
                      {path.process.map(([title, description], stepIndex) => (
                        <li key={title} className="relative">
                          <span className="text-xs font-semibold text-accent-mid">0{stepIndex + 1}</span>
                          <h4 className="mt-1 text-sm font-semibold text-ink">{title}</h4>
                          <p className="mt-1 text-xs leading-5 text-body-muted">{description}</p>
                        </li>
                      ))}
                    </ol>
                  </div>
                </div>
              </div>
            </article>
          );
        })}
      </section>

      <section className="border-y border-divider bg-on-dark py-14 sm:py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow="Capabilities and project types"
            title="Have a specific kind of project?"
            description="SaaS/MVP work and Next.js implementation are considered within the relevant service category and scoped for feasibility; they are not separate primary service categories."
            level="h2"
          />
          <div className="mt-7 grid gap-4 md:grid-cols-3">
            {specialistServices.map((service) => (
              <Link key={service.title} href={service.href} className="group rounded-control border border-divider bg-paper p-5 transition hover:border-black/15 hover:bg-on-dark">
                <div className="flex items-center justify-between gap-3">
                  <h3 className="text-lg font-semibold text-ink">{service.title}</h3>
                  <ArrowRight size={17} aria-hidden="true" className="transition group-hover:translate-x-1" />
                </div>
                <p className="mt-2 text-sm leading-6 text-body-muted">{service.description}</p>
                <span className="mt-4 inline-block text-sm font-medium text-ink underline underline-offset-4">Explore this service</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-14 sm:px-6 sm:py-16 lg:px-8">
        <div className="grid gap-6 rounded-card bg-ink p-7 text-paper md:grid-cols-[1fr_auto] md:items-center md:p-9">
          <div>
            <p className="text-xs font-medium uppercase tracking-label-wide text-accent">Design + development</p>
            <h2 className="mt-3 text-2xl font-semibold tracking-display-tight sm:text-3xl">Need both sides to work together?</h2>
            <p className="mt-3 max-w-2xl text-sm leading-7 text-on-dark/70">
              We can connect experience design and implementation in one coordinated project. See the separate package page for defined scope and pricing.
            </p>
          </div>
          <Link href="/pricing" className="inline-flex items-center justify-center gap-2 rounded-full bg-accent px-5 py-3 text-sm font-semibold text-ink transition hover:bg-accent-bright">
            Explore combined project options <ArrowRight size={16} />
          </Link>
        </div>
      </section>
    </div>
  );
}
