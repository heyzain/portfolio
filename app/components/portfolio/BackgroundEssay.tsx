"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "@/lib/gsap";

const architectureLabels = ["Database", "API", "Authentication", "Payments"];
const buildWords = ["Frontend", "Backend", "Database", "Authentication", "Deployment"];
const buildTiles = ["Next", "React", "TypeScript", "Node", "API", "Mongo", "Auth", "Stripe", "Tailwind", "GSAP", "Git", "Vercel", "UI", "Perf", "A11y"];
const polishChips = ["Responsive", "Performance", "Accessibility", "Security", "Scalability", "Animations", "Maintainability"];
const stats = [
  { value: "12+", label: "Projects Built" },
  { value: "6+", label: "Production Apps" },
  { value: "1+", label: "Years Experience" },
  { value: "Remote", label: "Available Worldwide" },
];

export function BackgroundEssay() {
  const rootRef = useRef<HTMLElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const root = rootRef.current;
      const stage = stageRef.current;
      if (!root || !stage) return;

      const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      if (reduced) {
        gsap.set("[data-story-step]", { autoAlpha: 1, y: 0, filter: "blur(0px)", scale: 1 });
        gsap.set("[data-story-step]:not(:last-child)", { display: "none" });
        return;
      }

      const steps = gsap.utils.toArray<HTMLElement>("[data-story-step]");
      const blueprintLines = gsap.utils.toArray<HTMLElement>("[data-blueprint-line]");
      const labels = gsap.utils.toArray<HTMLElement>("[data-architecture-label]");
      const blocks = gsap.utils.toArray<HTMLElement>("[data-build-block]");
      const words = gsap.utils.toArray<HTMLElement>("[data-build-word]");
      const chips = gsap.utils.toArray<HTMLElement>("[data-polish-chip]");
      const statEls = gsap.utils.toArray<HTMLElement>("[data-story-stat]");

      gsap.set(steps, { autoAlpha: 0, y: 34, scale: 0.985, filter: "blur(10px)" });
      gsap.set(steps[0], { autoAlpha: 1, y: 0, scale: 1, filter: "blur(0px)" });
      gsap.set(blueprintLines, { scaleX: 0, scaleY: 0, transformOrigin: "center" });
      gsap.set(labels, { autoAlpha: 0, y: 12 });
      gsap.set(blocks, { autoAlpha: 0, y: 28, scale: 0.92 });
      gsap.set(words, { autoAlpha: 0, y: 18 });
      gsap.set(chips, { autoAlpha: 0, y: 24 });
      gsap.set(statEls, { autoAlpha: 0, y: 20 });

      const showStep = (index: number) => {
        const tl = gsap.timeline();
        if (index > 0) {
          tl.to(
            steps[index - 1],
            {
              autoAlpha: 0,
              y: -32,
              scale: 0.985,
              filter: "blur(10px)",
              duration: 0.45,
              ease: "power2.out",
            },
            0,
          );
        }
        tl.to(
          steps[index],
          {
            autoAlpha: 1,
            y: 0,
            scale: 1,
            filter: "blur(0px)",
            duration: 0.56,
            ease: "power2.out",
          },
          index === 0 ? 0 : 0.16,
        );
        return tl;
      };

      const tl = gsap.timeline({
        defaults: { ease: "none" },
        scrollTrigger: {
          trigger: root,
          start: "top top",
          end: "bottom bottom",
          scrub: 0.85,
          invalidateOnRefresh: true,
        },
      });

      tl.add(showStep(0)).to({}, { duration: 0.22 });
      tl.add(showStep(1)).to({}, { duration: 0.24 });
      tl.add(showStep(2))
        .to(blueprintLines, { scaleX: 1, scaleY: 1, duration: 0.5, stagger: 0.04, ease: "power1.out" }, "<0.18")
        .to(labels, { autoAlpha: 1, y: 0, duration: 0.42, stagger: 0.08, ease: "power2.out" }, "<0.18")
        .to({}, { duration: 0.28 });
      tl.add(showStep(3))
        .to(blocks, { autoAlpha: 1, y: 0, scale: 1, duration: 0.44, stagger: 0.07, ease: "power2.out" }, "<0.2")
        .to(words, { autoAlpha: 1, y: 0, duration: 0.42, stagger: 0.07, ease: "power2.out" }, "<0.18")
        .to({}, { duration: 0.28 });
      tl.add(showStep(4))
        .to(chips, { autoAlpha: 1, y: 0, duration: 0.42, stagger: 0.055, ease: "power2.out" }, "<0.2")
        .to({}, { duration: 0.24 });
      tl.add(showStep(5)).to({}, { duration: 0.3 });
      tl.add(showStep(6))
        .to(statEls, { autoAlpha: 1, y: 0, duration: 0.42, stagger: 0.08, ease: "power2.out" }, "<0.2")
        .to({}, { duration: 0.35 });

      return () => {
        tl.scrollTrigger?.kill();
        tl.kill();
      };
    },
    { scope: rootRef },
  );

  return (
    <section id="background" ref={rootRef} className="relative z-20 h-[220vh] border-t border-border bg-background">
      <div ref={stageRef} className="sticky top-0 flex h-screen items-center justify-center overflow-hidden px-8 text-ink lg:px-12">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_42%,rgba(255,255,255,0.72),transparent_48%)]" />
        <div className="pointer-events-none absolute inset-0 opacity-[0.32] ambient-grid" />

        <div className="relative z-10 h-full w-full max-w-[1400px]">
          <div className="absolute inset-x-0 top-10 flex items-baseline gap-6 w-full text-left">
            <span className="font-mono text-xs tracking-[0.25em] text-accent">02 BACKGROUND & STORY</span>
            <span className="h-px flex-1 bg-ink/20" />
            <span className="hidden font-mono text-xs text-muted-foreground md:inline">PRODUCT ENGINEERING</span>
          </div>

          <article data-story-step className="absolute inset-0 flex flex-col items-center justify-center text-center">
            <h2 className="max-w-5xl font-display text-4xl font-medium leading-[1.02] tracking-tight md:text-6xl">
              Building products,
              <br />
              <span className="italic">not just pages.</span>
            </h2>
            <p className="mt-7 max-w-xl text-base leading-[1.75] text-ink/68 md:text-lg">
              I create complete digital products - from architecture to deployment.
            </p>
          </article>

          <article data-story-step className="absolute inset-0 flex flex-col items-center justify-center text-center">
            <h2 className="max-w-5xl font-display text-4xl font-medium leading-[1.02] tracking-tight md:text-6xl">
              I don&apos;t start
              <br />
              with code.
            </h2>
            <p className="mt-7 max-w-xl text-base leading-[1.75] text-ink/68 md:text-lg">
              Every product starts with understanding the problem.
            </p>
          </article>

          <article data-story-step className="absolute inset-0 flex flex-col items-center justify-center text-center">
            <div aria-hidden className="absolute inset-x-[12%] top-[27%] h-[46%]">
              <span data-blueprint-line className="absolute left-0 top-1/2 h-px w-full bg-ink/12" />
              <span data-blueprint-line className="absolute left-1/2 top-0 h-full w-px bg-ink/12" />
              <span data-blueprint-line className="absolute left-[18%] top-[18%] h-px w-[64%] bg-ink/10" />
              <span data-blueprint-line className="absolute left-[18%] bottom-[18%] h-px w-[64%] bg-ink/10" />
              <span data-blueprint-line className="absolute left-[18%] top-[18%] h-[64%] w-px bg-ink/10" />
              <span data-blueprint-line className="absolute right-[18%] top-[18%] h-[64%] w-px bg-ink/10" />
            </div>
            <h2 className="max-w-5xl font-display text-4xl font-medium leading-[1.02] tracking-tight md:text-6xl">
              I design the
              <br />
              architecture.
            </h2>
            <div className="mt-10 flex flex-wrap justify-center gap-3">
              {architectureLabels.map((label) => (
                <span
                  key={label}
                  data-architecture-label
                  className="rounded-full border border-ink/12 bg-white/72 px-4 py-2 font-mono text-[11px] uppercase tracking-[0.18em] text-ink/62"
                >
                  {label}
                </span>
              ))}
            </div>
          </article>

          <article data-story-step className="absolute inset-0 flex flex-col items-center justify-center text-center">
            <div className="group/build mb-10 grid grid-cols-5 gap-2">
              {buildTiles.map((tool, index) => (
                <span
                  key={tool}
                  data-build-block
                  className={`flex h-9 w-12 items-center justify-center rounded-[8px] border border-ink/12 bg-white/82 font-mono text-[8px] font-semibold uppercase tracking-[0.08em] text-ink/58 shadow-[0_12px_28px_-24px_var(--ink)] transition duration-300 hover:-translate-y-1 hover:border-ink/30 hover:bg-ink hover:text-paper md:h-12 md:w-16 md:text-[9px] ${
                    index % 5 === 0 ? "bg-vermillion/10 text-ink/72" : ""
                  }`}
                >
                  {tool}
                </span>
              ))}
            </div>
            <h2 className="font-display text-6xl font-medium leading-none tracking-tight md:text-9xl">Then I build.</h2>
            <div className="mt-9 flex flex-wrap justify-center gap-x-6 gap-y-3">
              {buildWords.map((word) => (
                <span key={word} data-build-word className="font-mono text-[11px] uppercase tracking-[0.22em] text-ink/55">
                  {word}
                </span>
              ))}
            </div>
          </article>

          <article data-story-step className="absolute inset-0 flex flex-col items-center justify-center text-center">
            <h2 className="font-display text-6xl font-medium leading-none tracking-tight md:text-9xl">Then I polish.</h2>
            <div className="mt-10 flex max-w-4xl flex-wrap justify-center gap-3">
              {polishChips.map((chip) => (
                <span
                  key={chip}
                  data-polish-chip
                  className="rounded-full border border-ink/12 bg-white/78 px-4 py-2 font-mono text-[11px] uppercase tracking-[0.18em] text-ink/62 shadow-[0_14px_32px_-28px_var(--ink)]"
                >
                  {chip}
                </span>
              ))}
            </div>
          </article>

          <article data-story-step className="absolute inset-0 flex flex-col items-center justify-center text-center">
            <h2 className="max-w-6xl font-display text-[18vw] font-medium leading-[0.82] tracking-tight md:text-[9.5rem] lg:text-[11rem]">
              One engineer.
              <br />
              Entire product.
              <br />
              Shipped.
            </h2>
          </article>

          <article data-story-step className="absolute inset-0 flex flex-col items-center justify-center text-center">
            <h2 className="max-w-5xl font-display text-4xl font-medium leading-[1.02] tracking-tight md:text-6xl">
              Complete product
              <br />
              ownership.
            </h2>
            <div className="mt-12 grid w-full max-w-5xl grid-cols-2 gap-x-6 gap-y-8 md:grid-cols-4">
              {stats.map((stat) => (
                <div key={stat.label} data-story-stat className="border-t border-ink/18 pt-5">
                  <div className="font-display text-4xl font-medium leading-none tracking-tight md:text-5xl">{stat.value}</div>
                  <div className="mt-2 font-mono text-[10px] uppercase tracking-[0.18em] text-ink/50">{stat.label}</div>
                </div>
              ))}
            </div>
          </article>
        </div>
      </div>
    </section>
  );
}
