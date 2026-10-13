"use client";

import Link from "next/link";
import { Menu, X } from "lucide-react";
import { useState } from "react";
import { siteConfig } from "@/data/site";

export function SiteHeader() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-black/5 bg-[#F5F5EF]/90 backdrop-blur-sm">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
        <Link href="/" className="text-lg font-semibold tracking-[-0.06em] text-[#171916]">
          {siteConfig.brand}
        </Link>

        <nav aria-label="Main navigation" className="hidden items-center gap-6 lg:gap-8 lg:flex">
          {siteConfig.navigation.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-sm font-medium text-[#171916]/80 transition hover:text-[#171916]"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="hidden lg:block">
          <Link
            href="/discovery"
            className="inline-flex items-center rounded-full bg-[#171916] px-5 py-2.5 text-sm font-medium text-[#F5F5EF] transition hover:bg-[#2a2d27]"
          >
            Discuss your project
          </Link>
        </div>

        <button
          type="button"
          aria-label={open ? "Close navigation" : "Open navigation"}
          aria-controls="mobile-navigation"
          aria-expanded={open}
          className="inline-flex items-center justify-center rounded-full border border-black/10 p-2 lg:hidden"
          onClick={() => setOpen((value) => !value)}
        >
          {open ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {open ? (
        <div className="border-t border-black/5 bg-[#F5F5EF] lg:hidden">
          <nav id="mobile-navigation" aria-label="Mobile navigation" className="mx-auto flex max-w-7xl flex-col gap-4 px-4 py-5 text-base font-medium text-[#171916]">
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
            <Link
              href="/discovery"
              onClick={() => setOpen(false)}
              className="mt-2 inline-flex rounded-full bg-[#171916] px-5 py-2.5 text-sm font-medium text-[#F5F5EF]"
            >
              Discuss your project
            </Link>
          </nav>
        </div>
      ) : null}
    </header>
  );
}
