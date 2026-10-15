import type { Metadata } from "next";
import { Manrope } from "next/font/google";
import "./globals.css";
import { SiteFooter } from "@/components/ui/site-footer";
import { SiteHeader } from "@/components/ui/site-header";
import { siteConfig } from "@/data/site";

const manrope = Manrope({
  variable: "--font-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: "Rapidlyon | Design with purpose. Build for impact.",
    template: "%s | Rapidlyon",
  },
  description: siteConfig.description,
  openGraph: {
    title: "Rapidlyon | Design with purpose. Build for impact.",
    description: siteConfig.description,
    siteName: "Rapidlyon",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Rapidlyon | Design with purpose. Build for impact.",
    description: siteConfig.description,
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={`${manrope.variable} h-full antialiased`}
    >
      <body className="min-h-full bg-paper text-ink">
        <div className="flex min-h-screen flex-col">
          <SiteHeader />
          <main className="flex-1">{children}</main>
          <SiteFooter />
        </div>
      </body>
    </html>
  );
}
