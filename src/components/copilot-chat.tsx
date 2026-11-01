"use client";
import { FormEvent, useEffect, useRef, useState } from "react";
import { RecommendationList } from "@/components/recommendation-list";
import { ConversationSidebar, Conversation } from "@/components/conversation-sidebar";

const QUICK_ACTIONS = [
  "What should I do today?",
  "What am I neglecting?",
  "Analyze my startup",
];

const serifFont = { fontFamily: "'Fraunces', Georgia, 'Times New Roman', serif" };

// ---------------------------------------------------------------------------
// Markdown renderer
// ---------------------------------------------------------------------------
function FormattedMessage({ content }: { content: string }) {
  const lines = content.split("\n");
  const nodes: React.ReactNode[] = [];
  let listBuffer: { ordered: boolean; items: string[] } | null = null;

  function flushList() {
    if (!listBuffer) return;
    const { ordered, items } = listBuffer;
    if (ordered) {
      nodes.push(
        <ol key={nodes.length} className="my-2 list-decimal space-y-1 pl-5 text-sm leading-relaxed text-[#3D3C36] marker:text-[#C9A063]">
          {items.map((item, i) => <li key={i}>{renderInline(item)}</li>)}
        </ol>
      );
    } else {
      nodes.push(
        <ul key={nodes.length} className="my-2 list-disc space-y-1 pl-5 text-sm leading-relaxed text-[#3D3C36] marker:text-[#C9A063]">
          {items.map((item, i) => <li key={i}>{renderInline(item)}</li>)}
        </ul>
      );
    }
    listBuffer = null;
  }

  for (const line of lines) {
    const h = line.match(/^#{1,3}\s+(.*)/);
    if (h) {
      flushList();
      nodes.push(
        <p key={nodes.length} style={serifFont} className="mt-3 mb-1 text-[15px] font-medium text-[#20221F]">
          {renderInline(h[1])}
        </p>
      );
      continue;
    }
    const ul = line.match(/^[-*•]\s+(.*)/);
    if (ul) {
      if (listBuffer?.ordered) flushList();
      if (!listBuffer) listBuffer = { ordered: false, items: [] };
      listBuffer.items.push(ul[1]);
      continue;
    }
    const ol = line.match(/^\d+\.\s+(.*)/);
    if (ol) {
      if (listBuffer && !listBuffer.ordered) flushList();
      if (!listBuffer) listBuffer = { ordered: true, items: [] };
      listBuffer.items.push(ol[1]);
      continue;
    }
    if (line.trim() === "") { flushList(); continue; }
    flushList();
    nodes.push(
      <p key={nodes.length} className="text-sm leading-relaxed text-[#3D3C36]">
        {renderInline(line)}
      </p>
    );
  }
  flushList();
  return <div className="space-y-1">{nodes}</div>;
}

function renderInline(text: string): React.ReactNode {
  return text.split(/(\*\*[^*]+\*\*|\*[^*]+\*)/g).map((part, i) => {
    if (part.startsWith("**") && part.endsWith("**"))
      return <strong key={i} className="font-semibold text-[#20221F]">{part.slice(2, -2)}</strong>;
    if (part.startsWith("*") && part.endsWith("*"))
      return <em key={i}>{part.slice(1, -1)}</em>;
    return part;
  });
}

// ---------------------------------------------------------------------------

interface Message { id: number; role: string; content: string; }

export function CopilotChat() {
  const [startupId, setStartupId] = useState<number>();
  const [conversation, setConversation] = useState<Conversation | undefined>();
  const [messages, setMessages] = useState<Message[]>([]);
  const [text, setText] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [analyzing, setAnalyzing] = useState(false);
  const [analysis, setAnalysis] = useState<any>(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);

  // On mount: load user info and resume the most recent conversation (or create one)
  useEffect(() => {
    (async () => {
      const me = await fetch("/api/backend/me").then((r) => r.ok ? r.json() : null);
      setStartupId(me?.startups?.[0]?.id);

      const list = await fetch("/api/backend/ai/conversations").then((r) => r.ok ? r.json() : []);
      if (list.length > 0) {
        await loadConversation(list[0]);
      } else {
        await createNewConversation();
      }
    })();
  }, []);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  async function createNewConversation() {
    const r = await fetch("/api/backend/ai/conversations", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: "{}",
    });
    if (r.ok) {
      const c: Conversation = await r.json();
      setConversation(c);
      setMessages([]);
      setError("");
    } else {
      setError("Create a startup before starting a conversation.");
    }
  }

  async function loadConversation(c: Conversation) {
    setConversation(c);
    setMessages([]);
    setError("");
    const r = await fetch(`/api/backend/ai/conversations/${c.id}/messages`);
    if (r.ok) setMessages(await r.json());
  }

  async function send(e?: FormEvent, preset?: string) {
    if (e) e.preventDefault();
    const content = preset ?? text;
    if (!conversation || !content.trim() || loading) return;
    setError("");
    setText("");
    setLoading(true);
    setMessages((m) => [...m, { id: Date.now(), role: "user", content }]);

    const r = await fetch(`/api/backend/ai/conversations/${conversation.id}/messages`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ content }),
    });
    const data = await r.json();
    setLoading(false);
    if (r.ok) setMessages((m) => [...m, data]);
    else setError(data.message ?? "Blue-Ocean could not respond.");
  }

  async function analyzeStartup() {
    if (analyzing) return;
    setAnalyzing(true);
    setError("");
    const r = await fetch("/api/backend/ai/analysis", {
      headers: { Accept: "application/json" },
    }).catch(() => null);
    setAnalyzing(false);
    if (!r || !r.ok) {
      setError(r ? "The analysis could not be produced right now." : "Network error.");
      return;
    }
    setAnalysis(await r.json());
  }

  return (
    <div className="flex h-full bg-ocean-100">

      {/* Sidebar */}
      <ConversationSidebar
        activeId={conversation?.id}
        onSelect={loadConversation}
        onNew={createNewConversation}
        open={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
      />

      {/* Main chat area */}
      <main className="flex flex-1 flex-col px-4 py-6 min-w-0 sm:px-5">

        {/* Header */}
        <div className="mb-6 flex-shrink-0 border-b border-[#E4E0D3] pb-5">
          <div className="flex items-center gap-3">
            {/* Hamburger — mobile only */}
            <button
              onClick={() => setSidebarOpen(true)}
              className="flex-shrink-0 rounded-lg p-1.5 text-[#6B6A60] hover:bg-[#EDEADF] md:hidden"
              aria-label="Open conversations"
            >
              <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                <path d="M4 7h16M4 12h16M4 17h16" />
              </svg>
            </button>
            <div>
              <h1 style={serifFont} className="text-[28px] font-medium tracking-tight text-[#20221F]">
                Blue-Ocean
              </h1>
              <p className="mt-0.5 text-sm text-[#6B6A60]">
                Practical guidance grounded in your founder journey.
              </p>
            </div>
          </div>
        </div>

        {/* Quick actions */}
        <div className="mb-5 flex flex-shrink-0 flex-wrap items-center gap-5 text-sm">
          {QUICK_ACTIONS.map((q) => (
            <button
              key={q}
              onClick={() => send(undefined, q)}
              disabled={loading}
              className="text-[#5B5A52] decoration-ocean-500 decoration-2 underline-offset-4 transition hover:text-[#20221F] hover:underline disabled:opacity-40"
            >
              {q}
            </button>
          ))}
          <button
            onClick={analyzeStartup}
            disabled={analyzing || loading}
            className="ml-auto rounded-full bg-blue-800 px-4 py-1.5 text-xs font-medium text-[#F6F3EC] transition hover:bg-blue-900 disabled:opacity-50"
          >
            {analyzing ? "Analyzing…" : "Full analysis"}
          </button>
        </div>

        {/* Analysis panel */}
        {analysis && (
          <div className="mb-6 flex-shrink-0 rounded-2xl border border-[#E4E0D3] bg-[#FBFAF6] p-5">
            <div className="mb-3 flex items-center justify-between border-b border-[#EDEADF] pb-3">
              <h2 style={serifFont} className="text-lg text-[#20221F]">Startup analysis</h2>
              <button onClick={() => setAnalysis(null)} className="text-xs text-[#9C9A8D] hover:text-[#5B5A52]">
                Dismiss
              </button>
            </div>
            <p className="text-sm text-[#3D3C36]">{analysis.overall_summary}</p>
            <AnalysisList label="Strengths" items={analysis.strengths} dotColor="#4B5D45" />
            <AnalysisList label="Concerns" items={analysis.concerns} dotColor="#A23B33" />
            <AnalysisList label="Opportunities" items={analysis.opportunities} dotColor="#B5792E" />
            {analysis.recommended_focus && (
              <div className="mt-4 border-t border-[#EDEADF] pt-3 text-sm">
                <span className="font-medium text-[#20221F]">Recommended focus </span>
                <span className="text-[#3D3C36]">{analysis.recommended_focus}</span>
              </div>
            )}
            {analysis.next_actions?.length > 0 && (
              <div className="mt-4 border-t border-[#EDEADF] pt-3">
                <p className="mb-1.5 text-sm font-medium text-[#20221F]">Next actions</p>
                <RecommendationList startupId={startupId} items={analysis.next_actions} />
              </div>
            )}
          </div>
        )}

        {/* Message thread */}
        <div className="flex-1 overflow-y-auto rounded-2xl border border-ocean-200 bg-white">
          <div className="flex flex-col gap-6 p-5">
            {messages.length === 0 && !loading && (
              <div className="py-14 text-center">
                <p className="text-sm text-[#8A8879]">Try asking</p>
                <p style={serifFont} className="mt-1 text-base italic text-[#3D3C36]">
                  "What should I work on today?"
                </p>
              </div>
            )}

            {messages.map((m) =>
              m.role === "user" ? (
                <div key={m.id} className="flex justify-end">
                  <div className="max-w-[75%] rounded-2xl rounded-br-md bg-blue-800 px-4 py-2.5 text-sm text-[#F6F3EC]">
                    {m.content}
                  </div>
                </div>
              ) : (
                <div key={m.id} className="max-w-[85%] border-l-2 border-ocean-500 pl-4">
                  <p className="mb-1 text-xs text-[#8C8A7C]">Blue-Ocean</p>
                  <FormattedMessage content={m.content} />
                </div>
              )
            )}

            {loading && (
              <div className="max-w-[85%] border-l-2 border-ocean-500 pl-4">
                <p className="mb-1 text-xs text-[#8C8A7C]">Blue-Ocean</p>
                <span className="flex gap-1 py-1">
                  <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-[#B5B2A0] [animation-delay:0ms]" />
                  <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-[#B5B2A0] [animation-delay:150ms]" />
                  <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-[#B5B2A0] [animation-delay:300ms]" />
                </span>
              </div>
            )}

            {error && (
              <p className="rounded-lg bg-[#F7E9E6] px-4 py-2.5 text-sm text-[#A23B33]">{error}</p>
            )}

            <div ref={bottomRef} />
          </div>
        </div>

        {/* Input bar */}
        <form onSubmit={(e) => send(e)} className="mt-4 flex flex-shrink-0 gap-2">
          <input
            className="flex-1 rounded-xl border border-ocean-100 bg-[#FBFAF6] px-4 py-2.5 text-sm text-[#20221F] placeholder-[#A9A798] outline-none transition focus:border-ocean-500 focus:ring-2 focus:ring-ocean-500/15"
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Ask Blue-Ocean…"
            disabled={loading}
          />
          <button
            type="submit"
            disabled={loading || !text.trim()}
            className="rounded-xl bg-ocean-500 px-5 py-2.5 text-sm font-medium text-white transition hover:bg-ocean-600 disabled:opacity-40"
          >
            Send
          </button>
        </form>
      </main>
    </div>
  );
}

function AnalysisList({ label, items, dotColor }: { label: string; items: string[]; dotColor: string }) {
  if (!items?.length) return null;
  return (
    <div className="mt-3">
      <p className="mb-1.5 flex items-center gap-2 text-sm font-medium text-[#20221F]">
        <span className="h-1.5 w-1.5 rounded-full" style={{ backgroundColor: dotColor }} />
        {label}
      </p>
      <ul className="space-y-1 pl-3.5 text-sm text-[#3D3C36]">
        {items.map((s, i) => (
          <li key={i} className="list-disc marker:text-[#C9C6B8]">{s}</li>
        ))}
      </ul>
    </div>
  );
}
