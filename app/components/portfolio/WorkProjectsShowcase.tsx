"use client";

import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { ArrowUpRight, ChevronRight, ExternalLink, Eye, Github, X } from "lucide-react";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { workProjects } from "@/content/portfolio";

type ProjectFeature = {
  title: string;
  description: string;
};

type Project = {
  id: string;
  number: string;
  title: string;
  tagline: string;
  description: string;
  category: string;
  overview: string;
  role: string;
  year: string;
  technologies: string[];
  highlight: string;
  image: string;
  liveLink: string;
  githubLink: string;
  features: ProjectFeature[];
  caseStudy: {
    brief: string;
    challenge: string;
    solution: string;
    outcome: string;
    duration: string;
    audience: string;
    research: string[];
    decisions: { title: string; description: string }[];
    sections: {
      kicker: string;
      title: string;
      body: string;
      imageLabel: string;
      imageCaption: string;
    }[];
    learnings: string[];
    screens: { label: string; caption: string }[];
  };
  results: {
    metric: string;
    label: string;
    description: string;
  };
};

type ProjectCardProps = {
  project: Project;
  isActive: boolean;
  onClick: () => void;
  onPointerMove: (event: React.PointerEvent<HTMLButtonElement>) => void;
  onPointerEnter: () => void;
  onPointerLeave: () => void;
};

