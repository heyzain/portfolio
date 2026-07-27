"use client";

import { useEffect, useRef, useState } from "react";
import { ArrowUpRight, ChevronLeft, ChevronRight, Github, Layers, X } from "lucide-react";
import { workProjects } from "@/content/portfolio";

type FeaturedProject = {
  id: string;
  number: string;
  title: string;
  category: string;
  year?: string;
  role?: string;
  purpose: string;
  highlight?: string;
  stack: string[];
  image: string;
  liveUrl?: string;
  githubUrl?: string;
  liveLabel?: string;
};

const projects: FeaturedProject[] = workProjects.map((project, index) => ({
  id: project.title.toLowerCase().replace(/\s+/g, "-"),
  number: project.num,
  title: project.title,
  category: (project as { category?: string }).category || "Product",
  year: "2026",
  role: project.rolenote,
  purpose: project.desc,
  highlight: project.subtitle,
  stack: project.stack
    .replaceAll("ÃƒÆ’Ã¢â‚¬Å¡", "")
    .replaceAll("Ãƒâ€š", "")
    .replaceAll("Ã‚", "")
    .split("Â·")
    .map((item) => item.trim())
    .filter(Boolean),
  image: project.image,
  liveUrl: project.liveLink,
  githubUrl: project.githubLink,
  liveLabel: "View Project",
}));

function useMediaQuery(query: string) {
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia(query);
    const updateMatch = () => setMatches(mediaQuery.matches);

    updateMatch();
    mediaQuery.addEventListener("change", updateMatch);
    return () => mediaQuery.removeEventListener("change", updateMatch);
  }, [query]);

  return matches;
}

function Sparkle({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden="true">
      <path d="M12 0l1.8 8.2L22 12l-8.2 1.8L12 24l-1.8-10.2L2 12l8.2-3.8z" />
    </svg>
  );
}

function CurlyArrow({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 120 120"
      className={className}
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeWidth="1.6"
      aria-hidden="true"
    >
      <path d="M108 16 C 72 22, 42 42, 26 78" />
      <path d="M20 66 L 26 82 L 42 78" />
    </svg>
  );
}

