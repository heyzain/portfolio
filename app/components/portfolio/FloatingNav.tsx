"use client";

import { useEffect, useState, useRef } from "react";
import { motion } from "framer-motion";
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
  { label: "Contact", id: "contact" },
];

export function FloatingNav() {
  const [activeSection, setActiveSection] = useState("intro");
  const [visible, setVisible] = useState(true);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isNavbarOverDark, setIsNavbarOverDark] = useState(false);
  const lastScrollY = useRef(0);

  // Handle all scroll-based layout adjustments (visible, scrolled, activeSection, dark background detection)
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const viewportHeight = window.innerHeight;
      const triggerPoint = viewportHeight * 0.45; // 45% from top of viewport
      
      // 1. Toggle scrolled visual state
      if (currentScrollY > 80) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }

      // 2. Hide navbar when scrolling down, show when scrolling up
      if (currentScrollY < 120) {
        setVisible(true);
      } else if (currentScrollY > lastScrollY.current) {
        setVisible(false); // scrolling down
      } else {
        setVisible(true); // scrolling up
      }
      
      lastScrollY.current = currentScrollY;

      // 3. Check if navbar is physically floating over the dark Experience section (top-5 sits ~20px to 70px)
      const experienceEl = document.getElementById("experience");
      if (experienceEl) {
        const rect = experienceEl.getBoundingClientRect();
        const overlapsNavbar = rect.top <= 70 && rect.bottom >= 20;
        setIsNavbarOverDark(overlapsNavbar);
      } else {
        setIsNavbarOverDark(false);
      }

      // 4. Track active section based on DOM element positions (GSAP-proof)
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
    handleScroll(); // initial call
    
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={cn(
        "fixed left-1/2 top-5 z-50 flex -translate-x-1/2 items-center gap-1 rounded-full p-1.5 transition-all duration-500 ease-out border",
        isNavbarOverDark 
          ? "bg-white/[0.08] border-white/15 backdrop-blur-[24px] saturate-[180%] contrast-[95%]" 
          : "apple-glass",
        isScrolled 
          ? isNavbarOverDark
            ? "shadow-[0_16px_40px_-16px_rgba(0,0,0,0.5)] scale-100"
            : "border-foreground/10 shadow-[0_16px_40px_-16px_rgba(0,0,0,0.18)] scale-100" 
          : isNavbarOverDark
            ? "shadow-[0_8px_20px_-10px_rgba(0,0,0,0.3)] scale-98"
            : "border-foreground/6 shadow-[0_8px_20px_-10px_rgba(0,0,0,0.08)] scale-98",
        visible ? "translate-y-0 opacity-100" : "-translate-y-20 opacity-0 pointer-events-none"
      )}
    >
      <div className="flex items-center gap-0.5">
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
                "relative rounded-full px-2.5 py-1.5 font-mono text-[9px] font-semibold uppercase tracking-[0.16em] transition-colors duration-300 md:px-3.5 md:py-2 md:text-[10px] md:tracking-[0.2em] cursor-pointer outline-none select-none",
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
    </nav>
  );
}
