import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { DiscoveryLoginForm } from "@/components/admin/discovery-login-form";
import { discoveryAdminConfigured, isDiscoveryAdmin } from "@/lib/discovery-auth";

export const metadata: Metadata = {
  title: "Discovery admin sign in",
  robots: { index: false, follow: false },
};

export default async function DiscoveryAdminLoginPage() {
  if (await isDiscoveryAdmin()) redirect("/admin/discovery");

  const configured = discoveryAdminConfigured();
  return (
    <div className="mx-auto max-w-xl px-4 py-16 sm:px-6">
      <section className="rounded-card border border-divider bg-on-dark p-7 shadow-card sm:p-9">
        <p className="text-xs font-medium uppercase tracking-label text-muted">Private area</p>
        <h1 className="mt-3 text-3xl font-semibold">Discovery admin</h1>
        {configured ? (
          <DiscoveryLoginForm />
        ) : (
          <div role="status" className="mt-6 rounded-xl border border-warning-line bg-warning-soft p-4 text-sm leading-6 text-warning-strong">
            Admin sign-in is not enabled. Configure <code>DISCOVERY_ADMIN_PASSWORD</code> (at least 16 characters) and <code>DISCOVERY_SESSION_SECRET</code> (at least 32 characters) on the server before using this area.
          </div>
        )}
      </section>
    </div>
  );
}
