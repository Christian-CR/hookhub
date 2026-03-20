# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

HookHub is a curated gallery for open-source Claude Code hooks. The MVP goal is a single browsable page where developers can discover hooks by name, category, and description, and click through to the GitHub source repo. No backend, no auth — pure display.

## Tech Stack

- **Next.js 16** with App Router (Server Components by default)
- **React 19**
- **TypeScript 5**
- **Tailwind CSS v4**
- **Geist** fonts (loaded via `next/font/google` in `app/layout.tsx`)

## Commands

```bash
cd hookhub
npm run dev      # Start dev server at http://localhost:3000
npm run build    # Production build (also type-checks)
npm run lint     # Run ESLint
```

## Data Model

Hooks are defined as static TypeScript objects in `lib/hooks-data.ts`. No database or API — all data lives in that file.

```ts
type HookCategory =
  | "formatting"
  | "security"
  | "notification"
  | "validation"
  | "automation"
  | "integration";

type Hook = {
  id: string;           // URL-safe slug, e.g. "prettier-auto-format"
  name: string;         // Display name
  category: HookCategory;
  event: string;        // Claude Code lifecycle event, e.g. "PostToolUse"
  description: string;  // 1-2 sentence explanation
  repoUrl: string;      // GitHub link (opens in new tab)
  author?: string;
  tags?: string[];
};
```

To add a new hook, append an entry to the `hooks` array in `lib/hooks-data.ts`.

## Architecture

```
hookhub/
├── app/
│   ├── layout.tsx          # Root layout — metadata, Geist fonts
│   ├── page.tsx            # Home page — header + HookGrid
│   └── globals.css         # Tailwind imports + CSS variables (light/dark)
├── components/
│   ├── HookCard.tsx        # Card for a single hook (category badge, name, event, description, GitHub link)
│   └── HookGrid.tsx        # Responsive 1→2→3 column grid of HookCards
├── lib/
│   └── hooks-data.ts       # Static hook records + TypeScript types
└── spec/
    └── CLAUDE.md           # This file
```

All components are React Server Components (no `"use client"`). Keep interactivity minimal.

## UI Conventions

### Category Badge Colors
| Category     | Tailwind classes                                                      |
|--------------|-----------------------------------------------------------------------|
| formatting   | `bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-300`   |
| security     | `bg-red-100 text-red-700 dark:bg-red-900/40 dark:text-red-300`       |
| notification | `bg-yellow-100 text-yellow-700 dark:bg-yellow-900/40 dark:text-yellow-300` |
| validation   | `bg-orange-100 text-orange-700 dark:bg-orange-900/40 dark:text-orange-300` |
| automation   | `bg-green-100 text-green-700 dark:bg-green-900/40 dark:text-green-300` |
| integration  | `bg-purple-100 text-purple-700 dark:bg-purple-900/40 dark:text-purple-300` |

### Layout
- Page background: `bg-zinc-50 dark:bg-zinc-950`
- Cards: white/`zinc-900` with `border-zinc-200 dark:border-zinc-800`, hover shadow
- Grid: `grid-cols-1 md:grid-cols-2 lg:grid-cols-3`
- Dark mode is supported via Tailwind `dark:` variants (configured in `globals.css`)

## Claude Code Hook Reference

Claude Code hooks are user-defined shell commands (or HTTP calls, LLM prompts, or subagents) that execute at specific lifecycle points. Key hook events:

| Event             | When it fires                              |
|-------------------|--------------------------------------------|
| `SessionStart`    | Session begins or resumes                  |
| `UserPromptSubmit`| User submits a prompt                      |
| `PreToolUse`      | Before a tool call executes (can block)    |
| `PostToolUse`     | After a successful tool call               |
| `PermissionRequest` | Permission dialog appears               |
| `Stop`            | Main agent finishes a turn                 |
| `Notification`    | Claude Code emits a notification           |
| `ConfigChange`    | A config file changes during a session     |
| `TaskCompleted`   | A task is marked complete                  |

Hook types: `command` (shell), `http` (webhook), `prompt` (LLM yes/no), `agent` (tool-using subagent).

Hook scope: global (`~/.claude/settings.json`), project (`.claude/settings.json`), or local (`.claude/settings.local.json`).
