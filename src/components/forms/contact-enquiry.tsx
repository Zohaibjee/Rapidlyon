"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { featuredProjects, services, siteConfig } from "@/data/site";
import { InquiryForm, type InquiryIntent } from "@/components/forms/inquiry-form";
import { ConversationChat } from "@/components/forms/conversation-chat";

export function ContactEnquiry() {
  const params = useSearchParams();
  const requestedIntent = params.get("intent") || "general";
  const intent: InquiryIntent = requestedIntent === "conversation" || requestedIntent === "service" || requestedIntent === "pricing" || requestedIntent === "project"
    ? requestedIntent
    : "general";
  const serviceSlug = params.get("service");
  const service = serviceSlug ? services.find((item) => item.slug === serviceSlug) : undefined;
  const projectSlug = params.get("project");
  const project = projectSlug ? featuredProjects.find((item) => item.slug === projectSlug) : undefined;
  const modeParam = params.get("mode");
  const mode = modeParam === "design" || modeParam === "development" || modeParam === "bundle"
    ? modeParam
    : undefined;
  const tierParam = params.get("tier");
  const tier = tierParam && ["Standard", "Professional", "Premium"].includes(tierParam)
    ? tierParam
    : undefined;
  const customScope = intent === "pricing" && params.get("custom") === "true";
  const pagesParam = Number(params.get("pages"));
  const pageCount = Number.isInteger(pagesParam) && pagesParam >= 1 && pagesParam <= 15
    ? pagesParam
    : undefined;
  const projectService = project?.services.find((projectServiceName) =>
    services.some((item) => item.title === projectServiceName),
  );
  const serviceValue = service?.title || projectService || (
    mode === "design" ? "UX/UI Design"
      : mode === "development" ? "Web Development"
        : mode === "bundle" ? "Design + Development"
          : undefined
  );
  const title = intent === "pricing" && customScope
    ? "Let’s scope your custom project."
    : intent === "service" && service
    ? `Let’s talk about ${service.title}.`
    : intent === "pricing" && tier
      ? `Let’s scope the ${tier} package.`
      : intent === "project" && project
        ? `Planning something like ${project.title}?`
        : intent === "pricing"
          ? "Let’s find the right project scope."
          : "Tell us what you’re working on.";
  const description = intent === "pricing" && customScope
    ? "Tell us what your project needs beyond the listed packages. We’ll review the requirements and help define a suitable scope before quoting."
    : intent === "service" && service
    ? `Share what you need from ${service.title}. The questions below focus on this service so we can respond with useful next steps.`
    : intent === "pricing"
      ? "Share what you want included and we’ll review the package scope with you. No commitment is made by sending an enquiry."
      : intent === "project" && project
        ? "Tell us what you are planning and which parts of this project are relevant. We’ll use your reference to understand the kind of outcome you have in mind."
        : "A few details help us respond to your actual goal. You can also email us directly if you would rather start with a conversation.";

  return (
    <>
      <header className="mx-auto max-w-3xl">
        <p className="text-xs font-medium uppercase tracking-label text-muted">{intent === "conversation" ? "A quick conversation" : "Contact"}</p>
        <h1 className="mt-4 text-4xl font-semibold tracking-display text-ink md:text-5xl">{title}</h1>
        <p className="mt-5 max-w-2xl text-base leading-7 text-body">
          {intent === "conversation"
            ? "Answer a few small prompts at your pace. This guided chat is not a live agent; we’ll read your note and reply by email."
            : description}
        </p>
      </header>

      <div className="mt-9 grid items-start gap-8 lg:grid-cols-[minmax(0,1fr)_16rem]">
        {intent === "conversation" ? (
          <ConversationChat />
        ) : (
          <InquiryForm
            intent={intent}
            service={service}
            serviceValue={serviceValue}
            project={project}
            mode={mode}
            tier={tier}
            pageCount={pageCount}
            customScope={customScope}
          />
        )}
        <aside className="rounded-panel border border-divider bg-on-dark p-6 text-sm leading-6 text-body">
          <h2 className="font-semibold text-ink">Prefer to write directly?</h2>
          <p className="mt-2">You can start a conversation without filling in a form.</p>
          <a href={`mailto:${siteConfig.email}?subject=Hello%20Rapidlyon`} className="mt-4 inline-block font-medium text-ink underline underline-offset-4">
            Email {siteConfig.email}
          </a>
          <p className="mt-4">
            Prefer to share a more detailed brief?{" "}
            <Link href="/discovery" className="font-medium text-ink underline underline-offset-2">Use project discovery</Link>.
          </p>
          <p className="mt-6 border-t border-divider-strong pt-5">{siteConfig.address}</p>
          <p className="mt-4 text-xs leading-5 text-muted">
            Details submitted through this form are used to respond to your enquiry. See the{" "}
            <Link href="/privacy" className="underline underline-offset-2">Privacy notice</Link>.
          </p>
        </aside>
      </div>
    </>
  );
}
