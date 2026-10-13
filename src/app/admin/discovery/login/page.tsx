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
      <section className="rounded-[28px] border border-black/5 bg-white p-7 shadow-[0_18px_50px_rgba(23,25,22,0.05)] sm:p-9">
        <p className="text-xs font-medium uppercase tracking-[0.2em] text-[#73776D]">Private area</p>
        <h1 className="mt-3 text-3xl font-semibold">Discovery admin</h1>
        {configured ? (
          <DiscoveryLoginForm />
        ) : (
          <div role="status" className="mt-6 rounded-xl border border-amber-200 bg-amber-50 p-4 text-sm leading-6 text-amber-900">
            Admin sign-in is not enabled. Configure <code>DISCOVERY_ADMIN_PASSWORD</code> (at least 16 characters) and <code>DISCOVERY_SESSION_SECRET</code> (at least 32 characters) on the server before using this area.
          </div>
        )}
      </section>
    </div>
  );
}
