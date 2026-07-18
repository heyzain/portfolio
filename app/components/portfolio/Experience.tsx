"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "@/lib/gsap";
import { experience } from "@/content/portfolio";

export function Experience() {
  const rootRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      mm.add("(min-width: 768px) and (prefers-reduced-motion: no-preference)", () => {
        const track = trackRef.current;
        if (!track) return;

        const distance = () => track.scrollWidth - window.innerWidth;

        gsap.to(track, {
          x: () => -distance(),
          ease: "none",
          scrollTrigger: {
            trigger: rootRef.current,
            pin: true,
            scrub: 1,
            anticipatePin: 1,
            invalidateOnRefresh: true,
            end: () => `+=${distance()}`,
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
        <section className="flex min-h-screen flex-col justify-between px-6 py-16 md:h-screen md:w-screen md:shrink-0 md:px-12 md:py-14">
          <div className="flex items-baseline gap-6">
            <span className="font-mono text-xs tracking-[0.25em] text-accent">04 EXPERIENCE</span>
            <span className="h-px flex-1 bg-background/20" />
            <span className="hidden font-mono text-xs text-background/45 md:inline">HORIZONTAL TIMELINE</span>
          </div>

          <div className="grid gap-8 md:grid-cols-12 md:items-end">
            <div className="md:col-span-7">
              <p className="font-mono text-[11px] uppercase tracking-[0.28em] text-accent">Professional path</p>
              <h2 className="mt-3 max-w-3xl font-display text-5xl font-medium leading-[0.98] md:text-[7vw]">
                Chapters to be written.
              </h2>
            </div>
            <p className="max-w-md text-sm leading-[1.75] text-background/65 md:col-span-5">
              Scroll to move through each experience one screen at a time. Add real roles here as they land.
            </p>
          </div>

          <div className="hidden items-center gap-3 font-mono text-[11px] tracking-[0.22em] text-background/45 md:flex">
            SCROLL
            <span className="h-px w-16 bg-background/25" />
            {experience.length} PANELS
          </div>
        </section>

        {experience.map((job, index) => (
          <article
            data-experience-panel
            key={`${job.company}-${index}`}
            className="flex min-h-screen flex-col px-6 py-16 md:h-screen md:w-screen md:shrink-0 md:px-12 md:py-14"
          >
            <div className="flex items-baseline gap-6">
              <span className="font-mono text-xs tracking-[0.25em] text-accent">
                {String(index + 1).padStart(2, "0")} / {String(experience.length).padStart(2, "0")}
              </span>
              <span className="h-px flex-1 bg-background/20" />
              <span className="hidden font-mono text-xs text-background/45 md:inline">{job.span}</span>
            </div>

            <div className="grid flex-1 gap-8 py-10 md:grid-cols-12 md:items-center md:py-0">
              <div className="md:col-span-5">
                <div className="font-mono text-[11px] tracking-[0.25em] text-accent">{job.span}</div>
                <h3 className="mt-4 font-display text-5xl font-medium leading-[0.98] md:text-[6.5vw]">
                  {job.company}
                </h3>
                <p className="mt-3 font-display text-2xl italic text-background/72">{job.role}</p>
              </div>

              <div className="rounded-[16px] border border-background/15 bg-background/[0.04] p-5 shadow-[0_22px_56px_-44px_var(--paper)] md:col-span-7 md:p-8">
                <div className="flex items-start justify-between gap-4">
                  <p className="max-w-xl text-base leading-[1.8] text-background/74">{job.blurb}</p>
                  <span className="shrink-0 rounded-full border border-background/20 px-3 py-1 font-mono text-[11px] text-background/55">
                    {job.year}
                  </span>
                </div>

                <ul className="mt-8 grid gap-3">
                  {job.bullets.map((bullet, bulletIndex) => (
                    <li key={bulletIndex} className="flex gap-3 text-sm leading-relaxed text-background/84">
                      <span className="mt-[7px] h-1 w-1 shrink-0 bg-accent" />
                      {bullet}
                    </li>
                  ))}
                </ul>

                <div className="mt-10 flex flex-wrap gap-2">
                  {job.stack.map((tool, toolIndex) => (
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
          </article>
        ))}
      </div>
    </section>
  );
}