function WorkDetailModal({ project, onClose }: { project: FeaturedProject | null; onClose: () => void }) {
  const modalScrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!project) return;

    const html = document.documentElement;
    const body = document.body;
    const previousHtmlOverflow = html.style.overflow;
    const previousBodyOverflow = body.style.overflow;
    const lenis = (window as unknown as { __lenis?: { stop?: () => void; start?: () => void } }).__lenis;
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };

    html.style.overflow = "hidden";
    body.style.overflow = "hidden";
    lenis?.stop?.();
    window.addEventListener("keydown", handleKeyDown);
    modalScrollRef.current?.scrollTo({ top: 0 });

    return () => {
      html.style.overflow = previousHtmlOverflow;
      body.style.overflow = previousBodyOverflow;
      lenis?.start?.();
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [project, onClose]);

  if (!project) return null;

  const notes = [
    {
      title: "Product Goal",
      copy: project.purpose,
    },
    {
      title: "Execution",
      copy: `Built as a ${project.role?.toLowerCase() || "solo product build"} with a focus on clean user flows, reliable data handling, and a polished interface.`,
    },
    {
      title: "Result",
      copy: project.highlight || "A production-ready project that demonstrates end-to-end full-stack product thinking.",
    },
  ];

  return (
    <div
      className="fixed inset-0 z-[100] overflow-hidden bg-ink/45 px-3 pb-0 pt-3 text-ink backdrop-blur-md animate-case-study-backdrop-in sm:px-6 sm:pb-0 sm:pt-6"
      role="dialog"
      aria-modal="true"
      onWheel={(event) => event.stopPropagation()}
      onTouchMove={(event) => event.stopPropagation()}
    >
      <div
        ref={modalScrollRef}
        className="case-study-scrollbar h-[calc(100dvh-0.75rem)] overflow-y-auto overscroll-contain rounded-t-[28px] rounded-b-none border border-b-0 border-white/35 bg-[#F6F3EC] shadow-[0_35px_90px_rgba(0,0,0,0.28)] sm:h-[calc(100dvh-1.5rem)] [clip-path:inset(0_round_28px_28px_0_0)] animate-case-study-panel-in"
      >
        <div className="sticky top-0 z-20 flex items-center justify-between gap-4 rounded-t-[28px] border-b border-ink/10 bg-[#F6F3EC]/88 px-5 py-4 backdrop-blur-xl sm:px-8">
          <div>
            <p className="font-mono text-[10px] font-bold uppercase tracking-[0.22em] text-muted-foreground">
              {project.number} / Full Detail
            </p>
            <h3 className="font-display text-2xl font-black tracking-tight sm:text-4xl">{project.title}</h3>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-ink/15 bg-white/70 text-ink shadow-sm transition hover:border-ink/40 hover:bg-ink hover:text-paper focus:outline-none focus:ring-2 focus:ring-ink"
            aria-label="Close project detail"
          >
            <X size={18} />
          </button>
        </div>

        <article className="mx-auto max-w-7xl px-5 py-8 sm:px-8 lg:py-12">
          <section className="grid gap-8 lg:grid-cols-[1.08fr_0.92fr] lg:items-center">
            <div className="group/modal-image relative overflow-hidden rounded-[26px] border border-ink/15 bg-white p-3 shadow-[0_24px_70px_rgba(26,24,20,0.12)] transition duration-500 hover:-translate-y-1 hover:border-vermillion/45 hover:shadow-[0_32px_85px_rgba(26,24,20,0.17)]">
              <div className="relative overflow-hidden rounded-[18px]">
                <img src={project.image} alt={`${project.title} interface preview`} className="aspect-[16/10] w-full object-cover transition duration-700 group-hover/modal-image:scale-[1.035] group-hover/modal-image:saturate-[1.08]" />
                <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(115deg,transparent_0%,rgba(255,255,255,0.38)_44%,transparent_58%)] opacity-0 transition duration-700 group-hover/modal-image:translate-x-full group-hover/modal-image:opacity-100" />
              </div>
            </div>

            <div className="space-y-7">
              <div className="inline-flex items-center gap-2 rounded-full border border-ink/10 bg-white/65 px-4 py-2 font-mono text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground">
                <Layers size={14} />
                {project.category}
              </div>
              <div>
                <p className="font-mono text-[10px] font-bold uppercase tracking-[0.24em] text-muted-foreground">Project Overview</p>
                <h4 className="mt-3 font-display text-3xl font-black leading-tight tracking-tight sm:text-5xl">{project.highlight}</h4>
                <p className="mt-5 text-lg font-medium leading-relaxed text-ink/78">{project.purpose}</p>
              </div>
              <div className="flex flex-wrap gap-2">
                {project.stack.map((stackItem) => (
                  <span key={stackItem} className="rounded-full border border-ink/10 bg-white/70 px-3 py-1 font-mono text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
                    {stackItem}
                  </span>
                ))}
              </div>
            </div>
          </section>

          <section className="mt-14 grid gap-4 md:grid-cols-3">
            {notes.map((note) => (
              <div key={note.title} className="rounded-[22px] border border-ink/10 bg-white/62 p-5 shadow-sm">
                <p className="font-mono text-[10px] font-bold uppercase tracking-[0.22em] text-muted-foreground">{note.title}</p>
                <p className="mt-3 text-sm leading-relaxed text-ink/76">{note.copy}</p>
              </div>
            ))}
          </section>

          <section className="mt-16 grid gap-8 lg:grid-cols-2 lg:items-center">
            <div className="max-w-xl">
              <p className="font-mono text-[10px] font-bold uppercase tracking-[0.24em] text-vermillion">Process</p>
              <h4 className="mt-3 font-display text-3xl font-black leading-tight tracking-tight sm:text-5xl">
                From product idea to working interface.
              </h4>
              <p className="mt-5 text-base leading-relaxed text-ink/74 sm:text-lg">
                The build focuses on the practical pieces a real product needs: clear navigation, useful states, responsive layout,
                secure data flow, and enough polish that the project feels like something people could actually use.
              </p>
            </div>
            <div className="group/modal-image overflow-hidden rounded-[26px] border border-ink/12 bg-white p-3 shadow-[0_20px_60px_rgba(26,24,20,0.1)] transition duration-500 hover:-translate-y-1 hover:border-vermillion/40 hover:shadow-[0_30px_76px_rgba(26,24,20,0.15)]">
              <div className="relative overflow-hidden rounded-[18px]">
                <img src={project.image} alt={`${project.title} detailed screen`} className="aspect-[16/10] w-full object-cover transition duration-700 group-hover/modal-image:scale-[1.04] group-hover/modal-image:saturate-[1.08]" />
                <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(115deg,transparent_0%,rgba(255,255,255,0.38)_44%,transparent_58%)] opacity-0 transition duration-700 group-hover/modal-image:translate-x-full group-hover/modal-image:opacity-100" />
              </div>
            </div>
          </section>

          <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:justify-end">
            {project.liveUrl ? (
              <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center gap-2 rounded-full bg-ink px-5 py-3 text-sm font-bold text-paper transition hover:-translate-y-0.5 hover:bg-vermillion focus:outline-none focus:ring-2 focus:ring-ink">
                Visit Live <ArrowUpRight size={16} />
              </a>
            ) : null}
            {project.githubUrl ? (
              <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center gap-2 rounded-full border border-ink/15 bg-white/70 px-5 py-3 text-sm font-bold text-ink transition hover:-translate-y-0.5 hover:border-ink/35 focus:outline-none focus:ring-2 focus:ring-ink">
                Source Code <Github size={16} />
              </a>
            ) : null}
          </div>
        </article>
      </div>
    </div>
  );
}

