import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowLeft,
  ArrowUpRight,
  BookOpen,
  Clock,
  Lock,
} from "lucide-react";
import {
  absoluteUrl,
  personEntityId,
  siteName,
  getBreadcrumbSchema,
  getCollectionPageSchema,
} from "@/lib/seo";

export const metadata: Metadata = {
  title: "Technical Writing & Engineering Insights — Zain Ali | HeyZain",
  description:
    "Explore deep-dive technical essays by Zain Ali (HeyZain) on full-stack React performance, database query optimization, perceived latency, and state architecture.",
  alternates: {
    canonical: absoluteUrl("/writing"),
  },
  openGraph: {
    title: "Technical Writing & Engineering Insights — Zain Ali | HeyZain",
    description:
      "Explore deep-dive technical essays by Zain Ali (HeyZain) on full-stack React performance, database query optimization, perceived latency, and state architecture.",
    url: absoluteUrl("/writing"),
    siteName,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Technical Writing & Engineering Insights — Zain Ali | HeyZain",
    description:
      "Explore deep-dive technical essays by Zain Ali (HeyZain) on full-stack React performance, database query optimization, perceived latency, and state architecture.",
  },
};

const ARTICLES = [
  {
    title: "The Page Felt Slow. React Wasn't the Bottleneck.",
    slug: "/react-page-slow-database-query-bottleneck",
    category: "FULL-STACK PERFORMANCE",
    readTime: "11 min read",
    excerpt:
      "The delay appeared after a click in the UI, so React looked suspicious. Tracing the request backwards through the API handler and the MongoDB execution plan told a different story.",
    thumbnail: "/react-page-slow-database-query-bottleneck-hero.webp",
    thumbnailAlt: "A request pipeline diagram showing latency concentrated in the database layer, not the React render",
    datePublished: "2026-08-31",
  },
  {
    title: "Beyond the API: Why Fast Backends Still Produce Slow React UIs",
    slug: "/structuring-full-stack-react-apps-for-speed",
    category: "ARCHITECTURE & STREAMING",
    readTime: "9 min read",
    excerpt:
      "Why fast API responses still lead to delayed interfaces, and how server-first rendering, streaming, selective hydration, and optimistic updates reduce perceived latency.",
    thumbnail: "/structuring-full-stack-react-apps-for-speed-hero.webp",
    thumbnailAlt: "Full-stack React architecture showing how UI latency can remain even when the API is fast",
    datePublished: "2026-08-18",
  },
  {
    title: "Your React UI May Be Buggy Because It Remembers Too Much",
    slug: "/react-ui-buggy-remembers-too-much",
    category: "FRONTEND ARCHITECTURE",
    readTime: "9 min read",
    excerpt:
      "Duplicated React state creates stale UI, unnecessary effects, and avoidable failure paths. Store the minimum state, derive the rest, and make each source of truth obvious.",
    thumbnail: "/react-ui-remembers-too-much-hero.webp",
    thumbnailAlt: "A React state diagram contrasting duplicated state with one clear source of truth",
    datePublished: "2026-08-28",
  },
  {
    title: "Your Lighthouse Score Is Green. Why Does Your Website Still Feel Slow?",
    slug: "/lighthouse-score-green-website-feels-slow",
    category: "PERFORMANCE & UX",
    readTime: "8 min read",
    excerpt:
      "A good Lighthouse score does not always mean a fast-feeling website. Learn how perceived performance, Core Web Vitals, interactions, and real-user testing reveal what automated audits miss.",
    thumbnail: "/lighthouse-score-website-feels-slow-hero.webp",
    thumbnailAlt: "Lighthouse performance score compared with a website that still feels slow",
    datePublished: "2026-08-17",
  },
];

const UPCOMING_DRAFTS = [
  {
    title: "MongoDB Indexing Strategies That Actually Scale in Production",
    category: "BACKEND & DATA",
    readTime: "Coming Soon",
    excerpt:
      "Compound indexes, execution plan profiling, and query pipeline optimizations that keep queries under 20ms under heavy load.",
  },
  {
    title: "The Micro-Interaction Hierarchy: When Animations Earn Their Time",
    category: "UI CRAFT & SPRINGS",
    readTime: "Coming Soon",
    excerpt:
      "A practical guide to physics-driven spring animations, feedback latency budgets, and reducing layout thrashing in React.",
  },
];

