"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "@/lib/gsap";
import { profile } from "@/content/portfolio";
import { Ambient } from "@/components/portfolio/Ambient";
import { MagneticButton } from "@/components/ui/motion-footer";
import { scrollToSection } from "@/lib/smooth-scroll";

export function Hero({ ready }: { ready: boolean }) {
  const rootRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (!ready) return;
      const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

      const lines = rootRef.current?.querySelectorAll<HTMLElement>("[data-hero-line]");
      if (lines && !reduced) {
        gsap.set(lines, { visibility: "visible" });
        const timeline = gsap.timeline();
        timeline
          .from("[data-hero-chrome]", {
            opacity: 0,
            y: 10,
            duration: 0.42,
            ease: "power2.out",
          })
          .from(
            lines,
            {
              opacity: 0,
              y: 24,
              duration: 0.58,
              ease: "power3.out",
              stagger: 0.07,
            },
            0.08,
          )
          .from(
            "[data-hero-meta]",
            {
              opacity: 0,
              y: 16,
              duration: 0.48,
              stagger: 0.08,
              ease: "power2.out",
            },
            0.28,
          )
          .fromTo(
          "[data-scroll-line]",
          { strokeDashoffset: 80 },
          { strokeDashoffset: 0, duration: 0.7, ease: "power2.inOut" },
          0.46,
        );
      } else if (lines) {
        gsap.set([lines, "[data-hero-chrome]", "[data-hero-meta]"], {
          visibility: "visible",
          opacity: 1,
          y: 0,
        });
      }

    },
    { scope: rootRef, dependencies: [ready] },
  );

  return (
    <section
      id="intro"
      ref={rootRef}
      data-hero-ready={ready}
      className="grain relative flex min-h-screen flex-col justify-between overflow-hidden bg-paper px-6 pb-10 pt-8 md:px-12"
    >
      <Ambient className="opacity-35" />

      {/* top bar */}
      <header data-hero-reveal data-hero-chrome className="relative z-10 flex items-baseline justify-between font-mono text-[11px] tracking-[0.2em] text-muted-foreground">
        <span>{profile.name.toUpperCase()}</span>
        <span>{profile.location.toUpperCase()}</span>
      </header>

      {/* kinetic manifesto */}
      <div className="relative z-10 mx-auto mt-auto w-full max-w-[1360px]">
        <p data-hero-reveal data-hero-meta className="mb-6 font-mono text-xs tracking-[0.25em] text-accent">
          ① {profile.name.toUpperCase()} — OPEN TO FULL-STACK ROLES
        </p>
        <h1 className="font-display font-medium leading-[0.95] tracking-tight text-foreground">
          <span data-hero-reveal data-hero-line className="invisible block text-[13vw] md:text-[8vw]">
            I build web apps
          </span>
          <span data-hero-reveal data-hero-line className="invisible block text-[13vw] italic md:text-[8vw]">
            people actually
          </span>
          <span data-hero-reveal data-hero-line className="invisible block text-[13vw] md:text-[8vw]">
            use<span className="text-accent">.</span>
          </span>
        </h1>
        <div className="mt-10 flex flex-wrap items-end justify-between gap-8">
          <div className="max-w-md">
            <p data-hero-reveal data-hero-meta className="text-sm leading-relaxed text-muted-foreground">
              {profile.name}, full-stack developer. I own the whole build —
              database, API, and interface — and ship products that solve the
              problem they were made for.
            </p>
            <div data-hero-reveal data-hero-meta className="mt-6 flex flex-wrap items-center gap-3">
              <MagneticButton
                as="button"
                onClick={() => scrollToSection("work")}
                className="inline-flex items-center gap-2 rounded-full bg-foreground px-7 py-3.5 font-mono text-[11px] tracking-[0.25em] text-background shadow-[0_14px_30px_-14px_var(--ink)] transition-colors hover:bg-accent hover:text-accent-foreground"
              >
                SEE MY WORK <span aria-hidden>↓</span>
              </MagneticButton>
              <MagneticButton
                as="button"
                onClick={() => scrollToSection("contact")}
                className="apple-glass inline-flex items-center gap-2 rounded-full px-7 py-3.5 font-mono text-[11px] tracking-[0.25em] text-foreground hover:text-accent-foreground"
              >
                <span className="relative z-10">GET IN TOUCH</span>
              </MagneticButton>
            </div>
          </div>
          <div data-hero-reveal data-hero-meta className="flex items-center gap-3 font-mono text-[11px] tracking-[0.2em] text-muted-foreground">
            SCROLL
            <svg width="14" height="84" viewBox="0 0 14 84" fill="none" aria-hidden>
              <path
                data-scroll-line
                d="M7 0 V72 M1 66 L7 74 L13 66"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeDasharray="80"
              />
            </svg>
          </div>
        </div>
      </div>
    </section>
  );
}
