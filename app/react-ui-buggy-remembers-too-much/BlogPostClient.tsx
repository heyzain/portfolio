"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  Check,
  Copy,
  Share2,
  Clock,
  Calendar,
  Database,
  GitBranch,
  HelpCircle,
  Link2,
  MousePointerClick,
  Route,
  Server,
  Sparkles,
} from "lucide-react";
import { toast } from "sonner";

const duplicatedStateCode = `const [links, setLinks] = useState<Link[]>([]);
const [searchQuery, setSearchQuery] = useState("");
const [selectedCategory, setSelectedCategory] =
  useState<string | null>(null);

const [filteredLinks, setFilteredLinks] = useState<Link[]>([]);
const [filteredCount, setFilteredCount] = useState(0);
const [selectedLink, setSelectedLink] = useState<Link | null>(null);
const [isEmpty, setIsEmpty] = useState(false);`;

const derivedStateCode = `const [searchQuery, setSearchQuery] = useState("");
const [selectedCategory, setSelectedCategory] =
  useState<string | null>(null);
const [selectedLinkId, setSelectedLinkId] =
  useState<string | null>(null);

const filteredLinks = links.filter((link) => {
  const matchesQuery = link.title
    .toLowerCase()
    .includes(searchQuery.toLowerCase());

  const matchesCategory =
    !selectedCategory || link.categoryId === selectedCategory;

  return matchesQuery && matchesCategory;
});

const filteredCount = filteredLinks.length;
const selectedLink =
  links.find((link) => link.id === selectedLinkId) ?? null;
const isEmpty = filteredLinks.length === 0;`;

const decisionItems = [
  {
    icon: GitBranch,
    title: "Can it be calculated from existing inputs?",
    answer: "Derive it during render.",
  },
  {
    icon: MousePointerClick,
    title: "Does changing it need to update the UI?",
    answer: "State may be the right home.",
  },
  {
    icon: Link2,
    title: "Does it need to persist without rendering?",
    answer: "Use a ref instead of state.",
  },
  {
    icon: Route,
    title: "Should refresh, sharing, or back/forward preserve it?",
    answer: "Consider URL state.",
  },
  {
    icon: Server,
    title: "Does it come from remote data?",
    answer: "Let the data layer own it unless you need a local draft.",
  },
];

const faqItems = [
  {
    q: "Is having many useState hooks automatically bad?",
    a: "No. Several independent user decisions can legitimately live in state. The trouble starts when state variables are just different versions of information the component already has.",
  },
  {
    q: "Should filtered data be stored in React state?",
    a: "Usually not. Store the original collection and the filter inputs, then calculate the filtered result from those values.",
  },
  {
    q: "Should I use useMemo whenever I derive a value?",
    a: "No. Derivation is about ownership and correctness. Memoization is a performance optimization, useful after measurement or when reference stability matters.",
  },
  {
    q: "When should I use useEffect?",
    a: "Use effects to synchronize React with something outside React: browser APIs, subscriptions, timers, network connections, or third-party libraries. Question effects that only keep React values aligned with each other.",
  },
  {
    q: "Should selected objects be stored in state?",
    a: "Sometimes, but storing a stable ID and deriving the object from the canonical collection often avoids stale object copies.",
  },
];

