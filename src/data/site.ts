import { workProjectSchema, type WorkProject } from "@/lib/work-project-schema";

export type NavItem = {
  label: string;
  href: string;
};

export type Service = {
  slug: string;
  title: string;
  eyebrow: string;
  short: string;
  description: string;
  audience: string;
  problems: string[];
  deliverables: string[];
  process: { title: string; text: string }[];
};

export type Project = WorkProject;

export const siteConfig = {
  brand: "Rapidlyon",
  description: "Rapidlyon turns ideas into digital products through discovery, research, UX, design, development, and launch.",
  url: process.env.NEXT_PUBLIC_SITE_URL || "https://rapidlyon.com",
  email: "hello@rapidlyon.com",
  address: "Remote-first studio working with founders and teams worldwide.",
  navigation: [
    { label: "Work", href: "/work" },
    { label: "Services", href: "/services" },
    { label: "Pricing", href: "/pricing" },
    { label: "Insights", href: "/insights" },
    { label: "FAQ", href: "/faq" },
    { label: "Contact", href: "/contact" },
  ] satisfies NavItem[],
};

export const services: Service[] = [
  {
    slug: "ux-ui-design",
    title: "UX/UI Design",
    eyebrow: "Human-centered design",
    short: "Research, systems, and product clarity that turn complexity into intuitive experiences.",
    description:
      "We turn unclear ideas into clear product journeys through research, wireframes, interface systems, and polished UI design that teams can build with confidence.",
    audience: "Founders, product teams, and organizations needing stronger product clarity before development.",
    problems: [
      "Users are getting lost in the journey or the product feels harder to use than it should be.",
      "Stakeholders need a clearer story for priority, layout, and user value.",
      "The business has growth goals but no design system to support them.",
    ],
    deliverables: [
      "User interviews and opportunity mapping",
      "Information architecture and flows",
      "Wireframes, prototypes, and interface systems",
      "Responsive UI design and design handoff",
    ],
    process: [
      { title: "Discover", text: "We align on user problems, business goals, and constraints so the design direction is grounded in real needs." },
      { title: "Define", text: "We map the experience, information hierarchy, and key journeys before visual design begins." },
      { title: "Design", text: "We turn the direction into high-fidelity screens, interactions, and a visual system that is ready to build." },
      { title: "Handoff", text: "We package the design decisions for engineering with clear states, edge cases, and implementation notes." },
    ],
  },
  {
    slug: "web-development",
    title: "Web Development",
    eyebrow: "Responsive implementation",
    short: "Modern websites built for clarity, performance, accessibility, and long-term maintainability.",
    description:
      "We build polished marketing websites and business experiences that work across devices and support real business goals without sacrificing speed or craft.",
    audience: "Brands and companies that need a reliable digital presence and a well-crafted user experience to convert interest into action.",
    problems: [
      "The current website is outdated, difficult to maintain, or not aligned with the business strategy.",
      "The experience feels generic and does not communicate value clearly enough.",
      "Performance and accessibility are ignored, reducing trust and engagement.",
    ],
    deliverables: [
      "Responsive front-end implementation",
      "Accessibility and performance review",
      "Reusable component architecture",
      "Deployment-ready production build",
    ],
    process: [
      { title: "Plan", text: "We define the content structure, layout priorities, and technical constraints before implementation begins." },
      { title: "Build", text: "We craft the interface as a reusable, maintainable UI system with clear responsiveness and engineering quality." },
      { title: "Refine", text: "We review interactions, edge cases, and content structure to ensure the site feels polished and reliable." },
      { title: "Launch", text: "We prepare deployment, QA, and handoff processes so the experience is ready to go live." },
    ],
  },
  {
    slug: "seo-website-optimization",
    title: "SEO & Website Optimization",
    eyebrow: "Make your site easier to find and use",
    short: "Technical SEO foundations, metadata, performance, and accessibility improvements grounded in your site and goals.",
    description:
      "We review how a website is structured, indexed, and experienced, then prioritize practical technical SEO, metadata, performance, accessibility, and content recommendations. Search rankings and traffic are not guaranteed.",
    audience: "Businesses with an existing website that need a clearer picture of technical or on-page issues and a practical improvement plan.",
    problems: [
      "Important pages or information are difficult for visitors or search engines to find.",
      "Metadata, indexability, or structured data needs a careful review.",
      "Performance, accessibility, or content structure is getting in the way of a useful experience.",
    ],
    deliverables: [
      "Technical SEO and indexability review",
      "On-page metadata and content-structure recommendations",
      "Performance and accessibility improvement priorities",
      "Implementation support and validation where included in scope",
    ],
    process: [
      { title: "Review", text: "Understand the site, business goals, available data, and technical constraints." },
      { title: "Prioritize", text: "Separate observed issues from hypotheses and agree which improvements fit the project." },
      { title: "Improve", text: "Make or document the agreed technical and on-page changes within the approved scope." },
      { title: "Validate", text: "Check the implemented work; search performance depends on factors outside the studio's control." },
    ],
  },
  {
    slug: "nextjs-development",
    title: "Website Development with Next.js",
    eyebrow: "Modern product engineering",
    short: "App Router builds that prioritize performance, clarity, and scalable architecture.",
    description:
      "We design and build with Next.js to create fast, maintainable web experiences with strong SEO foundations, clean architecture, and modern frontend patterns.",
    audience: "Teams building high-quality marketing sites, product pages, or content-led experiences that need flexibility and speed.",
    problems: [
      "The stack is too rigid for growth or changes in content structure.",
      "The website lacks SEO, page metadata, or a stable rendering strategy.",
      "The codebase is becoming difficult to maintain as requirements expand.",
    ],
    deliverables: [
      "App Router architecture and route planning",
      "SEO and metadata implementation",
      "Reusable UI components and data organization",
      "Production-ready performance and deployment setup",
    ],
    process: [
      { title: "Architecture", text: "We map routes, content structure, metadata needs, and the build system to keep the project maintainable." },
      { title: "Implementation", text: "We build the experience with clear patterns, strong typing, and a thoughtful component system." },
      { title: "Optimise", text: "We tune for rendering strategy, accessibility, and content quality before launch." },
      { title: "Support", text: "We give teams the foundation to evolve the product without starting from scratch again." },
    ],
  },
  {
    slug: "saas-mvp",
    title: "SaaS & MVP",
    eyebrow: "Product strategy + build",
    short: "Lean product experiences that validate directions quickly and de-risk the next stage of growth.",
    description:
      "We help early-stage teams clarify product assumptions, shape priority flows, and assess the feasibility and scope of an MVP before implementation is agreed.",
    audience: "Startups and product teams validating demand, testing user journeys, and preparing for a stronger product iteration cycle.",
    problems: [
      "The product idea is promising but the experience still needs a sharper user story and clearer flow.",
      "A team is stretching too many features into one first release.",
      "There is pressure to build fast without losing product clarity or usability.",
    ],
    deliverables: [
      "Product flow definitions and MVP scoping",
      "UX and interface design for critical journeys",
      "Feasibility review for implementation and essential integrations",
      "A scoped delivery plan for the first product release",
    ],
    process: [
      { title: "Scope", text: "We define what is essential, what can wait, and how the core journey supports the business case." },
      { title: "Prototype", text: "We create the critical workflow, test assumptions, and confirm the interaction logic early." },
      { title: "Build", text: "We implement the MVP with thoughtful UX decisions and a maintainable frontend foundation." },
      { title: "Measure", text: "We leave the project ready for user feedback, iteration, and the next phase of product growth." },
    ],
  },
  {
    slug: "website-redesign",
    title: "Website Redesign",
    eyebrow: "Refine what exists",
    short: "A careful review and redesign focused on clearer information, navigation, and user journeys.",
    description:
      "We review an existing website, identify observable friction in its content and user journeys, and scope changes to better reflect the business and its audience.",
    audience: "Organizations with an existing website that needs clearer messaging, navigation, or a more maintainable experience.",
    problems: [
      "The current website no longer reflects the business or the quality of the offer.",
      "Visitors cannot quickly understand what the business does or why it matters.",
      "The experience is inconsistent across pages or difficult to update over time.",
    ],
    deliverables: [
      "Current experience review and UX audit",
      "Content and page strategy updates",
      "Modern redesign and responsive implementation",
      "QA and launch support",
    ],
    process: [
      { title: "Audit", text: "We review the existing experience, identify friction, and define the highest-impact improvements." },
      { title: "Reframe", text: "We restructure flows, messaging, and page hierarchy so the website communicates more clearly." },
      { title: "Design", text: "We redesign the visual direction and experience system with a stronger brand and more confident interfaces." },
      { title: "Launch", text: "We implement the design and support a smooth transition into the new site experience." },
    ],
  },
];

