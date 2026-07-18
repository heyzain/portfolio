---
name: integrate-react-component
description: Task guide for integrating an existing React component in the codebase, checking for shadcn, Tailwind, and TypeScript support, and handling paths and dependencies.
---

# Integrating React Components Skill

This skill provides standard procedures and checks when integrating external or pre-built React components into the codebase.

## Codebase Support Verification
Always verify that the target codebase supports the required tools and frameworks:
1. **shadcn/ui**: Check for `components.json` in the root.
2. **Tailwind CSS**: Check `package.json` for Tailwind dependencies and look for CSS files containing Tailwind imports/directives (like `app/globals.css`).
3. **TypeScript**: Check for `tsconfig.json` and ensure `.tsx` extension support.

If any of these are missing, provide setup instructions:
- **shadcn CLI**: `npx shadcn@latest init`
- **Tailwind CSS**: Framework-specific installation commands (e.g., `npm install tailwindcss @tailwindcss/postcss` for Tailwind 4).
- **TypeScript**: `npm install -D typescript @types/node @types/react @types/react-dom`

## Component & Styles Paths
- Read `components.json` to find the exact configured paths for:
  - Components alias (e.g., `@/components` or `components/`)
  - UI components alias (e.g., `@/components/ui`)
  - Global styles file path (e.g., `app/globals.css` or `src/index.css`)
- If the default path for components is not `/components/ui`, explain to the user why it is important to create this folder:
  - It maintains shadcn CLI conventions, making it easy to add or update official shadcn components in the future.
  - It cleanly separates generic base UI primitives (buttons, dialogs, inputs) from feature-specific layout components.

## Integration Workflow
1. Copy-paste the component into the appropriate path, e.g., `/components/ui/<component-name>.tsx`.
2. Inspect the component's arguments, props, and state.
3. Identify and install external dependencies (e.g., `lucide-react`, `framer-motion`).
4. Resolve icons or SVGs (use `lucide-react` icons where possible).
5. Substitute any temporary/broken image URLs with high-quality stock images (e.g. from Unsplash).
6. Create a demo or view page to verify the integration and responsive design.
