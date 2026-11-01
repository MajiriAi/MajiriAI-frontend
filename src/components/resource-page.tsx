"use client";
import { FormEvent, useEffect, useState } from "react";

type Kind = "goals" | "tasks" | "activities";
const labels: Record<Kind, string> = { goals: "goal", tasks: "task", activities: "activity" };
const analyzeEndpoint: Record<Kind, string> = {
  goals: "/api/backend/ai/goals",
  tasks: "/api/backend/ai/tasks",
  activities: "/api/backend/ai/activities",
};

interface Row {
  id: number;
  title: string;
  description?: string | null;
  status?: string;
  type?: string;
  insight?: string;
  analyzing?: boolean;
}

export function ResourcePage({ kind, title, description }: { kind: Kind; title: string; description: string }) {
  const [items, setItems] = useState<Row[]>([]);
  const [startup, setStartup] = useState<number>();
  const [error, setError] = useState("");

  async function load() {
    const me = await fetch("/api/backend/me").then((r) => r.json());
    const id = me.startups?.[0]?.id;
    setStartup(id);
    if (id) {
      const r = await fetch(`/api/backend/${kind}`);
      if (r.ok) setItems(await r.json());
    }
  }

  useEffect(() => {
    load();
  }, []);

  async function create(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!startup) return setError("Create a startup first.");
    const d = Object.fromEntries(new FormData(e.currentTarget));
    const payload: Record<string, unknown> = {
      ...d,
      startup_id: startup,
      ...(kind === "activities"
        ? { occurred_at: new Date().toISOString(), type: "note" }
        : kind === "tasks"
          ? { priority: "medium", status: "pending" }
          : { status: "active", progress: 0 }),
    };
    const r = await fetch(`/api/backend/${kind}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    if (!r.ok) return setError("Unable to save. Check the form.");
    (e.target as HTMLFormElement).reset();
    load();
  }

  async function analyze(id: number) {
    setError("");
    setItems((all) => all.map((i) => (i.id === id ? { ...i, analyzing: true } : i)));
    const r = await fetch(`${analyzeEndpoint[kind]}/${id}/analyze`, {
      method: "POST",
      headers: { Accept: "application/json" },
    });
    const data = await r.json().catch(() => ({}));
    setItems((all) =>
      all.map((i) =>
        i.id === id
          ? { ...i, analyzing: false, insight: r.ok ? data.content : data.message ?? "The copilot could not analyze this." }
          : i,
      ),
    );
  }

  return (
    <main className="mx-auto max-w-5xl px-6 py-12">
      <h1 className="text-3xl font-semibold">{title}</h1>
      <p className="mt-2 text-slate-600">{description}</p>

      <form onSubmit={create} className="card mt-8 flex flex-col gap-3 md:flex-row">
        <input className="input" name="title" required placeholder={`Add a ${labels[kind]}`} />
        <input className="input" name="description" placeholder="Optional details" />
        <button className="btn whitespace-nowrap">Add {labels[kind]}</button>
      </form>

      {error && <p className="mt-3 text-sm text-red-600">{error}</p>}

      <section className="mt-6 space-y-3">
        {items.length ? (
          items.map((i) => (
            <article className="card" key={i.id}>
              <div className="flex justify-between gap-3">
                <div>
                  <h2 className="font-semibold">{i.title}</h2>
                  {i.description && <p className="mt-1 text-sm text-slate-600">{i.description}</p>}
                </div>
                <div className="flex shrink-0 items-center gap-2">
                  <span className="text-sm text-slate-500">{i.status ?? i.type}</span>
                  <button
                    onClick={() => analyze(i.id)}
                    disabled={i.analyzing}
                    className="rounded-md border border-slate-300 px-2.5 py-1 text-sm hover:bg-slate-50 disabled:opacity-60"
                  >
                    {i.analyzing ? "…" : "Analyze"}
                  </button>
                </div>
              </div>
              {i.insight && <p className="mt-3 rounded-lg bg-slate-50 p-3 text-sm text-slate-700">{i.insight}</p>}
            </article>
          ))
        ) : (
          <div className="card text-slate-600">No {labels[kind]}s yet. Add one to get started.</div>
        )}
      </section>
    </main>
  );
}
