"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import SplitType from "split-type";
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
        lines.forEach((line) => {
          const split = new SplitType(line, { types: "words" });
          gsap.set(line, { visibility: "visible" });
          gsap.from(split.words, {
            yPercent: 115,
            duration: 1.1,
            ease: "power4.out",
            stagger: 0.06,
            delay: 0.15,
          });
        });
        gsap.from("[data-hero-meta]", {
          opacity: 0,
          y: 16,
          duration: 0.8,
          stagger: 0.1,
          delay: 0.9,
          ease: "power2.out",
        });
        gsap.fromTo(
          "[data-scroll-line]",
          { strokeDashoffset: 80 },
          { strokeDashoffset: 0, duration: 1.2, delay: 1.3, ease: "power2.inOut" },
        );
      } else if (lines) {
        gsap.set(lines, { visibility: "visible" });
      }

    },
    { scope: rootRef, dependencies: [ready] },
  );

  return (
    <section
      id="intro"
      ref={rootRef}
      className="grain relative flex min-h-screen flex-col justify-between overflow-hidden bg-paper px-6 pb-10 pt-8 md:px-12"
    >
      <Ambient className="opacity-35" />

      {/* top bar */}
      <header className="relative z-10 flex items-baseline justify-between font-mono text-[11px] tracking-[0.2em] text-muted-foreground">
        <span>{profile.name.toUpperCase()}</span>
        <span className="hidden md:inline">FULL-STACK DEVELOPER</span>
        <span>{profile.location.toUpperCase()}</span>
      </header>

      {/* kinetic manifesto */}
      <div className="relative z-10 mx-auto mt-auto w-full max-w-[1360px]">
        <p data-hero-meta className="mb-6 font-mono text-xs tracking-[0.25em] text-accent">
          ① {profile.name.toUpperCase()} — OPEN TO FULL-STACK ROLES
        </p>
        <h1 className="font-display font-medium leading-[0.95] tracking-tight text-foreground">
          <span data-hero-line className="invisible block text-[13vw] md:text-[8vw]">
            I build web apps
          </span>
          <span data-hero-line className="invisible block text-[13vw] italic md:text-[8vw]">
            people actually
          </span>
          <span data-hero-line className="invisible block text-[13vw] md:text-[8vw]">
            use<span className="text-accent">.</span>
          </span>
        </h1>
        <div className="mt-10 flex flex-wrap items-end justify-between gap-8">
          <div className="max-w-md">
            <p data-hero-meta className="text-sm leading-relaxed text-muted-foreground">
              {profile.name}, full-stack developer. I own the whole build —
              database, API, and interface — and ship products that solve the
              problem they were made for.
            </p>
            <div data-hero-meta className="mt-6 flex flex-wrap items-center gap-3">
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
                className="glass-pill inline-flex items-center gap-2 rounded-full px-7 py-3.5 font-mono text-[11px] tracking-[0.25em] text-foreground hover:border-accent"
              >
                GET IN TOUCH
              </MagneticButton>
            </div>
          </div>
          <div data-hero-meta className="flex items-center gap-3 font-mono text-[11px] tracking-[0.2em] text-muted-foreground">
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
