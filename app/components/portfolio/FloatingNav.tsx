"use client";

import { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { scrollToSection } from "@/lib/smooth-scroll";
import { cn } from "@/lib/utils";

interface NavItem {
  label: string;
  id: string;
}

const NAV_ITEMS: NavItem[] = [
  { label: "Intro", id: "intro" },
  { label: "Story", id: "background" },
  { label: "Stack", id: "stack" },
  { label: "Experience", id: "experience" },
  { label: "Work", id: "work" },
  { label: "Code", id: "code" },
  { label: "Blog", id: "blog" },
  { label: "Contact", id: "contact" },
];

export function FloatingNav({ ready = true }: { ready?: boolean }) {
  const [activeSection, setActiveSection] = useState("intro");
  const [visible, setVisible] = useState(ready);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isNavbarOverDark, setIsNavbarOverDark] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const lastScrollY = useRef(0);

  const activeItem = NAV_ITEMS.find((item) => item.id === activeSection) || NAV_ITEMS[0];

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const viewportHeight = window.innerHeight;
      const triggerPoint = viewportHeight * 0.45;

      if (currentScrollY > 80) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }

      if (currentScrollY < 120) {
        setVisible(true);
      } else if (currentScrollY > lastScrollY.current) {
        setVisible(false);
        setMobileMenuOpen(false);
      } else {
        setVisible(true);
      }

      lastScrollY.current = currentScrollY;

      const experienceEl = document.getElementById("experience");
      if (experienceEl) {
        const rect = experienceEl.getBoundingClientRect();
        const overlapsNavbar = rect.top <= 70 && rect.bottom >= 20;
        setIsNavbarOverDark(overlapsNavbar);
      } else {
        setIsNavbarOverDark(false);
      }

      const isAtBottom = window.innerHeight + currentScrollY >= document.documentElement.scrollHeight - 50;
      if (isAtBottom) {
        setActiveSection(NAV_ITEMS[NAV_ITEMS.length - 1].id);
        return;
      }

      let currentActive = "intro";
      for (const item of NAV_ITEMS) {
        const el = document.getElementById(item.id);
        if (!el) continue;

        const rect = el.getBoundingClientRect();
        if (rect.top <= triggerPoint && rect.bottom >= triggerPoint) {
          currentActive = item.id;
          break;
        }
      }
      setActiveSection(currentActive);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={cn(
        "fixed left-1/2 top-4 z-50 -translate-x-1/2 transition-all duration-500 ease-out",
        visible && ready ? "translate-y-0 opacity-100" : "-translate-y-20 opacity-0 pointer-events-none"
      )}
    >
      {/* Desktop Navbar (MD & Up) */}
      <div
        className={cn(
          "hidden md:flex items-center gap-1 rounded-full p-1.5 transition-all duration-500 ease-out border",
          isNavbarOverDark
            ? "bg-white/[0.08] border-white/15 backdrop-blur-[24px] saturate-[180%] contrast-[95%]"
            : "apple-glass",
          isScrolled
            ? isNavbarOverDark
              ? "shadow-[0_16px_40px_-16px_rgba(0,0,0,0.5)] scale-100"
              : "border-foreground/10 shadow-[0_16px_40px_-16px_rgba(0,0,0,0.18)] scale-100"
            : isNavbarOverDark
              ? "shadow-[0_8px_20px_-10px_rgba(0,0,0,0.3)] scale-98"
              : "border-foreground/6 shadow-[0_8px_20px_-10px_rgba(0,0,0,0.08)] scale-98"
        )}
      >
        <div className="flex items-center gap-0.5 whitespace-nowrap">
          {NAV_ITEMS.map((item) => {
            const isActive = activeSection === item.id;
            return (
              <button
                key={item.id}
                onClick={() => {
                  scrollToSection(item.id);
                  setActiveSection(item.id);
                }}
                className={cn(
                  "relative rounded-full px-3.5 py-2 font-mono text-[10px] font-semibold uppercase tracking-[0.2em] transition-colors duration-300 cursor-pointer outline-none select-none",
                  isActive
                    ? isNavbarOverDark
                      ? "text-foreground"
                      : "text-background"
                    : isNavbarOverDark
                      ? "text-background/55 hover:text-background"
                      : "text-muted-foreground hover:text-foreground"
                )}
              >
                {isActive && (
                  <motion.span
                    layoutId="active-nav-indicator"
                    className={cn(
                      "absolute inset-0 rounded-full",
                      isNavbarOverDark ? "bg-background" : "bg-foreground"
                    )}
                    transition={{ type: "spring", stiffness: 350, damping: 28 }}
                  />
                )}
                <span className="relative z-10">{item.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Mobile Compact Pill (Mobile Only) */}
      <div className="flex md:hidden flex-col items-center">
        <button
          type="button"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className={cn(
            "flex items-center gap-1.5 rounded-full px-3.5 py-1.5 font-mono text-[9px] font-bold uppercase tracking-[0.16em] transition-all duration-300 border backdrop-blur-xl shadow-lg cursor-pointer outline-none select-none whitespace-nowrap shrink-0",
            isNavbarOverDark
              ? "bg-black/85 border-white/20 text-white"
              : "bg-white/92 border-black/10 text-ink"
          )}
        >
          <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-accent animate-pulse" />
          <span className="whitespace-nowrap font-bold">ZAIN ALI</span>
          <span className="opacity-40">//</span>
          <span className="whitespace-nowrap text-accent">{activeItem.label}</span>
          <span className="ml-0.5 text-[8px] transition-transform duration-300" style={{ transform: mobileMenuOpen ? "rotate(180deg)" : "rotate(0deg)" }}>
            ▼
          </span>
        </button>

        {/* Mobile Dropdown Sheet */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, y: -10, scale: 0.95 }}
              animate={{ opacity: 1, y: 8, scale: 1 }}
              exit={{ opacity: 0, y: -10, scale: 0.95 }}
              transition={{ duration: 0.2, ease: "easeOut" }}
              className={cn(
                "w-56 overflow-hidden rounded-2xl border p-2 shadow-2xl backdrop-blur-2xl",
                isNavbarOverDark
                  ? "bg-black/90 border-white/20 text-white"
                  : "bg-paper/95 border-black/10 text-ink"
              )}
            >
              <div className="grid gap-1">
                {NAV_ITEMS.map((item) => {
                  const isActive = activeSection === item.id;
                  return (
                    <button
                      key={item.id}
                      onClick={() => {
                        scrollToSection(item.id);
                        setActiveSection(item.id);
                        setMobileMenuOpen(false);
                      }}
                      className={cn(
                        "flex items-center justify-between rounded-xl px-3.5 py-2.5 font-mono text-[11px] font-semibold uppercase tracking-[0.18em] transition-colors cursor-pointer text-left",
                        isActive
                          ? isNavbarOverDark
                            ? "bg-white/15 text-white"
                            : "bg-ink text-paper"
                          : isNavbarOverDark
                            ? "hover:bg-white/10 text-white/70"
                            : "hover:bg-ink/5 text-ink/70"
                      )}
                    >
                      <span>{item.label}</span>
                      {isActive ? (
                        <span className="font-mono text-[9px] text-accent">●</span>
                      ) : null}
                    </button>
                  );
                })}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </nav>
  );
}
