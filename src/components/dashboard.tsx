"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import { RecommendationList } from "@/components/recommendation-list";
import { DashboardData, GoalHealthStatus } from "@/types/models";

const HEALTH_STYLES: Record<GoalHealthStatus, string> = {
  healthy: "bg-emerald-100 text-emerald-700",
  at_risk: "bg-amber-100 text-amber-700",
  stalled: "bg-red-100 text-red-700",
  completed: "bg-slate-200 text-slate-600",
};

export function Dashboard() {
  const [data, setData] = useState<DashboardData>();
  const [error, setError] = useState(false);

  useEffect(() => {
    fetch("/api/backend/dashboard")
      .then(async (r) => {
        if (!r.ok) throw new Error("Request failed");
        setData(await r.json());
      })
      .catch(() => setError(true));
  }, []);

  if (error)
    return (
      <main className="mx-auto max-w-5xl px-6 py-12">
        <h1 className="text-3xl font-semibold text-slate-900">Dashboard</h1>
        <p className="mt-3 text-slate-600">We couldn't load your workspace.</p>
        <button onClick={() => location.reload()} className="btn mt-4">
          Try again
        </button>
      </main>
    );

  if (!data)
    return (
      <main className="mx-auto max-w-5xl px-6 py-12">
        <h1 className="text-3xl font-semibold text-slate-900">Dashboard</h1>
        <p className="mt-3 text-slate-600">Loading your founder workspace…</p>
      </main>
    );

  return (
    <main className="mx-auto max-w-6xl">
      <p className="text-sm font-semibold uppercase tracking-wide text-brand-600">{data.startup.stage}</p>
      <h1 className="mt-1 text-3xl font-semibold text-slate-900">{data.startup.name}</h1>
      <p className="mt-2 max-w-2xl text-slate-600">{data.startup.description}</p>

      {/* Where am I? What should I do next? — one continuous read, not two boxes */}
      <section className="card mt-8">
        <div>
          <h2 className="font-semibold text-slate-900">Founder status</h2>
          <p className="mt-2 text-slate-700">{data.founder_status.summary}</p>
        </div>
        <div className="mt-4 border-t border-slate-100 pt-4">
          <h2 className="font-semibold text-slate-900">Current focus</h2>
          <p className="mt-2 text-slate-700">
            {data.current_focus ?? "Set up your first active goal to get a recommended focus."}
          </p>
        </div>
      </section>

      <div className="mt-5 grid gap-5 lg:grid-cols-2">
        {/* Recommended actions */}
        <section className="card">
          <div className="flex items-center justify-between">
            <h2 className="font-semibold text-slate-900">Recommended next actions</h2>
            <Link href="/ai" className="text-sm text-ocean-600 hover:underline">Ask for more</Link>
          </div>
          <div className="mt-4">
            {data.recommended_actions.length ? (
              <RecommendationList startupId={data.startup.id} items={data.recommended_actions} />
            ) : (
              <p className="text-slate-500">No recommendations yet — log goals, tasks and activities.</p>
            )}
          </div>
        </section>

        {/* Goal health */}
        <section className="card">
          <h2 className="font-semibold text-slate-900">Goal health</h2>
          <div className="mt-4 space-y-2">
            {data.goal_health.length ? (
              data.goal_health.map((g) => (
                <div key={g.id} className="rounded-lg border border-slate-200 p-3">
                  <div className="flex items-center justify-between gap-2">
                    <p className="font-medium text-slate-900">{g.title}</p>
                    <span className={`badge ${HEALTH_STYLES[g.status]}`}>
                      {g.status.replace("_", " ")}
                    </span>
                  </div>
                  <p className="mt-1 text-sm text-slate-600">{g.reason}</p>
                </div>
              ))
            ) : (
              <p className="text-slate-500">No active goals yet.</p>
            )}
          </div>
        </section>
      </div>

      {/* What have I learned? */}
      <section className="card mt-5 bg-ocean-50/40">
        <h2 className="font-semibold text-slate-900">AI insight</h2>
        <p className="mt-2 text-slate-700">
          {data.ai_insight?.content ?? "Keep logging your work and we'll surface patterns."}
        </p>
      </section>

      <div className="mt-5 grid gap-5 lg:grid-cols-3">
        <section className="card">
          <h2 className="font-semibold text-slate-900">Current goal</h2>
          <p className="mt-3 text-slate-700">{data.current_goal?.title ?? "No active goal yet"}</p>
        </section>
        <section className="card">
          <h2 className="font-semibold text-slate-900">Today's priorities</h2>
          {data.todays_tasks.length ? (
            data.todays_tasks.map((t) => (
              <p className="mt-3 text-slate-700" key={t.id}>{t.title}</p>
            ))
          ) : (
            <p className="mt-3 text-slate-500">No open tasks.</p>
          )}
        </section>
        <section className="card">
          <h2 className="font-semibold text-slate-900">Recent progress</h2>
          {data.recent_progress?.length ? (
            data.recent_progress.map((p, i) => (
              <p className="mt-3 text-sm text-slate-600" key={i}>• {p}</p>
            ))
          ) : (
            <p className="mt-3 text-slate-500">No progress recorded yet.</p>
          )}
        </section>
      </div>

      <div className="mt-8 flex gap-3">
        <Link className="btn-gradient" href="/ai">Open Blue Ocean AI</Link>
        <Link className="btn-ghost" href="/tasks">Manage tasks</Link>
        <Link className="btn-ghost" href="/goals">Manage goals</Link>
      </div>
    </main>
  );
}