import type Lenis from "lenis";

// The Lenis instance is created inside <SmoothScroll>. We stash it here so the
// section nav can drive programmatic scrolling through the same instance
// instead of instantiating a second one. When reduced motion is on, Lenis is
// never created and we fall back to native smooth scrolling.
let lenis: Lenis | null = null;

export function setLenis(instance: Lenis | null) {
  lenis = instance;
}

export function scrollToSection(id: string) {
  const el = document.getElementById(id);
  if (!el) return;
  if (lenis) {
    lenis.scrollTo(el, { duration: 1.1 });
  } else {
    el.scrollIntoView({ behavior: "smooth", block: "start" });
  }
}
