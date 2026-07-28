const fallbackSiteUrl = "https://heyzain.dev";

export const siteUrl = (process.env.NEXT_PUBLIC_SITE_URL || fallbackSiteUrl).replace(/\/$/, "");

export const siteName = "Zain Ali Portfolio";

export const siteDescription =
  "Portfolio of Zain Ali, a full-stack developer building practical web apps with Next.js, React, TypeScript, Node.js, and MongoDB.";

export const siteKeywords = [
  "Zain Ali",
  "Full-Stack Developer",
  "Next.js Developer",
  "React Developer",
  "TypeScript Developer",
  "Node.js Developer",
  "MongoDB Developer",
  "Pakistan Developer",
  "Portfolio",
];

export const absoluteUrl = (path = "/") => `${siteUrl}${path.startsWith("/") ? path : `/${path}`}`;
