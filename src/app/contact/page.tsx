import { Suspense } from "react";
import { ContactEnquiry } from "@/components/forms/contact-enquiry";
import { createPageMetadata } from "@/lib/metadata";

export const metadata = createPageMetadata(
  "Contact",
  "Choose how to start a conversation with Rapidlyon: email directly or send a context-aware project enquiry.",
  "/contact",
);

export default function ContactPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-8">
      <Suspense
        fallback={
          <div role="status" className="rounded-card border border-divider bg-on-dark p-8 text-sm text-body-muted">
            Preparing the right enquiry form…
          </div>
        }
      >
        <ContactEnquiry />
      </Suspense>
    </div>
  );
}
