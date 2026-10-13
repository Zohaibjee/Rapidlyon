import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowUpRight } from "lucide-react";
import { featuredProjects } from "@/data/site";
import { createPageMetadata } from "@/lib/metadata";

export function generateStaticParams() {
  return featuredProjects.map((project) => ({ slug: project.slug }));
}

export function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  return params.then(({ slug }) => {
    const project = featuredProjects.find((item) => item.slug === slug);

    if (!project) {
      return { title: "Project not found", robots: { index: false, follow: false } };
    }

    return createPageMetadata(project.title, project.summary, `/work/${slug}`);
  });
}

export default async function WorkDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const project = featuredProjects.find((item) => item.slug === slug);

  if (!project) {
    notFound();
  }

  return (
    <div className="mx-auto max-w-5xl px-4 py-16 sm:px-6 lg:px-8">
      <Link href="/work" className="inline-flex items-center gap-2 text-sm font-medium text-[#171916]">
        ← Back to work
      </Link>

      <div className="mt-8 rounded-[28px] border border-black/5 bg-white p-6 shadow-[0_18px_40px_rgba(23,25,22,0.04)] md:p-10">
        <div className="mb-6 flex flex-wrap items-center gap-3 text-[10px] uppercase tracking-[0.18em] text-[#73776D]">
          <span>{project.type}</span>
          <span className="inline-flex rounded-full border border-black/10 px-2.5 py-1 text-[#171916]">{project.label}</span>
        </div>

        <h1 className="text-4xl tracking-[-0.07em] text-[#171916] md:text-6xl">{project.title}</h1>
        <p className="mt-5 max-w-2xl text-lg leading-8 text-[#4f544d]">{project.summary}</p>
        <p className="mt-4 rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm leading-6 text-emerald-900">
          Live personal project. This overview describes features visible on the public storefront; no sales, conversion, or performance results are claimed.
        </p>

        <div className="mt-8 grid gap-6 rounded-[24px] bg-[radial-gradient(circle_at_top,_rgba(182,231,106,0.5),_rgba(23,25,22,0.95)_50%,_rgba(23,25,22,1)_100%)] p-6 text-[#F5F5EF] md:grid-cols-2">
          <div>
            <p className="text-[10px] uppercase tracking-[0.2em] text-white/70">Role</p>
            <p className="mt-2 text-base">{project.role}</p>
          </div>
          <div>
            <p className="text-[10px] uppercase tracking-[0.2em] text-white/70">Services</p>
            <p className="mt-2 text-base">{project.services.join(" • ")}</p>
          </div>
        </div>

        <div className="mt-10 grid gap-8 md:grid-cols-2">
          <div>
            <h2 className="text-2xl tracking-[-0.05em] text-[#171916]">Store purpose</h2>
            <p className="mt-4 text-base leading-8 text-[#4f544d]">{project.objective}</p>
          </div>
          <div>
            <h2 className="text-2xl tracking-[-0.05em] text-[#171916]">Store scope</h2>
            <p className="mt-4 text-base leading-8 text-[#4f544d]">{project.problem}</p>
          </div>
        </div>

        <div className="mt-12 grid gap-8 md:grid-cols-3">
          <div className="rounded-[24px] border border-black/5 bg-[#F5F5EF] p-5">
            <h3 className="text-lg text-[#171916]">Product discovery</h3>
            <ul className="mt-4 space-y-3 text-sm leading-7 text-[#4f544d]">
              {project.process.map((item) => (
                <li key={item}>• {item}</li>
              ))}
            </ul>
          </div>
          <div className="rounded-[24px] border border-black/5 bg-[#F5F5EF] p-5">
            <h3 className="text-lg text-[#171916]">Catalog structure</h3>
            <ul className="mt-4 space-y-3 text-sm leading-7 text-[#4f544d]">
              {project.decisions.map((item) => (
                <li key={item}>• {item}</li>
              ))}
            </ul>
          </div>
          <div className="rounded-[24px] border border-black/5 bg-[#F5F5EF] p-5">
            <h3 className="text-lg text-[#171916]">Other visible pathways</h3>
            <ul className="mt-4 space-y-3 text-sm leading-7 text-[#4f544d]">
              {project.implementation.map((item) => (
                <li key={item}>• {item}</li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-12 rounded-[24px] border border-black/5 bg-[#171916] p-6 text-[#F5F5EF]">
          {project.liveUrl ? (
            <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 rounded-full bg-[#B6E76A] px-5 py-3 text-sm font-medium text-[#171916]">
              Visit the live storefront <ArrowUpRight size={16} />
            </a>
          ) : null}
        </div>
      </div>
    </div>
  );
}
