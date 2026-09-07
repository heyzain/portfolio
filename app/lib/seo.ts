const fallbackSiteUrl = "https://www.heyzain.dev";

export const siteUrl = (process.env.NEXT_PUBLIC_SITE_URL || fallbackSiteUrl).replace(/\/$/, "");

export const siteName = "HeyZain";
export const siteTitleDefault = "Zain Ali — Full-Stack Developer | Next.js, React & Node.js";

export const siteDescription =
  "Zain Ali is a full-stack developer specializing in Next.js, React, Node.js, TypeScript, and MongoDB. Explore his projects, experience, and technical writing.";

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
    image: absoluteUrl("/assets/portrait.jpg"),
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
    alternateName: "Zain Ali",
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
