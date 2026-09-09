import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ArrowLeft,
  ArrowUpRight,
  ExternalLink,
  Github,
  Layers,
  Sparkles,
  ShieldCheck,
  Cpu,
  TrendingUp,
} from "lucide-react";
import {
  absoluteUrl,
  siteName,
  getBreadcrumbSchema,
  getSoftwareApplicationSchema,
} from "@/lib/seo";

interface ProjectCaseStudy {
  slug: string;
  title: string;
  subtitle: string;
  metaTitle: string;
  metaDescription: string;
  category: string;
  applicationCategory: string;
  stack: string[];
  role: string;
  problem: string;
  built: string;
  challenge: string;
  outcome: string;
  highlights: string[];
  githubLink?: string;
  liveLink?: string;
  relatedArticle?: {
    title: string;
    slug: string;
    description: string;
  };
}

const PROJECTS_DATA: Record<string, ProjectCaseStudy> = {
  linkvault: {
    slug: "linkvault",
    title: "LinkVault",
    subtitle: "PWA & Chrome Extension Bookmark Ecosystem with PIN Vault",
    metaTitle: "LinkVault — Project by Zain Ali | HeyZain",
    metaDescription:
      "LinkVault is a full-stack bookmark management ecosystem with PWA and Chrome MV3 extension, auto-metadata extraction, and PIN-encrypted Private Vault built by Zain Ali.",
    category: "DEVELOPER TOOLS & PRODUCTIVITY",
    applicationCategory: "DeveloperApplication",
    stack: [
      "React 19",
      "Node.js",
      "Express",
      "MongoDB",
      "Tailwind CSS",
      "PWA",
      "Chrome MV3",
      "JWT Auth",
    ],
    role: "Solo Build — Architecture, Design & Full-Stack Development",
    problem:
      "Modern users accumulate hundreds of links across mobile browsers, desktop windows, and devices without centralized synchronization, automatic metadata capture, or privacy controls for confidential staging URLs and research.",
    built:
      "Engineered an end-to-end bookmarking ecosystem spanning an installable Progressive Web Application (PWA) and a Manifest V3 Chrome Extension. Features automated OpenGraph and meta tag extraction, tokenized public collection sharing (/share/:token), active session management with remote revocation, and a PIN-encrypted Private Vault for sensitive links.",
    challenge:
      "Implementing client-side cryptographic hashing for the PIN vault while coordinating asynchronous message passing between Chrome extension background service workers, side panels, and the Express REST backend under strict Content Security Policy constraints.",
    outcome:
      "Delivered a cross-platform knowledge vault with sub-100ms full-text search filtering across thousands of personal bookmarks, active multi-device sync, and zero data leakage.",
    highlights: [
      "Dual-Vault Architecture separating public bookmarks from encrypted private collections",
      "Manifest V3 Chrome Extension enabling hotkey-driven instant tab capture (Ctrl+Shift+L)",
      "Automated server-side OpenGraph and favicon extraction pipelines",
      "Tokenized public endpoints for secure, account-free bookmark collection sharing",
    ],
    githubLink: "https://github.com/zainali954/Linkvault",
    liveLink: "https://linkvault-six.vercel.app/",
    relatedArticle: {
      title: "Your Login Works. Your Authentication System Might Not.",
      slug: "/authentication-is-a-lifecycle-not-a-login-screen",
      description:
        "Deep-dive technical case study exploring token rotation, multi-device session revocation, and cryptographic PIN vaults.",
    },
  },
  dentalbox: {
    slug: "dentalbox",
    title: "DentalBox",
    subtitle: "Multi-Vendor B2B Dental E-Commerce & Lab Management OS",
    metaTitle: "DentalBox — Healthcare B2B Platform by Zain Ali | HeyZain",
    metaDescription:
      "DentalBox is a multi-vendor B2B marketplace and dental lab operating system with Three.js 3D models and Stripe Connect split payouts built by Zain Ali.",
    category: "HEALTHCARE B2B & LAB OS",
    applicationCategory: "BusinessApplication",
    stack: [
      "Next.js 14",
      "TypeScript",
      "Node.js",
      "MongoDB",
      "Stripe Connect",
      "Three.js",
      "Socket.IO",
      "Tailwind CSS",
    ],
    role: "Full-Stack Developer @ Kakushin",
    problem:
      "Dental clinics, dental laboratories, material suppliers, and couriers operated across disconnected channels, creating billing inaccuracies, prescription miscommunication, and zero visibility into custom prosthesis manufacture status.",
    built:
      "Architected an enterprise B2B platform connecting clinics, labs, and suppliers. Implemented multi-supplier cart checkouts with automated Stripe Connect split disbursements, interactive Three.js 3D dental impression visualization, digital prescription workflows, real-time courier tracking via Socket.IO, and affiliate commission wallets.",
    challenge:
      "Designing resilient database transactions ensuring multi-vendor orders correctly apportion inventory, allocate split vendor payouts, and preserve transactional integrity during partial order cancellations or fulfillment failures.",
    outcome:
      "Unified fragmented procurement and lab prescription pipelines into a single digital operating system with automated multi-party settlements.",
    highlights: [
      "Multi-vendor marketplace checkout with automated Stripe Connect split transfers",
      "Interactive 3D dental mesh rendering inside the browser using Three.js",
      "Digital prescription pipeline eliminating paper laboratory slips and errors",
      "Real-time dispatch and delivery milestone tracking powered by Socket.IO",
    ],
    githubLink: "https://github.com/kakushinas2/dentalBox",
    relatedArticle: {
      title: "The Page Felt Slow. React Wasn't the Bottleneck.",
      slug: "/react-page-slow-database-query-bottleneck",
      description:
        "Technical analysis of tracing full-stack latency from UI clicks to MongoDB execution plans and multi-vendor transactions.",
    },
  },
  bookmi: {
    slug: "bookmi",
    title: "Bookmi",
    subtitle: "Full-Stack Spot & Service Booking Marketplace (Airbnb-Inspired)",
    metaTitle: "Bookmi — Booking Engine & Marketplace by Zain Ali | HeyZain",
    metaDescription:
      "Bookmi is a venue and service booking marketplace with multi-role access, calendar sync, and real-time chat engineered by Zain Ali.",
    category: "BOOKING ENGINE & MARKETPLACE",
    applicationCategory: "BusinessApplication",
    stack: [
      "React",
      "Node.js",
      "Express",
      "MongoDB",
      "React Native",
      "Stripe",
      "Socket.IO",
      "Calendar Sync",
    ],
    role: "Full-Stack Developer @ Kakushin",
    problem:
      "Event organizers and venue managers suffered frequent double-booking conflicts, fragmented availability calendars across Google/Outlook, and opaque host-to-guest messaging.",
    built:
      "Developed a full-stack booking marketplace supporting Customers, Hosts, Service Providers, and Administrators. Engineered bidirectional Google and Outlook calendar synchronization, real-time booking negotiation chat, temporary availability slot locking, and Stripe escrow transaction management.",
    challenge:
      "Preventing race conditions during simultaneous booking attempts for high-demand venue time slots through pessimistic database locking strategies in MongoDB.",
    outcome:
      "Produced a fluid booking engine with verified zero double-booking occurrences and seamless calendar synchronization across time zones.",
    highlights: [
      "Atomic slot-reservation engine preventing concurrent double-bookings",
      "Bidirectional synchronization with Google Calendar and Outlook APIs",
      "Role-based authorization covering Customers, Hosts, Providers, and Admins",
      "Integrated real-time negotiation and direct messaging channel",
    ],
    githubLink: "https://github.com/kakushinas2/bookmi",
  },
  readmycup: {
    slug: "readmycup",
    title: "ReadMyCup",
    subtitle: "AI-Powered Coffee Cup Reading & Tasseography Platform",
    metaTitle: "ReadMyCup — AI Application by Zain Ali | HeyZain",
    metaDescription:
      "ReadMyCup is an AI-powered tasseography platform analyzing coffee ground images into structured 5-part readings using GPT-4o vision, built by Zain Ali.",
    category: "AI & COMMERCE",
    applicationCategory: "MultimediaApplication",
    stack: [
      "Next.js",
      "React",
      "TypeScript",
      "MongoDB",
      "OpenAI GPT-4o",
      "Stripe",
      "NextAuth",
      "Postmark",
    ],
    role: "Full-Stack Developer @ Kakushin",
    problem:
      "Traditional coffee cup tasseography is an artisanal, manual practice unavailable to a global audience. The technical challenge was interpreting complex visual patterns in user-submitted photos and converting them into structured, coherent readings without prompt hallucination.",
    built:
      "Engineered an automated tasseography platform. Architected image processing pipelines utilizing GPT-4o vision to generate structured 5-part interpretations (Summary, Past, Present, Future, Advice). Built NextAuth session management, Stripe pay-per-reading credit bundles, and an administrative telemetry dashboard tracking token usage and Postmark delivery metrics.",
    challenge:
      "Mitigating vision API latency and prompt drift, ensuring users receive consistent, structured JSON responses within tight request timeout limits.",
    outcome:
      "Successfully launched with high reading satisfaction metrics, reliable credit processing, and real-time AI response delivery.",
    highlights: [
      "Computer vision pipeline converting coffee ground images into structured 5-tier readings",
      "Pay-per-reading credit token architecture powered by Stripe checkout",
      "Admin analytics panel tracking OpenAI token costs and email campaign engagement",
      "Strict schema enforcement on LLM outputs to guarantee reliable rendering",
    ],
    githubLink: "https://github.com/Kakushin-Create/readmycup_web_deploy",
  },
  mt4life: {
    slug: "mt4life",
    title: "MT4Life Platform",
    subtitle: "Founder Education, Personal Growth & Executive Life-Audit Ecosystem",
    metaTitle: "MT4Life — Founder OS Platform by Zain Ali | HeyZain",
    metaDescription:
      "MT4Life is an executive life-audit, founder education, and personal growth platform engineered by Zain Ali across web and mobile.",
    category: "EDTECH & FOUNDER OS",
    applicationCategory: "EducationalApplication",
    stack: [
      "React 18",
      "Node.js",
      "Express",
      "MongoDB",
      "React Native",
      "Socket.IO",
      "OpenAI",
      "Tailwind CSS",
    ],
    role: "Full-Stack Developer @ Kakushin",
    problem:
      "Founders and corporate executives lacked a unified environment to conduct comprehensive life audits, track progressive daily habits, study interactive curriculum flipbooks, and access mentorship without switching between disparate apps.",
    built:
      "Engineered cross-platform architecture spanning web and React Native mobile clients. Built custom interactive flipbook readers with embedded self-assessment surveys, habit streak trackers, real-time mentorship channels via Socket.IO, Zoom workshop integrations, and OpenAI-assisted self-reflection prompts.",
    challenge:
      "Maintaining state consistency and seamless session transitions across mobile and web platforms while rendering heavy interactive flipbook animations at 60 FPS.",
    outcome:
      "Delivered a production platform actively utilized by executives for structured personal audits with synchronized progress tracking.",
    highlights: [
      "Custom interactive flipbook reading engine with embedded responsive assessments",
      "Real-time websocket messaging channels connecting mentees with coaches",
      "Cross-platform habit progression synchronization between React web and React Native",
      "Zoom API integration for scheduling and attending live executive workshops",
    ],
    githubLink: "https://github.com/kakushinas2/MT4_app",
  },
};

