"use client";

import Link from "next/link";
import { FormEvent, useState } from "react";
import { ArrowRight, MessageCircle, Send } from "lucide-react";

type PricingAssistantProps = {
  service: string;
  mode: "design" | "development" | "bundle";
  pages: number;
  tier: string;
  price: string;
  timeline: string;
  templates: number;
  revisions: number;
  savings: string;
};

type Message = {
  role: "assistant" | "user";
  text: string;
};

const suggestedQuestions = [
  "What does this estimate include?",
  "How do page prices work?",
  "What could cost extra?",
];

function getAnswer(question: string, context: PricingAssistantProps) {
  const normalized = question.toLowerCase();
  const { service, pages, tier, price, timeline, templates, revisions, savings } = context;

  if (/\b(hello|hi|hey|salam|assalam)\b/.test(normalized)) {
    return "Hi! I can explain this estimate, package limits, delivery ranges, and what may need a custom quote. What would you like to know?";
  }

  if (/extra|exclude|not include|backend|account|e-?commerce|shop|copy|content writing|integration|third.party|additional|custom/.test(normalized)) {
    return "Custom backend systems, user accounts, e-commerce, copywriting, paid third-party services, unlisted integrations, and requirements beyond the package's page/template limits are not automatically included. We can review these and send a separate written scope and quote.";
  }

  if (/include|deliverable|discovery|revision|iteration|wireframe|prototype|design|ux|handoff/.test(normalized)) {
    if (context.mode === "development") {
      return `This ${tier} Development scope includes kickoff and scope confirmation, responsive implementation from approved designs and supplied content, then quality checks and handoff. It covers up to ${templates} unique templates. Design and final content should be ready or listed in the agreed scope.`;
    }
    if (context.mode === "bundle") {
      return `This ${tier} Design + Development scope includes discovery, page structure, wireframes, responsive UI, a clickable prototype, ${revisions} consolidated design revision rounds, responsive development, QA, and handoff. It covers up to ${templates} unique templates.`;
    }
    return `This ${tier} UX Design scope includes discovery, goals and page structure, wireframes, responsive UI, a clickable prototype, ${revisions} consolidated design revision rounds, and developer handoff. It covers up to ${templates} unique templates.`;
  }

  if (/page|pages|bracket|tier|package|template|layout|limit|quantity/.test(normalized)) {
    return `Page count selects a fixed package bracket: Standard covers 1–5 pages, Professional 6–10, and Premium 11–15. The price stays the same within each bracket; it does not increase per page. Your ${pages}-page selection is in ${tier}, which includes up to ${templates} unique templates. More than 15 pages or more templates needs custom scoping.`;
  }

  if (/timeline|delivery|deliver|duration|weeks|time|deadline|kab|kitn.*waqt/.test(normalized)) {
    return `For your current ${tier} ${service} estimate (${pages} ${pages === 1 ? "page" : "pages"}), the planning range is ${timeline}. It is not a guaranteed deadline: final timing depends on scope, content readiness, feedback, and approvals.`;
  }

  if (/price|cost|fee|estimate|rate|kitna|qeemat|budget|charge/.test(normalized)) {
    return `Your current selection is ${tier} ${service} for ${pages} ${pages === 1 ? "page" : "pages"}, starting at ${price} USD one-time. This is an estimate, not a final quote. We confirm the detailed scope and fee in writing before work begins.${context.mode === "bundle" ? ` This bundle reflects a ${savings} saving compared with the separate services.` : ""}`;
  }

  if (/start|process|discovery|brief|begin|next step|how do|kaise|kahan/.test(normalized)) {
    return "The next step is to share your goals, audience, pages, and any ready materials. We review the requirements, clarify assumptions, and confirm deliverables, timeline, and fee in writing before work begins. You do not need a finished brief to get started.";
  }

  return "I can help with this estimate, page brackets, included work, delivery ranges, and custom-scope items. I don’t have enough verified information to answer that specific question. You can send the details to the team for a tailored reply.";
}

