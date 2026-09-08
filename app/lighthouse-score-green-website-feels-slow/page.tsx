import type { Metadata } from "next";
import { siteUrl, absoluteUrl, personEntityId, siteName } from "@/lib/seo";
import { profile } from "@/content/portfolio";
import { BlogPostClient } from "./BlogPostClient";

const title = "Your Lighthouse Score Is Green. Why Does Your Website Still Feel Slow?";
const description =
  "A good Lighthouse score does not always mean a fast-feeling website. Learn how perceived performance, Core Web Vitals, interactions, and real-user testing reveal what Lighthouse can miss.";
const slug = "/lighthouse-score-green-website-feels-slow";
const publishedDate = "2026-08-17";
const heroImage = "/lighthouse-score-website-feels-slow-hero.webp";
const heroImageAlt = "Green Lighthouse score versus slow perceived website performance";

export const metadata: Metadata = {
  title,
  description,
  keywords: [
    "Lighthouse score",
    "website feels slow",
    "PageSpeed Insights",
    "perceived performance",
    "website performance",
    "Core Web Vitals",
    "LCP",
    "INP",
    "CLS",
    "frontend performance",
    "Zain Ali",
  ],
  authors: [{ name: profile.name, url: siteUrl }],
  creator: profile.name,
  publisher: profile.name,
  alternates: {
    canonical: absoluteUrl(slug),
  },
  openGraph: {
    title,
    description,
    url: absoluteUrl(slug),
    type: "article",
    publishedTime: publishedDate,
    authors: [profile.name],
    siteName,
    images: [
      {
        url: heroImage,
        width: 1400,
        height: 700,
        alt: heroImageAlt,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
    images: [heroImage],
  },
};

export default function BlogPostPage() {
  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "TechArticle",
    headline: title,
    description,
    url: absoluteUrl(slug),
    datePublished: publishedDate,
    dateModified: publishedDate,
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": absoluteUrl(slug),
    },
    author: {
      "@type": "Person",
      "@id": personEntityId,
      name: profile.name,
      url: `${siteUrl}/`,
      jobTitle: profile.role,
    },
    publisher: {
      "@type": "Person",
      "@id": personEntityId,
      name: profile.name,
      url: `${siteUrl}/`,
    },
    image: {
      "@type": "ImageObject",
      url: absoluteUrl(heroImage),
      width: 1400,
      height: 700,
    },
    keywords:
      "Lighthouse score, website feels slow, PageSpeed Insights, perceived performance, Core Web Vitals, LCP, INP, CLS, frontend performance",
  };

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: `${siteUrl}/`,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Writing",
        item: absoluteUrl("/writing"),
      },
      {
        "@type": "ListItem",
        position: 3,
        name: title,
        item: absoluteUrl(slug),
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd).replace(/</g, "\\u003c") }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd).replace(/</g, "\\u003c") }}
      />
      <BlogPostClient />
    </>
  );
}
