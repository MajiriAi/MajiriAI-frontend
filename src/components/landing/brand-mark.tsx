export function BrandMark({ className = "h-10 w-10" }: { className?: string }) {
  return (
    <svg viewBox="0 0 40 40" className={className} aria-hidden="true">
      <defs>
        <linearGradient id="bo-mark" x1="8" y1="4" x2="34" y2="36" gradientUnits="userSpaceOnUse">
          <stop stopColor="#3b82f6" />
          <stop offset="1" stopColor="#1d4ed8" />
        </linearGradient>
      </defs>
      <circle cx="20" cy="20" r="20" fill="url(#bo-mark)" />
      <path
        d="M5 23.5c3.2-4.2 6.6-5.2 10.2-2.6 3.2 2.3 6.2 2.6 9.6.2 2.6-1.8 5.2-2.2 8.2-.6 1 .5 1.6 1.2 2 2v3.2c-3.4-2.2-6.4-1.8-9.4.4-3.6 2.6-7 2.2-10.4-.4-3.8-2.8-7.2-2-10.2 1.2V23.5Z"
        fill="white"
      />
      <path
        d="M6.5 29.2c3-2.6 5.8-2.8 8.8-.6 2.6 1.9 5 1.8 7.8-.2 2.4-1.6 4.6-1.6 7.2-.2"
        fill="none"
        stroke="white"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
}
