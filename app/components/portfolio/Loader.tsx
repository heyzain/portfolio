"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "@/lib/gsap";

let splashPlayedInThisDocument = false;

export function Loader({ onDone }: { onDone: () => void }) {
  const rootRef = useRef<HTMLDivElement>(null);
  const ballRef = useRef<HTMLDivElement>(null);
  const [gone, setGone] = useState(() => splashPlayedInThisDocument);

  useEffect(() => {
    const finish = () => {
      setGone(true);
      onDone();
    };

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (reducedMotion || splashPlayedInThisDocument) {
      splashPlayedInThisDocument = true;
      const frame = requestAnimationFrame(finish);
      return () => cancelAnimationFrame(frame);
    }

    splashPlayedInThisDocument = true;

    const html = document.documentElement;
    const body = document.body;
    const previousHtmlOverflow = html.style.overflow;
    const previousBodyOverflow = body.style.overflow;
    html.style.overflow = "hidden";
    body.style.overflow = "hidden";

    const ball = ballRef.current;
    const root = rootRef.current;
    if (!ball || !root) {
      finish();
      return;
    }

    const unlockScroll = () => {
      html.style.overflow = previousHtmlOverflow;
      body.style.overflow = previousBodyOverflow;
    };

    const timeline = gsap.timeline({
      defaults: { overwrite: "auto" },
      onComplete: () => {
        unlockScroll();
        finish();
      },
    });

    timeline
      .set(ball, {
        visibility: "visible",
        y: () => -window.innerHeight / 2 - 24,
        scaleX: 1,
        scaleY: 1,
        transformOrigin: "50% 50%",
      })
      .to(ball, { y: 0, duration: 0.58, ease: "power2.in" })
      .to(ball, { scaleX: 1.16, scaleY: 0.84, duration: 0.08, ease: "power2.out" })
      .to(ball, {
        y: -30,
        scaleX: 0.96,
        scaleY: 1.04,
        duration: 0.2,
        ease: "power2.out",
      })
      .to(ball, { y: 0, scaleX: 1.08, scaleY: 0.92, duration: 0.2, ease: "power2.in" })
      .to(ball, { scaleX: 1, scaleY: 1, duration: 0.1, ease: "power2.out" })
      .set(root, {
        "--splash-radius": "20px",
        maskImage:
          "radial-gradient(circle at 50% 50%, transparent 0, transparent var(--splash-radius), black calc(var(--splash-radius) + 1px))",
        WebkitMaskImage:
          "radial-gradient(circle at 50% 50%, transparent 0, transparent var(--splash-radius), black calc(var(--splash-radius) + 1px))",
      })
      .set(ball, { visibility: "hidden" })
      .to(root, {
        "--splash-radius": () => `${Math.hypot(window.innerWidth, window.innerHeight) / 2 + 2}px`,
        duration: 0.56,
        ease: "power3.inOut",
      })
      .set(root, { visibility: "hidden" });

    return () => {
      timeline.kill();
      unlockScroll();
    };
    // onDone is intentionally treated as a mount-time completion callback.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (gone) return null;

  return (
    <div
      ref={rootRef}
      className="splash-loader fixed inset-0 z-[90] overflow-hidden bg-ink"
      role="status"
      aria-label="Loading portfolio"
    >
      <div
        ref={ballRef}
        className="invisible absolute left-1/2 top-1/2 h-10 w-10 -translate-x-1/2 -translate-y-1/2 rounded-full bg-paper will-change-transform"
      />
    </div>
  );
}
