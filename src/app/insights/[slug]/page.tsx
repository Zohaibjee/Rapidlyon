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
      <Link href="/insights" className="inline-flex items-center gap-2 text-sm font-medium text-ink">← Back to insights</Link>
      <article className="mt-8 rounded-card border border-divider bg-on-dark p-8 shadow-soft-floating">
        <p className="text-xs uppercase tracking-label text-muted">{post.category}</p>
        <h1 className="mt-4 text-4xl tracking-display-wide text-ink md:text-5xl">{post.title}</h1>
        <p className="mt-4 text-sm text-body">{post.readTime}</p>

        <div className="mt-8 space-y-6 text-base leading-8 text-body">
          {post.content.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
        </div>
      </article>
    </div>
  );
}
