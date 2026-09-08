import type { MetadataRoute } from "next";
import { absoluteUrl } from "@/lib/seo";

export default function sitemap(): MetadataRoute.Sitemap {
  const lastMod = new Date();

  return [
    {
      url: absoluteUrl("/"),
      lastModified: lastMod,
      changeFrequency: "weekly",
      priority: 1.0,
    },
    {
      url: absoluteUrl("/about"),
      lastModified: lastMod,
      changeFrequency: "monthly",
      priority: 0.95,
    },
    {
      url: absoluteUrl("/projects"),
      lastModified: lastMod,
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: absoluteUrl("/projects/linkvault"),
      lastModified: lastMod,
      changeFrequency: "monthly",
      priority: 0.85,
    },
    {
      url: absoluteUrl("/projects/dentalbox"),
      lastModified: lastMod,
      changeFrequency: "monthly",
      priority: 0.85,
    },
    {
      url: absoluteUrl("/projects/bookmi"),
      lastModified: lastMod,
      changeFrequency: "monthly",
      priority: 0.85,
    },
    {
      url: absoluteUrl("/projects/readmycup"),
      lastModified: lastMod,
      changeFrequency: "monthly",
      priority: 0.85,
    },
    {
      url: absoluteUrl("/projects/mt4life"),
      lastModified: lastMod,
      changeFrequency: "monthly",
      priority: 0.85,
    },
    {
      url: absoluteUrl("/writing"),
      lastModified: lastMod,
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: absoluteUrl("/react-page-slow-database-query-bottleneck"),
      lastModified: lastMod,
      changeFrequency: "monthly",
      priority: 0.85,
    },
    {
      url: absoluteUrl("/structuring-full-stack-react-apps-for-speed"),
      lastModified: lastMod,
      changeFrequency: "monthly",
      priority: 0.85,
    },
    {
      url: absoluteUrl("/react-ui-buggy-remembers-too-much"),
      lastModified: lastMod,
      changeFrequency: "monthly",
      priority: 0.85,
    },
    {
      url: absoluteUrl("/lighthouse-score-green-website-feels-slow"),
      lastModified: lastMod,
      changeFrequency: "monthly",
      priority: 0.85,
    },
    {
      url: absoluteUrl("/authentication-is-a-lifecycle-not-a-login-screen"),
      lastModified: lastMod,
      changeFrequency: "monthly",
      priority: 0.85,
    },
  ];
}