export const featuredProjects: Project[] = [
  workProjectSchema.parse({
    slug: "umer-mobile-parts",
    title: "Umer Mobile Parts",
    discipline: "development",
    status: "published",
    isFeatured: true,
    displayOrder: 1,
    projectType: "Live e-commerce storefront",
    summary:
      "A live wholesale and retail storefront for mobile spare parts, with product search, category browsing, brand navigation, and featured products.",
    role: "Independent personal project",
    clientOrContext: "Independent personal project for a mobile-parts retailer",
    visibilityLabel: "Live personal project",
    services: ["E-commerce", "Web Development"],
    objective: "Help shoppers find mobile spare parts through product categories, mobile brands, and model-specific product listings.",
    context: "The storefront serves both wholesale and retail visitors looking for mobile repair parts. The public experience presents product discovery and retailer messaging.",
    challenge: "Present a broad mobile-parts catalog with recognizable routes into search, part categories, and mobile-brand or model listings.",
    development: {
      implementation: {
        summary: "The live storefront presents the following publicly visible product and business pathways.",
        points: [
          "Product search and category browsing.",
          "Mobile-brand and model-specific product listings.",
          "Featured products and additional product listings on the homepage.",
          "Wholesale messaging and customer-support pathways.",
        ],
      },
    },
    observedJourneys: [
      "Search the catalog using the mobile spare-parts search field.",
      "Browse parts through the visible category and mobile-brand navigation.",
      "Open product listings to review the displayed model and product information.",
    ],
    visibleExperienceChoices: [
      "Product discovery is exposed through search and category entry points.",
      "Visible catalog sections are organized around part type and mobile brand.",
      "Wholesale messaging is presented alongside retail product discovery.",
    ],
    verifiedOutcomes: [],
    evidenceNote: "This case study describes the current public storefront only. No sales, conversion, performance, or user-research results are claimed.",
    liveUrl: "https://mobile-studio-bgdht0n3a-zauras25s-projects.vercel.app/",
    gallery: [],
  }),
  workProjectSchema.parse({
    slug: "trailmix-local-discovery-concept",
    title: "TrailMix — local discovery concept",
    discipline: "ux-design",
    status: "published",
    isFeatured: true,
    displayOrder: 2,
    projectType: "Speculative UX/UI concept",
    summary:
      "A portfolio concept exploring how a local discovery app could help people find a nearby activity that fits their time, interests, and group.",
    role: "Self-initiated concept · UX/UI design",
    clientOrContext: "Fictional brief created for portfolio demonstration",
    visibilityLabel: "Concept project · not client work",
    services: ["Product discovery", "UX design", "Information architecture", "Wireframes", "UI concept"],
    objective:
      "Explore a clearer path from “what can we do nearby?” to a small set of relevant local activities, with enough detail to decide what to do next.",
    context:
      "This is a speculative concept based on an invented brief. The scenario assumes people may have limited time, mixed interests, and different group needs when choosing something nearby. Those assumptions have not been confirmed through research.",
    challenge:
      "Avoid making discovery feel like another endless feed. The concept focuses on narrowing options through a few practical choices, then showing useful details before asking someone to commit.",
    uxDesign: {
      discovery: {
        summary:
          "Started from a fictional portfolio brief, not client research. The initial assumptions were that people need quick ways to express available time, location, and activity preferences.",
        points: [
          "Defined the concept audience as people looking for a nearby activity, alone or with others.",
          "Recorded time, distance, group needs, and uncertainty about availability as assumptions to validate.",
          "No interviews, analytics review, or field research were conducted for this fictional concept.",
        ],
      },
      define: {
        summary:
          "Framed the experience around helping someone make a confident short-list, rather than browsing an unfiltered catalog.",
        points: [
          "Primary concept task: find and compare a few suitable activities nearby.",
          "Keep the first decision set lightweight: when, how far, and what kind of activity.",
          "Show practical decision details—duration, location, accessibility notes, and booking requirements—before an external action.",
        ],
      },
      sitemapAndIa: {
        summary:
          "Grouped the concept around discovery, activity details, saved ideas, and a simple profile area.",
        points: [
          "Explore: set a time window, area, and interest, then review a focused list or map.",
          "Activity detail: understand the experience, practical requirements, and next step.",
          "Saved: keep a short-list to compare or share with a group.",
          "Account features and booking are illustrative directions only; no backend or live service exists.",
        ],
      },
      wireframes: {
        summary:
          "Outlined the key screens before adding visual styling, with emphasis on progressive choices and useful activity information.",
        points: [
          "Explore entry with a clear location and activity prompt.",
          "Results state with filter controls, concise activity cards, and a map/list choice.",
          "Detail page that surfaces duration, distance, suitability, and booking context.",
          "Empty and no-results states that let a person broaden the search instead of restarting.",
        ],
      },
      uiDesign: {
        summary:
          "Developed a visual direction for an approachable local guide: calm neutral surfaces, a warm accent, clear type hierarchy, and distinct activity categories.",
        points: [
          "Prioritized readable activity cards and scannable practical details.",
          "Used category color as a supporting cue, not the only way to identify an activity.",
          "Considered loading, selected-filter, no-results, and saved states as part of the concept.",
        ],
      },
      designAudit: {
        summary:
          "Reviewed the proposed screens against the concept goals and common interface-quality checks. This was a self-review, not an independent audit.",
        points: [
          "Checked that filters and selected states are distinguishable.",
          "Checked content hierarchy for activity name, location, duration, and action.",
          "Flagged contrast, keyboard behavior, responsive layouts, and real content quality for validation in a future build.",
        ],
      },
      prototypeTesting: {
        summary:
          "No usability testing was conducted. Testing is a proposed next step, not a result of this concept.",
        points: [
          "Next validation step: ask representative people to find an activity for a specific time, distance, and group.",
          "Observe whether they can compare options and identify booking requirements without prompting.",
          "Revise the flow based on observed confusion; no success metrics or usability findings are claimed here.",
        ],
      },
      developerHandoff: {
        summary:
          "Outlined what a future handoff would need; this concept has not been implemented or delivered to a development team.",
        points: [
          "Document responsive behavior, filter states, empty states, and activity-detail content requirements.",
          "Define reusable activity-card and filter components after validating the information model.",
          "Confirm data source, availability, map, and booking integrations before estimating implementation.",
        ],
      },
    },
    observedJourneys: [],
    visibleExperienceChoices: [
      "Concept direction: choose a time window, distance, and activity interest before browsing.",
      "Concept direction: compare activity details before leaving for booking or directions.",
      "Concept direction: save or share a short-list when choosing with other people.",
    ],
    verifiedOutcomes: [],
    evidenceNote:
      "Fictional portfolio concept only—not commissioned client work, a live product, or a validated design. The brief and user needs are assumptions; no user interviews, usability tests, implementation, or outcome metrics are claimed.",
    gallery: [],
  }),
];

