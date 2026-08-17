"use client";

import { useEffect, useState } from "react";
import { Github, Mail } from "lucide-react";
import { ScrollTrigger } from "@/lib/gsap";
import { SmoothScroll } from "@/components/portfolio/SmoothScroll";
import { Loader } from "@/components/portfolio/Loader";
import { FloatingNav } from "@/components/portfolio/FloatingNav";
import { Hero } from "@/components/portfolio/Hero";
import { BackgroundEssay } from "@/components/portfolio/BackgroundEssay";
import { SkillsArc } from "@/components/portfolio/SkillsArc";
import { Experience } from "@/components/portfolio/Experience";
import { StickyProjectCards } from "@/components/portfolio/StickyProjectCards";
import { WorkProjectsShowcase } from "@/components/portfolio/WorkProjectsShowcase";
import { CodeContributions } from "@/components/portfolio/CodeContributions";
import { BlogSection } from "@/components/portfolio/BlogSection";
import { ContactDispatch } from "@/components/portfolio/ContactDispatch";
import { CinematicFooter } from "@/components/ui/motion-footer";
import { profile } from "@/content/portfolio";

export function HomeSections() {
  const [ready, setReady] = useState(false);

  // Once the loader clears, the reveal (and any final font swap) can nudge
  // section offsets — re-measure so pinned sections start at the right scroll
  // position instead of engaging late and snapping.
  useEffect(() => {
    if (!ready) return;
    const id = requestAnimationFrame(() => ScrollTrigger.refresh());
    return () => cancelAnimationFrame(id);
  }, [ready]);

  return (
    <main className="bg-background text-foreground">
      <SmoothScroll />
      <Loader onDone={() => setReady(true)} />
      <FloatingNav ready={ready} />
      <Hero ready={ready} />
      <BackgroundEssay />
      <SkillsArc />
      <Experience />
      <StickyProjectCards />
      <WorkProjectsShowcase />
      <CodeContributions />
      <BlogSection />
      <ContactDispatch />
      <CinematicFooter
        giantText="ZAIN"
        heading="Let's build something."
        marqueeItems={[
          "Full-Stack Development",
          "React · Node · MongoDB",
          "Self-Taught, Shipped",
          "Open to Opportunities",
          "Let's Build Something",
        ]}
        primaryLinks={[
          { label: "Email Me", href: `mailto:${profile.email}`, icon: <Mail className="h-5 w-5" /> },
          { label: "GitHub", href: `https://${profile.github}`, icon: <Github className="h-5 w-5" /> },
        ]}
        secondaryLinks={[
          { label: "LinkedIn", href: `https://${profile.linkedin}` },
          { label: "Résumé", href: profile.resumeUrl },
        ]}
        author={profile.name}
        copyright={`© 2026 ${profile.name}. All rights reserved.`}
      />
    </main>
  );
}
