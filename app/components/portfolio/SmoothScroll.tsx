"use client";

import { useEffect } from "react";
import Lenis from "lenis";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { setLenis } from "@/lib/smooth-scroll";

export function SmoothScroll() {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const lenis = new Lenis({ lerp: 0.12, wheelMultiplier: 1 });
    lenis.on("scroll", ScrollTrigger.update);
    setLenis(lenis);
    (window as unknown as { __lenis?: unknown }).__lenis = lenis; // TEMP debug

    const raf = (time: number) => lenis.raf(time * 1000);
    gsap.ticker.add(raf);
    gsap.ticker.lagSmoothing(0);

    // Section ScrollTriggers (notably the pinned horizontal Experience track)
    // are measured on mount, before webfonts finish loading. When the display
    // font swaps in, every big heading above resizes and shifts each section's
    // offset — leaving the pin with a stale start/end, so it scrolls past
    // un-pinned and then snaps. Re-measure once those late layout shifts land.
    const refresh = () => ScrollTrigger.refresh();
    if (document.fonts?.ready) document.fonts.ready.then(refresh);
    window.addEventListener("load", refresh);

    return () => {
      window.removeEventListener("load", refresh);
      gsap.ticker.remove(raf);
      lenis.destroy();
      setLenis(null);
    };
  }, []);

  return null;
}