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
  title,
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

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "Is authentication the same thing as login?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "No. Login is merely the entry event in the authentication lifecycle where initial identity is confirmed. Authentication encompasses issuing, storing, validating, refreshing, expiring, revoking, and recovering access over time.",
        },
      },
      {
        "@type": "Question",
        name: "Why isn't a successful login enough to prove authentication works?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Because a successful login only proves that one credential-verification path worked at a single point in time. It does not prove that sessions are stored safely, expired tokens are rejected, revoked credentials cannot access private endpoints, or that password resets terminate existing device sessions.",
        },
      },
      {
        "@type": "Question",
        name: "Why should authentication be validated on the server?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Client-side state (like isAuthenticated = true in React) is only a UI rendering hint, not a security boundary. The frontend can hide buttons, but only the server can authoritatively decide whether an incoming session token is still valid, unexpired, and unrevoked.",
        },
      },
      {
        "@type": "Question",
        name: "How can I test session revocation?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "The most reliable test is the two-browser verification: log into the same account in Browser A and Browser B. From Browser A, click 'Log out of all devices'. Then, from Browser B, make a request to a protected API endpoint. The server must reject Browser B with a 401 Unauthorized.",
        },
      },
      {
        "@type": "Question",
        name: "Should password resets invalidate existing sessions?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Yes. When a password reset occurs, the trust relationship of the account has fundamentally changed. If existing active sessions on other browsers or stolen devices remain authenticated, the account remains compromised despite the new password.",
        },
      },
      {
        "@type": "Question",
        name: "What's the difference between expiry and revocation?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Expiry is time-based and predictable: access ceases after a predefined lifetime (e.g. 15 minutes or 7 days). Revocation is intentional and event-driven: access is immediately destroyed before natural expiration due to user logout, administrative action, or security detection.",
        },
      },
      {
        "@type": "Question",
        name: "Why is testing only the happy path dangerous?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Because the vast majority of critical security breaches and embarrassing authorization bugs happen outside the happy path: expired tokens still accepted, client-only logouts that leave server sessions alive, unhandled second devices, and lack of brute-force throttling on endpoints.",
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
