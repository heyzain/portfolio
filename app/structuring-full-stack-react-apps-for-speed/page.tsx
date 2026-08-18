import type { Metadata } from "next";
import { siteUrl, absoluteUrl } from "@/lib/seo";
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
      "React Server Components, Next.js architecture, useOptimistic, selective hydration, frontend performance, perceived performance, full stack React, Suspense streaming",
  };

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "Why can a website feel slow even if the backend API is fast?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "API latency is only one part of the interaction lifecycle. In client-heavy SPAs, users also wait for client JavaScript download, parsing, tree hydration, post-mount fetch cascades, and blocking round-trip mutation states.",
        },
      },
      {
        "@type": "Question",
        name: "How do React Server Components improve load speed?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Server Components execute on the server and stream pre-rendered HTML without shipping their heavy component code or database dependencies to the browser bundle.",
        },
      },
      {
        "@type": "Question",
        name: "What is the purpose of React 19 useOptimistic?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "useOptimistic lets client components display predicted mutation state immediately when a user triggers an action, providing 0ms perceived feedback while the server action validates and persists the change in the background.",
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
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <BlogPostClient />
    </>
  );
}
