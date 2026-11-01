export function Logo({ className = "h-8 w-8" }: { className?: string }) {
  return (
    <span
      className={`inline-flex items-center justify-center rounded-xl bg-blue-gradient text-white shadow-glow ${className}`}
      aria-hidden="true"
    >
      <svg viewBox="0 0 24 24" className="h-[60%] w-[60%]" fill="currentColor">
        <path d="M3 13.5c3-2.4 6-2.4 9 0s6 2.4 9 0V6.5c-3 2.4-6 2.4-9 0S6 4.1 3 6.5v7Z" opacity="0.9" />
        <path d="M3 18c3-2.4 6-2.4 9 0s6 2.4 9 0" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
      </svg>
    </span>
  );
}
