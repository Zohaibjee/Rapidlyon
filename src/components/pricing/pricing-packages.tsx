"use client";

import { useState } from "react";
import { ArrowRight, Check } from "lucide-react";
import { PricingAssistant } from "@/components/pricing/pricing-assistant";
import { ButtonLink } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

type PackageMode = "design" | "development" | "bundle";

const modes: { id: PackageMode; label: string; description: string }[] = [
  { id: "design", label: "UX Design", description: "Discovery, UX/UI design, prototype, revisions, and handoff." },
  { id: "development", label: "Development", description: "Responsive implementation from approved designs, QA, and handoff." },
  { id: "bundle", label: "Design + Development", description: "A coordinated design and development engagement, with a bundle saving." },
];

const packages = [
  {
    id: "standard",
    name: "Standard",
    maxPages: 5,
    templates: 3,
    revisions: 2,
    prices: { design: 450, development: 630, bundle: 975 },
    savings: 105,
    timelines: {
      design: "2–3 weeks",
      development: "2–4 weeks",
      bundle: "4–6 weeks",
    },
    featured: false,
  },
  {
    id: "professional",
    name: "Professional",
    maxPages: 10,
    templates: 6,
    revisions: 3,
    prices: { design: 900, development: 1265, bundle: 1950 },
    savings: 215,
    timelines: {
      design: "3–5 weeks",
      development: "4–6 weeks",
      bundle: "6–9 weeks",
    },
    featured: true,
  },
  {
    id: "premium",
    name: "Premium",
    maxPages: 15,
    templates: 8,
    revisions: 4,
    prices: { design: 1625, development: 2350, bundle: 3575 },
    savings: 400,
    timelines: {
      design: "5–7 weeks",
      development: "6–8 weeks",
      bundle: "9–12 weeks",
    },
    featured: false,
  },
];

const currency = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  maximumFractionDigits: 0,
});

function getDeliverables(mode: PackageMode, revisions: number) {
  if (mode === "design") {
    return [
      "Discovery, goals, and page structure",
      "Wireframes, responsive UI, and a clickable prototype",
      `${revisions} consolidated design revision rounds and handoff`,
    ];
  }

  if (mode === "development") {
    return [
      "Kickoff and scope confirmation",
      "Responsive build from approved designs and supplied content",
      "Quality checks and launch handoff within the agreed scope",
    ];
  }

  return [
    "Discovery, goals, and page structure",
    "Wireframes, responsive UI, and a clickable prototype",
    `${revisions} design revision rounds, responsive build, QA, and handoff`,
  ];
}

