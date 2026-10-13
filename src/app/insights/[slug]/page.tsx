import Link from "next/link";
import { notFound } from "next/navigation";
import { insights } from "@/data/site";
import { createPageMetadata } from "@/lib/metadata";

export function generateStaticParams() {
  return insights.map((post) => ({ slug: post.slug }));
}

export function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  return params.then(({ slug }) => {
    const post = insights.find((item) => item.slug === slug);

    if (!post) {
      return { title: "Insight not found", robots: { index: false, follow: false } };
    }

    return createPageMetadata(post.title, post.excerpt, `/insights/${slug}`);
  });
}

export default async function InsightDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = insights.find((item) => item.slug === slug);

  if (!post) {
    notFound();
  }

  return (
    <div className="mx-auto max-w-4xl px-4 py-16 sm:px-6 lg:px-8">
      <Link href="/insights" className="inline-flex items-center gap-2 text-sm font-medium text-[#171916]">← Back to insights</Link>
      <article className="mt-8 rounded-[28px] border border-black/5 bg-white p-8 shadow-[0_16px_32px_rgba(23,25,22,0.04)]">
        <p className="text-xs uppercase tracking-[0.2em] text-[#73776D]">{post.category}</p>
        <h1 className="mt-4 text-4xl tracking-[-0.07em] text-[#171916] md:text-5xl">{post.title}</h1>
        <p className="mt-4 text-sm text-[#4f544d]">{post.readTime}</p>

        <div className="mt-8 space-y-6 text-base leading-8 text-[#4f544d]">
          {post.content.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
        </div>
      </article>
    </div>
  );
}
