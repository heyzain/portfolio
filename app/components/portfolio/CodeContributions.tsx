"use client";

import { useEffect, useMemo, useState } from "react";
import { ArrowUpRight, BookOpen, GitCommit, Github, Star, Users } from "lucide-react";
import { profile } from "@/content/portfolio";

type GithubUser = {
  login: string;
  avatar_url: string;
  html_url: string;
  followers: number;
  public_repos: number;
};

type GithubRepo = {
  name: string;
  description: string | null;
  html_url: string;
  stargazers_count: number;
  fork: boolean;
  language: string | null;
  pushed_at: string | null;
  created_at: string;
};

type ContributionDay = {
  date: string;
  count: number;
  level: number;
};

type GithubStats = {
  user: GithubUser | null;
  repos: GithubRepo[];
  contributions: ContributionDay[];
  totalContributions: number;
  source: "calendar" | "repo-activity" | "fallback";
};

const username = profile.github.split("/").pop() || "heyzain";
const fallbackDays = buildFallbackDays();

const languageColors: Record<string, string> = {
  TypeScript: "bg-blue-500",
  JavaScript: "bg-amber-400",
  Python: "bg-emerald-500",
  HTML: "bg-orange-500",
  CSS: "bg-indigo-500",
};

function formatNumber(value: number) {
  return new Intl.NumberFormat("en", { notation: value > 999 ? "compact" : "standard" }).format(value);
}

function toDateKey(date: Date) {
  return date.toISOString().slice(0, 10);
}

function daysAgo(days: number) {
  const date = new Date();
  date.setHours(12, 0, 0, 0);
  date.setDate(date.getDate() - days);
  return date;
}

function getLevel(count: number) {
  if (count <= 0) return 0;
  if (count <= 1) return 1;
  if (count <= 3) return 2;
  if (count <= 6) return 3;
  return 4;
}

function buildEmptyYear() {
  return Array.from({ length: 371 }, (_, index) => {
    const date = daysAgo(370 - index);
    return { date: toDateKey(date), count: 0, level: 0 };
  });
}

function buildFallbackDays() {
  return buildEmptyYear().map((day, index) => {
    const wave = Math.sin(index / 8) + Math.cos(index / 17);
    const count = wave > 0.6 ? 2 : wave > 0.15 ? 1 : 0;
    return { ...day, count, level: getLevel(count) };
  });
}

function buildRepoActivityDays(repos: GithubRepo[]) {
  const counts = new Map<string, number>();

  repos.forEach((repo) => {
    [repo.pushed_at, repo.created_at].filter(Boolean).forEach((dateValue) => {
      const date = new Date(dateValue as string);
      const age = Math.floor((Date.now() - date.getTime()) / 86400000);
      if (age >= 0 && age <= 370) counts.set(toDateKey(date), (counts.get(toDateKey(date)) || 0) + 1);
    });
  });

  return buildEmptyYear().map((day) => {
    const count = counts.get(day.date) || 0;
    return { ...day, count, level: getLevel(count) };
  });
}

function normalizeCalendar(payload: unknown): { days: ContributionDay[]; total: number } | null {
  if (!payload || typeof payload !== "object") return null;

  const data = payload as {
    total?: number | Record<string, number>;
    totalContributions?: number;
    contributions?: Array<{ date: string; count?: number; intensity?: string; level?: number }> | Array<Array<{ date: string; count?: number; intensity?: string; level?: number }>>;
  };

  if (!Array.isArray(data.contributions)) return null;

  const days = (data.contributions as Array<{ date: string; count?: number; intensity?: string; level?: number }> | Array<Array<{ date: string; count?: number; intensity?: string; level?: number }>>)
    .flat()
    .filter((day) => day?.date)
    .map((day) => {
      const count = Number(day.count || 0);
      const level = Number(day.level ?? day.intensity ?? getLevel(count));
      return { date: day.date, count, level: Math.max(0, Math.min(4, level)) };
    })
    .slice(-371);

  if (days.length === 0) return null;
  const totalFromObject =
    data.total && typeof data.total === "object" ? Object.values(data.total).reduce((sum, value) => sum + Number(value || 0), 0) : 0;
  return {
    days,
    total: Number(
      typeof data.total === "number" ? data.total : data.totalContributions || totalFromObject || days.reduce((sum, day) => sum + day.count, 0),
    ),
  };
}

