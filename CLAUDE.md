# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Repository Purpose

HookHub is an MVP gallery for browsing open-source Claude Code hooks. It's a static, client-side only Next.js 16 application with no backend or database. The app displays a curated collection of hooks with search and filtering functionality.

## Tech Stack

- **Next.js 16.1.6** — App Router, server and client components
- **React 19.2.3** — Component framework
- **TypeScript 5** — Type safety
- **Tailwind CSS 4** — Styling with dark mode support
- **ESLint 9** — Code linting

## Commands

```bash
npm run dev      # Start dev server at http://localhost:3000 (with hot reload)
npm run build    # Production build (also runs TypeScript type check)
npm run start    # Start production server
npm run lint     # Run ESLint on all TypeScript/JavaScript files
```

## Architecture

### High-Level Structure

The app follows Next.js App Router conventions:
- **`app/`** — Routes and layouts (currently just home page)
- **`components/`** — React components (HookCard, HookGrid)
- **`lib/`** — Shared utilities and data (hooks-data.ts with Hook type definitions)

### Data Flow

1. **`lib/hooks-data.ts`** — Static array of Hook objects and TypeScript type definitions (`Hook`, `HookCategory`)
   - All hook data lives here; changes to the gallery require editing this file
   - `Hook` type includes: `id`, `name`, `category`, `event`, `description`, `repoUrl`, `author?`, `tags?`
   - `HookCategory` enum: "formatting", "security", "notification", "validation", "automation", "integration"

2. **`components/HookGrid.tsx`** — Maps over hooks array, renders a responsive 1-3 column grid (mobile → desktop)
   - Client component (uses "use client" hook data access)

3. **`components/HookCard.tsx`** — Individual hook card with:
   - Category badge with color-coded styles (defined in `categoryStyles` record)
   - Hook event type as monospace label
   - Name, description (clamped to 3 lines), author, and GitHub link

4. **`app/page.tsx`** — Home page, renders the HookGrid inside a max-width container with header

### Styling

- **`app/globals.css`** — Tailwind imports and CSS variables for light/dark theme
- **`app/layout.tsx`** — Root layout with Geist font setup and metadata
- Dark mode is fully supported via Tailwind `dark:` variants; no manual toggle is implemented
- Category colors are inline in `HookCard.tsx`

## Adding New Hooks

To add a new hook to the gallery:

1. Open `lib/hooks-data.ts`
2. Append a new object to the `hooks` array with the following structure:

```typescript
{
  id: "kebab-case-id",
  name: "Display Name",
  category: "formatting" | "security" | "notification" | "validation" | "automation" | "integration",
  event: "PostToolUse" | "PreToolUse" | "SessionStart" | /* etc */,
  description: "Short description of functionality",
  repoUrl: "https://github.com/...",
  author?: "Author Name or Anthropic",
  tags?: ["tag1", "tag2"],
}
```

The grid will automatically re-render with the new hook.

## Notes

- No test infrastructure is configured.
- No database or backend — all data is static in `lib/hooks-data.ts`.
- Path alias `@/*` resolves to the project root (`hookhub/`).
- TypeScript strict mode is enabled (`strict: true` in tsconfig.json).
