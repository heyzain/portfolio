"use client";

import { ArcGalleryHero } from "@/components/ui/arc-gallery-hero-component";

const devSkills = [
  {
    name: "Next.js",
    image: "https://cdn.simpleicons.org/nextdotjs/111111/111111",
    description:
      "Building production-ready full-stack applications with the App Router, Server Actions, Route Handlers, SSR, and modern React architecture.",
    chips: ["App Router", "Server Actions", "Route Handlers", "SSR", "Authentication", "Performance"],
  },
  {
    name: "React",
    image: "https://cdn.simpleicons.org/react/61DAFB/61DAFB",
    description:
      "Creating reusable component architectures, interactive interfaces, efficient state management, and high-performance user experiences.",
    chips: ["Components", "Hooks", "State Management", "Context API", "Performance", "Reusable UI"],
  },
  {
    name: "TypeScript",
    image: "https://cdn.simpleicons.org/typescript/3178C6/3178C6",
    description:
      "Writing scalable, maintainable applications with strong typing, improved tooling, and safer development workflows.",
    chips: ["Generics", "Type Safety", "Interfaces", "Utility Types", "Strict Mode", "DX"],
  },
  {
    name: "Node.js",
    image: "https://cdn.simpleicons.org/nodedotjs/5FA04E/5FA04E",
    description:
      "Developing scalable backend services, REST APIs, authentication systems, and asynchronous server-side applications.",
    chips: ["REST APIs", "Authentication", "Middleware", "Async", "File Uploads", "Security"],
  },
  {
    name: "Express.js",
    image: "https://cdn.simpleicons.org/express/111111/111111",
    description:
      "Building clean backend architectures with modular routing, middleware, authentication, and API integrations.",
    chips: ["Routing", "Middleware", "JWT", "CRUD", "APIs", "Validation"],
  },
  {
    name: "MongoDB",
    image: "https://cdn.simpleicons.org/mongodb/47A248/47A248",
    description:
      "Designing scalable document databases with Mongoose, aggregation pipelines, indexing, and efficient data modeling.",
    chips: ["Mongoose", "Aggregation", "Indexing", "Atlas", "Transactions", "Schema Design"],
  },
  {
    name: "Firebase",
    image: "https://cdn.simpleicons.org/firebase/FFCA28/FFCA28",
    description:
      "Integrating authentication, Firestore, cloud services, and real-time backend features for modern web applications.",
    chips: ["Auth", "Firestore", "Security Rules", "Storage", "Real-time", "Cloud"],
  },
  {
    name: "Tailwind CSS",
    image: "https://cdn.simpleicons.org/tailwindcss/06B6D4/06B6D4",
    description: "Building responsive interfaces rapidly with utility-first styling and reusable design systems.",
    chips: ["Responsive", "Utility First", "Components", "Dark Mode", "Design System", "Accessibility"],
  },
  {
    name: "Socket.IO",
    image: "https://cdn.simpleicons.org/socketdotio/111111/111111",
    description: "Implementing real-time communication for notifications, messaging, and live application experiences.",
    chips: ["Real-time", "Events", "Rooms", "WebSockets", "Live Updates", "Broadcasting"],
  },
  {
    name: "Git",
    image: "https://cdn.simpleicons.org/git/F05032/F05032",
    description: "Managing version control, collaboration workflows, feature branches, and clean development history.",
    chips: ["Branching", "Merge", "Rebase", "Commits", "Workflow", "Collaboration"],
  },
  {
    name: "GitHub",
    image: "https://cdn.simpleicons.org/github/111111/111111",
    description: "Collaborating through pull requests, code reviews, repositories, and automated development workflows.",
    chips: ["Pull Requests", "Actions", "Reviews", "Issues", "Collaboration", "CI/CD"],
  },
  {
    name: "Vercel",
    image: "https://cdn.simpleicons.org/vercel/111111/111111",
    description: "Deploying modern web applications with global edge infrastructure, previews, and optimized performance.",
    chips: ["Deployment", "Edge", "Preview", "Analytics", "Speed", "Hosting"],
  },
  {
    name: "Stripe",
    image: "https://cdn.simpleicons.org/stripe/635BFF/635BFF",
    description: "Building secure payment flows including subscriptions, billing, webhooks, and checkout integrations.",
    chips: ["Checkout", "Billing", "Webhooks", "Subscriptions", "Payments", "Connect"],
  },
];

export function SkillsArc() {
  return (
    <div id="stack">
      <ArcGalleryHero
        skills={devSkills}
        title="The stack behind products that actually ship."
      />
    </div>
  );
}
