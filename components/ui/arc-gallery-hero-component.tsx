"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

type SkillItem = {
  name: string;
  image: string;
  color?: string;
  description?: string;
  chips?: string[];
};

type ArcGalleryHeroProps = {
  images?: string[];
  skills?: SkillItem[];
  startAngle?: number;
  endAngle?: number;
  radiusLg?: number;
  radiusMd?: number;
  radiusSm?: number;
  cardSizeLg?: number;
  cardSizeMd?: number;
  cardSizeSm?: number;
  className?: string;
  title?: string;
  subtitle?: string;
};

export function ArcGalleryHero({
  images,
  skills,
  startAngle = 27,
  endAngle = 153,
  radiusLg = 500,
  radiusMd = 330,
  radiusSm = 190,
  cardSizeLg = 108,
  cardSizeMd = 92,
  cardSizeSm = 64,
  className = "",
  title = "Product-grade stack, shaped around shipped work.",
  subtitle = "A focused full-stack toolkit for building fast interfaces, secure APIs, useful dashboards, and production-ready apps like LinkVault, ZephyrLint, Tickure, and Snapsack.",
}: ArcGalleryHeroProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const [isInView, setIsInView] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const [dimensions, setDimensions] = useState({ radius: radiusLg, cardSize: cardSizeLg });

  const items: SkillItem[] = useMemo(
    () => skills ?? (images ?? []).map((image, index) => ({ name: `Skill ${index + 1}`, image })),
    [images, skills],
  );
  const active = items[activeIndex] ?? items[0];
  const count = Math.max(items.length, 2);
  const step = (endAngle - startAngle) / (count - 1);
  const contentVariants = {
    initial: { opacity: 0, y: 10 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -8 },
  };
  const chipsVariants = {
    initial: { opacity: 0 },
    animate: {
      opacity: 1,
      transition: { staggerChildren: 0.045, delayChildren: 0.08 },
    },
    exit: {
      opacity: 0,
      transition: { staggerChildren: 0.025, staggerDirection: -1 },
    },
  };
  const chipVariants = {
    initial: { opacity: 0, y: 8 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -4 },
  };

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      if (width < 640) {
        setDimensions({ radius: radiusSm, cardSize: cardSizeSm });
      } else if (width < 1024) {
        setDimensions({ radius: radiusMd, cardSize: cardSizeMd });
      } else {
        setDimensions({ radius: radiusLg, cardSize: cardSizeLg });
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [cardSizeLg, cardSizeMd, cardSizeSm, radiusLg, radiusMd, radiusSm]);

  useEffect(() => {
    const current = sectionRef.current;
    if (!current) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          observer.unobserve(current);
        }
      },
      { threshold: 0.28 },
    );

    observer.observe(current);
    return () => observer.unobserve(current);
  }, []);

  return (
    <section
      ref={sectionRef}
      className={`relative min-h-screen overflow-hidden bg-paper px-8 pb-14 pt-10 text-ink grain lg:px-12 lg:pt-12 ${className}`}
    >
      <div className="ambient-grid pointer-events-none absolute inset-0 opacity-60" />
      <div className="relative z-10 mx-auto flex min-h-[calc(100vh-6rem)] max-w-[1400px] flex-col justify-between">
        <div className="flex items-baseline gap-6 w-full text-left">
          <span className="font-mono text-xs tracking-[0.25em] text-accent">03 THE STACK</span>
          <span className="h-px flex-1 bg-ink/20" />
          <span className="hidden font-mono text-xs text-muted-foreground md:inline">FULL-STACK CAPABILITIES</span>
        </div>
        <div className="my-auto relative w-full pt-4">
          <div className="relative mx-auto w-full" style={{ height: dimensions.radius * 0.72 }}>
          <div className="absolute left-1/2 bottom-0 -translate-x-1/2">
            {items.map((item, index) => {
              const angle = startAngle + step * index;
              const angleRad = (angle * Math.PI) / 180;
              const x = Math.cos(angleRad) * dimensions.radius * 1.18;
              const y = Math.sin(angleRad) * dimensions.radius * 0.68;

              return (
                <button
                  key={item.name}
                  type="button"
                  aria-label={item.name}
                  onMouseEnter={() => setActiveIndex(index)}
                  onFocus={() => setActiveIndex(index)}
                  className={`absolute flex items-center justify-center opacity-0 outline-none transition-transform duration-300 ease-out hover:-translate-y-2 focus-visible:-translate-y-2 ${
                    isInView ? "arc-card-in" : ""
                  }`}
                  style={{
                    width: `${dimensions.cardSize}px`,
                    height: `${dimensions.cardSize}px`,
                    left: `calc(50% + ${x.toFixed(3)}px)`,
                    bottom: `${y.toFixed(3)}px`,
                    transform: "translate(-50%, 50%)",
                    animationDelay: `${index * 75}ms`,
                    zIndex: count - index,
                  }}
                >
                  <span
                    className="flex h-full w-full items-center justify-center rounded-[18px] border border-ink/18 bg-white/88 p-4 shadow-[0_18px_34px_-24px_var(--ink)] transition duration-300 hover:border-ink/28 hover:bg-white hover:shadow-[0_24px_42px_-26px_var(--ink)] focus-visible:border-vermillion/50"
                    style={{ transform: `rotate(${(angle / 5 - 18).toFixed(2)}deg)` }}
                  >
                    <img
                      src={item.image}
                      alt=""
                      className="h-[54%] w-[54%] object-contain drop-shadow-sm transition duration-300 hover:scale-110"
                      draggable={false}
                    />
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        <div className="relative z-10 mx-auto -mt-20 max-w-4xl text-center sm:-mt-24 md:-mt-32 lg:-mt-36">
          <p className="font-mono text-[11px] uppercase tracking-[0.3em] text-vermillion">full-stack capabilities</p>
          <h2
            className={`mt-3 font-display text-4xl font-medium leading-[1.02] tracking-tight text-ink md:text-6xl ${
              isInView ? "copy-in" : "opacity-0"
            }`}
          >
            {title}
          </h2>
          <div className={`mx-auto mt-5 min-h-[132px] max-w-3xl ${isInView ? "copy-in" : "opacity-0"}`}>
            <AnimatePresence mode="wait">
              <motion.div
                key={active?.name}
                variants={contentVariants}
                initial="initial"
                animate="animate"
                exit="exit"
                transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              >
                <p className="font-mono text-[11px] uppercase tracking-[0.24em] text-vermillion">{active?.name}</p>
                <p className="mx-auto mt-3 max-w-2xl text-base leading-[1.65] text-ink/72 md:text-lg">
                  {active?.description ?? subtitle}
                </p>
                {active?.chips?.length ? (
                  <motion.div
                    variants={chipsVariants}
                    initial="initial"
                    animate="animate"
                    exit="exit"
                    className="mx-auto mt-5 flex max-w-3xl flex-wrap justify-center gap-2"
                  >
                    {active.chips.map((chip) => (
                      <motion.span
                        key={chip}
                        variants={chipVariants}
                        transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                        className="rounded-full border border-ink/10 bg-paper/70 px-3 py-1 font-mono text-[10px] uppercase tracking-[0.14em] text-ink/58"
                      >
                        {chip}
                      </motion.span>
                    ))}
                  </motion.div>
                ) : null}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>

      <style>{`
        @keyframes arc-card-in {
          from {
            opacity: 0;
            transform: translate(-50%, 74%) rotate(8deg);
          }
          to {
            opacity: 1;
            transform: translate(-50%, 50%) rotate(0deg);
          }
        }

        @keyframes copy-in {
          from {
            opacity: 0;
            transform: translateY(18px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .arc-card-in {
          animation: arc-card-in 720ms cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }

        .copy-in {
          animation: copy-in 760ms cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }

        @media (prefers-reduced-motion: reduce) {
          .arc-card-in,
          .copy-in {
            animation: none;
            opacity: 1;
          }
        }
      `}</style>
    </section>
  );
}