export function BlogPostClient() {
  const [copied, setCopied] = useState(false);
  const [codeCopied, setCodeCopied] = useState<string | null>(null);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (totalHeight > 0) {
        const currentProgress = (window.scrollY / totalHeight) * 100;
        setScrollProgress(Math.min(100, Math.max(0, currentProgress)));
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const copyPageUrl = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      toast.success("Link copied to clipboard!");
      setTimeout(() => setCopied(false), 2000);
    } catch {
      toast.error("Failed to copy link");
    }
  };

  const copyCode = async (id: string, code: string) => {
    try {
      await navigator.clipboard.writeText(code);
      setCodeCopied(id);
      toast.success("Code snippet copied!");
      setTimeout(() => setCodeCopied(null), 2000);
    } catch {
      toast.error("Failed to copy code");
    }
  };

  return (
    <>
      <div className="fixed left-0 right-0 top-0 z-50 h-1 bg-ink/5">
        <div
          className="h-full bg-accent transition-all duration-150 ease-out"
          style={{ width: `${scrollProgress}%` }}
        />
      </div>

      <header className="sticky top-0 z-40 w-full border-b border-ink/10 bg-paper/85 backdrop-blur-xl transition-all">
        <div className="mx-auto flex max-w-5xl items-center justify-between px-6 py-4 sm:px-8">
          <Link
            href="/"
            className="group inline-flex items-center gap-2 font-mono text-xs font-semibold tracking-wider text-ink/75 transition-colors hover:text-accent"
          >
            <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
            <span>BACK TO PORTFOLIO</span>
          </Link>

          <button
            onClick={copyPageUrl}
            type="button"
            aria-label="Share article"
            className="inline-flex items-center gap-1.5 rounded-full border border-ink/10 bg-white/70 px-3.5 py-1.5 font-mono text-[11px] font-medium uppercase tracking-wider text-ink shadow-sm transition-all hover:border-accent/40 hover:bg-white hover:text-accent"
          >
            {copied ? (
              <>
                <Check className="h-3.5 w-3.5 text-emerald-600" />
                <span className="text-emerald-600">COPIED</span>
              </>
            ) : (
              <>
                <Share2 className="h-3.5 w-3.5" />
                <span>SHARE</span>
              </>
            )}
          </button>
        </div>
      </header>

      <article className="relative min-h-screen bg-paper pb-24 text-ink selection:bg-accent/15 selection:text-accent">
        <div className="pointer-events-none absolute inset-0 ambient-grid opacity-40" />

        <div className="relative mx-auto max-w-4xl px-6 pt-12 sm:px-8 sm:pt-16 md:pt-20">
          <div className="mb-6 flex flex-wrap items-center gap-2 font-mono text-xs text-muted-foreground">
            <Link href="/" className="transition-colors hover:text-accent">
              HOME
            </Link>
            <span>/</span>
            <span className="font-semibold tracking-wider text-accent">FRONTEND ARCHITECTURE</span>
            <span>/</span>
            <span>REACT STATE</span>
          </div>

          <h1 className="font-display text-3xl font-medium leading-[1.08] tracking-tight text-ink sm:text-5xl md:text-6xl">
            Your React UI May Be Buggy Because It Remembers Too Much
          </h1>

          <p className="mt-6 text-lg font-normal leading-relaxed text-muted-foreground sm:text-xl">
            useState feels harmless. But every stored value becomes another value your component must update, synchronize, and keep correct.
          </p>

          <div className="mt-8 flex flex-wrap items-center justify-between gap-4 border-y border-ink/10 py-4 font-mono text-xs text-muted-foreground">
            <div className="flex items-center gap-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-full border border-ink/15 bg-accent/10 font-bold text-accent">
                ZA
              </div>
              <div>
                <span className="block font-semibold text-ink">Zain Ali</span>
                <span className="text-[11px]">Full-Stack Developer</span>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-4 text-[11px] sm:gap-6">
              <span className="flex items-center gap-1.5">
                <Calendar className="h-3.5 w-3.5 text-accent" />
                August 2026
              </span>
              <span className="flex items-center gap-1.5">
                <Clock className="h-3.5 w-3.5 text-accent" />
                9 min read
              </span>
              <span className="hidden rounded-full border border-accent/20 bg-accent/10 px-2.5 py-0.5 font-bold text-accent sm:inline-block">
                REACT STATE MODEL
              </span>
            </div>
          </div>

          <div className="my-10 overflow-hidden rounded-[24px] border border-ink/10 bg-white/60 shadow-[0_20px_60px_rgba(26,24,20,0.06),inset_0_1px_0_rgba(255,255,255,0.85)]">
            <img
              src="/react-ui-remembers-too-much-hero.webp"
              alt="A React state diagram contrasting duplicated state with one clear source of truth"
              className="h-auto w-full object-cover"
              loading="eager"
            />
          </div>

          <div className="my-8 rounded-2xl border border-accent/20 bg-accent/5 p-6 backdrop-blur-sm sm:p-7">
            <div className="flex items-start gap-3">
              <Sparkles className="mt-1 h-5 w-5 shrink-0 text-accent" />
              <div>
                <h2 className="font-display text-lg font-bold text-ink">The Core Principle</h2>
                <p className="mt-1 text-sm leading-relaxed text-ink/85">
                  React state is not just storage. It is a synchronization contract. Store the minimum information required to describe the interface, then derive everything else when possible.
                </p>
              </div>
            </div>
          </div>

          <div className="prose-custom mt-12 space-y-10 text-[1.0625rem] leading-[1.8] text-ink/90">
            <section className="space-y-4">
              <p>
                I started thinking about this differently while building interfaces where the same underlying information appeared in several forms.
              </p>
              <p>
                A list of links existed. Then there was a filtered version of that list. Then the number of filtered results. Then the currently selected item. Then flags derived from those values.
              </p>
              <p>
                Individually, every state variable looked reasonable. Together, they created several representations of the same truth. And that is where seemingly random UI bugs begin.
              </p>
            </section>

            <hr className="border-ink/10" />

            <section className="space-y-5">
              <h2 className="font-display text-2xl font-bold tracking-tight text-ink sm:text-3xl">
                The Pattern Looked Harmless
              </h2>
              <p>Imagine a simplified links interface:</p>
              <CodeBlock
                id="duplicated"
                label="Duplicated state"
                code={duplicatedStateCode}
                copied={codeCopied === "duplicated"}
                onCopy={() => copyCode("duplicated", duplicatedStateCode)}
              />
              <p>
                Nothing here immediately screams bad architecture. Every variable represents something visible in the UI. That is exactly the trap.
              </p>
              <p>
                filteredLinks is not actually new information. Neither is filteredCount. Neither is isEmpty. They are consequences of information the component already has.
              </p>
            </section>

            <section className="rounded-[24px] border border-ink/10 bg-white/70 p-6 shadow-sm sm:p-8">
              <h2 className="font-display text-2xl font-bold tracking-tight text-ink sm:text-3xl">
                Duplicated State Creates Multiple Sources of Truth
              </h2>
              <div className="mt-6 grid gap-4 sm:grid-cols-2">
                <div className="rounded-2xl border border-rose-500/20 bg-rose-500/[0.04] p-5">
                  <p className="font-mono text-xs font-bold uppercase tracking-wider text-rose-700">
                    Before
                  </p>
                  <div className="mt-4 space-y-2 font-mono text-xs text-ink/80">
                    <p>links + query + category</p>
                    <p className="pl-5 text-rose-700">-&gt; filteredLinks</p>
                    <p className="pl-10 text-rose-700">-&gt; filteredCount</p>
                    <p className="pl-10 text-rose-700">-&gt; isEmpty</p>
                    <p className="pl-5 text-rose-700">-&gt; selectedLink copy</p>
                  </div>
                </div>
                <div className="rounded-2xl border border-emerald-500/20 bg-emerald-500/[0.04] p-5">
                  <p className="font-mono text-xs font-bold uppercase tracking-wider text-emerald-700">
                    After
                  </p>
                  <div className="mt-4 space-y-2 font-mono text-xs text-ink/80">
                    <p>links</p>
                    <p>searchQuery</p>
                    <p>selectedCategory</p>
                    <p>selectedLinkId</p>
                    <p className="text-emerald-700">-&gt; derive the current UI</p>
                  </div>
                </div>
              </div>
              <p className="mt-5 text-sm leading-relaxed text-ink/80">
                The browser does not know which value represents the real truth. All of them are state, so React faithfully renders whichever values we gave it, even when those values disagree.
              </p>
            </section>

            <section className="space-y-5">
              <h2 className="font-display text-2xl font-bold tracking-tight text-ink sm:text-3xl">
                Store the Minimum. Derive the Rest.
              </h2>
              <p>
                Instead of asking where to store a value, I try to ask an earlier question: does the UI need to remember this at all?
              </p>
              <CodeBlock
                id="derived"
                label="Derived values"
                code={derivedStateCode}
                copied={codeCopied === "derived"}
                onCopy={() => copyCode("derived", derivedStateCode)}
              />
              <p>
                There is no synchronization effect. There is nothing to keep aligned. Whenever the source values change, React renders again and calculates the current answer from the current inputs.
              </p>
            </section>

            <section className="space-y-5">
              <h2 className="font-display text-2xl font-bold tracking-tight text-ink sm:text-3xl">
                Five Homes for UI Information
              </h2>
              <div className="grid gap-4 sm:grid-cols-2">
                {[
                  ["Local state", "Independent user decisions: dialog open, search query, selected category."],
                  ["Derived values", "Counts, filtered collections, labels, empty states, and selected objects calculated from existing inputs."],
                  ["Refs", "Persistent values that should not update the interface when they change."],
                  ["URL state", "Filters, sorting, pagination, and navigation state that should survive refreshes or sharing."],
                  ["Server-owned data", "Remote data already owned by a cache or data-fetching layer unless the UI needs an intentional draft."],
                ].map(([title, body]) => (
                  <div key={title} className="rounded-2xl border border-ink/10 bg-white/60 p-5 shadow-sm">
                    <div className="flex items-center gap-2 font-mono text-xs font-bold uppercase tracking-wider text-accent">
                      <Database className="h-4 w-4" />
                      <span>{title}</span>
                    </div>
                    <p className="mt-2 text-sm leading-relaxed text-ink/80">{body}</p>
                  </div>
                ))}
              </div>
            </section>

            <section className="space-y-5">
              <h2 className="font-display text-2xl font-bold tracking-tight text-ink sm:text-3xl">
                useEffect Is Often Where the Smell Becomes Visible
              </h2>
              <p>
                useEffect is not the problem. Effects are essential when React needs to synchronize with something outside React: DOM APIs, browser APIs, subscriptions, timers, network connections, or third-party libraries.
              </p>
              <blockquote className="border-l-4 border-accent pl-4 font-display text-lg italic text-ink">
                Is this effect connecting React to something external, or is it keeping my own state variables from disagreeing?
              </blockquote>
              <p>
                That question often reveals derived state hiding inside synchronization code.
              </p>
            </section>

            <section className="rounded-[24px] border border-ink/10 bg-white/70 p-6 shadow-sm sm:p-8">
              <h2 className="font-display text-2xl font-bold tracking-tight text-ink sm:text-3xl">
                The Decision Tree I Use Before Adding useState
              </h2>
              <div className="mt-6 space-y-3">
                {decisionItems.map((item) => {
                  const Icon = item.icon;
                  return (
                    <div key={item.title} className="flex gap-3 rounded-2xl border border-ink/10 bg-paper/70 p-4">
                      <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-accent/10 text-accent">
                        <Icon className="h-4 w-4" />
                      </span>
                      <div>
                        <h3 className="font-display text-base font-bold text-ink">{item.title}</h3>
                        <p className="mt-1 text-sm leading-relaxed text-ink/75">{item.answer}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </section>

            <section className="space-y-4">
              <h2 className="font-display text-2xl font-bold tracking-tight text-ink sm:text-3xl">
                How I Audit an Overloaded React Component
              </h2>
              <p>
                When a component starts becoming difficult to reason about, I do not immediately split it into smaller files. First I inspect its state model.
              </p>
              <ol className="list-decimal space-y-2 pl-6 text-base text-ink/80">
                <li>List every useState and write down what the component believes it must remember.</li>
                <li>Mark values that can be calculated: counts, filtered lists, booleans, formatted strings, selected objects, and status labels.</li>
                <li>Trace effects whose main job is A changed, so update B.</li>
                <li>Find duplicated ownership across props, fetched data, context, stores, the URL, and other state variables.</li>
                <li>Keep the smallest independent representation, then re-test create, delete, filter, search, select, clear filter, navigate, and refetch flows.</li>
              </ol>
            </section>

            <section className="space-y-4">
              <h2 className="font-display text-2xl font-bold tracking-tight text-ink sm:text-3xl">
                Derived State Is Not Always Wrong
              </h2>
              <p>
                A form might initialize from server data and then become an independent draft. An editor may preserve a historical snapshot. An optimistic interface might temporarily maintain a local version while a mutation is pending.
              </p>
              <p>
                The distinction is ownership. If the UI intentionally creates a new version of information with its own lifecycle, state can make sense. What I want to avoid is accidental duplication because another copy felt convenient.
              </p>
            </section>

            <div className="my-10 rounded-2xl border border-ink/15 bg-white/80 p-6 text-center shadow-sm sm:p-8">
              <p className="mb-2 font-mono text-xs uppercase tracking-widest text-accent">The Takeaway</p>
              <h2 className="font-display text-2xl font-bold text-ink sm:text-3xl">
                Store less. Make each source of truth obvious.
              </h2>
              <p className="mx-auto mt-3 max-w-lg text-sm leading-relaxed text-muted-foreground">
                Good React state architecture is not about avoiding useState. It is about making sure every stored value deserves to exist independently.
              </p>
            </div>

            <section className="space-y-6 pt-4">
              <div className="flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-accent">
                <HelpCircle className="h-4 w-4" />
                <span>FREQUENTLY ASKED QUESTIONS</span>
              </div>
              <h2 className="font-display text-2xl font-bold tracking-tight text-ink sm:text-3xl">
                Frequently Asked Questions
              </h2>

              <div className="space-y-4">
                {faqItems.map((faq) => (
                  <div key={faq.q} className="rounded-xl border border-ink/10 bg-white/60 p-5 shadow-sm">
                    <h3 className="font-display text-base font-bold text-ink sm:text-lg">{faq.q}</h3>
                    <p className="mt-2 text-xs leading-relaxed text-ink/80 sm:text-sm">{faq.a}</p>
                  </div>
                ))}
              </div>
            </section>
          </div>

          <div className="mt-16 flex flex-col items-center justify-between gap-4 border-t border-ink/10 pt-8 font-mono text-xs sm:flex-row">
            <Link
              href="/"
              className="group inline-flex items-center gap-2 font-bold text-ink/75 transition-colors hover:text-accent"
            >
              <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
              <span>Back to Home</span>
            </Link>

            <Link
              href="/structuring-full-stack-react-apps-for-speed"
              className="group inline-flex items-center gap-2 font-bold text-accent hover:underline"
            >
              <span>Read: Why Fast Backends Still Produce Slow React UIs -&gt;</span>
            </Link>
          </div>
        </div>
      </article>
    </>
  );
}

function CodeBlock({
  id,
  label,
  code,
  copied,
  onCopy,
}: {
  id: string;
  label: string;
  code: string;
  copied: boolean;
  onCopy: () => void;
}) {
  return (
    <div className="relative overflow-hidden rounded-2xl border border-ink/15 bg-[#1A1814] text-paper shadow-xl">
      <div className="flex items-center justify-between gap-4 border-b border-paper/10 bg-black/20 px-4 py-2.5 font-mono text-xs text-paper/70">
        <span>{label}</span>
        <button
          type="button"
          onClick={onCopy}
          aria-label={`Copy ${id} code example`}
          className="flex items-center gap-1.5 rounded border border-paper/15 bg-paper/5 px-2.5 py-1 text-paper transition hover:bg-paper/10"
        >
          {copied ? <Check className="h-3 w-3 text-emerald-400" /> : <Copy className="h-3 w-3" />}
          <span className={copied ? "text-emerald-400" : ""}>{copied ? "Copied" : "Copy"}</span>
        </button>
      </div>
      <pre className="overflow-x-auto p-5 font-mono text-xs leading-relaxed text-paper/90 sm:text-sm">
        <code>{code}</code>
      </pre>
    </div>
  );
}
