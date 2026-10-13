import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { DiscoveryAdmin } from "@/components/admin/discovery-admin";
import { discoveryAdminConfigured, isDiscoveryAdmin } from "@/lib/discovery-auth";

export const metadata: Metadata = {
  title: "Discovery submissions",
  robots: { index: false, follow: false },
};

export default async function DiscoveryAdminPage() {
  if (!(await isDiscoveryAdmin())) redirect("/admin/discovery/login");

  if (!discoveryAdminConfigured()) redirect("/admin/discovery/login");

  return <DiscoveryAdmin />;
}