export function PricingAssistant(props: PricingAssistantProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [question, setQuestion] = useState("");
  const [messages, setMessages] = useState<Message[]>([]);

  const submitQuestion = (submittedQuestion = question) => {
    const trimmedQuestion = submittedQuestion.trim();
    if (!trimmedQuestion) return;

    setMessages((current) => [
      ...current,
      { role: "user", text: trimmedQuestion },
      { role: "assistant", text: getAnswer(trimmedQuestion, props) },
    ]);
    setQuestion("");
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    submitQuestion();
  };

  return (
    <section className="mt-6 rounded-panel border border-divider-strong bg-paper">
      <button
        type="button"
        aria-expanded={isOpen}
        aria-controls="pricing-assistant-panel"
        onClick={() => setIsOpen((current) => !current)}
        className="flex w-full items-center justify-between gap-4 rounded-panel p-5 text-left sm:px-6"
      >
        <span className="flex items-center gap-3">
          <span className="flex size-10 items-center justify-center rounded-full bg-ink text-accent">
            <MessageCircle size={18} aria-hidden="true" />
          </span>
          <span>
            <span className="block text-sm font-semibold text-ink">Questions about this estimate?</span>
            <span className="mt-1 block text-xs text-body-muted">Ask the pricing assistant</span>
          </span>
        </span>
        <span aria-hidden="true" className="text-lg text-body">{isOpen ? "−" : "+"}</span>
      </button>

      {isOpen ? (
        <div id="pricing-assistant-panel" className="border-t border-divider-strong">
          <div className="flex items-center justify-between gap-3 px-5 pt-4 sm:px-6">
            <p className="text-xs font-medium text-body-muted">Automated pricing guide · not a live agent</p>
            <p className="text-xs text-body-muted">{props.tier} · {props.pages} {props.pages === 1 ? "page" : "pages"}</p>
          </div>
          <div aria-live="polite" aria-label="Pricing assistant conversation" className="max-h-80 space-y-3 overflow-y-auto px-5 py-4 sm:px-6">
            <p className="max-w-[90%] rounded-2xl rounded-tl-sm bg-on-dark p-3 text-sm leading-6 text-body-strong shadow-sm">
              Hi! I can explain your {props.service} estimate, package limits, and what may need a custom quote. What would you like to know?
            </p>
            {messages.map((message, index) => (
              <p
                key={`${index}-${message.role}`}
                className={`max-w-[90%] rounded-2xl p-3 text-sm leading-6 ${
                  message.role === "user"
                    ? "ml-auto rounded-tr-sm bg-ink text-on-dark"
                    : "rounded-tl-sm bg-on-dark text-body-strong shadow-sm"
                }`}
              >
                {message.text}
              </p>
            ))}
          </div>
          {messages.length === 0 ? (
            <div className="flex flex-wrap gap-2 px-5 pb-4 sm:px-6">
              {suggestedQuestions.map((suggestion) => (
                <button
                  key={suggestion}
                  type="button"
                  onClick={() => submitQuestion(suggestion)}
                  className="rounded-full border border-divider-strong bg-surface px-3 py-2 text-left text-xs font-medium text-body-strong hover:border-divider-strong"
                >
                  {suggestion}
                </button>
              ))}
            </div>
          ) : null}
          <form onSubmit={handleSubmit} className="flex gap-2 border-t border-divider-strong p-4 sm:px-6">
            <label htmlFor="pricing-assistant-question" className="sr-only">Ask about pricing or project scope</label>
            <input
              id="pricing-assistant-question"
              value={question}
              onChange={(event) => setQuestion(event.target.value)}
              maxLength={500}
              placeholder="Ask about price, pages, delivery, or scope…"
              className="min-w-0 flex-1 rounded-xl border border-divider-strong bg-on-dark px-4 py-3 text-sm text-ink outline-none placeholder:text-placeholder focus:border-accent-deep"
            />
            <button
              type="submit"
              disabled={!question.trim()}
              aria-label="Send question"
              className="inline-flex size-12 shrink-0 items-center justify-center rounded-xl bg-ink text-on-dark transition hover:bg-ink-hover disabled:cursor-not-allowed disabled:opacity-40"
            >
              <Send size={17} aria-hidden="true" />
            </button>
          </form>
          <div className="flex flex-col gap-2 px-5 pb-5 text-xs text-body-muted sm:flex-row sm:items-center sm:justify-between sm:px-6">
            <span>Estimate details update when you change your selection.</span>
            <Link
              href={`/contact?intent=pricing&custom=true&mode=${props.mode}&pages=${props.pages}`}
              className="inline-flex items-center gap-1 font-semibold text-ink underline underline-offset-2"
            >
              Ask the team about your project <ArrowRight size={13} aria-hidden="true" />
            </Link>
          </div>
        </div>
      ) : null}
    </section>
  );
}
