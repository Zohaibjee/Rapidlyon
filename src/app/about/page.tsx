import Link from "next/link";
import { SectionHeading } from "@/components/ui/section-heading";
import { principles } from "@/data/site";
import { createPageMetadata } from "@/lib/metadata";

export const metadata = createPageMetadata(
  "About",
  "Learn how Rapidlyon brings product thinking, UX/UI design and modern web development together for ambitious teams.",
  "/about",
);

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-8">
      <SectionHeading
        eyebrow="About"
        title="We build digital experiences with a clear point of view."
        description="Rapidlyon exists to help ambitious ideas become usable, confident, and well-crafted products."
        level="h1"
      />

      <div className="mt-12 grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
        <div className="rounded-card border border-divider bg-on-dark p-8">
          <p className="text-lg leading-8 text-body">
            Rapidlyon brings UX/UI design, product thinking and web engineering into one connected engagement. We work with founders and teams to clarify the problem, shape a useful experience, and build a product or website that is ready to evolve.
          </p>
          <p className="mt-6 text-lg leading-8 text-body">
            The work is a fit when there is a meaningful digital challenge: a product journey that needs clarity, a new idea that needs a focused first version, or a website that no longer reflects the business.
          </p>
        </div>

        <div className="rounded-card border border-divider bg-ink p-8 text-paper">
          <p className="text-xs uppercase tracking-label text-accent">Working philosophy</p>
          <p className="mt-5 text-xl leading-9 text-paper-alt">
            We care more about what people understand and do than how flashy the interface looks in isolation.
          </p>
        </div>
      </div>

      <div className="mt-16">
        <SectionHeading title="Guiding principles" />
        <div className="mt-8 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {principles.map((principle, index) => (
            <div key={principle} className="rounded-panel border border-divider bg-on-dark p-6">
              <div className="mb-5 inline-flex h-9 w-9 items-center justify-center rounded-full bg-accent text-sm font-semibold text-ink">
                {index + 1}
              </div>
              <p className="text-lg leading-8 text-ink">{principle}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-16 rounded-card bg-accent-soft p-8 sm:p-10">
        <h2 className="text-3xl font-semibold tracking-display-tight text-ink">A practical starting point</h2>
        <p className="mt-4 max-w-3xl text-base leading-7 text-body">
          Share the challenge, what you already know, and what is still uncertain. We will review the context and suggest a sensible next conversation; an inquiry is not a commitment to start a project.
        </p>
        <Link href="/contact?intent=conversation" className="mt-6 inline-flex rounded-full bg-ink px-5 py-3 text-sm font-medium text-paper">
          Choose how to connect
        </Link>
      </div>
    </div>
  );
}
