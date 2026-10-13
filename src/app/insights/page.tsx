import Link from "next/link";
import { insights } from "@/data/site";
import { SectionHeading } from "@/components/ui/section-heading";
import { createPageMetadata } from "@/lib/metadata";

export const metadata = createPageMetadata(
  "Insights",
  "Practical articles on digital design, product decisions, user experience and building useful websites.",
  "/insights",
);

export default function InsightsPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-8">
      <SectionHeading
        eyebrow="Insights"
        title="Practical notes on design, product decisions, and digital clarity."
        description="Short, distinct perspectives on reducing user friction, communicating an offer, and deciding what an MVP needs to test."
        level="h1"
      />

      <div className="mt-12 space-y-6">
        {insights.map((item) => (
          <Link key={item.slug} href={`/insights/${item.slug}`} className="block rounded-[24px] border border-black/5 bg-white p-6 shadow-[0_12px_25px_rgba(23,25,22,0.04)]">
            <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
              <div>
                <p className="text-xs uppercase tracking-[0.2em] text-[#73776D]">{item.category}</p>
                <h2 className="mt-3 text-2xl tracking-[-0.06em] text-[#171916]">{item.title}</h2>
              </div>
              <p className="text-sm text-[#4f544d]">{item.readTime}</p>
            </div>
            <p className="mt-4 text-base leading-8 text-[#4f544d]">{item.excerpt}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
