// NOTE: no portrait photo was found on the source site — drop a real photo
// into public/assets/portrait.jpg, or update this path.
const portrait = "/assets/portrait.jpg";

export const profile = {
  name: "Zain Ali",
  role: "Full-Stack Developer",
  location: "Pakistan",
  email: "zainali.portfolio@gmail.com",
  github: "github.com/zainali954",
  linkedin: "linkedin.com/in/zain-ali-1a49b2361",
  resumeUrl: "https://drive.google.com/file/d/1XMS7GXx-FljlbCnH8Zg_n85QSIRgASQP/view?usp=sharing",
  portrait,
};

export const education = {
  degree: "Bachelor of Sciences in Computer Science (BSCS)",
  university: "University of Mianwali",
  years: "2020–2024",
  cgpa: "3.4 / 4.0",
};

// The section index — drives the fixed nav rail and the numbered eyebrow in
// each section. Seven sections, top to bottom; `id` must match the `id` on the
// corresponding <section>.
export const sections = [
  { id: "intro", num: "①", label: "INTRO" },
  { id: "background", num: "②", label: "BACKGROUND" },
  { id: "stack", num: "③", label: "THE STACK" },
  { id: "experience", num: "④", label: "EXPERIENCE" },
  { id: "work", num: "⑤", label: "SELECTED WORK" },
  { id: "after-hours", num: "⑥", label: "AFTER HOURS" },
  { id: "contact", num: "⑦", label: "CONTACT" },
];

// The toolset, grouped as layers of the stack (top = closest to the user,
// bottom = the foundation everything rests on). Drives "The Stack" section.
// Each layer carries `build` — what actually gets made at that layer — and
// `proof` — the shipped projects that demonstrate it, so the section reads as
// capability, not a bare tool list.
export const stack = [
  {
    index: "01",
    layer: "Frontend",
    descriptor: "interfaces people actually use",
    build:
      "Component-driven UIs in React with predictable Redux state, styled with Tailwind — responsive layouts, accessible controls, and interactions that stay fast.",
    proof: ["LinkVault", "Snapsack"],
    items: [
      { name: "React", note: "component systems" },
      { name: "Next.js", note: "app routing" },
      { name: "TypeScript", note: "typed UI logic" },
      { name: "Tailwind CSS", note: "responsive styling" },
      { name: "Redux", note: "predictable state" },
      { name: "Radix UI", note: "accessible primitives" },
    ],
  },
  {
    index: "02",
    layer: "Backend",
    descriptor: "APIs, auth, and business logic",
    build:
      "REST APIs and auth flows on Node + Express — routing, middleware, input validation, and sessions that don't leak.",
    proof: ["ZephyrLint", "Tickure"],
    items: [
      { name: "Node.js", note: "runtime" },
      { name: "Express.js", note: "routing" },
      { name: "REST APIs", note: "resource design" },
      { name: "JWT/Auth", note: "secure sessions" },
      { name: "RBAC", note: "permissions" },
      { name: "Zod", note: "validation" },
    ],
  },
  {
    index: "03",
    layer: "Data",
    descriptor: "storage, models, and queries",
    build:
      "Schema design and queries in MongoDB, with Firebase for auth and realtime when the job calls for it.",
    proof: ["Tickure", "LinkVault"],
    items: [
      { name: "MongoDB", note: "document data" },
      { name: "Mongoose", note: "schemas" },
      { name: "Firebase", note: "auth & realtime" },
      { name: "PostgreSQL", note: "relational data" },
      { name: "Analytics", note: "dashboards" },
    ],
  },
  {
    index: "04",
    layer: "Delivery",
    descriptor: "ship, observe, improve",
    build:
      "Version control and collaboration discipline — branch, review, and ship to production on Vercel.",
    proof: ["Every project"],
    items: [
      { name: "Git", note: "version history" },
      { name: "GitHub", note: "collaboration" },
      { name: "Vercel", note: "deployment" },
      { name: "ESLint", note: "quality checks" },
      { name: "Postman", note: "API testing" },
    ],
  },
];

// Flat list derived from the stack — used by the Background margin note.
export const skills = stack.flatMap((l) => l.items.map((i) => i.name));

