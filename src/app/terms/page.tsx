import { legalNote } from "@/data/site";
import { createPageMetadata } from "@/lib/metadata";

export const metadata = createPageMetadata(
  "Terms of service",
  "Terms for using the Rapidlyon website and submitting a project enquiry.",
  "/terms",
);

export default function TermsPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-16 sm:px-6 lg:px-8">
      <div className="rounded-card border border-divider bg-on-dark p-8">
        <p className="text-xs uppercase tracking-label text-muted">Terms</p>
        <h1 className="mt-4 text-4xl tracking-display-wide text-ink">Terms of service</h1>
        <div className="mt-8 space-y-6 text-base leading-8 text-body">
          <p>By visiting this website, you agree to use the content in a lawful and respectful way. The website is made available for information and business communication purposes and should not be treated as a substitute for professional advice or legal counsel.</p>
          <p>Rapidlyon may update the website content, service descriptions, and project formats over time. We aim to keep the information accurate and useful, but details may change based on scope, context, or client requirements.</p>
          <p>Project inquiries submitted through the site are reviewed for business-fit and communication purposes. Any actual project work, contract, scope, timeline, and pricing should be confirmed through a formal agreement between the parties.</p>
          <p>Review submissions are moderated before publication. By submitting a review, you confirm it reflects your own experience and that you have permission to share its contents. Rapidlyon may decline or remove submissions that are irrelevant, abusive, or include sensitive personal information.</p>
          <p>{legalNote}</p>
        </div>
      </div>
    </div>
  );
}
