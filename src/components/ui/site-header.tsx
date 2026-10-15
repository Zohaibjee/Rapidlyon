"use client";

import Link from "next/link";
import { Menu, X } from "lucide-react";
import { useState } from "react";
import { siteConfig } from "@/data/site";
import { ButtonLink } from "@/components/ui/button";

export function SiteHeader() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-divider bg-paper/90 backdrop-blur-sm">
      <div className="ds-shell flex items-center justify-between py-4">
        <Link href="/" className="ds-link text-lg font-semibold tracking-display text-ink">
          {siteConfig.brand}
        </Link>

        <nav aria-label="Main navigation" className="hidden items-center gap-6 lg:gap-8 lg:flex">
          {siteConfig.navigation.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-sm font-medium text-ink/80 transition hover:text-ink"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="hidden lg:block">
          <ButtonLink href="/contact?intent=conversation" className="py-2.5">
            Talk to us
          </ButtonLink>
        </div>

        <button
          type="button"
          aria-label={open ? "Close navigation" : "Open navigation"}
          aria-controls="mobile-navigation"
          aria-expanded={open}
          className="inline-flex items-center justify-center rounded-full border border-divider-strong p-2 lg:hidden"
          onClick={() => setOpen((value) => !value)}
        >
          {open ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {open ? (
        <div className="border-t border-divider bg-paper lg:hidden">
          <nav id="mobile-navigation" aria-label="Mobile navigation" className="mx-auto flex max-w-7xl flex-col gap-4 px-4 py-5 text-base font-medium text-ink">
            {siteConfig.navigation.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className="py-1"
              >
                {item.label}
              </Link>
            ))}
            <ButtonLink
              href="/contact?intent=conversation"
              onClick={() => setOpen(false)}
              className="mt-2 py-2.5"
            >
              Talk to us
            </ButtonLink>
          </nav>
        </div>
      ) : null}
    </header>
  );
}