const caseStudyCopy = [
  {
    brief: "A focused save-and-retrieve workspace for people who collect references, tools, and learning links across many projects.",
    challenge: "Saved links quickly become a junk drawer when tagging, categories, and search are treated as secondary details.",
    solution: "I shaped the app around a clean dashboard, quick creation flow, secure accounts, and filters that make finding older links feel immediate.",
    outcome: "The final experience feels like a personal knowledge shelf: fast to update, easy to scan, and calm enough to use every day.",
    duration: "3 weeks",
    audience: "Students, builders, and researchers saving high-volume references.",
    research: [
      "Users save links from many contexts, but rarely remember the exact title later.",
      "Categories are useful only when paired with lightweight tags and search.",
      "The add-link flow must stay fast enough to use mid-task.",
    ],
    decisions: [
      { title: "Search First", description: "The dashboard favors fast retrieval with title, tag, and category cues visible together." },
      { title: "Low-Friction Capture", description: "The creation flow asks for only the details needed to make the link useful later." },
      { title: "Personal Structure", description: "Favorites, tags, and categories give users multiple ways back into the same archive." },
    ],
    sections: [
      {
        kicker: "Idea",
        title: "A calmer way to save useful resources.",
        body: "The idea started from a common portfolio-builder problem: useful links are scattered across chats, bookmarks, docs, and notes. LinkVault turns that mess into one focused workspace where every saved item has enough context to be found again.",
        imageLabel: "Capture Flow",
        imageCaption: "A quick save pattern reduces the effort needed to add a useful link while working.",
      },
      {
        kicker: "Execution",
        title: "Designing around retrieval, not storage.",
        body: "Instead of treating categories as decoration, the interface makes category, tag, favorite, and search states visible in the dashboard. The result is a product that feels useful after the archive grows, not only when it is empty.",
        imageLabel: "Library System",
        imageCaption: "The card system keeps metadata visible without making the dashboard feel heavy.",
      },
    ],
    learnings: [
      "A personal productivity tool succeeds when the second visit is faster than the first.",
      "Search, tags, and categories need to work as one system rather than separate features.",
    ],
    screens: [
      { label: "Dashboard", caption: "Saved links grouped with category and tag context." },
      { label: "Quick Save", caption: "A lightweight entry flow for dropping in references without friction." },
      { label: "Library View", caption: "Search, favorites, and filters keep the archive useful." },
    ],
  },
  {
    brief: "An AI review dashboard that turns pasted code into practical review notes, rewrite suggestions, and performance guidance.",
    challenge: "Most code review tools either feel too heavy for solo work or return notes without enough structure to act on.",
    solution: "I designed review modes, history, copy/download actions, and a dashboard flow that makes AI feedback easier to compare and reuse.",
    outcome: "The app becomes a second-pass reviewer for early projects, helping spot issues while keeping the developer in control.",
    duration: "4 weeks",
    audience: "Solo developers and students who want structured feedback before sharing code.",
    research: [
      "AI feedback becomes more useful when the user can choose the review intent.",
      "Long unstructured responses are hard to act on during active development.",
      "History matters because reviews often become a reference while refactoring.",
    ],
    decisions: [
      { title: "Mode-Based Review", description: "Deep, rewrite, and performance paths make the AI output feel intentional instead of generic." },
      { title: "Actionable Output", description: "The result view groups findings so users can copy, download, or revisit feedback quickly." },
      { title: "Human Control", description: "The interface keeps the developer in charge by making every AI suggestion inspectable." },
    ],
    sections: [
      {
        kicker: "Problem",
        title: "AI review needed a clearer shape.",
        body: "The goal was not just to call an AI model. The product needed to turn broad model output into a review experience that feels understandable, repeatable, and useful while someone is actively coding.",
        imageLabel: "Review Console",
        imageCaption: "The primary screen keeps input, mode selection, and the core action close together.",
      },
      {
        kicker: "Execution",
        title: "From pasted code to reusable feedback.",
        body: "I built the flow around review modes, structured feedback, and history preservation. This makes the tool feel less like a one-off chatbot and more like a lightweight review workspace for repeated use.",
        imageLabel: "Findings View",
        imageCaption: "Outputs are framed as decisions and next steps rather than a wall of generated text.",
      },
    ],
    learnings: [
      "AI features need product structure around them or the experience becomes noisy.",
      "For developer tools, clarity and control matter more than visual drama.",
    ],
    screens: [
      { label: "Review Console", caption: "Code input and mode selection stay visible and direct." },
      { label: "AI Findings", caption: "Feedback is grouped into issues, suggestions, and improvements." },
      { label: "History", caption: "Past reviews can be revisited, copied, or exported." },
    ],
  },
  {
    brief: "A task and analytics product for turning daily work into organized lists, subtasks, categories, and progress signals.",
    challenge: "Task apps often split planning and reflection, forcing users to manage work in one place and understand progress elsewhere.",
    solution: "I combined CRUD task management, calendar views, labels, advanced filters, and visual analytics in one responsive workspace.",
    outcome: "Tickure gives users a practical command center for planning, reviewing, and improving personal productivity habits.",
    duration: "5 weeks",
    audience: "Individuals managing recurring tasks, deadlines, categories, and daily priorities.",
    research: [
      "Users need a fast daily task view before they care about analytics.",
      "Subtasks and labels help only when they do not slow down task creation.",
      "Calendar context makes upcoming work feel less abstract.",
    ],
    decisions: [
      { title: "Planning + Reflection", description: "Tasks, calendar, filters, and analytics live in the same product flow." },
      { title: "Scannable States", description: "Labels and completion states are designed for quick visual parsing." },
      { title: "Progress Signals", description: "Charts translate everyday task activity into useful feedback." },
    ],
    sections: [
      {
        kicker: "Idea",
        title: "A task system that shows what changed.",
        body: "Tickure was shaped around a simple question: after a week of tasks, can the product help users understand how their work actually moved? That led to combining planning surfaces with analytics instead of separating them.",
        imageLabel: "Task Board",
        imageCaption: "The daily workspace keeps task actions direct while preserving category context.",
      },
      {
        kicker: "Execution",
        title: "Making productivity visible.",
        body: "I added calendar views, filters, subtasks, and analytics so the product could support both immediate action and later reflection. The interface stays practical because the dashboard is built around repeated daily use.",
        imageLabel: "Analytics Layer",
        imageCaption: "Progress visuals reveal patterns without forcing users into a separate reporting tool.",
      },
    ],
    learnings: [
      "Productivity tools need strong defaults because users will not configure everything upfront.",
      "Analytics are most valuable when they answer a practical next-action question.",
    ],
    screens: [
      { label: "Task Board", caption: "A clean list-first surface for creating and updating work." },
      { label: "Calendar", caption: "Date-based planning brings upcoming tasks into view." },
      { label: "Analytics", caption: "Charts reveal completion patterns and category load." },
    ],
  },
  {
    brief: "A full e-commerce experience covering discovery, product browsing, cart behavior, and admin management.",
    challenge: "Commerce projects need many small states to feel believable: search, filters, cart updates, authentication, and admin controls.",
    solution: "I built the storefront and admin flows with product management, sorting, filtering, and a responsive shopping experience.",
    outcome: "Snapsack demonstrates a complete marketplace foundation that can grow into checkout and inventory workflows.",
    duration: "4 weeks",
    audience: "Shoppers and store operators using a small catalog commerce flow.",
    research: [
      "Commerce credibility comes from many small interactions working reliably.",
      "Users expect filtering and sorting to feel immediate before they commit to browsing.",
      "Admin flows need to be boring, predictable, and hard to misuse.",
    ],
    decisions: [
      { title: "Storefront First", description: "The browsing experience focuses on product discovery, filtering, and cart confidence." },
      { title: "Admin Control", description: "Management flows are separated so operators can maintain the catalog without touching customer UI." },
      { title: "Checkout-Ready Base", description: "The system is structured so payment and inventory workflows can be added later." },
    ],
    sections: [
      {
        kicker: "Problem",
        title: "A believable commerce product needs complete flow coverage.",
        body: "The project was built to demonstrate more than product cards. It needed authentication, search, sorting, filtering, cart behavior, and admin controls working together as one product foundation.",
        imageLabel: "Storefront",
        imageCaption: "The browsing surface gives users familiar product discovery controls.",
      },
      {
        kicker: "Execution",
        title: "Connecting customer and admin experiences.",
        body: "I split the work into storefront and management concerns, then connected them through shared product data. That helped keep shopping interactions polished while still supporting catalog operations.",
        imageLabel: "Admin Flow",
        imageCaption: "Admin screens prioritize predictable management over decorative interface patterns.",
      },
    ],
    learnings: [
      "Commerce UI depends on trust built through many small, consistent states.",
      "Admin tools should be quieter and denser than customer-facing screens.",
    ],
    screens: [
      { label: "Storefront", caption: "Product cards, filtering, and browsing built for quick scanning." },
      { label: "Cart Flow", caption: "Cart actions keep shopping state clear and predictable." },
      { label: "Admin", caption: "Management screens support product and catalog control." },
    ],
  },
];