export const faqs = [
  {
    question: "What does a typical project engagement look like?",
    answer:
      "We start by understanding the audience, goals, available materials, and constraints. Then we confirm a written scope and move through the agreed design or development work, review, QA where relevant, and handoff. The exact steps depend on the service and package you choose.",
  },
  {
    question: "What UX/UI design work can you help with?",
    answer:
      "Depending on the agreed scope, UX/UI work can include discovery, defining priorities, sitemap and information architecture, wireframes, interface design, a clickable prototype, design review, and developer handoff. Research and usability testing are included only when they are explicitly part of the project scope.",
  },
  {
    question: "Can I request design only, development only, or both?",
    answer:
      "Yes. You can choose UX design, development from approved designs, or a combined design-and-development engagement. The Pricing page compares the available starting scopes for each option.",
  },
  {
    question: "How is my project price determined?",
    answer:
      "Prices on the Pricing page are one-time USD starting fees for the listed page, template, and deliverable limits. The final quote depends on the number of pages and unique layouts, readiness of designs and content, required interactions or integrations, and any additional research or features. We confirm the exact scope and fee in writing before work begins.",
  },
  {
    question: "What is included in a package, and what may cost extra?",
    answer:
      "Each package lists its page or template limits, deliverables, and design revision rounds. Work beyond those limits—including unlisted features, extra templates, custom backend systems, accounts, e-commerce, copywriting, or paid third-party services—is not automatically included and must be scoped and approved separately.",
  },
  {
    question: "How do design revision rounds work?",
    answer:
      "A revision round is one consolidated set of feedback on the presented design, followed by updates within the agreed direction. The number of rounds depends on the selected package. A new direction, additional feature, or substantial scope change may need a separate estimate and written approval.",
  },
  {
    question: "Can you build a website from designs my team already has?",
    answer:
      "Yes. Development can start from approved designs, provided the required screens, responsive behavior, content, and assets are ready or clearly listed in the scope. If important states or requirements are missing, we will identify them before confirming the build estimate.",
  },
  {
    question: "Do your packages automatically include a custom backend, accounts, or e-commerce?",
    answer:
      "No. These features are not automatically included in the listed starting packages. Share what the product needs to do and we can assess the technical requirements, dependencies, and a separate written scope and quote.",
  },
  {
    question: "What if I do not have a finished brief yet?",
    answer:
      "That is okay. You can start with the short guided conversation or email us directly; a sentence or two is enough to begin. If you already know more detail, the longer Project Discovery form lets you share goals, services, requirements, and references.",
  },
  {
    question: "When is a project considered booked, and how do we agree the scope?",
    answer:
      "An enquiry or discovery request is a lead, not an accepted project or binding quote. After reviewing fit and feasibility, we define the objective, deliverables, exclusions, assumptions, milestones and estimated timeline, price, revisions, approvals, dependencies, and client responsibilities in writing. Any change to agreed scope is reviewed for cost and schedule impact and approved before work changes. Work begins only after the agreement and payment terms are accepted; meeting times are confirmed separately.",
  },
  {
    question: "Can you guarantee search rankings or traffic?",
    answer:
      "No. SEO and website optimization work can address technical foundations, metadata, indexability, performance, accessibility, and content recommendations. Search rankings and traffic depend on external factors and are not guaranteed.",
  },
  {
    question: "Are the UX projects in the Work section client projects?",
    answer:
      "Each project is labeled with its context. TrailMix is a fictional, self-initiated UX concept—not commissioned client work or a validated product. Umer Mobile Parts is shown separately as a live personal development project; its case study does not claim that a UX process was carried out.",
  },
  {
    question: "Do you work with remote teams?",
    answer:
      "Yes. Rapidlyon is remote-first and works with founders and teams in different locations. We can collaborate with your existing product, marketing, and engineering stakeholders around the deliverables agreed for the project.",
  },
];

