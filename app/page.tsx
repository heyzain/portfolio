import type { Metadata } from "next";
import { HomeSections } from "@/components/portfolio/HomeSections";
import { siteDescription } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Zain Ali - Full-Stack Developer",
  description: siteDescription,
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Zain Ali - Full-Stack Developer",
    description: siteDescription,
    url: "/",
  },
};

export default function Home() {
  return <HomeSections />;
}
