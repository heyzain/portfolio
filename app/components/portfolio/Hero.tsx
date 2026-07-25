"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "@/lib/gsap";
import { profile } from "@/content/portfolio";
import { Ambient } from "@/components/portfolio/Ambient";
import { MagneticButton } from "@/components/ui/motion-footer";
import { scrollToSection } from "@/lib/smooth-scroll";
import { HangingIdCard } from "@/components/lightswind/hanging-id-card";

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
      className="grain relative flex min-h-screen flex-col overflow-hidden bg-paper px-6 pb-10 pt-8 md:px-12"
    >
      <Ambient className="opacity-35" />

      {/* top bar */}
      <header data-hero-reveal data-hero-chrome className="relative z-10 flex items-baseline justify-between font-mono text-[11px] tracking-[0.2em] text-muted-foreground">
        <span>{profile.name.toUpperCase()}</span>
        <span>{profile.location.toUpperCase()}</span>
      </header>

      {/* kinetic manifesto */}
      <div className="relative z-10 mx-auto mt-20 w-full max-w-[1360px] md:mt-24 xl:mt-28">
        <p data-hero-reveal data-hero-meta className="mb-5 font-mono text-xs tracking-[0.25em] text-accent">
          ① {profile.name.toUpperCase()} — OPEN TO FULL-STACK ROLES
        </p>
        <div className="relative">
          <h1 className="relative z-10 max-w-[66rem] font-display font-medium leading-[0.95] tracking-tight text-foreground xl:max-w-[74rem]">
            <span data-hero-reveal data-hero-line className="block text-[13vw] md:text-[7.45vw] 2xl:text-[7.2vw]">
              I build web apps
            </span>
            <span data-hero-reveal data-hero-line className="block text-[13vw] italic md:text-[7.45vw] 2xl:text-[7.2vw]">
              people actually
            </span>
            <span data-hero-reveal data-hero-line className="block text-[13vw] md:text-[7.45vw] 2xl:text-[7.2vw]">
              use<span className="text-accent">.</span>
            </span>
          </h1>
          <div
            data-hero-reveal
            data-hero-meta
            className="group absolute -right-2 top-[-5.8rem] z-20 hidden h-[31rem] w-[23.5rem] max-w-full text-left lg:block xl:right-10 xl:w-[25rem] 2xl:right-8"
          >
            <HangingIdCard
              className="pointer-events-auto"
              cardClassName="w-auto overflow-visible rounded-none border-0 bg-transparent shadow-none"
              ropeLength={118}
              ropeColor="#0b0b0b"
              accentColor="#0b0b0b"
              showHint={false}
              enableClickImpulse={false}
            >
              <span className="relative flex aspect-[0.68] w-[20.5rem] flex-col overflow-hidden rounded-[1.35rem] border border-white/10 bg-[#050505] px-7 py-8 text-white shadow-[0_34px_70px_rgba(0,0,0,0.34),0_10px_22px_rgba(0,0,0,0.18)] xl:w-[22rem]">
                <span className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_34%_16%,rgba(255,255,255,0.16),transparent_30%),linear-gradient(135deg,#242424_0%,#0d0d0d_38%,#020202_72%,#171717_100%)]" />
                <span className="pointer-events-none absolute inset-0 bg-[linear-gradient(115deg,transparent_0%,rgba(255,255,255,0.075)_34%,transparent_58%)] opacity-75" />
                <span className="pointer-events-none absolute inset-0 opacity-22 [background-image:linear-gradient(rgba(255,255,255,0.07)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.07)_1px,transparent_1px)] [background-size:48px_48px]" />
                <span className="pointer-events-none absolute left-1/2 top-8 h-28 w-28 -translate-x-1/2 rounded-full bg-white/10 blur-2xl" />
                <span className="absolute left-5 top-5 h-2 w-2 rounded-full border border-white/20 bg-white/5" />
                <span className="absolute right-5 top-5 h-2 w-2 rounded-full border border-white/20 bg-white/5" />
                <span className="absolute bottom-5 left-5 h-2 w-2 rounded-full border border-white/20 bg-white/5" />
                <span className="absolute bottom-5 right-5 h-2 w-2 rounded-full border border-white/20 bg-white/5" />
                <span className="relative z-20 flex h-full flex-col items-center justify-center gap-5 text-center">
                  <span className="flex h-20 w-20 items-center justify-center rounded-full border border-white/20 bg-white/88 font-display text-2xl text-foreground shadow-[0_18px_50px_rgba(255,255,255,0.12)] transition duration-500 group-hover:scale-105">
                    ZA
                  </span>
                  <span>
                    <span className="block whitespace-nowrap font-mono text-[1.02rem] font-semibold uppercase leading-tight tracking-[0.22em] text-white xl:text-[1.12rem]">
                      {profile.name}
                    </span>
                    <span className="mt-2 block font-mono text-[0.58rem] uppercase tracking-[0.26em] text-white/45">
                      ID #ZA-954
                    </span>
                  </span>
                  <span className="mt-8 grid w-full grid-cols-2 gap-6 font-mono text-[0.55rem] uppercase tracking-[0.18em] text-white/46">
                    <span className="text-left">
                      Department
                      <br />
                      <span className="text-white/72">Product Eng.</span>
                    </span>
                    <span className="text-right">
                      Position
                      <br />
                      <span className="text-white/72">{profile.role}</span>
                    </span>
                  </span>
                  <span className="mt-auto flex w-full items-center justify-between border-t border-white/10 pt-4 font-mono text-[0.58rem] uppercase tracking-[0.2em] text-white/62">
                    <span>Contact</span>
                    <span className="transition-transform duration-500 group-hover:translate-x-1">-&gt;</span>
                  </span>
                </span>
              </span>
            </HangingIdCard>
          </div>
        </div>
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
        </div>
      </div>
    </section>
  );
}
