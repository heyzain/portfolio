import type { Metadata } from "next";
import { siteUrl, absoluteUrl, personEntityId, siteName } from "@/lib/seo";
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
      width: 1792,
      height: 1024,
    },
    keywords:
      "React state, useState, derived state, React useEffect, stale UI, source of truth, frontend architecture",
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

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "Is having many useState hooks automatically bad?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "No. Several independent user decisions can legitimately live in state. The trouble starts when state variables are just different versions of information the component already has.",
        },
      },
      {
        "@type": "Question",
        name: "Should filtered data be stored in React state?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Usually not. Store the original collection and the filter inputs, then calculate the filtered result from those values.",
        },
      },
      {
        "@type": "Question",
        name: "Should I use useMemo whenever I derive a value?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "No. Derivation is about ownership and correctness. Memoization is a performance optimization, useful after measurement or when reference stability matters.",
        },
      },
      {
        "@type": "Question",
        name: "When should I use useEffect?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Use effects to synchronize React with something outside React: browser APIs, subscriptions, timers, network connections, or third-party libraries. Question effects that only keep React values aligned with each other.",
        },
      },
      {
        "@type": "Question",
        name: "Should selected objects be stored in state?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Sometimes, but storing a stable ID and deriving the object from the canonical collection often avoids stale object copies.",
        },
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
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd).replace(/</g, "\\u003c") }}
      />
      <BlogPostClient />
    </>
  );
}
