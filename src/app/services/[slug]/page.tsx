import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { notFound } from "next/navigation";
import { featuredProjects, services } from "@/data/site";
import { createPageMetadata } from "@/lib/metadata";

export function generateStaticParams() {
  return services.map((service) => ({ slug: service.slug }));
}

export function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  return params.then(({ slug }) => {
    const service = services.find((item) => item.slug === slug);

    if (!service) {
      return { title: "Service not found", robots: { index: false, follow: false } };
    }

    return createPageMetadata(service.title, service.short, `/services/${slug}`);
  });
}

export default async function ServiceDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const service = services.find((item) => item.slug === slug);

  if (!service) {
    notFound();
  }

  const relevantProjects = featuredProjects.filter((project) =>
    project.services.includes(service.title),
  );

  return (
    <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-8">
      <div className="rounded-[32px] border border-black/5 bg-white p-6 shadow-[0_18px_40px_rgba(23,25,22,0.04)] md:p-10">
        <p className="text-xs uppercase tracking-[0.2em] text-[#73776D]">{service.eyebrow}</p>
        <h1 className="mt-4 text-4xl tracking-[-0.07em] text-[#171916] md:text-6xl">{service.title}</h1>
        <p className="mt-5 max-w-3xl text-lg leading-8 text-[#4f544d]">{service.description}</p>

        <div className="mt-8 grid gap-6 md:grid-cols-3">
          <div className="rounded-[24px] border border-black/5 bg-[#F5F5EF] p-5">
            <h3 className="text-lg text-[#171916]">Target audience</h3>
            <p className="mt-3 text-sm leading-7 text-[#4f544d]">{service.audience}</p>
          </div>
          <div className="rounded-[24px] border border-black/5 bg-[#F5F5EF] p-5">
            <h3 className="text-lg text-[#171916]">Problems solved</h3>
            <ul className="mt-3 space-y-2 text-sm leading-7 text-[#4f544d]">
              {service.problems.map((item) => (
                <li key={item}>• {item}</li>
              ))}
            </ul>
          </div>
          <div className="rounded-[24px] border border-black/5 bg-[#F5F5EF] p-5">
            <h3 className="text-lg text-[#171916]">Deliverables</h3>
            <ul className="mt-3 space-y-2 text-sm leading-7 text-[#4f544d]">
              {service.deliverables.map((item) => (
                <li key={item}>• {item}</li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-12 grid gap-6 md:grid-cols-2">
          <div className="rounded-[24px] border border-black/5 bg-[#171916] p-6 text-[#F5F5EF]">
            <h3 className="text-2xl tracking-[-0.05em]">Process</h3>
            <div className="mt-6 space-y-5">
              {service.process.map((step) => (
                <div key={step.title}>
                  <p className="text-sm uppercase tracking-[0.18em] text-[#B6E76A]">{step.title}</p>
                  <p className="mt-2 text-sm leading-7 text-[#e5e7e0]">{step.text}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-[24px] border border-black/5 bg-[#F5F5EF] p-6">
            <h3 className="text-2xl tracking-[-0.05em] text-[#171916]">Related live project</h3>
            {relevantProjects.length > 0 ? (
              <ul className="mt-6 space-y-4 text-sm leading-7 text-[#4f544d]">
                {relevantProjects.map((project) => (
                  <li key={project.slug}>
                    <Link className="underline decoration-black/20 underline-offset-4 hover:decoration-black" href={`/work/${project.slug}`}>
                      {project.title}
                    </Link>
                    <span className="block">{project.summary}</span>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="mt-6 text-sm leading-7 text-[#4f544d]">
                No related concepts are published yet. Contact us to discuss this service.
              </p>
            )}
            <Link href="/work" className="mt-8 inline-flex items-center gap-2 text-sm font-medium text-[#171916]">
              Explore all concepts <ArrowRight size={16} />
            </Link>
          </div>
        </div>

        <div className="mt-12 rounded-[24px] bg-[#EAF3C9] p-6 md:p-8">
          <h3 className="text-2xl tracking-[-0.05em] text-[#171916]">Ready to scope this work?</h3>
          <Link href="/discovery" className="mt-5 inline-flex items-center gap-2 rounded-full bg-[#171916] px-5 py-3 text-sm font-medium text-[#F5F5EF]">
            Discuss your project <ArrowRight size={16} />
          </Link>
        </div>
      </div>
    </div>
  );
}
