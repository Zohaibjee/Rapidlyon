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

export type Project = {
  slug: string;
  title: string;
  type: string;
  summary: string;
  role: string;
  services: string[];
  stack: string[];
  objective: string;
  problem: string;
  process: string[];
  decisions: string[];
  implementation: string[];
  liveUrl?: string;
  label: string;
};

export const siteConfig = {
  brand: "Rapidlyon",
  description: "Rapidlyon designs clear digital experiences and builds modern websites and products for ambitious teams.",
  url: process.env.NEXT_PUBLIC_SITE_URL || "https://rapidlyon.com",
  email: "hello@rapidlyon.com",
  address: "Remote-first studio working with founders and teams worldwide.",
  navigation: [
    { label: "Work", href: "/work" },
    { label: "Services", href: "/services" },
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
    slug: "nextjs-development",
    title: "Next.js Development",
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
      "We help early-stage teams turn ideas into clear product experiences, validate priority flows, and ship a working MVP that is ready for real use.",
    audience: "Startups and product teams validating demand, testing user journeys, and preparing for a stronger product iteration cycle.",
    problems: [
      "The product idea is promising but the experience still needs a sharper user story and clearer flow.",
      "A team is stretching too many features into one first release.",
      "There is pressure to build fast without losing product clarity or usability.",
    ],
    deliverables: [
      "Product flow definitions and MVP scoping",
      "UX and interface design for critical journeys",
      "Frontend implementation and essential integrations",
      "Launch-ready experience with room for iteration",
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
    short: "Strategic redesigns that improve clarity, conversion, and the experience behind the brand.",
    description:
      "We audit an existing website, identify friction in the user journey, and redesign the experience to feel more current, easier to navigate, and more aligned with the business.",
    audience: "Organizations with an existing website that needs strategic improvement, clearer messaging, and better conversion performance.",
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
  {
    slug: "umer-mobile-parts",
    title: "Umer Mobile Parts",
    type: "Live e-commerce storefront",
    summary:
      "A live wholesale and retail storefront for mobile spare parts, with product search, category browsing, brand navigation, and featured products.",
    role: "Independent personal project",
    services: ["E-commerce", "Web Development"],
    stack: [],
    objective:
      "Help shoppers find mobile spare parts through product categories, mobile brands, and model-specific product listings.",
    problem:
      "The public storefront focuses on mobile repair parts and presents both retail product browsing and wholesale messaging.",
    process: [
      "Search the catalog using the mobile spare-parts search field",
      "Browse parts through the visible category and mobile-brand navigation",
      "Open product listings to review the displayed model and product information",
    ],
    decisions: [
      "Expose product discovery through search and category entry points",
      "Organize visible catalog sections around part type and mobile brand",
      "Surface wholesale messaging alongside retail product discovery",
    ],
    implementation: [
      "Live public storefront with product, category, and brand browsing",
      "Featured products and additional product listings on the homepage",
      "Wholesale and customer-support pathways presented on the storefront",
    ],
    liveUrl: "https://mobile-studio-bgdht0n3a-zauras25s-projects.vercel.app/",
    label: "Live personal project",
  },
];

export const faqs = [
  {
    question: "What does a typical project engagement look like?",
    answer:
      "Most engagements begin with discovery and project framing, then move into design, implementation, QA, and launch support. We keep collaboration transparent and practical throughout the process.",
  },
  {
    question: "How long does a website or product project usually take?",
    answer:
      "Timelines depend on scope, number of pages, and complexity. A focused marketing site may take a few weeks, while a more involved product or redesign may take longer and can be planned in phases.",
  },
  {
    question: "Do you work with in-house teams or external stakeholders?",
    answer:
      "Yes. We often work alongside founders, marketing teams, product teams, and developers who need a design and implementation partner to move work forward efficiently.",
  },
  {
    question: "Can you help with both strategy and implementation?",
    answer:
      "Yes. Rapidlyon is structured to cover UX thinking, interface design, and implementation, so the work moves from concept to a usable product without unnecessary handoff friction.",
  },
  {
    question: "Is there a minimum project size?",
    answer:
      "We’re open to projects that are strategic and meaningful. The right fit depends on the goals, timeline, and complexity of the work.",
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
  { title: "Discover", text: "We align around the opportunity, audience, and business context before ideas become screens." },
  { title: "Plan", text: "We define flows, scope, priorities, and the roadmap for the design and build work." },
  { title: "Design", text: "We shape the interaction model, content hierarchy, and visual direction in a practical way." },
  { title: "Build", text: "We turn the approved design into a responsive, maintainable web experience." },
  { title: "QA", text: "We review quality, accessibility, interactions, and content readiness before launch." },
  { title: "Launch", text: "We support final delivery, handoff, and a smooth transition into ongoing iteration." },
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
