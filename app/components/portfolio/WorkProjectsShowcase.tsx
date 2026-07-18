"use client";

import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { ArrowUpRight, ChevronRight } from "lucide-react";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { workProjects } from "@/content/portfolio";

type ProjectFeature = {
  title: string;
  description: string;
};

type Project = {
  id: string;
  number: string;
  title: string;
  tagline: string;
  description: string;
  category: string;
  overview: string;
  role: string;
  year: string;
  technologies: string[];
  highlight: string;
  image: string;
  liveLink: string;
  githubLink: string;
  features: ProjectFeature[];
  results: {
    metric: string;
    label: string;
    description: string;
  };
};

type ProjectCardProps = {
  project: Project;
  isActive: boolean;
  onClick: () => void;
};

const projects: Project[] = workProjects.map((project, index) => ({
  id: project.title.toLowerCase().replace(/\s+/g, "-"),
  number: project.num,
  title: project.title,
  tagline: project.subtitle,
  description: project.desc,
  category: index === 1 ? "AI Tool" : index === 3 ? "Commerce" : "Product",
  overview: project.desc,
  role: project.rolenote,
  year: "2026",
  technologies: project.stack
    .replaceAll("Â", "")
    .split("·")
    .map((item) => item.trim())
    .filter(Boolean),
  highlight: project.subtitle,
  image: project.image,
  liveLink: project.liveLink,
  githubLink: project.githubLink,
  features: [],
  results: {
    metric: "01",
    label: "Solo Build",
    description: project.rolenote,
  },
}));

function ProjectCard({ project, isActive, onClick }: ProjectCardProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="group relative block cursor-pointer select-none text-left transition-all duration-300 focus:outline-none"
      aria-label={`View detailed case study for ${project.title}`}
      onKeyDown={(event) => {
        if (event.key === "Enter" || event.key === " ") {
          event.preventDefault();
          onClick();
        }
      }}
    >
      <div className="pointer-events-none absolute left-1/2 top-0 z-10 flex -translate-x-1/2 flex-col items-center">
        <div className="h-2 w-0.5 bg-ink/35" />
        <div className="flex h-6 w-[18px] items-center justify-center rounded-[3px] border border-black/10 bg-ink shadow-[0_8px_18px_-12px_var(--ink)]">
          <div className="h-1.5 w-1.5 rounded-full bg-paper/85" />
        </div>
      </div>

      <div
        className={`mt-8 flex w-64 flex-col gap-3 rounded-2xl border bg-white p-4 shadow-[0_10px_30px_rgba(0,0,0,0.04)] transition-all duration-500 sm:w-72 ${
          isActive
            ? "scale-105 border-ink ring-2 ring-ink/10"
            : "scale-95 border-border opacity-80 contrast-[0.95]"
        }`}
      >
        <div className="aspect-[4/3] w-full overflow-hidden rounded-xl border border-border bg-muted">
          <img
            src={project.image}
            alt={`${project.title} dashboard interface preview`}
            loading="eager"
            className="h-full w-full select-none object-cover transition-transform duration-500 group-hover:scale-105"
            draggable={false}
          />
        </div>

        <div className="flex flex-col gap-1.5 pt-1">
          <div className="flex items-center justify-between font-mono text-[11px] font-bold uppercase tracking-wider text-muted-foreground">
            <span>{project.number}</span>
            <span>{project.category}</span>
          </div>

          <div className="mt-1 flex items-center justify-between gap-2">
            <h3 className="font-display text-lg font-bold leading-tight tracking-tight text-ink">{project.title}</h3>
            <span className="rounded-full border border-border bg-muted p-1 text-ink transition-colors duration-300 group-hover:bg-ink group-hover:text-paper">
              <ArrowUpRight size={14} className="stroke-[2.5]" />
            </span>
          </div>

          <p className="line-clamp-2 text-xs leading-relaxed text-muted-foreground">{project.description}</p>
        </div>
      </div>
    </button>
  );
}

