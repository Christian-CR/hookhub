export type HookCategory =
  | "formatting"
  | "security"
  | "notification"
  | "validation"
  | "automation"
  | "integration";

export type Hook = {
  id: string;
  name: string;
  category: HookCategory;
  event: string;
  description: string;
  repoUrl: string;
  author?: string;
  tags?: string[];
};

export const hooks: Hook[] = [
  {
    id: "prettier-auto-format",
    name: "Auto-format with Prettier",
    category: "formatting",
    event: "PostToolUse",
    description:
      "Automatically runs Prettier on any file edited or written by Claude, ensuring consistent code style without manual intervention.",
    repoUrl: "https://github.com/anthropics/claude-code/tree/main/examples/hooks",
    author: "Anthropic",
    tags: ["prettier", "formatting", "code-style"],
  },
  {
    id: "protected-file-guard",
    name: "Protected File Guard",
    category: "security",
    event: "PreToolUse",
    description:
      "Blocks Claude from editing sensitive files like .env, package-lock.json, or any files matching configurable protected patterns.",
    repoUrl: "https://github.com/anthropics/claude-code/tree/main/examples/hooks",
    author: "Anthropic",
    tags: ["security", "file-protection", "env"],
  },
  {
    id: "macos-notification",
    name: "macOS Notification Bell",
    category: "notification",
    event: "Notification",
    description:
      "Sends a native macOS notification via osascript whenever Claude needs your attention or finishes a long-running task.",
    repoUrl: "https://github.com/anthropics/claude-code/tree/main/examples/hooks",
    author: "Anthropic",
    tags: ["macos", "notification", "osascript"],
  },
  {
    id: "test-verifier",
    name: "Test Suite Verifier",
    category: "validation",
    event: "Stop",
    description:
      "Spawns a subagent before Claude finishes a turn to run your test suite and verify all tests pass. Blocks the turn from completing if tests fail.",
    repoUrl: "https://github.com/anthropics/claude-code/tree/main/examples/hooks",
    author: "Anthropic",
    tags: ["testing", "validation", "ci"],
  },
  {
    id: "bash-command-validator",
    name: "Bash Command Validator",
    category: "security",
    event: "PreToolUse",
    description:
      "Inspects every Bash command before execution and blocks dangerous patterns like rm -rf, force-push, or drop table commands.",
    repoUrl: "https://github.com/anthropics/claude-code/blob/main/examples/hooks/bash_command_validator_example.py",
    author: "Anthropic",
    tags: ["bash", "security", "validation"],
  },
  {
    id: "context-reinjector",
    name: "Context Re-injector",
    category: "automation",
    event: "SessionStart",
    description:
      "After context compaction, automatically re-injects critical project rules (e.g. use Bun not npm) so Claude never forgets them mid-session.",
    repoUrl: "https://github.com/anthropics/claude-code/tree/main/examples/hooks",
    author: "Community",
    tags: ["context", "compaction", "session"],
  },
  {
    id: "config-audit-log",
    name: "Config Change Audit Log",
    category: "integration",
    event: "ConfigChange",
    description:
      "Appends a timestamped JSON entry to an audit log file every time Claude modifies a settings or configuration file during a session.",
    repoUrl: "https://github.com/anthropics/claude-code/tree/main/examples/hooks",
    author: "Community",
    tags: ["audit", "logging", "config"],
  },
  {
    id: "eslint-auto-fix",
    name: "ESLint Auto-fix",
    category: "formatting",
    event: "PostToolUse",
    description:
      "Runs ESLint --fix on TypeScript and JavaScript files after Claude edits them, keeping linting errors from accumulating across a session.",
    repoUrl: "https://github.com/anthropics/claude-code/tree/main/examples/hooks",
    author: "Community",
    tags: ["eslint", "formatting", "typescript"],
  },
  {
    id: "slack-notify",
    name: "Slack Task Notifier",
    category: "notification",
    event: "Stop",
    description:
      "Posts a Slack message to a configured channel when Claude completes a task, useful for long-running background agent jobs.",
    repoUrl: "https://github.com/anthropics/claude-code/tree/main/examples/hooks",
    author: "Community",
    tags: ["slack", "notification", "webhook"],
  },
  {
    id: "git-pre-push-check",
    name: "Git Pre-push Safety Check",
    category: "validation",
    event: "PreToolUse",
    description:
      "Intercepts any git push commands and verifies the target branch is not main/master, preventing accidental direct pushes to protected branches.",
    repoUrl: "https://github.com/anthropics/claude-code/tree/main/examples/hooks",
    author: "Community",
    tags: ["git", "safety", "branch-protection"],
  },
  {
    id: "linear-task-sync",
    name: "Linear Task Sync",
    category: "integration",
    event: "TaskCompleted",
    description:
      "When Claude marks a task as completed, automatically updates the corresponding Linear issue status via the Linear API.",
    repoUrl: "https://github.com/anthropics/claude-code/tree/main/examples/hooks",
    author: "Community",
    tags: ["linear", "project-management", "api"],
  },
  {
    id: "permission-auto-approver",
    name: "Permission Auto-approver",
    category: "automation",
    event: "PermissionRequest",
    description:
      "Automatically approves a configurable allow-list of permission requests (e.g. ExitPlanMode, specific tools) so Claude doesn't pause for routine actions.",
    repoUrl: "https://github.com/anthropics/claude-code/tree/main/examples/hooks",
    author: "Community",
    tags: ["permissions", "automation", "workflow"],
  },
];
