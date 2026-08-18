"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  Check,
  Copy,
  Share2,
  Clock,
  Calendar,
  Layers,
  Zap,
  Server,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  RefreshCw,
  Cpu,
  GitBranch,
  Gauge,
  HelpCircle,
} from "lucide-react";
import { toast } from "sonner";

export function BlogPostClient() {
  const [copied, setCopied] = useState(false);
  const [activeTab, setActiveTab] = useState<"conventional" | "modern">("modern");
  const [codeCopied, setCodeCopied] = useState<string | null>(null);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (totalHeight > 0) {
        const currentProgress = (window.scrollY / totalHeight) * 100;
        setScrollProgress(Math.min(100, Math.max(0, currentProgress)));
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const copyPageUrl = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      toast.success("Link copied to clipboard!");
      setTimeout(() => setCopied(false), 2000);
    } catch {
      toast.error("Failed to copy link");
    }
  };

  const copyCode = async (id: string, code: string) => {
    try {
      await navigator.clipboard.writeText(code);
      setCodeCopied(id);
      toast.success("Code snippet copied!");
      setTimeout(() => setCodeCopied(null), 2000);
    } catch {
      toast.error("Failed to copy code");
    }
  };

  const optimisticCodeSnippet = `// 1. Server Action for safe database mutation
"use server";
import { revalidatePath } from "next/cache";

export async function toggleBookmarkAction(id: string, currentState: boolean) {
  try {
    await db.bookmarks.updateOne({ id }, { $set: { saved: !currentState } });
    revalidatePath("/dashboard");
    return { success: true };
  } catch (error) {
    throw new Error("Failed to update bookmark");
  }
}

// 2. Interactive Island with React 19 useOptimistic
"use client";
import { useOptimistic, useTransition } from "react";
import { toggleBookmarkAction } from "./actions";

export function BookmarkButton({ id, initialSaved }: { id: string; initialSaved: boolean }) {
  const [isPending, startTransition] = useTransition();
  const [optimisticSaved, setOptimisticSaved] = useOptimistic(
    initialSaved,
    (state, newState: boolean) => newState
  );

  const handleClick = () => {
    startTransition(async () => {
      // Instant visual feedback (0ms perceived latency)
      setOptimisticSaved(!optimisticSaved);
      try {
        await toggleBookmarkAction(id, optimisticSaved);
      } catch (err) {
        // Automatic rollback handled if server action throws
        console.error("Mutation failed", err);
      }
    });
  };

  return (
    <button
      onClick={handleClick}
      aria-label={optimisticSaved ? "Remove bookmark" : "Save bookmark"}
      className={\`transition \${optimisticSaved ? "text-accent" : "text-ink/40"}\`}
    >
      <BookmarkIcon filled={optimisticSaved} />
    </button>
  );
}`;

  const streamingCodeSnippet = `// app/dashboard/page.tsx (React Server Component)
import { Suspense } from "react";
import { DashboardShell } from "@/components/DashboardShell";
import { AnalyticsChartSkeleton, ChartSection } from "@/components/ChartSection";
import { RecentActivityList } from "@/components/RecentActivityList";

export default async function DashboardPage() {
  return (
    <DashboardShell>
      {/* 1. Fast Shell renders immediately without blocking */}
      <h1 className="font-display text-2xl font-bold">Analytics Overview</h1>

      {/* 2. Heavy async reads stream progressively behind Suspense */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
        <div className="md:col-span-2">
          <Suspense fallback={<AnalyticsChartSkeleton />}>
            <ChartSection />
          </Suspense>
        </div>

        <div>
          <Suspense fallback={<div className="h-64 animate-pulse bg-paper/60 rounded-xl" />}>
            <RecentActivityList />
          </Suspense>
        </div>
      </div>
    </DashboardShell>
  );
}`;

  return (
    <>
      {/* Top Reading Progress Bar */}
      <div className="fixed top-0 left-0 right-0 z-50 h-1 bg-ink/5">
        <div
          className="h-full bg-accent transition-all duration-150 ease-out"
          style={{ width: `${scrollProgress}%` }}
        />
      </div>

      {/* Floating Header */}
      <header className="sticky top-0 z-40 w-full border-b border-ink/10 bg-paper/85 backdrop-blur-xl transition-all">
        <div className="mx-auto flex max-w-5xl items-center justify-between px-6 py-4 sm:px-8">
          <Link
            href="/"
            className="group inline-flex items-center gap-2 font-mono text-xs font-semibold tracking-wider text-ink/75 transition-colors hover:text-accent"
          >
            <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
            <span>BACK TO PORTFOLIO</span>
          </Link>

          <div className="flex items-center gap-3">
            <button
              onClick={copyPageUrl}
              type="button"
              aria-label="Share article"
              className="inline-flex items-center gap-1.5 rounded-full border border-ink/10 bg-white/70 px-3.5 py-1.5 font-mono text-[11px] font-medium uppercase tracking-wider text-ink transition-all hover:border-accent/40 hover:bg-white hover:text-accent shadow-sm"
            >
              {copied ? (
                <>
                  <Check className="h-3.5 w-3.5 text-emerald-600" />
                  <span className="text-emerald-600">COPIED</span>
                </>
              ) : (
                <>
                  <Share2 className="h-3.5 w-3.5" />
                  <span>SHARE</span>
                </>
              )}
            </button>
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <article className="relative min-h-screen bg-paper text-ink pb-24 selection:bg-accent/15 selection:text-accent">
        {/* Ambient Grid Background */}
        <div className="pointer-events-none absolute inset-0 ambient-grid opacity-40" />

        <div className="relative mx-auto max-w-4xl px-6 pt-12 sm:px-8 sm:pt-16 md:pt-20">
          {/* Breadcrumb / Category Tag */}
          <div className="mb-6 flex flex-wrap items-center gap-2 font-mono text-xs text-muted-foreground">
            <Link href="/" className="hover:text-accent transition-colors">
              HOME
            </Link>
            <span>/</span>
            <span className="text-accent font-semibold tracking-wider">ARCHITECTURE</span>
            <span>/</span>
            <span>PERCEIVED SPEED</span>
          </div>

          {/* Headline */}
          <h1 className="font-display text-3xl font-medium leading-[1.08] tracking-tight text-ink sm:text-5xl md:text-6xl">
            Beyond the API: Why Fast Backends Still Produce Slow React UIs
          </h1>

          {/* Subtitle / Lead Paragraph */}
          <p className="mt-6 text-lg sm:text-xl font-normal leading-relaxed text-muted-foreground">
            Your API can respond in 45ms, yet the user experience still feels sluggish. The problem is rarely the database query—it is how much of your frontend architecture is forced to wait in sequential network and JavaScript waterfalls.
          </p>

          {/* Author & Meta Row */}
          <div className="mt-8 flex flex-wrap items-center justify-between gap-4 border-y border-ink/10 py-4 text-xs font-mono text-muted-foreground">
            <div className="flex items-center gap-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-full border border-ink/15 bg-accent/10 font-bold text-accent">
                ZA
              </div>
              <div>
                <span className="block font-semibold text-ink">Zain Ali</span>
                <span className="text-[11px]">Full-Stack Developer</span>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-4 sm:gap-6 text-[11px]">
              <span className="flex items-center gap-1.5">
                <Calendar className="h-3.5 w-3.5 text-accent" />
                August 2026
              </span>
              <span className="flex items-center gap-1.5">
                <Clock className="h-3.5 w-3.5 text-accent" />
                9 min read
              </span>
              <span className="hidden sm:inline-block rounded-full bg-accent/10 border border-accent/20 px-2.5 py-0.5 font-bold text-accent">
                FULL-STACK ARCHITECTURE
              </span>
            </div>
          </div>

          {/* Wide Hero Image */}
          <div className="my-10 overflow-hidden rounded-[24px] border border-ink/10 bg-white/60 shadow-[0_20px_60px_rgba(26,24,20,0.06),inset_0_1px_0_rgba(255,255,255,0.85)]">
            <img
              src="/structuring-full-stack-react-apps-for-speed-hero.webp"
              alt="Full-stack React architecture showing how UI latency can remain even when the API is fast"
              className="h-auto w-full object-cover"
              loading="eager"
            />
          </div>

          {/* Quick Summary / Key Takeaways Box */}
          <div className="my-10 rounded-[22px] border border-accent/20 bg-accent/[0.04] p-6 sm:p-8 backdrop-blur-md">
            <div className="flex items-center gap-2 font-mono text-xs font-bold uppercase tracking-[0.2em] text-accent">
              <Sparkles className="h-4 w-4" />
              <span>THE ARCHITECTURAL CORE</span>
            </div>
            <h2 className="mt-3 font-display text-xl font-bold text-ink">
              Fast backends do not guarantee fast interfaces.
            </h2>
            <p className="mt-2 text-sm leading-relaxed text-ink/80">
              When an interface feels delayed, inspecting the DevTools Network panel often shows sub-100ms API responses. The true delay lives in the sequential chain: browser bundle execution, hydration, post-render fetches, dependent waterfalls, and blocking mutation updates.
            </p>
            <div className="mt-5 grid gap-3 sm:grid-cols-2 font-mono text-xs text-ink/85">
              <div className="flex items-start gap-2">
                <span className="font-bold text-accent">01.</span>
                <span>Move reads server-side with Server Components to eliminate client fetch waterfalls.</span>
              </div>
              <div className="flex items-start gap-2">
                <span className="font-bold text-accent">02.</span>
                <span>Stream independent async work with Suspense boundaries.</span>
              </div>
              <div className="flex items-start gap-2">
                <span className="font-bold text-accent">03.</span>
                <span>Hydrate only interactive islands via React selective hydration.</span>
              </div>
              <div className="flex items-start gap-2">
                <span className="font-bold text-accent">04.</span>
                <span>Apply optimistic UI for mutations paired with targeted cache revalidation.</span>
              </div>
            </div>
          </div>

          {/* SECTION 1 */}
          <section className="prose prose-stone max-w-none text-ink/90">
            <h2 className="mt-12 font-display text-2xl font-bold tracking-tight text-ink sm:text-3xl">
              1. The Contradiction: Fast API, Delayed User Experience
            </h2>
            <p className="mt-4 text-base leading-relaxed text-ink/80">
              Developers investigating sluggish interactions usually start in the browser’s Network tab. They see a database query taking 28ms and the API route completing in 60ms, concluding that <em>“backend performance is already optimal.”</em>
            </p>
            <p className="mt-3 text-base leading-relaxed text-ink/80">
              Yet from the user’s perspective, three whole seconds elapsed between clicking a link and seeing actionable information. Why? Because request duration is only one small slice of the overall delivery path.
            </p>

            {/* Timeline Breakdown Card */}
            <div className="my-8 rounded-[20px] border border-ink/10 bg-white/70 p-6 shadow-sm">
              <h3 className="font-mono text-xs font-bold uppercase tracking-wider text-muted-foreground">
                WHERE THE TIME ACTUALLY GOES
              </h3>
              <div className="mt-4 space-y-3">
                <div>
                  <div className="flex justify-between text-xs font-mono mb-1">
                    <span className="font-semibold text-ink">API Response (Server Work)</span>
                    <span className="text-emerald-700 font-bold">50ms (3%)</span>
                  </div>
                  <div className="h-3 w-full rounded-full bg-ink/10 overflow-hidden">
                    <div className="h-full bg-emerald-500 rounded-full" style={{ width: "5%" }} />
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-xs font-mono mb-1">
                    <span className="font-semibold text-ink">Client Bundle Download &amp; Parsing</span>
                    <span className="text-accent font-bold">450ms (27%)</span>
                  </div>
                  <div className="h-3 w-full rounded-full bg-ink/10 overflow-hidden">
                    <div className="h-full bg-accent/70 rounded-full" style={{ width: "27%" }} />
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-xs font-mono mb-1">
                    <span className="font-semibold text-ink">Hydration &amp; Component Mount</span>
                    <span className="text-amber-600 font-bold">380ms (23%)</span>
                  </div>
                  <div className="h-3 w-full rounded-full bg-ink/10 overflow-hidden">
                    <div className="h-full bg-amber-500 rounded-full" style={{ width: "23%" }} />
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-xs font-mono mb-1">
                    <span className="font-semibold text-ink">Client-Side Waterfall Fetches</span>
                    <span className="text-rose-600 font-bold">750ms (47%)</span>
                  </div>
                  <div className="h-3 w-full rounded-full bg-ink/10 overflow-hidden">
                    <div className="h-full bg-rose-500 rounded-full" style={{ width: "47%" }} />
                  </div>
                </div>
              </div>
              <p className="mt-4 text-xs font-mono text-muted-foreground text-center">
                Total perceived wait: ~1,630ms — even though the backend finished its query in 50ms.
              </p>
            </div>
          </section>

          {/* SECTION 2 */}
          <section className="prose prose-stone max-w-none text-ink/90">
            <h2 className="mt-14 font-display text-2xl font-bold tracking-tight text-ink sm:text-3xl">
              2. The Sequential Waterfall of Client-Heavy SPAs
            </h2>
            <p className="mt-4 text-base leading-relaxed text-ink/80">
              In traditional Single Page Applications (and Client-heavy React architectures), work is stacked sequentially:
            </p>

            <div className="my-6 rounded-[20px] border border-ink/10 bg-ink/[0.02] p-5 font-mono text-xs sm:text-sm">
              <div className="flex flex-wrap items-center gap-2 text-ink/75 leading-relaxed">
                <span className="rounded bg-ink/10 px-2 py-1 font-bold text-ink">HTML Shell</span>
                <span>&rarr;</span>
                <span className="rounded bg-accent/15 px-2 py-1 font-bold text-accent">JS Download</span>
                <span>&rarr;</span>
                <span className="rounded bg-amber-500/15 px-2 py-1 font-bold text-amber-800">Hydrate</span>
                <span>&rarr;</span>
                <span className="rounded bg-rose-500/15 px-2 py-1 font-bold text-rose-800">Client Fetch</span>
                <span>&rarr;</span>
                <span className="rounded bg-emerald-500/15 px-2 py-1 font-bold text-emerald-800">Render Useful UI</span>
              </div>
            </div>

            <p className="mt-3 text-base leading-relaxed text-ink/80">
              The browser cannot request critical data until JavaScript has already downloaded, evaluated, and mounted that specific component. If child components initiate subsequent requests based on parent data, the user gets trapped in a multi-stage loading spinner cascade.
            </p>
          </section>

          {/* SECTION 3: INTERACTIVE ARCHITECTURE COMPARISON */}
          <section className="my-14 rounded-[26px] border border-ink/12 bg-white/80 p-6 sm:p-8 shadow-[0_20px_70px_rgba(26,24,20,0.05),inset_0_1px_0_rgba(255,255,255,0.9)] backdrop-blur-xl">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-ink/10 pb-5">
              <div>
                <span className="font-mono text-[10px] font-bold uppercase tracking-[0.2em] text-accent">
                  ARCHITECTURE BLUEPRINT
                </span>
                <h3 className="mt-1 font-display text-xl font-bold text-ink">
                  Comparing the Workflow Execution Models
                </h3>
              </div>

              {/* Tab Selector */}
              <div className="flex rounded-full border border-ink/10 bg-paper/80 p-1">
                <button
                  type="button"
                  onClick={() => setActiveTab("conventional")}
                  className={`rounded-full px-4 py-1.5 font-mono text-xs font-bold uppercase tracking-wider transition ${
                    activeTab === "conventional"
                      ? "bg-rose-500/15 text-rose-700 shadow-sm"
                      : "text-muted-foreground hover:text-ink"
                  }`}
                >
                  Conventional SPA
                </button>
                <button
                  type="button"
                  onClick={() => setActiveTab("modern")}
                  className={`rounded-full px-4 py-1.5 font-mono text-xs font-bold uppercase tracking-wider transition ${
                    activeTab === "modern"
                      ? "bg-accent text-white shadow-sm"
                      : "text-muted-foreground hover:text-ink"
                  }`}
                >
                  Server-First + Streaming
                </button>
              </div>
            </div>

            {/* Architecture Details Box */}
            <div className="mt-6">
              {activeTab === "conventional" ? (
                <div className="space-y-4">
                  <div className="rounded-xl border border-rose-500/20 bg-rose-500/5 p-4 text-xs font-mono text-rose-900 leading-relaxed">
                    <p className="font-bold uppercase tracking-wider text-rose-700 mb-2">Sequential Waterfall Execution:</p>
                    <ol className="list-decimal pl-5 space-y-1.5">
                      <li>Client downloads bloated bundle including database formatting &amp; rendering libraries.</li>
                      <li>React performs full-tree hydration before any interactivity is unlocked.</li>
                      <li><code>useEffect</code> triggers client-side API fetch only after mount.</li>
                      <li>Clicking a button waits for the full server round-trip before updating the interface.</li>
                    </ol>
                  </div>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-center font-mono">
                    <div className="rounded-xl border border-ink/8 bg-paper/60 p-3">
                      <span className="block text-[10px] uppercase text-muted-foreground">Client JS Bundle</span>
                      <span className="font-bold text-sm text-rose-700">~240 KB</span>
                    </div>
                    <div className="rounded-xl border border-ink/8 bg-paper/60 p-3">
                      <span className="block text-[10px] uppercase text-muted-foreground">Time to Useful UI</span>
                      <span className="font-bold text-sm text-rose-700">1,630ms</span>
                    </div>
                    <div className="rounded-xl border border-ink/8 bg-paper/60 p-3">
                      <span className="block text-[10px] uppercase text-muted-foreground">Network Requests</span>
                      <span className="font-bold text-sm text-rose-700">8 Requests</span>
                    </div>
                    <div className="rounded-xl border border-ink/8 bg-paper/60 p-3">
                      <span className="block text-[10px] uppercase text-muted-foreground">Click &rarr; Feedback</span>
                      <span className="font-bold text-sm text-rose-700">320ms (Blocking)</span>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="space-y-4">
                  <div className="rounded-xl border border-accent/20 bg-accent/5 p-4 text-xs font-mono text-ink/90 leading-relaxed">
                    <p className="font-bold uppercase tracking-wider text-accent mb-2">Optimized Layered Architecture:</p>
                    <ol className="list-decimal pl-5 space-y-1.5">
                      <li>Server Components query database directly and stream pre-rendered HTML immediately.</li>
                      <li>Suspense boundaries isolate slow widgets (e.g. charts) so primary UI is instantly usable.</li>
                      <li>Client bundle contains only interactive islands (buttons, forms), reducing JS payload by up to 70%.</li>
                      <li>Mutations leverage <code>useOptimistic</code> to update UI in 0ms while server action validates.</li>
                    </ol>
                  </div>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-center font-mono">
                    <div className="rounded-xl border border-ink/8 bg-paper/60 p-3">
                      <span className="block text-[10px] uppercase text-muted-foreground">Client JS Bundle</span>
                      <span className="font-bold text-sm text-emerald-700">~68 KB</span>
                    </div>
                    <div className="rounded-xl border border-ink/8 bg-paper/60 p-3">
                      <span className="block text-[10px] uppercase text-muted-foreground">Time to Useful UI</span>
                      <span className="font-bold text-sm text-emerald-700">340ms</span>
                    </div>
                    <div className="rounded-xl border border-ink/8 bg-paper/60 p-3">
                      <span className="block text-[10px] uppercase text-muted-foreground">Network Requests</span>
                      <span className="font-bold text-sm text-emerald-700">2 Requests</span>
                    </div>
                    <div className="rounded-xl border border-ink/8 bg-paper/60 p-3">
                      <span className="block text-[10px] uppercase text-muted-foreground">Click &rarr; Feedback</span>
                      <span className="font-bold text-sm text-emerald-700">0ms (Instant)</span>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </section>

          {/* SECTION 4 */}
          <section className="prose prose-stone max-w-none text-ink/90">
            <h2 className="mt-14 font-display text-2xl font-bold tracking-tight text-ink sm:text-3xl">
              3. The 4 Responsibilities of Modern React Architecture
            </h2>
            <p className="mt-4 text-base leading-relaxed text-ink/80">
              Rather than treating React features like a disjointed checklist, structure full-stack applications around four explicit layers:
            </p>

            <div className="mt-8 space-y-6">
              {/* Responsibility 1 */}
              <div className="rounded-[20px] border border-ink/10 bg-white/60 p-6 shadow-sm">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-accent/10 text-accent font-mono font-bold">
                    <Server className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="font-display text-lg font-bold text-ink">
                      1. Server Components for Data Reads &amp; Zero-Bundle Layouts
                    </h3>
                    <span className="font-mono text-[10px] uppercase tracking-wider text-muted-foreground">
                      Execution: Node.js / Edge runtime &bull; 0 KB client JS
                    </span>
                  </div>
                </div>
                <p className="mt-3 text-sm leading-relaxed text-ink/80">
                  Data queries, database SDKs, markdown formatters, and static marketing blocks belong on the server. Next.js pages and layouts are Server Components by default, eliminating waterfall fetches and token leaks.
                </p>
              </div>

              {/* Responsibility 2 */}
              <div className="rounded-[20px] border border-ink/10 bg-white/60 p-6 shadow-sm">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-accent/10 text-accent font-mono font-bold">
                    <Zap className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="font-display text-lg font-bold text-ink">
                      2. Suspense &amp; Streaming for Progressive Delivery
                    </h3>
                    <span className="font-mono text-[10px] uppercase tracking-wider text-muted-foreground">
                      Execution: Chunked HTTP streaming &bull; Non-blocking HTML
                    </span>
                  </div>
                </div>
                <p className="mt-3 text-sm leading-relaxed text-ink/80">
                  Never hold up fast shell rendering for a slow database analytics aggregate. Wrap slow components in <code>&lt;Suspense fallback=...&gt;</code> so the browser renders the primary interface immediately while the slow chunk streams into place.
                </p>
              </div>

              {/* Code Snippet for Streaming */}
              <div className="rounded-[18px] border border-ink/12 bg-[#1A1814] p-5 text-paper shadow-md">
                <div className="flex items-center justify-between border-b border-paper/10 pb-3 font-mono text-xs">
                  <span className="text-paper/70">app/dashboard/page.tsx (Streaming with Suspense)</span>
                  <button
                    type="button"
                    onClick={() => copyCode("streaming", streamingCodeSnippet)}
                    className="flex items-center gap-1.5 text-accent hover:underline text-[11px]"
                  >
                    {codeCopied === "streaming" ? <Check className="h-3.5 w-3.5" /> : <Copy className="h-3.5 w-3.5" />}
                    <span>{codeCopied === "streaming" ? "COPIED" : "COPY"}</span>
                  </button>
                </div>
                <pre className="mt-3 overflow-x-auto text-[11px] sm:text-xs font-mono leading-relaxed text-paper/90 scrollbar-none">
                  <code>{streamingCodeSnippet}</code>
                </pre>
              </div>

              {/* Responsibility 3 */}
              <div className="rounded-[20px] border border-ink/10 bg-white/60 p-6 shadow-sm">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-accent/10 text-accent font-mono font-bold">
                    <Cpu className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="font-display text-lg font-bold text-ink">
                      3. Selective Hydration for Small Interactive Islands
                    </h3>
                    <span className="font-mono text-[10px] uppercase tracking-wider text-muted-foreground">
                      Execution: Browser React DOM &bull; Prioritized interaction
                    </span>
                  </div>
                </div>
                <p className="mt-3 text-sm leading-relaxed text-ink/80">
                  Instead of requiring the entire DOM tree to hydrate before user input is registered, React prioritizes hydrating components that the user actively clicks or focuses. Keep Client Components at the leaves of your tree (e.g. interactive filters, modals, buttons).
                </p>
              </div>

              {/* Responsibility 4 */}
              <div className="rounded-[20px] border border-ink/10 bg-white/60 p-6 shadow-sm">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-accent/10 text-accent font-mono font-bold">
                    <RefreshCw className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="font-display text-lg font-bold text-ink">
                      4. Optimistic UI &amp; Targeted Cache Revalidation for Mutations
                    </h3>
                    <span className="font-mono text-[10px] uppercase tracking-wider text-muted-foreground">
                      Execution: useOptimistic + Server Actions + revalidatePath
                    </span>
                  </div>
                </div>
                <p className="mt-3 text-sm leading-relaxed text-ink/80">
                  For safe, predictable interactions (toggling likes, bookmarking items, reordering tasks), waiting for a network round trip before updating the UI creates unnecessary perceived drag. React 19’s <code>useOptimistic</code> provides seamless optimistic UI with built-in rollback on failure.
                </p>
              </div>

              {/* Code Snippet for Optimistic UI */}
              <div className="rounded-[18px] border border-ink/12 bg-[#1A1814] p-5 text-paper shadow-md">
                <div className="flex items-center justify-between border-b border-paper/10 pb-3 font-mono text-xs">
                  <span className="text-paper/70">components/BookmarkButton.tsx (React 19 useOptimistic)</span>
                  <button
                    type="button"
                    onClick={() => copyCode("optimistic", optimisticCodeSnippet)}
                    className="flex items-center gap-1.5 text-accent hover:underline text-[11px]"
                  >
                    {codeCopied === "optimistic" ? <Check className="h-3.5 w-3.5" /> : <Copy className="h-3.5 w-3.5" />}
                    <span>{codeCopied === "optimistic" ? "COPIED" : "COPY"}</span>
                  </button>
                </div>
                <pre className="mt-3 overflow-x-auto text-[11px] sm:text-xs font-mono leading-relaxed text-paper/90 scrollbar-none">
                  <code>{optimisticCodeSnippet}</code>
                </pre>
              </div>
            </div>
          </section>

          {/* SECTION 5: PRACTICAL DECISION FRAMEWORK */}
          <section className="prose prose-stone max-w-none text-ink/90">
            <h2 className="mt-14 font-display text-2xl font-bold tracking-tight text-ink sm:text-3xl">
              4. The Practical Decision Framework
            </h2>
            <p className="mt-4 text-base leading-relaxed text-ink/80">
              When building any new feature or optimizing an existing workflow, ask these 5 questions:
            </p>

            <div className="my-8 overflow-hidden rounded-[20px] border border-ink/10 bg-white/70 shadow-sm">
              <table className="w-full text-left text-xs font-mono">
                <thead className="border-b border-ink/10 bg-paper/90 text-muted-foreground uppercase text-[10px] tracking-wider">
                  <tr>
                    <th className="p-3.5 font-bold">Scenario / Work Type</th>
                    <th className="p-3.5 font-bold">Architectural Decision</th>
                    <th className="p-3.5 font-bold">Latency Impact</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-ink/8 text-ink/85">
                  <tr>
                    <td className="p-3.5 font-bold">Data Reads &amp; Layout</td>
                    <td className="p-3.5 text-accent">Server Component</td>
                    <td className="p-3.5">0 KB client JS; direct database read</td>
                  </tr>
                  <tr>
                    <td className="p-3.5 font-bold">Slow Async Query</td>
                    <td className="p-3.5 text-accent">Suspense Streaming Boundary</td>
                    <td className="p-3.5">Fast shell unblocked; progressive render</td>
                  </tr>
                  <tr>
                    <td className="p-3.5 font-bold">User Input / State</td>
                    <td className="p-3.5 text-accent">Leaf Client Component</td>
                    <td className="p-3.5">Selective hydration keeps input immediate</td>
                  </tr>
                  <tr>
                    <td className="p-3.5 font-bold">Safe Mutation (Like, Save)</td>
                    <td className="p-3.5 text-accent">useOptimistic + Server Action</td>
                    <td className="p-3.5">0ms UI feedback with automatic rollback</td>
                  </tr>
                  <tr>
                    <td className="p-3.5 font-bold">Stale Cache on Mutation</td>
                    <td className="p-3.5 text-accent">Targeted revalidateTag/Path</td>
                    <td className="p-3.5">Avoids refetching unaffected queries</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          {/* CONCLUSION */}
          <section className="my-12 rounded-[24px] border border-ink/10 bg-white/70 p-6 sm:p-8 shadow-sm">
            <h2 className="font-display text-2xl font-bold text-ink">
              Conclusion: Optimize What Waits for the Network
            </h2>
            <p className="mt-3 text-base leading-relaxed text-ink/80">
              The network and database will always take physical time. Server Components and optimistic UI do not magically make distributed systems instantaneous; rather, sound frontend architecture decides <strong>how much of that time the user is forced to feel.</strong>
            </p>
            <p className="mt-3 text-base leading-relaxed text-ink/80">
              By moving reads to the server, streaming slow chunks, isolating client boundaries, and applying optimistic updates, your applications feel immediate, resilient, and responsive.
            </p>
          </section>

          {/* FAQ Section */}
          <section className="my-14">
            <div className="flex items-center gap-2 font-mono text-xs font-bold uppercase tracking-[0.2em] text-accent mb-4">
              <HelpCircle className="h-4 w-4" />
              <span>FREQUENTLY ASKED QUESTIONS</span>
            </div>
            <div className="space-y-4">
              <div className="rounded-[18px] border border-ink/10 bg-white/60 p-5">
                <h3 className="font-display text-base font-bold text-ink">
                  Does Server Components eliminate the need for client state?
                </h3>
                <p className="mt-2 text-xs sm:text-sm text-ink/75 leading-relaxed">
                  No. Client state (via <code>useState</code>, <code>useReducer</code>, or client stores) is essential for local interactive experiences like controlled form inputs, dropdowns, and drag-and-drop interfaces. The goal is keeping Client Components small and localized at the leaves of the component tree.
                </p>
              </div>

              <div className="rounded-[18px] border border-ink/10 bg-white/60 p-5">
                <h3 className="font-display text-base font-bold text-ink">
                  When should I avoid optimistic updates?
                </h3>
                <p className="mt-2 text-xs sm:text-sm text-ink/75 leading-relaxed">
                  Avoid optimistic updates for operations with high financial stakes (e.g. credit card checkouts), irreversible destructive actions (permanent database drops), or workflows heavily dependent on unpredictable server validations.
                </p>
              </div>

              <div className="rounded-[18px] border border-ink/10 bg-white/60 p-5">
                <h3 className="font-display text-base font-bold text-ink">
                  How does React selective hydration improve perceived speed?
                </h3>
                <p className="mt-2 text-xs sm:text-sm text-ink/75 leading-relaxed">
                  Under React 18 and 19 concurrent features, if a user clicks a button inside a suspended region while another part of the tree is still hydrating, React pauses background hydration to immediately hydrate and execute the clicked component.
                </p>
              </div>
            </div>
          </section>

          {/* Footer Navigation */}
          <div className="mt-16 flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-ink/10 pt-8 font-mono text-xs">
            <Link
              href="/"
              className="group inline-flex items-center gap-2 font-bold text-ink/75 hover:text-accent transition-colors"
            >
              <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
              <span>Back to Home</span>
            </Link>

            <Link
              href="/lighthouse-score-green-website-feels-slow"
              className="group inline-flex items-center gap-2 font-bold text-accent hover:underline"
            >
              <span>Read: Your Lighthouse Score Is Green &rarr;</span>
            </Link>
          </div>
        </div>
      </article>
    </>
  );
}
