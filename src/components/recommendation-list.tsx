"use client";
import { useState } from "react";

/**
 * Renders a list of AI recommendations (title/reason/priority) and lets the
 * founder turn any of them into a real task. The founder stays in control -
 * nothing is created automatically.
 */
export function RecommendationList({
  items,
  startupId,
}: {
  items: { title: string; reason: string; priority: string }[];
  startupId: number | undefined;
}) {
  const [created, setCreated] = useState<Record<number, boolean>>({});
  const [error, setError] = useState("");

  async function convert(index: number) {
    if (!startupId) {
      setError("Create a startup before converting recommendations to tasks.");
      return;
    }
    const item = items[index];
    if (!item) return;
    const r = await fetch("/api/backend/ai/recommendation/to-task", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        startup_id: startupId,
        title: item.title,
        reason: item.reason,
        priority: item.priority,
      }),
    });
    if (r.ok) {
      setCreated((c) => ({ ...c, [index]: true }));
      setError("");
    } else {
      const d = await r.json().catch(() => ({}));
      setError(d.message ?? "Unable to create the task.");
    }
  }

  return (
    <div className="space-y-2">
      {items.map((a, i) => (
        <div key={i} className="rounded-lg border border-slate-200 p-3">
          <div className="flex items-start justify-between gap-3">
            <div>
              <p className="font-medium text-slate-800">
                <PriorityBadge priority={a.priority} /> {a.title}
              </p>
              <p className="mt-1 text-sm text-slate-600">{a.reason}</p>
            </div>
            {!created[i] ? (
              <button
                onClick={() => convert(i)}
                className="whitespace-nowrap rounded-md border border-brand-600 px-3 py-1 text-sm font-medium text-brand-600 hover:bg-brand-50"
              >
                Make a task
              </button>
            ) : (
              <span className="whitespace-nowrap text-sm text-emerald-600">Added to tasks</span>
            )}
          </div>
        </div>
      ))}
      {error && <p className="text-sm text-red-600">{error}</p>}
    </div>
  );
}

function PriorityBadge({ priority }: { priority: string }) {
  const cls =
    priority === "high"
      ? "bg-red-100 text-red-700"
      : priority === "medium"
        ? "bg-amber-100 text-amber-700"
        : "bg-slate-100 text-slate-600";
  return (
    <span className={`mr-1 inline-block rounded px-1.5 py-0.5 text-xs font-semibold uppercase ${cls}`}>
      {priority}
    </span>
  );
}