export function PricingPackages() {
  const [selectedMode, setSelectedMode] = useState<PackageMode>("design");
  const [pageCount, setPageCount] = useState(5);
  const mode = modes.find((item) => item.id === selectedMode)!;
  const selectedPackage = packages.find((item) => pageCount <= item.maxPages)!;
  const price = selectedPackage.prices[selectedMode];
  const customHref = `/contact?intent=pricing&custom=true&mode=${selectedMode}&pages=${pageCount}`;
  const packageHref = `/contact?intent=pricing&mode=${selectedMode}&tier=${selectedPackage.name}&pages=${pageCount}`;

  const updatePageCount = (value: string) => {
    const nextValue = Number(value);
    if (Number.isInteger(nextValue) && nextValue >= 1 && nextValue <= 15) {
      setPageCount(nextValue);
    }
  };

  return (
    <section aria-labelledby="package-comparison" className="mt-10">
      <Card variant="elevated" className="p-5 md:p-8">
        <div className="mx-auto max-w-3xl text-center">
          <h2 id="package-comparison" className="text-2xl font-semibold tracking-display-tight text-ink">
            Estimate your package
          </h2>
          <p className="mt-2 text-sm leading-6 text-body-muted">
            Choose a service and page count to see the matching starting package.
          </p>
          <div role="group" aria-label="Choose a project service" className="mt-5 inline-flex max-w-full flex-wrap justify-center gap-2 rounded-2xl border border-divider-strong bg-paper p-2">
            {modes.map((item) => (
              <button
                key={item.id}
                type="button"
                aria-pressed={selectedMode === item.id}
                onClick={() => setSelectedMode(item.id)}
                className={`rounded-xl px-4 py-3 text-sm font-medium transition ${
                  selectedMode === item.id
                    ? "bg-ink text-on-dark shadow-sm"
                    : "text-body hover:bg-on-dark hover:text-ink"
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>
          <p className="mt-3 text-sm text-body-muted">{mode.description}</p>
        </div>
      </Card>

      <div className="mx-auto mt-8 max-w-xl">
          <div className="flex items-end justify-between gap-4">
            <label htmlFor="page-count" className="text-sm font-semibold text-ink">
              How many pages do you expect?
            </label>
            <div className="flex items-center gap-2">
              <input
                id="page-count"
                type="number"
                min={1}
                max={15}
                step={1}
                inputMode="numeric"
                value={pageCount}
                onChange={(event) => updatePageCount(event.target.value)}
                aria-describedby="page-count-help"
                className="w-20 rounded-xl border border-divider-strong bg-paper px-3 py-2 text-center text-lg font-semibold text-ink outline-none focus:border-accent-deep"
              />
              <span className="text-sm text-body-muted">pages</span>
            </div>
          </div>
          <input
            aria-label="Adjust estimated number of pages"
            type="range"
            min={1}
            max={15}
            step={1}
            value={pageCount}
            onChange={(event) => updatePageCount(event.target.value)}
            className="mt-4 w-full accent-accent-deep"
          />
          <div id="page-count-help" className="mt-1 flex justify-between text-xs text-muted">
            <span>1 page</span>
            <span>15 pages</span>
          </div>
        </div>

        <div aria-live="polite" className="mt-8 grid gap-6 rounded-panel bg-ink p-5 text-paper md:grid-cols-[1fr_1fr] md:p-7">
          <div>
            <p className="text-xs font-medium uppercase tracking-label-tight text-accent">
              {selectedPackage.name} · up to {selectedPackage.maxPages} pages
            </p>
            <p className="mt-3 text-sm leading-6 text-on-dark/75">
              Includes up to {selectedPackage.templates} unique page templates. Discovery and scope confirmation are included.
            </p>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-xs text-on-dark/65">Estimated starting fee</p>
              <p className="mt-1 text-3xl font-semibold tracking-display-tight">{currency.format(price)}</p>
              <p className="mt-1 text-xs text-on-dark/65">USD · one-time</p>
              {selectedMode === "bundle" ? (
                <p className="mt-2 text-xs font-medium text-accent-highlight">
                  Save {currency.format(selectedPackage.savings)} vs separate services
                </p>
              ) : null}
            </div>
            <div>
              <p className="text-xs text-on-dark/65">Estimated delivery</p>
              <p className="mt-2 text-xl font-semibold">{selectedPackage.timelines[selectedMode]}</p>
              <p className="mt-1 text-xs leading-5 text-on-dark/65">Planning range, not a guaranteed deadline</p>
            </div>
          </div>
        </div>

        <div className="mt-7 grid gap-7 lg:grid-cols-[1fr_auto] lg:items-end">
          <div>
            <h3 className="text-sm font-semibold text-ink">Included at a glance</h3>
            <ul className="mt-3 grid gap-2 sm:grid-cols-2">
              {getDeliverables(selectedMode, selectedPackage.revisions).map((deliverable) => (
                <li key={deliverable} className="flex items-start gap-2 text-sm leading-6 text-body">
                  <Check size={16} aria-hidden="true" className="mt-1 shrink-0 text-accent-deep" />
                  <span>{deliverable}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row lg:flex-col">
            <ButtonLink
              href={packageHref}
              className="w-full"
            >
              Discuss this estimate <ArrowRight size={16} />
            </ButtonLink>
            <ButtonLink
              href={customHref}
              variant="secondary"
              className="w-full"
            >
              My project needs a custom scope
            </ButtonLink>
          </div>
        </div>
        <PricingAssistant
          service={mode.label}
          mode={selectedMode}
          pages={pageCount}
          tier={selectedPackage.name}
          price={currency.format(price)}
          timeline={selectedPackage.timelines[selectedMode]}
          templates={selectedPackage.templates}
          revisions={selectedPackage.revisions}
          savings={currency.format(selectedPackage.savings)}
        />
    </section>
  );
}
