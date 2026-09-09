import type { Metadata } from "next";
import { siteUrl, absoluteUrl, personEntityId, siteName } from "@/lib/seo";
import { profile } from "@/content/portfolio";
import { BlogPostClient } from "./BlogPostClient";

const title = "Beyond the API: Why Fast Backends Still Produce Slow React UIs";
const description =
  "Your API can respond in 45ms, yet the user experience still feels sluggish. Learn how server-first rendering, streaming, selective hydration, and optimistic updates reduce perceived latency.";
const slug = "/structuring-full-stack-react-apps-for-speed";
const publishedDate = "2026-08-18";
const heroImage = "/structuring-full-stack-react-apps-for-speed-hero.webp";
const heroImageAlt = "Full-stack React architecture showing how UI latency can remain even when the API is fast";

export const metadata: Metadata = {
  title,
  description,
  keywords: [
    "React Server Components",
    "Next.js architecture",
    "useOptimistic",
    "selective hydration",
    "frontend performance",
    "perceived performance",
    "full stack React",
    "Suspense streaming",
    "cache revalidation",
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
      "React Server Components, Next.js architecture, useOptimistic, selective hydration, frontend performance, perceived performance, full stack React, Suspense streaming",
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
        name: "Does Server Components eliminate the need for client state?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "No. Client state (via useState, useReducer, or client stores) is essential for local interactive experiences like controlled form inputs, dropdowns, and drag-and-drop interfaces. The goal is keeping Client Components small and localized at the leaves of the component tree.",
        },
      },
      {
        "@type": "Question",
        name: "When should I avoid optimistic updates?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Avoid optimistic updates for operations with high financial stakes (e.g. credit card checkouts), irreversible destructive actions (permanent database drops), or workflows heavily dependent on unpredictable server validations.",
        },
      },
      {
        "@type": "Question",
        name: "How does React selective hydration improve perceived speed?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Under React 18 and 19 concurrent features, if a user clicks a button inside a suspended region while another part of the tree is still hydrating, React pauses background hydration to immediately hydrate and execute the clicked component.",
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
