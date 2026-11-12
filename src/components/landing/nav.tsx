"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { BrandMark } from "@/components/landing/brand-mark";

const LINKS = [
  { label: "Home", href: "#top" },
  { label: "Features", href: "#features" },
  { label: "Success Stories", href: "#stories" },
  { label: "Pricing", href: "#journey" },
  { label: "Help & Support", href: "#support" },
];

const LANGUAGES = ["English", "Français", "Español", "Português", "Deutsch"];

export function LandingNav() {
  const [open, setOpen] = useState(false);
  const [langOpen, setLangOpen] = useState(false);
  const [language, setLanguage] = useState("English");
  const langRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function onPointerDown(event: MouseEvent) {
      if (!langRef.current?.contains(event.target as Node)) setLangOpen(false);
    }
    document.addEventListener("mousedown", onPointerDown);
    return () => document.removeEventListener("mousedown", onPointerDown);
  }, []);

  return (
    <header className="sticky top-0 z-50 w-full bg-[#f3f7ff]/90 backdrop-blur-md">
      <div className="mx-auto flex h-[76px] max-w-[1180px] items-center justify-between gap-4 px-5 sm:px-6">
        <Link href="#top" className="flex items-center gap-2.5">
          <BrandMark className="h-10 w-10" />
          <span className="leading-tight">
            <span className="block text-[15px] font-extrabold tracking-[0.04em] text-[#10245c]">BLUE OCEAN</span>
            <span className="block text-[11px] font-medium text-[#7b879c]">Build. Grow. Scale.</span>
          </span>
        </Link>

        <nav className="hidden items-center gap-7 text-[14.5px] font-medium text-[#2a3553] xl:flex" aria-label="Main">
          {LINKS.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className={
                link.label === "Home"
                  ? "relative font-semibold text-[#12224f] after:absolute after:-bottom-2 after:left-0 after:right-0 after:h-[2.5px] after:rounded-full after:bg-[#2f6bff]"
                  : "transition hover:text-[#2454d6]"
              }
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="hidden items-center gap-3 xl:flex">
          <div className="relative" ref={langRef}>
            <button
              type="button"
              className="flex items-center gap-1.5 rounded-lg px-2 py-1.5 text-sm font-medium text-[#243056] transition hover:bg-white/70"
              aria-expanded={langOpen}
              aria-haspopup="listbox"
              onClick={() => setLangOpen((value) => !value)}
            >
              <GlobeIcon className="h-[18px] w-[18px] text-[#3a4666]" />
              {language}
              <Chevron className={`h-3.5 w-3.5 text-[#5c6b8a] transition ${langOpen ? "rotate-180" : ""}`} />
            </button>
            {langOpen && (
              <ul
                role="listbox"
                className="absolute right-0 top-[calc(100%+6px)] z-50 w-40 overflow-hidden rounded-xl border border-[#e4e9f5] bg-white py-1 shadow-[0_16px_40px_rgba(20,40,90,0.12)]"
              >
                {LANGUAGES.map((item) => (
                  <li key={item}>
                    <button
                      type="button"
                      role="option"
                      aria-selected={item === language}
                      className={`flex w-full px-3 py-2 text-left text-sm ${
                        item === language ? "bg-[#eef3ff] font-semibold text-[#2454d6]" : "text-[#243056] hover:bg-[#f6f8fd]"
                      }`}
                      onClick={() => {
                        setLanguage(item);
                        setLangOpen(false);
                      }}
                    >
                      {item}
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </div>
          <Link
            href="/login"
            className="rounded-full border border-[#c9c7f5] bg-white px-5 py-2 text-sm font-semibold text-[#4f46e5] shadow-sm transition hover:border-[#4f46e5] hover:bg-[#f6f5ff]"
          >
            Sign In
          </Link>
        </div>

        <button
          className="rounded-lg p-2 text-[#1e2a4a] hover:bg-white/80 xl:hidden"
          aria-label="Toggle navigation"
          aria-expanded={open}
          onClick={() => setOpen((value) => !value)}
        >
          <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
            {open ? <path d="M6 6l12 12M18 6L6 18" /> : <path d="M4 7h16M4 12h16M4 17h16" />}
          </svg>
        </button>
      </div>

      {open && (
        <div className="border-t border-[#e6ebf5] bg-[#f7faff] px-5 py-4 xl:hidden">
          <nav className="flex flex-col gap-1 text-sm font-medium text-[#243056]" aria-label="Mobile">
            {LINKS.map((link) => (
              <a key={link.label} href={link.href} onClick={() => setOpen(false)} className="rounded-lg px-2 py-2 hover:bg-white">
                {link.label}
              </a>
            ))}
            <Link href="/login" onClick={() => setOpen(false)} className="mt-2 rounded-full border border-[#c9c7f5] bg-white px-4 py-2.5 text-center font-semibold text-[#4f46e5]">
              Sign In
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}

function GlobeIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="1.8">
      <circle cx="12" cy="12" r="9" />
      <path d="M3 12h18M12 3c2.4 2.6 3.6 5.7 3.6 9s-1.2 6.4-3.6 9c-2.4-2.6-3.6-5.7-3.6-9S9.6 5.6 12 3Z" />
    </svg>
  );
}

function Chevron({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 20 20" className={className} fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M5 7.5 10 12.5 15 7.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