function chunkWeeks(days: ContributionDay[]) {
  const padded = [...days];
  while (padded.length < 371) {
    padded.unshift({ date: toDateKey(daysAgo(padded.length)), count: 0, level: 0 });
  }
  return Array.from({ length: Math.ceil(padded.length / 7) }, (_, index) => padded.slice(index * 7, index * 7 + 7));
}

function monthLabels(days: ContributionDay[]) {
  const labels: Array<{ label: string; column: number }> = [];
  const formatter = new Intl.DateTimeFormat("en", { month: "short" });

  days.forEach((day, index) => {
    const date = new Date(`${day.date}T12:00:00`);
    if (date.getDate() > 7) return;
    const label = formatter.format(date);
    const column = Math.floor(index / 7);
    if (labels.at(-1)?.label !== label) labels.push({ label, column });
  });

  return labels;
}

function contributionClass(level: number) {
  return [
    "bg-ink/[0.06] hover:bg-ink/[0.12]",
    "bg-vermillion/25 hover:bg-vermillion/35",
    "bg-vermillion/45 hover:bg-vermillion/55",
    "bg-vermillion/70 hover:bg-vermillion/80",
    "bg-vermillion hover:bg-vermillion/90",
  ][level] || "bg-ink/[0.06]";
}

export function CodeContributions() {
  const [stats, setStats] = useState<GithubStats>({
    user: null,
    repos: [],
    contributions: fallbackDays,
    totalContributions: fallbackDays.reduce((sum, day) => sum + day.count, 0),
    source: "fallback",
  });

  useEffect(() => {
    let active = true;

    async function loadGithubStats() {
      try {
        const [userResponse, reposResponse, primaryCalendarResponse, secondaryCalendarResponse] = await Promise.allSettled([
          fetch(`https://api.github.com/users/${username}`),
          fetch(`https://api.github.com/users/${username}/repos?per_page=100&sort=updated`),
          fetch(`https://gh-calendar.rschristian.dev/user/${username}`),
          fetch(`https://github-contributions-api.jogruber.de/v4/${username}`),
        ]);

        const user =
          userResponse.status === "fulfilled" && userResponse.value.ok
            ? ((await userResponse.value.json()) as GithubUser)
            : null;
        const repos =
          reposResponse.status === "fulfilled" && reposResponse.value.ok
            ? ((await reposResponse.value.json()) as GithubRepo[])
            : [];
        const primaryCalendar =
          primaryCalendarResponse.status === "fulfilled" && primaryCalendarResponse.value.ok
            ? normalizeCalendar(await primaryCalendarResponse.value.json())
            : null;
        const secondaryCalendar =
          secondaryCalendarResponse.status === "fulfilled" && secondaryCalendarResponse.value.ok
            ? normalizeCalendar(await secondaryCalendarResponse.value.json())
            : null;
        const calendar = primaryCalendar || secondaryCalendar;

        if (!active) return;

        const repoActivity = buildRepoActivityDays(repos);
        const contributions = calendar?.days || repoActivity;
        setStats({
          user,
          repos,
          contributions,
          totalContributions: calendar?.total || repoActivity.reduce((sum, day) => sum + day.count, 0),
          source: calendar ? "calendar" : repos.length > 0 ? "repo-activity" : "fallback",
        });
      } catch {
        if (active) {
          setStats((current) => ({ ...current, source: "fallback" }));
        }
      }
    }

    loadGithubStats();
    return () => {
      active = false;
    };
  }, []);

  const weeks = useMemo(() => chunkWeeks(stats.contributions), [stats.contributions]);
  const labels = useMemo(() => monthLabels(stats.contributions), [stats.contributions]);
  const totalStars = stats.repos.reduce((sum, repo) => sum + repo.stargazers_count, 0);
  const realRepos = stats.repos.filter((repo) => !repo.fork).length || stats.user?.public_repos || 0;
  const topRepos = stats.repos
    .filter((repo) => !repo.fork)
    .sort((a, b) => b.stargazers_count - a.stargazers_count)
    .slice(0, 3);

  const metrics = [
    { label: "Followers", value: stats.user?.followers || 0, icon: Users },
    { label: "Repos", value: realRepos, icon: BookOpen },
    { label: "Stars", value: totalStars, icon: Star },
  ];

  return (
    <section id="code" className="relative overflow-hidden bg-paper px-4 py-16 text-ink sm:px-8 sm:py-24 lg:px-12">
      <div className="pointer-events-none absolute inset-0 ambient-grid opacity-60" />
      <div className="relative mx-auto max-w-[1400px]">
        {/* Section Header */}
        <div className="mb-10 flex items-baseline gap-6">
          <span className="font-mono text-xs tracking-[0.25em] text-accent">07 CODE &amp; CONTRIBUTIONS</span>
          <span className="h-px flex-1 bg-ink/20" />
          <span className="hidden font-mono text-xs text-muted-foreground md:inline">GITHUB ACTIVITY</span>
        </div>

        <div className="mb-12">
          <p className="font-mono text-[11px] uppercase tracking-[0.28em] text-accent">REPOSITORY SIGNAL</p>
          <h2 className="mt-3 font-display text-4xl font-medium leading-[1.02] tracking-tight text-ink md:text-6xl">
            Code &amp; Contributions<span className="text-accent">.</span>
          </h2>
        </div>

        {/* Main Contribution Card */}
        <div className="rounded-[24px] sm:rounded-[28px] border border-ink/10 bg-white/60 p-4 sm:p-8 md:p-10 shadow-[0_24px_80px_rgba(26,24,20,0.06),inset_0_1px_0_rgba(255,255,255,0.85)] backdrop-blur-xl">
          {/* Card Header: Profile Info & Stat Badges */}
          <div className="mb-8 flex flex-col gap-5 border-b border-ink/8 pb-6 lg:flex-row lg:items-center lg:justify-between">
            <a
              href={`https://github.com/${username}`}
              target="_blank"
              rel="noreferrer"
              className="group flex items-center gap-3.5 sm:gap-4 transition"
            >
              <div className="relative flex h-12 w-12 sm:h-13 sm:w-13 shrink-0 items-center justify-center overflow-hidden rounded-2xl border border-ink/10 bg-accent/10 text-accent transition group-hover:scale-105 group-hover:border-accent/30">
                {stats.user?.avatar_url ? (
                  <img src={stats.user.avatar_url} alt={`${username} GitHub avatar`} className="h-full w-full object-cover" />
                ) : (
                  <Github size={24} />
                )}
              </div>
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-2">
                  <span className="truncate text-lg sm:text-xl font-bold tracking-tight text-ink group-hover:text-accent transition-colors">
                    @{stats.user?.login || username}
                  </span>
                  <ArrowUpRight className="h-4 w-4 shrink-0 text-muted-foreground opacity-60 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:opacity-100" />
                </div>
                <p className="text-xs font-medium text-muted-foreground mt-0.5">
                  {stats.source === "calendar" ? "Verified GitHub contribution calendar" : "Public repository activity & stats"}
                </p>
              </div>
            </a>

            {/* Metrics Chips & Live Status */}
            <div className="flex flex-wrap items-center gap-2 sm:gap-3">
              <div className="flex flex-wrap items-center gap-1 sm:gap-1.5 rounded-2xl sm:rounded-full border border-ink/10 bg-paper/80 p-1 shadow-[inset_0_1px_0_rgba(255,255,255,0.8)] max-w-full">
                {metrics.map((metric) => (
                  <div
                    key={metric.label}
                    className="flex items-center gap-1.5 sm:gap-2 rounded-xl sm:rounded-full border border-ink/8 bg-white/80 px-2.5 py-1 sm:px-3.5 sm:py-1.5 text-xs transition hover:bg-white hover:border-ink/15"
                  >
                    <metric.icon className="h-3.5 w-3.5 text-accent opacity-85 shrink-0" />
                    <span className="font-display text-xs sm:text-base font-bold leading-none text-ink">{formatNumber(metric.value)}</span>
                    <span className="font-mono text-[9px] font-bold uppercase tracking-[0.12em] text-muted-foreground">
                      {metric.label}
                    </span>
                  </div>
                ))}
              </div>

              <div className="flex items-center gap-1.5 sm:gap-2 rounded-full border border-emerald-500/20 bg-emerald-500/10 px-3 py-1 sm:px-3.5 sm:py-1.5 font-mono text-[10px] font-bold uppercase tracking-[0.18em] text-emerald-700 shrink-0">
                <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
                <span>Active</span>
              </div>
            </div>
          </div>

          {/* Full-width Responsive Heatmap Grid */}
          <div className="w-full overflow-x-auto pb-3 pt-1 scrollbar-none">
            <div className="w-full min-w-[760px]">
              {/* Month Labels aligned dynamically across total weeks */}
              <div className="relative mb-3 h-5 w-full">
                {labels.map((item) => (
                  <span
                    key={`${item.label}-${item.column}`}
                    className="absolute top-0 font-mono text-[11px] font-medium tracking-wide text-ink/60"
                    style={{ left: `${(item.column / weeks.length) * 100}%` }}
                  >
                    {item.label}
                  </span>
                ))}
              </div>

              {/* Grid of 53 week columns expanding edge-to-edge */}
              <div className="grid grid-flow-col auto-cols-fr gap-[3px] sm:gap-1 md:gap-[5px] w-full">
                {weeks.map((week, weekIndex) => (
                  <div key={weekIndex} className="grid grid-rows-7 gap-[3px] sm:gap-1 md:gap-[5px]">
                    {week.map((day) => (
                      <span
                        key={day.date}
                        title={`${day.count} contributions on ${day.date}`}
                        className={`aspect-square w-full rounded-[3px] sm:rounded-[4px] border border-ink/5 transition-all duration-200 hover:scale-125 hover:z-10 hover:shadow-sm hover:ring-2 hover:ring-accent/40 ${contributionClass(
                          day.level
                        )}`}
                      />
                    ))}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Footer Info: Total count & Legend */}
          <div className="mt-6 flex flex-col gap-4 border-t border-ink/8 pt-5 text-xs font-semibold text-ink/80 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center gap-2 text-ink/75 font-mono text-[11px] uppercase tracking-[0.14em]">
              <GitCommit className="h-4 w-4 text-accent" />
              <span>
                <strong className="text-ink font-bold">{formatNumber(stats.totalContributions)}</strong> contributions in the last year
              </span>
            </div>

            <div className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.16em] text-muted-foreground">
              <span>Less</span>
              <div className="flex items-center gap-1">
                {[0, 1, 2, 3, 4].map((level) => (
                  <span
                    key={level}
                    className={`h-3 w-3 sm:h-3.5 sm:w-3.5 rounded-[3px] sm:rounded-[4px] border border-ink/5 ${contributionClass(level)}`}
                  />
                ))}
              </div>
              <span>More</span>
            </div>
          </div>
        </div>

        {/* Top Repositories Grid */}
        {topRepos.length > 0 ? (
          <div className="mt-6 grid gap-4 md:grid-cols-3">
            {topRepos.map((repo) => (
              <a
                key={repo.name}
                href={repo.html_url}
                target="_blank"
                rel="noreferrer"
                className="group relative flex flex-col justify-between rounded-[22px] border border-ink/10 bg-white/50 p-5 shadow-[0_12px_40px_rgba(26,24,20,0.04),inset_0_1px_0_rgba(255,255,255,0.7)] backdrop-blur-md transition-all duration-300 hover:-translate-y-1 hover:border-accent/40 hover:bg-white/80 hover:shadow-md"
              >
                <div>
                  <div className="flex items-start justify-between gap-3">
                    <h3 className="font-display text-lg font-bold tracking-tight text-ink group-hover:text-accent transition-colors">
                      {repo.name}
                    </h3>
                    <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-ink/10 bg-white/80 text-muted-foreground transition group-hover:border-accent/30 group-hover:text-accent">
                      <ArrowUpRight className="h-3.5 w-3.5 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                    </span>
                  </div>

                  <p className="mt-2.5 line-clamp-2 text-xs leading-relaxed text-muted-foreground">
                    {repo.description || "Public repository and code on GitHub."}
                  </p>
                </div>

                <div className="mt-5 flex items-center justify-between border-t border-ink/8 pt-3 text-[11px] font-mono font-medium text-muted-foreground">
                  {repo.language ? (
                    <span className="flex items-center gap-1.5">
                      <span className={`h-2 w-2 rounded-full ${languageColors[repo.language] || "bg-accent"}`} />
                      <span>{repo.language}</span>
                    </span>
                  ) : (
                    <span className="text-muted-foreground/60">Repository</span>
                  )}

                  <span className="flex items-center gap-1 font-bold text-ink/75">
                    <Star className="h-3.5 w-3.5 text-accent fill-accent/20" />
                    <span>{repo.stargazers_count}</span>
                  </span>
                </div>
              </a>
            ))}
          </div>
        ) : null}
      </div>
    </section>
  );
}
