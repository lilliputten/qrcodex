
# Project Instructions

Always create `TODO-{task-name}.md` roadmaps before long tasks and update progress after each step.

## Project structure

- Source root: `src`.
- Used code aliases: `import from '@/i18n'` instead of `import from '../i18n'`.

## Stack

- Package manager: pnpm.
- Backend: Next.js + app router.
- Frontend: Next.js + app router, React, TypeScript.
- Formatting/linting: biomejs.

## Before finishing

- Run formatting and linting (biome and tsc: `biome lint && tsc --pretty --noEmit`).
- Summarize changed files and any unresolved issues.

## Common rules

- Never use `any` type.
- Always run `pnpm check-all` or `biome lint && tsc --pretty --noEmit` to check and fix all errors.
- Always use English language.


<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->
