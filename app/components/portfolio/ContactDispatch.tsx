"use client";

import { useRef, useState } from "react";
import { motion } from "framer-motion";
import { AlertCircle } from "lucide-react";
import { Ambient } from "@/components/portfolio/Ambient";
import { profile } from "@/content/portfolio";
import { cn } from "@/lib/utils";

type Field = "name" | "email" | "message";
type Phase = "idle" | "sending" | "completed" | "error";
type FieldMap = Partial<Record<Field, string>>;
type TouchedMap = Record<Field, boolean>;

const pipeline = [
  "> validating form...",
  "> compiling message...",
  "> establishing secure connection...",
  "> dispatching message...",
];
const failures = ["> transmission failed", "> connection interrupted", "> please retry"];
const wait = (ms: number) => new Promise<void>((resolve) => setTimeout(resolve, ms));

export function ContactDispatch() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [errors, setErrors] = useState<FieldMap>({});
  const [touched, setTouched] = useState<TouchedMap>({ name: false, email: false, message: false });
  const [phase, setPhase] = useState<Phase>("idle");
  const [lines, setLines] = useState<string[]>([]);
  const [reference, setReference] = useState("");
  const nameRef = useRef<HTMLInputElement>(null);
  const submitRef = useRef<HTMLButtonElement>(null);
  const successRef = useRef<HTMLDivElement>(null);

  const valueFor = (field: Field) => field === "name" ? name : field === "email" ? email : message;
  const validate = (field: Field, value: string) => {
    let error = "";
    if (field === "name") {
      if (!value.trim()) error = "Name is required.";
      else if (value.trim().length < 2) error = "Name must be at least 2 characters.";
    } else if (field === "email") {
      if (!value.trim()) error = "Email is required.";
      else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) error = "Please enter a valid email address.";
    } else if (!value.trim()) error = "Message is required.";
    else if (value.trim().length < 10) error = "Message must be at least 10 characters.";
    setErrors((current) => ({ ...current, [field]: error }));
    return !error;
  };

  const change = (field: Field, value: string) => {
    if (field === "name") setName(value);
    else if (field === "email") setEmail(value);
    else setMessage(value);
    if (touched[field]) validate(field, value);
  };

  const blur = (field: Field) => {
    setTouched((current) => ({ ...current, [field]: true }));
    validate(field, valueFor(field));
  };

  const typeLine = async (line: string, reduced: boolean) => {
    if (reduced) {
      setLines((current) => [...current, line]);
      return;
    }
    setLines((current) => [...current, ""]);
    for (let index = 1; index <= line.length; index++) {
      await wait(12);
      setLines((current) => {
        const next = [...current];
        next[next.length - 1] = line.slice(0, index);
        return next;
      });
    }
    await wait(70);
  };

  const typeAll = async (copy: string[], reduced: boolean) => {
    for (const line of copy) await typeLine(line, reduced);
  };

  const submit = async (event: React.FormEvent) => {
    event.preventDefault();
    setTouched({ name: true, email: true, message: true });
    if (![validate("name", name), validate("email", email), validate("message", message)].every(Boolean)) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    setPhase("sending");
    setLines([]);
    try {
      const request = fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, message }),
      });
      const [, response] = await Promise.all([typeAll(pipeline, reduced), request]);
      if (!response.ok) throw new Error("Message dispatch failed");
      await typeLine("> message delivered successfully ✓", reduced);
      setReference(`MSG-${Math.floor(1000 + Math.random() * 9000)}`);
      setPhase("completed");
      requestAnimationFrame(() => successRef.current?.focus());
    } catch (error: unknown) {
      console.error(error);
      await typeAll(failures, reduced);
      setPhase("error");
      requestAnimationFrame(() => submitRef.current?.focus());
    }
  };

  const reset = () => {
    setName(""); setEmail(""); setMessage("");
    setTouched({ name: false, email: false, message: false });
    setErrors({}); setLines([]); setReference(""); setPhase("idle");
    requestAnimationFrame(() => nameRef.current?.focus());
  };

  const linkClass = "rounded-full border border-ink/14 bg-white/72 px-5 py-3 shadow-[0_12px_28px_-24px_var(--ink)] transition hover:border-ink/30 hover:bg-white hover:text-ink";
  const inputClass = "mt-2 w-full rounded-[16px] border border-ink/12 bg-white/86 px-5 py-4 font-mono text-sm text-ink shadow-inner outline-none placeholder:text-ink/32 transition focus:border-vermillion/55 focus:bg-white focus:ring-4 focus:ring-vermillion/10 disabled:cursor-not-allowed disabled:opacity-65";
  const labelClass = "font-mono text-[11px] font-semibold tracking-[0.25em] text-ink/58";
  const sending = phase === "sending";
  const canSubmit = phase === "idle" || phase === "error";

  const errorFor = (field: Field) => touched[field] && errors[field] ? (
    <motion.span initial={{ opacity: 0, y: -4 }} animate={{ opacity: 1, y: 0 }} className="mt-1.5 flex items-center gap-1 font-mono text-[10px] tracking-wider text-vermillion">
      <AlertCircle className="h-3.5 w-3.5" />{errors[field]}
    </motion.span>
  ) : null;

  return (
    <section id="contact" className="relative overflow-hidden border-t border-border bg-paper px-6 py-16 md:px-12 md:py-24">
      <Ambient className="opacity-25" />
      <div className="relative z-10 mx-auto max-w-[1360px]">
        <div className="mb-8 flex items-baseline gap-6 md:mb-10 [&>span:first-child]:font-semibold [&>span:first-child]:text-vermillion [&>span:last-child]:font-semibold [&>span:last-child]:tracking-[0.18em] [&>span:last-child]:text-ink/55">
          <span className="font-mono text-xs tracking-[0.25em] text-accent">⑦ CONTACT</span><span className="h-px flex-1 bg-border" /><span className="hidden font-mono text-xs text-muted-foreground md:inline">REMOTE FRIENDLY</span>
        </div>
        <div className="grid gap-8 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <p className="font-mono text-[11px] font-semibold uppercase tracking-[0.28em] text-vermillion">Start a conversation</p>
            <h2 className="mt-3 font-display text-4xl font-medium leading-[1.02] tracking-tight md:text-6xl">Let&apos;s build something useful.</h2>
            <p className="mt-5 max-w-md text-[15px] leading-[1.7] text-foreground/75">Send a project note, role opportunity, or collaboration idea. The form drafts a mail-ready message and keeps the contact details close.</p>
            <div className="mt-8 grid gap-3 font-mono text-[11px] leading-relaxed text-ink/68">
              <a href={`mailto:${profile.email}`} className={linkClass}>{profile.email}</a>
              <a href={`https://${profile.github}`} target="_blank" rel="noreferrer" className={linkClass}>{profile.github}</a>
              <a href={`https://${profile.linkedin}`} target="_blank" rel="noreferrer" className={linkClass}>{profile.linkedin}</a>
            </div>
          </div>
          <div className="relative grid gap-4 lg:col-span-7 lg:grid-cols-5">
            <form onSubmit={submit} noValidate aria-busy={sending} className="flex min-h-[570px] flex-col justify-between rounded-[22px] border border-ink/12 bg-white/78 p-5 shadow-[0_22px_56px_-40px_var(--ink)] md:p-6 lg:col-span-3">
              {phase === "completed" ? (
                <motion.div ref={successRef} tabIndex={-1} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.42, ease: [0.16, 1, 0.3, 1] }} className="flex flex-1 flex-col items-start justify-center outline-none" role="status">
                  <p className={labelClass}>MESSAGE DISPATCHED</p>
                  <h3 className="mt-5 font-display text-3xl font-medium text-ink">Message sent successfully.</h3>
                  <p className="mt-3 max-w-sm text-[15px] leading-relaxed text-foreground/70">Thanks for reaching out. I&apos;ll get back to you soon.</p>
                  <p className="mt-6 font-mono text-[10px] tracking-[0.2em] text-vermillion">REF: {reference}</p>
                  <button type="button" onClick={reset} className="mt-8 flex h-[46px] w-full max-w-[260px] cursor-pointer items-center justify-center rounded-full border border-foreground/8 bg-[linear-gradient(145deg,color-mix(in_oklch,var(--foreground)_3%,transparent)_0%,color-mix(in_oklch,var(--foreground)_1%,transparent)_100%)] px-6 text-center font-mono text-[10px] font-bold uppercase leading-none tracking-widest text-muted-foreground shadow-[0_10px_30px_-10px_color-mix(in_oklch,var(--background)_50%,transparent),inset_0_1px_1px_color-mix(in_oklch,var(--foreground)_10%,transparent),inset_0_-1px_2px_color-mix(in_oklch,var(--background)_80%,transparent)] outline-none backdrop-blur-md transition-all duration-300 hover:border-foreground/20 hover:bg-[linear-gradient(145deg,color-mix(in_oklch,var(--foreground)_8%,transparent)_0%,color-mix(in_oklch,var(--foreground)_2%,transparent)_100%)] hover:text-foreground hover:shadow-[0_20px_40px_-10px_color-mix(in_oklch,var(--background)_70%,transparent),inset_0_1px_1px_color-mix(in_oklch,var(--foreground)_20%,transparent)] active:translate-y-px focus-visible:ring-4 focus-visible:ring-vermillion/15 sm:w-[260px] sm:text-xs">SEND ANOTHER MESSAGE</button>
                </motion.div>
              ) : (
                <motion.div initial={false} animate={{ opacity: 1 }} className="flex flex-1 flex-col justify-between">
                  <fieldset disabled={sending} className={cn("transition-opacity duration-300", sending && "opacity-70")}>
                    <label className="block"><span className={labelClass}>NAME</span><input ref={nameRef} value={name} onChange={(e) => change("name", e.target.value)} onBlur={() => blur("name")} className={cn(inputClass, touched.name && errors.name && "border-vermillion/60 focus:border-vermillion focus:ring-vermillion/10")} placeholder="Ada Lovelace" />{errorFor("name")}</label>
                    <label className="mt-5 block"><span className={labelClass}>EMAIL</span><input type="email" value={email} onChange={(e) => change("email", e.target.value)} onBlur={() => blur("email")} className={cn(inputClass, touched.email && errors.email && "border-vermillion/60 focus:border-vermillion focus:ring-vermillion/10")} placeholder="ada@example.com" />{errorFor("email")}</label>
                    <label className="relative mt-5 block"><span className={labelClass}>MESSAGE</span><textarea value={message} onChange={(e) => change("message", e.target.value)} onBlur={() => blur("message")} rows={5} className={cn(inputClass, "block w-full resize-none", touched.message && errors.message && "border-vermillion/60 focus:border-vermillion focus:ring-vermillion/10")} placeholder="Let's build something reliable." />{errorFor("message")}</label>
                  </fieldset>
                  <div className="relative mt-8 flex h-[54px] w-full items-center justify-center">
                    <motion.button ref={submitRef} type="submit" disabled={!canSubmit} aria-label={phase === "error" ? "Retry message" : sending ? "Sending message" : "Send message"} style={{ borderRadius: 9999 }} whileTap={{ scale: canSubmit ? 0.98 : 1 }} className={cn("flex h-[54px] w-full items-center justify-center gap-2.5 border-none bg-ink font-mono text-[12px] font-semibold tracking-[0.25em] text-paper shadow-[0_18px_38px_-22px_var(--ink)] outline-none", canSubmit ? "cursor-pointer transition-transform duration-200 hover:-translate-y-0.5 hover:bg-vermillion" : "cursor-not-allowed opacity-60")}>
                      {sending ? "SENDING..." : phase === "error" ? "RETRY MESSAGE" : "SEND MESSAGE"}{!sending && <SendIcon />}
                    </motion.button>
                  </div>
                </motion.div>
              )}
            </form>
            <Terminal phase={phase} lines={lines} reference={reference} name={name} email={email} message={message} />
          </div>
        </div>
      </div>
    </section>
  );
}

