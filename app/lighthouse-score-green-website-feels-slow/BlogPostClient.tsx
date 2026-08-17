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
  Gauge, 
  Zap, 
  Layers, 
  Activity, 
  HelpCircle,
  Sparkles,
  ArrowRight
} from "lucide-react";
import { toast } from "sonner";

export function BlogPostClient() {
  const [copied, setCopied] = useState(false);
  const [codeCopied, setCodeCopied] = useState(false);
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

  const copyCode = async (code: string) => {
    try {
      await navigator.clipboard.writeText(code);
      setCodeCopied(true);
      toast.success("Code copied!");
      setTimeout(() => setCodeCopied(false), 2000);
    } catch {
      toast.error("Failed to copy code");
    }
  };

  const codeSnippet = `performance.mark("hero-usable");

performance.measure("time-to-hero-usable", {
  start: 0,
  end: "hero-usable",
});

const measurement = performance.getEntriesByName(
  "time-to-hero-usable"
)[0];

console.log(
  \`Hero usable after \${measurement.duration}ms\`
);`;

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
        {/* Subtle Ambient Grid Background */}
        <div className="pointer-events-none absolute inset-0 ambient-grid opacity-40" />

        <div className="relative mx-auto max-w-4xl px-6 pt-12 sm:px-8 sm:pt-16 md:pt-20">
          {/* Breadcrumb / Category Tag */}
          <div className="mb-6 flex flex-wrap items-center gap-2 font-mono text-xs text-muted-foreground">
            <Link href="/" className="hover:text-accent transition-colors">HOME</Link>
            <span>/</span>
            <span className="text-accent font-semibold tracking-wider">FRONTEND ARCHITECTURE</span>
            <span>/</span>
            <span>PERFORMANCE AUDITING</span>
          </div>

          {/* Headline */}
          <h1 className="font-display text-3xl font-medium leading-[1.08] tracking-tight text-ink sm:text-5xl md:text-6xl">
            Your Lighthouse Score Is Green. Why Does Your Website Still Feel Slow?
          </h1>

          {/* Subtitle / Lead Paragraph */}
          <p className="mt-6 text-lg sm:text-xl font-normal leading-relaxed text-muted-foreground">
            A good Lighthouse score does not always mean a fast-feeling website. Here is how perceived performance, Core Web Vitals, interactions, and real-user testing reveal what automated audits miss.
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
                8 min read
              </span>
              <span className="hidden sm:inline-block rounded-full bg-emerald-500/10 border border-emerald-500/20 px-2.5 py-0.5 font-bold text-emerald-700">
                FIELD VERIFIED
              </span>
            </div>
          </div>

          {/* Wide Hero Image */}
          <div className="my-10 overflow-hidden rounded-[24px] border border-ink/10 bg-white/60 shadow-[0_20px_60px_rgba(26,24,20,0.06),inset_0_1px_0_rgba(255,255,255,0.85)]">
            <img
              src="/lighthouse-score-website-feels-slow-hero.webp"
              alt="Green Lighthouse score versus slow perceived website performance"
              className="h-auto w-full object-cover"
              loading="eager"
            />
          </div>

          {/* Article Key Takeaway Box */}
          <div className="my-8 rounded-2xl border border-accent/20 bg-accent/5 p-6 backdrop-blur-sm sm:p-7">
            <div className="flex items-start gap-3">
              <Sparkles className="mt-1 h-5 w-5 shrink-0 text-accent" />
              <div>
                <h3 className="font-display text-lg font-bold text-ink">The Core Principle</h3>
                <p className="mt-1 text-sm leading-relaxed text-ink/85">
                  <strong>A website can measure as fast without feeling fast.</strong> Lighthouse is an essential diagnostic tool, but treating a lab score as the final definition of user experience blinds you to post-load delays, unresponsive interactions, and unoptimized content sequences.
                </p>
              </div>
            </div>
          </div>

          {/* Body Content */}
          <div className="prose-custom mt-12 space-y-10 text-[1.0625rem] leading-[1.8] text-ink/90">
            {/* Opening Intro */}
            <div className="space-y-4 font-normal">
              <p>You run your website through Lighthouse.</p>
              <p className="font-semibold text-emerald-700 text-lg">Performance is green.</p>
              <p>
                Largest Contentful Paint looks good. Layout shift is under control. There are no obvious warnings that make you panic.
              </p>
              <p>Then you open the website yourself.</p>
              <p className="font-display text-xl italic text-ink">And somehow, it still feels slow.</p>
              <ul className="list-disc pl-6 space-y-2 text-ink/80 text-base">
                <li>Maybe the introduction takes too long.</li>
                <li>Maybe the page is visible but you cannot interact with it yet.</li>
                <li>Maybe clicking a link gives you a brief moment where nothing seems to happen.</li>
                <li>Or perhaps the interface technically loads quickly, but the useful part of the page arrives later.</li>
              </ul>
              <p className="text-base">
                That creates an important distinction: <strong className="text-ink">A website can measure as fast without feeling fast.</strong>
              </p>
              <p className="text-base">
                Lighthouse is extremely useful. I use it too. The mistake is not using Lighthouse. The mistake is treating its score as the final definition of performance.
              </p>
            </div>

            <hr className="border-ink/10" />

            {/* Section 1 */}
            <section className="space-y-4">
              <h2 className="font-display text-2xl font-bold tracking-tight text-ink sm:text-3xl">
                A Lighthouse Score Is a Signal, Not the Entire User Experience
              </h2>
              <p>
                Lighthouse is an automated tool for auditing web pages, including performance, accessibility, SEO, and other quality checks. Its Performance score combines several measured metrics into a weighted score. Scores from 90 to 100 are displayed as green and considered good.
              </p>
              <p>That makes the score useful for quickly identifying whether something is obviously wrong.</p>
              <p>But consider what a real user actually does. They do not:</p>
              <ol className="list-decimal pl-6 space-y-1 text-base font-mono text-ink/75">
                <li>Open your website.</li>
                <li>Read your Lighthouse score.</li>
                <li>Decide the website is fast.</li>
              </ol>
              
              <div className="my-6 rounded-2xl border border-ink/10 bg-white/70 p-5 shadow-sm">
                <p className="font-mono text-xs uppercase tracking-widest text-accent mb-2">The Real User Sequence</p>
                <div className="flex flex-wrap items-center gap-2 sm:gap-3 font-mono text-xs sm:text-sm font-bold text-ink">
                  <span className="rounded-lg border border-ink/10 bg-paper px-3 py-1.5">Open</span>
                  <span>→</span>
                  <span className="rounded-lg border border-ink/10 bg-paper px-3 py-1.5">See</span>
                  <span>→</span>
                  <span className="rounded-lg border border-ink/10 bg-paper px-3 py-1.5">Understand</span>
                  <span>→</span>
                  <span className="rounded-lg border border-ink/10 bg-paper px-3 py-1.5">Interact</span>
                  <span>→</span>
                  <span className="rounded-lg border border-accent/30 bg-accent/10 text-accent px-3 py-1.5">Complete</span>
                </div>
              </div>
              <p>
                Every delay inside that sequence affects how fast the product feels. And some of those delays are not well represented by a single performance score.
              </p>
            </section>

            <hr className="border-ink/10" />

            {/* Section 2: PageSpeed Insights */}
            <section className="space-y-4">
              <h2 className="font-display text-2xl font-bold tracking-tight text-ink sm:text-3xl">
                PageSpeed Insights Already Shows Why One Number Is Not Enough
              </h2>
              <p>
                One of the most useful things to understand about PageSpeed Insights is that it separates <strong>lab data</strong> from <strong>field data</strong>.
              </p>

              <div className="grid gap-4 sm:grid-cols-2 my-6">
                <div className="rounded-2xl border border-ink/10 bg-white/60 p-5 shadow-sm">
                  <div className="flex items-center gap-2 font-mono text-xs font-bold uppercase tracking-wider text-accent mb-2">
                    <Gauge className="h-4 w-4" />
                    <span>Lab Data (Lighthouse)</span>
                  </div>
                  <p className="text-sm leading-relaxed text-ink/80">
                    Generated in a synthetic, controlled environment with fixed throttling. Ideal for reproducible debugging, benchmarking, and identifying regression during development.
                  </p>
                  <div className="mt-3 font-mono text-xs text-muted-foreground border-t border-ink/10 pt-2">
                    <strong>Question:</strong> How does the page behave under ideal controlled conditions?
                  </div>
                </div>

                <div className="rounded-2xl border border-emerald-500/20 bg-emerald-500/[0.04] p-5 shadow-sm">
                  <div className="flex items-center gap-2 font-mono text-xs font-bold uppercase tracking-wider text-emerald-700 mb-2">
                    <Activity className="h-4 w-4" />
                    <span>Field Data (CrUX)</span>
                  </div>
                  <p className="text-sm leading-relaxed text-ink/80">
                    Sourced from real Chrome users across diverse mobile hardware, varying 4G/5G/WiFi networks, multi-page flows, and complex interaction patterns.
                  </p>
                  <div className="mt-3 font-mono text-xs text-muted-foreground border-t border-emerald-500/10 pt-2">
                    <strong>Question:</strong> What are real human visitors actually experiencing?
                  </div>
                </div>
              </div>

              <p>A lab test gives you something repeatable. A user gives you reality.</p>
              <p>A real visitor might be:</p>
              <ul className="list-disc pl-6 space-y-1 text-base text-ink/80">
                <li>using an older phone with limited CPU cycles,</li>
                <li>connected through a weaker mobile network with packet loss,</li>
                <li>returning with cached assets and service workers,</li>
                <li>navigating between routes on a Single Page Application,</li>
                <li>clicking buttons while JavaScript is busy parsing or hydrating,</li>
                <li>opening your application after it has been running for several minutes,</li>
                <li>or following a flow your initial page-load test never exercised.</li>
              </ul>
              <p>Neither view makes the other useless. They answer different questions. You need both perspectives when performance matters.</p>
            </section>

            <hr className="border-ink/10" />

            {/* Section 3: Sequence */}
            <section className="space-y-6">
              <h2 className="font-display text-2xl font-bold tracking-tight text-ink sm:text-3xl">
                Users Experience a Sequence, Not a Performance Score
              </h2>
              <p>When I think about frontend performance now, I find it more useful to break the experience into moments.</p>

              <div className="space-y-4">
                <div className="rounded-2xl border border-ink/10 bg-white/60 p-5 shadow-sm">
                  <h3 className="font-display text-lg font-bold text-ink flex items-center gap-2">
                    <span className="flex h-6 w-6 items-center justify-center rounded-full bg-accent text-white font-mono text-xs">1</span>
                    When does the user see something?
                  </h3>
                  <p className="mt-2 text-sm text-ink/80 leading-relaxed">
                    A blank screen immediately feels slower than a screen that responds with useful visual feedback. This is where metrics such as First Contentful Paint (FCP) can help. But seeing <em>something</em> is only the beginning.
                  </p>
                </div>

                <div className="rounded-2xl border border-ink/10 bg-white/60 p-5 shadow-sm">
                  <h3 className="font-display text-lg font-bold text-ink flex items-center gap-2">
                    <span className="flex h-6 w-6 items-center justify-center rounded-full bg-accent text-white font-mono text-xs">2</span>
                    When does the user understand the page?
                  </h3>
                  <p className="mt-2 text-sm text-ink/80 leading-relaxed">
                    Suppose your header appears instantly, but the hero containing the actual value proposition arrives much later. Technically, content has rendered. From the user's perspective, however, the page still has not answered the most basic question: <strong>What is this website, and what can I do here?</strong> That is why content priority matters almost as much as raw speed.
                  </p>
                </div>

                <div className="rounded-2xl border border-ink/10 bg-white/60 p-5 shadow-sm">
                  <h3 className="font-display text-lg font-bold text-ink flex items-center gap-2">
                    <span className="flex h-6 w-6 items-center justify-center rounded-full bg-accent text-white font-mono text-xs">3</span>
                    When can the user interact?
                  </h3>
                  <p className="mt-2 text-sm text-ink/80 leading-relaxed">
                    A button that is visible but temporarily unresponsive creates a particularly frustrating delay. The interface looks ready. The user behaves as though it is ready. But the browser thread is busy. A fast-looking interface that ignores input feels worse than one that clearly communicates it is still preparing.
                  </p>
                </div>

                <div className="rounded-2xl border border-ink/10 bg-white/60 p-5 shadow-sm">
                  <h3 className="font-display text-lg font-bold text-ink flex items-center gap-2">
                    <span className="flex h-6 w-6 items-center justify-center rounded-full bg-accent text-white font-mono text-xs">4</span>
                    Does the interface remain stable?
                  </h3>
                  <p className="mt-2 text-sm text-ink/80 leading-relaxed">
                    Unexpected movement affects the perception of quality. A button moving just as someone tries to click it does not only create a layout problem—it creates uncertainty. The page stops feeling controlled.
                  </p>
                </div>
              </div>
            </section>

            <hr className="border-ink/10" />

            {/* Section 4: Core Web Vitals */}
            <section className="space-y-4">
              <h2 className="font-display text-2xl font-bold tracking-tight text-ink sm:text-3xl">
                Core Web Vitals Help Measure Important Parts of This Experience
              </h2>
              <p>Google's current Core Web Vitals focus on three major parts of the user experience:</p>

              <div className="grid gap-3 sm:grid-cols-3 my-4">
                <div className="rounded-xl border border-ink/10 bg-paper p-4">
                  <span className="font-mono text-xs font-bold text-accent block">LCP &le; 2.5s</span>
                  <span className="font-display text-base font-bold text-ink block mt-1">Largest Contentful Paint</span>
                  <span className="text-xs text-muted-foreground mt-1 block">Loading performance &amp; main visual asset</span>
                </div>
                <div className="rounded-xl border border-ink/10 bg-paper p-4">
                  <span className="font-mono text-xs font-bold text-accent block">INP &le; 200ms</span>
                  <span className="font-display text-base font-bold text-ink block mt-1">Interaction to Next Paint</span>
                  <span className="text-xs text-muted-foreground mt-1 block">Responsiveness to clicks, taps, &amp; keypresses</span>
                </div>
                <div className="rounded-xl border border-ink/10 bg-paper p-4">
                  <span className="font-mono text-xs font-bold text-accent block">CLS &le; 0.1</span>
                  <span className="font-display text-base font-bold text-ink block mt-1">Cumulative Layout Shift</span>
                  <span className="text-xs text-muted-foreground mt-1 block">Visual stability &amp; layout predictability</span>
                </div>
              </div>

              <p>
                These are valuable metrics. They move performance measurement much closer to what users actually experience. But there is another critical observation:
              </p>
              <blockquote className="border-l-4 border-accent pl-4 font-display italic text-lg text-ink">
                Your product may contain important moments that no standard metric completely describes.
              </blockquote>

              <div className="space-y-2 text-sm font-mono text-ink/80 bg-white/50 p-4 rounded-xl border border-ink/10">
                <p><strong>Dashboard:</strong> When can the user see their actual data?</p>
                <p><strong>Ecommerce:</strong> When can the user confidently add the item to their cart?</p>
                <p><strong>Search:</strong> When do useful results become visible?</p>
                <p><strong>Portfolio:</strong> When is the hero actually readable and usable?</p>
              </div>
              <p>Those are product questions, not only browser questions. And sometimes you need to measure them yourself.</p>
            </section>

            <hr className="border-ink/10" />

            {/* Section 5: The Slow Feeling Often Starts After Initial Page Load */}
            <section className="space-y-5">
              <h2 className="font-display text-2xl font-bold tracking-tight text-ink sm:text-3xl">
                The Slow Feeling Often Starts After the Initial Page Load
              </h2>
              <p>
                This is where a website with good performance numbers can still disappoint. The HTML arrives quickly, the primary content paints, Lighthouse finishes its test, and everything looks green.
              </p>
              <p>
                Then the visitor clicks navigation or toggles a filter. That journey looks like:
              </p>

              <div className="rounded-xl border border-ink/10 bg-ink/[0.03] p-4 text-center font-mono text-xs sm:text-sm font-bold text-ink">
                Click → Wait → Route → Fetch → Render
              </div>

              <p>
                The waiting happened <em>after</em> the initial page load. This is especially prevalent in modern React and Next.js applications where most interactions bypass full-page reloads.
              </p>

              <div className="space-y-4 mt-6">
                <div className="rounded-xl border border-ink/10 bg-white/60 p-4">
                  <h4 className="font-bold text-ink">1. Blocking splash animations</h4>
                  <p className="text-sm text-ink/80 mt-1">
                    Animations can make a product memorable, but they can also become artificial loading screens. If your app is ready but makes users wait 3 seconds for an intro, you've added 3 seconds to the experience yourself. <em>Does this animation earn the time it asks from the user?</em>
                  </p>
                </div>

                <div className="rounded-xl border border-ink/10 bg-white/60 p-4">
                  <h4 className="font-bold text-ink">2. Blank route transitions</h4>
                  <p className="text-sm text-ink/80 mt-1">
                    Clicking navigation and seeing nothing happen creates uncertainty. Even a 200ms delay feels agonizingly long when the interface provides zero visual acknowledgement.
                  </p>
                </div>

                <div className="rounded-xl border border-ink/10 bg-white/60 p-4">
                  <h4 className="font-bold text-ink">3. Client-side data fetching waterfalls</h4>
                  <p className="text-sm text-ink/80 mt-1">
                    The application shell arrives quickly, but the information the user came for sits behind nested useEffect hooks. The page appears loaded long before it becomes useful.
                  </p>
                </div>

                <div className="rounded-xl border border-ink/10 bg-white/60 p-4">
                  <h4 className="font-bold text-ink">4. Heavy JavaScript after loading</h4>
                  <p className="text-sm text-ink/80 mt-1">
                    Expensive scripts can tie up the main thread post-hydration, delaying click responses and making scrolling stutter.
                  </p>
                </div>

                <div className="rounded-xl border border-ink/10 bg-white/60 p-4">
                  <h4 className="font-bold text-ink">5. Content appearing in the wrong order</h4>
                  <p className="text-sm text-ink/80 mt-1">
                    If decorative graphics and complex widgets render before the primary headline and action buttons, the user feels stuck. Performance is an engineering problem—and a prioritization problem.
                  </p>
                </div>
              </div>
            </section>

            <hr className="border-ink/10" />

            {/* Section 6: The 4 Moments Framework */}
            <section className="space-y-5">
              <h2 className="font-display text-2xl font-bold tracking-tight text-ink sm:text-3xl">
                The Framework I Use: Measure Four Moments, Not One Score
              </h2>
              <p>Instead of asking only "How fast is this page?", I evaluate four product moments:</p>

              <div className="grid gap-4 sm:grid-cols-2 my-4">
                <div className="rounded-2xl border border-ink/10 bg-white/70 p-5 shadow-sm">
                  <span className="font-mono text-xs font-bold uppercase tracking-wider text-accent">Moment 1</span>
                  <h3 className="font-display text-xl font-bold text-ink mt-1">Visible</h3>
                  <p className="text-sm text-ink/80 mt-2 leading-relaxed">
                    <strong>How quickly does the first useful visual response appear?</strong> Prioritize initial feedback so the user knows the application has acknowledged their request.
                  </p>
                </div>

                <div className="rounded-2xl border border-ink/10 bg-white/70 p-5 shadow-sm">
                  <span className="font-mono text-xs font-bold uppercase tracking-wider text-accent">Moment 2</span>
                  <h3 className="font-display text-xl font-bold text-ink mt-1">Meaningful</h3>
                  <p className="text-sm text-ink/80 mt-2 leading-relaxed">
                    <strong>When can the user understand the page?</strong> The headline, core content, and primary context must arrive without waiting on secondary widgets.
                  </p>
                </div>

                <div className="rounded-2xl border border-ink/10 bg-white/70 p-5 shadow-sm">
                  <span className="font-mono text-xs font-bold uppercase tracking-wider text-accent">Moment 3</span>
                  <h3 className="font-display text-xl font-bold text-ink mt-1">Responsive</h3>
                  <p className="text-sm text-ink/80 mt-2 leading-relaxed">
                    <strong>When the user interacts, does it respond immediately?</strong> Never present an interactive-looking element that silently swallows or delays clicks.
                  </p>
                </div>

                <div className="rounded-2xl border border-ink/10 bg-white/70 p-5 shadow-sm">
                  <span className="font-mono text-xs font-bold uppercase tracking-wider text-accent">Moment 4</span>
                  <h3 className="font-display text-xl font-bold text-ink mt-1">Stable</h3>
                  <p className="text-sm text-ink/80 mt-2 leading-relaxed">
                    <strong>Does the interface stay predictable while loading?</strong> Reserve layouts, avoid unexpected shifts, and provide honest progress indicators.
                  </p>
                </div>
              </div>

              <div className="rounded-xl border border-ink/10 bg-paper p-4 font-mono text-xs sm:text-sm text-center font-bold text-ink">
                Visible → Meaningful → Responsive → Stable
              </div>
              <p className="text-sm text-muted-foreground text-center">
                It is not a replacement for Core Web Vitals—it is a product-level layer on top of them.
              </p>
            </section>

            <hr className="border-ink/10" />

            {/* Section 7: Case Study on heyzain.dev */}
            <section className="space-y-4">
              <h2 className="font-display text-2xl font-bold tracking-tight text-ink sm:text-3xl">
                I’m Testing This on heyzain.dev
              </h2>
              <p>
                My own portfolio, <strong>heyzain.dev</strong>, is a prime example because it features an animated entrance. I like the animation. The critical question is whether liking the effect is enough justification for the time it takes.
              </p>

              <div className="grid gap-4 sm:grid-cols-2 my-4">
                <div className="rounded-2xl border border-ink/10 bg-white/60 p-5">
                  <h4 className="font-mono text-xs font-bold uppercase tracking-wider text-ink/70">Current Version</h4>
                  <ul className="mt-2 list-disc pl-5 text-sm space-y-1 text-ink/80">
                    <li>Current entrance animation sequence</li>
                    <li>Timed hero reveal</li>
                    <li>Sequential interaction timing</li>
                  </ul>
                </div>

                <div className="rounded-2xl border border-accent/20 bg-accent/5 p-5">
                  <h4 className="font-mono text-xs font-bold uppercase tracking-wider text-accent">Test Version</h4>
                  <ul className="mt-2 list-disc pl-5 text-sm space-y-1 text-ink/80">
                    <li>Shorter, streamlined entrance</li>
                    <li>Non-blocking animation layers</li>
                    <li>Immediate interaction availability</li>
                  </ul>
                </div>
              </div>
              <p className="text-sm text-muted-foreground">
                The key discipline is changing <strong>one meaningful variable at a time</strong> so that any improvement is directly attributable.
              </p>
            </section>

            <hr className="border-ink/10" />

            {/* Section 8: Code Implementation */}
            <section className="space-y-4">
              <h2 className="font-display text-2xl font-bold tracking-tight text-ink sm:text-3xl">
                Measure When the Product Becomes Useful
              </h2>
              <p>
                For heyzain.dev, I define a custom state: <strong>Hero usable</strong> (headline readable, CTA active, navigation live). Here is how I instrument it with the User Timing API:
              </p>

              {/* Code Snippet Box with Copy Button */}
              <div className="relative overflow-hidden rounded-2xl border border-ink/15 bg-[#0d0d0d] text-zinc-100 shadow-xl">
                <div className="flex items-center justify-between border-b border-zinc-800 bg-zinc-900/80 px-4 py-2.5 text-xs font-mono text-zinc-400">
                  <span>performance-measurement.ts</span>
                  <button
                    onClick={() => copyCode(codeSnippet)}
                    className="flex items-center gap-1.5 rounded border border-zinc-700 bg-zinc-800 px-2.5 py-1 text-zinc-200 transition hover:bg-zinc-700"
                  >
                    {codeCopied ? (
                      <>
                        <Check className="h-3 w-3 text-emerald-400" />
                        <span className="text-emerald-400">Copied</span>
                      </>
                    ) : (
                      <>
                        <Copy className="h-3 w-3" />
                        <span>Copy Code</span>
                      </>
                    )}
                  </button>
                </div>
                <pre className="overflow-x-auto p-5 font-mono text-xs sm:text-sm leading-relaxed">
                  <code>{codeSnippet}</code>
                </pre>
              </div>

              <p className="text-sm text-muted-foreground">
                This is a <strong>product-specific measurement</strong>. It answers what standardized browser metrics were never designed to answer: <em>When does my specific interface become usable?</em>
              </p>
            </section>

            <hr className="border-ink/10" />

            {/* Section 9: 6-Step Workflow */}
            <section className="space-y-4">
              <h2 className="font-display text-2xl font-bold tracking-tight text-ink sm:text-3xl">
                Test the Experience, Not Just the Page
              </h2>
              <p>A practical audit should go beyond clicking "Analyze". Here is the workflow I follow:</p>

              <div className="space-y-3 my-6">
                {[
                  { step: "1", title: "Run PageSpeed Insights", desc: "Test mobile and desktop. Don't obsess over a perfect 100—focus on obvious bottlenecks in the 90+ range." },
                  { step: "2", title: "Separate Lab Results from Field Results", desc: "Compare CrUX data with local audits to identify disparities caused by real hardware and networks." },
                  { step: "3", title: "Record the Page Visually", desc: "Use Chrome DevTools filmstrips to confirm when meaningful content actually becomes visible." },
                  { step: "4", title: "Interact with the Application", desc: "Click navigation, toggle filters, and submit forms. Measure latency across the whole journey." },
                  { step: "5", title: "Define Your Key Product Moment", desc: "Identify when the user can accomplish their core task (e.g. cart ready, data loaded, hero readable)." },
                  { step: "6", title: "Change One Thing at a Time", desc: "Shorten an animation, eliminate a dependency, or pre-render critical data—then re-measure." },
                ].map((item) => (
                  <div key={item.step} className="flex items-start gap-3.5 rounded-xl border border-ink/10 bg-white/60 p-4">
                    <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-accent font-mono text-xs font-bold text-white">
                      {item.step}
                    </span>
                    <div>
                      <h4 className="font-display text-base font-bold text-ink">{item.title}</h4>
                      <p className="text-xs sm:text-sm text-ink/80 mt-0.5 leading-relaxed">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            <hr className="border-ink/10" />

            {/* Section 10: Product Decisions */}
            <section className="space-y-4">
              <h2 className="font-display text-2xl font-bold tracking-tight text-ink sm:text-3xl">
                Performance Is Also a Product Decision
              </h2>
              <p>
                Performance is frequently treated as though it belongs purely to backend queries and bundle sizes. Those matter. But many sluggish moments stem from product design choices:
              </p>
              <ul className="list-disc pl-6 space-y-1 text-base text-ink/80">
                <li>Should the animation block interaction?</li>
                <li>Should this data load before the rest?</li>
                <li>Should navigation wait for the request to resolve?</li>
                <li>Should the interface acknowledge clicks immediately with optimistic UI?</li>
                <li>Should returning visitors see the same splash introduction again?</li>
              </ul>
              <p>
                These are architectural decisions. That is why an audit must not stop when Lighthouse turns green.
              </p>
            </section>

            {/* Summary Conclusion Box */}
            <div className="rounded-2xl border border-ink/15 bg-white/80 p-6 sm:p-8 shadow-sm text-center my-10">
              <p className="font-mono text-xs uppercase tracking-widest text-accent mb-2">The Takeaway</p>
              <h3 className="font-display text-2xl sm:text-3xl font-bold text-ink">
                "Fast is a user never wondering whether the product is ready."
              </h3>
              <p className="mt-3 text-sm text-muted-foreground max-w-lg mx-auto">
                Audit the waiting—not only the loading.
              </p>
            </div>

            <hr className="border-ink/10" />

            {/* FAQ Section */}
            <section className="space-y-6 pt-4">
              <div className="flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-accent">
                <HelpCircle className="h-4 w-4" />
                <span>FREQUENTLY ASKED QUESTIONS</span>
              </div>
              <h2 className="font-display text-2xl font-bold tracking-tight text-ink sm:text-3xl">
                Frequently Asked Questions
              </h2>

              <div className="space-y-4">
                {[
                  {
                    q: "Why does my website feel slow even with a good Lighthouse score?",
                    a: "A Lighthouse test measures performance under controlled synthetic conditions. Your real user experience can also be affected by route transitions, client-side data fetching, animations, background JavaScript execution, and device bottlenecks.",
                  },
                  {
                    q: "Is a 100 Lighthouse score necessary?",
                    a: "No. Lighthouse considers scores between 90 and 100 good. Google explicitly notes that achieving a perfect 100 is difficult and not expected for every website. Focus on real user feel and perceived speed.",
                  },
                  {
                    q: "What are the current Core Web Vitals?",
                    a: "The Core Web Vitals are Largest Contentful Paint (LCP) for loading, Interaction to Next Paint (INP) for responsiveness, and Cumulative Layout Shift (CLS) for visual stability.",
                  },
                  {
                    q: "What is perceived website performance?",
                    a: "Perceived performance describes how fast an application feels to the person using it. It is influenced by when useful content appears, immediate interactive feedback, predictable layouts, and transparent progress indicators.",
                  },
                  {
                    q: "Is PageSpeed Insights the same as Lighthouse?",
                    a: "Not exactly. PageSpeed Insights runs Lighthouse for its lab diagnostics, but it also displays real-world field data from the Chrome User Experience Report (CrUX) when traffic thresholds are met.",
                  },
                  {
                    q: "Should I remove animations to improve website performance?",
                    a: "Not automatically. Animation enhances hierarchy and brand polish. The key question is whether it delays critical content or blocks user interaction. Always measure before removing.",
                  },
                ].map((faq, idx) => (
                  <div key={idx} className="rounded-xl border border-ink/10 bg-white/60 p-5 shadow-sm">
                    <h3 className="font-display text-base sm:text-lg font-bold text-ink">{faq.q}</h3>
                    <p className="mt-2 text-xs sm:text-sm text-ink/80 leading-relaxed">{faq.a}</p>
                  </div>
                ))}
              </div>
            </section>
          </div>
        </div>
      </article>
    </>
  );
}
