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
      <div className="rounded-display border border-divider bg-on-dark p-6 shadow-compact md:p-10">
        <p className="text-xs uppercase tracking-label text-muted">{service.eyebrow}</p>
        <h1 className="mt-4 text-4xl tracking-display-wide text-ink md:text-6xl">{service.title}</h1>
        <p className="mt-5 max-w-3xl text-lg leading-8 text-body">{service.description}</p>

        <div className="mt-8 grid gap-6 md:grid-cols-3">
          <div className="rounded-panel border border-divider bg-paper p-5">
            <h3 className="text-lg text-ink">Target audience</h3>
            <p className="mt-3 text-sm leading-7 text-body">{service.audience}</p>
          </div>
          <div className="rounded-panel border border-divider bg-paper p-5">
            <h3 className="text-lg text-ink">Problems solved</h3>
            <ul className="mt-3 space-y-2 text-sm leading-7 text-body">
              {service.problems.map((item) => (
                <li key={item}>• {item}</li>
              ))}
            </ul>
          </div>
          <div className="rounded-panel border border-divider bg-paper p-5">
            <h3 className="text-lg text-ink">Deliverables</h3>
            <ul className="mt-3 space-y-2 text-sm leading-7 text-body">
              {service.deliverables.map((item) => (
                <li key={item}>• {item}</li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-12 grid gap-6 md:grid-cols-2">
          <div className="rounded-panel border border-divider bg-ink p-6 text-paper">
            <h3 className="text-2xl tracking-display-tight">Process</h3>
            <div className="mt-6 space-y-5">
              {service.process.map((step) => (
                <div key={step.title}>
                  <p className="text-sm uppercase tracking-label-wide text-accent">{step.title}</p>
                  <p className="mt-2 text-sm leading-7 text-divider-soft">{step.text}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-panel border border-divider bg-paper p-6">
            <h3 className="text-2xl tracking-display-tight text-ink">Related live project</h3>
            {relevantProjects.length > 0 ? (
              <ul className="mt-6 space-y-4 text-sm leading-7 text-body">
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
              <p className="mt-6 text-sm leading-7 text-body">
                No related concepts are published yet. Contact us to discuss this service.
              </p>
            )}
            <Link href="/work" className="mt-8 inline-flex items-center gap-2 text-sm font-medium text-ink">
              Explore all concepts <ArrowRight size={16} />
            </Link>
          </div>
        </div>

        <div className="mt-12 rounded-panel bg-accent-soft p-6 md:p-8">
          <h3 className="text-2xl tracking-display-tight text-ink">Ready to scope this work?</h3>
          <Link href={`/contact?intent=service&service=${service.slug}`} className="mt-5 inline-flex items-center gap-2 rounded-full bg-ink px-5 py-3 text-sm font-medium text-paper">
            Enquire about this service <ArrowRight size={16} />
          </Link>
        </div>
      </div>
    </div>
  );
}
