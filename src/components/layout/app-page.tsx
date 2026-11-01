import Link from "next/link";

type AppPageProps = {
  title: string;
  description: string;
};

export function AppPage({ title, description }: AppPageProps) {
  return (
    <main className="min-h-screen bg-slate-50">
      <header className="border-b border-slate-200 bg-white">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
          <Link href="/" className="font-semibold text-brand-700">
            Blue Ocean
          </Link>
          <nav className="flex gap-4 text-sm text-slate-600" aria-label="Main navigation">
            <Link href="/dashboard" className="hover:text-brand-700">Dashboard</Link>
            <Link href="/tasks" className="hover:text-brand-700">Tasks</Link>
            <Link href="/ai" className="hover:text-brand-700">AI</Link>
          </nav>
        </div>
      </header>
      <section className="mx-auto max-w-6xl px-6 py-16">
        <p className="mb-3 text-sm font-medium uppercase tracking-wide text-brand-600">Blue Ocean</p>
        <h1 className="text-3xl font-semibold tracking-tight text-slate-900">{title}</h1>
        <p className="mt-3 max-w-2xl text-slate-600">{description}</p>
      </section>
    </main>
  );
}