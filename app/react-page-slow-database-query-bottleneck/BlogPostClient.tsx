"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  Check,
  Copy,
  Share2,
  Clock,
  Calendar,
  Database,
  HelpCircle,
  Route,
  Server,
  Sparkles,
  ScanSearch,
  Filter,
} from "lucide-react";
import { toast } from "sonner";

const clientTimingCode = `const startedAt = performance.now();

const response = await fetch("/api/projects");
const projects = await response.json();

console.log(
  \`Request + parsing: \${performance.now() - startedAt}ms\`
);`;

const handlerTimingCode = `const requestStartedAt = performance.now();

const dbStartedAt = performance.now();

const projects = await db
  .collection("projects")
  .find({ ownerId })
  .toArray();

const dbDuration = performance.now() - dbStartedAt;

const requestDuration =
  performance.now() - requestStartedAt;

console.log({
  dbDuration,
  requestDuration,
});`;

const explainCode = `db.projects
  .find({
    ownerId: userId,
    status: "active",
  })
  .explain("executionStats");

// executionStats: {
//   nReturned: 20,
//   totalDocsExamined: 48213,
//   totalKeysExamined: 0,
//   executionTimeMillis: 340,
//   winningPlan: { stage: "COLLSCAN" }
// }`;

const indexCode = `db.projects
  .find({
    ownerId: userId,
    status: "active",
  })
  .sort({ updatedAt: -1 })
  .limit(20);

// Access pattern: filter on ownerId + status, sort on updatedAt, limit 20
db.projects.createIndex({
  ownerId: 1,
  status: 1,
  updatedAt: -1,
});`;

const projectionCode = `db.projects.find(
  { ownerId: userId },
  {
    projection: {
      name: 1,
      status: 1,
      updatedAt: 1,
    },
  }
);`;

const decisionItems = [
  {
    icon: ScanSearch,
    title: "Is the UI itself doing expensive work?",
    answer: "Profile rendering, JS, state, and hydration.",
  },
  {
    icon: Route,
    title: "Is the request slow?",
    answer: "If not, inspect client work around the request instead.",
  },
  {
    icon: Server,
    title: "Is the API handler slow?",
    answer: "If not, investigate network transfer, not the database.",
  },
  {
    icon: Database,
    title: "Is database time dominant?",
    answer: "If not, inspect server logic outside the query.",
  },
  {
    icon: Filter,
    title: "Inspect the query execution plan",
    answer: "Change the query, index, or data access — then retest the interaction.",
  },
];

const auditSteps = [
  { step: "1", title: "Reproduce the slow interaction", desc: "Trigger the exact click, load, or navigation the user experienced — not a synthetic approximation of it." },
  { step: "2", title: "Measure the browser request", desc: "Time the fetch from the client. Establish whether the wait is even inside the request/response cycle." },
  { step: "3", title: "Measure the API handler", desc: "Time the server function itself to see how much of the request duration it accounts for." },
  { step: "4", title: "Time the database operation", desc: "Isolate the query or queries inside the handler from the rest of the handler's logic." },
  { step: "5", title: "Inspect the execution plan", desc: "Run explain(\"executionStats\") and read nReturned, totalDocsExamined, and the winning plan." },
  { step: "6", title: "Change the actual bottleneck", desc: "Adjust the query, index, projection, or access pattern the evidence points to — not the first layer you can see." },
  { step: "7", title: "Retest the same interaction", desc: "Reproduce the original click again. Confirm the user-facing symptom improved, not just a metric." },
];

const faqItems = [
  {
    q: "How do I know whether React or the backend is making a page slow?",
    a: "Start by separating render time from request time. If the browser spends most of the interaction waiting for an API response, frontend rendering is unlikely to explain that portion of the delay. Measure the API handler next, then continue deeper until the dominant work is isolated.",
  },
  {
    q: "Does a slow MongoDB query always mean I need another index?",
    a: "No. An index is one possible solution. First inspect the query's execution plan and access pattern. The problem may involve an unsuitable index, excessive documents examined, unnecessary fields, unbounded results, sorting, repeated queries, or API-level query waterfalls.",
  },
  {
    q: "What does totalDocsExamined mean in MongoDB?",
    a: "It indicates how many documents MongoDB examined while executing the query. Comparing it with nReturned can help reveal cases where the database inspects much more data than the application ultimately receives.",
  },
  {
    q: "Is IXSCAN always better than COLLSCAN?",
    a: "No. An index scan only tells you that an index is involved. You still need to examine the amount of work performed and consider the size and shape of the data. Collection scans can also be perfectly reasonable for very small collections or particular workloads.",
  },
  {
    q: "Should I optimize React after fixing the database query?",
    a: "Only if measurements show there is still meaningful frontend work to remove. Database optimization and React optimization solve different parts of the request lifecycle. Retest the complete interaction after every meaningful change.",
  },
  {
    q: "What should I measure first when a page feels slow?",
    a: "Measure the user-visible interaction first, then divide it at system boundaries: browser request, server handler, database operation, and query execution. The goal is to find where elapsed time accumulates before changing code.",
  },
];

