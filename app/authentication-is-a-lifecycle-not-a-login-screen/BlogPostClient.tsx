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
  Sparkles,
  ShieldCheck,
  Key,
  Database,
  RefreshCw,
  LogOut,
  LifeBuoy,
  HelpCircle,
  AlertTriangle,
  Server,
  Laptop,
  CheckCircle2,
  XCircle,
  ArrowRight,
  Lock,
} from "lucide-react";
import { toast } from "sonner";
import { ArticleAuthorBio } from "@/components/portfolio/ArticleAuthorBio";

const sessionValidationCode = `// server/auth/validate-session.ts
import { db } from "@/lib/db";
import { redis } from "@/lib/redis";

interface SessionValidationResult {
  isValid: boolean;
  user?: { id: string; email: string };
  reason?: "EXPIRED" | "REVOKED" | "NOT_FOUND" | "TAMPERED";
}

export async function validateProtectedRequest(
  sessionId: string,
  clientTokenVersion?: number
): Promise<SessionValidationResult> {
  // 1. Fast path: check Redis distributed session cache
  const cached = await redis.get(\`session:\${sessionId}\`);
  const session = cached ? JSON.parse(cached) : await db.sessions.findById(sessionId);

  if (!session) {
    return { isValid: false, reason: "NOT_FOUND" };
  }

  // 2. Enforce natural time-to-live expiry
  if (Date.now() > new Date(session.expiresAt).getTime()) {
    return { isValid: false, reason: "EXPIRED" };
  }

  // 3. Enforce explicit administrative or user revocation
  if (session.revokedAt !== null) {
    return { isValid: false, reason: "REVOKED" };
  }

  // 4. Invalidate if a security event (e.g. password reset) bumped user version
  const user = await db.users.findById(session.userId);
  if (!user || (user.tokenVersion !== session.tokenVersion)) {
    return { isValid: false, reason: "REVOKED" };
  }

  return { isValid: true, user: { id: user.id, email: user.email } };
}`;

const rotationSnippet = `// server/auth/rotate-refresh-token.ts
export async function rotateRefreshToken(oldRefreshToken: string) {
  const tokenRecord = await db.refreshTokens.findOne({ token: oldRefreshToken });

  if (!tokenRecord) {
    throw new UnauthorizedError("Invalid token");
  }

  // Reuse detection: if an already-consumed token arrives, trigger panic revocation
  if (tokenRecord.consumedAt) {
    await db.sessions.updateMany(
      { userId: tokenRecord.userId },
      { revokedAt: new Date() }
    );
    throw new SecurityBreachError("Token reuse detected. All sessions revoked.");
  }

  // Mark previous token consumed & issue atomic successor
  await db.refreshTokens.updateOne(
    { id: tokenRecord.id },
    { consumedAt: new Date() }
  );

  const newRefreshToken = generateSecureToken();
  await db.refreshTokens.create({
    token: newRefreshToken,
    userId: tokenRecord.userId,
    familyId: tokenRecord.familyId,
    expiresAt: computeExpiry("30d"),
  });

  return newRefreshToken;
}`;

const faqItems = [
  {
    q: "Is authentication the same thing as login?",
    a: "No. Login is merely the entry event in the authentication lifecycle where initial identity is confirmed. Authentication encompasses issuing, storing, validating, refreshing, expiring, revoking, and recovering access over time.",
  },
  {
    q: "Why isn't a successful login enough to prove authentication works?",
    a: "Because a successful login only proves that one credential-verification path worked at a single point in time. It does not prove that sessions are stored safely, expired tokens are rejected, revoked credentials cannot access private endpoints, or that password resets terminate existing device sessions.",
  },
  {
    q: "Why should authentication be validated on the server?",
    a: "Client-side state (like isAuthenticated = true in React) is only a UI rendering hint, not a security boundary. The frontend can hide buttons, but only the server can authoritatively decide whether an incoming session token is still valid, unexpired, and unrevoked.",
  },
  {
    q: "How can I test session revocation?",
    a: "The most reliable test is the two-browser verification: log into the same account in Browser A and Browser B. From Browser A, click 'Log out of all devices'. Then, from Browser B, make a request to a protected API endpoint. The server must reject Browser B with a 401 Unauthorized.",
  },
  {
    q: "Should password resets invalidate existing sessions?",
    a: "Yes. When a password reset occurs, the trust relationship of the account has fundamentally changed. If existing active sessions on other browsers or stolen devices remain authenticated, the account remains compromised despite the new password.",
  },
  {
    q: "What's the difference between expiry and revocation?",
    a: "Expiry is time-based and predictable: access ceases after a predefined lifetime (e.g. 15 minutes or 7 days). Revocation is intentional and event-driven: access is immediately destroyed before natural expiration due to user logout, administrative action, or security detection.",
  },
  {
    q: "Why is testing only the happy path dangerous?",
    a: "Because the vast majority of critical security breaches and embarrassing authorization bugs happen outside the happy path: expired tokens still accepted, client-only logouts that leave server sessions alive, unhandled second devices, and lack of brute-force throttling on endpoints.",
  },
];