export function WorkProjectsShowcase() {
  const triggerRef = useRef<HTMLDivElement>(null);
  const cardContainerRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const scrollTriggerRef = useRef<ScrollTrigger | null>(null);
  const currentActiveIndex = useRef(0);
  const mobileScrollRef = useRef<HTMLDivElement>(null);

  const [activeIndex, setActiveIndex] = useState(0);
  const [svgPath, setSvgPath] = useState("");
  const [isMobile, setIsMobile] = useState(() => (typeof window !== "undefined" ? window.innerWidth < 768 : false));
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(() =>
    typeof window !== "undefined" ? window.matchMedia("(prefers-reduced-motion: reduce)").matches : false,
  );

  const getBezierPointAndAngle = (t: number, width: number, height: number) => {
    const x0 = -width * 0.18;
    const y0 = height * 0.12;
    const x1 = width * 0.5;
    const y1 = height * 0.45;
    const x2 = width * 1.18;
    const y2 = height * 0.12;
    const tClamped = Math.max(0, Math.min(1, t));
    const mt = 1 - tClamped;

    const x = mt * mt * x0 + 2 * mt * tClamped * x1 + tClamped * tClamped * x2;
    const y = mt * mt * y0 + 2 * mt * tClamped * y1 + tClamped * tClamped * y2;
    const dx = 2 * mt * (x1 - x0) + 2 * tClamped * (x2 - x1);
    const dy = 2 * mt * (y1 - y0) + 2 * tClamped * (y2 - y1);

    return { x, y, angle: (Math.atan2(dy, dx) * 180) / Math.PI };
  };

  const updateCardPositions = (progress: number) => {
    if (!cardContainerRef.current) return;

    const width = cardContainerRef.current.offsetWidth;
    const height = cardContainerRef.current.offsetHeight;
    const spacing = 0.28;
    const totalRange = 1 + (projects.length - 1) * spacing;

    projects.forEach((_, index) => {
      const cardEl = cardRefs.current[index];
      if (!cardEl) return;

      const t = progress * totalRange - index * spacing;
      if (t < -0.18 || t > 1.18) {
        gsap.set(cardEl, { display: "none", opacity: 0 });
        return;
      }

      const { x, y, angle } = getBezierPointAndAngle(t, width, height);
      const distToCenter = Math.abs(t - 0.5);
      const activeFactor = Math.max(0, 1 - distToCenter / 0.32);
      const scale = 0.72 + activeFactor * 0.33;
      const side = t < 0.5 ? -1 : 1;
      const additionalTilt = side * (1 - activeFactor) * 10;
      const finalAngle = angle * (1 - activeFactor * 0.85) + additionalTilt;

      gsap.set(cardEl, {
        display: "block",
        x,
        y,
        xPercent: -50,
        yPercent: 0,
        scale,
        rotate: finalAngle,
        opacity: 0.35 + activeFactor * 0.65,
        zIndex: Math.round(activeFactor * 100) + 10,
        transformOrigin: "top center",
      });
    });

    let minIdx = 0;
    let minVal = Infinity;
    projects.forEach((_, index) => {
      const t = progress * totalRange - index * spacing;
      const dist = Math.abs(t - 0.5);
      if (dist < minVal) {
        minVal = dist;
        minIdx = index;
      }
    });

    if (minIdx !== currentActiveIndex.current) {
      currentActiveIndex.current = minIdx;
      setActiveIndex(minIdx);
    }

  };

  useEffect(() => {
    const checkLayout = () => setIsMobile(window.innerWidth < 768);
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const handleReducedMotionChange = (event: MediaQueryListEvent) => setPrefersReducedMotion(event.matches);

    window.addEventListener("resize", checkLayout);
    mediaQuery.addEventListener("change", handleReducedMotionChange);
    checkLayout();

    return () => {
      window.removeEventListener("resize", checkLayout);
      mediaQuery.removeEventListener("change", handleReducedMotionChange);
    };
  }, []);

  useEffect(() => {
    if (isMobile || prefersReducedMotion) return;

    const handleResize = () => {
      if (!cardContainerRef.current) return;
      const width = cardContainerRef.current.offsetWidth;
      const height = cardContainerRef.current.offsetHeight;
      const x0 = -width * 0.18;
      const y0 = height * 0.12;
      const x1 = width * 0.5;
      const y1 = height * 0.45;
      const x2 = width * 1.18;
      const y2 = height * 0.12;

      setSvgPath(`M ${x0} ${y0} Q ${x1} ${y1} ${x2} ${y2}`);
      if (scrollTriggerRef.current) updateCardPositions(scrollTriggerRef.current.progress);
    };

    window.addEventListener("resize", handleResize);
    const timer = window.setTimeout(handleResize, 100);

    return () => {
      window.removeEventListener("resize", handleResize);
      window.clearTimeout(timer);
    };
  }, [isMobile, prefersReducedMotion]);

  useLayoutEffect(() => {
    if (isMobile || prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      scrollTriggerRef.current = ScrollTrigger.create({
        id: "playground-pin",
        trigger: triggerRef.current,
        start: "top top",
        end: "+=200%",
        pin: true,
        scrub: 0.5,
        anticipatePin: 1,
        onUpdate: (self) => updateCardPositions(self.progress),
      });
    }, triggerRef);

    return () => ctx.revert();
  }, [isMobile, prefersReducedMotion]);

  const openProject = (project: Project) => {
    window.open(project.liveLink, "_blank", "noreferrer");
  };

  const handleMobileScroll = (event: React.UIEvent<HTMLDivElement>) => {
    const container = event.currentTarget;
    const itemWidth = container.offsetWidth * 0.78 + 24;
    const index = Math.min(projects.length - 1, Math.max(0, Math.round(container.scrollLeft / itemWidth)));
    if (index !== activeIndex) setActiveIndex(index);
  };

  const scrollToActiveIndexPosition = (index: number) => {
    if (!scrollTriggerRef.current) return;
    const spacing = 0.28;
    const totalRange = 1 + (projects.length - 1) * spacing;
    const targetProgress = Math.max(0, Math.min(0.99, (0.5 + index * spacing) / totalRange));
    const start = scrollTriggerRef.current.start;
    const end = scrollTriggerRef.current.end;

    window.scrollTo({
      top: start + targetProgress * (end - start),
      behavior: "smooth",
    });
  };

  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (isMobile) return;
    if (event.key === "ArrowRight") scrollToActiveIndexPosition(Math.min(projects.length - 1, activeIndex + 1));
    if (event.key === "ArrowLeft") scrollToActiveIndexPosition(Math.max(0, activeIndex - 1));
  };

  if (prefersReducedMotion) {
    return (
      <section id="after-hours" className="mx-auto flex min-h-screen max-w-7xl flex-col justify-center bg-[#F6F3EC] px-6 py-24 md:px-12">
        <div className="mb-16 text-center">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-border px-3 py-1 font-mono text-xs font-bold uppercase tracking-widest text-muted-foreground">
            <span className="h-1.5 w-1.5 rounded-full bg-ink" />
            Playground
          </div>
          <h2 className="font-display text-4xl font-black uppercase tracking-tight text-ink sm:text-6xl">
            The <span className="text-ink">Playground</span>
          </h2>
          <p className="mx-auto mt-4 max-w-md text-sm font-medium leading-relaxed text-muted-foreground sm:text-base">
            A premium selection of platforms, designs, and visual interactive experiences.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
          {projects.map((project) => (
            <div
              key={project.id}
              className="relative flex flex-col items-center rounded-2xl border border-border bg-white p-4 shadow-sm transition-transform duration-300 hover:-translate-y-1"
            >
              <img src={project.image} alt={project.title} className="mb-4 aspect-[4/3] w-full rounded-xl border object-cover" />
              <span className="self-start font-mono text-xs font-bold uppercase tracking-wider text-muted-foreground">
                {project.category}
              </span>
              <h3 className="mt-1 self-start font-display text-xl font-bold text-ink">{project.title}</h3>
              <p className="mt-2 text-xs leading-relaxed text-muted-foreground">{project.description}</p>
              <button
                type="button"
                onClick={() => openProject(project)}
                className="mt-4 flex cursor-pointer items-center gap-1.5 text-xs font-bold text-ink hover:underline focus:outline-none focus:ring-2 focus:ring-ink"
              >
                View Detailed Work <ChevronRight size={14} />
              </button>
            </div>
          ))}
        </div>
      </section>
    );
  }

  if (isMobile) {
    return (
      <section id="after-hours" className="relative flex min-h-screen flex-col justify-between overflow-hidden bg-[#F6F3EC] px-6 pb-16 pt-24">
        <div className="mb-8 text-center">
          <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-border bg-white/60 px-3 py-1 font-mono text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
            <span className="h-1.5 w-1.5 rounded-full bg-ink" />
            Playground
          </div>
          <h2 className="font-display text-4xl font-black uppercase tracking-tight text-ink">
            The <span className="text-ink">Playground</span>
          </h2>
        </div>

        <div
          ref={mobileScrollRef}
          onScroll={handleMobileScroll}
          className="flex w-full snap-x snap-mandatory gap-6 overflow-x-auto px-4 py-8"
        >
          {projects.map((project) => (
            <div key={project.id} className="flex w-[78%] shrink-0 snap-center flex-col items-center">
              <div className="z-10 -mb-3 flex h-6 w-4 items-center justify-center rounded-sm border border-black/10 bg-ink shadow">
                <div className="h-1.5 w-1.5 rounded-full bg-white/80" />
              </div>

              <div className="flex w-full flex-col gap-3 rounded-2xl border border-border bg-white p-4 shadow-[0_8px_20px_rgba(0,0,0,0.03)]">
                <img src={project.image} alt={project.title} className="aspect-[4/3] w-full rounded-xl border border-border object-cover" />
                <div className="flex items-center justify-between pt-1 font-mono text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
                  <span>{project.number}</span>
                  <span>{project.category}</span>
                </div>
                <h3 className="font-display text-lg font-bold text-ink">{project.title}</h3>
                <p className="-mt-1 line-clamp-2 text-xs leading-relaxed text-muted-foreground">{project.description}</p>
                <button
                  type="button"
                  onClick={() => openProject(project)}
                  className="mt-2 flex w-full items-center justify-center gap-1.5 rounded-xl border border-ink bg-ink/5 py-2.5 text-xs font-bold text-ink transition-colors duration-300 hover:bg-ink hover:text-paper focus:outline-none"
                >
                  Explore Details <ChevronRight size={14} />
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-4 flex flex-col items-center gap-3">
          <div className="font-display text-xs font-bold tracking-widest text-muted-foreground">
            {projects[activeIndex]?.number} / {String(projects.length).padStart(2, "0")}
          </div>
          <div className="flex gap-2">
            {projects.map((project, index) => (
              <div
                key={project.id}
                className={`h-1.5 rounded-full transition-all duration-300 ${
                  index === activeIndex ? "w-6 bg-ink" : "w-1.5 bg-border"
                }`}
              />
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="after-hours" className="relative z-20 bg-[#F6F3EC]">
      <div
        ref={triggerRef}
        className="relative h-screen w-full overflow-hidden bg-[#F6F3EC]"
        onKeyDown={handleKeyDown}
        tabIndex={0}
        role="region"
        aria-label="Interactive projects showcase slider. Use scroll or arrow keys to navigate."
      >
        <div className="mx-auto flex h-full w-full max-w-7xl flex-col justify-start gap-8 px-6 py-12 md:px-12 md:py-16">
          <div className="z-10 pt-2 text-center md:pt-4">
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-border bg-white/50 px-3 py-1 font-mono text-[10px] font-bold uppercase tracking-widest text-muted-foreground shadow-[0_2px_10px_rgba(0,0,0,0.02)]">
              <span className="h-1.5 w-1.5 rounded-full bg-ink" />
              Playground
            </div>
            <h2 className="font-display text-5xl font-black uppercase leading-[0.95] tracking-tight text-ink md:text-7xl">
              The <span className="text-ink">Playground</span>
            </h2>
          </div>

          <div ref={cardContainerRef} className="relative mt-4 mb-2 w-full flex-grow overflow-visible">
            <svg className="pointer-events-none absolute inset-0 h-full w-full overflow-visible">
              {svgPath ? <path d={svgPath} fill="none" stroke="currentColor" strokeWidth="2" className="text-ink/35" /> : null}
            </svg>

            {projects.map((project, index) => (
              <div
                key={project.id}
                ref={(element) => {
                  cardRefs.current[index] = element;
                }}
                className="absolute left-0 top-0 hidden"
              >
                <ProjectCard project={project} isActive={index === activeIndex} onClick={() => openProject(project)} />
              </div>
            ))}
          </div>

          <div className="h-6" />
        </div>
      </div>
    </section>
  );
}
