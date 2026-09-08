import type { Metadata } from "next";
import { siteUrl, absoluteUrl, personEntityId, siteName } from "@/lib/seo";
import { profile } from "@/content/portfolio";
import { BlogPostClient } from "./BlogPostClient";

const title = "Your Login Works. Your Authentication System Might Not.";
const description =
  "A successful login only proves one path works. Real authentication has to handle sessions, validation, expiry, revocation, recovery, and everything that happens after the redirect.";
const slug = "/authentication-is-a-lifecycle-not-a-login-screen";
const publishedDate = "2026-09-08";
const heroImage = "/authentication-lifecycle-hero.webp";
const heroImageAlt = "Authentication is a lifecycle, not a login screen: verify, issue, store, validate, rotate, revoke, recover";

export const metadata: Metadata = {
  title: `${title} — Zain Ali | HeyZain`,
  description,
  keywords: [
    "authentication lifecycle",
    "session management",
    "session revocation",
    "authentication architecture",
    "session expiry",
    "authentication security",
    "multi-device logout",
    "token rotation",
    "web security",
    "full-stack architecture",
    "Zain Ali",
    "HeyZain",
  ],
  authors: [{ name: profile.name, url: siteUrl }],
  creator: profile.name,
  publisher: profile.name,
  alternates: {
    canonical: absoluteUrl(slug),
  },
  openGraph: {
    title: `${title} — Zain Ali | HeyZain`,
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
    title: `${title} — Zain Ali | HeyZain`,
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
      "authentication lifecycle, session management, session revocation, authentication architecture, session expiry, authentication security, multi-device logout",
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
