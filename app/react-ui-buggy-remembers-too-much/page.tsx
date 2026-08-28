import type { Metadata } from "next";
import { siteUrl, absoluteUrl } from "@/lib/seo";
import { profile } from "@/content/portfolio";
import { BlogPostClient } from "./BlogPostClient";

const title = "Your React UI May Be Buggy Because It Remembers Too Much";
const description =
  "Duplicated React state creates stale UI, unnecessary effects, and avoidable failure paths. Learn how to store the minimum state and derive the rest.";
const slug = "/react-ui-buggy-remembers-too-much";
const publishedDate = "2026-08-28";
const heroImage = "/react-ui-remembers-too-much-hero.webp";
const heroImageAlt = "A React state diagram contrasting duplicated state with one clear source of truth";

export const metadata: Metadata = {
  title,
  description,
  keywords: [
    "React state",
    "useState",
    "derived state",
    "React useEffect",
    "React architecture",
    "stale UI",
    "source of truth",
    "frontend architecture",
    "React performance",
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
        width: 1792,
        height: 1024,
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
      width: 1792,
      height: 1024,
    },
    keywords:
      "React state, useState, derived state, React useEffect, stale UI, source of truth, frontend architecture",
  };

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "Is having many useState hooks automatically bad?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "No. A component can legitimately contain several independent pieces of state. The problem begins when multiple state variables represent information that can already be derived from one another.",
        },
      },
      {
        "@type": "Question",
        name: "Should filtered data be stored in React state?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Usually not if it can be calculated directly from the original collection and current filter inputs. Store the inputs and derive the filtered result.",
        },
      },
      {
        "@type": "Question",
        name: "Should I use useMemo whenever I derive a value?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "No. Derivation and memoization solve different problems. Derive values for correct ownership, then add memoization only when there is a meaningful performance reason.",
        },
      },
      {
        "@type": "Question",
        name: "When should I use useEffect?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Effects are most useful for synchronizing React with external systems such as browser APIs, subscriptions, network connections, timers, or third-party libraries.",
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
        name: "Writing",
        item: `${siteUrl}/#blog`,
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
