import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight, ArrowUpRight, Check } from "lucide-react";
import { featuredProjects } from "@/data/site";
import { createPageMetadata } from "@/lib/metadata";
import type { WorkProject } from "@/lib/work-project-schema";

export function generateStaticParams() {
  return featuredProjects
    .filter((project) => project.status === "published")
    .map((project) => ({ slug: project.slug }));
}

export function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  return params.then(({ slug }) => {
    const project = featuredProjects.find((item) => item.slug === slug && item.status === "published");

    if (!project) {
      return { title: "Project not found", robots: { index: false, follow: false } };
    }

    return createPageMetadata(project.title, project.summary, `/work/${slug}`);
  });
}

const uxStages: { key: keyof NonNullable<WorkProject["uxDesign"]>; title: string }[] = [
  { key: "discovery", title: "Discovery" },
  { key: "define", title: "Define" },
  { key: "sitemapAndIa", title: "Sitemap & information architecture" },
  { key: "wireframes", title: "Wireframes" },
  { key: "uiDesign", title: "UI design" },
  { key: "designAudit", title: "Design audit" },
  { key: "prototypeTesting", title: "Prototype testing" },
  { key: "developerHandoff", title: "Developer handoff" },
];

const developmentStages: { key: keyof NonNullable<WorkProject["development"]>; title: string }[] = [
  { key: "briefAndScope", title: "Brief & scope" },
  { key: "technicalApproach", title: "Technical approach" },
  { key: "implementation", title: "Implementation" },
  { key: "integrations", title: "Integrations" },
  { key: "qualityAssurance", title: "Quality assurance" },
  { key: "deploymentAndHandoff", title: "Deployment & handoff" },
];

