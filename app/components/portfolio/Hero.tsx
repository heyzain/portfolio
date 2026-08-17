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
      className="grain relative flex min-h-0 flex-col justify-between overflow-hidden bg-paper px-8 pb-12 pt-8 lg:min-h-screen lg:pb-10 lg:px-12"
    >
      <Ambient className="opacity-35" />

      {/* top bar */}
      <header data-hero-reveal data-hero-chrome className="relative z-10 flex items-baseline justify-between font-mono text-[11px] tracking-[0.2em] text-muted-foreground">
        <span>{profile.name.toUpperCase()}</span>
        <span>{profile.location.toUpperCase()}</span>
      </header>

      {/* kinetic manifesto */}
      <div className="relative z-10 mx-auto mt-10 sm:mt-14 md:mt-20 xl:mt-24 w-full max-w-[1400px]">
        <p data-hero-reveal data-hero-meta className="mb-3 sm:mb-5 font-mono text-[10px] sm:text-xs tracking-[0.16em] sm:tracking-[0.25em] text-accent">
          ① {profile.name.toUpperCase()} — OPEN TO FULL-STACK ROLES
        </p>
        <div className="relative">
          <h1 className="relative z-10 max-w-[66rem] font-display font-medium leading-[0.98] sm:leading-[0.95] tracking-tight text-foreground xl:max-w-[74rem]">
            <span data-hero-reveal data-hero-line className="block text-[10vw] sm:text-[11.5vw] md:text-[7.45vw] 2xl:text-[7.2vw]">
              I build web apps
            </span>
            <span data-hero-reveal data-hero-line className="block text-[10vw] sm:text-[11.5vw] italic md:text-[7.45vw] 2xl:text-[7.2vw]">
              people actually
            </span>
            <span data-hero-reveal data-hero-line className="block text-[10vw] sm:text-[11.5vw] md:text-[7.45vw] 2xl:text-[7.2vw]">
              use<span className="text-accent">.</span>
            </span>
          </h1>
          <div
            data-hero-reveal
            data-hero-meta
            className="group absolute -right-2 top-[-3.5rem] z-20 hidden h-[32rem] w-[23.5rem] max-w-full text-left lg:block xl:right-8 xl:w-[24.5rem] 2xl:right-6"
          >
            <HangingIdCard
              className="pointer-events-auto"
              cardClassName="w-auto overflow-visible rounded-none border-0 bg-transparent shadow-none"
              ropeLength={82}
              ropeColor="#0b0b0b"
              accentColor="#0b0b0b"
              showHint={false}
              enableClickImpulse={false}
            >
              <span className="relative flex w-[21rem] flex-col overflow-hidden rounded-[1.35rem] border border-white/12 bg-[#050505] p-5 text-white shadow-[0_34px_70px_rgba(0,0,0,0.38),0_10px_22px_rgba(0,0,0,0.22)] xl:w-[22rem]">
                {/* Background lighting & textures */}
                <span className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_34%_12%,rgba(255,255,255,0.14),transparent_40%),linear-gradient(135deg,#1f1f1f_0%,#0a0a0a_40%,#020202_75%,#121212_100%)]" />
                <span className="pointer-events-none absolute inset-0 bg-[linear-gradient(115deg,transparent_0%,rgba(255,255,255,0.06)_34%,transparent_58%)] opacity-75" />
                <span className="pointer-events-none absolute inset-0 opacity-15 [background-image:linear-gradient(rgba(255,255,255,0.07)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.07)_1px,transparent_1px)] [background-size:36px_36px]" />
                <span className="pointer-events-none absolute left-1/2 top-6 h-32 w-32 -translate-x-1/2 rounded-full bg-white/10 blur-2xl" />

                {/* Corner rivets */}
                <span className="absolute left-4 top-4 h-2 w-2 rounded-full border border-white/20 bg-white/10" />
                <span className="absolute right-4 top-4 h-2 w-2 rounded-full border border-white/20 bg-white/10" />
                <span className="absolute bottom-4 left-4 h-2 w-2 rounded-full border border-white/20 bg-white/10" />
                <span className="absolute bottom-4 right-4 h-2 w-2 rounded-full border border-white/20 bg-white/10" />

                <span className="relative z-20 flex flex-col items-center gap-3.5 text-center">
                  {/* Avatar & Main Identity */}
                  <div className="flex flex-col items-center gap-2 pt-1">
                    <div className="relative flex h-16 w-16 items-center justify-center rounded-full border border-white/25 bg-gradient-to-b from-white/20 via-white/10 to-white/5 font-display text-xl text-white shadow-[0_12px_35px_rgba(0,0,0,0.6)] transition duration-500 group-hover:scale-105 group-hover:border-white/40">
                      <span className="absolute -inset-1 rounded-full bg-white/10 blur-sm opacity-60" />
                      <span className="relative z-10 font-medium tracking-tight">ZA</span>

                      {/* Green Status Ticker Badge on Profile Circle */}
                      <span className="absolute bottom-0 right-0 z-20 flex h-4 w-4 items-center justify-center rounded-full bg-[#050505] p-[2px]">
                        <span className="h-full w-full rounded-full bg-emerald-400 animate-pulse shadow-[0_0_8px_rgba(52,211,153,0.8)]" />
                      </span>
                    </div>
                    <div>
                      <span className="block font-mono text-[1.08rem] font-bold uppercase tracking-[0.22em] text-white">
                        {profile.name}
                      </span>
                      <span className="mt-0.5 block font-mono text-[0.62rem] font-semibold uppercase tracking-[0.22em] text-white/75">
                        {profile.role}
                      </span>
                      <span className="mt-1.5 inline-block rounded border border-white/10 bg-white/5 px-2 py-0.5 font-mono text-[0.54rem] tracking-[0.22em] text-white/45">
                        ID #ZA-954 // VERIFIED
                      </span>
                    </div>
                  </div>

                  {/* Tech Stack Pills */}
                  <div className="w-full border-t border-white/10 pt-3">
                    <span className="mb-2 block text-center font-mono text-[0.5rem] uppercase tracking-[0.25em] text-white/40">
                      PRIMARY TOOLSET
                    </span>
                    <div className="flex flex-wrap items-center justify-center gap-1.5">
                      {["React", "Next.js", "TypeScript", "Node.js", "MongoDB", "Tailwind"].map((tech) => (
                        <span
                          key={tech}
                          className="rounded-md border border-white/12 bg-white/5 px-2 py-0.5 font-mono text-[0.56rem] tracking-wider text-white/80 transition-colors group-hover:border-white/25 group-hover:bg-white/10"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Detailed Specs Grid */}
                  <div className="grid w-full grid-cols-2 gap-2 text-left font-mono text-[0.54rem] uppercase tracking-[0.16em]">
                    <div className="rounded-lg border border-white/8 bg-white/[0.03] p-2">
                      <span className="block text-[0.48rem] text-white/40">DEPARTMENT</span>
                      <span className="font-semibold text-white/85">PRODUCT ENG.</span>
                    </div>
                    <div className="rounded-lg border border-white/8 bg-white/[0.03] p-2">
                      <span className="block text-[0.48rem] text-white/40">EXPERIENCE</span>
                      <span className="font-semibold text-white/85">2+ YEARS</span>
                    </div>
                    <div className="rounded-lg border border-white/8 bg-white/[0.03] p-2">
                      <span className="block text-[0.48rem] text-white/40">DEGREE</span>
                      <span className="font-semibold text-white/85">BSCS</span>
                    </div>
                    <div className="rounded-lg border border-white/8 bg-white/[0.03] p-2">
                      <span className="block text-[0.48rem] text-white/40">LOCATION</span>
                      <span className="font-semibold text-white/85">{profile.location}</span>
                    </div>
                  </div>

                  {/* Security Barcode */}
                  <div className="flex w-full flex-col items-center gap-1 pt-0.5">
                    <div className="flex h-4 items-center gap-[2px] opacity-40 transition-opacity group-hover:opacity-70">
                      {[4, 2, 6, 1, 3, 5, 2, 4, 1, 6, 2, 5, 3, 1, 4, 2, 6, 3, 1, 5, 2, 4, 1, 3, 6, 2, 4].map((h, i) => (
                        <span
                          key={i}
                          className="rounded-[0.5px] bg-white"
                          style={{
                            width: i % 4 === 0 ? "2px" : "1px",
                            height: `${h * 2 + 5}px`,
                          }}
                        />
                      ))}
                    </div>
                    <span className="font-mono text-[0.46rem] tracking-[0.28em] text-white/30">
                      954-2024-FULLSTACK-ACCESS
                    </span>
                  </div>

                  {/* Interactive Footer Button */}
                  <button
                    type="button"
                    onClick={() => scrollToSection("contact")}
                    className="flex w-full items-center justify-between border-t border-white/10 pt-2.5 font-mono text-[0.58rem] uppercase tracking-[0.2em] text-white/65 transition-colors hover:text-white"
                  >
                    <span className="flex items-center gap-1.5">
                      <span className="h-1.5 w-1.5 rounded-full bg-accent" />
                      GET IN TOUCH
                    </span>
                    <span className="flex items-center gap-1 transition-transform duration-300 group-hover:translate-x-1">
                      <span>CONNECT</span>
                      <span>-&gt;</span>
                    </span>
                  </button>
                </span>
              </span>
            </HangingIdCard>
          </div>
        </div>
        <div className="mt-6 sm:mt-8 md:mt-10 flex flex-wrap items-end justify-between gap-8">
          <div className="max-w-md">
            <p data-hero-reveal data-hero-meta className="text-xs sm:text-sm leading-relaxed text-muted-foreground">
              {profile.name}, full-stack developer. I own the whole build —
              database, API, and interface — and ship products that solve the
              problem they were made for.
            </p>
            <div data-hero-reveal data-hero-meta className="mt-4 sm:mt-6 flex flex-wrap items-center gap-2.5 sm:gap-3">
              <MagneticButton
                as="button"
                onClick={() => scrollToSection("work")}
                className="inline-flex items-center gap-2 rounded-full bg-foreground px-5 py-3 sm:px-7 sm:py-3.5 font-mono text-[10px] sm:text-[11px] tracking-[0.18em] sm:tracking-[0.25em] text-background shadow-[0_14px_30px_-14px_var(--ink)] transition-colors hover:bg-accent hover:text-accent-foreground"
              >
                SEE MY WORK <span aria-hidden>↓</span>
              </MagneticButton>
              <MagneticButton
                as="button"
                onClick={() => scrollToSection("contact")}
                className="apple-glass inline-flex items-center gap-2 rounded-full px-5 py-3 sm:px-7 sm:py-3.5 font-mono text-[10px] sm:text-[11px] tracking-[0.18em] sm:tracking-[0.25em] text-foreground transition-colors hover:bg-foreground hover:text-background"
              >
                <span className="relative z-10">GET IN TOUCH</span>
              </MagneticButton>
            </div>
          </div>
        </div>

        {/* Mobile Spec Strip (Mobile Only - Fills bottom empty space) */}
        <div data-hero-reveal data-hero-meta className="mt-6 border-t border-ink/10 pt-4 lg:hidden">
          <div className="flex flex-wrap items-center gap-2 font-mono text-[10px] uppercase tracking-[0.16em] text-muted-foreground">
            <span className="flex items-center gap-1.5 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-2.5 py-1 text-emerald-600 font-semibold">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
              AVAILABLE FOR HIRE
            </span>
            <span className="rounded-full border border-ink/10 bg-white/60 px-2.5 py-1 font-semibold text-ink">
              2+ YRS EXP
            </span>
            <span className="rounded-full border border-ink/10 bg-white/60 px-2.5 py-1 font-semibold text-ink">
              BSCS DEGREE
            </span>
            <span className="rounded-full border border-ink/10 bg-white/60 px-2.5 py-1 font-semibold text-ink">
              PRODUCT ENG.
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
