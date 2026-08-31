import type { Metadata } from "next";
import { siteUrl, absoluteUrl } from "@/lib/seo";
import { profile } from "@/content/portfolio";
import { BlogPostClient } from "./BlogPostClient";

const title = "The Page Felt Slow. React Wasn't the Bottleneck.";
const description =
  "A slow React page may actually be waiting on the backend. Learn how to trace request latency, inspect MongoDB queries, and find the real bottleneck.";
const slug = "/react-page-slow-database-query-bottleneck";
const publishedDate = "2026-08-31";
const heroImage = "/react-page-slow-database-query-bottleneck-hero.webp";
const heroImageAlt = "A request pipeline diagram showing latency concentrated in the database layer, not the React render";

export const metadata: Metadata = {
  title,
  description,
  keywords: [
    "React slow API response",
    "MongoDB query performance",
    "MongoDB executionStats",
    "database query optimization",
    "full-stack performance debugging",
    "MongoDB indexes and query plans",
    "debugging attribution",
    "request latency",
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
      "React slow API response, MongoDB query performance, MongoDB executionStats, database query optimization, full-stack performance debugging, MongoDB indexes and query plans",
  };

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "How do I know whether React or the backend is making a page slow?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Start by separating render time from request time. If the browser spends most of the interaction waiting for an API response, frontend rendering is unlikely to explain that portion of the delay. Measure the API handler next, then continue deeper until the dominant work is isolated.",
        },
      },
      {
        "@type": "Question",
        name: "Does a slow MongoDB query always mean I need another index?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "No. An index is one possible solution. First inspect the query's execution plan and access pattern. The problem may involve an unsuitable index, excessive documents examined, unnecessary fields, unbounded results, sorting, repeated queries, or API-level query waterfalls.",
        },
      },
      {
        "@type": "Question",
        name: "What does totalDocsExamined mean in MongoDB?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "It indicates how many documents MongoDB examined while executing the query. Comparing it with nReturned can help reveal cases where the database inspects much more data than the application ultimately receives.",
        },
      },
      {
        "@type": "Question",
        name: "Is IXSCAN always better than COLLSCAN?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "No. An index scan only tells you that an index is involved. You still need to examine the amount of work performed and consider the size and shape of the data. Collection scans can also be perfectly reasonable for very small collections or particular workloads.",
        },
      },
      {
        "@type": "Question",
        name: "Should I optimize React after fixing the database query?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Only if measurements show there is still meaningful frontend work to remove. Database optimization and React optimization solve different parts of the request lifecycle. Retest the complete interaction after every meaningful change.",
        },
      },
      {
        "@type": "Question",
        name: "What should I measure first when a page feels slow?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Measure the user-visible interaction first, then divide it at system boundaries: browser request, server handler, database operation, and query execution. The goal is to find where elapsed time accumulates before changing code.",
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