export default function WritingIndexPage() {
  const collectionSchema = getCollectionPageSchema({
    name: "Technical Writing & Engineering Insights — Zain Ali",
    description:
      "Deep-dive technical essays on full-stack architecture, React performance, database query execution plans, and frontend state design.",
    path: "/writing",
  });

  const itemListSchema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Technical Essays by Zain Ali",
    itemListElement: ARTICLES.map((article, index) => ({
      "@type": "ListItem",
      position: index + 1,
      item: {
        "@type": "TechArticle",
        headline: article.title,
        description: article.excerpt,
        url: absoluteUrl(article.slug),
        datePublished: article.datePublished,
        author: {
          "@id": personEntityId,
        },
      },
    })),
  };

  const breadcrumbSchema = getBreadcrumbSchema([
    { name: "Home", path: "/" },
    { name: "Writing", path: "/writing" },
  ]);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(collectionSchema).replace(/</g, "\\u003c"),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(itemListSchema).replace(/</g, "\\u003c"),
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
              <Link href="/projects" className="text-muted-foreground transition hover:text-accent">
                PROJECTS
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
        <div className="mx-auto max-w-4xl px-6 py-12 md:py-20">
          {/* Breadcrumbs */}
          <nav aria-label="Breadcrumb" className="mb-6 font-mono text-xs text-muted-foreground">
            <ol className="flex items-center gap-2">
              <li>
                <Link href="/" className="hover:text-ink transition">
                  Home
                </Link>
              </li>
              <li aria-hidden="true">/</li>
              <li className="font-semibold text-ink" aria-current="page">
                Writing
              </li>
            </ol>
          </nav>

          {/* Header Section */}
          <header className="border-b border-ink/10 pb-10">
            <div className="inline-flex items-center gap-2 rounded-full border border-accent/20 bg-accent/10 px-3 py-1 font-mono text-xs font-bold uppercase tracking-widest text-accent">
              <BookOpen className="h-3.5 w-3.5" />
              <span>Technical Essays &amp; Case Studies</span>
            </div>
            <h1 className="mt-4 font-display text-4xl font-bold tracking-tight text-ink sm:text-5xl md:text-6xl">
              Writing &amp; Technical Insights
            </h1>
            <p className="mt-6 text-lg leading-relaxed text-ink/80 md:text-xl">
              Practical investigations into full-stack performance debugging, React state hygiene, MongoDB query planning, and building production web applications.
            </p>
          </header>

          {/* Articles Grid */}
          <div className="mt-12 space-y-8">
            <h2 className="font-display text-2xl font-bold tracking-tight text-ink sm:text-3xl">
              Published Deep Dives
            </h2>

            <div className="grid gap-6 sm:grid-cols-2">
              {ARTICLES.map((article) => (
                <Link
                  key={article.slug}
                  href={article.slug}
                  className="group flex flex-col justify-between rounded-2xl border border-ink/10 bg-white/70 p-5 shadow-xs transition hover:-translate-y-1 hover:border-accent/40 hover:bg-white"
                >
                  <div>
                    <div className="aspect-[2/1] overflow-hidden rounded-xl border border-ink/10 bg-paper/60">
                      <img
                        src={article.thumbnail}
                        alt={article.thumbnailAlt}
                        className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                      />
                    </div>

                    <div className="mt-4 flex items-center justify-between font-mono text-[10px] uppercase tracking-wider text-muted-foreground">
                      <span className="font-bold text-accent">{article.category}</span>
                      <span className="flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        {article.readTime}
                      </span>
                    </div>

                    <h3 className="mt-2.5 font-display text-lg font-bold leading-snug tracking-tight text-ink group-hover:text-accent transition-colors">
                      {article.title}
                    </h3>
                    <p className="mt-2 text-xs leading-relaxed text-muted-foreground line-clamp-3">
                      {article.excerpt}
                    </p>
                  </div>

                  <div className="mt-5 flex items-center justify-between border-t border-ink/8 pt-3 font-mono text-xs font-bold text-accent">
                    <span>Read Deep Dive</span>
                    <ArrowUpRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </div>
                </Link>
              ))}
            </div>
          </div>

          {/* Upcoming Drafts */}
          <div className="mt-16 space-y-6 border-t border-ink/10 pt-12">
            <div>
              <p className="font-mono text-xs uppercase tracking-widest text-muted-foreground">In Progress</p>
              <h2 className="mt-1 font-display text-xl font-bold tracking-tight text-ink sm:text-2xl">
                Upcoming Research &amp; Drafts
              </h2>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              {UPCOMING_DRAFTS.map((draft) => (
                <div
                  key={draft.title}
                  className="flex flex-col justify-between rounded-xl border border-ink/8 bg-white/40 p-5 shadow-xs"
                >
                  <div>
                    <div className="flex items-center justify-between font-mono text-[10px] uppercase tracking-wider text-muted-foreground">
                      <span>{draft.category}</span>
                      <span className="inline-flex items-center gap-1 text-muted-foreground/80">
                        <Lock className="h-3 w-3" />
                        {draft.readTime}
                      </span>
                    </div>
                    <h3 className="mt-2 font-display text-base font-bold text-ink/80">
                      {draft.title}
                    </h3>
                    <p className="mt-1.5 text-xs text-muted-foreground leading-relaxed">
                      {draft.excerpt}
                    </p>
                  </div>
                </div>
              ))}
            </div>
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
              href="/projects"
              className="group inline-flex items-center gap-1 font-bold text-accent hover:underline"
            >
              <span>Explore Projects -&gt;</span>
            </Link>
          </div>
        </div>
      </main>
    </>
  );
}
