import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowLeft,
  ArrowUpRight,
  CheckCircle2,
  FileText,
  Github,
  Linkedin,
  Mail,
  Sparkles,
} from "lucide-react";
import {
  absoluteUrl,
  personEntityId,
  siteName,
  siteUrl,
} from "@/lib/seo";
import {
  about,
  education,
  experience,
  playgroundProjects,
  profile,
  stack,
  workProjects,
} from "@/content/portfolio";

export const metadata: Metadata = {
  title: "About Zain Ali — Full-Stack Developer | HeyZain",
  description:
    "Zain Ali is the full-stack developer behind HeyZain, specializing in Next.js, React, Node.js, TypeScript, and MongoDB. Explore engineering background, architecture philosophy, and shipped products.",
  alternates: {
    canonical: absoluteUrl("/about"),
  },
  openGraph: {
    title: "About Zain Ali — Full-Stack Developer | HeyZain",
    description:
      "Full-stack developer specializing in Next.js, React, Node.js, TypeScript, and MongoDB. Explore engineering background, shipped products, and technical writing.",
    url: absoluteUrl("/about"),
    siteName,
    type: "profile",
  },
  twitter: {
    card: "summary_large_image",
    title: "About Zain Ali — Full-Stack Developer | HeyZain",
    description:
      "Full-stack developer specializing in Next.js, React, Node.js, TypeScript, and MongoDB. Explore engineering background, shipped products, and technical writing.",
  },
};

