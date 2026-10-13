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
          <div key={step.title} className="rounded-[24px] border border-black/5 bg-white p-6 shadow-[0_12px_28px_rgba(23,25,22,0.04)]">
            <div className="mb-6 flex items-center justify-between text-[10px] uppercase tracking-[0.2em] text-[#73776D]">
              <span>0{index + 1}</span>
              <span className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-[#EAF3C9] text-[#171916]">
                <ProcessStepIcon title={step.title} />
              </span>
            </div>
            <h2 className="text-2xl tracking-[-0.06em] text-[#171916]">{step.title}</h2>
            <p className="mt-4 text-sm leading-7 text-[#4f544d]">{step.text}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
