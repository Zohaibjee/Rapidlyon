import Link from "next/link";
import { siteConfig } from "@/data/site";
import { createPageMetadata } from "@/lib/metadata";

export const metadata = createPageMetadata(
  "Contact",
  "Contact Rapidlyon with a project question or share more context through project discovery.",
  "/contact",
);

export default function ContactPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-8">
      <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr]">
        <div className="rounded-[28px] border border-black/5 bg-[#171916] p-8 text-[#F5F5EF]">
          <p className="text-xs uppercase tracking-[0.2em] text-[#B6E76A]">Contact</p>
          <h1 className="mt-4 text-4xl tracking-[-0.07em] md:text-5xl">Let’s talk about what you’re building.</h1>
          <div className="mt-8 space-y-4 text-sm text-[#e9ece5]">
            <a href={`mailto:${siteConfig.email}`} className="inline-flex rounded-full border border-white/30 px-4 py-2.5 font-medium transition hover:border-white">
              Email us: {siteConfig.email}
            </a>
            <p>{siteConfig.address}</p>
          </div>
        </div>

        <div className="rounded-[28px] border border-black/5 bg-white p-8">
          <p className="text-sm leading-7 text-[#4f544d]">
            For a project enquiry, share your goals and context in the guided discovery form. If you only have a quick question, email us directly instead.
          </p>
          <Link href="/discovery" className="mt-8 inline-flex rounded-full bg-[#171916] px-5 py-3 text-sm font-medium text-[#F5F5EF]">
            Discuss your project
          </Link>
          <p className="mt-6 text-sm text-[#62665e]">
            Prefer a quick note? <a className="font-medium text-[#171916] underline underline-offset-4" href={`mailto:${siteConfig.email}?subject=Quick%20question%20for%20Rapidlyon`}>Email a quick question</a>.
          </p>
        </div>
      </div>
    </div>
  );
}