const projects: Project[] = workProjects.map((project, index) => ({
  id: project.title.toLowerCase().replace(/\s+/g, "-"),
  number: project.num,
  title: project.title,
  tagline: project.subtitle,
  description: project.desc,
  category: index === 1 ? "AI Tool" : index === 3 ? "Commerce" : "Product",
  overview: project.desc,
  role: project.rolenote,
  year: "2026",
  technologies: project.stack
    .replaceAll("Â", "")
    .split("·")
    .map((item) => item.trim())
    .filter(Boolean),
  highlight: project.subtitle,
  image: project.image,
  liveLink: project.liveLink,
  githubLink: project.githubLink,
  features: [
    { title: "Product UX", description: "A compact dashboard flow tuned for the main user action." },
    { title: "Secure Core", description: "Authentication, protected routes, and persistent data handling." },
    { title: "Responsive Polish", description: "Layouts and controls shaped for desktop and mobile use." },
  ],
  caseStudy: caseStudyCopy[index],
  results: {
    metric: "01",
    label: "Solo Build",
    description: project.rolenote,
  },
}));

function ProjectCard({ project, isActive, onClick, onPointerMove, onPointerEnter, onPointerLeave }: ProjectCardProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      onPointerMove={onPointerMove}
      onPointerEnter={onPointerEnter}
      onPointerLeave={onPointerLeave}
      className="group relative block cursor-pointer select-none text-left transition-all duration-300 focus:outline-none"
      aria-label={`View detailed case study for ${project.title}`}
      onKeyDown={(event) => {
        if (event.key === "Enter" || event.key === " ") {
          event.preventDefault();
          onClick();
        }
      }}
    >
      <div className="pointer-events-none absolute left-1/2 top-0 z-10 flex -translate-x-1/2 flex-col items-center">
        <div className="h-2 w-0.5 bg-ink/35" />
        <div className="flex h-6 w-[18px] items-center justify-center rounded-[3px] border border-black/10 bg-ink shadow-[0_8px_18px_-12px_var(--ink)]">
          <div className="h-1.5 w-1.5 rounded-full bg-paper/85" />
        </div>
      </div>

      <div
        className={`relative mt-8 flex w-64 flex-col gap-3 overflow-hidden rounded-2xl border bg-white p-4 shadow-[0_10px_30px_rgba(0,0,0,0.04)] transition-all duration-500 group-hover:shadow-[0_22px_55px_rgba(26,24,20,0.14)] sm:w-72 ${
          isActive
            ? "scale-105 border-ink ring-2 ring-ink/10 group-hover:border-ink/80"
            : "scale-95 border-border opacity-80 contrast-[0.95]"
        }`}
      >
        <div className="aspect-[4/3] w-full overflow-hidden rounded-[18px] border border-border bg-muted">
          <img
            src={project.image}
            alt={`${project.title} dashboard interface preview`}
            loading="eager"
            className="h-full w-full select-none rounded-[18px] object-cover transition-transform duration-500 group-hover:scale-105"
            draggable={false}
          />
        </div>

        <div className="flex flex-col gap-1.5 pt-1">
          <div className="flex items-center justify-between font-mono text-[11px] font-bold uppercase tracking-wider text-muted-foreground">
            <span>{project.number}</span>
            <span>{project.category}</span>
          </div>

          <div className="mt-1 flex items-center justify-between gap-2">
            <h3 className="font-display text-lg font-bold leading-tight tracking-tight text-ink">{project.title}</h3>
            <span className="rounded-full border border-border bg-muted p-1 text-ink transition-colors duration-300 group-hover:bg-ink group-hover:text-paper">
              <ArrowUpRight size={14} className="stroke-[2.5]" />
            </span>
          </div>

          <p className="line-clamp-2 text-xs leading-relaxed text-muted-foreground">{project.description}</p>
        </div>
      </div>
    </button>
  );
}