export const principles = [
  "Start with the user problem, not the trend.",
  "Design with clarity before complexity.",
  "Build digital experiences that stay honest and useful over time.",
  "Keep product decisions grounded in real constraints and business context.",
  "Ship work that is durable, accessible, and easy to evolve.",
];

export const processSteps = [
  { title: "Discover", text: "Understand the client, audience, problem, business model, desired outcomes, and constraints." },
  { title: "Qualify", text: "Review service fit, feasibility, dependencies, budget and timeline compatibility, and delivery capacity. A request is not accepted automatically." },
  { title: "Scope & estimate", text: "Define the objective, deliverables, exclusions, assumptions, milestones, estimated timeline, price, revisions, approvals, and client responsibilities." },
  { title: "Proposal & agreement", text: "Share the proposed work in writing. Agree change-request handling, agreement terms, and payment conditions before project activation." },
  { title: "Design & deliver", text: "Work through the approved design, development, or optimization scope with visible decisions and client communication." },
  { title: "Review & approve", text: "Review deliverables against the agreed scope, collect consolidated feedback, and resolve included revisions." },
  { title: "Launch & hand off", text: "Complete agreed launch tasks, transfer deliverables, and confirm any remaining dependencies." },
  { title: "Improve", text: "Discuss ongoing maintenance or iteration as a separately agreed next scope." },
];

