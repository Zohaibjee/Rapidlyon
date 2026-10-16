import { PricingPackages } from "@/components/pricing/pricing-packages";
import { SectionHeading } from "@/components/ui/section-heading";
import { createPageMetadata } from "@/lib/metadata";
import Link from "next/link";

export const metadata = createPageMetadata(
  "UX/UI and website development estimates",
  "Estimate UX/UI and product design, website development, or combined project pricing in USD. SEO and website optimization are scoped separately.",
  "/pricing",
);

export default function PricingPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
      <SectionHeading
        eyebrow="Clear starting estimates"
        title="Get a feel for the scope before we talk."
        description="Choose UX/UI and product design, website development, or both, then adjust the page count. SEO and website optimization are scoped separately from these packages."
        level="h1"
      />

      <PricingPackages />

      <section aria-labelledby="estimate-details" className="mt-8 grid gap-5 md:grid-cols-2">
        <div className="rounded-panel border border-divider bg-on-dark p-6">
          <h2 id="estimate-details" className="text-lg font-semibold text-ink">How the estimate works</h2>
          <p className="mt-2 text-sm leading-6 text-body">
            A page is a distinct destination, such as Home or Contact. A template is a reusable layout; several pages can share one template when they use the same structure. Standard covers up to 5 pages, Professional up to 10, and Premium up to 15, with a separate cap on templates. The fee does not increase page by page within a bracket.
          </p>
          <p className="mt-3 text-sm leading-6 text-body">
            Functionality, user flows, complexity, content readiness, integrations, and dependencies also affect the final scope and quote. More templates or other requirements may need a custom scope.
          </p>
          <p className="mt-3 text-sm leading-6 text-body">
            These package estimates cover UX/UI and website-development work. <Link href="/services/seo-website-optimization" className="font-medium text-ink underline underline-offset-2">SEO and website optimization</Link> are scoped separately after reviewing the site and goals.
          </p>
        </div>
        <div className="rounded-panel bg-paper p-6">
          <h2 className="text-lg font-semibold text-ink">Estimate, not a final quote</h2>
          <p className="mt-2 text-sm leading-6 text-body">
            The displayed one-time fee is a starting estimate in USD. Delivery windows are planning estimates and depend on scope, content readiness, feedback, and approvals.
          </p>
          <p className="mt-3 text-sm leading-6 text-body">
            We confirm pages, templates, deliverables, revisions, timeline, and final fee in writing before work begins. Custom backend work, accounts, e-commerce, copywriting, paid tools, and unlisted integrations are scoped separately.
          </p>
          <p className="mt-3 text-sm leading-6 text-body">
            Not sure which service or package fits? <Link href="/discovery" className="font-medium text-ink underline underline-offset-2">Start with project discovery</Link> and share what you know so far.
          </p>
        </div>
      </section>
    </div>
  );
}
