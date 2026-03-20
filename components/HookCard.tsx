import { Hook, HookCategory } from "@/lib/hooks-data";

const categoryStyles: Record<HookCategory, { badge: string; label: string }> = {
  formatting: { badge: "bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-300", label: "Formatting" },
  security: { badge: "bg-red-100 text-red-700 dark:bg-red-900/40 dark:text-red-300", label: "Security" },
  notification: { badge: "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/40 dark:text-yellow-300", label: "Notification" },
  validation: { badge: "bg-orange-100 text-orange-700 dark:bg-orange-900/40 dark:text-orange-300", label: "Validation" },
  automation: { badge: "bg-green-100 text-green-700 dark:bg-green-900/40 dark:text-green-300", label: "Automation" },
  integration: { badge: "bg-purple-100 text-purple-700 dark:bg-purple-900/40 dark:text-purple-300", label: "Integration" },
};

export default function HookCard({ hook }: { hook: Hook }) {
  const { badge, label } = categoryStyles[hook.category];

  return (
    <div className="flex flex-col gap-3 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 p-5 shadow-sm hover:shadow-md transition-shadow duration-200">
      <div className="flex items-center justify-between gap-2">
        <span className={`inline-block rounded-full px-2.5 py-0.5 text-xs font-medium ${badge}`}>
          {label}
        </span>
        <span className="text-xs text-zinc-400 dark:text-zinc-500 font-mono">
          {hook.event}
        </span>
      </div>

      <div>
        <h2 className="text-base font-semibold text-zinc-900 dark:text-zinc-100">
          {hook.name}
        </h2>
        <p className="mt-1 text-sm text-zinc-500 dark:text-zinc-400 line-clamp-3">
          {hook.description}
        </p>
      </div>

      <div className="mt-auto pt-2 flex items-center justify-between">
        {hook.author && (
          <span className="text-xs text-zinc-400 dark:text-zinc-500">
            by {hook.author}
          </span>
        )}
        <a
          href={hook.repoUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="ml-auto text-sm font-medium text-zinc-700 dark:text-zinc-300 hover:text-zinc-900 dark:hover:text-white underline underline-offset-2"
        >
          View on GitHub →
        </a>
      </div>
    </div>
  );
}
