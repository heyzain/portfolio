const fallbackSiteUrl = "https://www.heyzain.dev";

export const siteUrl = (process.env.NEXT_PUBLIC_SITE_URL || fallbackSiteUrl).replace(/\/$/, "");

export const siteName = "HeyZain";
export const siteTitleDefault = "Zain Ali — Full-Stack Developer | Next.js, React & Node.js";

export const siteDescription =
  "HeyZain is the engineering portfolio and technical publication of Zain Ali, a full-stack developer and software engineer specializing in Next.js, React, Node.js, TypeScript, and MongoDB.";

export const siteKeywords = [
  "Zain Ali",
  "HeyZain",
  "Full-Stack Developer",
  "Next.js Developer",
  "React Developer",
  "Node.js Developer",
  "TypeScript Developer",
  "MongoDB Developer",
  "SaaS Developer",
  "Pakistan Developer",
  "Web Architecture",
  "Portfolio",
];

export const absoluteUrl = (path = "/") => `${siteUrl}${path.startsWith("/") ? path : `/${path}`}`;

export const personEntityId = `${siteUrl}/#person`;
export const websiteEntityId = `${siteUrl}/#website`;

export const sameAsProfiles = [
  "https://github.com/heyzain",
  "https://www.linkedin.com/in/iamzainali",
];

export const knowsAboutTopics = [
  "Full-Stack Development",
  "Next.js",
  "React",
  "Node.js",
  "TypeScript",
  "MongoDB",
  "SaaS Development",
  "Web Development",
  "REST APIs",
  "PostgreSQL",
  "Tailwind CSS",
  "System Architecture",
  "Frontend Performance",
];

export function getPersonSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    "@id": personEntityId,
    name: "Zain Ali",
    alternateName: "HeyZain",
    url: `${siteUrl}/`,
    jobTitle: "Full-Stack Developer",
    description: siteDescription,
    image: absoluteUrl("/android-chrome-512x512.png"),
    email: "mailto:zainali.portfolio@gmail.com",
    address: {
      "@type": "PostalAddress",
      addressCountry: "Pakistan",
    },
    sameAs: sameAsProfiles,
    knowsAbout: knowsAboutTopics,
  };
}

export function getWebSiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": websiteEntityId,
    url: `${siteUrl}/`,
    name: "HeyZain",
    alternateName: ["Hey Zain", "heyzain.dev"],
    description: siteDescription,
    publisher: {
      "@id": personEntityId,
    },
  };
}

export function getBreadcrumbSchema(items: Array<{ name: string; path: string }>) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: absoluteUrl(item.path),
    })),
  };
}

export function getSoftwareApplicationSchema(project: {
  name: string;
  description: string;
  applicationCategory: string;
  url?: string;
  operatingSystem?: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: project.name,
    description: project.description,
    applicationCategory: project.applicationCategory,
    operatingSystem: project.operatingSystem || "Web",
    url: project.url,
    author: {
      "@id": personEntityId,
    },
  };
}

export function getCollectionPageSchema(page: {
  name: string;
  description: string;
  path: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "@id": `${absoluteUrl(page.path)}#webpage`,
    url: absoluteUrl(page.path),
    name: page.name,
    description: page.description,
    mainEntity: {
      "@id": personEntityId,
    },
  };
}
