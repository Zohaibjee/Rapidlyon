import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { services, siteConfig } from "@/data/site";

export function SiteFooter() {
  const year = 2026;

  return (
    <footer className="border-t border-divider bg-ink text-paper">
      <div className="ds-shell grid gap-10 py-12 lg:grid-cols-[1.4fr_0.8fr_0.8fr_1.2fr]">
        <div>
          <p className="text-2xl font-semibold tracking-display-wide">{siteConfig.brand}</p>
          <p className="mt-4 max-w-sm text-sm leading-7 text-divider-strong">
            {siteConfig.description}
          </p>
        </div>

        <div>
          <p className="text-xs font-medium uppercase tracking-label text-accent">Navigate</p>
          <ul className="mt-4 space-y-3 text-sm text-paper-raised">
            <li><Link href="/work">Work</Link></li>
            <li><Link href="/services">Services</Link></li>
            <li><Link href="/pricing">Pricing & project options</Link></li>
            <li><Link href="/about">About</Link></li>
            <li><Link href="/process">Process</Link></li>
            <li><Link href="/insights">Insights</Link></li>
            <li><Link href="/faq">FAQ</Link></li>
            <li><Link href="/contact">Contact</Link></li>
          </ul>
        </div>

        <div>
          <p className="text-xs font-medium uppercase tracking-label text-accent">Services</p>
          <ul className="mt-4 space-y-3 text-sm text-paper-raised">
            {services.map((service) => (
              <li key={service.slug}><Link href={`/services/${service.slug}`}>{service.title}</Link></li>
            ))}
          </ul>
        </div>

        <div>
          <p className="text-xs font-medium uppercase tracking-label text-accent">Contact</p>
          <ul className="mt-4 space-y-3 text-sm text-paper-raised">
            <li><a href={`mailto:${siteConfig.email}`}>{siteConfig.email}</a></li>
            <li>{siteConfig.address}</li>
            <li className="pt-2">
              <Link href="/contact?intent=conversation" className="inline-flex items-center gap-2 text-accent">
                Talk to us <ArrowUpRight size={16} />
              </Link>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-on-dark/10">
        <div className="mx-auto flex max-w-7xl flex-col gap-4 px-4 py-5 text-sm text-divider-strong sm:flex-row sm:items-center sm:justify-between sm:px-6 lg:px-8">
          <p>© {year} {siteConfig.brand}. All rights reserved.</p>
          <div className="flex items-center gap-4">
            <Link href="/privacy" className="hover:text-on-dark">Privacy</Link>
            <Link href="/terms" className="hover:text-on-dark">Terms</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