// DRAFT — the two paragraphs after the first are placeholder narrative
// written for review. Edit freely; swap in real specifics (what got you
// started, a moment that stuck, what you actually chase in a project).
export const essay = {
  paragraphs: [
    "I'm a self-taught developer passionate about building practical web apps. Every project I create helps me learn, improve, and get closer to real-world readiness.",
    "My path here wasn't a straight line through a classroom. Alongside my BSCS coursework at the University of Mianwali, most of what I actually know came from outside the syllabus — reading docs until they made sense, rebuilding tutorials from scratch instead of copying them, and shipping small, rough apps just to see them work. The full stack stuck because it let me own a product end to end: the database, the API, the interface someone actually clicks on, all one connected thing instead of a slice of someone else's.",
    "I don't chase frameworks for their own sake. I care about whether an app actually solves the problem it was built for — a login that doesn't leak sessions, a dashboard that loads before you lose interest, a form that saves your work instead of losing it. That's the thread through LinkVault, ZephyrLint, Tickure and Snapsack: each one started as 'I wish this existed' and ended as something a real person could open in a browser and use. I'm still early, and I'd rather ship the honest version of something than talk myself out of shipping at all.",
  ],
  notes: [
    {
      label: education.years,
      text: `${education.degree} — ${education.university}, CGPA ${education.cgpa}`,
    },
    { label: "STACK", text: skills.join(" · ") },
    { label: "NOW", text: "Self-taught full-stack developer, shipping real-world web apps." },
    {
      label: "ETHOS",
      text: "Every project is a chance to learn, improve, and get closer to real-world readiness.",
    },
  ],
};

// About section — an executive summary, not a biography. Left column reads as
// a capability brief (summary + editorial callouts + metrics); right column
// reads as product specifications (glass spec-cards).
export const about = {
  heading: ["Building products,", "not just pages."],
  intro: [
    "I build complete web products end to end — from architecture, backend, and API design to a polished frontend and production deployment. One engineer, the whole stack, shipped.",
    "I've delivered SaaS platforms, marketplaces, AI applications, booking systems and dashboards — with authentication, role-based access, and payment integrations built to hold up in production.",
  ],
  callouts: [
    {
      label: "WHAT I BUILD",
      items: ["SaaS Platforms", "AI Applications", "Marketplaces", "Booking Systems", "Internal Dashboards"],
    },
    {
      label: "WHAT I VALUE",
      items: ["Performance", "Security", "Scalability", "Maintainability", "User Experience"],
    },
    {
      label: "CURRENT FOCUS",
      items: ["AI Workflows", "Product Engineering", "Modern Web Architecture"],
    },
  ],
  metrics: [
    { value: "12+", label: "Projects Built" },
    { value: "6+", label: "Production Apps" },
    { value: "1+", label: "Years Building" },
    { value: "End-to-End", label: "Product Development" },
  ],
  profileCard: {
    role: profile.role,
    location: profile.location,
    availability: "Available for Remote",
  },
  specialization: ["Next.js", "React", "TypeScript", "Node.js", "PostgreSQL", "MongoDB"],
  productExperience: ["SaaS", "AI Applications", "Dashboards", "Booking Platforms", "Marketplaces", "Internal Tools"],
  coreExpertise: [
    "Authentication",
    "Authorization (RBAC)",
    "Payment Systems",
    "API Design",
    "Database Architecture",
    "Performance Optimization",
  ],
  building: {
    title: "SyncLad",
    subtitle: "AI Development Workspace",
    desc: "A unified workspace where AI agents and engineers build together.",
  },
};

export const experience = [
  {
    year: "2024",
    span: "Oct 2024 - Jan 2025",
    company: "Started from zero",
    role: "Self-taught full-stack foundation",
    blurb:
      "October 2024 is where the serious learning started: no polished path, just daily practice, documentation, tutorials rebuilt from scratch, and small experiments that slowly turned into real product thinking.",
    bullets: [
      "Built the core base in HTML, CSS, JavaScript, React, and backend fundamentals.",
      "Practiced by rebuilding interfaces and then changing them until the logic made sense.",
      "Learned debugging discipline, Git workflow, deployment basics, and how frontend and backend pieces connect.",
    ],
    stack: ["HTML", "CSS", "JavaScript", "React", "Git"],
  },
  {
    year: "2025",
    span: "Feb 2025 - Oct 2025",
    company: "Product practice",
    role: "Portfolio projects and full-stack builds",
    blurb:
      "The learning moved from isolated concepts into complete apps. LinkVault, ZephyrLint, Tickure, and Snapsack became the proof: authentication, dashboards, CRUD flows, APIs, databases, and user-facing polish.",
    bullets: [
      "Shipped multiple full-stack projects with secure login, dashboards, filters, analytics, and admin-style workflows.",
      "Designed and implemented API routes, MongoDB models, protected UI states, and responsive product interfaces.",
      "Used each project to practice the real cycle: idea, structure, build, test, deploy, improve.",
    ],
    stack: ["React", "Node.js", "Express", "MongoDB", "Tailwind"],
  },
  {
    year: "2025",
    span: "Oct 20, 2025 - Present",
    company: "Kakushin",
    role: "Full-Stack Developer",
    blurb:
      "The first professional chapter started on October 20, 2025. After a year of focused self-learning and shipped projects, the work shifted into a real team environment: building production features, collaborating, and turning requirements into usable web experiences.",
    bullets: [
      "Work across frontend and backend tasks with a product-minded full-stack approach.",
      "Translate requirements into usable interfaces, data flows, and maintainable application code.",
      "Bring the same self-taught momentum into professional delivery: learn fast, communicate clearly, and ship carefully.",
    ],
    stack: ["Next.js", "React", "TypeScript", "Node.js", "MongoDB"],
  },
];

