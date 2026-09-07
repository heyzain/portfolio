import type { Metadata } from "next";
import { HomeSections } from "@/components/portfolio/HomeSections";
import { siteDescription, siteTitleDefault, siteUrl } from "@/lib/seo";

export const metadata: Metadata = {
  title: siteTitleDefault,
  description: siteDescription,
  alternates: {
    canonical: siteUrl,
  },
  openGraph: {
    title: siteTitleDefault,
    description: siteDescription,
    url: siteUrl,
  },
};

export default function Home() {
  return <HomeSections />;
}