export function BlogPostClient() {
  const [copied, setCopied] = useState(false);
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

  return (
    <>
      <div className="fixed left-0 right-0 top-0 z-50 h-1 bg-ink/5">
        <div
          className="h-full bg-accent transition-all duration-150 ease-out"
          style={{ width: `${scrollProgress}%` }}
        />
      </div>

      <header className="sticky top-0 z-40 w-full border-b border-ink/10 bg-paper/85 backdrop-blur-xl transition-all">
        <div className="mx-auto flex max-w-5xl items-center justify-between px-6 py-4 sm:px-8">
          <Link
            href="/"
            className="group inline-flex items-center gap-2 font-mono text-xs font-semibold tracking-wider text-ink/75 transition-colors hover:text-accent"
          >
            <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
            <span>BACK TO PORTFOLIO</span>
          </Link>

          <button
            onClick={copyPageUrl}
            type="button"
            aria-label="Share article"
            className="inline-flex items-center gap-1.5 rounded-full border border-ink/10 bg-white/70 px-3.5 py-1.5 font-mono text-[11px] font-medium uppercase tracking-wider text-ink shadow-sm transition-all hover:border-accent/40 hover:bg-white hover:text-accent"
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
      </header>

      <article className="relative min-h-screen bg-paper pb-24 text-ink selection:bg-accent/15 selection:text-accent">
        <div className="pointer-events-none absolute inset-0 ambient-grid opacity-40" />

        <div className="relative mx-auto max-w-4xl px-6 pt-12 sm:px-8 sm:pt-16 md:pt-20">
          <div className="mb-6 flex flex-wrap items-center gap-2 font-mono text-xs text-muted-foreground">
            <Link href="/" className="transition-colors hover:text-accent">
              HOME
            </Link>
            <span>/</span>
            <span className="font-semibold tracking-wider text-accent">FULL-STACK PERFORMANCE</span>
            <span>/</span>
            <span>DATABASE QUERIES</span>
          </div>

          <h1 className="font-display text-3xl font-medium leading-[1.08] tracking-tight text-ink sm:text-5xl md:text-6xl">
            The Page Felt Slow. React Wasn&apos;t the Bottleneck.
          </h1>

          <p className="mt-6 text-lg font-normal leading-relaxed text-muted-foreground sm:text-xl">
            The delay appeared after a click in the UI, so React looked suspicious. But tracing the request backwards changed the problem completely: the expensive work was happening before React had anything to render.
          </p>

          <div className="mt-8 flex flex-wrap items-center justify-between gap-4 border-y border-ink/10 py-4 font-mono text-xs text-muted-foreground">
            <div className="flex items-center gap-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-full border border-ink/15 bg-accent/10 font-bold text-accent">
                ZA
              </div>
              <div>
                <span className="block font-semibold text-ink">Zain Ali</span>
                <span className="text-[11px]">Full-Stack Developer</span>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-4 text-[11px] sm:gap-6">
              <span className="flex items-center gap-1.5">
                <Calendar className="h-3.5 w-3.5 text-accent" />
                August 2026
              </span>
              <span className="flex items-center gap-1.5">
                <Clock className="h-3.5 w-3.5 text-accent" />
                11 min read
              </span>
              <span className="hidden rounded-full border border-accent/20 bg-accent/10 px-2.5 py-0.5 font-bold text-accent sm:inline-block">
                REQUEST LATENCY MODEL
              </span>
            </div>
          </div>

          <div className="my-10 overflow-hidden rounded-[24px] border border-ink/10 bg-white/60 shadow-[0_20px_60px_rgba(26,24,20,0.06),inset_0_1px_0_rgba(255,255,255,0.85)]">
            <img
              src="/react-page-slow-database-query-bottleneck-hero.webp"
              alt="A request pipeline diagram showing latency concentrated in the database layer, not the React render"
              className="h-auto w-full object-cover"
              loading="eager"
            />
          </div>

          <div className="my-8 rounded-2xl border border-accent/20 bg-accent/5 p-6 backdrop-blur-sm sm:p-7">
            <div className="flex items-start gap-3">
              <Sparkles className="mt-1 h-5 w-5 shrink-0 text-accent" />
              <div>
                <h2 className="font-display text-lg font-bold text-ink">The Core Principle</h2>
                <p className="mt-1 text-sm leading-relaxed text-ink/85">
                  A slow interaction is experienced in the frontend, but that does not make the frontend the cause. Trace the request backwards, measure each boundary, and optimize the layer actually consuming the time.
                </p>
              </div>
            </div>
          </div>

          <div className="prose-custom mt-12 space-y-10 text-[1.0625rem] leading-[1.8] text-ink/90">
            <section className="space-y-4">
              <p>A user clicks a button.</p>
              <p>The interface enters a loading state. Nothing happens for a moment. Then the result appears.</p>
              <p>
                From the user&apos;s perspective, the page was slow. From the developer&apos;s perspective, it is tempting to translate that immediately into: <em>the frontend is slow.</em>
              </p>
              <p>That translation is where debugging can go wrong.</p>
              <p>
                We experience performance at the frontend, but we don&apos;t necessarily create the delay there. One interaction can cross the browser, API code, database, API response, and another render before the user sees the result. React might be responsible. But React might also have spent almost the entire interaction waiting.
              </p>
              <p>Instead of asking <em>why is this component slow?</em>, I would rather start with <em>where is this interaction spending its time?</em></p>
              <p>Those sound similar. They lead to very different investigations.</p>
            </section>

            <hr className="border-ink/10" />

            <section className="space-y-5">
              <h2 className="font-display text-2xl font-bold tracking-tight text-ink sm:text-3xl">
                A Slow Screen Gives You a Location, Not a Diagnosis
              </h2>
              <p>Suppose an interaction looks roughly like this:</p>
              <DiagramBlock>
                {`User clicks
    |
React handler
    |
HTTP request
    |
API handler
    |
Database query
    |
API response
    |
State update
    |
React renders the result`}
              </DiagramBlock>
              <p>
                The user experiences that entire sequence as one thing: &ldquo;the page took too long.&rdquo; React owns the visible beginning and end of the interaction, so it naturally becomes suspicious.
              </p>
              <p>
                You open React DevTools. You check for unnecessary renders. You look at useMemo. You inspect component boundaries. Maybe you start moving state around. All of those techniques can matter. But there is a more fundamental question that should come first:
              </p>
              <blockquote className="border-l-4 border-accent pl-4 font-display text-lg italic text-ink">
                How much of the delay exists while React is actually doing work?
              </blockquote>
              <p>
                If the browser sends a request and waits over a second for a response, while the final React update takes a few milliseconds, reorganizing the component tree attacks the wrong part of the timeline.
              </p>
              <DiagramBlock>
                {`[ click ]
   |
   | small client-side work
   v
[ request ------------------------------------- ]
                                                  |
                                                  v
                                             [ response ]
                                                  |
                                                  | render
                                                  v
                                               [ UI ]`}
              </DiagramBlock>
              <p>A fast render cannot recover time that has already disappeared upstream.</p>
              <div className="rounded-2xl border border-accent/20 bg-accent/5 p-5">
                <p className="font-mono text-xs font-bold uppercase tracking-wider text-accent">Callout</p>
                <p className="mt-2 text-sm leading-relaxed text-ink/85">
                  Performance ownership follows elapsed work, not visual ownership. The frontend may own the loading spinner. It does not automatically own the wait.
                </p>
              </div>
            </section>

            <section className="space-y-5">
              <h2 className="font-display text-2xl font-bold tracking-tight text-ink sm:text-3xl">
                Why the Frontend Gets Blamed First
              </h2>
              <p>There is a simple reason this mistake happens. The frontend is observable.</p>
              <p>
                You can see the spinner. You can see the button. You can see the list arrive late. You can inspect the component producing those things. Database work is invisible unless you deliberately expose it through measurements.
              </p>
              <p>
                That creates an observability bias: we start optimizing the part of the system we can see. The mistake is not investigating React. The mistake is investigating React before establishing that React owns meaningful latency.
              </p>
              <p>A React application can have unnecessary renders, excessive JavaScript, slow hydration, expensive calculations, or poor state architecture, and still have a completely separate database problem. Full-stack latency is additive. Roughly:</p>
              <DiagramBlock>
                {`Interaction latency
  ≈ client work
  + network
  + server work
  + database work
  + serialization
  + network
  + client processing
  + render`}
              </DiagramBlock>
              <p>
                Not every request literally behaves this simply — some work overlaps, streaming changes the model, caching changes it again — but this approximation gives us a much better debugging question: which term is unexpectedly large?
              </p>
            </section>

            <section className="rounded-[24px] border border-ink/10 bg-white/70 p-6 shadow-sm sm:p-8">
              <h2 className="font-display text-2xl font-bold tracking-tight text-ink sm:text-3xl">
                Trace the Request Backwards
              </h2>
              <p className="mt-4">
                The most useful idea here is the debugging direction. Don&apos;t begin by rewriting. Begin by tracing — from the browser backwards: request duration, API execution, database query, then the query execution plan. Each measurement narrows the search space.
              </p>
              <div className="mt-6 space-y-2 font-mono text-sm text-ink/85">
                <p>&ldquo;The application feels slow&rdquo;</p>
                <p className="pl-4 text-accent">↓</p>
                <p className="pl-4">&ldquo;This HTTP request is slow&rdquo;</p>
                <p className="pl-8 text-accent">↓</p>
                <p className="pl-8">&ldquo;This API handler is slow&rdquo;</p>
                <p className="pl-12 text-accent">↓</p>
                <p className="pl-12">&ldquo;This database operation dominates the handler&rdquo;</p>
                <p className="pl-16 text-accent">↓</p>
                <p className="pl-16 font-semibold text-ink">&ldquo;This query is examining far more data than it returns&rdquo;</p>
              </div>
              <p className="mt-5 text-sm leading-relaxed text-ink/80">
                That final statement is actionable. &ldquo;The page feels slow&rdquo; isn&apos;t.
              </p>
            </section>

            <section className="space-y-5">
              <h2 className="font-display text-2xl font-bold tracking-tight text-ink sm:text-3xl">
                Measure Boundaries Before Changing Implementations
              </h2>
              <p>The browser gives us a convenient first boundary. I would not treat this as sophisticated instrumentation — it simply answers whether we are waiting before the data reaches the component.</p>
              <CodeBlock
                id="client-timing"
                label="client-timing.ts"
                code={clientTimingCode}
                copied={codeCopied === "client-timing"}
                onCopy={() => copyCode("client-timing", clientTimingCode)}
              />
              <p>If the answer is yes, move one layer deeper. A simplified API handler can temporarily expose separate timings:</p>
              <CodeBlock
                id="handler-timing"
                label="api-handler.ts"
                code={handlerTimingCode}
                copied={codeCopied === "handler-timing"}
                onCopy={() => copyCode("handler-timing", handlerTimingCode)}
              />
              <p>
                If <code>requestDuration</code> is much larger than <code>dbDuration</code>, significant work exists elsewhere in the handler. If they are roughly equal, the database deserves much more attention. Without those measurements, both cases produce the same spinner.
              </p>
            </section>

            <section className="space-y-5">
              <h2 className="font-display text-2xl font-bold tracking-tight text-ink sm:text-3xl">
                A Database Can Return Little Data After Doing a Lot of Work
              </h2>
              <p>A query taking a long time tells us where the delay is. It does not yet explain why. MongoDB&apos;s execution stats fill that gap:</p>
              <CodeBlock
                id="explain"
                label="explain-executionStats.js"
                code={explainCode}
                copied={codeCopied === "explain"}
                onCopy={() => copyCode("explain", explainCode)}
              />
              <p>Getting 20 records back does not mean MongoDB only had to consider 20 records. The useful distinction is between what the application receives and what the database had to inspect to produce it.</p>
              <div className="rounded-2xl border border-ink/10 bg-white/70 p-6 shadow-sm">
                <p className="font-mono text-xs font-bold uppercase tracking-wider text-muted-foreground">DOCUMENTS EXAMINED VS. DOCUMENTS RETURNED</p>
                <div className="mt-4 space-y-3">
                  <div>
                    <div className="mb-1 flex justify-between font-mono text-xs">
                      <span className="font-semibold text-ink">totalDocsExamined</span>
                      <span className="font-bold text-rose-600">48,213</span>
                    </div>
                    <div className="h-3 w-full overflow-hidden rounded-full bg-ink/10">
                      <div className="h-full rounded-full bg-rose-500" style={{ width: "100%" }} />
                    </div>
                  </div>
                  <div>
                    <div className="mb-1 flex justify-between font-mono text-xs">
                      <span className="font-semibold text-ink">nReturned</span>
                      <span className="font-bold text-emerald-700">20</span>
                    </div>
                    <div className="h-3 w-full overflow-hidden rounded-full bg-ink/10">
                      <div className="h-full rounded-full bg-emerald-500" style={{ width: "2%" }} />
                    </div>
                  </div>
                </div>
                <p className="mt-4 text-center font-mono text-xs text-muted-foreground">
                  A small response does not imply a small amount of database work.
                </p>
              </div>
            </section>

            <section className="space-y-5">
              <h2 className="font-display text-2xl font-bold tracking-tight text-ink sm:text-3xl">
                nReturned Tells Only Half the Story
              </h2>
              <p><code>nReturned</code> answers: how many results satisfied the query? A small <code>nReturned</code> looks innocent. But combine it with <code>totalDocsExamined</code>, and the question becomes: how many documents did MongoDB inspect to find those results?</p>
              <p>That ratio is often more informative than either number alone. It doesn&apos;t automatically mean &ldquo;add an index.&rdquo; But it gives you evidence that query access deserves investigation.</p>
              <p>
                The performance problem is no longer <em>React takes too long to display these records.</em> It becomes <em>the database is doing too much work to identify the records React needs.</em> Those require completely different fixes.
              </p>
            </section>

            <section className="space-y-5">
              <h2 className="font-display text-2xl font-bold tracking-tight text-ink sm:text-3xl">
                totalKeysExamined Helps You Reason About the Index
              </h2>
              <p>An index doesn&apos;t make every query efficient just because one exists. You also need to ask whether the database is using an index that matches how the query actually filters and sorts data.</p>
              <CodeBlock
                id="index"
                label="access-pattern-index.ts"
                code={indexCode}
                copied={codeCopied === "index"}
                onCopy={() => copyCode("index", indexCode)}
              />
              <p>
                Whether that exact index is correct depends on the application&apos;s data distribution, query workload, other read patterns, and write cost. The principle isn&apos;t <em>every slow query needs a compound index.</em> It is: design indexes around real access patterns, then verify the execution plan.
              </p>
            </section>

            <section className="rounded-[24px] border border-ink/10 bg-white/70 p-6 shadow-sm sm:p-8">
              <h2 className="font-display text-2xl font-bold tracking-tight text-ink sm:text-3xl">
                The Execution Plan Tells You What MongoDB Actually Decided to Do
              </h2>
              <p className="mt-4">Code shows what we asked for. The execution plan shows how the database tried to satisfy it.</p>
              <div className="mt-6 grid gap-4 sm:grid-cols-2">
                <div className="rounded-2xl border border-rose-500/20 bg-rose-500/[0.04] p-5">
                  <p className="font-mono text-xs font-bold uppercase tracking-wider text-rose-700">COLLSCAN</p>
                  <p className="mt-2 text-sm leading-relaxed text-ink/80">MongoDB is scanning documents in the collection. Not automatically wrong — a small collection can be scanned cheaply.</p>
                </div>
                <div className="rounded-2xl border border-emerald-500/20 bg-emerald-500/[0.04] p-5">
                  <p className="font-mono text-xs font-bold uppercase tracking-wider text-emerald-700">IXSCAN</p>
                  <p className="mt-2 text-sm leading-relaxed text-ink/80">Index traversal is involved. Not automatically good — an index can still examine far more keys than expected, or help reads while making writes more expensive.</p>
                </div>
              </div>
              <p className="mt-5 text-sm leading-relaxed text-ink/80">
                This is why I prefer execution evidence over rules like &ldquo;slow MongoDB? Add an index.&rdquo; The real sequence is:
              </p>
              <div className="mt-4 grid gap-4 sm:grid-cols-2">
                <div className="rounded-2xl border border-rose-500/20 bg-rose-500/[0.04] p-5 font-mono text-xs text-ink/80">
                  <p className="font-bold uppercase tracking-wider text-rose-700">Before</p>
                  <p className="mt-3">slow</p>
                  <p className="pl-4 text-rose-700">-&gt; add optimization</p>
                  <p className="pl-8 text-rose-700">-&gt; hope</p>
                </div>
                <div className="rounded-2xl border border-emerald-500/20 bg-emerald-500/[0.04] p-5 font-mono text-xs text-ink/80">
                  <p className="font-bold uppercase tracking-wider text-emerald-700">After</p>
                  <p className="mt-3">observe -&gt; measure</p>
                  <p className="pl-4 text-emerald-700">-&gt; inspect -&gt; understand</p>
                  <p className="pl-8 text-emerald-700">-&gt; change -&gt; measure again</p>
                </div>
              </div>
            </section>

            <section className="space-y-5">
              <h2 className="font-display text-2xl font-bold tracking-tight text-ink sm:text-3xl">
                Query Design Is Application Architecture
              </h2>
              <p>Database performance is sometimes treated as something that happens after the application has already been designed: build the UI, build the API, create the schemas, then add indexes if something gets slow. I think that model is incomplete.</p>
              <p>Queries express the way the product retrieves information. If a screen needs records belonging to one user, in a particular state, ordered by recent activity, twenty at a time — that access pattern is part of the screen&apos;s architecture whether we acknowledge it or not.</p>
              <DiagramBlock>
                {`Product interaction
       |
Data shape needed by UI
       |
API contract
       |
Query shape
       |
Index / storage strategy`}
              </DiagramBlock>
              <p>This is one reason full-stack performance problems often resist layer-by-layer thinking. The layers are separate in implementation. They are connected in latency.</p>
            </section>

            <section className="space-y-6">
              <h2 className="font-display text-2xl font-bold tracking-tight text-ink sm:text-3xl">
                Faster Queries Aren&apos;t Always About Indexes Either
              </h2>
              <p>Once you establish that a database operation is expensive, indexing becomes one possibility — not the automatic answer.</p>

              <div className="space-y-3">
                <h3 className="font-display text-lg font-bold text-ink">Return only what the interaction needs</h3>
                <p>If a listing screen only needs a few fields, there may be no reason to retrieve large fields used only by a detail screen.</p>
                <CodeBlock
                  id="projection"
                  label="projection.ts"
                  code={projectionCode}
                  copied={codeCopied === "projection"}
                  onCopy={() => copyCode("projection", projectionCode)}
                />
                <p className="text-sm text-ink/80">That doesn&apos;t solve every query-performance issue, but it can reduce data transfer and downstream processing.</p>
              </div>

              <div className="space-y-3">
                <h3 className="font-display text-lg font-bold text-ink">Avoid accidentally unbounded reads</h3>
                <p className="text-sm text-ink/80">
                  <code>.find({"{"} ownerId {"}"}).toArray()</code> has very different scaling behavior from a deliberately paginated query. What feels harmless with tens of records can become a different request entirely as the dataset grows.
                </p>
              </div>

              <div className="space-y-3">
                <h3 className="font-display text-lg font-bold text-ink">Treat sorting as part of the query</h3>
                <p className="text-sm text-ink/80">Filtering and sorting aren&apos;t two unrelated operations from the database&apos;s perspective. If a common request filters one way and sorts another, the complete access pattern should inform the index strategy.</p>
              </div>

              <div className="space-y-3">
                <h3 className="font-display text-lg font-bold text-ink">Question repeated queries</h3>
                <p className="text-sm text-ink/80">Sometimes the individual query isn&apos;t catastrophically slow. The request is slow because the handler performs it repeatedly.</p>
                <DiagramBlock>
                  {`query A
   |
query B
   |
query C
   |
query D`}
                </DiagramBlock>
                <p className="text-sm text-ink/80">This can create latency even when each step looks reasonable by itself. At that point the issue moves from individual query speed toward API and data-access architecture.</p>
              </div>
            </section>

            <section className="rounded-[24px] border border-ink/10 bg-white/70 p-6 shadow-sm sm:p-8">
              <h2 className="font-display text-2xl font-bold tracking-tight text-ink sm:text-3xl">
                The Actual Optimization Target
              </h2>
              <p className="mt-4 text-sm text-ink/70">
                The useful before/after comparison isn&apos;t wrapping a component in <code>memo()</code>. That may change nothing about the experience. The more meaningful structural comparison looks like this:
              </p>
              <div className="mt-6 grid gap-4 sm:grid-cols-2">
                <div className="rounded-2xl border border-rose-500/20 bg-rose-500/[0.04] p-5 font-mono text-xs leading-relaxed text-ink/80">
                  <p className="font-bold uppercase tracking-wider text-rose-700">Before</p>
                  <p className="mt-3">Click</p>
                  <p>↓ Fast frontend</p>
                  <p>↓ API</p>
                  <p>↓ Expensive database work</p>
                  <p>↓ Response</p>
                  <p>↓ Fast render</p>
                  <p className="mt-3 font-bold text-rose-700">Result: still feels slow</p>
                </div>
                <div className="rounded-2xl border border-emerald-500/20 bg-emerald-500/[0.04] p-5 font-mono text-xs leading-relaxed text-ink/80">
                  <p className="font-bold uppercase tracking-wider text-emerald-700">After</p>
                  <p className="mt-3">Click</p>
                  <p>↓ Fast frontend</p>
                  <p>↓ API</p>
                  <p>↓ Query aligned with access pattern</p>
                  <p>↓ Response</p>
                  <p>↓ Fast render</p>
                  <p className="mt-3 font-bold text-emerald-700">Result: less waiting in the request path</p>
                </div>
              </div>
              <p className="mt-5 text-sm leading-relaxed text-ink/80">
                The improvement didn&apos;t come from making React cleverer. It came from removing work from the layer that was actually consuming the interaction budget.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="font-display text-2xl font-bold tracking-tight text-ink sm:text-3xl">
                There Is Another Trap: Stopping After the Database Fix
              </h2>
              <p>Suppose you find an inefficient query. You change the query or index. The execution plan looks healthier. Done? Not quite.</p>
              <p>
                The original symptom was not <em>my MongoDB execution stats look bad.</em> It was <em>this interaction feels slow.</em> So the final measurement has to return to the original interaction.
              </p>
              <div className="my-6 space-y-3">
                {auditSteps.map((item) => (
                  <div key={item.step} className="flex items-start gap-3.5 rounded-xl border border-ink/10 bg-white/60 p-4">
                    <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-accent font-mono text-xs font-bold text-white">
                      {item.step}
                    </span>
                    <div>
                      <h4 className="font-display text-base font-bold text-ink">{item.title}</h4>
                      <p className="mt-0.5 text-xs leading-relaxed text-ink/80 sm:text-sm">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
              <p>
                That final step is more important than it looks. Optimization should close the loop: you need to prove that changing the subsystem improved the thing the user experienced. Otherwise you have optimized a metric, not necessarily the product.
              </p>
            </section>

            <section className="space-y-5">
              <h2 className="font-display text-2xl font-bold tracking-tight text-ink sm:text-3xl">
                A Better Debugging Model: Narrow the Latency Boundary
              </h2>
              <p>When an interaction is slow, the most useful first task is reducing the size of the unknown system.</p>
              <DiagramBlock>
                {`APPLICATION
  \\-- REQUEST
       \\-- API
            \\-- DATABASE
                 \\-- QUERY PLAN`}
              </DiagramBlock>
              <p>Every measurement shrinks the uncertainty. That is much more effective than changing code across several layers and seeing whether the application &ldquo;feels faster.&rdquo; Performance debugging becomes less mysterious when it becomes an isolation problem.</p>
            </section>

            <section className="rounded-[24px] border border-ink/10 bg-white/70 p-6 shadow-sm sm:p-8">
              <h2 className="font-display text-2xl font-bold tracking-tight text-ink sm:text-3xl">
                When a Page Feels Slow: The Decision Path
              </h2>
              <p className="mt-4 text-sm text-ink/70">Before touching the implementation, walk through this:</p>
              <div className="mt-6 space-y-3">
                {decisionItems.map((item) => {
                  const Icon = item.icon;
                  return (
                    <div key={item.title} className="flex gap-3 rounded-2xl border border-ink/10 bg-paper/70 p-4">
                      <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-accent/10 text-accent">
                        <Icon className="h-4 w-4" />
                      </span>
                      <div>
                        <h3 className="font-display text-base font-bold text-ink">{item.title}</h3>
                        <p className="mt-1 text-sm leading-relaxed text-ink/75">{item.answer}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
              <div className="mt-6 flex flex-wrap items-center justify-center gap-2 rounded-2xl border border-accent/20 bg-accent/5 p-4 font-mono text-xs font-bold uppercase tracking-wider text-accent sm:text-sm">
                <span>Measure</span>
                <span>→</span>
                <span>Isolate</span>
                <span>→</span>
                <span>Fix</span>
                <span>→</span>
                <span>Retest</span>
              </div>
              <p className="mt-3 text-center text-sm text-muted-foreground">The individual tools can change. The reasoning should not.</p>
            </section>

            <section className="space-y-4">
              <h2 className="font-display text-2xl font-bold tracking-tight text-ink sm:text-3xl">
                React Wasn&apos;t Innocent. It Just Wasn&apos;t Guilty Yet.
              </h2>
              <p>None of this means frontend performance work is unimportant. A page can absolutely be slow because React is doing too much. A large render tree can be expensive. Poor state boundaries can trigger unnecessary work. Hydration can delay interaction.</p>
              <p>The mistake is jumping from &ldquo;I see the delay in React&rdquo; to &ldquo;React caused the delay.&rdquo;</p>
              <p>A slow page is a symptom, not a diagnosis. I would extend that slightly: a slow page tells you where the user noticed the problem. Instrumentation tells you where the system created it. Those are not always the same place. And that difference is where useful performance debugging begins.</p>
            </section>

            <div className="my-10 rounded-2xl border border-ink/15 bg-white/80 p-6 text-center shadow-sm sm:p-8">
              <p className="mb-2 font-mono text-xs uppercase tracking-widest text-accent">The Takeaway</p>
              <h2 className="font-display text-2xl font-bold text-ink sm:text-3xl">
                Measure the request from the symptom backwards.
              </h2>
              <p className="mx-auto mt-3 max-w-lg text-sm leading-relaxed text-muted-foreground">
                A slow page is evidence that something in the interaction path is slow — not evidence that the frontend is responsible. Narrow the boundary until you can name the work consuming the time, then optimize that work and retest the original interaction.
              </p>
            </div>

            <section className="space-y-6 pt-4">
              <div className="flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-accent">
                <HelpCircle className="h-4 w-4" />
                <span>FREQUENTLY ASKED QUESTIONS</span>
              </div>
              <h2 className="font-display text-2xl font-bold tracking-tight text-ink sm:text-3xl">
                Frequently Asked Questions
              </h2>

              <div className="space-y-4">
                {faqItems.map((faq) => (
                  <div key={faq.q} className="rounded-xl border border-ink/10 bg-white/60 p-5 shadow-sm">
                    <h3 className="font-display text-base font-bold text-ink sm:text-lg">{faq.q}</h3>
                    <p className="mt-2 text-xs leading-relaxed text-ink/80 sm:text-sm">{faq.a}</p>
                  </div>
                ))}
              </div>
            </section>
          </div>

          <div className="mt-16 flex flex-col items-center justify-between gap-4 border-t border-ink/10 pt-8 font-mono text-xs sm:flex-row">
            <Link
              href="/"
              className="group inline-flex items-center gap-2 font-bold text-ink/75 transition-colors hover:text-accent"
            >
              <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
              <span>Back to Home</span>
            </Link>

            <Link
              href="/react-ui-buggy-remembers-too-much"
              className="group inline-flex items-center gap-2 font-bold text-accent hover:underline"
            >
              <span>Read: Your React UI May Be Buggy Because It Remembers Too Much -&gt;</span>
            </Link>
          </div>
        </div>
      </article>
    </>
  );
}

function DiagramBlock({ children }: { children: string }) {
  return (
    <div className="overflow-x-auto rounded-2xl border border-ink/10 bg-ink/[0.02] p-5 font-mono text-xs leading-relaxed text-ink/75 sm:text-sm">
      <pre className="whitespace-pre">{children}</pre>
    </div>
  );
}

function CodeBlock({
  id,
  label,
  code,
  copied,
  onCopy,
}: {
  id: string;
  label: string;
  code: string;
  copied: boolean;
  onCopy: () => void;
}) {
  return (
    <div className="relative overflow-hidden rounded-2xl border border-ink/15 bg-[#1A1814] text-paper shadow-xl">
      <div className="flex items-center justify-between gap-4 border-b border-paper/10 bg-black/20 px-4 py-2.5 font-mono text-xs text-paper/70">
        <span>{label}</span>
        <button
          type="button"
          onClick={onCopy}
          aria-label={`Copy ${id} code example`}
          className="flex items-center gap-1.5 rounded border border-paper/15 bg-paper/5 px-2.5 py-1 text-paper transition hover:bg-paper/10"
        >
          {copied ? <Check className="h-3 w-3 text-emerald-400" /> : <Copy className="h-3 w-3" />}
          <span className={copied ? "text-emerald-400" : ""}>{copied ? "Copied" : "Copy"}</span>
        </button>
      </div>
      <pre className="overflow-x-auto p-5 font-mono text-xs leading-relaxed text-paper/90 sm:text-sm">
        <code>{code}</code>
      </pre>
    </div>
  );
}
