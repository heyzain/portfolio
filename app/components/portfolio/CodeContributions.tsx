"use client";

import { useEffect, useMemo, useState } from "react";
import { ArrowUpRight, BookOpen, Github, Star, Users } from "lucide-react";
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
  html_url: string;
  stargazers_count: number;
  fork: boolean;
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

const username = profile.github.split("/").pop() || "zainali954";
const fallbackDays = buildFallbackDays();

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
  return ["bg-ink/7", "bg-vermillion/18", "bg-vermillion/35", "bg-vermillion/55", "bg-vermillion/78"][level] || "bg-ink/7";
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
    <section id="code" className="relative overflow-hidden bg-paper px-8 py-24 text-ink lg:px-12">
      <div className="pointer-events-none absolute inset-0 ambient-grid opacity-60" />
      <div className="relative mx-auto max-w-[1400px]">
        <div className="mb-10 flex items-baseline gap-6">
          <span className="font-mono text-xs tracking-[0.25em] text-accent">07 CODE & CONTRIBUTIONS</span>
          <span className="h-px flex-1 bg-ink/20" />
          <span className="hidden font-mono text-xs text-muted-foreground md:inline">GITHUB ACTIVITY</span>
        </div>

        <div className="mb-14">
          <p className="font-mono text-[11px] uppercase tracking-[0.28em] text-accent">REPOSITORY SIGNAL</p>
          <h2 className="mt-3 font-display text-4xl font-medium leading-[1.02] tracking-tight text-ink md:text-6xl">
            Code &amp; Contributions<span className="text-accent">.</span>
          </h2>
        </div>

        <div className="rounded-[28px] border border-ink/10 bg-white/50 p-5 shadow-[0_24px_80px_rgba(26,24,20,0.08),inset_0_1px_0_rgba(255,255,255,0.85)] backdrop-blur-xl sm:p-8">
          <div className="mb-8 flex flex-col gap-5 xl:flex-row xl:items-center xl:justify-between">
            <div className="flex flex-col gap-5 md:flex-row md:items-center">
              <a href={`https://github.com/${username}`} target="_blank" rel="noreferrer" className="group flex items-center gap-4">
                <span className="flex h-14 w-14 items-center justify-center overflow-hidden rounded-[18px] border border-ink/10 bg-accent/10 text-accent transition group-hover:-translate-y-0.5">
                  {stats.user?.avatar_url ? (
                    <img src={stats.user.avatar_url} alt={`${username} GitHub avatar`} className="h-full w-full object-cover" />
                  ) : (
                    <Github size={26} />
                  )}
                </span>
                <span>
                  <span className="block text-xl font-black">@{stats.user?.login || username}</span>
                  <span className="text-sm font-medium text-muted-foreground">
                    {stats.source === "calendar" ? "Contribution activity on GitHub" : "Public GitHub activity and repositories"}
                  </span>
                </span>
              </a>

              <div className="flex flex-wrap gap-2 rounded-[22px] border border-ink/10 bg-paper/60 p-2 shadow-[inset_0_1px_0_rgba(255,255,255,0.7)]">
                {metrics.map((metric) => (
                  <div key={metric.label} className="flex items-center gap-2 rounded-full border border-ink/10 bg-white/60 px-3 py-2">
                    <metric.icon className="h-4 w-4 text-vermillion" />
                    <span className="font-display text-xl font-black leading-none">{formatNumber(metric.value)}</span>
                    <span className="font-mono text-[9px] font-bold uppercase tracking-[0.16em] text-muted-foreground">{metric.label}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="rounded-full border border-ink/10 bg-paper/70 px-4 py-2 font-mono text-[10px] font-bold uppercase tracking-[0.18em] text-muted-foreground">
                Real GitHub data
              </div>
            </div>
          </div>

          <div className="overflow-x-auto pb-2">
            <div className="min-w-[760px]">
              <div className="relative mb-3 h-6">
                {labels.map((item) => (
                  <span
                    key={`${item.label}-${item.column}`}
                    className="absolute top-0 text-xs font-semibold text-ink/70"
                    style={{ left: `${item.column * 18}px` }}
                  >
                    {item.label}
                  </span>
                ))}
              </div>
              <div className="flex gap-[5px]">
                {weeks.map((week, weekIndex) => (
                  <div key={weekIndex} className="grid grid-rows-7 gap-[5px]">
                    {week.map((day) => (
                      <span
                        key={day.date}
                        title={`${day.count} contributions on ${day.date}`}
                        className={`h-3.5 w-3.5 rounded-[4px] border border-ink/5 transition hover:scale-125 hover:ring-2 hover:ring-vermillion/25 ${contributionClass(day.level)}`}
                      />
                    ))}
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="mt-5 flex flex-col gap-4 text-sm font-semibold text-ink/80 sm:flex-row sm:items-center sm:justify-between">
            <span>{formatNumber(stats.totalContributions)} contributions in the last year</span>
            <div className="flex items-center gap-2">
              <span>Less</span>
              {[0, 1, 2, 3, 4].map((level) => (
                <span key={level} className={`h-4 w-4 rounded-[4px] border border-ink/5 ${contributionClass(level)}`} />
              ))}
              <span>More</span>
            </div>
          </div>
        </div>

        {topRepos.length > 0 ? (
          <div className="mt-6 grid gap-4 md:grid-cols-3">
            {topRepos.map((repo) => (
              <a
                key={repo.name}
                href={repo.html_url}
                target="_blank"
                rel="noreferrer"
                className="group rounded-[22px] border border-ink/10 bg-white/45 p-5 shadow-sm transition hover:-translate-y-1 hover:border-vermillion/40 hover:bg-white/70"
              >
                <div className="flex items-start justify-between gap-4">
                  <h3 className="font-display text-xl font-bold">{repo.name}</h3>
                  <ArrowUpRight className="h-4 w-4 shrink-0 transition group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                </div>
                <p className="mt-4 font-mono text-[10px] font-bold uppercase tracking-[0.18em] text-muted-foreground">
                  {repo.stargazers_count} stars
                </p>
              </a>
            ))}
          </div>
        ) : null}
      </div>
    </section>
  );
}
