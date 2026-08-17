import type { Metadata } from "next";
import { siteUrl, absoluteUrl } from "@/lib/seo";
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
    canonical: slug,
  },
  openGraph: {
    title,
    description,
    url: slug,
    type: "article",
    publishedTime: publishedDate,
    authors: [profile.name],
    siteName: "Zain Ali Portfolio",
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
    "@type": "BlogPosting",
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
      name: profile.name,
      url: siteUrl,
      jobTitle: profile.role,
    },
    publisher: {
      "@type": "Person",
      name: profile.name,
      url: siteUrl,
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

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "Why does my website feel slow even with a good Lighthouse score?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "A Lighthouse test measures performance under controlled synthetic conditions. Your real user experience can also be affected by route transitions, client-side data fetching, animations, background JavaScript execution, and device bottlenecks.",
        },
      },
      {
        "@type": "Question",
        name: "Is a 100 Lighthouse score necessary?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "No. Lighthouse considers scores between 90 and 100 good. Google explicitly notes that achieving a perfect 100 is difficult and not expected for every website. Focus on real user feel and perceived speed.",
        },
      },
      {
        "@type": "Question",
        name: "What are the current Core Web Vitals?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "The current Core Web Vitals are Largest Contentful Paint (LCP) for loading performance, Interaction to Next Paint (INP) for responsiveness, and Cumulative Layout Shift (CLS) for visual stability.",
        },
      },
      {
        "@type": "Question",
        name: "What is perceived website performance?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Perceived performance describes how fast an application feels to the person using it. It is influenced by when useful content appears, immediate interactive feedback, predictable layouts, and transparent progress indicators.",
        },
      },
      {
        "@type": "Question",
        name: "Is PageSpeed Insights the same as Lighthouse?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Not exactly. PageSpeed Insights uses Lighthouse to generate its lab diagnostics, but it can also display real-user field data from the Chrome User Experience Report (CrUX) when enough data is available.",
        },
      },
      {
        "@type": "Question",
        name: "Should I remove animations to improve website performance?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Not automatically. Animation can improve hierarchy, feedback, and brand experience. The important question is whether it delays important content or blocks interaction. Measure the experience before removing an animation simply because it exists.",
        },
      },
    ],
  };

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: siteUrl,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Articles",
        item: absoluteUrl(slug),
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
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd).replace(/</g, "\\u003c") }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd).replace(/</g, "\\u003c") }}
      />
      <BlogPostClient />
    </>
  );
}
