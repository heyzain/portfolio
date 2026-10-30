import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  AlertCircle,
  ArrowLeft,
  ArrowUpRight,
  CheckCircle2,
  ClipboardList,
  Clock,
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
import { zentrixFeatureStatus, type FeatureCategoryGroup } from "@/content/zentrix-status";

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
  problemTitle?: string;
  problemParagraphs?: string[];
  built: string;
  builtTitle?: string;
  learningApproach?: {
    selfPaced: {
      title: string;
      description: string;
      status: string;
    };
    cohortBased: {
      title: string;
      description: string;
      status: string;
    };
    connectedEnv: {
      title: string;
      description: string;
    };
  };
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
  featureStatus?: {
    completed: FeatureCategoryGroup;
    inProgress: FeatureCategoryGroup;
    planned: FeatureCategoryGroup;
  };
  gallery?: {
    title: string;
    caption: string;
    image: string;
  }[];
}

const PROJECTS_DATA: Record<string, ProjectCaseStudy> = {
  zentrix: {
    slug: "zentrix",
    title: "Zentrix",
    subtitle: "Multi-role Learning Management System",
    metaTitle: "Zentrix — Multi-Role LMS Platform by Zain Ali | HeyZain",
    metaDescription:
      "Zentrix is an independently engineered multi-role learning management system with course authoring, learner enrollments, persistent progress tracking, and assessments built by Zain Ali.",
    category: "EDTECH & LEARNING MANAGEMENT",
    applicationCategory: "EducationalApplication",
    stack: [
      "Next.js 16",
      "React 19",
      "TypeScript",
      "MongoDB",
      "Mongoose",
      "Redux Toolkit",
      "Cloudinary",
      "LiveKit",
      "Nodemailer",
    ],
    role: "Solo Build — Architecture, Design & Full-Stack Development",
    problemTitle: "One Platform. Different Ways to Learn.",
    problem:
      "People learn in different ways. Some prefer the flexibility to learn at their own pace, revisit lessons, and fit education around their schedules. Others benefit from a more structured learning experience with organized cohorts, scheduled sessions, and guidance from tutors.\n\nA learning platform should not force everyone into the same approach.\n\nZentrix brings both learning experiences together in one environment: flexible self-paced learning and structured, cohort-based learning. It also provides tutors with tools to organize courses and administrators with the ability to manage users, access, and course publishing.",
    problemParagraphs: [
      "People learn in different ways. Some prefer the flexibility to learn at their own pace, revisit lessons, and fit education around their schedules. Others benefit from a more structured learning experience with organized cohorts, scheduled sessions, and guidance from tutors.",
      "A learning platform should not force everyone into the same approach.",
      "Zentrix brings both learning experiences together in one environment: flexible self-paced learning and structured, cohort-based learning. It also provides tutors with tools to organize courses and administrators with the ability to manage users, access, and course publishing.",
    ],
    builtTitle: "Two Learning Paths. One Platform.",
    built:
      "Developed a full-stack LMS supporting two distinct learning models: flexible self-paced learning and structured cohort-based learning, backed by role-specific experiences for learners, tutors, and administrators.",
    learningApproach: {
      selfPaced: {
        title: "Self-Paced Learning",
        description:
          "Learners can discover courses, enroll, access structured modules and lessons, complete quizzes, and track their progress independently — learning whenever and wherever it suits them.",
        status: "COMPLETE · VERIFIED",
      },
      cohortBased: {
        title: "Structured Cohort-Based Learning",
        description:
          "Learners can follow a more organized learning journey built around cohorts, scheduled sessions, and tutor guidance, with foundations for live interaction and attendance tracking.",
        status: "IN PROGRESS",
      },
      connectedEnv: {
        title: "A Connected Learning Environment",
        description:
          "Both approaches are supported by role-specific experiences for learners, tutors, and administrators, bringing course creation, enrollment, assessments, and learning management together.",
      },
    },
    challenge:
      "Designing a connected multi-role learning architecture while maintaining proper authorization, course ownership, enrollment restrictions, and persistent learner progress. Additional engineering challenges include quiz attempt integrity, course and curriculum persistence, media upload validation, and keeping paid-course enrollment restricted until a real payment workflow exists.",
    outcome:
      "Built a substantial full-stack learning management platform with manually verified core workflows, separate user experiences, and a continuously evolving feature roadmap. The core multi-role architecture, enrollment workflows, and quiz engines are manually verified, with automated testing and broader QA tooling under active enhancement.",
    highlights: [
      "Multi-Role Access Control (RBAC) separating Learner, Tutor, and Administrator environments with server-side authorization guards",
      "Hierarchical Curriculum Engine structuring modules and lessons with distinct draft, review, and publication lifecycles",
      "Stateful Enrollment & Learning Progress with persistent lesson tracking and verified quiz attempt scoring",
      "Direct Media & Assessment Pipeline incorporating Cloudinary upload signatures and timed quiz scoring",
      "Tutor Moderation & Lifecycle System preventing unpublished or rejected content from public indexing",
    ],
    liveLink: "https://zentrix-lms.vercel.app",
    featureStatus: zentrixFeatureStatus,
    gallery: [
      {
        title: "Course Catalog & Landing Page",
        caption: "Public course catalog with category filters, search querying, and publication-state verification.",
        image: "/assets/zentrix/zentrix-hero.webp",
      },
      {
        title: "Curriculum Builder & Course Management",
        caption: "Tutor curriculum authoring workflow with modules, lessons, and draft saving.",
        image: "/assets/zentrix/zentrix-curriculum-builder.webp",
      },
      {
        title: "Curriculum & Lesson Player",
        caption: "Structured video and document delivery player maintaining persistent progress records.",
        image: "/assets/zentrix/zentrix-lesson-player.webp",
      },
      {
        title: "Interactive Quiz & Assessment Engine",
        caption: "Assessment engine with question scoring, passing score validation, and attempt integrity.",
        image: "/assets/zentrix/zentrix-quiz-assessment.webp",
      },
    ],
  },
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
          <div className="mx-auto flex max-w-7xl items-center justify-between px-6 sm:px-8 py-4">
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
        <article className="mx-auto max-w-7xl px-6 sm:px-8 py-12 md:py-20">
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
            <section className="rounded-2xl border border-ink/10 bg-white/70 p-6 sm:p-7 shadow-xs">
              <div className="flex items-center gap-2 font-mono text-xs font-bold uppercase tracking-wider text-accent">
                <Layers className="h-4 w-4" />
                <span>{project.problemTitle || "The Problem Solved"}</span>
              </div>
              {project.problemParagraphs ? (
                <div className="mt-3.5 space-y-3 text-sm leading-relaxed text-ink/85">
                  {project.problemParagraphs.map((paragraph, idx) => (
                    <p
                      key={idx}
                      className={idx === 1 ? "font-semibold text-ink" : ""}
                    >
                      {paragraph}
                    </p>
                  ))}
                </div>
              ) : (
                <p className="mt-3 text-sm leading-relaxed text-ink/85">{project.problem}</p>
              )}
            </section>

            <section className="rounded-2xl border border-ink/10 bg-white/70 p-6 sm:p-7 shadow-xs">
              <div className="flex items-center gap-2 font-mono text-xs font-bold uppercase tracking-wider text-accent">
                <Cpu className="h-4 w-4" />
                <span>{project.builtTitle || "Architectural Scope & Implementation"}</span>
              </div>

              {project.learningApproach ? (
                <div className="mt-4 space-y-3.5">
                  {/* Subsection 1: Self-Paced Learning */}
                  <div>
                    <h4 className="font-display text-xs font-bold uppercase tracking-wider text-ink sm:text-sm">
                      {project.learningApproach.selfPaced.title}
                    </h4>
                    <p className="mt-1 text-xs leading-relaxed text-ink/80 sm:text-sm">
                      {project.learningApproach.selfPaced.description}
                    </p>
                  </div>

                  {/* Subsection 2: Structured Cohort-Based Learning */}
                  <div>
                    <h4 className="font-display text-xs font-bold uppercase tracking-wider text-ink sm:text-sm">
                      {project.learningApproach.cohortBased.title}
                    </h4>
                    <p className="mt-1 text-xs leading-relaxed text-ink/80 sm:text-sm">
                      {project.learningApproach.cohortBased.description}
                    </p>
                  </div>

                  {/* Tasteful Development Status Area directly beneath */}
                  <div className="rounded-xl border border-ink/10 bg-paper/80 p-3 sm:p-3.5">
                    <p className="font-mono text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
                      Development Status
                    </p>
                    <div className="mt-2 flex flex-wrap items-center gap-x-4 gap-y-2 text-xs">
                      <div className="flex items-center gap-1.5">
                        <span className="font-medium text-ink/85">Self-Paced Learning —</span>
                        <span className="inline-flex items-center gap-1 rounded-md border border-emerald-500/25 bg-emerald-500/10 px-2 py-0.5 font-mono text-[10px] font-bold text-emerald-800 dark:text-emerald-300 whitespace-nowrap">
                          <CheckCircle2 className="h-2.5 w-2.5 text-emerald-600 dark:text-emerald-400" />
                          <span>{project.learningApproach.selfPaced.status}</span>
                        </span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <span className="font-medium text-ink/85">Cohort-Based Learning —</span>
                        <span className="inline-flex items-center gap-1 rounded-md border border-amber-500/25 bg-amber-500/10 px-2 py-0.5 font-mono text-[10px] font-bold text-amber-800 dark:text-amber-300 whitespace-nowrap">
                          <Clock className="h-2.5 w-2.5 text-amber-600 dark:text-amber-400" />
                          <span>{project.learningApproach.cohortBased.status}</span>
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Subsection 3: A Connected Learning Environment */}
                  <div className="border-t border-ink/8 pt-3">
                    <h4 className="font-display text-xs font-bold uppercase tracking-wider text-ink sm:text-sm">
                      {project.learningApproach.connectedEnv.title}
                    </h4>
                    <p className="mt-1 text-xs leading-relaxed text-ink/80 sm:text-sm">
                      {project.learningApproach.connectedEnv.description}
                    </p>
                  </div>
                </div>
              ) : (
                <p className="mt-3 text-sm leading-relaxed text-ink/85">{project.built}</p>
              )}
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

          {/* Section: Interface & Architectural Previews */}
          {project.gallery && project.gallery.length > 0 && (
            <section className="space-y-6 border-b border-ink/10 py-12">
              <div>
                <div className="inline-flex items-center gap-2 rounded-full border border-ink/15 bg-white/70 px-3 py-1 font-mono text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
                  <CheckCircle2 className="h-3.5 w-3.5 text-accent" />
                  <span>Verified System Previews</span>
                </div>
                <h2 className="mt-3 font-display text-2xl font-bold tracking-tight text-ink sm:text-3xl">
                  Interface &amp; Workflow Previews
                </h2>
                <p className="mt-1 text-sm text-muted-foreground">
                  Verified workflow screenshots captured directly from the Zentrix LMS engineering environment.
                </p>
              </div>

              <div className="grid gap-6 sm:grid-cols-2">
                {project.gallery.map((screen) => (
                  <div
                    key={screen.title}
                    className="overflow-hidden rounded-2xl border border-ink/12 bg-white/80 p-3 shadow-xs transition hover:border-ink/25"
                  >
                    <div className="aspect-[16/10] overflow-hidden rounded-xl border border-ink/10 bg-paper/60">
                      <img
                        src={screen.image}
                        alt={`${screen.title} - ${screen.caption}`}
                        className="h-full w-full object-cover transition duration-500 hover:scale-[1.03]"
                        loading="lazy"
                      />
                    </div>
                    <div className="px-1.5 pt-3 pb-1">
                      <h3 className="font-display text-base font-bold text-ink">{screen.title}</h3>
                      <p className="mt-1 text-xs leading-relaxed text-muted-foreground">{screen.caption}</p>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Section: Feature Verification & Implementation Status */}
          {project.featureStatus && (
            <section className="space-y-8 border-b border-ink/10 py-12">
              <div>
                <div className="inline-flex items-center gap-2 rounded-full border border-accent/25 bg-accent/10 px-3 py-1 font-mono text-xs font-bold uppercase tracking-widest text-accent">
                  <ClipboardList className="h-3.5 w-3.5" />
                  <span>Feature Status &amp; Verification Matrix</span>
                </div>
                <h2 className="mt-3 font-display text-2xl font-bold tracking-tight text-ink sm:text-3xl md:text-4xl">
                  Implementation &amp; Feature Verification
                </h2>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground sm:text-base max-w-3xl">
                  A transparent breakdown of verified capabilities, partially implemented workflows under active refinement, and planned roadmap items. Core functionality has been verified manually in the codebase.
                </p>
              </div>

              {/* Status Note Banner */}
              <div className="rounded-2xl border border-ink/10 bg-white/60 p-5 text-xs sm:text-sm leading-relaxed text-ink/80 shadow-xs">
                <span className="font-mono text-xs font-bold uppercase tracking-wider text-ink">Engineering Verification Note:</span>{" "}
                All items marked <span className="font-semibold text-emerald-700 dark:text-emerald-400">Complete — Verified</span> have been manually verified by the developer in the codebase. Features marked <span className="font-semibold text-amber-700 dark:text-amber-400">In Progress — Partial</span> have active codebase implementations undergoing refinement. Features marked <span className="font-semibold text-muted-foreground">Planned — Not Implemented</span> represent future roadmap items (payments, messaging, notifications) that are not yet operational.
              </div>

              {/* 3 Visible Columns / Sections */}
              <div className="grid gap-6 lg:grid-cols-3">
                {/* 1. COMPLETE — VERIFIED */}
                <div className="flex flex-col rounded-2xl border border-emerald-500/25 bg-white/70 p-5 sm:p-6 shadow-xs">
                  <div className="border-b border-emerald-500/15 pb-4">
                    <div className="flex items-center justify-between gap-3">
                      <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3 py-1 font-mono text-xs font-bold text-emerald-800 dark:text-emerald-300 whitespace-nowrap">
                        <CheckCircle2 className="h-3.5 w-3.5 text-emerald-600 dark:text-emerald-400 shrink-0" />
                        <span>COMPLETE — VERIFIED</span>
                      </span>
                      <span className="font-mono text-xs font-bold text-muted-foreground whitespace-nowrap">
                        {project.featureStatus.completed.features.length} Items
                      </span>
                    </div>
                    <p className="mt-2.5 text-xs leading-relaxed text-muted-foreground">
                      {project.featureStatus.completed.description}
                    </p>
                  </div>

                  <div className="mt-4 flex-1 space-y-3">
                    {project.featureStatus.completed.features.map((item) => (
                      <div
                        key={item.name}
                        className="rounded-xl border border-emerald-500/15 bg-paper/60 p-3.5 sm:p-4 transition hover:border-emerald-500/35 hover:bg-paper"
                      >
                        <div className="flex flex-wrap items-center justify-between gap-x-2.5 gap-y-1.5">
                          <h4 className="font-display text-xs font-bold text-ink sm:text-sm">
                            {item.name}
                          </h4>
                          <span className="inline-flex shrink-0 items-center gap-1 rounded-md border border-emerald-500/25 bg-emerald-500/10 px-2 py-0.5 font-mono text-[10px] font-semibold text-emerald-800 dark:text-emerald-300 whitespace-nowrap">
                            <CheckCircle2 className="h-2.5 w-2.5 text-emerald-600 dark:text-emerald-400" />
                            <span>{item.status}</span>
                          </span>
                        </div>
                        {item.subItems && item.subItems.length > 0 && (
                          <ul className="mt-2.5 space-y-1 border-t border-ink/6 pt-2 font-mono text-[11px] text-muted-foreground">
                            {item.subItems.map((sub) => (
                              <li key={sub} className="flex items-center gap-1.5">
                                <span className="h-1 w-1 rounded-full bg-emerald-600 dark:bg-emerald-400 shrink-0" />
                                <span>{sub}</span>
                              </li>
                            ))}
                          </ul>
                        )}
                      </div>
                    ))}
                  </div>
                </div>

                {/* 2. IN PROGRESS */}
                <div className="flex flex-col rounded-2xl border border-amber-500/25 bg-white/70 p-5 sm:p-6 shadow-xs">
                  <div className="border-b border-amber-500/15 pb-4">
                    <div className="flex items-center justify-between gap-3">
                      <span className="inline-flex items-center gap-1.5 rounded-full border border-amber-500/30 bg-amber-500/10 px-3 py-1 font-mono text-xs font-bold text-amber-800 dark:text-amber-300 whitespace-nowrap">
                        <Clock className="h-3.5 w-3.5 text-amber-600 dark:text-amber-400 shrink-0" />
                        <span>IN PROGRESS</span>
                      </span>
                      <span className="font-mono text-xs font-bold text-muted-foreground whitespace-nowrap">
                        {project.featureStatus.inProgress.features.length} Items
                      </span>
                    </div>
                    <p className="mt-2.5 text-xs leading-relaxed text-muted-foreground">
                      {project.featureStatus.inProgress.description}
                    </p>
                  </div>

                  <div className="mt-4 flex-1 space-y-3">
                    {project.featureStatus.inProgress.features.map((item) => (
                      <div
                        key={item.name}
                        className="rounded-xl border border-amber-500/15 bg-paper/60 p-3.5 sm:p-4 transition hover:border-amber-500/35 hover:bg-paper"
                      >
                        <div className="flex flex-wrap items-center justify-between gap-x-2.5 gap-y-1.5">
                          <h4 className="font-display text-xs font-bold text-ink sm:text-sm">
                            {item.name}
                          </h4>
                          <span className="inline-flex shrink-0 items-center gap-1 rounded-md border border-amber-500/25 bg-amber-500/10 px-2 py-0.5 font-mono text-[10px] font-semibold text-amber-800 dark:text-amber-300 whitespace-nowrap">
                            <Clock className="h-2.5 w-2.5 text-amber-600 dark:text-amber-400" />
                            <span>{item.status}</span>
                          </span>
                        </div>
                        {item.subItems && item.subItems.length > 0 && (
                          <ul className="mt-2.5 space-y-1 border-t border-ink/6 pt-2 font-mono text-[11px] text-muted-foreground">
                            {item.subItems.map((sub) => (
                              <li key={sub} className="flex items-center gap-1.5">
                                <span className="h-1 w-1 rounded-full bg-amber-600 dark:bg-amber-400 shrink-0" />
                                <span>{sub}</span>
                              </li>
                            ))}
                          </ul>
                        )}
                      </div>
                    ))}
                  </div>
                </div>

                {/* 3. PLANNED */}
                <div className="flex flex-col rounded-2xl border border-ink/15 bg-white/70 p-5 sm:p-6 shadow-xs">
                  <div className="border-b border-ink/10 pb-4">
                    <div className="flex items-center justify-between gap-3">
                      <span className="inline-flex items-center gap-1.5 rounded-full border border-ink/15 bg-ink/5 px-3 py-1 font-mono text-xs font-bold text-ink/75 whitespace-nowrap">
                        <AlertCircle className="h-3.5 w-3.5 text-muted-foreground shrink-0" />
                        <span>PLANNED</span>
                      </span>
                      <span className="font-mono text-xs font-bold text-muted-foreground whitespace-nowrap">
                        {project.featureStatus.planned.features.length} Items
                      </span>
                    </div>
                    <p className="mt-2.5 text-xs leading-relaxed text-muted-foreground">
                      {project.featureStatus.planned.description}
                    </p>
                  </div>

                  <div className="mt-4 flex-1 space-y-3">
                    {project.featureStatus.planned.features.map((item) => (
                      <div
                        key={item.name}
                        className="rounded-xl border border-ink/10 bg-paper/60 p-3.5 sm:p-4 transition hover:border-ink/25 hover:bg-paper"
                      >
                        <div className="flex flex-wrap items-center justify-between gap-x-2.5 gap-y-1.5">
                          <h4 className="font-display text-xs font-bold text-ink sm:text-sm">
                            {item.name}
                          </h4>
                          <span className="inline-flex shrink-0 items-center gap-1 rounded-md border border-ink/15 bg-ink/5 px-2 py-0.5 font-mono text-[10px] font-semibold text-muted-foreground whitespace-nowrap">
                            <AlertCircle className="h-2.5 w-2.5 text-muted-foreground" />
                            <span>{item.status}</span>
                          </span>
                        </div>
                        {item.subItems && item.subItems.length > 0 && (
                          <ul className="mt-2.5 space-y-1 border-t border-ink/6 pt-2 font-mono text-[11px] text-muted-foreground">
                            {item.subItems.map((sub) => (
                              <li key={sub} className="flex items-center gap-1.5">
                                <span className="h-1 w-1 rounded-full bg-ink/40 shrink-0" />
                                <span>{sub}</span>
                              </li>
                            ))}
                          </ul>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </section>
          )}

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