export function generateStaticParams() {
  return Object.keys(PROJECTS_DATA).map((slug) => ({ slug }));
}

type Params = Promise<{ slug: string }>;

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { slug } = await params;
  const project = PROJECTS_DATA[slug];

  if (!project) {
    return {
      title: {
        absolute: "Project Not Found | Zain Ali",
      },
    };
  }

  const canonicalUrl = absoluteUrl(`/projects/${slug}`);

  return {
    title: {
      absolute: project.metaTitle,
    },
    description: project.metaDescription,
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      title: project.metaTitle,
      description: project.metaDescription,
      url: canonicalUrl,
      siteName,
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: project.metaTitle,
      description: project.metaDescription,
    },
  };
}

export default async function ProjectDetailPage({ params }: { params: Params }) {
  const { slug } = await params;
  const project = PROJECTS_DATA[slug];

  if (!project) {
    notFound();
  }

  const softwareSchema = getSoftwareApplicationSchema({
    name: project.title,
    description: project.subtitle,
    applicationCategory: project.applicationCategory,
    url: absoluteUrl(`/projects/${slug}`),
  });

  const breadcrumbSchema = getBreadcrumbSchema([
    { name: "Home", path: "/" },
    { name: "Projects", path: "/projects" },
    { name: project.title, path: `/projects/${slug}` },
  ]);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(softwareSchema).replace(/</g, "\\u003c"),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumbSchema).replace(/</g, "\\u003c"),
        }}
      />

      <main className="min-h-screen bg-paper text-ink selection:bg-accent/20">
        {/* Navigation Bar */}
        <header className="sticky top-0 z-50 border-b border-ink/10 bg-paper/90 backdrop-blur-md">
          <div className="mx-auto flex max-w-5xl items-center justify-between px-6 py-4">
            <Link
              href="/projects"
              className="group flex items-center gap-2 font-mono text-xs font-semibold tracking-wider text-muted-foreground transition hover:text-ink"
            >
              <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
              <span>ALL PROJECTS</span>
            </Link>
            <div className="flex items-center gap-4 font-mono text-xs">
              <Link href="/about" className="text-muted-foreground transition hover:text-accent">
                ABOUT
              </Link>
              <Link href="/writing" className="text-muted-foreground transition hover:text-accent">
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

        {/* Content Container */}
        <article className="mx-auto max-w-4xl px-6 py-12 md:py-20">
          {/* Breadcrumb Navigation */}
          <nav aria-label="Breadcrumb" className="mb-6 font-mono text-xs text-muted-foreground">
            <ol className="flex items-center gap-2">
              <li>
                <Link href="/" className="hover:text-ink transition">
                  Home
                </Link>
              </li>
              <li aria-hidden="true">/</li>
              <li>
                <Link href="/projects" className="hover:text-ink transition">
                  Projects
                </Link>
              </li>
              <li aria-hidden="true">/</li>
              <li className="font-semibold text-ink" aria-current="page">
                {project.title}
              </li>
            </ol>
          </nav>

          {/* Hero Header */}
          <header className="border-b border-ink/10 pb-10">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div className="inline-flex items-center gap-2 rounded-full border border-accent/20 bg-accent/10 px-3 py-1 font-mono text-xs font-bold uppercase tracking-widest text-accent">
                <Sparkles className="h-3.5 w-3.5" />
                <span>{project.category}</span>
              </div>
              <span className="font-mono text-xs font-semibold text-accent/90">
                {project.role}
              </span>
            </div>

            <h1 className="mt-4 font-display text-4xl font-bold tracking-tight text-ink sm:text-5xl md:text-6xl">
              {project.title}
            </h1>
            <p className="mt-3 text-lg font-medium text-muted-foreground sm:text-xl">
              {project.subtitle}
            </p>

            {/* Tech Stack Pills */}
            <div className="mt-6 flex flex-wrap gap-2">
              {project.stack.map((tech) => (
                <span
                  key={tech}
                  className="rounded-md border border-ink/10 bg-white/80 px-3 py-1 font-mono text-xs font-semibold text-ink shadow-xs"
                >
                  {tech}
                </span>
              ))}
            </div>

            {/* Action CTAs */}
            <div className="mt-8 flex flex-wrap items-center gap-3">
              {project.liveLink && (
                <a
                  href={project.liveLink}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 rounded-full bg-ink px-5 py-2.5 font-mono text-xs font-bold text-paper transition hover:bg-accent hover:text-accent-foreground"
                >
                  <span>Launch Live Platform</span>
                  <ExternalLink className="h-3.5 w-3.5" />
                </a>
              )}
              {project.githubLink && (
                <a
                  href={project.githubLink}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 rounded-full border border-ink/15 bg-white px-5 py-2.5 font-mono text-xs font-bold text-ink transition hover:border-ink hover:shadow-xs"
                >
                  <Github className="h-4 w-4" />
                  <span>View Source Code</span>
                  <ArrowUpRight className="h-3.5 w-3.5 text-muted-foreground" />
                </a>
              )}
            </div>
          </header>

          {/* Section: Architectural Breakdown Grid */}
          <div className="my-12 grid gap-6 sm:grid-cols-2">
            <section className="rounded-2xl border border-ink/10 bg-white/70 p-6 shadow-xs">
              <div className="flex items-center gap-2 font-mono text-xs font-bold uppercase tracking-wider text-accent">
                <Layers className="h-4 w-4" />
                <span>The Problem Solved</span>
              </div>
              <p className="mt-3 text-sm leading-relaxed text-ink/85">{project.problem}</p>
            </section>

            <section className="rounded-2xl border border-ink/10 bg-white/70 p-6 shadow-xs">
              <div className="flex items-center gap-2 font-mono text-xs font-bold uppercase tracking-wider text-accent">
                <Cpu className="h-4 w-4" />
                <span>Architectural Scope &amp; Implementation</span>
              </div>
              <p className="mt-3 text-sm leading-relaxed text-ink/85">{project.built}</p>
            </section>

            <section className="rounded-2xl border border-ink/10 bg-white/70 p-6 shadow-xs">
              <div className="flex items-center gap-2 font-mono text-xs font-bold uppercase tracking-wider text-accent">
                <ShieldCheck className="h-4 w-4" />
                <span>Key Technical Challenge</span>
              </div>
              <p className="mt-3 text-sm leading-relaxed text-ink/85">{project.challenge}</p>
            </section>

            <section className="rounded-2xl border border-ink/10 bg-white/70 p-6 shadow-xs">
              <div className="flex items-center gap-2 font-mono text-xs font-bold uppercase tracking-wider text-accent">
                <TrendingUp className="h-4 w-4" />
                <span>Outcome &amp; Engineering Result</span>
              </div>
              <p className="mt-3 text-sm leading-relaxed text-ink/85">{project.outcome}</p>
            </section>
          </div>

          {/* Section: Architectural Highlights */}
          <section className="space-y-6 border-b border-ink/10 pb-12">
            <h2 className="font-display text-2xl font-bold tracking-tight text-ink sm:text-3xl">
              System Capabilities &amp; Architecture Highlights
            </h2>
            <div className="grid gap-3 sm:grid-cols-2">
              {project.highlights.map((item) => (
                <div
                  key={item}
                  className="flex items-start gap-3 rounded-xl border border-ink/8 bg-white/50 p-4"
                >
                  <span className="mt-1 h-2 w-2 shrink-0 rounded-full bg-accent" />
                  <span className="text-xs leading-relaxed text-ink/85 sm:text-sm">{item}</span>
                </div>
              ))}
            </div>
          </section>

          {/* Section: Companion Engineering Essay */}
          {project.relatedArticle && (
            <section className="mt-12 rounded-2xl border border-accent/20 bg-accent/5 p-6 sm:p-8">
              <div className="flex items-center gap-2 font-mono text-xs font-bold uppercase tracking-wider text-accent">
                <Sparkles className="h-4 w-4" />
                <span>Companion Engineering Essay</span>
              </div>
              <h3 className="mt-3 font-display text-xl font-bold text-ink sm:text-2xl">
                <Link
                  href={project.relatedArticle.slug}
                  className="hover:text-accent hover:underline transition"
                >
                  {project.relatedArticle.title}
                </Link>
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-ink/80">
                {project.relatedArticle.description}
              </p>
              <div className="mt-4">
                <Link
                  href={project.relatedArticle.slug}
                  className="inline-flex items-center gap-1.5 font-mono text-xs font-bold text-accent hover:underline"
                >
                  <span>Read the full technical deep-dive</span>
                  <ArrowUpRight className="h-3.5 w-3.5" />
                </Link>
              </div>
            </section>
          )}

          {/* Section: Author Context */}
          <section className="space-y-4 pt-10">
            <h2 className="font-display text-xl font-bold text-ink">
              Engineered by Zain Ali (HeyZain)
            </h2>
            <p className="text-sm leading-relaxed text-ink/80">
              This system is part of Zain Ali&apos;s production portfolio. Zain is a full-stack developer specializing in Next.js, React, Node.js, TypeScript, and MongoDB, engineering full-stack platforms from schema design to edge deployment.
            </p>
            <div className="flex flex-wrap gap-4 pt-2 font-mono text-xs">
              <Link href="/about" className="font-bold text-accent hover:underline">
                Read About Zain Ali&apos;s Background -&gt;
              </Link>
              <Link href="/writing" className="font-bold text-accent hover:underline">
                Explore Technical Writing &amp; Research -&gt;
              </Link>
            </div>
          </section>

          {/* Bottom Back Button */}
          <div className="mt-16 flex items-center justify-between border-t border-ink/10 pt-8 font-mono text-xs">
            <Link
              href="/projects"
              className="group inline-flex items-center gap-2 font-bold text-muted-foreground transition hover:text-ink"
            >
              <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
              <span>Back to Projects Overview</span>
            </Link>

            <Link
              href="/"
              className="group inline-flex items-center gap-1 font-bold text-accent hover:underline"
            >
              <span>Back to Portfolio Home -&gt;</span>
            </Link>
          </div>
        </article>
      </main>
    </>
  );
}
