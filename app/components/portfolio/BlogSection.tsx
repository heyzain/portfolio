"use client";

import Link from "next/link";
import { ArrowUpRight, Clock, Sparkles, Lock } from "lucide-react";

interface BlogPost {
  title: string;
  slug?: string;
  category: string;
  readTime: string;
  excerpt: string;
  thumbnail?: string;
  thumbnailAlt?: string;
  isLive?: boolean;
  isComingSoon?: boolean;
}

const POSTS: BlogPost[] = [
  {
    title: "Your React UI May Be Buggy Because It Remembers Too Much",
    slug: "/react-ui-buggy-remembers-too-much",
    category: "FRONTEND ARCHITECTURE",
    readTime: "9 min read",
    excerpt:
      "Duplicated React state creates stale UI, unnecessary effects, and avoidable failure paths. Store the minimum state, derive the rest, and make each source of truth obvious.",
    thumbnail: "/react-ui-remembers-too-much-hero.webp",
    thumbnailAlt: "A React state diagram contrasting duplicated state with one clear source of truth",
    isLive: true,
  },
  {
    title: "Your Lighthouse Score Is Green. Why Does Your Website Still Feel Slow?",
    slug: "/lighthouse-score-green-website-feels-slow",
    category: "PERFORMANCE & ARCHITECTURE",
    readTime: "8 min read",
    excerpt:
      "A good Lighthouse score does not always mean a fast-feeling website. Learn how perceived performance, Core Web Vitals, interactions, and real-user testing reveal what automated audits miss.",
    thumbnail: "/lighthouse-score-website-feels-slow-hero.webp",
    thumbnailAlt: "Lighthouse performance score compared with a website that still feels slow",
    isLive: true,
  },
  {
    title: "Beyond the API: Why Fast Backends Still Produce Slow React UIs",
    slug: "/structuring-full-stack-react-apps-for-speed",
    category: "ARCHITECTURE",
    readTime: "9 min read",
    excerpt:
      "Why fast API responses still lead to delayed interfaces, and how server-first rendering, streaming, selective hydration, and optimistic updates reduce perceived latency.",
    thumbnail: "/structuring-full-stack-react-apps-for-speed-hero.webp",
    thumbnailAlt: "Full-stack React architecture showing how UI latency can remain even when the API is fast",
    isLive: true,
  },
  {
    title: "MongoDB Indexing Strategies That Actually Scale in Production",
    category: "BACKEND & DATA",
    readTime: "Coming Soon",
    excerpt:
      "Compound indexes, execution plan profiling, and query pipeline optimizations that keep queries under 20ms under heavy load.",
    isComingSoon: true,
  },
  {
    title: "The Micro-Interaction Hierarchy: When Animations Earn Their Time",
    category: "UI CRAFT",
    readTime: "Coming Soon",
    excerpt:
      "A practical guide to physics-driven spring animations, feedback latency budgets, and reducing layout thrashing in React.",
    isComingSoon: true,
  },
];

