import type { Metadata } from "next";
import { HomeSections } from "@/components/portfolio/HomeSections";

export const metadata: Metadata = {
  title: "Zain Ali — Full-Stack Developer",
  description:
    "An immersive portfolio: self-taught, four shipped projects, told as a journey in seven sections.",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    url: "/",
  },
};

export default function Home() {
  return <HomeSections />;
}
