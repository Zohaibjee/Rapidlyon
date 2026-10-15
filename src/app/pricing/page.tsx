import { PricingPackages } from "@/components/pricing/pricing-packages";
import { SectionHeading } from "@/components/ui/section-heading";
import { createPageMetadata } from "@/lib/metadata";

export const metadata = createPageMetadata(
  "Website design and development packages",
  "Estimate UX design, website development, or combined project pricing in USD. Adjust page count to see the matching package and estimated delivery window.",
  "/pricing",
);

export default function PricingPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
      <SectionHeading
        eyebrow="Clear starting estimates"
        title="Get a feel for the scope before we talk."
        description="Choose UX design, development, or both, then adjust the page count. You’ll see the matching package, starting fee, and estimated delivery window."
        level="h1"
      />

      <PricingPackages />

      <section aria-labelledby="estimate-details" className="mt-8 grid gap-5 md:grid-cols-2">
        <div className="rounded-panel border border-divider bg-on-dark p-6">
          <h2 id="estimate-details" className="text-lg font-semibold text-ink">How the estimate works</h2>
          <p className="mt-2 text-sm leading-6 text-body">
            Page count selects a fixed package bracket: Standard covers up to 5 pages, Professional up to 10, and Premium up to 15. The fee does not increase page by page within a bracket.
          </p>
          <p className="mt-3 text-sm leading-6 text-body">
            Each bracket also has a limit on unique templates. More templates, complex features, or other requirements may change the final scope and quote.
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
        </div>
      </section>
    </div>
  );
}