export function BlogSection() {
  return (
    <section id="blog" className="relative overflow-hidden bg-paper px-6 py-20 text-ink sm:px-8 sm:py-24 lg:px-12">
      <div className="pointer-events-none absolute inset-0 ambient-grid opacity-50" />
      <div className="relative mx-auto max-w-[1400px]">
        {/* Section Header */}
        <div className="mb-10 flex items-baseline gap-6">
          <span className="font-mono text-xs tracking-[0.25em] text-accent">08 WRITING &amp; ARTICLES</span>
          <span className="h-px flex-1 bg-ink/20" />
          <span className="hidden font-mono text-xs text-muted-foreground md:inline">TECHNICAL ESSAYS</span>
        </div>

        <div className="mb-12 flex flex-col justify-between gap-4 md:flex-row md:items-end">
          <div>
            <p className="font-mono text-[11px] uppercase tracking-[0.28em] text-accent">RESEARCH &amp; INSIGHTS</p>
            <h2 className="mt-3 font-display text-4xl font-medium leading-[1.02] tracking-tight text-ink md:text-6xl">
              Writing &amp; Thoughts<span className="text-accent">.</span>
            </h2>
          </div>
          <p className="max-w-md text-xs sm:text-sm leading-relaxed text-muted-foreground">
            Practical breakdowns on frontend architecture, perceived performance, database query patterns, and shipping real-world software.
          </p>
        </div>

        {/* 4 Cards Grid */}
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
          {POSTS.map((post) => {
            if (post.isLive && post.slug) {
              return (
                <Link
                  key={post.title}
                  href={post.slug}
                  className="group relative flex flex-col justify-between overflow-hidden rounded-[24px] border border-ink/10 bg-white/60 p-5 shadow-[0_16px_50px_rgba(26,24,20,0.04),inset_0_1px_0_rgba(255,255,255,0.85)] backdrop-blur-xl transition-all duration-300 hover:-translate-y-1.5 hover:border-accent/40 hover:bg-white/90 hover:shadow-[0_24px_70px_rgba(26,24,20,0.08)]"
                >
                  <div>
                    {/* Live Thumbnail Image Container */}
                    <div className="relative aspect-[2/1] w-full overflow-hidden rounded-[18px] border border-ink/10 bg-paper/80">
                      {post.thumbnail ? (
                        <img
                          src={post.thumbnail}
                          alt={post.thumbnailAlt || post.title}
                          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                      ) : null}
                      <div className="absolute top-3 left-3 flex items-center gap-1.5 rounded-full bg-accent px-3 py-1 font-mono text-[9px] font-bold uppercase tracking-wider text-white shadow-md">
                        <Sparkles className="h-3 w-3" />
                        <span>NEW POST</span>
                      </div>
                    </div>

                    {/* Meta Tags Row */}
                    <div className="mt-4 flex items-center justify-between font-mono text-[10px] uppercase tracking-wider text-muted-foreground">
                      <span className="font-bold text-accent">{post.category}</span>
                      <span className="flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        {post.readTime}
                      </span>
                    </div>

                    {/* Post Title */}
                    <h3 className="mt-3 font-display text-lg font-bold leading-snug tracking-tight text-ink group-hover:text-accent transition-colors">
                      {post.title}
                    </h3>

                    {/* Excerpt */}
                    <p className="mt-2.5 line-clamp-3 text-xs leading-relaxed text-muted-foreground">
                      {post.excerpt}
                    </p>
                  </div>

                  {/* Footer Link */}
                  <div className="mt-6 flex items-center justify-between border-t border-ink/8 pt-3.5 font-mono text-[11px]">
                    <span className="text-muted-foreground">Published</span>
                    <span className="inline-flex items-center gap-1 font-bold text-accent transition-transform group-hover:translate-x-0.5">
                      <span>Read Article</span>
                      <ArrowUpRight className="h-3.5 w-3.5" />
                    </span>
                  </div>
                </Link>
              );
            }

            // Coming Soon Cards
            return (
              <div
                key={post.title}
                className="relative flex flex-col justify-between overflow-hidden rounded-[24px] border border-ink/8 bg-white/35 p-5 shadow-sm backdrop-blur-md opacity-85 transition-all duration-300 hover:opacity-100 hover:border-ink/15 hover:bg-white/50"
              >
                <div>
                  {/* Teaser Thumbnail Box */}
                  <div className="relative aspect-[2/1] w-full overflow-hidden rounded-[18px] border border-ink/8 bg-ink/[0.03] flex flex-col items-center justify-center p-4 text-center">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full border border-ink/10 bg-white/70 shadow-sm text-ink/60 mb-2">
                      <Lock className="h-4 w-4" />
                    </div>
                    <span className="font-mono text-[9px] font-bold uppercase tracking-[0.2em] text-muted-foreground">
                      DRAFTING IN PROGRESS
                    </span>
                    <div className="absolute top-3 right-3 rounded-full border border-ink/10 bg-paper px-2.5 py-0.5 font-mono text-[8px] font-bold uppercase tracking-wider text-muted-foreground">
                      UPCOMING
                    </div>
                  </div>

                  {/* Meta Tags Row */}
                  <div className="mt-4 flex items-center justify-between font-mono text-[10px] uppercase tracking-wider text-muted-foreground">
                    <span className="font-semibold text-ink/70">{post.category}</span>
                    <span className="text-muted-foreground/70">In Draft</span>
                  </div>

                  {/* Post Title */}
                  <h3 className="mt-3 font-display text-lg font-bold leading-snug tracking-tight text-ink/80">
                    {post.title}
                  </h3>

                  {/* Excerpt */}
                  <p className="mt-2.5 line-clamp-3 text-xs leading-relaxed text-muted-foreground/90">
                    {post.excerpt}
                  </p>
                </div>

                {/* Footer Status */}
                <div className="mt-6 flex items-center justify-between border-t border-ink/6 pt-3.5 font-mono text-[11px]">
                  <span className="text-muted-foreground/70">Essay</span>
                  <span className="inline-flex items-center gap-1.5 font-bold text-muted-foreground/80">
                    <span className="h-1.5 w-1.5 rounded-full bg-accent/60" />
                    <span>Coming Soon</span>
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
