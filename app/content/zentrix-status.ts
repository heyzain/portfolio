export interface FeatureItem {
  name: string;
  subItems?: string[];
  status: "Complete — Verified" | "In Progress — Partial" | "Planned — Not Implemented";
}

export interface FeatureCategoryGroup {
  title: string;
  statusLabel: string;
  badgeStyle: string;
  description: string;
  features: FeatureItem[];
}

export const zentrixFeatureStatus: {
  completed: FeatureCategoryGroup;
  inProgress: FeatureCategoryGroup;
  planned: FeatureCategoryGroup;
} = {
  completed: {
    title: "COMPLETE — VERIFIED",
    statusLabel: "Complete — Verified",
    badgeStyle: "border-emerald-500/25 bg-emerald-500/10 text-emerald-800 dark:text-emerald-300",
    description: "These features have been manually verified by the developer in the codebase.",
    features: [
      {
        name: "1. Authentication",
        status: "Complete — Verified",
        subItems: [
          "Learner signup",
          "Email verification and resend",
          "Login and logout",
          "Forgot password and password reset",
        ],
      },
      {
        name: "2. Role-based access",
        status: "Complete — Verified",
        subItems: ["Learner", "Tutor", "Administrator"],
      },
      {
        name: "3. Course catalog",
        status: "Complete — Verified",
        subItems: [
          "Course discovery",
          "Search and catalog functionality",
          "Course details and visibility",
        ],
      },
      {
        name: "4. Course management",
        status: "Complete — Verified",
        subItems: [
          "Course creation and editing",
          "Modules and lessons",
          "Draft saving and submission",
          "Administrative course moderation",
        ],
      },
      {
        name: "5. Enrollment and progress",
        status: "Complete — Verified",
        subItems: [
          "Free course enrollment",
          "Enrollment validation",
          "Lesson access",
          "Persistent learning progress",
        ],
      },
      {
        name: "6. Quizzes",
        status: "Complete — Verified",
        subItems: [
          "Quiz authoring",
          "Learner submissions",
          "Scoring",
          "Attempt integrity",
        ],
      },
      {
        name: "7. Admin management",
        status: "Complete — Verified",
        subItems: [
          "User management",
          "Tutor approval",
          "Course moderation",
        ],
      },
      {
        name: "8. Certificates",
        status: "Complete — Verified",
      },
      {
        name: "9. Course reviews and ratings",
        status: "Complete — Verified",
      },
      {
        name: "10. Dashboards and analytics",
        status: "Complete — Verified",
      },
      {
        name: "11. OAuth authentication",
        status: "Complete — Verified",
      },
    ],
  },
  inProgress: {
    title: "IN PROGRESS",
    statusLabel: "In Progress — Partial",
    badgeStyle: "border-amber-500/25 bg-amber-500/10 text-amber-800 dark:text-amber-300",
    description: "These features have implementation in the codebase but still require additional work or complete workflow verification.",
    features: [
      {
        name: "1. Media management",
        status: "In Progress — Partial",
        subItems: [
          "Provider-backed upload and playback refinements",
          "Document delivery",
          "Failure and recovery testing",
        ],
      },
      {
        name: "2. Assignments",
        status: "In Progress — Partial",
        subItems: [
          "Submission and grading workflow improvements",
          "Due-date enforcement",
          "Resubmission functionality",
        ],
      },
      {
        name: "3. Cohorts",
        status: "In Progress — Partial",
        subItems: [
          "Scheduling and lifecycle verification",
          "Cohort operations",
        ],
      },
      {
        name: "4. Live sessions",
        status: "In Progress — Partial",
        subItems: [
          "Real-time audio/video verification",
          "Screen sharing",
          "Attendance",
          "Reconnection and room behavior",
        ],
      },
      {
        name: "5. Calendar",
        status: "In Progress — Partial",
        subItems: [
          "Scheduling and rescheduling",
          "Cancellation",
          "Timezone correctness",
        ],
      },
      {
        name: "6. Automated QA improvements",
        status: "In Progress — Partial",
        subItems: [
          "Resolve the Windows Vitest startup issue",
          "Complete linting",
          "Expand end-to-end regression checks",
        ],
      },
    ],
  },
  planned: {
    title: "PLANNED",
    statusLabel: "Planned — Not Implemented",
    badgeStyle: "border-ink/15 bg-ink/5 text-ink/70 dark:text-ink/80",
    description: "These features are on the roadmap and are not yet fully implemented.",
    features: [
      {
        name: "1. Stripe payments",
        status: "Planned — Not Implemented",
        subItems: [
          "Checkout",
          "Payment confirmation",
          "Webhook handling",
          "Paid course enrollment",
        ],
      },
      {
        name: "2. Payment management",
        status: "Planned — Not Implemented",
        subItems: [
          "Payment history",
          "Refund handling",
        ],
      },
      {
        name: "3. Messaging",
        status: "Planned — Not Implemented",
        subItems: [
          "Tutor and learner conversations",
          "Persistent message history",
          "Delivery and read states",
        ],
      },
      {
        name: "4. Real-time notifications",
        status: "Planned — Not Implemented",
        subItems: [
          "Persistent notifications",
          "Live delivery",
          "Read/unread state",
        ],
      },
      {
        name: "5. Settings and preferences",
        status: "Planned — Not Implemented",
        subItems: [
          "Complete tutor settings",
          "Account preferences",
          "Persistent settings management",
        ],
      },
    ],
  },
};
