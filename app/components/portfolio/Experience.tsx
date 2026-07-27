"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "@/lib/gsap";
import { experience } from "@/content/portfolio";

export function Experience() {
  const rootRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const learning = experience[0];
  const projects = experience[1];
  const role = experience[2];

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      mm.add("(min-width: 768px) and (prefers-reduced-motion: no-preference)", () => {
        const track = trackRef.current;
        if (!track) return;

        const distance = () => track.scrollWidth - window.innerWidth;
        const hold = () => window.innerHeight * 0.75;

        gsap.to(track, {
          x: () => -distance(),
          ease: "none",
          scrollTrigger: {
            trigger: rootRef.current,
            pin: true,
            scrub: 1,
            anticipatePin: 1,
            invalidateOnRefresh: true,
            end: () => `+=${distance() + hold()}`,
          },
        });

        gsap.from("[data-experience-panel]", {
          opacity: 0,
          y: 28,
          duration: 0.8,
          ease: "power3.out",
          stagger: 0.08,
          scrollTrigger: { trigger: rootRef.current, start: "top 70%" },
        });
      });

      return () => mm.revert();
    },
    { scope: rootRef },
  );

  return (
    <section
      id="experience"
      ref={rootRef}
      className="overflow-hidden border-t border-border bg-foreground text-background"
    >
      <div ref={trackRef} className="flex flex-col md:h-screen md:w-max md:flex-row">
        <article
          data-experience-panel
          className="grid min-h-screen px-8 py-14 md:h-screen md:w-screen md:shrink-0 md:grid-rows-[auto_1fr_auto] lg:px-12"
        >
          <div className="flex items-baseline gap-6">
            <span className="font-mono text-xs tracking-[0.25em] text-accent">04 EXPERIENCE</span>
            <span className="h-px flex-1 bg-background/20" />
            <span className="hidden font-mono text-xs text-background/45 md:inline">01 / 02</span>
          </div>

          <div className="grid gap-10 self-center md:grid-cols-12 md:items-center">
            <div className="md:col-span-6">
              <p className="font-mono text-[11px] uppercase tracking-[0.28em] text-accent">
                {learning.span} / {projects.span}
              </p>
              <h2 className="mt-3 max-w-3xl font-display text-4xl font-medium leading-[1.02] tracking-tight md:text-6xl">
                Learning by building.
              </h2>
            </div>

            <div className="space-y-7 md:col-span-5 md:col-start-8">
              <p className="text-base leading-[1.8] text-background/74">
                I started from zero in October 2024 and kept the learning practical: understand the basics, rebuild
                interfaces, debug the gaps, then turn the lessons into complete projects.
              </p>

              <div className="grid gap-5 border-l border-background/20 pl-5">
                <div>
                  <p className="font-mono text-[11px] uppercase tracking-[0.24em] text-accent">Foundation</p>
                  <p className="mt-2 text-sm leading-relaxed text-background/72">
                    HTML, CSS, JavaScript, React, Git, backend fundamentals, and the discipline to keep practicing
                    until the pieces connected.
                  </p>
                </div>
                <div>
                  <p className="font-mono text-[11px] uppercase tracking-[0.24em] text-accent">Proof</p>
                  <p className="mt-2 text-sm leading-relaxed text-background/72">
                    LinkVault, ZephyrLint, Tickure, and Snapsack turned the practice into real full-stack product
                    work with auth, APIs, databases, dashboards, and responsive UI.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="hidden items-center gap-3 font-mono text-[11px] tracking-[0.22em] text-background/45 md:flex">
            TIMELINE
            <span className="h-px w-16 bg-background/25" />
            TWO PHASES
          </div>
        </article>

        <article
          data-experience-panel
          className="grid min-h-screen px-8 py-14 md:h-screen md:w-screen md:shrink-0 md:grid-rows-[auto_1fr_auto] lg:px-12"
        >
          <div className="flex items-baseline gap-6">
            <span className="font-mono text-xs tracking-[0.25em] text-accent">02 / 02</span>
            <span className="h-px flex-1 bg-background/20" />
            <span className="hidden font-mono text-xs text-background/45 md:inline">{role.span}</span>
          </div>

          <div className="grid gap-10 self-center md:grid-cols-12 md:items-center">
            <div className="md:col-span-5">
              <p className="font-mono text-[11px] uppercase tracking-[0.28em] text-accent">{role.span}</p>
              <h3 className="mt-3 font-display text-4xl font-medium leading-[1.02] tracking-tight md:text-6xl">
                {role.company}
              </h3>
              <p className="mt-4 font-display text-2xl italic text-background/72">{role.role}</p>
            </div>

            <div className="space-y-7 md:col-span-5 md:col-start-8">
              <p className="text-base leading-[1.8] text-background/74">
                On October 20, 2025, the self-taught work became a professional chapter: building production features,
                working with requirements, and contributing across the full-stack flow.
              </p>

              <ul className="grid gap-3 border-l border-background/20 pl-5">
                {role.bullets.map((bullet, bulletIndex) => (
                  <li key={bulletIndex} className="flex gap-3 text-sm leading-relaxed text-background/82">
                    <span className="mt-[7px] h-1 w-1 shrink-0 bg-accent" />
                    {bullet}
                  </li>
                ))}
              </ul>

              <div className="flex flex-wrap gap-2">
                {role.stack.map((tool, toolIndex) => (
                  <span
                    key={toolIndex}
                    className="rounded-full border border-background/20 px-3 py-1.5 font-mono text-[11px] text-background/66"
                  >
                    {tool}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* End of experience panel 2 */}
        </article>
      </div>
    </section>
  );
}
