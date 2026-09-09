import Link from "next/link";
import { ArrowUpRight, Github, Globe, Linkedin } from "lucide-react";
import { profile } from "@/content/portfolio";

export function ArticleAuthorBio() {
  return (
    <section aria-label="Author Information" className="my-12 rounded-2xl border border-ink/15 bg-white/90 p-6 shadow-sm sm:p-8">
      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 border-b border-ink/10 pb-5">
        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border border-ink/10 bg-accent/10 text-accent font-display font-bold text-lg">
          ZA
        </div>
        <div>
          <span className="font-mono text-[10px] font-bold uppercase tracking-widest text-accent">
            AUTHOR &amp; ENGINEER
          </span>
          <h3 className="font-display text-xl font-bold text-ink">
            <Link href="/about" className="transition-colors hover:text-accent">
              {profile.name}
            </Link>
          </h3>
          <p className="text-xs text-muted-foreground font-mono">
            {profile.role} · Pakistan
          </p>
        </div>
      </div>

      <div className="mt-5 space-y-4">
        <p className="text-sm leading-relaxed text-ink/85">
          HeyZain is the engineering portfolio and technical publication of Zain Ali, a full-stack developer and software engineer specializing in Next.js, React, Node.js, TypeScript, and MongoDB. He builds production-ready web platforms, SaaS products, marketplaces, and developer tools from schema design to edge deployment.
        </p>

        <div className="flex flex-wrap items-center gap-3 pt-2">
          <a
            href={`https://${profile.github}`}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-1.5 rounded-full border border-ink/15 bg-paper/60 px-3.5 py-1.5 font-mono text-xs font-semibold text-ink transition hover:border-ink hover:bg-white"
          >
            <Github className="h-3.5 w-3.5" />
            <span>GitHub</span>
            <ArrowUpRight className="h-3 w-3 text-muted-foreground" />
          </a>

          <a
            href={`https://${profile.linkedin}`}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-1.5 rounded-full border border-ink/15 bg-paper/60 px-3.5 py-1.5 font-mono text-xs font-semibold text-ink transition hover:border-ink hover:bg-white"
          >
            <Linkedin className="h-3.5 w-3.5 text-[#0077B5]" />
            <span>LinkedIn</span>
            <ArrowUpRight className="h-3 w-3 text-muted-foreground" />
          </a>

          <Link
            href="/about"
            className="inline-flex items-center gap-1.5 rounded-full border border-ink/15 bg-paper/60 px-3.5 py-1.5 font-mono text-xs font-semibold text-ink transition hover:border-ink hover:bg-white"
          >
            <Globe className="h-3.5 w-3.5 text-accent" />
            <span>About Zain</span>
            <ArrowUpRight className="h-3 w-3 text-muted-foreground" />
          </Link>

          <Link
            href="/writing"
            className="inline-flex items-center gap-1.5 rounded-full border border-ink/15 bg-paper/60 px-3.5 py-1.5 font-mono text-xs font-semibold text-ink transition hover:border-ink hover:bg-white"
          >
            <span>All Articles</span>
            <ArrowUpRight className="h-3 w-3 text-muted-foreground" />
          </Link>

          <Link
            href="/"
            className="inline-flex items-center gap-1.5 rounded-full border border-ink/15 bg-paper/60 px-3.5 py-1.5 font-mono text-xs font-semibold text-ink transition hover:border-ink hover:bg-white"
          >
            <span>Portfolio</span>
            <ArrowUpRight className="h-3 w-3 text-muted-foreground" />
          </Link>
        </div>
      </div>
    </section>
  );
}
