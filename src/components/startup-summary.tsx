"use client";
import { useEffect, useState } from "react";

type MeResponse = {
  user?: { name: string; email: string };
  founder?: {
    background?: string | null;
    skills?: string | null;
    experience?: string | null;
    interests?: string | null;
    personal_goals?: string | null;
  };
  startups?: Array<{
    id: number;
    name: string;
    description?: string | null;
    problem?: string | null;
    solution?: string | null;
    target_customers?: string | null;
    industry?: string | null;
    stage?: string | null;
    current_challenges?: string | null;
  }>;
};

export function StartupSummary() {
  const [data, setData] = useState<MeResponse>();
  const [error, setError] = useState("");

  useEffect(() => {
    fetch("/api/backend/me")
      .then((r) => (r.ok ? r.json() : null))
      .then(setData)
      .catch(() => setError("Couldn’t load your startup context."));
  }, []);

  const startup = data?.startups?.[0];
  const founder = data?.founder;

  if (error) return <p className="text-slate-600">{error}</p>;
  if (!data) return <p className="text-slate-600">Loading your context…</p>;

  return (
    <div className="space-y-5">
      <header>
        <p className="text-sm font-semibold uppercase tracking-wide text-ocean-600">Blue Ocean context</p>
        <h1 className="mt-1 text-3xl font-bold tracking-tight text-ocean-950">Your startup</h1>
      </header>

      {!startup ? (
        <div className="card text-slate-600">
          You haven’t created a startup yet. <a href="/startup" className="font-medium text-ocean-700 hover:underline">Add one</a> to get
          grounded guidance.
        </div>
      ) : (
        <>
          <section className="card">
            <div className="flex items-start justify-between gap-3">
              <div>
                <h2 className="text-xl font-semibold text-ocean-900">{startup.name}</h2>
                <p className="mt-1 text-slate-600">{startup.description}</p>
              </div>
              <span className="badge bg-ocean-100 text-ocean-700 capitalize">{startup.stage}</span>
            </div>
            {startup.industry && <p className="mt-2 text-sm text-slate-500">Industry: {startup.industry}</p>}
          </section>

          <div className="grid gap-5 md:grid-cols-2">
            <InfoCard label="Problem" value={startup.problem} />
            <InfoCard label="Solution" value={startup.solution} />
            <InfoCard label="Target customers" value={startup.target_customers} />
            <InfoCard label="Current challenges" value={startup.current_challenges} />
          </div>
        </>
      )}

      <div className="card">
        <h3 className="font-semibold text-ocean-900">Founder profile</h3>
        <dl className="mt-4 space-y-3 text-sm">
          <FounderRow label="Background" value={founder?.background} />
          <FounderRow label="Experience" value={founder?.experience} />
          <FounderRow label="Skills" value={founder?.skills} />
          <FounderRow label="Interests" value={founder?.interests} />
          <FounderRow label="Personal goals" value={founder?.personal_goals} />
        </dl>
      </div>
    </div>
  );
}

function InfoCard({ label, value }: { label: string; value?: string | null }) {
  return (
    <section className="card">
      <h3 className="text-sm font-semibold uppercase tracking-wide text-ocean-600">{label}</h3>
      <p className="mt-2 whitespace-pre-line text-slate-700">{value || "—"}</p>
    </section>
  );
}

function FounderRow({ label, value }: { label: string; value?: string | null }) {
  return (
    <div className="flex gap-4">
      <dt className="w-36 shrink-0 font-medium text-slate-500">{label}</dt>
      <dd className="text-slate-700">{value || "—"}</dd>
    </div>
  );
}
