import Link from "next/link";

export function MajiriLogoIcon({ className = "h-8 w-8" }: { className?: string }) {
  return (
    <svg viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} aria-hidden="true">
      <defs>
        <linearGradient id="majiri-grad" x1="2" y1="2" x2="34" y2="34" gradientUnits="userSpaceOnUse">
          <stop stopColor="#1E40AF" />
          <stop offset="0.6" stopColor="#2563EB" />
          <stop offset="1" stopColor="#3B82F6" />
        </linearGradient>
      </defs>
      {/* Modern stylized M glyph */}
      <path
        d="M6 28V8a2 2 0 0 1 3.4-1.4l8.6 8.6 8.6-8.6A2 2 0 0 1 30 8v20a2 2 0 0 1-2 2h-2a2 2 0 0 1-2-2V14.8l-5.6 5.6a1 1 0 0 1-1.4 0L11.4 14.8V28a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2Z"
        fill="url(#majiri-grad)"
      />
    </svg>
  );
}

export function MajiriBrand({ href = "/" }: { href?: string }) {
  return (
    <Link href={href} className="flex items-center gap-3 group">
      <MajiriLogoIcon className="h-9 w-9 transition-transform group-hover:scale-105" />
      <div>
        <span className="block text-[19px] font-black tracking-[-0.02em] text-[#0F172A]">
          MAJIRI AI
        </span>
        <span className="block text-[11px] font-medium tracking-tight text-[#64748B] -mt-0.5">
          Think Deeper. Build Smarter.
        </span>
      </div>
    </Link>
  );
}

