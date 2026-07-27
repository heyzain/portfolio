"use client";

import { useState, useEffect, useRef } from "react";
import { profile } from "@/content/portfolio";
import { Ambient } from "@/components/portfolio/Ambient";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "sonner";
import { AlertCircle } from "lucide-react";
import { cn } from "@/lib/utils";

interface ValidationErrors {
  name?: string;
  email?: string;
  message?: string;
}

interface TouchedFields {
  name: boolean;
  email: boolean;
  message: boolean;
}

type SubmissionPhase =
  | "idle"
  | "sending"
  | "gliding"
  | "processing"
  | "completed"
  | "error"
  | "resetting";

export function Contact() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  
  const [errors, setErrors] = useState<ValidationErrors>({});
  const [touched, setTouched] = useState<TouchedFields>({
    name: false,
    email: false,
    message: false,
  });

  const [phase, setPhase] = useState<SubmissionPhase>("idle");
  const [hasSubmitted, setHasSubmitted] = useState(false);
  const [coords, setCoords] = useState({ startX: 0, startY: 0, endX: 0, endY: 0 });
  const [terminalLines, setTerminalLines] = useState<string[]>([]);

  const containerRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const terminalRef = useRef<HTMLElement>(null);

  // Calculate coordinates dynamically for the absolute paper airplane Bezier glide overlay
  const calculateDimensions = () => {
    if (!containerRef.current || !buttonRef.current || !terminalRef.current) return;
    
    const containerRect = containerRef.current.getBoundingClientRect();
    const buttonRect = buttonRef.current.getBoundingClientRect();
    const terminalRect = terminalRef.current.getBoundingClientRect();

    setCoords({
      startX: buttonRect.left - containerRect.left + buttonRect.width / 2,
      startY: buttonRect.top - containerRect.top + buttonRect.height / 2,
      endX: terminalRect.left - containerRect.left + terminalRect.width / 2,
      endY: terminalRect.top - containerRect.top + terminalRect.height / 2,
    });
  };

  // Prime dimensions on mount and listen for window resizing
  useEffect(() => {
    const timer = setTimeout(() => {
      calculateDimensions();
    }, 500);

    window.addEventListener("resize", calculateDimensions);
    return () => {
      clearTimeout(timer);
      window.removeEventListener("resize", calculateDimensions);
    };
  }, []);

  // SMTP typewriter simulation logs
  useEffect(() => {
    if (phase !== "processing") {
      if (phase === "idle" || phase === "resetting") {
        setTerminalLines([]);
      }
      return;
    }

    let isCancelled = false;
    const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

    const typeLine = async (line: string, speed = 20) => {
      if (isCancelled) return;
      setTerminalLines((prev) => [...prev, ""]);
      for (let i = 0; i < line.length; i++) {
        if (isCancelled) return;
        await sleep(speed);
        setTerminalLines((prev) => {
          const next = [...prev];
          next[next.length - 1] = line.slice(0, i + 1);
          return next;
        });
      }
    };

    const runPipeline = async () => {
      await sleep(250); // Pause briefly as the airplane Accept fade finishes
      if (isCancelled) return;
      await typeLine("> Initializing connection...", 15);
      await sleep(350);
      if (isCancelled) return;
      setTerminalLines((prev) => [...prev, "✓ Connected"]);
      await sleep(250);

      if (isCancelled) return;
      await typeLine("> Encrypting message...", 15);
      await sleep(350);
      if (isCancelled) return;
      setTerminalLines((prev) => [...prev, "✓ Encryption complete"]);
      await sleep(250);

      if (isCancelled) return;
      await typeLine("> Sending to inbox...", 15);
      await sleep(400);
      if (isCancelled) return;
      setTerminalLines((prev) => [...prev, "✓ Delivered"]);
      await sleep(350);

      if (isCancelled) return;
      setPhase("completed");
    };

    runPipeline();

    return () => {
      isCancelled = true;
    };
  }, [phase]);

  // Handle resets after the receipt has been shown
  useEffect(() => {
    if (phase !== "completed") return;

    const timer = setTimeout(() => {
      setPhase("resetting");
      setName("");
      setEmail("");
      setMessage("");
      setTouched({ name: false, email: false, message: false });
      setErrors({});
      setHasSubmitted(true);
      
      // Revert cleanly to idle state
      setTimeout(() => {
        setPhase("idle");
      }, 500);
    }, 4500); // 2.5s for display + transition buffering

    return () => clearTimeout(timer);
  }, [phase]);

  const validateField = (field: keyof ValidationErrors, value: string): boolean => {
    let err = "";
    if (field === "name") {
      if (!value.trim()) {
        err = "Name is required.";
      } else if (value.trim().length < 2) {
        err = "Name must be at least 2 characters.";
      }
    } else if (field === "email") {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!value.trim()) {
        err = "Email is required.";
      } else if (!emailRegex.test(value)) {
        err = "Please enter a valid email address.";
      }
    } else if (field === "message") {
      if (!value.trim()) {
        err = "Message is required.";
      } else if (value.trim().length < 10) {
        err = "Message must be at least 10 characters.";
      }
    }

    setErrors((prev) => ({ ...prev, [field]: err }));
    return !err;
  };

  const handleBlur = (field: keyof TouchedFields) => {
    setTouched((prev) => ({ ...prev, [field]: true }));
    const val = field === "name" ? name : field === "email" ? email : message;
    validateField(field, val);
  };

  const handleChange = (field: keyof TouchedFields, value: string) => {
    if (field === "name") setName(value);
    else if (field === "email") setEmail(value);
    else if (field === "message") setMessage(value);

    if (touched[field]) {
      validateField(field, value);
    }
  };

  const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

  const submit = async (event: React.FormEvent) => {
    event.preventDefault();
    
    setTouched({ name: true, email: true, message: true });
    
    const isNameValid = validateField("name", name);
    const isEmailValid = validateField("email", email);
    const isMessageValid = validateField("message", message);

    if (!isNameValid || !isEmailValid || !isMessageValid) {
      return;
    }

    // Step 1: Lock form inputs and button details
    calculateDimensions();
    setPhase("sending");

    try {
      // Step 2: Button loader display duration (400ms)
      await sleep(400);

      // Step 3 & 4: Launch paper airplane & Bezier flight (3.0 seconds)
      setPhase("gliding");
      await sleep(3000);

      // Step 5: Transition to SMTP logging in terminal
      setPhase("processing");
    } catch (err: any) {
      console.error(err);
      setPhase("error");
      toast.error("Failed to send email. Please try again.");
      
      // Revert to idle after error shake
      await sleep(3000);
      setPhase("idle");
    }
  };

  const contactLinkClass =
    "rounded-full border border-ink/14 bg-white/72 px-5 py-3 shadow-[0_12px_28px_-24px_var(--ink)] transition hover:border-ink/30 hover:bg-white hover:text-ink";
  const inputClass =
    "mt-2 w-full rounded-[16px] border border-ink/12 bg-white/86 px-5 py-4 font-mono text-sm text-ink shadow-inner outline-none placeholder:text-ink/32 transition focus:border-olive/55 focus:bg-white focus:ring-4 focus:ring-olive/10";
  const labelClass = "font-mono text-[11px] font-semibold tracking-[0.25em] text-ink/58";

  const isInteractive = phase === "idle";
  const isTerminalActive = phase === "gliding" || phase === "processing" || phase === "completed";

  // Check if terminal should display standby system state instead of draft fields
  const showStandbyReceipt = hasSubmitted && !name && !email && !message && (phase === "idle" || phase === "resetting");

  return (
    <section id="contact" className="relative overflow-hidden border-t border-border bg-paper px-8 py-16 lg:px-12 md:py-24">
      <Ambient className="opacity-25" />

      <div className="relative z-10 mx-auto max-w-[1400px]">
        <div className="mb-8 flex items-baseline gap-6 md:mb-10">
          <span className="font-mono text-xs tracking-[0.25em] text-accent">07 CONTACT</span>
          <span className="h-px flex-1 bg-ink/20" />
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

          <div className="grid gap-4 lg:col-span-7 lg:grid-cols-5 relative" ref={containerRef}>
            {/* The contact form container */}
            <form
              onSubmit={submit}
              noValidate
              className={cn(
                "rounded-[22px] border border-ink/12 bg-white/78 p-5 shadow-[0_22px_56px_-40px_var(--ink)] md:p-6 lg:col-span-3 flex flex-col justify-between transition-opacity duration-500",
                phase !== "idle" && phase !== "sending" ? "opacity-35 pointer-events-none" : "opacity-100"
              )}
            >
              <div>
                <label className="block">
                  <span className={labelClass}>NAME</span>
                  <input
                    value={name}
                    onChange={(event) => handleChange("name", event.target.value)}
                    onBlur={() => handleBlur("name")}
                    className={cn(
                      inputClass,
                      touched.name && errors.name && "border-vermillion/60 focus:border-vermillion focus:ring-vermillion/10 bg-vermillion/[0.01]"
                    )}
                    placeholder="Ada Lovelace"
                  />
                  {touched.name && errors.name && (
                    <motion.span
                      initial={{ opacity: 0, y: -4 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="mt-1.5 font-mono text-[10px] text-vermillion tracking-wider flex items-center gap-1"
                    >
                      <AlertCircle className="w-3.5 h-3.5" />
                      {errors.name}
                    </motion.span>
                  )}
                </label>

                <label className="mt-5 block">
                  <span className={labelClass}>EMAIL</span>
                  <input
                    type="email"
                    value={email}
                    onChange={(event) => handleChange("email", event.target.value)}
                    onBlur={() => handleBlur("email")}
                    className={cn(
                      inputClass,
                      touched.email && errors.email && "border-vermillion/60 focus:border-vermillion focus:ring-vermillion/10 bg-vermillion/[0.01]"
                    )}
                    placeholder="ada@example.com"
                  />
                  {touched.email && errors.email && (
                    <motion.span
                      initial={{ opacity: 0, y: -4 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="mt-1.5 font-mono text-[10px] text-vermillion tracking-wider flex items-center gap-1"
                    >
                      <AlertCircle className="w-3.5 h-3.5" />
                      {errors.email}
                    </motion.span>
                  )}
                </label>

                <label className="mt-5 block relative">
                  <span className={labelClass}>MESSAGE</span>
                  <textarea
                    value={message}
                    onChange={(event) => handleChange("message", event.target.value)}
                    onBlur={() => handleBlur("message")}
                    rows={5}
                    className={cn(
                      inputClass,
                      "resize-none block w-full",
                      touched.message && errors.message && "border-vermillion/60 focus:border-vermillion focus:ring-vermillion/10 bg-vermillion/[0.01]"
                    )}
                    placeholder="Let's build something reliable."
                  />
                  {touched.message && errors.message && (
                    <motion.span
                      initial={{ opacity: 0, y: -4 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="mt-1.5 font-mono text-[10px] text-vermillion tracking-wider flex items-center gap-1"
                    >
                      <AlertCircle className="w-3.5 h-3.5" />
                      {errors.message}
                    </motion.span>
                  )}
                </label>
              </div>

              {/* Submit Button Container */}
              <div className="relative mt-8 h-[54px] w-full flex items-center justify-center">
                <motion.button
                  ref={buttonRef}
                  type="submit"
                  disabled={!isInteractive}
                  style={{ borderRadius: "9999px" }}
                  whileTap={{ scale: isInteractive ? 0.98 : 1 }}
                  animate={phase === "error" ? { x: [0, -8, 8, -8, 8, -4, 4, 0] } : {}}
                  transition={{ duration: 0.4 }}
                  className={cn(
                    "w-full h-[54px] flex items-center justify-center font-mono text-[12px] font-semibold tracking-[0.25em] text-paper shadow-[0_18px_38px_-22px_var(--ink)] outline-none border-none bg-ink gap-2.5",
                    isInteractive ? "hover:-translate-y-0.5 hover:bg-olive hover:text-paper hover:shadow-[0_24px_44px_-26px_var(--ink)] cursor-pointer transition-transform duration-200" : "opacity-60 cursor-not-allowed"
                  )}
                >
                  <AnimatePresence mode="wait">
                    {phase === "idle" && (
                      <motion.span
                        key="idle"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="flex items-center gap-2"
                      >
                        SEND MESSAGE
                        <svg viewBox="0 0 24 24" className="w-3.5 h-3.5 fill-none stroke-current" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                          <line x1="22" y1="2" x2="11" y2="13"></line>
                          <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
                        </svg>
                      </motion.span>
                    )}
                    {(phase === "sending" || phase === "gliding" || phase === "processing") && (
                      <motion.div
                        key="sending"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="flex items-center gap-2"
                      >
                        <div className="w-3.5 h-3.5 border-2 border-paper border-t-transparent rounded-full animate-spin" />
                        <span>SENDING...</span>
                      </motion.div>
                    )}
                    {phase === "error" && (
                      <motion.span
                        key="error"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="text-vermillion font-bold"
                      >
                        FAILED
                      </motion.span>
                    )}
                    {(phase === "completed" || phase === "resetting") && (
                      <motion.span
                        key="completed"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="text-[#84cc16] font-bold"
                      >
                        SENT
                      </motion.span>
                    )}
                  </AnimatePresence>
                </motion.button>
              </div>
            </form>

            {/* The terminal window */}
            <aside
              ref={terminalRef}
              className={cn(
                "rounded-[22px] border bg-ink p-5 font-mono text-[12px] leading-relaxed shadow-[0_22px_56px_-38px_var(--ink)] md:p-6 lg:col-span-2 flex flex-col justify-between relative overflow-hidden min-h-[340px] transition-all duration-500",
                isTerminalActive 
                  ? "border-olive/35 shadow-[0_0_30px_rgba(66,84,33,0.15)] bg-ink/98 brightness-105" 
                  : "border-ink/85 text-[#f7f1dd]"
              )}
            >
              <AnimatePresence mode="wait">
                {/* 1. Terminal Standby Success State */}
                {showStandbyReceipt ? (
                  <motion.div
                    key="success-idle"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="h-full flex flex-col justify-between"
                  >
                    <div>
                      <div className="mb-5 flex gap-2">
                        <span className="h-2.5 w-2.5 rounded-full bg-[#ef4444]/50" />
                        <span className="h-2.5 w-2.5 rounded-full bg-[#fbbf24]/50" />
                        <span className="h-2.5 w-2.5 rounded-full bg-[#22c55e]/50" />
                      </div>
                      <div className="flex flex-col gap-2 font-mono text-[11px] leading-relaxed text-[#e7e0cc]">
                        <p className="font-semibold text-[#84cc16]">Last message received successfully.</p>
                        <p className="text-[#a8a29e]">Ready for another conversation.</p>
                        <p className="mt-2 text-xs">
                          <span className="animate-caret inline-block h-3.5 w-1.5 translate-y-0.5 bg-[#facc15]" />
                        </p>
                      </div>
                    </div>
                    <div className="mt-6 border-t border-white/10 pt-4 font-mono text-[10px] leading-relaxed text-[#84cc16]/50">
                      &gt; System standby. Ready.
                    </div>
                  </motion.div>
                ) : (phase !== "processing" && phase !== "completed" && phase !== "resetting") ? (
                  /* 2. Normal Draft View */
                  <motion.div
                    key="draft"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="h-full flex flex-col justify-between"
                  >
                    <div>
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
                      <p className="mt-4 whitespace-pre-wrap break-all text-[#e7e0cc]">
                        <span className="text-[#fb7185]">body:</span>{" "}
                        {message || <span className="text-[#f7f1dd]/40">say something useful</span>}
                        {phase === "idle" && (
                          <span className="animate-caret ml-0.5 inline-block h-4 w-2 translate-y-0.5 bg-[#facc15]" />
                        )}
                      </p>
                    </div>
                    <div className="mt-6 border-t border-white/10 pt-4 font-mono text-[10px] leading-relaxed text-[#d8d0bd]/50">
                      &gt; Ready for input...
                    </div>
                  </motion.div>
                ) : (
                  /* 3. Live SMTP Transmission Logs */
                  <motion.div
                    key="logs"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="h-full flex flex-col justify-between"
                  >
                    <div>
                      <div className="mb-5 flex gap-2">
                        <span className="h-2.5 w-2.5 rounded-full bg-[#ef4444]" />
                        <span className="h-2.5 w-2.5 rounded-full bg-[#fbbf24]" />
                        <span className="h-2.5 w-2.5 rounded-full bg-[#22c55e]" />
                      </div>
                      <div className="flex flex-col gap-2 font-mono text-[11px] leading-relaxed text-[#a8a29e]">
                        {terminalLines.map((line, idx) => {
                          const isSuccess = line.startsWith("✓");
                          const isLog = line.startsWith(">");
                          let color = "text-[#f7f1dd]";
                          if (isLog) color = "text-[#878580]";
                          else if (isSuccess) color = "text-[#84cc16]";

                          const isLast = idx === terminalLines.length - 1;
                          return (
                            <p key={idx} className={color}>
                              {line}
                              {isLast && phase === "processing" && (
                                <span className="animate-caret ml-1 inline-block h-3.5 w-1.5 translate-y-0.5 bg-[#facc15]" />
                              )}
                            </p>
                          );
                        })}
                        {phase === "completed" && (
                          <motion.div
                            initial={{ opacity: 0, y: 5 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.4, delay: 0.1 }}
                            className="mt-4 border-t border-white/10 pt-4 text-[#e7e0cc] flex flex-col gap-1"
                          >
                            <p className="text-[#878580]">────────────────────</p>
                            <p className="font-semibold text-[#84cc16]">Message received successfully.</p>
                            <p>Thank you for reaching out.</p>
                            <p>I&apos;ll get back to you soon.</p>
                            <p className="text-[#878580]">────────────────────</p>
                            <p className="mt-1 text-xs">
                              <span className="animate-caret inline-block h-3.5 w-1.5 translate-y-0.5 bg-[#facc15]" />
                            </p>
                          </motion.div>
                        )}
                      </div>
                    </div>
                    <div className="mt-6 border-t border-white/10 pt-4 font-mono text-[10px] leading-relaxed text-[#84cc16]/70 animate-pulse">
                      &gt; SMTP transaction completed.
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </aside>

            {/* Absolute paper airplane travel flight trail SVG */}
            {phase === "gliding" && (
              <svg className="absolute inset-0 w-full h-full pointer-events-none z-40 overflow-visible">
                <motion.path
                  d={`M ${coords.startX} ${coords.startY} Q ${(coords.startX + coords.endX) / 2} ${Math.min(coords.startY, coords.endY) - 40} ${coords.endX} ${coords.endY}`}
                  fill="none"
                  stroke="rgba(17, 17, 17, 0.08)"
                  strokeWidth="1.5"
                  strokeDasharray="4 4"
                  initial={{ pathLength: 0, opacity: 0 }}
                  animate={{
                    pathLength: [0, 1, 1],
                    opacity: [0, 0.6, 0]
                  }}
                  transition={{
                    duration: 3.0,
                    times: [0, 0.4, 1],
                    ease: [0.16, 1, 0.3, 1]
                  }}
                />
              </svg>
            )}

            {/* Absolute paper airplane animation element */}
            {phase === "gliding" && (
              <motion.div
                style={{
                  position: "absolute",
                  left: coords.startX,
                  top: coords.startY,
                  x: "-50%",
                  y: "-50%",
                  zIndex: 50,
                }}
                animate={{
                  left: coords.endX,
                  top: [coords.startY, coords.startY - 40, coords.endY],
                  scale: [1, 1, 0.35],
                  rotate: [-15, -18, 8, 0],
                  opacity: [1, 1, 0.8, 0],
                }}
                transition={{
                  left: { duration: 3.0, ease: [0.16, 1, 0.3, 1] },
                  top: { duration: 3.0, ease: ["easeOut", "easeIn"] },
                  scale: { duration: 3.0, ease: [0.16, 1, 0.3, 1] },
                  rotate: { duration: 3.0, ease: "easeInOut" },
                  opacity: { duration: 3.0, ease: "easeOut" },
                }}
                className="pointer-events-none select-none w-7 h-7 flex items-center justify-center text-ink"
              >
                <svg viewBox="0 0 24 24" className="w-full h-full fill-none stroke-current" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="22" y1="2" x2="11" y2="13"></line>
                  <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
                </svg>
              </motion.div>
            )}

            {/* Launch Ripple Effect */}
            {phase === "gliding" && (
              <motion.div
                style={{
                  position: "absolute",
                  left: coords.startX,
                  top: coords.startY,
                  x: "-50%",
                  y: "-50%",
                  width: 30,
                  height: 30,
                  borderRadius: "50%",
                  border: "1px solid rgba(17, 17, 17, 0.25)",
                  pointerEvents: "none",
                  zIndex: 45,
                }}
                initial={{ scale: 0.6, opacity: 0.8 }}
                animate={{ scale: 3.8, opacity: 0 }}
                transition={{ duration: 0.9, ease: "easeOut" }}
              />
            )}

            {/* Terminal Acceptance Ripple */}
            {phase === "processing" && (
              <motion.div
                style={{
                  position: "absolute",
                  left: coords.endX,
                  top: coords.endY,
                  x: "-50%",
                  y: "-50%",
                  width: 30,
                  height: 30,
                  borderRadius: "50%",
                  border: "1px solid rgba(132, 204, 22, 0.35)",
                  pointerEvents: "none",
                  zIndex: 45,
                }}
                initial={{ scale: 0.6, opacity: 0.9 }}
                animate={{ scale: 4.2, opacity: 0 }}
                transition={{ duration: 0.9, ease: "easeOut" }}
              />
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
