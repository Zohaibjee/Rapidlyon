import { SectionHeading } from "@/components/ui/section-heading";
import { ProcessStepIcon } from "@/components/ui/process-step-icon";
import { processSteps } from "@/data/site";
import { createPageMetadata } from "@/lib/metadata";

export const metadata = createPageMetadata(
  "Process",
  "See how Rapidlyon moves from discovery and planning through design, development, quality review and launch.",
  "/process",
);

export default function ProcessPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-8">
      <SectionHeading
        eyebrow="Process"
        title="A calm, structured path from idea to launch."
        description="We make the process visible so the work feels collaborative, realistic, and aligned with real product needs."
        level="h1"
      />

      <div className="mt-12 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        {processSteps.map((step, index) => (
          <div key={step.title} className="rounded-panel border border-divider bg-on-dark p-6 shadow-soft-raised">
            <div className="mb-6 flex items-center justify-between text-caption uppercase tracking-label text-muted">
              <span>0{index + 1}</span>
              <span className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-accent-soft text-ink">
                <ProcessStepIcon title={step.title} />
              </span>
            </div>
            <h2 className="text-2xl tracking-display text-ink">{step.title}</h2>
            <p className="mt-4 text-sm leading-7 text-body">{step.text}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
