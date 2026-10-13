import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { services, siteConfig } from "@/data/site";

export function SiteFooter() {
  const year = 2026;

  return (
    <footer className="border-t border-black/5 bg-[#171916] text-[#F5F5EF]">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-12 sm:px-6 lg:grid-cols-[1.4fr_0.8fr_0.8fr_1.2fr] lg:px-8">
        <div>
          <p className="text-2xl font-semibold tracking-[-0.07em]">{siteConfig.brand}</p>
          <p className="mt-4 max-w-sm text-sm leading-7 text-[#d7d9d2]">
            {siteConfig.description}
          </p>
        </div>

        <div>
          <p className="text-xs font-medium uppercase tracking-[0.2em] text-[#B6E76A]">Navigate</p>
          <ul className="mt-4 space-y-3 text-sm text-[#ebeee7]">
            <li><Link href="/work">Work</Link></li>
            <li><Link href="/services">Services</Link></li>
            <li><Link href="/about">About</Link></li>
            <li><Link href="/process">Process</Link></li>
            <li><Link href="/insights">Insights</Link></li>
            <li><Link href="/faq">FAQ</Link></li>
            <li><Link href="/contact">Contact</Link></li>
          </ul>
        </div>

        <div>
          <p className="text-xs font-medium uppercase tracking-[0.2em] text-[#B6E76A]">Services</p>
          <ul className="mt-4 space-y-3 text-sm text-[#ebeee7]">
            {services.map((service) => (
              <li key={service.slug}><Link href={`/services/${service.slug}`}>{service.title}</Link></li>
            ))}
          </ul>
        </div>

        <div>
          <p className="text-xs font-medium uppercase tracking-[0.2em] text-[#B6E76A]">Contact</p>
          <ul className="mt-4 space-y-3 text-sm text-[#ebeee7]">
            <li><a href={`mailto:${siteConfig.email}`}>{siteConfig.email}</a></li>
            <li>{siteConfig.address}</li>
            <li className="pt-2">
              <Link href="/discovery" className="inline-flex items-center gap-2 text-[#B6E76A]">
                Discuss your project <ArrowUpRight size={16} />
              </Link>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="mx-auto flex max-w-7xl flex-col gap-4 px-4 py-5 text-sm text-[#d7d9d2] sm:flex-row sm:items-center sm:justify-between sm:px-6 lg:px-8">
          <p>© {year} {siteConfig.brand}. All rights reserved.</p>
          <div className="flex items-center gap-4">
            <Link href="/privacy" className="hover:text-white">Privacy</Link>
            <Link href="/terms" className="hover:text-white">Terms</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
