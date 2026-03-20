"use client";

import { useState } from "react";
import { hooks } from "@/lib/hooks-data";
import HookCard from "@/components/HookCard";

export default function Home() {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredHooks = hooks.filter((hook) => {
    const query = searchQuery.toLowerCase();
    return (
      hook.name.toLowerCase().includes(query) ||
      hook.description.toLowerCase().includes(query) ||
      hook.category.toLowerCase().includes(query) ||
      hook.tags?.some((tag) => tag.toLowerCase().includes(query))
    );
  });

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950">
      <main className="mx-auto max-w-7xl px-6 py-16">
        <header className="mb-12">
          <h1 className="text-4xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50">
            HookHub
          </h1>
          <p className="mt-2 text-lg text-zinc-500 dark:text-zinc-400">
            A curated collection of open-source Claude Code hooks
          </p>
        </header>

        <div className="mb-8 flex flex-col gap-4 sm:flex-row">
          <div className="flex flex-1 gap-2">
            <input
              type="text"
              placeholder="Search hooks by name, category, or tag..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="flex-1 rounded-lg border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-900 px-4 py-2 text-sm text-zinc-900 dark:text-zinc-100 placeholder-zinc-500 dark:placeholder-zinc-400 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400"
            />
            <button
              onClick={() => setSearchQuery("")}
              className="rounded-lg border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-900 px-4 py-2 text-sm font-medium text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
            >
              Clear
            </button>
          </div>
        </div>

        {filteredHooks.length > 0 ? (
          <>
            <p className="mb-6 text-sm text-zinc-500 dark:text-zinc-400">
              Found {filteredHooks.length} hook{filteredHooks.length !== 1 ? "s" : ""}
            </p>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
              {filteredHooks.map((hook) => (
                <HookCard key={hook.id} hook={hook} />
              ))}
            </div>
          </>
        ) : (
          <div className="flex flex-col items-center justify-center rounded-lg border-2 border-dashed border-zinc-300 dark:border-zinc-700 py-12 px-6">
            <p className="text-lg font-medium text-zinc-900 dark:text-zinc-100">
              No hooks found
            </p>
            <p className="mt-2 text-sm text-zinc-500 dark:text-zinc-400">
              Try adjusting your search terms
            </p>
          </div>
        )}
      </main>
    </div>
  );
}
