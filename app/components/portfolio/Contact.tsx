"use client";

import { useState } from "react";
import { profile } from "@/content/portfolio";
import { Ambient } from "@/components/portfolio/Ambient";

export function Contact() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [sent, setSent] = useState(false);

  const submit = (event: React.FormEvent) => {
    event.preventDefault();
    setSent(true);
  };

  const contactLinkClass =
    "rounded-full border border-ink/14 bg-white/72 px-5 py-3 shadow-[0_12px_28px_-24px_var(--ink)] transition hover:border-ink/30 hover:bg-white hover:text-ink";
  const inputClass =
    "mt-2 w-full rounded-[16px] border border-ink/12 bg-white/86 px-5 py-4 font-mono text-sm text-ink shadow-inner outline-none placeholder:text-ink/32 transition focus:border-olive/55 focus:bg-white focus:ring-4 focus:ring-olive/10";
  const labelClass = "font-mono text-[11px] font-semibold tracking-[0.25em] text-ink/58";

  return (
    <section id="contact" className="relative overflow-hidden border-t border-border bg-paper px-6 py-16 md:px-12 md:py-24">
      <Ambient className="opacity-25" />

      <div className="relative z-10 mx-auto max-w-[1360px]">
        <div className="mb-8 flex items-baseline gap-6 md:mb-10 [&>span:first-child]:font-semibold [&>span:first-child]:text-olive [&>span:last-child]:font-semibold [&>span:last-child]:tracking-[0.18em] [&>span:last-child]:text-ink/55">
          <span className="font-mono text-xs tracking-[0.25em] text-accent">â‘¦ CONTACT</span>
          <span className="h-px flex-1 bg-border" />
          <span className="hidden font-mono text-xs text-muted-foreground md:inline">REMOTE FRIENDLY</span>
        </div>

        <div className="grid gap-8 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <p className="font-mono text-[11px] font-semibold uppercase tracking-[0.28em] text-olive">Start a conversation</p>
            <h2 className="mt-3 font-display text-4xl font-medium leading-[1.02] tracking-tight md:text-6xl">
              Let&apos;s build something useful.
            </h2>
            <p className="mt-5 max-w-md text-[15px] leading-[1.7] text-foreground/75">
              Send a project note, role opportunity, or collaboration idea. The form drafts a mail-ready message and
              keeps the contact details close.
            </p>

            <div className="mt-8 grid gap-3 font-mono text-[11px] leading-relaxed text-ink/68">
              <a href={`mailto:${profile.email}`} className={contactLinkClass}>
                {profile.email}
              </a>
              <a
                href={`https://${profile.github}`}
                target="_blank"
                rel="noreferrer"
                className={contactLinkClass}
              >
                {profile.github}
              </a>
              <a
                href={`https://${profile.linkedin}`}
                target="_blank"
                rel="noreferrer"
                className={contactLinkClass}
              >
                {profile.linkedin}
              </a>
            </div>
          </div>

          <div className="grid gap-4 lg:col-span-7 lg:grid-cols-5">
            <form
              onSubmit={submit}
              className="rounded-[22px] border border-ink/12 bg-white/78 p-5 shadow-[0_22px_56px_-40px_var(--ink)] md:p-6 lg:col-span-3"
            >
              <label className="block">
                <span className={labelClass}>NAME</span>
                <input
                  value={name}
                  onChange={(event) => setName(event.target.value)}
                  required
                  className={inputClass}
                  placeholder="Ada Lovelace"
                />
              </label>

              <label className="mt-5 block">
                <span className={labelClass}>EMAIL</span>
                <input
                  type="email"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  required
                  className={inputClass}
                  placeholder="ada@example.com"
                />
              </label>

              <label className="mt-5 block">
                <span className={labelClass}>MESSAGE</span>
                <textarea
                  value={message}
                  onChange={(event) => setMessage(event.target.value)}
                  required
                  rows={5}
                  className={`${inputClass} resize-none`}
                  placeholder="Let's build something reliable."
                />
              </label>

              <button
                type="submit"
                className="mt-6 w-full rounded-full border border-ink bg-ink px-8 py-4 font-mono text-[12px] font-semibold tracking-[0.25em] text-paper shadow-[0_18px_38px_-22px_var(--ink)] transition hover:-translate-y-0.5 hover:bg-olive hover:text-paper hover:shadow-[0_24px_44px_-26px_var(--ink)]"
              >
                {sent ? "QUEUED" : "SEND MESSAGE"}
              </button>
            </form>

            <aside className="rounded-[22px] border border-ink/85 bg-ink p-5 font-mono text-[12px] leading-relaxed text-[#f7f1dd] shadow-[0_22px_56px_-38px_var(--ink)] md:p-6 lg:col-span-2">
              <div className="mb-5 flex gap-2">
                <span className="h-2.5 w-2.5 rounded-full bg-paper" />
                <span className="h-2.5 w-2.5 rounded-full bg-paper/25" />
                <span className="h-2.5 w-2.5 rounded-full bg-paper/25" />
              </div>
              <p>
                <span className="text-[#f59e0b]">to:</span>{" "}
                <span className="text-[#e7e0cc]">{profile.email}</span>
              </p>
              <p className="mt-4">
                <span className="text-[#84cc16]">from:</span>{" "}
                {name || <span className="text-[#d8d0bd]/70">awaiting input</span>}
              </p>
              <p>
                <span className="text-[#38bdf8]">reply:</span>{" "}
                {email || <span className="text-[#d8d0bd]/70">awaiting input</span>}
              </p>
              <p className="mt-4 whitespace-pre-wrap">
                <span className="text-[#fb7185]">body:</span>{" "}
                {message || <span className="text-[#f7f1dd]/78">say something useful</span>}
                <span className="animate-caret ml-0.5 inline-block h-4 w-2 translate-y-0.5 bg-[#facc15]" />
              </p>
              {sent && <p className="mt-6 text-[#84cc16]">Message queued. Expect a reply within 48 hours.</p>}
            </aside>
          </div>
        </div>
      </div>
    </section>
  );
}