export const insights = [
  {
    slug: "clarity-before-complexity",
    title: "Clarity before complexity: designing digital products people can trust",
    category: "Design thinking",
    readTime: "5 min read",
    excerpt: "A simple strategy for removing friction from product experiences before layering on new features.",
    content: [
      "When a product feels difficult, adding another feature is rarely the first useful move. Start by identifying the task a person came to complete, what they need to know at each step, and where uncertainty interrupts progress.",
      "Sketch the current journey as observable steps rather than assumptions about intent. Look for duplicate decisions, unexplained language, and points where users must remember information from elsewhere. Those are practical places to investigate before proposing a redesign.",
      "A clearer experience makes the next action understandable and gives people enough context to choose it. Keep the interface focused, test the flow with representative users, and treat new functionality as a response to evidence—not a substitute for it.",
    ],
  },
  {
    slug: "websites-that-convert-without-feeling-salesy",
    title: "Websites that convert without feeling salesy",
    category: "Web strategy",
    readTime: "4 min read",
    excerpt: "How to structure value, trust, and opportunity in a way that feels confident instead of crowded.",
    content: [
      "A useful business website helps visitors decide whether an offer fits their needs. State who it is for, what problem it addresses, and what happens next in plain language before asking for a commitment.",
      "Trust comes from answering reasonable questions: what is included, what is still unknown, how the work proceeds, and how to get in touch. Specific, verifiable details are more persuasive than inflated claims or decorative urgency.",
      "Give each page one clear next step and make the path easy to find. Then review the experience with people who do not already know the business; their questions reveal where the message needs clarification.",
    ],
  },
  {
    slug: "designing-for-mvp-clarity",
    title: "Designing for MVP clarity",
    category: "Product",
    readTime: "6 min read",
    excerpt: "What to prioritize when the product is small but the ambition is large.",
    content: [
      "An MVP is a way to test an important product assumption, not a smaller version of every planned feature. Define the intended user, the problem to test, and what observation would change the team's next decision.",
      "Map the smallest end-to-end journey that can answer that question. Include the necessary states—first use, invalid input, waiting, completion, and recovery—so a narrow release still feels coherent and usable.",
      "After release, collect feedback tied to the original assumption and distinguish observed behavior from interpretation. Keep, revise, or remove scope based on what the team learns, and make the next experiment explicit.",
    ],
  },
];

export const seoDefaults = {
  title: "Rapidlyon | Design with purpose. Build for impact.",
  description: siteConfig.description,
};

export const legalNote =
  "This content is provided for business communication and should be reviewed by legal counsel for final compliance and jurisdiction-specific requirements.";
