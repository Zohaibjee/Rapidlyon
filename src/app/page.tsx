import Link from "next/link";
import type { Metadata } from "next";
import { ArrowRight, ArrowUpRight, CircleHelp, GitBranch, Lightbulb, ShieldCheck, Smartphone } from "lucide-react";
import { faqs, featuredProjects, principles } from "@/data/site";
import { SectionHeading } from "@/components/ui/section-heading";
import { createPageMetadata } from "@/lib/metadata";

export const metadata: Metadata = createPageMetadata(
  "Digital design and development",
  "Rapidlyon designs clear digital experiences and builds modern websites and products for ambitious teams.",
  "/",
);

const studioPrinciples = [
  { icon: Lightbulb, title: "Clarity before complexity", detail: "Start with the user’s real task" },
  { icon: GitBranch, title: "Design meets engineering", detail: "One connected delivery team" },
  { icon: Smartphone, title: "Responsive by design", detail: "Made for every screen size" },
  { icon: ShieldCheck, title: "Straightforward process", detail: "Clear scope and next steps" },
];

export default function HomePage() {
  return (
    <div className="bg-[#F5F5EF]">
      <section className="overflow-hidden bg-[#171916] text-[#F5F5EF]">
        <div className="mx-auto max-w-7xl px-4 pb-16 pt-16 sm:px-6 sm:pb-20 sm:pt-20 lg:px-8 lg:pt-24">
          <p className="mb-7 text-xs font-medium uppercase tracking-[0.22em] text-[#B6E76A]">
            Independent digital design & development studio
          </p>
          <h1 className="max-w-full text-[clamp(3.25rem,8.5vw,7.5rem)] font-semibold leading-[0.98] tracking-[-0.045em]">
            Digital products, designed with purpose. Built for impact.
          </h1>
          <p className="mt-8 max-w-4xl text-lg leading-8 text-white/75 sm:text-xl sm:leading-9">
            UX/UI design and modern web development for teams turning ambitious ideas into useful digital products.
          </p>
          <div className="mt-9 flex flex-col gap-4 sm:flex-row">
            <Link
              href="/discovery"
              className="inline-flex items-center justify-center gap-2 rounded-full bg-[#B6E76A] px-6 py-3.5 text-sm font-semibold text-[#171916] transition hover:bg-[#c7ef8e]"
            >
              Discuss your project <ArrowRight size={16} />
            </Link>
            <Link
              href="/work"
              className="inline-flex items-center justify-center gap-2 rounded-full border border-white/20 px-6 py-3.5 text-sm font-medium text-white transition hover:border-white/50"
            >
              Explore our work <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>

      <section aria-label="How we work" className="border-b border-black/10 bg-white">
        <div className="mx-auto grid max-w-7xl divide-y divide-black/10 px-4 sm:px-6 md:grid-cols-2 md:divide-x md:divide-y-0 lg:grid-cols-4 lg:px-8">
          {studioPrinciples.map((feature) => {
            const Icon = feature.icon;

            return (
              <div key={feature.title} className="flex items-center gap-4 py-5 md:px-5 lg:px-6">
                <span className="flex size-11 shrink-0 items-center justify-center rounded-full bg-[#EAF3C9] text-[#171916]">
                  <Icon aria-hidden="true" size={20} strokeWidth={1.75} />
                </span>
                <div>
                  <h2 className="text-sm font-semibold text-[#171916]">{feature.title}</h2>
                  <p className="mt-1 text-xs leading-5 text-[#62665e]">{feature.detail}</p>
                </div>
              </div>
            );
          })}
        </div>
      </section>


      <section className="border-y border-black/5 bg-[#171916] py-20 text-[#F5F5EF]">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow="Design × engineering"
            title="Strategy, interface design, and build working in one rhythm."
            description="The final experience is stronger when product thinking and implementation move together from the first decision."
            tone="dark"
          />

          <div className="mt-10 grid gap-5 md:grid-cols-4">
            {[
              { label: "Discover", text: "User problems, business context, and opportunities are mapped before a screen gets designed." },
              { label: "Design", text: "We shape flows, systems, and interfaces so the experience feels intuitive and intentional." },
              { label: "Build", text: "We turn the approved interface into a responsive, accessible, maintainable website or product." },
              { label: "Launch", text: "We refine final quality and support a clean handoff for real-world use." },
            ].map((step, index) => (
              <div key={step.label} className="rounded-[24px] border border-white/10 bg-white/5 p-5">
                <div className="mb-6 flex items-center justify-between text-xs uppercase tracking-[0.18em] text-[#B6E76A]">
                  <span>0{index + 1}</span>
                  <span>{step.label}</span>
                </div>
                <p className="text-base leading-7 text-[#e9ece5]">{step.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="border-b border-black/5 bg-[#171916] px-4 py-8 text-center sm:px-6 lg:px-8">
        <Link href="/process" className="inline-flex items-center gap-2 text-sm font-medium text-[#B6E76A] hover:text-white">
          See the full project process <ArrowRight size={16} />
        </Link>
      </section>

      <section className="bg-white py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow="Working principles"
            title="We build with clarity, not noise."
            description="The studio works best when strategy, design, and engineering stay in conversation rather than in separate silos."
          />

          <div className="mt-10 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {principles.map((principle, index) => (
              <div key={principle} className="rounded-[24px] border border-black/5 bg-[#F5F5EF] p-6">
                <div className="mb-5 inline-flex h-9 w-9 items-center justify-center rounded-full bg-[#B6E76A] text-sm font-semibold text-[#171916]">
                  {index + 1}
                </div>
                <p className="text-lg leading-8 text-[#171916]">{principle}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

 <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Live project"
          title="A real storefront, built for real product discovery."
          description="Explore a live personal project for a mobile-parts retailer. The details describe what is visible on the site; no sales or performance results are claimed."
          level="h2"
        />

        <div className="mt-10 grid max-w-5xl gap-6">
          {featuredProjects.map((project) => (
            <Link
              key={project.slug}
              href={`/work/${project.slug}`}
              className="group overflow-hidden rounded-[28px] border border-black/5 bg-white p-5 shadow-[0_12px_30px_rgba(23,25,22,0.04)] transition hover:-translate-y-1 hover:shadow-[0_20px_45px_rgba(23,25,22,0.08)]"
            >
              <div className="mb-6 flex items-center justify-between text-xs uppercase tracking-[0.16em] text-[#73776D]">
                <span>{project.type}</span>
                <span>{project.label}</span>
              </div>
              <div className="mb-4 flex min-h-56 flex-col justify-between rounded-[22px] bg-[#171916] p-6 text-[#F5F5EF]">
                <div className="flex h-full flex-col justify-between">
                  <div className="flex items-center justify-between text-[10px] uppercase tracking-[0.2em] text-white/75">
                    <span>Live storefront</span>
                    <ArrowUpRight size={14} />
                  </div>
                  <div>
                    <p className="text-2xl font-semibold tracking-tight">Umer Mobile Parts</p>
                    <p className="mt-2 text-sm text-white/70">Wholesale & retail · mobile spare parts</p>
                    <div className="mt-5 flex flex-wrap gap-2">
                      {["Displays", "Batteries", "Charging parts"].map((category) => (
                        <span key={category} className="rounded-full border border-white/20 px-3 py-1.5 text-xs text-white/85">
                          {category}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
              <div className="space-y-4">
                <div>
                  <h3 className="text-2xl tracking-[-0.06em] text-[#171916]">{project.title}</h3>
                  <p className="mt-3 text-sm leading-7 text-[#4f544d]">{project.summary}</p>
                </div>
                <div className="flex flex-wrap gap-2">
                  {project.services.map((service) => (
                    <span key={service} className="rounded-full border border-black/10 bg-[#F5F5EF] px-2.5 py-1 text-[10px] uppercase tracking-[0.12em] text-[#171916]">
                      {service}
                    </span>
                  ))}
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="FAQ preview"
          title="Common questions before the first conversation."
        />

        <div className="mt-10 space-y-4">
          {faqs.slice(0, 4).map((item) => (
            <div key={item.question} className="rounded-[24px] border border-black/5 bg-white p-5">
              <div className="flex items-start justify-between gap-4">
                <h3 className="text-lg font-medium text-[#171916]">{item.question}</h3>
                <div className="rounded-full border border-black/10 p-1 text-[#171916]" aria-hidden="true">
                  <CircleHelp size={14} />
                </div>
                <div className="mt-6">
                  <Link href="/faq" className="inline-flex items-center gap-2 text-sm font-semibold text-[#171916] underline decoration-black/20 underline-offset-4 hover:decoration-black">
                    View all FAQs <ArrowRight size={16} />
                  </Link>
                </div>
              </div>
              <p className="mt-3 text-sm leading-7 text-[#4f544d]">{item.answer}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 pb-24 sm:px-6 lg:px-8">
        <div className="rounded-[32px] border border-black/5 bg-[#EAF3C9] p-8 sm:p-10 lg:p-14">
          <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <p className="text-xs font-medium uppercase tracking-[0.2em] text-[#171916]">Let’s build something useful</p>
              <h2 className="mt-4 text-4xl tracking-[-0.07em] text-[#171916] md:text-6xl">Have an idea worth building?</h2>
            </div>
            <Link
              href="/discovery"
              className="inline-flex items-center justify-center gap-2 rounded-full bg-[#171916] px-6 py-3.5 text-sm font-medium text-[#F5F5EF] transition hover:bg-[#2a2d27]"
            >
              Discuss your project <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