function ProjectCaseStudyModal({ project, onClose }: { project: Project | null; onClose: () => void }) {
  const modalScrollRef = useRef<HTMLDivElement>(null);
  const closeTimerRef = useRef<number | null>(null);
  const [isClosing, setIsClosing] = useState(false);

  useEffect(() => {
    if (!project) return;

    setIsClosing(false);
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") requestClose();
    };
    const html = document.documentElement;
    const body = document.body;
    const previousHtmlOverflow = html.style.overflow;
    const previousBodyOverflow = body.style.overflow;
    const lenis = (window as unknown as { __lenis?: { stop?: () => void; start?: () => void } }).__lenis;

    html.style.overflow = "hidden";
    body.style.overflow = "hidden";
    lenis?.stop?.();
    window.addEventListener("keydown", handleKeyDown);
    modalScrollRef.current?.scrollTo({ top: 0 });

    return () => {
      if (closeTimerRef.current) window.clearTimeout(closeTimerRef.current);
      html.style.overflow = previousHtmlOverflow;
      body.style.overflow = previousBodyOverflow;
      lenis?.start?.();
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [project]);

  const requestClose = () => {
    if (isClosing) return;

    setIsClosing(true);
    closeTimerRef.current = window.setTimeout(() => {
      onClose();
    }, 240);
  };

  if (!project) return null;

  return (
    <div
      className={`fixed inset-0 z-[100] overflow-hidden bg-ink/45 px-3 pb-0 pt-3 text-ink backdrop-blur-md sm:px-6 sm:pb-0 sm:pt-6 ${
        isClosing ? "animate-case-study-backdrop-out" : "animate-case-study-backdrop-in"
      }`}
      role="dialog"
      aria-modal="true"
      onWheel={(event) => event.stopPropagation()}
      onTouchMove={(event) => event.stopPropagation()}
    >
      <div
        ref={modalScrollRef}
        className={`case-study-scrollbar h-[calc(100dvh-0.75rem)] overflow-y-auto overscroll-contain rounded-t-[28px] rounded-b-none border border-b-0 border-white/35 bg-[#F6F3EC] shadow-[0_35px_90px_rgba(0,0,0,0.28)] sm:h-[calc(100dvh-1.5rem)] [clip-path:inset(0_round_28px_28px_0_0)] ${
          isClosing ? "animate-case-study-panel-out" : "animate-case-study-panel-in"
        }`}
      >
        <div className="sticky top-0 z-20 flex items-center justify-between gap-4 rounded-t-[28px] border-b border-ink/10 bg-[#F6F3EC]/88 px-5 py-4 backdrop-blur-xl sm:px-8">
          <div className="min-w-0">
            <p className="font-mono text-[10px] font-bold uppercase tracking-[0.22em] text-muted-foreground">{project.number} / Case Study</p>
            <h3 className="truncate font-display text-2xl font-black tracking-tight sm:text-4xl">{project.title}</h3>
          </div>
          <button
            type="button"
            onClick={requestClose}
            className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-ink/15 bg-white/70 text-ink shadow-sm transition hover:border-ink/40 hover:bg-ink hover:text-paper focus:outline-none focus:ring-2 focus:ring-ink"
            aria-label="Close case study"
          >
            <X size={18} />
          </button>
        </div>

        <article className="mx-auto max-w-7xl px-5 py-8 sm:px-8 lg:py-12">
          <section className="grid gap-8 lg:grid-cols-[1.08fr_0.92fr] lg:items-center">
            <div className="group/modal-image relative overflow-hidden rounded-[26px] border border-ink/15 bg-white p-3 shadow-[0_24px_70px_rgba(26,24,20,0.12)] transition duration-500 hover:-translate-y-1 hover:border-vermillion/45 hover:shadow-[0_32px_85px_rgba(26,24,20,0.17)]">
              <div className="overflow-hidden rounded-[18px]">
                <img src={project.image} alt={`${project.title} main interface`} className="aspect-[16/10] w-full object-cover transition duration-700 group-hover/modal-image:scale-[1.035] group-hover/modal-image:saturate-[1.08]" />
                <div className="pointer-events-none absolute inset-3 rounded-[18px] bg-[linear-gradient(115deg,transparent_0%,rgba(255,255,255,0.38)_44%,transparent_58%)] opacity-0 transition duration-700 group-hover/modal-image:translate-x-full group-hover/modal-image:opacity-100" />
              </div>
            </div>

            <div className="space-y-7">
              <div className="flex flex-wrap gap-2">
                {project.technologies.map((tech) => (
                  <span key={tech} className="rounded-full border border-ink/10 bg-white/70 px-3 py-1 font-mono text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
                    {tech}
                  </span>
                ))}
              </div>
              <div>
                <p className="font-mono text-[10px] font-bold uppercase tracking-[0.24em] text-muted-foreground">Project Overview</p>
                <h4 className="mt-3 font-display text-3xl font-black leading-tight tracking-tight sm:text-5xl">{project.tagline}</h4>
                <p className="mt-5 text-lg font-medium leading-relaxed text-ink/78">{project.caseStudy.brief}</p>
              </div>
              <div className="grid gap-3 sm:grid-cols-3">
                {[
                  ["Role", project.role],
                  ["Timeline", project.caseStudy.duration],
                  ["Audience", project.caseStudy.audience],
                ].map(([label, value]) => (
                  <div key={label} className="rounded-2xl border border-ink/10 bg-white/60 p-4">
                    <p className="font-mono text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground">{label}</p>
                    <p className="mt-2 text-sm font-semibold leading-snug text-ink/80">{value}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          <section className="mt-14 grid gap-4 md:grid-cols-3">
            {[
              ["Challenge", project.caseStudy.challenge],
              ["Solution", project.caseStudy.solution],
              ["Outcome", project.caseStudy.outcome],
            ].map(([label, copy]) => (
              <div key={label} className="rounded-[22px] border border-ink/10 bg-white/62 p-5 shadow-sm">
                <p className="font-mono text-[10px] font-bold uppercase tracking-[0.22em] text-muted-foreground">{label}</p>
                <p className="mt-3 text-sm leading-relaxed text-ink/76">{copy}</p>
              </div>
            ))}
          </section>

          <section className="mt-16 border-y border-ink/10 py-12">
            <div className="grid gap-10 lg:grid-cols-[0.75fr_1.25fr]">
              <div>
                <p className="font-mono text-[10px] font-bold uppercase tracking-[0.24em] text-muted-foreground">Research Signals</p>
                <h4 className="mt-3 font-display text-3xl font-black leading-tight">What shaped the direction</h4>
              </div>
              <div className="grid gap-4 sm:grid-cols-3">
                {project.caseStudy.research.map((insight, index) => (
                  <div key={insight} className="rounded-[22px] border border-ink/10 bg-[#fffaf0]/70 p-5">
                    <p className="font-mono text-xs font-black text-vermillion">{String(index + 1).padStart(2, "0")}</p>
                    <p className="mt-4 text-sm font-medium leading-relaxed text-ink/78">{insight}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          <div className="mt-16 space-y-16">
            {project.caseStudy.sections.map((section, index) => (
              <section
                key={section.title}
                className={`grid gap-8 lg:grid-cols-2 lg:items-center ${index % 2 === 1 ? "lg:[&>div:first-child]:order-2" : ""}`}
              >
                <div className="group/modal-image overflow-hidden rounded-[26px] border border-ink/12 bg-white p-3 shadow-[0_20px_60px_rgba(26,24,20,0.1)] transition duration-500 hover:-translate-y-1 hover:border-vermillion/40 hover:shadow-[0_30px_76px_rgba(26,24,20,0.15)]">
                  <div className="relative overflow-hidden rounded-[18px]">
                    <img src={project.image} alt={`${project.title} ${section.imageLabel}`} className="aspect-[16/10] w-full object-cover transition duration-700 group-hover/modal-image:scale-[1.04] group-hover/modal-image:saturate-[1.08]" />
                    <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(115deg,transparent_0%,rgba(255,255,255,0.38)_44%,transparent_58%)] opacity-0 transition duration-700 group-hover/modal-image:translate-x-full group-hover/modal-image:opacity-100" />
                  </div>
                  <div className="px-2 pb-2 pt-4">
                    <p className="font-mono text-[10px] font-bold uppercase tracking-[0.22em] text-muted-foreground">{section.imageLabel}</p>
                    <p className="mt-1 text-xs leading-relaxed text-muted-foreground">{section.imageCaption}</p>
                  </div>
                </div>

                <div className="max-w-xl">
                  <p className="font-mono text-[10px] font-bold uppercase tracking-[0.24em] text-vermillion">{section.kicker}</p>
                  <h4 className="mt-3 font-display text-3xl font-black leading-tight tracking-tight sm:text-5xl">{section.title}</h4>
                  <p className="mt-5 text-base leading-relaxed text-ink/74 sm:text-lg">{section.body}</p>
                </div>
              </section>
            ))}
          </div>

          <section className="mt-16 grid gap-8 lg:grid-cols-[0.9fr_1.1fr]">
            <div>
              <p className="font-mono text-[10px] font-bold uppercase tracking-[0.24em] text-muted-foreground">Decision System</p>
              <h4 className="mt-3 font-display text-3xl font-black leading-tight">The choices behind the interface</h4>
            </div>
            <div className="grid gap-4">
              {project.caseStudy.decisions.map((decision) => (
                <div key={decision.title} className="rounded-[22px] border border-ink/10 bg-white/62 p-5">
                  <h5 className="font-display text-xl font-bold">{decision.title}</h5>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{decision.description}</p>
                </div>
              ))}
            </div>
          </section>

          <section className="mt-16">
            <p className="mb-5 font-mono text-[10px] font-bold uppercase tracking-[0.24em] text-muted-foreground">Screen Notes</p>
            <div className="grid gap-4 sm:grid-cols-3">
              {project.caseStudy.screens.map((screen) => (
                <div key={screen.label} className="group/modal-image rounded-[22px] border border-ink/10 bg-white/65 p-3 shadow-sm transition duration-500 hover:-translate-y-1 hover:border-vermillion/35 hover:shadow-[0_20px_55px_rgba(26,24,20,0.12)]">
                  <div className="mb-3 aspect-[4/3] overflow-hidden rounded-[18px] border border-ink/10 bg-muted">
                    <img src={project.image} alt={`${project.title} ${screen.label}`} className="h-full w-full object-cover transition duration-700 group-hover/modal-image:scale-[1.05] group-hover/modal-image:saturate-[1.08]" />
                  </div>
                  <p className="font-mono text-[10px] font-bold uppercase tracking-widest text-ink">{screen.label}</p>
                  <p className="mt-1 text-xs leading-relaxed text-muted-foreground">{screen.caption}</p>
                </div>
              ))}
            </div>
          </section>

          <section className="mt-16 grid gap-8 rounded-[26px] border border-ink/10 bg-ink p-6 text-paper sm:p-8 lg:grid-cols-[0.8fr_1.2fr]">
            <div>
              <p className="font-mono text-[10px] font-bold uppercase tracking-[0.24em] text-paper/55">Learnings</p>
              <h4 className="mt-3 font-display text-3xl font-black leading-tight">What I would carry forward</h4>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              {project.caseStudy.learnings.map((learning) => (
                <p key={learning} className="rounded-2xl border border-paper/10 bg-paper/5 p-5 text-sm leading-relaxed text-paper/75">
                  {learning}
                </p>
              ))}
            </div>
          </section>

          <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:justify-end">
            <a href={project.liveLink} target="_blank" rel="noreferrer" className="inline-flex items-center justify-center gap-2 rounded-full bg-ink px-5 py-3 text-sm font-bold text-paper transition hover:-translate-y-0.5 hover:bg-vermillion focus:outline-none focus:ring-2 focus:ring-ink">
              Visit Live <ExternalLink size={16} />
            </a>
            <a href={project.githubLink} target="_blank" rel="noreferrer" className="inline-flex items-center justify-center gap-2 rounded-full border border-ink/15 bg-white/70 px-5 py-3 text-sm font-bold text-ink transition hover:-translate-y-0.5 hover:border-ink/35 focus:outline-none focus:ring-2 focus:ring-ink">
              Source Code <Github size={16} />
            </a>
          </div>
        </article>
      </div>
    </div>
  );
}

export function WorkProjectsShowcase() {
  const triggerRef = useRef<HTMLDivElement>(null);
  const cardContainerRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const scrollTriggerRef = useRef<ScrollTrigger | null>(null);
  const currentActiveIndex = useRef(0);
  const mobileScrollRef = useRef<HTMLDivElement>(null);
  const hoverCursorRef = useRef<HTMLDivElement>(null);

  const [activeIndex, setActiveIndex] = useState(0);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [isHoverCursorVisible, setIsHoverCursorVisible] = useState(false);
  const [svgPath, setSvgPath] = useState("");
  const [isMobile, setIsMobile] = useState(() => (typeof window !== "undefined" ? window.innerWidth < 768 : false));
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(() =>
    typeof window !== "undefined" ? window.matchMedia("(prefers-reduced-motion: reduce)").matches : false,
  );

  const getBezierPointAndAngle = (t: number, width: number, height: number) => {
    const x0 = -width * 0.18;
    const y0 = height * 0.12;
    const x1 = width * 0.5;
    const y1 = height * 0.45;
    const x2 = width * 1.18;
    const y2 = height * 0.12;
    const tClamped = Math.max(0, Math.min(1, t));
    const mt = 1 - tClamped;

    const x = mt * mt * x0 + 2 * mt * tClamped * x1 + tClamped * tClamped * x2;
    const y = mt * mt * y0 + 2 * mt * tClamped * y1 + tClamped * tClamped * y2;
    const dx = 2 * mt * (x1 - x0) + 2 * tClamped * (x2 - x1);
    const dy = 2 * mt * (y1 - y0) + 2 * tClamped * (y2 - y1);

    return { x, y, angle: (Math.atan2(dy, dx) * 180) / Math.PI };
  };

  const updateCardPositions = (progress: number) => {
    if (!cardContainerRef.current) return;

    const width = cardContainerRef.current.offsetWidth;
    const height = cardContainerRef.current.offsetHeight;
    const spacing = 0.28;
    const totalRange = 1 + (projects.length - 1) * spacing;

    projects.forEach((_, index) => {
      const cardEl = cardRefs.current[index];
      if (!cardEl) return;

      const t = progress * totalRange - index * spacing;
      if (t < -0.18 || t > 1.18) {
        gsap.set(cardEl, { display: "none", opacity: 0 });
        return;
      }

      const { x, y, angle } = getBezierPointAndAngle(t, width, height);
      const distToCenter = Math.abs(t - 0.5);
      const activeFactor = Math.max(0, 1 - distToCenter / 0.32);
      const scale = 0.72 + activeFactor * 0.33;
      const side = t < 0.5 ? -1 : 1;
      const additionalTilt = side * (1 - activeFactor) * 10;
      const finalAngle = angle * (1 - activeFactor * 0.85) + additionalTilt;

      gsap.set(cardEl, {
        display: "block",
        x,
        y,
        xPercent: -50,
        yPercent: 0,
        scale,
        rotate: finalAngle,
        opacity: 0.35 + activeFactor * 0.65,
        zIndex: Math.round(activeFactor * 100) + 10,
        transformOrigin: "top center",
      });
    });

    let minIdx = 0;
    let minVal = Infinity;
    projects.forEach((_, index) => {
      const t = progress * totalRange - index * spacing;
      const dist = Math.abs(t - 0.5);
      if (dist < minVal) {
        minVal = dist;
        minIdx = index;
      }
    });

    if (minIdx !== currentActiveIndex.current) {
      currentActiveIndex.current = minIdx;
      setActiveIndex(minIdx);
    }

  };

  useEffect(() => {
    const checkLayout = () => setIsMobile(window.innerWidth < 768);
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const handleReducedMotionChange = (event: MediaQueryListEvent) => setPrefersReducedMotion(event.matches);

    window.addEventListener("resize", checkLayout);
    mediaQuery.addEventListener("change", handleReducedMotionChange);
    checkLayout();

    return () => {
      window.removeEventListener("resize", checkLayout);
      mediaQuery.removeEventListener("change", handleReducedMotionChange);
    };
  }, []);

  useEffect(() => {
    if (isMobile || prefersReducedMotion) return;

    const handleResize = () => {
      if (!cardContainerRef.current) return;
      const width = cardContainerRef.current.offsetWidth;
      const height = cardContainerRef.current.offsetHeight;
      const x0 = -width * 0.18;
      const y0 = height * 0.12;
      const x1 = width * 0.5;
      const y1 = height * 0.45;
      const x2 = width * 1.18;
      const y2 = height * 0.12;

      setSvgPath(`M ${x0} ${y0} Q ${x1} ${y1} ${x2} ${y2}`);
      if (scrollTriggerRef.current) updateCardPositions(scrollTriggerRef.current.progress);
    };

    window.addEventListener("resize", handleResize);
    const timer = window.setTimeout(handleResize, 100);

    return () => {
      window.removeEventListener("resize", handleResize);
      window.clearTimeout(timer);
    };
  }, [isMobile, prefersReducedMotion]);

  useLayoutEffect(() => {
    if (isMobile || prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      scrollTriggerRef.current = ScrollTrigger.create({
        id: "playground-pin",
        trigger: triggerRef.current,
        start: "top top",
        end: "+=200%",
        pin: true,
        scrub: 0.5,
        anticipatePin: 1,
        onUpdate: (self) => updateCardPositions(self.progress),
      });
    }, triggerRef);

    return () => ctx.revert();
  }, [isMobile, prefersReducedMotion]);

  const openProject = (project: Project) => {
    setSelectedProject(project);
    setIsHoverCursorVisible(false);
  };

  const handleProjectPointerMove = (event: React.PointerEvent<HTMLButtonElement>) => {
    const target = event.currentTarget;
    const rect = target.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;

    target.style.setProperty("--glare-x", `${(x / rect.width) * 100}%`);
    target.style.setProperty("--glare-y", `${(y / rect.height) * 100}%`);
    hoverCursorRef.current?.style.setProperty("--cursor-x", `${event.clientX}px`);
    hoverCursorRef.current?.style.setProperty("--cursor-y", `${event.clientY}px`);
  };

  const handleMobileScroll = (event: React.UIEvent<HTMLDivElement>) => {
    const container = event.currentTarget;
    const itemWidth = container.offsetWidth * 0.78 + 24;
    const index = Math.min(projects.length - 1, Math.max(0, Math.round(container.scrollLeft / itemWidth)));
    if (index !== activeIndex) setActiveIndex(index);
  };

  const scrollToActiveIndexPosition = (index: number) => {
    if (!scrollTriggerRef.current) return;
    const spacing = 0.28;
    const totalRange = 1 + (projects.length - 1) * spacing;
    const targetProgress = Math.max(0, Math.min(0.99, (0.5 + index * spacing) / totalRange));
    const start = scrollTriggerRef.current.start;
    const end = scrollTriggerRef.current.end;

    window.scrollTo({
      top: start + targetProgress * (end - start),
      behavior: "smooth",
    });
  };

  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (isMobile) return;
    if (event.key === "ArrowRight") scrollToActiveIndexPosition(Math.min(projects.length - 1, activeIndex + 1));
    if (event.key === "ArrowLeft") scrollToActiveIndexPosition(Math.max(0, activeIndex - 1));
  };

  if (prefersReducedMotion) {
    return (
      <section id="after-hours" className="mx-auto flex min-h-screen max-w-[1400px] flex-col justify-center bg-[#F6F3EC] px-8 py-24 lg:px-12">
        <ProjectCaseStudyModal project={selectedProject} onClose={() => setSelectedProject(null)} />
        <div className="mb-16 w-full text-left">
          <div className="flex items-baseline gap-6 w-full mb-6">
            <span className="font-mono text-xs tracking-[0.25em] text-accent">06 THE PLAYGROUND</span>
            <span className="h-px flex-1 bg-ink/20" />
            <span className="hidden font-mono text-xs text-muted-foreground md:inline">2024 - 2026</span>
          </div>
          <h2 className="font-display text-4xl font-medium leading-[1.02] tracking-tight text-ink text-center md:text-6xl">
            The <span className="text-ink">Playground</span>
          </h2>
          <p className="mx-auto mt-4 max-w-md text-center text-sm font-medium leading-relaxed text-muted-foreground sm:text-base">
            A premium selection of platforms, designs, and visual interactive experiences.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
          {projects.map((project) => (
            <div
              key={project.id}
              className="relative flex flex-col items-center rounded-2xl border border-border bg-white p-4 shadow-sm transition-transform duration-300 hover:-translate-y-1"
            >
              <img src={project.image} alt={project.title} className="mb-4 aspect-[4/3] w-full rounded-[18px] border object-cover" />
              <span className="self-start font-mono text-xs font-bold uppercase tracking-wider text-muted-foreground">
                {project.category}
              </span>
              <h3 className="mt-1 self-start font-display text-xl font-bold text-ink">{project.title}</h3>
              <p className="mt-2 text-xs leading-relaxed text-muted-foreground">{project.description}</p>
              <button
                type="button"
                onClick={() => openProject(project)}
                className="mt-4 flex cursor-pointer items-center gap-1.5 text-xs font-bold text-ink hover:underline focus:outline-none focus:ring-2 focus:ring-ink"
              >
                Open Case Study <ChevronRight size={14} />
              </button>
            </div>
          ))}
        </div>
      </section>
    );
  }

  if (isMobile) {
    return (
      <section id="after-hours" className="relative flex min-h-screen flex-col justify-between overflow-hidden bg-[#F6F3EC] px-8 pb-16 pt-24 lg:px-12">
        <ProjectCaseStudyModal project={selectedProject} onClose={() => setSelectedProject(null)} />
        <div className="mb-8 w-full text-left">
          <div className="flex items-baseline gap-6 w-full mb-6">
            <span className="font-mono text-xs tracking-[0.25em] text-accent">06 THE PLAYGROUND</span>
            <span className="h-px flex-1 bg-ink/20" />
            <span className="font-mono text-xs text-muted-foreground">2024 - 2026</span>
          </div>
          <h2 className="font-display text-4xl font-black uppercase tracking-tight text-ink text-center">
            The <span className="text-ink">Playground</span>
          </h2>
        </div>

        <div
          ref={mobileScrollRef}
          onScroll={handleMobileScroll}
          className="flex w-full snap-x snap-mandatory gap-6 overflow-x-auto px-4 py-8"
        >
          {projects.map((project) => (
            <div key={project.id} className="flex w-[78%] shrink-0 snap-center flex-col items-center">
              <div className="z-10 -mb-3 flex h-6 w-4 items-center justify-center rounded-sm border border-black/10 bg-ink shadow">
                <div className="h-1.5 w-1.5 rounded-full bg-white/80" />
              </div>

              <div className="flex w-full flex-col gap-3 rounded-2xl border border-border bg-white p-4 shadow-[0_8px_20px_rgba(0,0,0,0.03)]">
                <img src={project.image} alt={project.title} className="aspect-[4/3] w-full rounded-[18px] border border-border object-cover" />
                <div className="flex items-center justify-between pt-1 font-mono text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
                  <span>{project.number}</span>
                  <span>{project.category}</span>
                </div>
                <h3 className="font-display text-lg font-bold text-ink">{project.title}</h3>
                <p className="-mt-1 line-clamp-2 text-xs leading-relaxed text-muted-foreground">{project.description}</p>
                <button
                  type="button"
                  onClick={() => openProject(project)}
                  className="mt-2 flex w-full items-center justify-center gap-1.5 rounded-xl border border-ink bg-ink/5 py-2.5 text-xs font-bold text-ink transition-colors duration-300 hover:bg-ink hover:text-paper focus:outline-none"
                >
                  Open Case Study <ChevronRight size={14} />
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-4 flex flex-col items-center gap-3">
          <div className="font-display text-xs font-bold tracking-widest text-muted-foreground">
            {projects[activeIndex]?.number} / {String(projects.length).padStart(2, "0")}
          </div>
          <div className="flex gap-2">
            {projects.map((project, index) => (
              <div
                key={project.id}
                className={`h-1.5 rounded-full transition-all duration-300 ${
                  index === activeIndex ? "w-6 bg-ink" : "w-1.5 bg-border"
                }`}
              />
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="after-hours" className="relative z-20 bg-[#F6F3EC]">
      <ProjectCaseStudyModal project={selectedProject} onClose={() => setSelectedProject(null)} />
      <div
        ref={triggerRef}
        className="relative h-screen w-full overflow-hidden bg-[#F6F3EC]"
        onKeyDown={handleKeyDown}
        tabIndex={0}
        role="region"
        aria-label="Interactive projects showcase slider. Use scroll or arrow keys to navigate."
      >
        <div className="mx-auto flex h-full w-full max-w-[1400px] flex-col justify-start gap-6 px-8 py-8 lg:px-12 lg:py-10">
          <div className="flex items-baseline gap-6 w-full text-left">
            <span className="font-mono text-xs tracking-[0.25em] text-accent">06 THE PLAYGROUND</span>
            <span className="h-px flex-1 bg-ink/20" />
            <span className="hidden font-mono text-xs text-muted-foreground md:inline">2024 - 2026</span>
          </div>

          <div className="z-10 pt-2 text-center md:pt-4">
            <h2 className="font-display text-4xl font-medium leading-[1.02] tracking-tight text-ink md:text-6xl">
              The <span className="text-ink">Playground</span>
            </h2>
          </div>

          <div ref={cardContainerRef} className="relative mt-4 mb-2 w-full flex-grow overflow-visible">
            <svg className="pointer-events-none absolute inset-0 h-full w-full overflow-visible">
              {svgPath ? <path d={svgPath} fill="none" stroke="currentColor" strokeWidth="2" className="text-ink/35" /> : null}
            </svg>

            {projects.map((project, index) => (
              <div
                key={project.id}
                ref={(element) => {
                  cardRefs.current[index] = element;
                }}
                className="absolute left-0 top-0 hidden"
              >
                <ProjectCard
                  project={project}
                  isActive={index === activeIndex}
                  onClick={() => openProject(project)}
                  onPointerMove={handleProjectPointerMove}
                  onPointerEnter={() => setIsHoverCursorVisible(true)}
                  onPointerLeave={() => setIsHoverCursorVisible(false)}
                />
              </div>
            ))}
          </div>

          <div className="h-6" />
        </div>
      </div>
    </section>
  );
}