const auditChecklist = [
  {
    category: "Happy Path",
    checks: [
      "Can valid credentials authenticate cleanly?",
      "Does the user receive a scoped, cryptographically strong session?",
      "Does the initial redirect land safely on authorized routes?",
    ],
  },
  {
    category: "Session Behavior",
    checks: [
      "Does every protected API route validate session validity against the server?",
      "How does the system behave when opened across two independent browsers?",
      "Does natural session expiration immediately block API access?",
    ],
  },
  {
    category: "Revocation",
    checks: [
      "Can a user explicitly revoke 'All other devices' on demand?",
      "Does a previously authenticated second browser receive an immediate 401 Unauthorized?",
      "Is client logout accompanied by explicit server-side session invalidation?",
    ],
  },
  {
    category: "Recovery & Security Events",
    checks: [
      "Does password recovery terminate existing active sessions and refresh tokens?",
      "Are password reset tokens single-use and strictly time-bounded?",
      "Does email or credential modification trigger an audit trail and session refresh?",
    ],
  },
  {
    category: "Credential Lifecycle",
    checks: [
      "When do short-lived access credentials expire (e.g. 15 mins)?",
      "Are refresh credentials strictly rotated upon each exchange?",
      "Does reuse of an old refresh token immediately trigger family revocation?",
    ],
  },
  {
    category: "Abuse & Resilience",
    checks: [
      "Are repeated failed login attempts rate-limited with exponential backoff?",
      "Is brute-force password guessing mitigated by IP and account-level throttling?",
      "Are security failure events logged with actionable observability?",
    ],
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
      toast.success("Code copied!");
      setTimeout(() => setCodeCopied(null), 2000);
    } catch {
      toast.error("Failed to copy code");
    }
  };

  return (
    <>
      {/* Top Reading Progress Bar */}
      <div className="fixed top-0 left-0 right-0 z-50 h-1 bg-ink/5">
        <div
          className="h-full bg-accent transition-all duration-150 ease-out"
          style={{ width: `${scrollProgress}%` }}
        />
      </div>

      {/* Floating Header */}
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

      {/* Main Content Area */}
      <article className="relative min-h-screen bg-paper pb-24 text-ink selection:bg-accent/15 selection:text-accent">
        <div className="pointer-events-none absolute inset-0 ambient-grid opacity-40" />

        <div className="relative mx-auto max-w-4xl px-6 pt-12 sm:px-8 sm:pt-16 md:pt-20">
          {/* Breadcrumbs */}
          <nav aria-label="Breadcrumb" className="mb-6 font-mono text-xs text-muted-foreground">
            <ol className="flex flex-wrap items-center gap-2">
              <li>
                <Link href="/" className="transition-colors hover:text-accent">
                  HOME
                </Link>
              </li>
              <li aria-hidden="true">/</li>
              <li>
                <Link href="/writing" className="transition-colors hover:text-accent">
                  WRITING
                </Link>
              </li>
              <li aria-hidden="true">/</li>
              <li className="font-semibold text-accent" aria-current="page">
                AUTH LIFECYCLE
              </li>
            </ol>
          </nav>

          {/* Headline */}
          <h1 className="font-display text-3xl font-medium leading-[1.08] tracking-tight text-ink sm:text-5xl md:text-6xl">
            Your Login Works. Your Authentication System Might Not.
          </h1>

          {/* Subtitle / Deck */}
          <p className="mt-6 text-lg font-normal leading-relaxed text-muted-foreground sm:text-xl">
            A successful login only proves one path works. Real authentication has to handle sessions, validation, expiry, revocation, recovery, and everything that happens after the redirect.
          </p>

          {/* Author & Meta Row */}
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
                September 2026
              </span>
              <span className="flex items-center gap-1.5">
                <Clock className="h-3.5 w-3.5 text-accent" />
                10 min read
              </span>
              <span className="hidden rounded-full border border-accent/20 bg-accent/10 px-2.5 py-0.5 font-bold text-accent sm:inline-block">
                SYSTEM ARCHITECTURE
              </span>
            </div>
          </div>

          {/* Hero Image */}
          <div className="my-10 overflow-hidden rounded-[24px] border border-ink/10 bg-white/60 shadow-[0_20px_60px_rgba(26,24,20,0.06),inset_0_1px_0_rgba(255,255,255,0.85)]">
            <img
              src="/authentication-lifecycle-hero.webp"
              alt="Authentication is a lifecycle, not a login screen: verify, issue, store, validate, rotate, revoke, recover"
              className="h-auto w-full object-cover"
              loading="eager"
            />
          </div>

          {/* Article Key Takeaway Box */}
          <div className="my-8 rounded-2xl border border-accent/20 bg-accent/5 p-6 backdrop-blur-sm sm:p-7">
            <div className="flex items-start gap-3">
              <Sparkles className="mt-1 h-5 w-5 shrink-0 text-accent" />
              <div>
                <h2 className="font-display text-lg font-bold text-ink">The Core Principle</h2>
                <p className="mt-1 text-sm leading-relaxed text-ink/85">
                  <strong>Login is an event. Authentication is a system.</strong> A successful login only proves that one credential path functioned at a single moment in time. Real production authentication is a continuous state-management and access-control lifecycle that must maintain, evaluate, rotate, revoke, and recover trust over time.
                </p>
              </div>
            </div>
          </div>

          {/* Body Content */}
          <div className="prose-custom mt-12 space-y-12 text-[1.0625rem] leading-[1.8] text-ink/90">
            {/* Section 1 */}
            <section className="space-y-5">
              <h2 className="font-display text-2xl font-bold tracking-tight text-ink sm:text-3xl">
                The Login Screen Is the Easy Part
              </h2>
              <p>A login form is deceptively reassuring.</p>
              <p>
                You enter an email. You enter a password. You click Sign in. The server accepts the credentials and redirects you to the dashboard.
              </p>
              <p>From the outside, everything looks correct.</p>
              <p>
                But that flow only answers one question: <strong className="text-ink">Can these credentials successfully create an authenticated state?</strong>
              </p>
              <p>It doesn&apos;t answer what happens afterward:</p>
              <ul className="list-disc pl-6 space-y-2 text-ink/80 text-base">
                <li>What happens when the same account opens another browser?</li>
                <li>What happens when the session expires?</li>
                <li>What happens when the user clicks &ldquo;Log out of all devices&rdquo;?</li>
                <li>What happens after a password reset?</li>
                <li>What happens if an old credential is stolen?</li>
                <li>What happens when a protected API receives a request from a session that should no longer exist?</li>
              </ul>
              <p>
                Those are authentication questions too. And they are usually where the most critical production bugs and security holes hide.
              </p>
            </section>

            <hr className="border-ink/10" />

            {/* Section 2: Visual 1 - The Lifecycle */}
            <section className="space-y-6">
              <div>
                <span className="font-mono text-xs uppercase tracking-widest text-accent font-bold">
                  ARCHITECTURE FRAMEWORK
                </span>
                <h2 className="mt-1 font-display text-2xl font-bold tracking-tight text-ink sm:text-3xl">
                  A Login Success Is Only the Beginning
                </h2>
              </div>
              <p>
                The common mistake is treating authentication as a screen. A better engineering mental model is a complete lifecycle:
              </p>

              {/* Visual 1: Authentication Lifecycle Diagram */}
              <div className="rounded-[24px] border border-ink/10 bg-white/80 p-6 shadow-sm sm:p-8">
                <div className="flex items-center justify-between border-b border-ink/10 pb-4">
                  <span className="font-mono text-xs font-bold uppercase tracking-wider text-accent">
                    VISUAL 01 — THE COMPLETE AUTHENTICATION LIFECYCLE
                  </span>
                  <span className="font-mono text-[11px] text-muted-foreground">Continuous State Machine</span>
                </div>

                <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
                  {[
                    { step: "01", name: "VERIFY", desc: "Validate identity against salt, hash, OAuth provider, or WebAuthn.", tag: "Entry" },
                    { step: "02", name: "ISSUE", desc: "Mint cryptographically secure session ID or scoped token pair.", tag: "Entry" },
                    { step: "03", name: "STORE", desc: "Persist session state in database, Redis, or signed HTTP-only cookie.", tag: "Persistence" },
                    { step: "04", name: "VALIDATE", desc: "Check identity, TTL, and revocation on every protected route.", tag: "Every Request", highlight: true },
                    { step: "05", name: "ROTATE", desc: "Exchange refresh tokens atomically and detect reuse attacks.", tag: "Background" },
                    { step: "06", name: "REVOKE", desc: "Invalidate server-side session across devices on demand.", tag: "Boundary", highlight: true },
                    { step: "07", name: "RECOVER", desc: "Reset credentials and terminate existing active access.", tag: "Trust Change" },
                    { step: "08", name: "ABUSE", desc: "Throttle repeated failed attempts and alert on anomalies.", tag: "Protection" },
                  ].map((item) => (
                    <div
                      key={item.step}
                      className={`rounded-xl border p-4 transition ${
                        item.highlight
                          ? "border-accent/30 bg-accent/[0.04]"
                          : "border-ink/10 bg-paper/50"
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-mono text-xs font-bold text-accent">{item.step}</span>
                        <span className="rounded-md border border-ink/10 bg-white px-2 py-0.5 font-mono text-[9px] uppercase font-semibold text-ink/70">
                          {item.tag}
                        </span>
                      </div>
                      <h4 className="mt-2 font-display text-base font-bold text-ink">{item.name}</h4>
                      <p className="mt-1 text-xs text-ink/80 leading-relaxed">{item.desc}</p>
                    </div>
                  ))}
                </div>

                <div className="mt-6 rounded-xl border border-ink/10 bg-ink/[0.02] p-4 text-center font-mono text-xs sm:text-sm font-semibold text-ink">
                  VERIFY → ISSUE → STORE → VALIDATE ⇄ ROTATE → REVOKE → RECOVER
                </div>
                <p className="mt-2 text-center font-mono text-xs text-muted-foreground">
                  Login is merely an entry gate into steps 01 &amp; 02. The real system runs continuously from step 03 through 08.
                </p>
              </div>

              <p>
                Once credentials are verified, the system must establish some representation of access. That access then needs rules:
              </p>
              <div className="grid gap-3 sm:grid-cols-2 text-sm">
                <div className="rounded-xl border border-ink/10 bg-white/60 p-4">
                  <p className="font-bold text-ink">Who does this session belong to?</p>
                  <p className="text-muted-foreground text-xs mt-1">Can the server uniquely identify the subject on every call?</p>
                </div>
                <div className="rounded-xl border border-ink/10 bg-white/60 p-4">
                  <p className="font-bold text-ink">Is this session still valid right now?</p>
                  <p className="text-muted-foreground text-xs mt-1">Has it crossed its natural TTL or been explicitly killed?</p>
                </div>
                <div className="rounded-xl border border-ink/10 bg-white/60 p-4">
                  <p className="font-bold text-ink">Can it be revoked across all devices?</p>
                  <p className="text-muted-foreground text-xs mt-1">Can a user click &apos;Logout Everywhere&apos; and actually enforce it?</p>
                </div>
                <div className="rounded-xl border border-ink/10 bg-white/60 p-4">
                  <p className="font-bold text-ink">What happens during recovery?</p>
                  <p className="text-muted-foreground text-xs mt-1">Does changing a password invalidate existing sessions or leave them open?</p>
                </div>
              </div>

              <p>
                This changes how I review an authentication implementation. Instead of asking: <em className="text-ink font-serif">&ldquo;Does login work?&rdquo;</em>, I ask: <strong className="text-ink">&ldquo;Can I explain the complete lifecycle of access?&rdquo;</strong>
              </p>
            </section>

            <hr className="border-ink/10" />

            {/* Section 3: Visual 2 - Happy Path vs Failure Paths */}
            <section className="space-y-6">
              <div>
                <span className="font-mono text-xs uppercase tracking-widest text-accent font-bold">
                  TESTING BLINDSPOTS
                </span>
                <h2 className="mt-1 font-display text-2xl font-bold tracking-tight text-ink sm:text-3xl">
                  The Happy Path Hides Most of the System
                </h2>
              </div>
              <p>
                Most authentication tests naturally follow the path of least resistance:
              </p>

              {/* Visual 2: Happy Path vs Reality Flow */}
              <div className="grid gap-6 sm:grid-cols-2">
                {/* The Happy Path Illusion */}
                <div className="rounded-2xl border border-rose-500/20 bg-rose-500/[0.03] p-6 shadow-sm">
                  <div className="flex items-center gap-2 font-mono text-xs font-bold uppercase tracking-wider text-rose-700">
                    <XCircle className="h-4 w-4" />
                    <span>The Happy-Path Illusion</span>
                  </div>
                  <p className="mt-2 text-xs text-muted-foreground">
                    How most tutorials and quick tests evaluate authentication:
                  </p>
                  <div className="mt-4 space-y-2 font-mono text-xs">
                    <div className="rounded-lg border border-rose-500/20 bg-white/80 p-2.5">
                      1. Enter email &amp; password
                    </div>
                    <div className="text-center text-rose-600">↓</div>
                    <div className="rounded-lg border border-rose-500/20 bg-white/80 p-2.5 text-emerald-700 font-bold">
                      2. Login succeeds (200 OK)
                    </div>
                    <div className="text-center text-rose-600">↓</div>
                    <div className="rounded-lg border border-rose-500/20 bg-white/80 p-2.5">
                      3. Open dashboard &amp; render user
                    </div>
                    <div className="text-center text-rose-600">↓</div>
                    <div className="rounded-lg border border-rose-500/30 bg-rose-500/10 p-2.5 text-center font-bold text-rose-800">
                      &ldquo;Authentication is done&rdquo; (False)
                    </div>
                  </div>
                </div>

                {/* The Reality */}
                <div className="rounded-2xl border border-emerald-500/20 bg-emerald-500/[0.03] p-6 shadow-sm">
                  <div className="flex items-center gap-2 font-mono text-xs font-bold uppercase tracking-wider text-emerald-700">
                    <CheckCircle2 className="h-4 w-4" />
                    <span>The Production Reality</span>
                  </div>
                  <p className="mt-2 text-xs text-muted-foreground">
                    Where the fragile assumptions and real security bugs actually emerge:
                  </p>
                  <div className="mt-4 space-y-2 font-mono text-xs">
                    <div className="rounded-lg border border-emerald-500/20 bg-white/80 p-2.5">
                      1. Login succeeds on Device A
                    </div>
                    <div className="text-center text-emerald-600">↓</div>
                    <div className="rounded-lg border border-emerald-500/20 bg-white/80 p-2.5">
                      2. Subsequent requests check server authority
                    </div>
                    <div className="text-center text-emerald-600">↓</div>
                    <div className="rounded-lg border border-emerald-500/20 bg-white/80 p-2.5">
                      3. Device B opens with separate session
                    </div>
                    <div className="text-center text-emerald-600">↓</div>
                    <div className="rounded-lg border border-emerald-500/20 bg-white/80 p-2.5">
                      4. Token expiry / rotation occurs
                    </div>
                    <div className="text-center text-emerald-600">↓</div>
                    <div className="rounded-lg border border-emerald-500/30 bg-emerald-500/10 p-2.5 text-emerald-900 font-bold">
                      5. Revoke Device B from Device A (401 Unauthorized)
                    </div>
                  </div>
                </div>
              </div>

              <p>
                The second sequence is where the architecture&apos;s true assumptions become visible.
              </p>
              <p>
                For example, suppose a user logs in successfully and receives a session. Later they click: <strong className="text-ink">&ldquo;Log out of all devices.&rdquo;</strong>
              </p>
              <p>
                The frontend can clear its local storage. The UI can redirect to <code className="font-mono text-xs bg-ink/5 px-1.5 py-0.5 rounded">/login</code>. The toast can announce &ldquo;Logged out successfully.&rdquo;
              </p>
              <p className="font-semibold text-accent">
                None of those things invalidate the session on the server.
              </p>
              <p>
                If the old session token or cookie can still authenticate a protected request, the interface is lying: the UI says one thing, but the authorization layer says another.
              </p>
            </section>

            <hr className="border-ink/10" />

            {/* Section 4: The Server Authority */}
            <section className="space-y-6">
              <h2 className="font-display text-2xl font-bold tracking-tight text-ink sm:text-3xl">
                The Server Has to Be the Authority
              </h2>
              <p>This is one of the most fundamental distinctions in authentication:</p>
              <blockquote className="rounded-2xl border-l-4 border-accent bg-accent/5 p-5 font-display text-lg italic text-ink sm:text-xl">
                &ldquo;Clearing client state is not the same thing as revoking server-side access.&rdquo;
              </blockquote>

              <p>Imagine two browsers using the same account:</p>

              {/* ASCII / Visual Flow of Multi-Device Revocation */}
              <div className="rounded-2xl border border-ink/15 bg-[#141311] p-6 text-zinc-200 shadow-xl font-mono text-xs sm:text-sm">
                <div className="flex items-center justify-between border-b border-zinc-800 pb-3 text-zinc-400">
                  <span>CROSS-DEVICE REVOCATION BOUNDARY</span>
                  <span className="text-accent font-bold">RFC ACCESS TEST</span>
                </div>
                <div className="mt-4 space-y-2 overflow-x-auto leading-relaxed">
                  <p className="text-zinc-400 font-bold">Browser A (Desktop)             Browser B (Laptop / Phone)</p>
                  <p className="text-zinc-500">│                                 │</p>
                  <p className="text-emerald-400">├── [Authenticated]               ├── [Authenticated]</p>
                  <p className="text-zinc-500">│                                 │</p>
                  <p className="text-amber-400">├── &quot;Revoke all sessions&quot; ────────► │</p>
                  <p className="text-zinc-500">│   │                             │</p>
                  <p className="text-accent">│   ▼                             │</p>
                  <p className="text-zinc-300">│   Server invalidates in DB/Redis│</p>
                  <p className="text-zinc-500">│                                 │</p>
                  <p className="text-zinc-300">│                                 ├── GET /api/user/profile</p>
                  <p className="text-zinc-500">│                                 │   ▼</p>
                  <p className="text-rose-400 font-bold">│                                 └── 401 Unauthorized (Blocked!)</p>
                </div>
              </div>

              <p>
                The critical part isn&apos;t that Browser B&apos;s UI changed. The critical part is that <strong className="text-ink">the server authoritatively rejected Browser B&apos;s old session</strong>.
              </p>
              <p>
                This is why authentication cannot be designed entirely from the frontend. A browser can display <span className="font-mono text-xs bg-ink/5 px-1.5 py-0.5 rounded">&ldquo;You are logged out&rdquo;</span>, but only the authorization layer can enforce <span className="font-mono text-xs bg-accent/10 text-accent px-1.5 py-0.5 rounded font-bold">&ldquo;This session is dead.&rdquo;</span>
              </p>

              <div className="rounded-xl border border-ink/15 bg-white/70 p-5 shadow-xs">
                <div className="flex items-center gap-2 font-mono text-xs font-bold uppercase tracking-wider text-accent">
                  <ShieldCheck className="h-4 w-4" />
                  <span>The Architectural Boundary</span>
                </div>
                <p className="mt-2 text-sm text-ink/85 leading-relaxed">
                  The client can forget a session. The server must decide whether that session still exists.
                </p>
              </div>
            </section>

            <hr className="border-ink/10" />

            {/* Section 5: Every Protected Request */}
            <section className="space-y-5">
              <h2 className="font-display text-2xl font-bold tracking-tight text-ink sm:text-3xl">
                Every Protected Request Needs a Reason to Be Trusted
              </h2>
              <p>
                Once authentication becomes a lifecycle, another question appears: <em>How does the application validate access after login?</em>
              </p>
              <p>
                A common architectural mistake is allowing the frontend to become the source of truth. For example:
              </p>
              <div className="rounded-xl border border-ink/10 bg-white/60 p-4 font-mono text-xs text-ink/80">
                Client state: <span className="text-accent font-bold">isAuthenticated = true</span>
              </div>
              <p>
                That state is useful for rendering UI buttons or hiding navigation links. It should <strong className="text-ink">never</strong> be the final authority for protected data or operations.
              </p>
              <p>The real boundary is the protected API endpoint. Conceptually:</p>

              <div className="rounded-2xl border border-ink/10 bg-white/70 p-5 shadow-xs">
                <div className="flex flex-wrap items-center gap-2 sm:gap-3 font-mono text-xs sm:text-sm font-semibold text-ink">
                  <span className="rounded-lg border border-ink/10 bg-paper px-2.5 py-1">Incoming Request</span>
                  <span>→</span>
                  <span className="rounded-lg border border-ink/10 bg-paper px-2.5 py-1">Extract Token/Cookie</span>
                  <span>→</span>
                  <span className="rounded-lg border border-ink/10 bg-paper px-2.5 py-1">Lookup Session</span>
                  <span>→</span>
                  <span className="rounded-lg border border-accent/30 bg-accent/10 text-accent px-2.5 py-1">Check Expiry &amp; Revocation</span>
                  <span>→</span>
                  <span className="rounded-lg border border-ink/10 bg-paper px-2.5 py-1">Authorize</span>
                  <span>→</span>
                  <span className="rounded-lg border border-emerald-500/20 bg-emerald-500/10 text-emerald-800 px-2.5 py-1">Return Data</span>
                </div>
              </div>

              <p>
                The frontend can hide a page. The server must protect the data behind it.
              </p>
            </section>

            <hr className="border-ink/10" />

            {/* Section 6: Session Storage */}
            <section className="space-y-6">
              <h2 className="font-display text-2xl font-bold tracking-tight text-ink sm:text-3xl">
                Session Storage Is Part of Authentication
              </h2>
              <p>
                After verification comes issuance and storage. This is easy to overlook because the login flow makes the session feel like a single scalar value:
              </p>
              <div className="rounded-xl border border-ink/10 bg-ink/[0.03] p-3 text-center font-mono text-xs sm:text-sm font-bold text-ink">
                login() ──► session
              </div>
              <p>
                In reality, the system needs to define what that session represents and how it can later be evaluated. A robust session record conceptually contains:
              </p>

              <div className="grid gap-3 sm:grid-cols-2 text-xs font-mono">
                <div className="rounded-xl border border-ink/10 bg-white/70 p-3.5">
                  <span className="font-bold text-accent">sessionId: string</span>
                  <p className="text-muted-foreground mt-0.5 font-sans text-xs">Cryptographically random, high-entropy unique identifier.</p>
                </div>
                <div className="rounded-xl border border-ink/10 bg-white/70 p-3.5">
                  <span className="font-bold text-accent">userId: string</span>
                  <p className="text-muted-foreground mt-0.5 font-sans text-xs">Foreign key linking the session to the authenticated subject.</p>
                </div>
                <div className="rounded-xl border border-ink/10 bg-white/70 p-3.5">
                  <span className="font-bold text-accent">createdAt &amp; expiresAt: Date</span>
                  <p className="text-muted-foreground mt-0.5 font-sans text-xs">Absolute timestamps bounding session validity.</p>
                </div>
                <div className="rounded-xl border border-ink/10 bg-white/70 p-3.5">
                  <span className="font-bold text-accent">revokedAt: Date | null</span>
                  <p className="text-muted-foreground mt-0.5 font-sans text-xs">Timestamp recorded when access is terminated prematurely.</p>
                </div>
                <div className="rounded-xl border border-ink/10 bg-white/70 p-3.5">
                  <span className="font-bold text-accent">tokenVersion: number</span>
                  <p className="text-muted-foreground mt-0.5 font-sans text-xs">Global account epoch incremented on password changes.</p>
                </div>
                <div className="rounded-xl border border-ink/10 bg-white/70 p-3.5">
                  <span className="font-bold text-accent">deviceInfo &amp; ipAddress: string</span>
                  <p className="text-muted-foreground mt-0.5 font-sans text-xs">Context for user audit screens and anomaly detection.</p>
                </div>
              </div>

              <p>
                If a credential is only valid according to its creation timestamp and expiry timestamp, but there is no meaningful revocation mechanism, then &ldquo;log out everywhere&rdquo; becomes impossible to enforce server-side.
              </p>
              <p className="font-semibold text-ink">
                Storage isn&apos;t merely an implementation detail. Storage determines what questions your authentication system can answer.
              </p>
            </section>

            <hr className="border-ink/10" />

            {/* Section 7: Expiry vs Rotation */}
            <section className="space-y-6">
              <h2 className="font-display text-2xl font-bold tracking-tight text-ink sm:text-3xl">
                Expiry Answers &ldquo;How Long?&rdquo; Rotation Answers &ldquo;What Replaces It?&rdquo;
              </h2>
              <p>
                Every authentication system needs a lifetime. Without one, successful authentication can effectively become permanent authentication.
              </p>
              <p>
                A simple model looks like:
              </p>
              <div className="rounded-xl border border-ink/10 bg-paper p-4 font-mono text-xs sm:text-sm text-center font-bold text-ink">
                createdAt ─────────────────────────────► expiresAt (VALID)
              </div>
              <p>
                After <code className="font-mono text-xs bg-ink/5 px-1.5 py-0.5 rounded">expiresAt</code>, the credential must no longer establish access. But there is a crucial catch: <strong className="text-ink">A security rule that exists only in the data model isn&apos;t a security rule until the access path enforces it.</strong> If the session expired at 10:00 but an API continues accepting it at 10:15, then the expiry exists conceptually, but not operationally.
              </p>

              <h3 className="font-display text-xl font-bold text-ink mt-6">
                Rotation Is Different from Expiry
              </h3>
              <p>
                Expiration asks: <em>&ldquo;When should this credential stop being valid?&rdquo;</em>
                <br />
                Rotation asks: <em>&ldquo;Should this credential be replaced with a brand-new one?&rdquo;</em>
              </p>
              <div className="rounded-xl border border-ink/10 bg-white/70 p-4 font-mono text-xs sm:text-sm text-ink">
                Credential A ──(refresh)──► Credential B (Issued) ──► Credential A marked revoked
              </div>
              <p>
                If refresh credentials can be reused indefinitely, the compromise window explodes. Rotating tokens ensures that if a token is intercepted, either the legitimate user or the attacker will trigger reuse detection, invalidating the entire family.
              </p>
            </section>

            <hr className="border-ink/10" />

            {/* Section 8: Visual 3 - Revocation and Cross-Browser Test */}
            <section className="space-y-6">
              <div>
                <span className="font-mono text-xs uppercase tracking-widest text-accent font-bold">
                  THE CRUCIAL BOUNDARY
                </span>
                <h2 className="mt-1 font-display text-2xl font-bold tracking-tight text-ink sm:text-3xl">
                  Revocation Is Where Authentication Becomes a System
                </h2>
              </div>
              <p>
                Expiry is predictable. <strong>Revocation is intentional.</strong> That is the difference.
              </p>
              <p>
                A session might be completely healthy according to its expiry timestamp, but still needs to become invalid immediately:
              </p>
              <ul className="list-disc pl-6 space-y-1 text-base text-ink/80">
                <li>the user clicks &ldquo;Log out of all devices&rdquo;,</li>
                <li>a password is reset,</li>
                <li>suspicious anomaly activity is detected,</li>
                <li>an administrator disables access,</li>
                <li>or a credential is believed to be compromised.</li>
              </ul>

              {/* Before / After Comparison */}
              <div className="grid gap-4 sm:grid-cols-2 my-6">
                <div className="rounded-2xl border border-ink/10 bg-white/70 p-5 shadow-sm">
                  <p className="font-mono text-xs font-bold uppercase tracking-wider text-muted-foreground">
                    Before Revocation
                  </p>
                  <div className="mt-3 font-mono text-xs space-y-1 text-ink/80">
                    <p>Browser B Session: Active</p>
                    <p className="text-emerald-700 font-bold">GET /api/private ──► 200 OK</p>
                    <p className="text-muted-foreground text-[11px]">Valid data payload returned.</p>
                  </div>
                </div>

                <div className="rounded-2xl border border-rose-500/20 bg-rose-500/[0.04] p-5 shadow-sm">
                  <p className="font-mono text-xs font-bold uppercase tracking-wider text-rose-700">
                    After Revocation (From Browser A)
                  </p>
                  <div className="mt-3 font-mono text-xs space-y-1 text-ink/80">
                    <p>Browser B Session: Invalidated in Store</p>
                    <p className="text-rose-600 font-bold">GET /api/private ──► 401 Unauthorized</p>
                    <p className="text-rose-800 text-[11px] font-semibold">The server decisively rejects the old state.</p>
                  </div>
                </div>
              </div>

              <h3 className="font-display text-xl font-bold text-ink">
                VISUAL 03 — The Cross-Browser Revocation Test
              </h3>
              <p>
                The strongest practical test to verify any authentication implementation is simple:
              </p>

              <div className="space-y-3 rounded-2xl border border-ink/10 bg-white/80 p-5 shadow-sm sm:p-6">
                <div className="flex items-start gap-3">
                  <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-accent font-mono text-xs font-bold text-white">1</span>
                  <p className="text-sm text-ink/85">Open Browser A and Browser B. Authenticate into the same user account on both.</p>
                </div>
                <div className="flex items-start gap-3">
                  <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-accent font-mono text-xs font-bold text-white">2</span>
                  <p className="text-sm text-ink/85">From Browser A, trigger <strong>&ldquo;Revoke all sessions&rdquo;</strong> (or change password).</p>
                </div>
                <div className="flex items-start gap-3">
                  <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-accent font-mono text-xs font-bold text-white">3</span>
                  <p className="text-sm text-ink/85">In Browser B, without manually clicking logout, make a protected request.</p>
                </div>
                <div className="flex items-start gap-3">
                  <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-accent font-mono text-xs font-bold text-white">4</span>
                  <p className="text-sm text-ink/85 font-bold text-emerald-800">Verify that the server rejects Browser B with 401 Unauthorized.</p>
                </div>
              </div>

              <p className="text-sm text-muted-foreground">
                This test is valuable because it crosses a system boundary. You are no longer testing whether a button works. You are testing whether state changed in the authority that controls access.
              </p>

              {/* Code Snippet for Session Validation */}
              <div className="mt-8 space-y-4">
                <h3 className="font-display text-lg font-bold text-ink">
                  How Server-Side Validation Looks in Code
                </h3>
                <p className="text-sm text-ink/80">
                  Here is an architectural pattern for validating session state and revocation on every protected route:
                </p>
                <CodeBlock
                  id="session-validation"
                  label="server/auth/validate-session.ts"
                  code={sessionValidationCode}
                  copied={codeCopied === "session-validation"}
                  onCopy={() => copyCode("session-validation", sessionValidationCode)}
                />
              </div>
            </section>

            <hr className="border-ink/10" />

            {/* Section 9: Recovery & Abuse */}
            <section className="space-y-6">
              <h2 className="font-display text-2xl font-bold tracking-tight text-ink sm:text-3xl">
                Recovery and Abuse Protection Belong in the Lifecycle Too
              </h2>
              <p>
                Password recovery is often treated as an isolated feature. From an authentication perspective, it isn&apos;t.
              </p>
              <p>
                Suppose an account has three active sessions: laptop, phone, and office desktop. The user suspects their password was compromised and resets it.
              </p>
              <p className="font-display text-lg italic text-ink">
                What should happen to those three active sessions?
              </p>
              <p>
                That is not merely a password-management question. It is an access-control question. When the user&apos;s trust relationship changes, which existing credentials should stop being trusted?
              </p>
              <div className="rounded-xl border border-ink/10 bg-paper p-4 font-mono text-xs sm:text-sm text-center text-ink">
                Reset Password ──► Invalidate Active Sessions ──► Revoke Refresh Tokens ──► Burn Recovery Token
              </div>

              <h3 className="font-display text-xl font-bold text-ink mt-8">
                Abuse Protection: Designing for Failure
              </h3>
              <p>
                There is another failure mode that is easy to miss because it never involves a successful login: <strong>Repeated authentication attempts</strong>.
              </p>
              <div className="rounded-xl border border-ink/10 bg-white/70 p-4 font-mono text-xs text-rose-700">
                Attempt 1 → failure &nbsp;|&nbsp; Attempt 2 → failure &nbsp;|&nbsp; Attempt 3 → failure &nbsp;|&nbsp; Attempt 4 → failure ...
              </div>
              <p>
                If the authentication endpoint has no abuse protection, the system can be compromised through the login path even if successful logins are handled securely. Authentication must define its behavior for failure, not only success:
              </p>
              <ul className="list-disc pl-6 space-y-1 text-base text-ink/80">
                <li>IP-level and account-level rate limiting,</li>
                <li>Exponential backoff and CAPTCHA thresholds,</li>
                <li>Audit logging and abnormal geolocation alerts.</li>
              </ul>
            </section>

            <hr className="border-ink/10" />

            {/* Section 10: Visual 4 - The 6 Questions Review Framework */}
            <section className="space-y-6">
              <div>
                <span className="font-mono text-xs uppercase tracking-widest text-accent font-bold">
                  DECISION FRAMEWORK
                </span>
                <h2 className="mt-1 font-display text-2xl font-bold tracking-tight text-ink sm:text-3xl">
                  VISUAL 04 — The Six Questions for an Authentication Review
                </h2>
              </div>
              <p>
                Before approving an authentication implementation, run it through these six core questions:
              </p>

              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {[
                  {
                    num: "01",
                    title: "Verification",
                    icon: Key,
                    question: "How is identity verified? What constitutes authentic success? Trace past the login form.",
                  },
                  {
                    num: "02",
                    title: "Storage",
                    icon: Database,
                    question: "Where is session state stored? Can the server authoritatively query if it remains valid?",
                  },
                  {
                    num: "03",
                    title: "Validation",
                    icon: Server,
                    question: "How does every protected route prove access? Is the server checking state or assuming?",
                  },
                  {
                    num: "04",
                    title: "Expiry",
                    icon: Clock,
                    question: "When does access expire or rotate? Does every protected endpoint respect that boundary?",
                  },
                  {
                    num: "05",
                    title: "Revocation",
                    icon: LogOut,
                    question: "How is access removed across devices on demand? Can you prove it with a second-session test?",
                  },
                  {
                    num: "06",
                    title: "Recovery & Abuse",
                    icon: LifeBuoy,
                    question: "Does password recovery terminate existing access? Are brute-force attempts throttled?",
                  },
                ].map((item) => (
                  <div key={item.num} className="rounded-2xl border border-ink/10 bg-white/70 p-5 shadow-sm">
                    <div className="flex items-center justify-between">
                      <span className="font-mono text-xs font-bold text-accent">{item.num}</span>
                      <item.icon className="h-4 w-4 text-muted-foreground" />
                    </div>
                    <h3 className="mt-2 font-display text-lg font-bold text-ink">{item.title}</h3>
                    <p className="mt-2 text-xs text-ink/80 leading-relaxed">{item.question}</p>
                  </div>
                ))}
              </div>
            </section>

            <hr className="border-ink/10" />

            {/* Section 11: Guarantees over Architecture */}
            <section className="space-y-5">
              <h2 className="font-display text-2xl font-bold tracking-tight text-ink sm:text-3xl">
                The Architecture Matters Less Than the Guarantees
              </h2>
              <p>
                There are many ways to implement authentication: Redis sessions, database-backed tokens, stateless JWTs with short expiry, OAuth 2.0 PKCE, or WebAuthn passkeys.
              </p>
              <p className="font-semibold text-accent">
                The technology can change. The required guarantees do not.
              </p>
              <p>
                It is easy to get lost in library debates: &ldquo;Use X instead of Y.&rdquo; But a stronger architecture review starts one level higher:
              </p>
              <div className="rounded-2xl border border-ink/10 bg-white/80 p-6 shadow-sm">
                <p className="font-mono text-xs uppercase tracking-wider text-accent font-bold mb-3">
                  Core Guarantees Checklist
                </p>
                <div className="grid gap-2 text-sm text-ink/85 sm:grid-cols-2 font-mono text-xs">
                  <p>✓ Can you validate access on every request?</p>
                  <p>✓ Can you expire access reliably?</p>
                  <p>✓ Can you revoke sessions immediately across devices?</p>
                  <p>✓ Can you identify which session is active?</p>
                  <p>✓ Can you safely handle password recovery?</p>
                  <p>✓ Can you defend against automated brute-force?</p>
                </div>
              </div>
              <p>
                If the answer is yes, the system has a dependable foundation. If the answer is no, changing libraries won&apos;t fix the structural flaw.
              </p>
            </section>

            <hr className="border-ink/10" />

            {/* Section 12: Practical Audit & State Machine */}
            <section className="space-y-6">
              <div>
                <span className="font-mono text-xs uppercase tracking-widest text-accent font-bold">
                  PRE-FLIGHT REVIEW
                </span>
                <h2 className="mt-1 font-display text-2xl font-bold tracking-tight text-ink sm:text-3xl">
                  A Practical Audit Before Shipping
                </h2>
              </div>
              <p>
                Before declaring authentication ready for production, walk through the complete lifecycle checklist:
              </p>

              <div className="grid gap-4 sm:grid-cols-2">
                {auditChecklist.map((group) => (
                  <div key={group.category} className="rounded-2xl border border-ink/10 bg-white/60 p-5 shadow-sm">
                    <h3 className="font-display text-base font-bold text-ink flex items-center gap-2">
                      <span className="h-2 w-2 rounded-full bg-accent" />
                      {group.category}
                    </h3>
                    <ul className="mt-3 space-y-2 text-xs text-ink/80">
                      {group.checks.map((c, i) => (
                        <li key={i} className="flex items-start gap-2">
                          <span className="text-accent font-bold">›</span>
                          <span>{c}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>

              {/* State Machine Diagram */}
              <div className="my-8 rounded-2xl border border-ink/15 bg-[#141311] p-6 text-zinc-200 shadow-xl">
                <div className="flex items-center justify-between border-b border-zinc-800 pb-3 text-zinc-400 font-mono text-xs">
                  <span>THE BIGGER MENTAL MODEL</span>
                  <span className="text-accent">STATE MACHINE</span>
                </div>
                <pre className="mt-4 overflow-x-auto font-mono text-xs leading-relaxed text-zinc-300">
{`┌───────────┐
│  VERIFY   │ ──► Confirms credentials & identity
└─────┬─────┘
      ▼
┌───────────┐
│   ISSUE   │ ──► Mints session record & cryptotokens
└─────┬─────┘
      ▼
┌───────────┐
│   STORE   │ ──► Authoritative database/cache state
└─────┬─────┘
      ▼
┌───────────┐
│ VALIDATE  │ ──► Enforced on every single request
└─────┬─────┘
      ▼
┌────────┴────────┐
▼                 ▼
ROTATE          REVOKE ──► Immediate multi-device invalidation
│                 │
└────────┬────────┘
         ▼
      RECOVER ──► Password reset clears existing access
         │
         └────► Re-enters VERIFY`}
                </pre>
              </div>

              {/* Summary Conclusion Box */}
              <div className="my-10 rounded-2xl border border-ink/15 bg-white/80 p-6 text-center shadow-sm sm:p-8">
                <p className="font-mono text-xs uppercase tracking-widest text-accent mb-2">Final Takeaway</p>
                <h3 className="font-display text-2xl sm:text-3xl font-bold text-ink">
                  &ldquo;A login screen proves that authentication started. It does not prove that authentication works.&rdquo;
                </h3>
                <p className="mt-3 text-sm text-muted-foreground max-w-xl mx-auto">
                  Review the entire lifecycle: verify, issue, store, validate, expire, rotate, revoke, and recover. Don&apos;t ship a form. Ship a testable authentication lifecycle.
                </p>
              </div>
            </section>

            <hr className="border-ink/10" />

            {/* Section 13: FAQ */}
            <section className="space-y-6 pt-4">
              <div className="flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-accent">
                <HelpCircle className="h-4 w-4" />
                <span>FREQUENTLY ASKED QUESTIONS</span>
              </div>
              <h2 className="font-display text-2xl font-bold tracking-tight text-ink sm:text-3xl">
                Frequently Asked Questions
              </h2>

              <div className="space-y-4">
                {faqItems.map((faq, idx) => (
                  <div key={idx} className="rounded-xl border border-ink/10 bg-white/60 p-5 shadow-sm">
                    <h3 className="font-display text-base font-bold text-ink sm:text-lg">{faq.q}</h3>
                    <p className="mt-2 text-xs sm:text-sm text-ink/80 leading-relaxed">{faq.a}</p>
                  </div>
                ))}
              </div>
            </section>
          </div>

          {/* Author Bio */}
          <ArticleAuthorBio />

          {/* Footer Navigation to other articles */}
          <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-ink/10 pt-8 font-mono text-xs sm:flex-row">
            <Link
              href="/"
              className="group inline-flex items-center gap-2 font-bold text-ink/75 transition-colors hover:text-accent"
            >
              <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
              <span>Back to Home</span>
            </Link>

            <div className="flex flex-col sm:flex-row items-center gap-4">
              <Link
                href="/react-ui-buggy-remembers-too-much"
                className="group inline-flex items-center gap-1 font-bold text-accent hover:underline"
              >
                <span>React State Architecture -&gt;</span>
              </Link>
              <Link
                href="/react-page-slow-database-query-bottleneck"
                className="group inline-flex items-center gap-1 font-bold text-accent hover:underline"
              >
                <span>Database Query Bottleneck -&gt;</span>
              </Link>
            </div>
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
