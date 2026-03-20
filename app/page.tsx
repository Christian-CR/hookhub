import HookGrid from "@/components/HookGrid";

export default function Home() {
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
        <HookGrid />
      </main>
    </div>
  );
}
