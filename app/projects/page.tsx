import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowLeft,
  ArrowUpRight,
  ExternalLink,
  FolderGit2,
  Github,
} from "lucide-react";
import {
  absoluteUrl,
  personEntityId,
  siteName,
  siteUrl,
} from "@/lib/seo";

export const metadata: Metadata = {
  title: "Projects & Technical Case Studies — Zain Ali | Full-Stack Developer",
  description:
    "Explore full-stack applications, SaaS platforms, AI products, and marketplaces built by Zain Ali using Next.js, React, Node.js, TypeScript, and MongoDB.",
  alternates: {
    canonical: absoluteUrl("/projects"),
  },
  openGraph: {
    title: "Projects & Technical Case Studies — Zain Ali",
    description:
      "Explore full-stack applications, SaaS platforms, AI products, and marketplaces built by Zain Ali using Next.js, React, Node.js, TypeScript, and MongoDB.",
    url: absoluteUrl("/projects"),
    siteName,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Projects & Technical Case Studies — Zain Ali",
    description:
      "Explore full-stack applications, SaaS platforms, AI products, and marketplaces built by Zain Ali using Next.js, React, Node.js, TypeScript, and MongoDB.",
  },
};

const detailedProjects = [
  {
    title: "MT4Life Platform",
    subtitle: "Founder education, personal growth & executive life-audit ecosystem",
    category: "EDTECH & FOUNDER OS",
    stack: "React 18 · Node.js · Express · MongoDB · React Native · Socket.IO · OpenAI · Tailwind",
    role: "Full-Stack Developer @ Kakushin",
    problem:
      "Founders and executives lacked an integrated digital ecosystem to conduct structured life audits, track habits, review multimedia flipbooks, and access mentorship without juggling disconnected tools.",
    built:
      "Engineered full-stack architecture across web and mobile. Built interactive flipbook engines with embedded assessments, habit progression trackers, real-time messaging via Socket.IO, Zoom workshop integrations, and OpenAI-powered advisory prompts.",
    challenge:
      "Synchronizing real-time interactive assessment state across web and mobile clients while maintaining smooth flipbook animations and low-latency websocket channels.",
    outcome:
      "Delivered a production-ready ecosystem utilized by founders for executive growth audits, with seamless cross-platform synchronization.",
    githubLink: "https://github.com/kakushinas2/MT4_app",
    liveLink: "",
  },
  {
    title: "ReadMyCup",
    subtitle: "AI-powered coffee cup reading & tasseography platform",
    category: "AI & COMMERCE",
    stack: "Next.js · React · TypeScript · MongoDB · OpenAI GPT-4o · Stripe · Postmark",
    role: "Full-Stack Developer @ Kakushin",
    problem:
      "Traditional coffee cup readings are manual and inaccessible. The challenge was converting complex visual patterns from cup ground images into structured, personalized, and culturally grounded readings automatically.",
    built:
      "Developed an end-to-end AI tasseography platform. Architected image upload pipelines sending visual inputs to GPT-4o vision, generating structured 5-part readings (Summary, Past, Present, Future, Advice). Built NextAuth user authentication, Stripe pay-per-reading credit packages, and an admin dashboard tracking AI token costs and Postmark campaign performance.",
    challenge:
      "Mitigating AI prompt drift and managing vision API latency, ensuring users receive structured, formatted reading responses without timeouts.",
    outcome:
      "Successfully launched with automated credit deduction, high reading accuracy, and positive customer retention metrics.",
    githubLink: "https://github.com/Kakushin-Create/readmycup_web_deploy",
    liveLink: "",
  },
  {
    title: "DentalBox",
    subtitle: "Multi-vendor B2B dental e-commerce & lab management platform",
    category: "HEALTHCARE B2B & LAB OS",
    stack: "Next.js 14 · TypeScript · Node.js · MongoDB · Stripe Connect · Three.js · Socket.IO",
    role: "Full-Stack Developer @ Kakushin",
    problem:
      "Dental clinics, dental laboratories, material suppliers, and couriers had no unified marketplace to handle fragmented procurement, customized lab prescriptions, and split disbursements.",
    built:
      "Architected multi-vendor B2B marketplace featuring multi-vendor cart checkout with Stripe Connect split payouts, Three.js 3D dental impression visualization, digital prescription pipelines, real-time courier tracking via Socket.IO, and affiliate commission wallets.",
    challenge:
      "Designing complex database transactions ensuring multi-vendor orders correctly apportion inventory, split payouts across vendor Stripe accounts, and maintain accurate ledger states.",
    outcome:
      "Streamlined dental laboratory workflow and clinic orders into a single operating platform.",
    githubLink: "https://github.com/kakushinas2/dentalBox",
    liveLink: "",
  },
  {
    title: "Bookmi",
    subtitle: "Spot & service booking marketplace (Airbnb-style UI/UX)",
    category: "BOOKING ENGINE & MARKETPLACE",
    stack: "React · Node.js · Express · MongoDB · React Native · Stripe · Calendar Sync",
    role: "Full-Stack Developer @ Kakushin",
    problem:
      "Event organizers and venue owners experienced double-booking conflicts, opaque availability schedules, and disconnected communication channels.",
    built:
      "Built multi-role marketplace supporting Customers, Hosts, Providers, and Admins. Designed calendar synchronization (Google & Outlook), real-time booking negotiation chat, availability slot locking, and Stripe escrow payments.",
    challenge:
      "Preventing race conditions during simultaneous booking requests for high-demand time slots with pessimistic database locking in MongoDB.",
    outcome:
      "A fast, responsive booking platform with zero double-booking occurrences and fluid multi-role management.",
    githubLink: "https://github.com/kakushinas2/bookmi",
    liveLink: "",
  },
  {
    title: "ShopRehan",
    subtitle: "Full-stack e-commerce marketplace",
    category: "E-COMMERCE",
    stack: "Next.js · React · Node.js · MongoDB · Tailwind CSS",
    role: "Full-Stack Developer @ Kakushin",
    problem:
      "A fast-growing retail catalog needed a scalable storefront with instant filtering, reliable cart synchronization, and administrative inventory controls.",
    built:
      "Engineered Next.js e-commerce application featuring compound category filtering, search index querying, shopping cart state management, customer order history, and an administrative inventory management portal.",
    challenge:
      "Balancing server-side rendered product listing pages for optimal SEO indexing with client-side reactive filtering for immediate user feedback.",
    outcome:
      "A high-converting, SEO-optimized digital retail storefront.",
    githubLink: "https://github.com/shoprehan786-arch/shoprehan",
    liveLink: "",
  },
  {
    title: "LinkVault",
    subtitle: "PWA & Chrome extension bookmark ecosystem with PIN vault",
    category: "DEVELOPER TOOLS & PRODUCTIVITY",
    stack: "React 19 · Node.js · Express · MongoDB · Tailwind CSS · PWA · Chrome MV3",
    role: "Solo Build — Architecture, Design & Full-Stack Development",
    problem:
      "Users have hundreds of bookmarks scattered across browsers without cross-device sync, rich auto-extracted metadata, or privacy protections for sensitive research links.",
    built:
      "Built complete bookmark management ecosystem consisting of a progressive web application and a Manifest V3 Chrome Extension. Features automated OpenGraph and meta tag extraction, tokenized public collection sharing, multi-device session revocation, and a PIN-encrypted Private Vault.",
    challenge:
      "Secure client-side cryptographic hashing for the PIN vault combined with background communication between Chrome extension service workers and the Express REST API.",
    outcome:
      "Active production tool with sub-100ms search filtering across thousands of user bookmarks.",
    githubLink: "https://github.com/zainali954/Linkvault",
    liveLink: "https://linkvault-six.vercel.app/",
  },
  {
    title: "ZephyrLint",
    subtitle: "AI-powered automated code review dashboard",
    category: "DEVELOPER PRODUCTIVITY & AI",
    stack: "React · Node.js · MongoDB · Express · Gemini AI · ECharts.js",
    role: "Solo Build — Design & Development",
    problem:
      "Solo engineers and small teams often lack senior code reviewers to catch memory leaks, anti-patterns, security risks, and optimization bottlenecks prior to deployment.",
    built:
      "Engineered an interactive code review workbench using the Gemini model. Provides multi-tier review strategies (deep audit, idiomatic rewrite, security review, performance scan), syntax-highlighted diffs, review history caching in MongoDB, and exportable audit reports.",
    challenge:
      "Formatting complex AI markdown diff responses safely without breaking client-side syntax highlighting, while managing rate limits on large source code payloads.",
    outcome:
      "Shipped dashboard providing instant code reviews across JavaScript, TypeScript, Python, and Go.",
    githubLink: "https://github.com/zainali954/ZephyrLint",
    liveLink: "https://zephyrlint.vercel.app/",
  },
  {
    title: "Tickure",
    subtitle: "Task management, priority tracking & analytics dashboard",
    category: "PRODUCTIVITY & ANALYTICS",
    stack: "React · Node.js · MongoDB · Express · ECharts.js",
    role: "Solo Build — Design & Development",
    problem:
      "Most task management tools are either overly simplistic checklists or bloated enterprise suites lacking visual completion velocity insights.",
    built:
      "Built comprehensive task analytics app featuring multi-level priority hierarchies, category and label filtering, calendar timeline views, subtask trees, and visual completion velocity charts using ECharts.",
    challenge:
      "Designing an intuitive drag-and-drop state machine that synchronizes hierarchy changes with optimistic UI updates while preserving database consistency.",
    outcome:
      "A fast, friction-free productivity suite with detailed weekly completion analytics.",
    githubLink: "https://github.com/zainali954/tickure",
    liveLink: "https://tickure.vercel.app/",
  },
  {
    title: "Snapsack",
    subtitle: "Full-featured e-commerce platform with administration portal",
    category: "COMMERCE & MANAGEMENT",
    stack: "React · Tailwind CSS · MongoDB · ECharts.js · Node.js · Express.js",
    role: "Solo Build — Design & Development",
    problem:
      "Need for a lightweight, modular e-commerce engine designed to showcase full CRUD product administration, stock control, and cart lifecycles.",
    built:
      "Engineered responsive storefront with multi-faceted product filtering, instant search, cart persistence, order processing, and a full administrative dashboard with sales volume reporting.",
    challenge:
      "Handling edge-case inventory decrement scenarios and responsive data grids on constrained mobile viewports.",
    outcome:
      "Clean reference implementation for decoupled retail architectures.",
    githubLink: "https://github.com/zainali954/snapsack",
    liveLink: "https://snapsack-user-frontend.vercel.app/",
  },
];

