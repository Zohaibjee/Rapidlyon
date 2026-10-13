import { SectionHeading } from "@/components/ui/section-heading";
import { faqs } from "@/data/site";
import { createPageMetadata } from "@/lib/metadata";

export const metadata = createPageMetadata(
  "Frequently asked questions",
  "Answers about Rapidlyon project engagements, timelines, collaboration and design and development services.",
  "/faq",
);

export default function FaqPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-16 sm:px-6 lg:px-8">
      <SectionHeading
        eyebrow="FAQ"
        title="Answers to the most common questions."
        level="h1"
      />

      <div className="mt-10 space-y-4">
        {faqs.map((item) => (
          <div key={item.question} className="rounded-[24px] border border-black/5 bg-white p-6">
            <h2 className="text-xl tracking-[-0.05em] text-[#171916]">{item.question}</h2>
            <p className="mt-3 text-base leading-8 text-[#4f544d]">{item.answer}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
