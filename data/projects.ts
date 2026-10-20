export interface Project {
  slug: string;
  title: string;
  subtitle: string;
  category: "Web Application" | "UI/UX & E-Commerce" | "Mobile & Architecture" | "Security & Research";
  categoryShort: string;
  year: string;
  featured: boolean;
  role: string;
  responsibilities: string[];
  tech: string[];
  heroImage: string;
  galleryImages: string[];
  summary: string;
  context: string;
  approach: string;
  challenge: string;
  solution: string;
  features: string[];
  metrics?: { label: string; value: string }[];
  liveUrl?: string | null;
  githubUrl?: string | null;
  status: "Live Production" | "Featured Project" | "Active Development" | "Research Capstone" | "Showcase Build";
}

export const projects: Project[] = [
  {
    slug: "snippets",
    title: "Snippets",
    subtitle: "A semantic knowledge vault for developers",
    category: "Web Application",
    categoryShort: "Developer Tool / AI",
    year: "2026",
    featured: true,
    role: "Product Design & Application Development",
    responsibilities: [
      "Designing a focused workspace for reusable code and technical notes",
      "Structuring snippets around technologies, collections, tags, and linked concepts",
      "Building a syntax-aware editor with Markdown and keyboard-first workflows",
      "Shaping semantic retrieval and note-grounded AI question answering"
    ],
    tech: ["pgvector", "RAG", "Semantic Search", "Knowledge Graph", "Syntax Highlighting"],
    heroImage: "/assets/snippets1.png",
    galleryImages: [
      "/assets/snippets3.png",
      "/assets/snippets4.png",
      "/assets/snippets8.png",
      "/assets/snippets9.png"
    ],
    summary: "A dark, developer-first knowledge vault that turns scattered code notes into a linked, searchable library. Snippets brings together a syntax-aware editor, technology collections, vector-powered semantic retrieval, and RAG-based answers grounded in a developer’s own notes.",
    context: "Useful code and technical explanations often disappear across chat threads, bookmarks, and documents. Even when saved, a flat list makes it difficult to rediscover a solution by the idea behind it or see how it relates to other notes.",
    approach: "The product pairs an editor for code and Markdown with technology collections, tags, mentions, and backlinks. A relationship graph makes connections visible, while pgvector-backed retrieval supports concept search and the beta Ask Your Notes experience.",
    challenge: "Make technical notes easy to retrieve by both language and meaning, while keeping the act of writing and organizing them fast enough to fit naturally into a developer’s workflow.",
    solution: "Build the vault around editable, language-aware snippets and connected collections, then layer semantic retrieval and RAG question answering over the saved knowledge so answers can draw from the user’s own notes.",
    features: [
      "Semantic search retrieves snippets by concept, not only by exact title or wording",
      "Beta Ask Your Notes uses RAG to answer questions from the saved knowledge base",
      "Mentions, backlinks, and a graph view connect related ideas across the vault",
      "Code editor includes Vim modes, multi-cursor editing, and syntax highlighting for 20+ languages",
      "Markdown support, autosaving, and keyboard-first controls keep note capture fluid",
      "Technology collections and tags make browsing a growing library straightforward",
      "The product presents privacy controls including row-level security and encryption"
    ],
    metrics: [
      { label: "Syntax Support", value: "20+ Languages" },
      { label: "Retrieval", value: "pgvector + RAG" },
      { label: "Product Version", value: "v1.2.0" }
    ],
    liveUrl: null,
    githubUrl: null,
    status: "Showcase Build"
  },
  {
    slug: "flowsy",
    title: "Flowsy",
    subtitle: "Mobile Personal Finance & Real-Time Cashflow Intelligence",
    category: "Mobile & Architecture",
    categoryShort: "Mobile / Backend",
    year: "2026",
    featured: true,
    role: "Mobile Engineering, Backend Architecture & Financial Logic",
    responsibilities: [
      "Cross-platform mobile application engineering using Expo and React Native",
      "Backend modular monolith development with NestJS and PostgreSQL 17",
      "Deterministic cashflow forecasting algorithm implementation ('Safe-to-Spend')",
      "High-precision monetary arithmetic with Decimal.js to prevent rounding drift"
    ],
    tech: ["React Native", "Expo", "NestJS", "Prisma", "PostgreSQL 17", "Decimal.js", "Docker", "TypeScript"],
    heroImage: "/assets/flowsy-engine-diagram.svg",
    galleryImages: [],
    summary: "A production-minded mobile personal finance application engineered for real-time cashflow predictability. Features the proprietary 'Safe-to-Spend' engine that dynamically deduces true spendable funds by factoring upcoming recurring commitments and loan obligations.",
    context: "Personal finance tools frequently overwhelm users with complex double-entry bookkeeping without answering the immediate question: 'How much can I safely spend today without defaulting on upcoming bills?' Flowsy was architected to solve this exact problem with extreme mathematical precision.",
    approach: "Built as a modular monolith in NestJS paired with PostgreSQL and Prisma ORM, Flowsy treats financial correctness as an uncompromisable priority. All monetary amounts enforce Decimal(14,2) precision, completely eliminating JavaScript floating-point errors.",
    challenge: "Handling complex recurring commitments (daily, weekly, monthly, annual) alongside liquid vs. illiquid accounts without causing double-counting when recurring expenses are partially fulfilled.",
    solution: "Engineered atomic PostgreSQL transactions (prisma.$transaction) that link bill fulfillment directly to liquid balance deductions while atomically marking commitment cycles as fulfilled.",
    features: [
      "Proprietary Safe-to-Spend real-time algorithm accounting for impending obligations",
      "Exact Decimal(14,2) arithmetic guaranteeing zero floating point inaccuracy",
      "Atomic transactions preventing partial state updates during balance deductions",
      "Multi-account categorization covering liquid cash, bank balances, and protected savings",
      "Argon2id password hashing, rotating JWT refresh tokens, and session replay mitigation",
      "Centralized observability with correlation IDs and sanitized performance logging"
    ],
    metrics: [
      { label: "Precision Guarantee", value: "Decimal(14,2)" },
      { label: "Entities Modeled", value: "7 Core Relational" },
      { label: "Architecture", value: "Modular Monolith" }
    ],
    liveUrl: null,
    githubUrl: "https://github.com/ziadayman00",
    status: "Active Development"
  },
  {
    slug: "workflow",
    title: "Workflow",
    subtitle: "Real-Time Team Collaboration & Project Orchestration Platform",
    category: "Web Application",
    categoryShort: "Web App / Full-Stack",
    year: "2025",
    featured: true,
    role: "Full-Stack Development, UI/UX Architecture & Interaction Design",
    responsibilities: [
      "End-to-end full stack architecture using Next.js App Router and Prisma",
      "Interactive drag-and-drop Kanban interface engineering with optimistic UI updates",
      "Database schema design with PostgreSQL for multi-tenant team management",
      "Refined typography-led design system built with Tailwind CSS"
    ],
    tech: ["Next.js", "TypeScript", "Prisma", "PostgreSQL", "Tailwind CSS", "Zustand"],
    heroImage: "/assets/workflow1.png",
    galleryImages: [
      "/assets/workflow1.png",
      "/assets/workflow2.png",
      "/assets/workflow3.png",
      "/assets/workflow4.png"
    ],
    summary: "A comprehensive team workspace and project orchestration platform designed to streamline task tracking, sprint management, and team collaboration through a responsive, distraction-free interface.",
    context: "Teams frequently suffer from clunky project management tools overburdened with enterprise clutter. Workflow was built with an editorial, highly focused visual direction that prioritizes readability, rapid task interaction, and keyboard accessibility.",
    approach: "Implemented a performant React architecture utilizing Next.js Server Components for initial payload speed, combined with focused client islands for the drag-and-drop Kanban board.",
    challenge: "Maintaining smooth 60fps drag-and-drop transitions while orchestrating server mutations across complex relational task dependencies.",
    solution: "Implemented optimistic client state updates with Zustand and Server Actions, providing instant visual feedback while persisting data reliably in PostgreSQL.",
    features: [
      "Smooth drag-and-drop Kanban boards with column reordering and status sync",
      "Granular role-based team management (Admins, Members, Guests)",
      "Priority categorization, milestone scheduling, and smart tag filtering",
      "Live activity stream tracking changes, assignment updates, and comments",
      "Clean monochromatic dark & light interface optimized for developer focus"
    ],
    metrics: [
      { label: "Deployment", value: "Vercel Production" },
      { label: "Type Safety", value: "100% TypeScript" },
      { label: "Database", value: "PostgreSQL & Prisma" }
    ],
    liveUrl: "https://workflow-tawny.vercel.app/",
    githubUrl: "https://github.com/ziadayman00/workflow",
    status: "Live Production"
  },
  {
    slug: "listed",
    title: "Listed",
    subtitle: "AI-Powered Natural Language Task Management System",
    category: "Web Application",
    categoryShort: "AI / Web App",
    year: "2025",
    featured: true,
    role: "Full-Stack Engineering & Conversational UI Design",
    responsibilities: [
      "Natural language processing task parsing interface design and implementation",
      "Multi-tenant database design using Supabase, Prisma ORM, and PostgreSQL",
      "Comprehensive administration and productivity analytics dashboard",
      "NextAuth authentication flow and session management"
    ],
    tech: ["Next.js", "Prisma", "PostgreSQL", "Supabase", "TypeScript", "Tailwind CSS"],
    heroImage: "/assets/listed1.png",
    galleryImages: [
      "/assets/listed1.png",
      "/assets/listed2.png",
      "/assets/listed3.png",
      "/assets/listed4.png",
      "/assets/listed5.png",
      "/assets/listed6.png",
      "/assets/listed7.png",
      "/assets/listed8.png"
    ],
    summary: "An intelligent task management system combining natural language input with structured project views, allowing users to rapidly generate, categorize, and complete tasks through chat or direct manipulation.",
    context: "Entering structured tasks into conventional task managers requires multiple clicks, dropdowns, and date pickers. Listed introduces conversational natural language comprehension to convert phrases like 'Review audit report by next Tuesday at 3pm with high priority' into structured task metadata.",
    approach: "Designed dual-mode interaction: users who prefer conversational workflows can input tasks via the assistant chat, while users who prefer tabular layouts can use the interactive matrix with full sorting and filtering.",
    challenge: "Parsing natural language input reliably while ensuring the resulting task adheres to strict relational schema constraints in PostgreSQL.",
    solution: "Built a structured parsing pipeline that validates extracted parameters against user project taxonomy before creating the database record, falling back gracefully to sensible defaults.",
    features: [
      "Conversational task generation interpreting context, deadlines, and urgency",
      "Dual input interface supporting chat commands and direct table editing",
      "Productivity analytics dashboard visualizing completion velocity and overdue rates",
      "Secure user authentication powered by NextAuth and Supabase auth",
      "Rich media attachments and tag taxonomies per project"
    ],
    metrics: [
      { label: "Interface Modes", value: "Conversational & Matrix" },
      { label: "Daily Capacity", value: "1,000+ Records" },
      { label: "Auth Layer", value: "NextAuth & Supabase" }
    ],
    liveUrl: null,
    githubUrl: "https://github.com/ziadayman00/listed",
    status: "Featured Project"
  },
  {
    slug: "skillify",
    title: "Skillify",
    subtitle: "Interactive Video Learning Platform & Course Engine",
    category: "Web Application",
    categoryShort: "E-Learning / Video",
    year: "2025",
    featured: true,
    role: "Full-Stack Development, Database Schema & Interface Design",
    responsibilities: [
      "Custom video player integration with lesson progress synchronization",
      "Dynamic PDF certificate generation engine on course completion",
      "Faceted course search with category filters and instructor management",
      "Relational database architecture for progress, enrollments, and reviews"
    ],
    tech: ["Next.js", "Prisma", "PostgreSQL", "TypeScript", "Tailwind CSS"],
    heroImage: "/assets/skillify1.png",
    galleryImages: [
      "/assets/skillify1.png",
      "/assets/skillify2.png",
      "/assets/skillify3.png",
      "/assets/skillify4.png",
      "/assets/skillify5.png",
      "/assets/skillify6.png"
    ],
    summary: "A full-scale video education platform offering expert-led digital courses, structured curricula, downloadable companion assets, dynamic certificate issuance, and lifelong progress tracking.",
    context: "Modern learners require distraction-free interfaces where the video lesson remains the undisputed focus, while retaining immediate access to syllabus navigation, notes, and downloadable code assets.",
    approach: "Architected with Next.js App Router to deliver instant initial page loads and seamless client-side navigation between course modules without video interruption.",
    challenge: "Tracking precise student playback positions across multiple device sessions while generating shareable completion certificates dynamically.",
    solution: "Engineered lightweight heartbeat playback state sync and dynamic server-side certificate generation utilizing vector SVG templates converted on demand.",
    features: [
      "HD video lesson playback with resume capability and playback speed controls",
      "Automated verified certificate generation upon completing 100% syllabus requirements",
      "Searchable catalog with instant multi-facet category filters",
      "Downloadable project files, reference notes, and code repositories",
      "Student account dashboard showing completion percentages and enrolled programs"
    ],
    metrics: [
      { label: "Deployment", value: "Vercel Production" },
      { label: "Content Support", value: "HD Video & Assets" },
      { label: "Certificate Engine", value: "Dynamic Vector Issuance" }
    ],
    liveUrl: "https://learning-platform-dbdw.vercel.app",
    githubUrl: "https://github.com/ziadayman00/learning-platform",
    status: "Live Production"
  },
  {
    slug: "svelt",
    title: "Svelt",
    subtitle: "High-End Editorial Fashion E-Commerce Boutique",
    category: "UI/UX & E-Commerce",
    categoryShort: "Editorial / E-Commerce",
    year: "2025",
    featured: false,
    role: "Visual Direction, Interface Design & Frontend Engineering",
    responsibilities: [
      "Art-directed editorial layout design inspired by luxury publications",
      "Responsive fluid typography scaling across mobile and desktop displays",
      "Interactive cart drawer and smooth product variant selection",
      "Optimized media delivery and hover zoom states"
    ],
    tech: ["React", "Tailwind CSS", "Vite", "Responsive Design"],
    heroImage: "/assets/svelt.png",
    galleryImages: ["/assets/svelt.png"],
    summary: "An editorial e-commerce showcase for a luxury apparel label, combining high-fashion typography, generous whitespace, and frictionless browsing to elevate digital garment presentation.",
    context: "Most retail web experiences follow monotonous product card grids. Svelt was crafted as an interactive digital lookbook where photography and typography command visual attention.",
    approach: "Utilized fluid typographic tokens and high-contrast composition to establish a distinct brand voice while keeping the checkout flow simple and transparent.",
    challenge: "Presenting high-resolution editorial photography without causing layout shifts or sluggish scrolling on mobile devices.",
    solution: "Implemented fixed aspect-ratio containers, progressive image loading, and CSS hardware-accelerated transforms on interactive hover states.",
    features: [
      "Editorial lookbook aesthetics with generous whitespace and refined typography",
      "Slide-out cart drawer with instantaneous quantity and price calculations",
      "Subtle hover zoom interactions that respect reduced-motion settings",
      "Zero cumulative layout shift across viewport transitions"
    ],
    metrics: [
      { label: "Performance", value: "Fast Load Time" },
      { label: "Layout Shift", value: "0 CLS" },
      { label: "Design Style", value: "Luxury Editorial" }
    ],
    liveUrl: "https://svelt-one.vercel.app",
    githubUrl: "https://github.com/ziadayman00/svelt",
    status: "Showcase Build"
  },
  {
    slug: "fitrush",
    title: "FitRush",
    subtitle: "Athletic Lifestyle & High-Performance Fitness Platform",
    category: "Web Application",
    categoryShort: "Web Experience",
    year: "2025",
    featured: false,
    role: "Frontend Development & Interaction Design",
    responsibilities: [
      "High-contrast editorial interface development",
      "Interactive training schedule and class categorization",
      "Responsive layout system designed for mobile athletes"
    ],
    tech: ["React", "Tailwind CSS", "CSS Animations", "Vite"],
    heroImage: "/assets/fitrush.png",
    galleryImages: ["/assets/fitrush.png"],
    summary: "A dynamic web presence for an athletic training collective, engineered with bold typography, interactive class schedules, and seamless membership inquiry pathways.",
    context: "Fitness platforms need to communicate energy and precision without overwhelming users with cluttered navigation or intrusive marketing popups.",
    approach: "Combined bold display typography with clean architectural grid lines to convey power and discipline, guiding prospective members intuitively toward schedule discovery.",
    challenge: "Organizing multiple training disciplines and recurring weekly time slots into an intuitive mobile view.",
    solution: "Designed a lightweight tabbed schedule component with instant day-of-week switching and direct registration prompts.",
    features: [
      "High-contrast bold editorial aesthetics",
      "Interactive training program and trainer schedule browser",
      "Membership tier comparison with clear value props",
      "Fast, responsive layout optimized for mobile screens"
    ],
    metrics: [
      { label: "Framework", value: "React & Tailwind" },
      { label: "Deployment", value: "Vercel Production" },
      { label: "Speed", value: "Instant Navigation" }
    ],
    liveUrl: "https://fit-rush.vercel.app",
    githubUrl: null,
    status: "Showcase Build"
  },
  {
    slug: "anti-phishing",
    title: "Anti-Phishing Detection Engine",
    subtitle: "Machine Learning Cybersecurity URL Analysis Platform",
    category: "Security & Research",
    categoryShort: "Cybersecurity / ML",
    year: "2025",
    featured: false,
    role: "Frontend Interface, Heuristic Visualization & Graduation Capstone",
    responsibilities: [
      "Interactive heuristic dashboard for inspecting suspicious URLs",
      "Visual score breakdown explaining risk weights and lexical features",
      "Integration with machine learning inference API endpoints"
    ],
    tech: ["React", "Tailwind CSS", "Python ML API", "Cybersecurity Heuristics"],
    heroImage: "/assets/anti.png",
    galleryImages: ["/assets/anti.png"],
    summary: "An interactive cybersecurity tool developed as a university graduation capstone, analyzing and scoring suspicious URLs using machine learning heuristics and lexical entropy examination.",
    context: "Phishing attacks remain the #1 attack vector online. Many detection engines output simple pass/fail flags without explaining the underlying risk signals to security analysts or end-users.",
    approach: "Built a diagnostic dashboard that breaks down lexical features (homoglyph attacks, unnatural subdomain counts, IP-based domains, entropy levels) alongside machine-learning model confidence scores.",
    challenge: "Rendering multi-factor security scoring in a format that is immediately actionable for everyday users while still detailed enough for technical evaluation.",
    solution: "Created an intuitive risk-tier gauge complemented by expandable diagnostic cards explaining each flagged signal in plain language.",
    features: [
      "Real-time URL lexical feature parsing and domain decomposition",
      "Machine learning classification with probability confidence scoring",
      "Transparent diagnostic breakdowns highlighting specific risk signals",
      "Clean monochromatic dashboard keeping focus on data legibility"
    ],
    metrics: [
      { label: "Project Type", value: "Graduation Capstone" },
      { label: "Heuristics", value: "Lexical & ML Analysis" },
      { label: "Stack", value: "React + Python API" }
    ],
    liveUrl: null,
    githubUrl: null,
    status: "Research Capstone"
  },
  {
    slug: "furni",
    title: "Furni",
    subtitle: "Architectural Interior & Modern Furniture Showcase",
    category: "UI/UX & E-Commerce",
    categoryShort: "Interior / Showcase",
    year: "2024",
    featured: false,
    role: "Frontend Development & Responsive Interface Design",
    responsibilities: [
      "Clean architectural grid design emphasizing product materials",
      "Lightweight frontend implementation without heavy library overhead",
      "Responsive navigation and layout optimization across devices"
    ],
    tech: ["React", "Modern CSS", "JavaScript", "Responsive Design"],
    heroImage: "/assets/furni.png",
    galleryImages: ["/assets/furni.png"],
    summary: "A modern furniture catalog and interior design showcase focused on material textures, clean geometry, and spatial harmony.",
    context: "Interior design platforms demand extreme restraint; the interface must quietly recede to allow material craft and spatial photography to take center stage.",
    approach: "Constructed with strict alignment rules, subtle hairline dividers, and natural whitespace to replicate the tactile feeling of an architectural monograph.",
    challenge: "Ensuring catalog browsing remains swift and enjoyable without complex e-commerce bloat.",
    solution: "Streamlined component hierarchy with native CSS grid and flexbox, delivering lightweight, instant rendering.",
    features: [
      "Architectural grid layout presenting furniture pieces in context",
      "Material and dimension specification panels",
      "Responsive layout adapting cleanly from phone to large desktop",
      "Clean typography and subdued neutral palette"
    ],
    metrics: [
      { label: "Year", value: "2024" },
      { label: "Deployment", value: "Vercel Production" },
      { label: "Focus", value: "Spatial Typography" }
    ],
    liveUrl: "https://furni-pearl-two.vercel.app",
    githubUrl: "https://github.com/ziadayman00/furni",
    status: "Showcase Build"
  }
];

export function getProjectBySlug(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}

export function getFeaturedProjects(): Project[] {
  return projects.filter((p) => p.featured);
}
