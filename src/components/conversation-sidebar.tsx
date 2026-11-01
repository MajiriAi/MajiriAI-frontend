"use client";
import { useEffect, useRef, useState } from "react";

export interface Conversation {
  id: number;
  title: string | null;
  created_at: string;
}

interface Props {
  activeId: number | undefined;
  onSelect: (c: Conversation) => void;
  onNew: () => void;
  open: boolean;
  onClose: () => void;
}

export function ConversationSidebar({ activeId, onSelect, onNew, open, onClose }: Props) {
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editValue, setEditValue] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  async function load() {
    const r = await fetch("/api/backend/ai/conversations");
    if (r.ok) setConversations(await r.json());
  }

  useEffect(() => { load(); }, [activeId]);

  useEffect(() => {
    if (editingId !== null) inputRef.current?.focus();
  }, [editingId]);

  async function rename(id: number, title: string) {
    const trimmed = title.trim();
    if (!trimmed) { setEditingId(null); return; }
    const r = await fetch(`/api/backend/ai/conversations/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title: trimmed }),
    });
    if (r.ok) {
      setConversations((cs) => cs.map((c) => c.id === id ? { ...c, title: trimmed } : c));
    }
    setEditingId(null);
  }

  function formatDate(iso: string) {
    const d = new Date(iso);
    const now = new Date();
    const diffDays = Math.floor((now.getTime() - d.getTime()) / 86400000);
    if (diffDays === 0) return "Today";
    if (diffDays === 1) return "Yesterday";
    if (diffDays < 7) return d.toLocaleDateString(undefined, { weekday: "long" });
    return d.toLocaleDateString(undefined, { month: "short", day: "numeric" });
  }

  function handleSelect(c: Conversation) {
    onSelect(c);
    onClose(); // close drawer on mobile after selecting
  }

  function handleNew() {
    onNew();
    onClose();
  }

  const panel = (
    <aside className="flex h-full w-72 flex-shrink-0 flex-col border-r border-ocean-200 bg-ocean-50 pt-4 lg:pt-20">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-ocean p-3">
        <button
          onClick={handleNew}
          className="flex flex-1 items-center gap-2 rounded-xl border border-ocean-200 bg-white px-3 py-2 text-sm text-[#3D3C36] transition hover:border-ocean-500 hover:text-ocean-500"
        >
          <span className="text-base leading-none">+</span>
          New conversation
        </button>
        {/* Close button — only visible on mobile */}
        <button
          onClick={onClose}
          className="ml-2 flex-shrink-0 rounded-lg p-2 text-[#9C9A8D] hover:text-[#20221F] md:hidden"
          aria-label="Close sidebar"
        >
          <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
            <path d="M6 6l12 12M18 6L6 18" />
          </svg>
        </button>
      </div>

      {/* Conversation list */}
      <div className="flex-1 overflow-y-auto py-2">
        {conversations.length === 0 && (
          <p className="px-4 py-6 text-center text-xs text-[#A9A798]">No conversations yet.</p>
        )}
        {conversations.map((c) => (
          <div
            key={c.id}
            onClick={() => handleSelect(c)}
            className={`group relative mx-2 mb-0.5 cursor-pointer rounded-xl px-3 py-2.5 transition ${
              c.id === activeId
                ? "bg-ocean-200 text-[#20221F]"
                : "text-[#5B5A52] hover:bg-ocean-100 hover:text-[#20221F]"
            }`}
          >
            {editingId === c.id ? (
              <input
                ref={inputRef}
                className="w-full rounded border border-[#B5792E] bg-white px-1.5 py-0.5 text-sm text-[#20221F] outline-none"
                value={editValue}
                onChange={(e) => setEditValue(e.target.value)}
                onBlur={() => rename(c.id, editValue)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") rename(c.id, editValue);
                  if (e.key === "Escape") setEditingId(null);
                }}
                onClick={(e) => e.stopPropagation()}
              />
            ) : (
              <>
                <p className="truncate text-sm leading-snug">
                  {c.title ?? "Untitled"}
                </p>
                <p className="mt-0.5 text-xs text-[#A9A798]">{formatDate(c.created_at)}</p>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setEditingId(c.id);
                    setEditValue(c.title ?? "");
                  }}
                  className="absolute right-2 top-1/2 -translate-y-1/2 rounded p-1 text-[#C9C6B8] opacity-0 transition hover:text-[#B5792E] group-hover:opacity-100"
                  title="Rename"
                >
                  ✎
                </button>
              </>
            )}
          </div>
        ))}
      </div>
    </aside>
  );

  return (
    <>
      {/* Desktop: always visible */}
      <div className="hidden md:flex">{panel}</div>

      {/* Mobile: slide-in drawer with backdrop */}
      {open && (
        <div className="fixed inset-0 z-40 flex md:hidden">
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-black/40"
            onClick={onClose}
          />
          {/* Drawer */}
          <div className="relative z-50 flex">
            {panel}
          </div>
        </div>
      )}
    </>
  );
}
