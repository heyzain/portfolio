"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "@/lib/gsap";
import { profile } from "@/content/portfolio";

export function Loader({ onDone }: { onDone: () => void }) {
  const rootRef = useRef<HTMLDivElement>(null);
  const numRef = useRef<HTMLSpanElement>(null);
  const [gone, setGone] = useState(false);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      const frame = requestAnimationFrame(() => {
        setGone(true);
        onDone();
      });
      return () => cancelAnimationFrame(frame);
    }
    const counter = { v: 0 };
    const tl = gsap.timeline({
      onComplete: () => {
        setGone(true);
        onDone();
      },
    });
    tl.to(counter, {
      v: 100,
      duration: 1.3,
      ease: "power3.inOut",
      onUpdate: () => {
        if (numRef.current) {
          numRef.current.textContent = String(Math.round(counter.v)).padStart(3, "0");
        }
      },
    });
    tl.to(rootRef.current, {
      yPercent: -100,
      duration: 0.7,
      ease: "power4.inOut",
    });
    return () => {
      tl.kill();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (gone) return null;

  return (
    <div
      ref={rootRef}
      className="fixed inset-0 z-[90] flex flex-col justify-between bg-paper p-8 text-ink md:p-12"
    >
      <div className="font-mono text-xs tracking-widest text-ink/70">
        {profile.name.toUpperCase()} · PORTFOLIO · {profile.location}
      </div>
      <div className="flex items-end justify-between">
        <span className="font-display text-2xl italic text-ink/85">
          setting the type
        </span>
        <span ref={numRef} className="font-mono text-6xl text-ink md:text-8xl">
          000
        </span>
      </div>
    </div>
  );
}