export default function ProjectsPage() {
  const itemListSchema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Projects Engineered by Zain Ali",
    description:
      "Full-stack web applications, SaaS platforms, AI applications, and marketplaces built by Zain Ali.",
    itemListElement: detailedProjects.map((project, index) => ({
      "@type": "ListItem",
      position: index + 1,
      item: {
        "@type": "SoftwareApplication",
        name: project.title,
        description: project.subtitle,
        applicationCategory: project.category,
        author: {
          "@id": personEntityId,
        },
      },
    })),
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: `${siteUrl}/`,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Projects",
        item: absoluteUrl("/projects"),
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListSchema).replace(/</g, "\\u003c") }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema).replace(/</g, "\\u003c") }}
      />

      <main className="min-h-screen bg-paper text-ink selection:bg-accent/20">
        {/* Navigation Bar */}
        <header className="sticky top-0 z-50 border-b border-ink/10 bg-paper/90 backdrop-blur-md">
          <div className="mx-auto flex max-w-5xl items-center justify-between px-6 py-4">
            <Link
              href="/"
              className="group flex items-center gap-2 font-mono text-xs font-semibold tracking-wider text-muted-foreground transition hover:text-ink"
            >
              <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
              <span>BACK TO PORTFOLIO</span>
            </Link>
            <div className="flex items-center gap-4 font-mono text-xs">
              <Link href="/about" className="text-muted-foreground transition hover:text-accent">
                ABOUT
              </Link>
              <Link href="/#blog" className="text-muted-foreground transition hover:text-accent">
                WRITING
              </Link>
              <Link
                href="/#contact"
                className="rounded-full bg-ink px-3.5 py-1.5 font-mono text-[11px] text-paper transition hover:bg-accent hover:text-accent-foreground"
              >
                CONTACT
              </Link>
            </div>
          </div>
        </header>

        {/* Header Section */}
        <div className="mx-auto max-w-4xl px-6 py-12 md:py-20">
          <nav aria-label="Breadcrumb" className="mb-6 font-mono text-xs text-muted-foreground">
            <ol className="flex items-center gap-2">
              <li>
                <Link href="/" className="hover:text-ink transition">
                  Home
                </Link>
              </li>
              <li aria-hidden="true">/</li>
              <li className="font-semibold text-ink" aria-current="page">
                Projects
              </li>
            </ol>
          </nav>

          <div className="inline-flex items-center gap-2 rounded-full border border-accent/20 bg-accent/10 px-3 py-1 font-mono text-xs font-bold uppercase tracking-widest text-accent">
            <FolderGit2 className="h-3.5 w-3.5" />
            <span>Engineering Case Studies</span>
          </div>
          <h1 className="mt-4 font-display text-4xl font-bold tracking-tight text-ink sm:text-5xl md:text-6xl">
            Featured Projects &amp; Systems
          </h1>
          <p className="mt-6 text-lg leading-relaxed text-ink/80 md:text-xl">
            Detailed breakdowns of production platforms, marketplaces, and solo developer tools engineered by Zain Ali. Each project outlines the problem solved, architectural scope, key technical challenges, and results.
          </p>

          {/* Projects List */}
          <div className="mt-14 space-y-12">
            {detailedProjects.map((project, index) => (
              <article
                key={project.title}
                id={project.title.toLowerCase().replace(/[^a-z0-9]+/g, "-")}
                className="rounded-3xl border border-ink/12 bg-white/70 p-6 shadow-sm sm:p-8 md:p-10 transition hover:border-ink/25"
              >
                {/* Meta Header */}
                <div className="flex flex-wrap items-center justify-between gap-3 border-b border-ink/8 pb-4">
                  <div className="flex items-center gap-3">
                    <span className="font-mono text-xs font-bold text-accent">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <span className="font-mono text-[11px] uppercase tracking-wider text-muted-foreground">
                      {project.category}
                    </span>
                  </div>
                  <span className="font-mono text-xs font-semibold text-accent/90">
                    {project.role}
                  </span>
                </div>

                {/* Title & Subtitle */}
                <div className="mt-5">
                  <h2 className="font-display text-2xl font-bold text-ink sm:text-3xl">
                    {project.title}
                  </h2>
                  <p className="mt-1 text-sm font-medium text-muted-foreground">
                    {project.subtitle}
                  </p>
                </div>

                {/* Tech Stack Badge Strip */}
                <div className="mt-4 flex flex-wrap gap-1.5 font-mono text-xs text-ink/80">
                  {project.stack.split(" · ").map((tech) => (
                    <span
                      key={tech}
                      className="rounded-md border border-ink/10 bg-paper/80 px-2.5 py-0.5 text-[11px] font-semibold"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                {/* Breakdown Grid */}
                <div className="mt-6 grid gap-4 sm:grid-cols-2 text-xs leading-relaxed">
                  <div className="rounded-xl border border-ink/8 bg-paper/50 p-4">
                    <span className="font-mono text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
                      The Problem
                    </span>
                    <p className="mt-1.5 text-ink/85">{project.problem}</p>
                  </div>

                  <div className="rounded-xl border border-ink/8 bg-paper/50 p-4">
                    <span className="font-mono text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
                      What Zain Built
                    </span>
                    <p className="mt-1.5 text-ink/85">{project.built}</p>
                  </div>

                  <div className="rounded-xl border border-ink/8 bg-paper/50 p-4">
                    <span className="font-mono text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
                      Technical Challenge
                    </span>
                    <p className="mt-1.5 text-ink/85">{project.challenge}</p>
                  </div>

                  <div className="rounded-xl border border-ink/8 bg-paper/50 p-4">
                    <span className="font-mono text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
                      Outcome
                    </span>
                    <p className="mt-1.5 text-ink/85">{project.outcome}</p>
                  </div>
                </div>

                {/* Action Links */}
                <div className="mt-6 flex flex-wrap items-center gap-3 pt-4 border-t border-ink/8">
                  {project.liveLink && (
                    <a
                      href={project.liveLink}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-1.5 rounded-full bg-ink px-4 py-2 font-mono text-xs font-bold text-paper transition hover:bg-accent hover:text-accent-foreground"
                    >
                      <span>Live App</span>
                      <ExternalLink className="h-3.5 w-3.5" />
                    </a>
                  )}

                  {project.githubLink && (
                    <a
                      href={project.githubLink}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-1.5 rounded-full border border-ink/15 bg-white px-4 py-2 font-mono text-xs font-bold text-ink transition hover:border-ink hover:shadow-xs"
                    >
                      <Github className="h-3.5 w-3.5" />
                      <span>Source Code</span>
                      <ArrowUpRight className="h-3.5 w-3.5 text-muted-foreground" />
                    </a>
                  )}
                </div>
              </article>
            ))}
          </div>

          {/* Bottom Back Button */}
          <div className="mt-16 flex items-center justify-between border-t border-ink/10 pt-8 font-mono text-xs">
            <Link
              href="/"
              className="group inline-flex items-center gap-2 font-bold text-muted-foreground transition hover:text-ink"
            >
              <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
              <span>Back to Home</span>
            </Link>

            <Link
              href="/about"
              className="group inline-flex items-center gap-1 font-bold text-accent hover:underline"
            >
              <span>Read about Zain&apos;s background -&gt;</span>
            </Link>
          </div>
        </div>
      </main>
    </>
  );
}