export const workProjects = [
  {
    num: "01",
    title: "LinkVault",
    subtitle: "Personal link management app",
    desc: "LinkVault is a personal link management app that lets users save, categorize, and tag links with a secure login system. It includes features like smart search, favorites, filtering, and a full dashboard with category, tag, and task organization.",
    stack: "React · Node.js · MongoDB · Express",
    rolenote: "Solo build — design & development",
    image: "https://res.cloudinary.com/dyt6y8t5r/image/upload/v1748774960/linkvault_qfn445.png",
    githubLink: "https://github.com/zainali954/Linkvault",
    liveLink: "https://linkvault-six.vercel.app/",
  },
  {
    num: "02",
    title: "ZephyrLint",
    subtitle: "AI-powered code review dashboard",
    desc: "ZephyrLint delivers secure, AI-powered code reviews through a web dashboard, utilizing the Gemini model for analysis across most programming languages. Benefit from diverse review options (deep, rewrite, performance), history preservation, and full control to copy, download, or share your results.",
    stack: "React · Node.js · MongoDB · Express · EChart.js",
    rolenote: "Solo build — design & development",
    image: "https://res.cloudinary.com/dyt6y8t5r/image/upload/v1748774960/zephyrlint_fihyiy.png",
    githubLink: "https://github.com/zainali954/ZephyrLint",
    liveLink: "https://zephyrlint.vercel.app/",
  },
  {
    num: "03",
    title: "Tickure",
    subtitle: "Task management & analytics",
    desc: "Tickure is a personal task management web app featuring user authentication, category and label-based organization, advanced filtering and sorting, and a detailed analytics dashboard. It includes a full CRUD system with a responsive UI and supports calendar view and subtask tracking.",
    stack: "React · Node.js · MongoDB · Express · EChart.js",
    rolenote: "Solo build — design & development",
    image:
      "https://res.cloudinary.com/dyt6y8t5r/image/upload/v1746683072/Tickure_2025-05-08T05-42-44-372Z_ybgwo1.png",
    githubLink: "https://github.com/zainali954/tickure",
    liveLink: "https://tickure.vercel.app/",
  },
  {
    num: "04",
    title: "Snapsack",
    subtitle: "Full-featured e-commerce app",
    desc: "Snapsack is a full-featured e-commerce web application with user authentication, product listing, search, sorting, filtering, cart functionality, and a complete admin panel. All core features have been implemented except for payment integration.",
    stack: "React · Tailwind · MongoDB · EChart.js · Node.js · Express.js",
    rolenote: "Solo build — design & development",
    image:
      "https://res.cloudinary.com/dyt6y8t5r/image/upload/v1746683073/SnapSack_2025-05-08T05-42-19-188Z_og4ofy.png",
    githubLink: "https://github.com/zainali954/snapsack",
    liveLink: "https://snapsack-user-frontend.vercel.app/",
  },
];

// Reusing the same 4 real projects as draggable cards (no separate hobby
// projects exist on the source site).
export const hobbyProjects = workProjects.map((p, i) => ({
  title: p.title,
  caption: p.subtitle,
  detail: p.stack,
  image: p.image,
  rotate: [-4, 3, -2, 5][i],
  x: ["6%", "40%", "20%", "56%"][i],
  y: ["8%", "2%", "46%", "40%"][i],
}));