export default function AboutPage() {
  const profilePageSchema = {
    "@context": "https://schema.org",
    "@type": "ProfilePage",
    "@id": absoluteUrl("/about#webpage"),
    url: absoluteUrl("/about"),
    name: "About Zain Ali — Full-Stack Developer",
    description:
      "Professional profile and technical background of Zain Ali, full-stack engineer building production SaaS, AI applications, and web platforms.",
    mainEntity: {
      "@id": personEntityId,
    },
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: `${siteUrl}/`,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "About",
        item: absoluteUrl("/about"),
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(profilePageSchema).replace(/</g, "\\u003c") }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema).replace(/</g, "\\u003c") }}
      />

      <main className="min-h-screen bg-paper text-ink selection:bg-accent/20">
        {/* Navigation Bar */}
        <header className="sticky top-0 z-50 border-b border-ink/10 bg-paper/90 backdrop-blur-md">
          <div className="mx-auto flex max-w-5xl items-center justify-between px-6 py-4">
            <Link
              href="/"
              className="group flex items-center gap-2 font-mono text-xs font-semibold tracking-wider text-muted-foreground transition hover:text-ink"
            >
              <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
              <span>BACK TO PORTFOLIO</span>
            </Link>
            <div className="flex items-center gap-4 font-mono text-xs">
              <Link href="/projects" className="text-muted-foreground transition hover:text-accent">
                PROJECTS
              </Link>
              <Link href="/writing" className="text-muted-foreground transition hover:text-accent">
                WRITING
              </Link>
              <Link
                href="/#contact"
                className="rounded-full bg-ink px-3.5 py-1.5 font-mono text-[11px] text-paper transition hover:bg-accent hover:text-accent-foreground"
              >
                CONTACT
              </Link>
            </div>
          </div>
        </header>

        {/* Content Container */}
        <article className="mx-auto max-w-4xl px-6 py-12 md:py-20">
          {/* Breadcrumbs */}
          <nav aria-label="Breadcrumb" className="mb-6 font-mono text-xs text-muted-foreground">
            <ol className="flex items-center gap-2">
              <li>
                <Link href="/" className="hover:text-ink transition">
                  Home
                </Link>
              </li>
              <li aria-hidden="true">/</li>
              <li className="font-semibold text-ink" aria-current="page">
                About
              </li>
            </ol>
          </nav>

          {/* Hero Header */}
          <header className="border-b border-ink/10 pb-10">
            <div className="inline-flex items-center gap-2 rounded-full border border-accent/20 bg-accent/10 px-3 py-1 font-mono text-xs font-bold uppercase tracking-widest text-accent">
              <Sparkles className="h-3.5 w-3.5" />
              <span>Full-Stack Engineer Profile</span>
            </div>
            <h1 className="mt-4 font-display text-4xl font-bold tracking-tight text-ink sm:text-5xl md:text-6xl">
              Zain Ali — Full-Stack Developer
            </h1>
            <p className="mt-6 text-lg leading-relaxed text-ink/80 md:text-xl">
              I&apos;m Zain Ali, the developer behind HeyZain. I&apos;m a full-stack developer specializing in Next.js, React, Node.js, TypeScript, and MongoDB. I build production-ready SaaS products, marketplaces, AI applications, and full-stack web platforms from architecture through deployment.
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <a
                href={`https://${profile.github}`}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 rounded-full border border-ink/15 bg-white px-4 py-2 text-xs font-bold transition hover:border-ink hover:shadow-sm"
              >
                <Github className="h-4 w-4" />
                <span>GitHub (@heyzain)</span>
                <ArrowUpRight className="h-3 w-3 text-muted-foreground" />
              </a>
              <a
                href={`https://${profile.linkedin}`}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 rounded-full border border-ink/15 bg-white px-4 py-2 text-xs font-bold transition hover:border-ink hover:shadow-sm"
              >
                <Linkedin className="h-4 w-4 text-[#0077B5]" />
                <span>LinkedIn (/iamzainali)</span>
                <ArrowUpRight className="h-3 w-3 text-muted-foreground" />
              </a>
              <a
                href={`mailto:${profile.email}`}
                className="inline-flex items-center gap-2 rounded-full border border-ink/15 bg-white px-4 py-2 text-xs font-bold transition hover:border-ink hover:shadow-sm"
              >
                <Mail className="h-4 w-4 text-accent" />
                <span>{profile.email}</span>
              </a>
            </div>
          </header>

          {/* Core Stats Overview */}
          <section className="my-12 grid grid-cols-2 gap-4 sm:grid-cols-4">
            <div className="rounded-2xl border border-ink/10 bg-white/70 p-5 text-center shadow-xs">
              <div className="font-display text-3xl font-bold text-ink">2+</div>
              <div className="mt-1 font-mono text-[11px] uppercase tracking-wider text-muted-foreground">
                Years Building Apps
              </div>
            </div>
            <div className="rounded-2xl border border-ink/10 bg-white/70 p-5 text-center shadow-xs">
              <div className="font-display text-3xl font-bold text-ink">1+</div>
              <div className="mt-1 font-mono text-[11px] uppercase tracking-wider text-muted-foreground">
                Year Professional
              </div>
            </div>
            <div className="rounded-2xl border border-ink/10 bg-white/70 p-5 text-center shadow-xs">
              <div className="font-display text-3xl font-bold text-ink">12+</div>
              <div className="mt-1 font-mono text-[11px] uppercase tracking-wider text-muted-foreground">
                Projects Built
              </div>
            </div>
            <div className="rounded-2xl border border-ink/10 bg-white/70 p-5 text-center shadow-xs">
              <div className="font-display text-3xl font-bold text-ink">6+</div>
              <div className="mt-1 font-mono text-[11px] uppercase tracking-wider text-muted-foreground">
                Production Apps
              </div>
            </div>
          </section>

          {/* Section: About Zain Ali */}
          <section className="space-y-6 border-b border-ink/10 pb-12">
            <h2 className="font-display text-2xl font-bold tracking-tight text-ink sm:text-3xl">
              About Zain Ali
            </h2>
            <div className="space-y-4 leading-relaxed text-ink/85">
              <p>
                I am a full-stack software engineer based in Pakistan with a Bachelor of Science in Computer Science (BSCS) from the University of Mianwali. Most of my practical mastery, however, was forged through disciplined self-directed engineering: dissecting open-source architectures, rebuilding complex systems from scratch, and pushing production code to real users.
              </p>
              <p>
                My approach to software engineering centers on ownership across the entire application lifecycle. Rather than treating frontend and backend as isolated silos, I design cohesive systems where database schema modeling, REST and realtime API contracts, server-side caching, and client-side state work in harmony.
              </p>
              <p>
                Whether architecting multi-tenant SaaS dashboards, AI pipelines with streaming responses, or high-throughput marketplace booking engines, my objective is simple: build reliable, resilient, and performant web products that solve clear business problems.
              </p>
              <p>
                Under the brand <strong>HeyZain</strong>, I build, maintain, and publish full-stack applications, developer tools, and technical breakdowns focused on modern web architecture and database optimization.
              </p>
            </div>
          </section>

          {/* Section: Technical Expertise */}
          <section className="space-y-8 border-b border-ink/10 py-12">
            <div>
              <p className="font-mono text-xs uppercase tracking-widest text-accent">CAPABILITIES</p>
              <h2 className="mt-1 font-display text-2xl font-bold tracking-tight text-ink sm:text-3xl">
                Technical Expertise &amp; Stack
              </h2>
            </div>

            <div className="grid gap-6 sm:grid-cols-2">
              {stack.map((layer) => (
                <div
                  key={layer.layer}
                  className="rounded-2xl border border-ink/10 bg-white/60 p-6 shadow-xs backdrop-blur-xs transition hover:border-ink/20"
                >
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-xs font-bold text-accent">{layer.index}</span>
                    <span className="font-mono text-[11px] uppercase tracking-wider text-muted-foreground">
                      {layer.descriptor}
                    </span>
                  </div>
                  <h3 className="mt-2 font-display text-xl font-bold text-ink">{layer.layer}</h3>
                  <p className="mt-2 text-xs leading-relaxed text-ink/75">{layer.build}</p>

                  <div className="mt-4 flex flex-wrap gap-1.5">
                    {layer.items.map((item) => (
                      <span
                        key={item.name}
                        className="rounded-md border border-ink/10 bg-paper/80 px-2.5 py-1 font-mono text-[11px] font-semibold text-ink"
                      >
                        {item.name}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            <div className="rounded-2xl border border-ink/15 bg-white/80 p-6">
              <h3 className="font-display text-lg font-bold text-ink">Core Architectural Disciplines</h3>
              <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-3 font-mono text-xs text-ink/85">
                {about.coreExpertise.map((item) => (
                  <div key={item} className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Section: Professional Experience */}
          <section className="space-y-8 border-b border-ink/10 py-12">
            <div>
              <p className="font-mono text-xs uppercase tracking-widest text-accent">CAREER TIMELINE</p>
              <h2 className="mt-1 font-display text-2xl font-bold tracking-tight text-ink sm:text-3xl">
                Professional Experience
              </h2>
            </div>

            <div className="relative border-l border-ink/15 pl-6 sm:pl-8 space-y-10">
              {experience.map((exp) => (
                <div key={exp.span} className="relative">
                  <div className="absolute -left-[31px] sm:-left-[39px] top-1 flex h-4 w-4 items-center justify-center rounded-full border-2 border-paper bg-accent" />
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="font-mono text-xs font-bold text-accent">{exp.span}</span>
                    <span className="text-muted-foreground">•</span>
                    <span className="font-mono text-xs uppercase tracking-wider text-muted-foreground">
                      {exp.company}
                    </span>
                  </div>
                  <h3 className="mt-1 font-display text-xl font-bold text-ink">{exp.role}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-ink/80">{exp.blurb}</p>

                  <ul className="mt-3 space-y-1.5 text-xs text-ink/75 list-disc pl-4">
                    {exp.bullets.map((bullet) => (
                      <li key={bullet}>{bullet}</li>
                    ))}
                  </ul>

                  <div className="mt-3 flex flex-wrap gap-1.5">
                    {exp.stack.map((tech) => (
                      <span
                        key={tech}
                        className="rounded border border-ink/10 bg-white/80 px-2 py-0.5 font-mono text-[10px] text-muted-foreground"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            <div className="rounded-2xl border border-ink/10 bg-white/50 p-5">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <div>
                  <div className="font-mono text-xs uppercase tracking-wider text-muted-foreground">
                    Education
                  </div>
                  <div className="font-display text-base font-bold text-ink">{education.degree}</div>
                  <div className="text-xs text-muted-foreground">
                    {education.university} ({education.years}) — CGPA {education.cgpa}
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Section: Shipped Projects Overview */}
          <section className="space-y-6 border-b border-ink/10 py-12">
            <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
              <div>
                <p className="font-mono text-xs uppercase tracking-widest text-accent">PORTFOLIO</p>
                <h2 className="mt-1 font-display text-2xl font-bold tracking-tight text-ink sm:text-3xl">
                  Featured Products &amp; Systems
                </h2>
              </div>
              <Link
                href="/projects"
                className="group inline-flex items-center gap-1 font-mono text-xs font-bold text-accent hover:underline"
              >
                <span>View deep project breakdowns</span>
                <ArrowUpRight className="h-3.5 w-3.5 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
              </Link>
            </div>

            <p className="text-sm leading-relaxed text-ink/80">
              Below is a selected sample of production applications and solo systems engineered by Zain Ali:
            </p>

            <div className="grid gap-4 sm:grid-cols-2">
              {[...workProjects.slice(0, 4), ...playgroundProjects.slice(0, 2)].map((project) => (
                <div
                  key={project.title}
                  className="flex flex-col justify-between rounded-2xl border border-ink/10 bg-white/70 p-5 shadow-xs transition hover:border-ink/25"
                >
                  <div>
                    <span className="font-mono text-[10px] uppercase tracking-wider text-accent font-bold">
                      {project.rolenote}
                    </span>
                    <h3 className="mt-1 font-display text-lg font-bold text-ink">{project.title}</h3>
                    <p className="mt-1 text-xs text-muted-foreground line-clamp-2">{project.subtitle}</p>
                  </div>
                  <div className="mt-4 pt-3 border-t border-ink/8 font-mono text-[11px] text-muted-foreground">
                    {project.stack}
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Section: Technical Writing */}
          <section className="space-y-6 border-b border-ink/10 py-12">
            <div>
              <p className="font-mono text-xs uppercase tracking-widest text-accent">THOUGHT LEADERSHIP</p>
              <h2 className="mt-1 font-display text-2xl font-bold tracking-tight text-ink sm:text-3xl">
                Technical Writing &amp; Research
              </h2>
            </div>
            <p className="text-sm leading-relaxed text-ink/80">
              I document lessons learned from debugging production performance, state architecture, and rendering lifecycles:
            </p>

            <div className="space-y-3">
              <Link
                href="/react-page-slow-database-query-bottleneck"
                className="group block rounded-xl border border-ink/10 bg-white/60 p-4 transition hover:border-accent/40 hover:bg-white"
              >
                <div className="flex items-center justify-between">
                  <span className="font-mono text-[10px] font-bold uppercase tracking-wider text-accent">
                    Full-Stack Performance
                  </span>
                  <ArrowUpRight className="h-4 w-4 text-muted-foreground transition group-hover:text-accent" />
                </div>
                <h3 className="mt-1 font-display text-base font-bold text-ink group-hover:text-accent transition-colors">
                  The Page Felt Slow. React Wasn&apos;t the Bottleneck.
                </h3>
                <p className="mt-1 text-xs text-muted-foreground">
                  Tracing request latency backwards through API handlers and MongoDB execution plans.
                </p>
              </Link>

              <Link
                href="/structuring-full-stack-react-apps-for-speed"
                className="group block rounded-xl border border-ink/10 bg-white/60 p-4 transition hover:border-accent/40 hover:bg-white"
              >
                <div className="flex items-center justify-between">
                  <span className="font-mono text-[10px] font-bold uppercase tracking-wider text-accent">
                    React &amp; Next.js Architecture
                  </span>
                  <ArrowUpRight className="h-4 w-4 text-muted-foreground transition group-hover:text-accent" />
                </div>
                <h3 className="mt-1 font-display text-base font-bold text-ink group-hover:text-accent transition-colors">
                  Beyond the API: Why Fast Backends Still Produce Slow React UIs
                </h3>
                <p className="mt-1 text-xs text-muted-foreground">
                  Server-first rendering, streaming, selective hydration, and eliminating sequential waterfalls.
                </p>
              </Link>

              <Link
                href="/react-ui-buggy-remembers-too-much"
                className="group block rounded-xl border border-ink/10 bg-white/60 p-4 transition hover:border-accent/40 hover:bg-white"
              >
                <div className="flex items-center justify-between">
                  <span className="font-mono text-[10px] font-bold uppercase tracking-wider text-accent">
                    State Architecture
                  </span>
                  <ArrowUpRight className="h-4 w-4 text-muted-foreground transition group-hover:text-accent" />
                </div>
                <h3 className="mt-1 font-display text-base font-bold text-ink group-hover:text-accent transition-colors">
                  Your React UI May Be Buggy Because It Remembers Too Much
                </h3>
                <p className="mt-1 text-xs text-muted-foreground">
                  Eliminating duplicated state, deriving computed values, and establishing single sources of truth.
                </p>
              </Link>

              <Link
                href="/lighthouse-score-green-website-feels-slow"
                className="group block rounded-xl border border-ink/10 bg-white/60 p-4 transition hover:border-accent/40 hover:bg-white"
              >
                <div className="flex items-center justify-between">
                  <span className="font-mono text-[10px] font-bold uppercase tracking-wider text-accent">
                    Real-World Performance
                  </span>
                  <ArrowUpRight className="h-4 w-4 text-muted-foreground transition group-hover:text-accent" />
                </div>
                <h3 className="mt-1 font-display text-base font-bold text-ink group-hover:text-accent transition-colors">
                  Your Lighthouse Score Is Green. Why Does Your Website Still Feel Slow?
                </h3>
                <p className="mt-1 text-xs text-muted-foreground">
                  Bridging synthetic lab diagnostics with actual real-user interaction perception.
                </p>
              </Link>
            </div>
          </section>

          {/* Section: Open to Opportunities & Connect */}
          <section className="space-y-6 pt-12">
            <h2 className="font-display text-2xl font-bold tracking-tight text-ink sm:text-3xl">
              Open to Opportunities
            </h2>
            <p className="text-sm leading-relaxed text-ink/80">
              I am currently open to full-time remote full-stack engineering roles, SaaS contract builds, and architecture consulting. If you are building a product that requires meticulous engineering from the database layer to user interactions, let&apos;s connect.
            </p>

            <div className="rounded-2xl border border-ink/15 bg-white/90 p-6 shadow-sm sm:p-8">
              <h3 className="font-display text-lg font-bold text-ink">Find Me Online</h3>
              <p className="mt-1 text-xs text-muted-foreground">
                Official and verified web profiles for Zain Ali (HeyZain):
              </p>

              <div className="mt-4 grid gap-3 sm:grid-cols-2">
                <a
                  href={`https://${profile.github}`}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center justify-between rounded-xl border border-ink/10 bg-paper/60 p-3.5 transition hover:border-ink hover:bg-white"
                >
                  <div className="flex items-center gap-3">
                    <Github className="h-5 w-5 text-ink" />
                    <div>
                      <div className="font-display text-sm font-bold text-ink">GitHub</div>
                      <div className="font-mono text-[11px] text-muted-foreground">github.com/heyzain</div>
                    </div>
                  </div>
                  <ArrowUpRight className="h-4 w-4 text-muted-foreground" />
                </a>

                <a
                  href={`https://${profile.linkedin}`}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center justify-between rounded-xl border border-ink/10 bg-paper/60 p-3.5 transition hover:border-ink hover:bg-white"
                >
                  <div className="flex items-center gap-3">
                    <Linkedin className="h-5 w-5 text-[#0077B5]" />
                    <div>
                      <div className="font-display text-sm font-bold text-ink">LinkedIn</div>
                      <div className="font-mono text-[11px] text-muted-foreground">linkedin.com/in/iamzainali</div>
                    </div>
                  </div>
                  <ArrowUpRight className="h-4 w-4 text-muted-foreground" />
                </a>

                <a
                  href={profile.resumeUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center justify-between rounded-xl border border-ink/10 bg-paper/60 p-3.5 transition hover:border-ink hover:bg-white"
                >
                  <div className="flex items-center gap-3">
                    <FileText className="h-5 w-5 text-accent" />
                    <div>
                      <div className="font-display text-sm font-bold text-ink">Engineering Résumé</div>
                      <div className="font-mono text-[11px] text-muted-foreground">Google Drive PDF</div>
                    </div>
                  </div>
                  <ArrowUpRight className="h-4 w-4 text-muted-foreground" />
                </a>

                <a
                  href={`mailto:${profile.email}`}
                  className="flex items-center justify-between rounded-xl border border-ink/10 bg-paper/60 p-3.5 transition hover:border-ink hover:bg-white"
                >
                  <div className="flex items-center gap-3">
                    <Mail className="h-5 w-5 text-emerald-600" />
                    <div>
                      <div className="font-display text-sm font-bold text-ink">Direct Email</div>
                      <div className="font-mono text-[11px] text-muted-foreground">{profile.email}</div>
                    </div>
                  </div>
                  <ArrowUpRight className="h-4 w-4 text-muted-foreground" />
                </a>
              </div>

              <div className="mt-6 flex justify-end">
                <Link
                  href="/#contact"
                  className="inline-flex items-center gap-2 rounded-full bg-ink px-6 py-3 font-mono text-xs font-bold uppercase tracking-wider text-paper transition hover:bg-accent hover:text-accent-foreground"
                >
                  <span>Initiate Contact</span>
                  <span>-&gt;</span>
                </Link>
              </div>
            </div>
          </section>
        </article>
      </main>
    </>
  );
}