function SendIcon() {
  return <svg viewBox="0 0 24 24" className="h-3.5 w-3.5 fill-none stroke-current" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden><line x1="22" y1="2" x2="11" y2="13" /><polygon points="22 2 15 22 11 13 2 9 22 2" /></svg>;
}

function Terminal({ phase, lines, reference, name, email, message }: { phase: Phase; lines: string[]; reference: string; name: string; email: string; message: string }) {
  const sending = phase === "sending";
  return (
    <motion.aside animate={phase === "completed" ? { boxShadow: ["0 22px 56px -38px rgba(17,17,17,.8)", "0 0 34px rgba(150,119,70,.20)", "0 22px 56px -38px rgba(17,17,17,.8)"] } : {}} transition={{ duration: 1.1 }} className={cn("relative flex min-h-[340px] flex-col justify-between overflow-hidden rounded-[22px] border bg-ink p-5 font-mono text-[12px] leading-relaxed shadow-[0_22px_56px_-38px_var(--ink)] md:p-6 lg:col-span-2", phase === "completed" ? "border-vermillion/40" : "border-ink/85 text-paper")} aria-live="polite">
      <div>
        <div className="mb-5 flex gap-2" aria-hidden>
          {["var(--paper)", "var(--vermillion)", "color-mix(in oklch, var(--paper) 45%, transparent)"].map((color, index) => <motion.span key={color} className="h-2.5 w-2.5 rounded-full border border-white/10" style={{ backgroundColor: color }} animate={sending ? { opacity: [0.35, 1, 0.35], scale: [1, 1.12, 1] } : { opacity: phase === "idle" ? (index === 0 ? 1 : 0.25) : 0.8 }} transition={{ duration: 0.8, repeat: sending ? Infinity : 0, delay: index * 0.14 }} />)}
        </div>
        {phase === "idle" ? (
          <div><p><span className="text-vermillion">to:</span> <span className="text-paper/88">{profile.email}</span></p><p className="mt-4"><span className="text-vermillion">from:</span> {name || <span className="text-paper/50">awaiting input</span>}</p><p><span className="text-vermillion">reply:</span> {email || <span className="text-paper/50">awaiting input</span>}</p><p className="mt-4 whitespace-pre-wrap break-all text-paper/88"><span className="text-vermillion/70">body:</span> {message || <span className="text-paper/40">say something useful</span>}<span className="animate-caret ml-0.5 inline-block h-4 w-2 translate-y-0.5 bg-vermillion" /></p></div>
        ) : (
          <div className="flex flex-col gap-2 text-[11px]">{lines.map((line, index) => <p key={`${index}-${line}`} className={line.includes("successfully") ? "font-semibold text-vermillion" : failures.includes(line) ? "text-vermillion/70" : "text-paper/62"}>{line}{index === lines.length - 1 && sending && <span className="animate-caret ml-1 inline-block h-3.5 w-1.5 translate-y-0.5 bg-vermillion" />}</p>)}</div>
        )}
      </div>
      <div className={cn("mt-6 border-t border-white/10 pt-4 text-[10px] leading-relaxed", phase === "error" ? "text-vermillion/70" : phase === "completed" ? "text-vermillion/70" : "text-paper/50")}>{phase === "idle" ? "> Ready for input..." : sending ? "> Processing secure dispatch..." : phase === "completed" ? `> Delivery confirmed · ${reference}` : "> Dispatch paused. Retry available."}</div>
      {phase === "completed" && <motion.div initial={{ opacity: 0, x: -4, y: 4 }} animate={{ opacity: [0, 0.75, 0], x: 26, y: -26 }} transition={{ duration: 0.9, ease: "easeOut" }} className="pointer-events-none absolute right-6 top-8 text-vermillion" aria-hidden><SendIcon /></motion.div>}
    </motion.aside>
  );
}