export function StickyProjectCards() {
  const reduced = useMediaQuery("(prefers-reduced-motion: reduce)");
  const isDesktop = useMediaQuery("(min-width: 1024px)");
  const useSticky = isDesktop && !reduced;
  const total = projects.length;

  const sectionRef = useRef<HTMLElement | null>(null);
  const mobileRefs = useRef<Array<HTMLElement | null>>([]);

  const [active, setActive] = useState(0);
  const [selectedProject, setSelectedProject] = useState<FeaturedProject | null>(null);

  useEffect(() => {
    if (!useSticky) return;

    const update = () => {
      const section = sectionRef.current;
      if (!section) return;

      const rect = section.getBoundingClientRect();
      const scrollable = rect.height - window.innerHeight;
      const progress = Math.min(1, Math.max(0, -rect.top / Math.max(1, scrollable)));
      const index = Math.min(total - 1, Math.round(progress * (total - 1)));

      setActive(index);
    };

    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, [useSticky, total]);

  useEffect(() => {
    if (useSticky) return;

    const nodes = mobileRefs.current.filter(Boolean) as HTMLElement[];
    if (nodes.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          const index = nodes.indexOf(entry.target as HTMLElement);
          if (index >= 0) setActive(index);
        });
      },
      { threshold: 0.4 },
    );

    nodes.forEach((node) => observer.observe(node));
    return () => observer.disconnect();
  }, [useSticky]);

  const goToDesktop = (direction: -1 | 1) => {
    const section = sectionRef.current;
    if (!section) return;

    const target = Math.min(Math.max(active + direction, 0), total - 1);
    const scrollable = section.offsetHeight - window.innerHeight;
    const y = section.offsetTop + (scrollable * target) / Math.max(1, total - 1);

    window.scrollTo({ top: y, behavior: "smooth" });
  };

  return (
    <section
      ref={sectionRef}
      id="work"
      aria-label="Selected work"
      className="relative isolate bg-paper text-ink"
      style={{ minHeight: useSticky ? `${total * 115}vh` : undefined }}
    >
      <WorkDetailModal project={selectedProject} onClose={() => setSelectedProject(null)} />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-[0.04] mix-blend-multiply"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='140' height='140'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/></filter><rect width='100%' height='100%' filter='url(%23n)' opacity='0.65'/></svg>\")",
        }}
      />

      {useSticky ? (
        <div className="sticky top-0 h-dvh w-full overflow-hidden">
          <div className="mx-auto flex h-full w-full max-w-[1400px] flex-col px-8 pb-8 pt-10 lg:px-12 lg:pt-12">
            <div className="flex items-baseline gap-6">
              <span className="font-mono text-xs tracking-[0.25em] text-accent">05 FEATURED WORKPLACE PROJECTS</span>
              <span className="h-px flex-1 bg-ink/20" />
              <span className="hidden font-mono text-xs text-muted-foreground md:inline">2024 - 2026</span>
            </div>

            <div className="relative mt-6 flex items-center justify-center lg:mt-8">
              <Sparkle className="absolute left-[6%] top-1 h-4 w-4 text-ink/70" />
              <Sparkle className="absolute right-[8%] top-6 h-3 w-3 text-ink/50" />
              <CurlyArrow className="absolute left-[2%] top-14 hidden h-16 w-16 text-muted-foreground/60 xl:block" />
              <div className="relative mx-auto h-[7.5rem] w-full max-w-[960px] lg:h-[9rem]">
                {projects.map((project, index) => (
                  <h2
                    key={project.id}
                    className={`absolute inset-0 flex items-center justify-center text-center font-display text-4xl font-medium leading-[1.02] tracking-tight transition-all duration-500 ease-out md:text-6xl ${
                      index === active
                        ? "z-10 translate-y-0 opacity-100"
                        : index < active
                          ? "pointer-events-none z-0 -translate-y-8 opacity-0"
                          : "pointer-events-none z-0 translate-y-8 opacity-0"
                    }`}
                  >
                    {project.title}
                  </h2>
                ))}
              </div>
            </div>

            <div className="relative mt-2 grid flex-1 grid-cols-12 items-center gap-6 lg:mt-4 lg:gap-10">
              <div className="relative col-span-3">
                <div className="relative h-[22rem]">
                  {projects.map((project, index) => (
                    <div
                      key={project.id}
                      className={`absolute inset-0 flex flex-col justify-center transition-all duration-500 ease-out ${
                        index === active
                          ? "z-10 translate-y-0 opacity-100"
                          : index < active
                            ? "pointer-events-none z-0 -translate-y-6 opacity-0"
                            : "pointer-events-none z-0 translate-y-6 opacity-0"
                      }`}
                    >
                      <div className="mb-3 flex items-center gap-2">
                        <span className="text-[11px] uppercase tracking-[0.28em] text-muted-foreground">Purpose</span>
                        <span className="font-display text-xs text-vermillion">{project.number}</span>
                      </div>
                      <p className="max-w-[22rem] text-[15px] leading-relaxed text-ink">{project.purpose}</p>
                      <div className="mt-6 space-y-1 text-xs">
                        <div>
                          <span className="text-muted-foreground">Category - </span>
                          <span>{project.category}</span>
                        </div>
                        {project.year ? (
                          <div>
                            <span className="text-muted-foreground">Year - </span>
                            <span>{project.year}</span>
                          </div>
                        ) : null}
                        {project.role ? (
                          <div>
                            <span className="text-muted-foreground">Role - </span>
                            <span>{project.role}</span>
                          </div>
                        ) : null}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="col-span-6 flex items-center justify-center">
                <div className="group/project-frame relative aspect-square w-full max-w-[500px] text-vermillion">
                  <div className="pointer-events-none absolute -inset-2 rounded-[72px] bg-[radial-gradient(circle_at_50%_20%,rgba(255,255,255,0.78),transparent_34%),radial-gradient(circle_at_50%_92%,rgba(224,92,54,0.16),transparent_42%)] opacity-0 blur-xl transition duration-500 group-hover/project-frame:opacity-100" />
                  <div className="absolute inset-0 overflow-hidden rounded-[64px] border border-ink/10 bg-white/35 p-3 shadow-[0_28px_90px_rgba(26,24,20,0.12),inset_0_1px_0_rgba(255,255,255,0.75)] transition duration-500 group-hover/project-frame:-translate-y-1 group-hover/project-frame:border-vermillion/45 group-hover/project-frame:shadow-[0_36px_110px_rgba(26,24,20,0.18),inset_0_1px_0_rgba(255,255,255,0.9)]">
                    <div className="relative h-full w-full overflow-hidden rounded-[52px] bg-ink/5">
                    {projects.map((project, index) => (
                      <div
                        key={project.id}
                        className={`absolute inset-0 transition-all duration-700 ease-in-out ${
                          index === active
                            ? "z-10 translate-y-0 scale-100 opacity-100"
                            : index < active
                              ? "pointer-events-none z-0 -translate-y-full scale-95 opacity-0"
                              : "pointer-events-none z-0 translate-y-full scale-105 opacity-0"
                        }`}
                        aria-hidden={index !== active}
                      >
                        <img
                          src={project.image}
                          alt={`${project.title} - ${project.category}`}
                          loading={index === 0 ? "eager" : "lazy"}
                          draggable={false}
                          className="h-full w-full object-cover transition duration-700 ease-out group-hover/project-frame:scale-[1.045] group-hover/project-frame:saturate-[1.08]"
                        />
                        <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(115deg,transparent_0%,rgba(255,255,255,0.42)_42%,transparent_58%)] opacity-0 transition duration-700 group-hover/project-frame:translate-x-full group-hover/project-frame:opacity-100" />
                        <div className="pointer-events-none absolute inset-0 border border-white/45" />
                      </div>
                    ))}
                    </div>
                    <div className="pointer-events-none absolute bottom-7 left-7 z-20 rounded-full border border-white/60 bg-paper/70 px-3 py-1 font-mono text-[10px] font-black uppercase tracking-[0.18em] text-ink shadow-sm backdrop-blur-md">
                      {projects[active]?.number} / {String(total).padStart(2, "0")}
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={() => goToDesktop(-1)}
                    className="group/nav absolute -left-16 top-1/2 z-30 flex h-14 w-14 -translate-y-1/2 cursor-pointer items-center justify-center rounded-full border border-ink/15 bg-paper/80 text-ink shadow-[0_18px_40px_rgba(26,24,20,0.12),inset_0_1px_0_rgba(255,255,255,0.8)] backdrop-blur-xl transition hover:-translate-x-1 hover:scale-105 hover:border-ink/35 hover:bg-ink hover:text-paper disabled:cursor-default disabled:opacity-30 disabled:hover:translate-x-0 disabled:hover:scale-100 disabled:hover:bg-paper/80 disabled:hover:text-ink"
                    disabled={active === 0}
                    aria-label="Previous project"
                  >
                    <ChevronLeft className="h-5 w-5 transition group-hover/nav:-translate-x-0.5" />
                  </button>
                  <button
                    type="button"
                    onClick={() => goToDesktop(1)}
                    className="group/nav absolute -right-16 top-1/2 z-30 flex h-14 w-14 -translate-y-1/2 cursor-pointer items-center justify-center rounded-full border border-ink/15 bg-paper/80 text-ink shadow-[0_18px_40px_rgba(26,24,20,0.12),inset_0_1px_0_rgba(255,255,255,0.8)] backdrop-blur-xl transition hover:translate-x-1 hover:scale-105 hover:border-ink/35 hover:bg-ink hover:text-paper disabled:cursor-default disabled:opacity-30 disabled:hover:translate-x-0 disabled:hover:scale-100 disabled:hover:bg-paper/80 disabled:hover:text-ink"
                    disabled={active === total - 1}
                    aria-label="Next project"
                  >
                    <ChevronRight className="h-5 w-5 transition group-hover/nav:translate-x-0.5" />
                  </button>
                </div>
              </div>

              <div className="relative col-span-3">
                <div className="relative h-[22rem]">
                  {projects.map((project, index) => (
                    <div
                      key={project.id}
                      className={`absolute inset-0 flex flex-col justify-center transition-all duration-500 ease-out ${
                        index === active
                          ? "z-10 translate-y-0 opacity-100"
                          : index < active
                            ? "pointer-events-none z-0 -translate-y-6 opacity-0"
                            : "pointer-events-none z-0 translate-y-6 opacity-0"
                      }`}
                    >
                      <div className="mb-3 text-[11px] uppercase tracking-[0.28em] text-muted-foreground">Tech Stack</div>
                      <div className="flex flex-wrap gap-1.5">
                        {project.stack.map((stackItem) => (
                          <span key={stackItem} className="rounded-full border border-border bg-paper/80 px-2.5 py-1 text-[11px] text-ink">
                            {stackItem}
                          </span>
                        ))}
                      </div>
                      {project.highlight ? <p className="mt-5 text-sm leading-relaxed text-muted-foreground">{project.highlight}</p> : null}
                      <div className="mt-6 flex flex-col items-start gap-2">
                        <button
                          type="button"
                          onClick={() => setSelectedProject(project)}
                          className="group inline-flex items-center gap-2 rounded-full border border-vermillion/35 bg-white/70 px-5 py-3 text-sm font-bold text-ink shadow-[0_16px_34px_rgba(224,92,54,0.12)] backdrop-blur-xl transition hover:-translate-y-0.5 hover:border-vermillion/70 hover:bg-vermillion hover:text-paper"
                        >
                          View Full Detail
                          <ChevronRight className="h-4 w-4 transition group-hover:translate-x-0.5" />
                        </button>
                        {project.liveUrl ? (
                          <a
                            href={project.liveUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="group inline-flex items-center gap-2 rounded-full bg-ink px-5 py-3 text-sm font-bold text-paper shadow-[0_16px_34px_rgba(26,24,20,0.18)] transition hover:-translate-y-0.5 hover:bg-vermillion"
                          >
                            {project.liveLabel || "View Project"}
                            <ArrowUpRight className="h-4 w-4 transition group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                          </a>
                        ) : null}
                        {project.githubUrl ? (
                          <a
                            href={project.githubUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 rounded-full border border-ink/10 bg-paper/70 px-5 py-3 text-sm font-semibold text-ink shadow-sm transition hover:-translate-y-0.5 hover:border-ink/30 hover:bg-white"
                          >
                            Source
                          </a>
                        ) : null}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <Sparkle className="pointer-events-none absolute bottom-2 right-6 h-3 w-3 text-vermillion/70" />
            </div>

          </div>
        </div>
      ) : (
        <div className="mx-auto max-w-[1400px] px-8 pb-24 pt-16 lg:px-12">
          <div className="mb-10 flex items-baseline gap-6">
            <span className="font-mono text-xs tracking-[0.25em] text-accent">05 FEATURED WORKPLACE PROJECTS</span>
            <span className="h-px flex-1 bg-ink/20" />
            <span className="font-mono text-xs text-muted-foreground">2024 - 2026</span>
          </div>
          {projects.map((project, index) => (
            <article
              key={project.id}
              ref={(element) => {
                mobileRefs.current[index] = element;
              }}
              className="mb-20 flex flex-col gap-6 opacity-100"
              style={{ animationDelay: "0.05s" }}
              aria-label={`Project ${project.number}: ${project.title}`}
            >
              <h3 className="font-display text-4xl font-medium leading-[1.05] tracking-tight sm:text-5xl">{project.title}</h3>
              <div className="group/project-frame relative aspect-square w-full text-vermillion">
                <div className="absolute inset-0 overflow-hidden rounded-[64px] border border-ink/10 bg-white/35 p-3 shadow-[0_24px_70px_rgba(26,24,20,0.12)] transition duration-500 group-hover/project-frame:-translate-y-1 group-hover/project-frame:border-vermillion/40">
                  <div className="relative h-full w-full overflow-hidden rounded-[52px] bg-ink/5">
                    <img src={project.image} alt={`${project.title} - ${project.category}`} loading="lazy" className="h-full w-full object-cover transition duration-700 group-hover/project-frame:scale-[1.045] group-hover/project-frame:saturate-[1.08]" />
                    <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(115deg,transparent_0%,rgba(255,255,255,0.38)_44%,transparent_58%)] opacity-0 transition duration-700 group-hover/project-frame:translate-x-full group-hover/project-frame:opacity-100" />
                  </div>
                </div>
              </div>
              <div>
                <div className="mb-2 text-[11px] uppercase tracking-[0.28em] text-muted-foreground">Purpose</div>
                <p className="text-base leading-relaxed text-ink">{project.purpose}</p>
                <div className="mt-2 text-sm text-muted-foreground">
                  {project.category}
                  {project.year ? ` - ${project.year}` : ""}
                </div>
              </div>
              <div>
                <div className="mb-3 text-[11px] uppercase tracking-[0.28em] text-muted-foreground">Tech Stack</div>
                <div className="flex flex-wrap gap-2">
                  {project.stack.map((stackItem) => (
                    <span key={stackItem} className="rounded-full border border-border bg-paper px-3 py-1 text-xs text-ink">
                      {stackItem}
                    </span>
                  ))}
                </div>
              </div>
              <div className="flex flex-wrap items-center gap-3">
                <button
                  type="button"
                  onClick={() => setSelectedProject(project)}
                  className="inline-flex items-center gap-2 rounded-full border border-vermillion/35 bg-white/70 px-5 py-3 text-sm font-bold text-ink shadow-[0_16px_34px_rgba(224,92,54,0.12)] transition hover:-translate-y-0.5 hover:border-vermillion/70 hover:bg-vermillion hover:text-paper"
                >
                  View Full Detail
                  <ChevronRight className="h-4 w-4" />
                </button>
                {project.liveUrl ? (
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 rounded-full bg-ink px-5 py-3 text-sm font-bold text-paper shadow-[0_16px_34px_rgba(26,24,20,0.18)] transition hover:-translate-y-0.5 hover:bg-vermillion"
                  >
                    {project.liveLabel || "View Project"}
                    <ArrowUpRight className="h-4 w-4" />
                  </a>
                ) : null}
                {project.githubUrl ? (
                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 rounded-full border border-ink/10 bg-paper/70 px-5 py-3 text-sm font-semibold text-ink shadow-sm transition hover:-translate-y-0.5 hover:border-ink/30 hover:bg-white"
                  >
                    Source
                  </a>
                ) : null}
              </div>
              <div className="text-[11px] uppercase tracking-[0.28em] text-muted-foreground">
                {project.number} / {String(total).padStart(2, "0")}
              </div>
            </article>
          ))}
        </div>
      )}
    </section>
  );
}