export default async function WorkDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const project = featuredProjects.find((item) => item.slug === slug && item.status === "published");

  if (!project) {
    notFound();
  }

  const uxStory = uxStages.flatMap(({ key, title }, index) => {
    const section = project.uxDesign?.[key];
    return section ? [{ key, title, index, section }] : [];
  });
  const developmentStory = developmentStages.flatMap(({ key, title }, index) => {
    const section = project.development?.[key];
    return section ? [{ key, title, index, section }] : [];
  });

  return (
    <article className="bg-paper">
      <header className="bg-ink px-4 pb-12 pt-10 text-paper sm:px-6 sm:pb-16 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <Link href="/work" className="inline-flex items-center gap-2 text-sm font-medium text-on-dark/75 hover:text-on-dark">
            <ArrowLeft size={16} aria-hidden="true" /> All work
          </Link>
          <div className="mt-10 grid gap-10 lg:grid-cols-[1fr_0.6fr] lg:items-end">
            <div>
              <div className="flex flex-wrap items-center gap-2 text-caption font-medium uppercase tracking-label-wide text-accent">
                <span>{project.projectType}</span>
                <span aria-hidden="true">·</span>
                <span>{project.visibilityLabel}</span>
              </div>
              <h1 className="mt-5 max-w-4xl text-5xl font-semibold leading-display tracking-display sm:text-6xl lg:text-7xl">
                {project.title}
              </h1>
              <p className="mt-6 max-w-3xl text-lg leading-8 text-on-dark/75">{project.summary}</p>
            </div>
            <dl className="grid grid-cols-2 gap-4 border-t border-on-dark/15 pt-5 lg:border-l lg:border-t-0 lg:pl-7 lg:pt-0">
              <div>
                <dt className="text-caption uppercase tracking-label-compact text-on-dark/50">Role</dt>
                <dd className="mt-2 text-sm leading-6">{project.role}</dd>
              </div>
              <div>
                <dt className="text-caption uppercase tracking-label-compact text-on-dark/50">Project context</dt>
                <dd className="mt-2 text-sm leading-6">{project.clientOrContext}</dd>
              </div>
              <div className="col-span-2">
                <dt className="text-caption uppercase tracking-label-compact text-on-dark/50">Scope</dt>
                <dd className="mt-2 flex flex-wrap gap-2">
                  {project.services.map((service) => (
                    <span key={service} className="rounded-full border border-on-dark/20 px-3 py-1.5 text-xs text-on-dark/80">{service}</span>
                  ))}
                </dd>
              </div>
            </dl>
          </div>
        </div>
      </header>

      <div className="mx-auto max-w-7xl px-4 pb-20 sm:px-6 lg:px-8">
        <div className="-mt-2 overflow-hidden rounded-card border border-divider-strong bg-navy shadow-elevated">
          {project.coverMedia ? (
            <div className="relative aspect-[16/8]">
              <Image
                src={project.coverMedia.src}
                alt={project.coverMedia.alt}
                fill
                priority
                unoptimized
                sizes="(max-width: 768px) 100vw, 1200px"
                className="object-cover"
              />
            </div>
          ) : project.slug === "umer-mobile-parts" ? (
            <div className="border-b border-on-dark/10 px-5 py-4 text-on-dark sm:px-8">
              <div className="flex items-center gap-3">
                <span className="flex size-10 items-center justify-center rounded-lg bg-storefront-orange font-bold">U</span>
                <div>
                  <p className="text-sm font-semibold">Umer Mobile Parts</p>
                  <p className="text-micro font-semibold uppercase tracking-label-compact text-storefront-orange-soft">Wholesale & retail</p>
                </div>
                <span className="ml-auto hidden rounded-lg border border-on-dark/15 px-4 py-2 text-xs text-on-dark/55 sm:block">Search parts, brands or mobile models...</span>
                <span className="rounded-lg border border-on-dark/15 px-3 py-2 text-xs text-on-dark/80">Cart</span>
              </div>
              <div className="mt-8 border-t border-on-dark/10 pt-4 text-xs text-on-dark/65">All Categories　 ·　 Home　 ·　 Products　 ·　 Track Order　 ·　 Contact　 ·　 For Retailers</div>
              <div className="relative mt-4 flex min-h-[300px] items-center overflow-hidden rounded-2xl work-artwork-storefront p-6 sm:min-h-[420px] sm:p-12">
                <div className="max-w-3xl">
                  <p className="inline-flex rounded-full border border-on-dark/25 px-3 py-1.5 text-caption font-semibold uppercase tracking-label-tiny text-storefront-orange-pale">Parts of the replacement</p>
                  <p className="mt-7 text-4xl font-bold leading-display-tight tracking-display-tight sm:text-6xl">Your repair starts<br />with the right part.</p>
                  <p className="mt-5 max-w-xl text-sm leading-7 text-on-dark/75 sm:text-base">Explore displays, batteries, charging parts and more. Browse the catalog to find mobile parts for the repair ahead.</p>
                </div>
              </div>
            </div>
          ) : (
            <div className="relative flex min-h-[300px] items-center overflow-hidden px-6 py-10 text-on-dark sm:min-h-[420px] sm:px-12">
              <div aria-hidden="true" className="absolute inset-0 work-artwork-forest" />
              <div className="relative grid w-full gap-8 md:grid-cols-[1fr_0.8fr] md:items-center">
                <div>
                  <p className="inline-flex rounded-full border border-on-dark/25 px-3 py-1.5 text-caption font-semibold uppercase tracking-label-tiny text-accent-highlight">
                    {project.visibilityLabel}
                  </p>
                  <p className="mt-6 text-sm font-medium text-on-dark/65">A local guide for your next free afternoon</p>
                  <p className="mt-3 max-w-2xl text-4xl font-semibold leading-display-tight tracking-display-tight sm:text-6xl">{project.title}</p>
                  <p className="mt-5 max-w-xl text-sm leading-7 text-on-dark/75">
                    A UX concept exploring a more focused way to discover nearby things to do.
                  </p>
                </div>
                <div aria-hidden="true" className="rounded-panel border border-on-dark/15 bg-on-dark/10 p-4 shadow-2xl backdrop-blur-sm sm:p-5">
                  <div className="flex items-center justify-between text-xs text-on-dark/80">
                    <span>Explore nearby</span><span>Today · 2 hours</span>
                  </div>
                  <div className="mt-4 flex gap-2">
                    <span className="rounded-full bg-accent px-3 py-1.5 text-caption font-semibold text-ink">Outdoors</span>
                    <span className="rounded-full border border-on-dark/20 px-3 py-1.5 text-caption text-on-dark/75">Under 5 miles</span>
                  </div>
                  <div className="mt-5 space-y-3">
                    {[
                      ["Riverside path", "Easy walk · 45 min"],
                      ["Weekend makers market", "Local market · 1.5 hours"],
                      ["Garden courtyard", "Quiet spot · 30 min"],
                    ].map(([name, detail], index) => (
                      <div key={name} className="flex items-center gap-3 rounded-2xl border border-on-dark/10 bg-forest-night/80 p-3">
                        <span className={`flex size-10 shrink-0 items-center justify-center rounded-xl text-sm font-semibold ${index === 0 ? "bg-accent text-ink" : "bg-on-dark/10 text-on-dark"}`}>0{index + 1}</span>
                        <span><span className="block text-xs font-semibold text-on-dark">{name}</span><span className="mt-1 block text-caption text-on-dark/60">{detail}</span></span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}
          {project.coverMedia?.caption ? (
            <p className="bg-navy px-5 py-3 text-xs text-on-dark/60">{project.coverMedia.caption}</p>
          ) : null}
        </div>

        <nav aria-label="Case study sections" className="mt-7 flex gap-5 overflow-x-auto border-b border-divider-strong pb-4 text-sm">
          <a href="#brief" className="shrink-0 font-medium text-body-strong hover:text-black">Brief</a>
          <a href="#context" className="shrink-0 font-medium text-body-strong hover:text-black">Context</a>
          {uxStory.length ? <a href="#ux-process" className="shrink-0 font-medium text-body-strong hover:text-black">UX process</a> : null}
          {developmentStory.length ? <a href="#development" className="shrink-0 font-medium text-body-strong hover:text-black">Development</a> : null}
          {project.observedJourneys.length ? <a href="#journey" className="shrink-0 font-medium text-body-strong hover:text-black">Product journey</a> : null}
          {project.gallery.length ? <a href="#gallery" className="shrink-0 font-medium text-body-strong hover:text-black">Gallery</a> : null}
        </nav>

        <section id="brief" className="grid scroll-mt-24 gap-8 py-14 md:grid-cols-[0.65fr_1fr]">
          <div>
            <p className="text-xs font-medium uppercase tracking-label-wide text-muted">01 · The brief</p>
            <h2 className="mt-3 text-3xl font-semibold tracking-display-tight text-ink">What this project set out to do</h2>
          </div>
          <div>
            <p className="text-lg leading-8 text-body-strong">{project.objective}</p>
            <p className="mt-5 rounded-2xl border border-success-line bg-success-soft px-5 py-4 text-sm leading-7 text-success-deep">
              {project.evidenceNote}
            </p>
          </div>
        </section>

        <section id="context" className="grid scroll-mt-24 gap-8 border-t border-divider-strong py-14 md:grid-cols-[0.65fr_1fr]">
          <div>
            <p className="text-xs font-medium uppercase tracking-label-wide text-muted">02 · Context & challenge</p>
            <h2 className="mt-3 text-3xl font-semibold tracking-display-tight text-ink">The problem space</h2>
          </div>
          <div className="grid gap-5 sm:grid-cols-2">
            <div className="rounded-control bg-on-dark p-5">
              <h3 className="text-sm font-semibold text-ink">Context</h3>
              <p className="mt-3 text-sm leading-7 text-body">{project.context}</p>
            </div>
            <div className="rounded-control bg-on-dark p-5">
              <h3 className="text-sm font-semibold text-ink">Challenge</h3>
              <p className="mt-3 text-sm leading-7 text-body">{project.challenge}</p>
            </div>
          </div>
        </section>

        {uxStory.length ? (
          <section id="ux-process" className="scroll-mt-24 border-t border-divider-strong py-14">
            <p className="text-xs font-medium uppercase tracking-label-wide text-muted">03 · UX design process</p>
            <h2 className="mt-3 max-w-3xl text-3xl font-semibold tracking-display-tight text-ink">From discovery to a handoff the team can use.</h2>
            <div className="mt-8 space-y-4">
              {uxStory.map(({ key, title, index, section }) => (
                <CaseStudyStage key={key} index={index} title={title} section={section} />
              ))}
            </div>
          </section>
        ) : null}

        {developmentStory.length ? (
          <section id="development" className="scroll-mt-24 border-t border-divider-strong py-14">
            <p className="text-xs font-medium uppercase tracking-label-wide text-muted">
              {uxStory.length ? "04" : "03"} · Development
            </p>
            <h2 className="mt-3 max-w-3xl text-3xl font-semibold tracking-display-tight text-ink">What was built and what can be verified.</h2>
            <div className="mt-8 space-y-4">
              {developmentStory.map(({ key, title, section }, index) => (
                <CaseStudyStage key={key} index={index} title={title} section={section} />
              ))}
            </div>
          </section>
        ) : null}

        {project.observedJourneys.length ? (
          <section id="journey" className="scroll-mt-24 border-t border-divider-strong py-14">
            <p className="text-xs font-medium uppercase tracking-label-wide text-muted">
              {uxStory.length || developmentStory.length ? "05" : "03"} · Public experience
            </p>
            <h2 className="mt-3 max-w-3xl text-3xl font-semibold tracking-display-tight text-ink">The product journey, as visitors can use it</h2>
            <p className="mt-4 max-w-3xl text-sm leading-7 text-body-muted">
              {project.visibilityLabel.toLowerCase().includes("concept")
                ? "These are proposed paths in a fictional concept, not a live product or validated flow."
                : "These are paths visible in the public product, not claims about research or testing performed."}
            </p>
            <ol className="mt-7 grid gap-4 md:grid-cols-3">
              {project.observedJourneys.map((journey, index) => (
                <li key={journey} className="rounded-control bg-on-dark p-5">
                  <p className="text-xs font-semibold uppercase tracking-label-tight text-accent-mid">Step 0{index + 1}</p>
                  <p className="mt-3 text-base leading-7 text-ink">{journey}</p>
                </li>
              ))}
            </ol>
          </section>
        ) : null}

        {project.visibleExperienceChoices.length ? (
          <section className="grid gap-8 border-t border-divider-strong py-14 md:grid-cols-[0.65fr_1fr]">
            <div>
              <p className="text-xs font-medium uppercase tracking-label-wide text-muted">Experience review</p>
              <h2 className="mt-3 text-3xl font-semibold tracking-display-tight text-ink">Details visible in the experience</h2>
              <p className="mt-4 text-sm leading-7 text-body-muted">
                {project.visibilityLabel.toLowerCase().includes("concept")
                  ? "Proposed directions for this fictional concept—not observed behavior in a live product."
                  : "Observable interface and content choices, described without implying undocumented research or design decisions."}
              </p>
            </div>
            <ul className="space-y-3">
              {project.visibleExperienceChoices.map((choice) => (
                <li key={choice} className="flex gap-3 rounded-xl bg-on-dark p-4 text-sm leading-6 text-body-strong">
                  <Check size={17} aria-hidden="true" className="mt-0.5 shrink-0 text-accent-deep" />
                  {choice}
                </li>
              ))}
            </ul>
          </section>
        ) : null}

        {project.gallery.length ? (
          <section id="gallery" className="scroll-mt-24 border-t border-divider-strong py-14">
            <p className="text-xs font-medium uppercase tracking-label-wide text-muted">Selected artefacts</p>
            <h2 className="mt-3 text-3xl font-semibold tracking-display-tight text-ink">Screens, flows, and project detail</h2>
            <div className="mt-7 grid gap-5 md:grid-cols-2">
              {project.gallery.map((media) => (
                <figure key={media.src} className="overflow-hidden rounded-control bg-on-dark">
                  <div className="relative aspect-[4/3]">
                    <Image src={media.src} alt={media.alt} fill unoptimized sizes="(max-width: 768px) 100vw, 50vw" className="object-cover" />
                  </div>
                  {media.caption ? <figcaption className="px-4 py-3 text-sm text-body-muted">{media.caption}</figcaption> : null}
                </figure>
              ))}
            </div>
          </section>
        ) : null}

        <section className="grid gap-8 border-t border-divider-strong py-14 md:grid-cols-[0.65fr_1fr]">
          <div>
            <p className="text-xs font-medium uppercase tracking-label-wide text-muted">Evidence & outcome</p>
            <h2 className="mt-3 text-3xl font-semibold tracking-display-tight text-ink">What we can stand behind</h2>
          </div>
          <div>
            {project.verifiedOutcomes.length ? (
              <ul className="space-y-3">
                {project.verifiedOutcomes.map((outcome) => (
                  <li key={outcome} className="flex gap-3 rounded-xl bg-on-dark p-4 text-sm leading-6 text-body-strong">
                    <Check size={17} aria-hidden="true" className="mt-0.5 shrink-0 text-accent-deep" />
                    {outcome}
                  </li>
                ))}
              </ul>
            ) : (
              <p className="rounded-2xl bg-on-dark p-5 text-sm leading-7 text-body">
                No measured business or user outcomes are published for this project. The case study focuses on the live scope and features that can be inspected.
              </p>
            )}
          </div>
        </section>

        <footer className="mt-4 flex flex-col gap-5 rounded-soft bg-ink p-6 text-paper sm:flex-row sm:items-center sm:justify-between sm:p-8">
          {project.liveUrl ? (
            <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center gap-2 rounded-full bg-accent px-5 py-3 text-sm font-medium text-ink hover:bg-accent-bright">
              Visit the live project <ArrowUpRight size={16} />
            </a>
          ) : <span />}
          <Link href={`/contact?intent=project&project=${project.slug}`} className="inline-flex items-center justify-center gap-2 rounded-full border border-on-dark/25 px-5 py-3 text-sm font-medium text-on-dark hover:border-on-dark/60">
            Discuss a similar project <ArrowRight size={16} />
          </Link>
        </footer>
      </div>
    </article>
  );
}

type CaseStudyBlock = NonNullable<NonNullable<WorkProject["uxDesign"]>["discovery"]>;

function CaseStudyStage({ index, title, section }: { index: number; title: string; section: CaseStudyBlock }) {
  return (
    <article className="grid gap-4 rounded-control border border-divider bg-on-dark p-5 sm:grid-cols-[3rem_1fr] sm:gap-6 sm:p-7">
      <p className="text-sm font-semibold text-accent-mid">0{index + 1}</p>
      <div>
        <h3 className="text-xl font-semibold tracking-display-tight text-ink">{title}</h3>
        {section.summary ? <p className="mt-3 text-sm leading-7 text-body">{section.summary}</p> : null}
        {section.points?.length ? (
          <ul className="mt-4 grid gap-2 sm:grid-cols-2">
            {section.points.map((point) => (
              <li key={point} className="flex gap-2 text-sm leading-6 text-body">
                <Check size={15} aria-hidden="true" className="mt-1 shrink-0 text-accent-deep" />
                {point}
              </li>
            ))}
          </ul>
        ) : null}
        {section.media?.length ? (
          <div className="mt-5 grid gap-4 sm:grid-cols-2">
            {section.media.map((media) => (
              <figure key={media.src} className="overflow-hidden rounded-xl bg-paper">
                <div className="relative aspect-[4/3]">
                  <Image src={media.src} alt={media.alt} fill unoptimized sizes="(max-width: 640px) 100vw, 50vw" className="object-cover" />
                </div>
                {media.caption ? <figcaption className="px-3 py-2 text-xs text-body-muted">{media.caption}</figcaption> : null}
              </figure>
            ))}
          </div>
        ) : null}
      </div>
    </article>
  );
}
