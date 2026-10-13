import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { SectionHeading } from "@/components/ui/section-heading";
import { services } from "@/data/site";
import { createPageMetadata } from "@/lib/metadata";

export const metadata = createPageMetadata(
  "Digital design and development services",
  "UX/UI design, web development, Next.js builds, product strategy and website redesign support from Rapidlyon.",
  "/services",
);

export default function ServicesPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
      <SectionHeading
        eyebrow="Services"
        title="Design, build, and product clarity for the work that matters."
        description="We help teams shape the right experience and turn it into a polished, maintainable digital product."
        level="h1"
      />

      <div className="mt-12 grid gap-6 lg:grid-cols-2">
        {services.map((service) => (
          <Link
            key={service.slug}
            href={`/services/${service.slug}`}
            className="group rounded-[28px] border border-black/5 bg-white p-6 shadow-[0_18px_40px_rgba(23,25,22,0.04)] transition hover:-translate-y-1"
          >
            <div className="flex items-center justify-between gap-6">
              <p className="text-xs uppercase tracking-[0.2em] text-[#73776D]">{service.eyebrow}</p>
              <ArrowUpRight size={18} className="transition group-hover:translate-x-1 group-hover:-translate-y-1" />
            </div>
            <h2 className="mt-5 text-3xl tracking-[-0.06em] text-[#171916]">{service.title}</h2>
            <p className="mt-4 text-sm leading-7 text-[#4f544d]">{service.description}</p>
            <div className="mt-6 flex flex-wrap gap-2">
              {service.deliverables.slice(0, 3).map((item) => (
                <span key={item} className="rounded-full border border-black/10 bg-[#F5F5EF] px-2.5 py-1 text-[10px] uppercase tracking-[0.12em] text-[#171916]">
                  {item}
                </span>
              ))}
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
