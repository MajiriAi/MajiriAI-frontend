export function HeroVisual() {
  return (
    <div className="relative mx-auto h-[460px] w-full max-w-[520px] sm:h-[500px]">
      <Bubble className="left-[8%] top-[6%] z-20">
        <GlobeGlyph />
      </Bubble>

      <div className="absolute right-[2%] top-[-6px] z-20 -rotate-[18deg] drop-shadow-[0_12px_16px_rgba(109,40,217,0.25)]">
        <Rocket />
      </div>

      <Bubble className="left-[-2%] top-[46%] z-20 sm:left-[0%]">
        <MailGlyph />
      </Bubble>

      <div className="absolute right-[-6px] top-[34%] z-20 sm:right-[0%]">
        <SocialCluster />
      </div>

      <Bubble className="bottom-[16%] right-[6%] z-20">
        <ChartGlyph />
      </Bubble>

      <div
        className="absolute left-1/2 top-[78px] z-10 w-[86%] -translate-x-1/2"
        style={{ transform: "translateX(-50%) perspective(1400px) rotateX(7deg) rotateY(-14deg)" }}
      >
        <Laptop />
      </div>
    </div>
  );
}

export function Earth() {
  return (
    <div className="pointer-events-none absolute inset-x-0 bottom-[-8%] z-0 flex justify-center" aria-hidden="true">
      <div className="relative h-[520px] w-[920px] max-w-[100vw]">
        <div className="absolute left-1/2 top-[18%] h-[640px] w-[640px] -translate-x-1/2 rounded-full bg-[radial-gradient(circle_at_32%_28%,#e7f3ff_0%,#9fd0ff_16%,#4c93f6_42%,#2563eb_68%,#1e40af_100%)] shadow-[0_0_80px_rgba(37,99,235,0.28)]" />
        <svg viewBox="0 0 640 640" className="absolute left-1/2 top-[18%] h-[640px] w-[640px] -translate-x-1/2">
          <defs>
            <clipPath id="earth-clip">
              <circle cx="320" cy="320" r="318" />
            </clipPath>
            <radialGradient id="earth-sheen" cx="30%" cy="28%" r="55%">
              <stop offset="0%" stopColor="white" stopOpacity="0.45" />
              <stop offset="45%" stopColor="white" stopOpacity="0.05" />
              <stop offset="100%" stopColor="white" stopOpacity="0" />
            </radialGradient>
          </defs>
          <g clipPath="url(#earth-clip)" fill="#b9e3ff" opacity="0.55">
            <ellipse cx="230" cy="250" rx="78" ry="46" />
            <ellipse cx="300" cy="230" rx="46" ry="28" />
            <path d="M188 268c28 10 48 8 70-6 8 22 6 40-10 54-30 6-58-4-74-24 2-10 8-18 14-24Z" />
            <ellipse cx="430" cy="300" rx="70" ry="36" />
            <ellipse cx="470" cy="270" rx="34" ry="22" />
            <ellipse cx="250" cy="390" rx="90" ry="34" />
            <ellipse cx="390" cy="420" rx="40" ry="18" />
            <path d="M360 250c20 8 28 20 24 36-16 4-30-2-40-14 2-10 8-18 16-22Z" />
          </g>
          <circle cx="320" cy="320" r="318" fill="url(#earth-sheen)" />
          <circle cx="320" cy="320" r="318" fill="none" stroke="rgba(255,255,255,0.35)" strokeWidth="2" />
        </svg>
        <div className="absolute left-1/2 top-[8%] h-[680px] w-[680px] -translate-x-1/2 rounded-full bg-[radial-gradient(circle,transparent_58%,rgba(147,197,253,0.45)_62%,transparent_72%)]" />
      </div>
    </div>
  );
}

function Laptop() {
  return (
    <div>
      <div className="rounded-t-[16px] bg-[#2b3444] p-[7px] pb-0 shadow-[0_28px_50px_rgba(15,23,42,0.28)]">
        <div className="relative aspect-[16/10.2] overflow-hidden rounded-t-[8px] bg-[#f4f7fb]">
          <span className="absolute left-1/2 top-[5px] z-10 h-[5px] w-[5px] -translate-x-1/2 rounded-full bg-[#4b5568]" />
          <Dashboard />
        </div>
      </div>
      <div className="relative h-[16px] rounded-b-[14px] bg-gradient-to-b from-[#e7edf4] via-[#c5ceda] to-[#9aa6b5] shadow-[0_18px_24px_rgba(30,64,175,0.25)]">
        <div className="absolute left-1/2 top-0 h-[7px] w-[92px] -translate-x-1/2 rounded-b-md bg-[#b7c2d0]" />
      </div>
    </div>
  );
}

function Dashboard() {
  return (
    <div className="flex h-full bg-[#f3f6fb] pt-3 text-[#1e293b]">
      <aside className="flex w-[46px] shrink-0 flex-col items-center gap-2 bg-gradient-to-b from-[#2454d6] to-[#4f46e5] py-3 text-white">
        <span className="mb-1 h-4 w-4 rounded-full bg-white/90" />
        {["M4 6h12M4 10h12M4 14h8", "M3 14l4-4 3 3 5-6", "M4 4h12v12H4z", "M8 14V8M12 14V5M5 14v-3"].map((d) => (
          <span key={d} className="flex h-6 w-6 items-center justify-center rounded-md bg-white/10">
            <svg viewBox="0 0 20 20" className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth="1.6">
              <path d={d} />
            </svg>
          </span>
        ))}
      </aside>
      <div className="min-w-0 flex-1 p-2">
        <div className="mb-1.5 flex items-center justify-between">
          <p className="text-[9px] font-extrabold tracking-wide text-[#1e3a8a]">BLUE OCEAN</p>
          <div className="flex gap-1 text-[7px] text-[#64748b]">
            <span className="rounded bg-white px-1.5 py-0.5 font-semibold text-[#2454d6] shadow-sm">Overview</span>
            <span className="px-1 py-0.5">Sales</span>
            <span className="px-1 py-0.5">Growth</span>
          </div>
        </div>
        <div className="grid grid-cols-3 gap-1">
          {[
            { label: "Revenue", value: "$48.2k", tone: "text-[#16a34a]" },
            { label: "Customers", value: "1,284", tone: "text-[#2454d6]" },
            { label: "Growth", value: "+32%", tone: "text-[#7c3aed]" },
          ].map((stat) => (
            <div key={stat.label} className="rounded-md bg-white px-1.5 py-1 shadow-sm">
              <p className="text-[6px] text-[#94a3b8]">{stat.label}</p>
              <p className={`text-[10px] font-bold ${stat.tone}`}>{stat.value}</p>
            </div>
          ))}
        </div>
        <div className="mt-1 grid grid-cols-5 gap-1">
          <div className="col-span-3 rounded-md bg-white p-1.5 shadow-sm">
            <p className="text-[6px] font-semibold text-[#64748b]">Revenue trend</p>
            <svg viewBox="0 0 160 58" className="mt-0.5 h-[52px] w-full">
              <defs>
                <linearGradient id="area" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#60a5fa" stopOpacity="0.45" />
                  <stop offset="100%" stopColor="#60a5fa" stopOpacity="0" />
                </linearGradient>
              </defs>
              <path d="M0 46 C20 44 24 30 40 28 C58 26 62 18 80 20 C100 22 108 10 128 12 C142 13 150 8 160 6 V58 H0 Z" fill="url(#area)" />
              <path d="M0 46 C20 44 24 30 40 28 C58 26 62 18 80 20 C100 22 108 10 128 12 C142 13 150 8 160 6" fill="none" stroke="#2563eb" strokeWidth="2" />
            </svg>
          </div>
          <div className="col-span-2 flex flex-col items-center justify-center rounded-md bg-white p-1.5 shadow-sm">
            <div
              className="h-10 w-10 rounded-full"
              style={{ background: "conic-gradient(#3b82f6 0 42%, #8b5cf6 42% 68%, #22c55e 68% 84%, #f59e0b 84% 100%)" }}
            >
              <div className="m-[7px] h-[26px] w-[26px] rounded-full bg-white" />
            </div>
            <p className="mt-1 text-[6px] font-semibold text-[#64748b]">Channels</p>
          </div>
        </div>
        <div className="mt-1 grid grid-cols-5 gap-1">
          <div className="col-span-3 rounded-md bg-white p-1.5 shadow-sm">
            <p className="text-[6px] font-semibold text-[#64748b]">Weekly sales</p>
            <div className="mt-1 flex h-9 items-end gap-[3px]">
              {[40, 55, 48, 70, 62, 84, 96, 74].map((height, index) => (
                <div
                  key={index}
                  className="flex-1 rounded-sm"
                  style={{
                    height: `${height}%`,
                    background: index % 2 === 0 ? "linear-gradient(#60a5fa,#2563eb)" : "linear-gradient(#c4b5fd,#7c3aed)",
                  }}
                />
              ))}
            </div>
          </div>
          <div className="col-span-2 space-y-1 rounded-md bg-white p-1.5 shadow-sm">
            {[
              ["Website", "Live"],
              ["Campaigns", "4"],
              ["Tasks", "12"],
            ].map(([label, value]) => (
              <div key={label} className="flex items-center justify-between text-[6px]">
                <span className="text-[#64748b]">{label}</span>
                <span className="font-bold text-[#1e3a8a]">{value}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function Bubble({ className, children }: { className: string; children: React.ReactNode }) {
  return (
    <div
      className={`absolute flex h-[58px] w-[58px] items-center justify-center rounded-full bg-white shadow-[0_10px_28px_rgba(37,99,235,0.16)] ring-1 ring-[#e8eefb] ${className}`}
    >
      {children}
    </div>
  );
}

function GlobeGlyph() {
  return (
    <svg viewBox="0 0 24 24" className="h-7 w-7 text-[#3b82f6]" fill="none" stroke="currentColor" strokeWidth="1.7">
      <circle cx="12" cy="12" r="8.5" />
      <path d="M3.5 12h17M12 3.5c2.2 2.4 3.4 5.3 3.4 8.5s-1.2 6.1-3.4 8.5c-2.2-2.4-3.4-5.3-3.4-8.5s1.2-6.1 3.4-8.5Z" />
    </svg>
  );
}

function MailGlyph() {
  return (
    <svg viewBox="0 0 24 24" className="h-7 w-7 text-[#6366f1]" fill="none" stroke="currentColor" strokeWidth="1.7">
      <rect x="3.5" y="5.5" width="17" height="13" rx="2" />
      <path d="M4 7l8 6 8-6" />
    </svg>
  );
}

function ChartGlyph() {
  return (
    <svg viewBox="0 0 24 24" className="h-7 w-7 text-[#2563eb]" fill="currentColor">
      <rect x="3" y="12" width="4" height="8" rx="1" opacity="0.55" />
      <rect x="10" y="8" width="4" height="12" rx="1" opacity="0.8" />
      <rect x="17" y="4" width="4" height="16" rx="1" />
    </svg>
  );
}

function Rocket() {
  return (
    <svg viewBox="0 0 90 130" className="h-[108px] w-[76px]">
      <defs>
        <linearGradient id="rocket-body" x1="30" y1="8" x2="70" y2="90" gradientUnits="userSpaceOnUse">
          <stop stopColor="#c4b5fd" />
          <stop offset="0.45" stopColor="#8b5cf6" />
          <stop offset="1" stopColor="#6d28d9" />
        </linearGradient>
      </defs>
      <path d="M38 86c6 18 8 30 10 42 2-14 5-26 12-42-8 6-14 6-22 0Z" fill="#fb923c" />
      <path d="M44 90c3 12 4 20 5 28 1-8 2-16 5-28-4 3-6 3-10 0Z" fill="#fde68a" />
      <path d="M28 70c-14 8-18 22-16 32 12-4 18-12 18-22 0-4-1-7-2-10Z" fill="#7c3aed" />
      <path d="M62 70c14 8 18 22 16 32-12-4-18-12-18-22 0-4 1-7 2-10Z" fill="#6d28d9" />
      <path d="M45 6c18 14 24 36 24 58 0 14-6 24-24 30-18-6-24-16-24-30C21 42 27 20 45 6Z" fill="url(#rocket-body)" />
      <ellipse cx="45" cy="48" rx="9" ry="9" fill="#e0e7ff" />
      <ellipse cx="45" cy="48" rx="5" ry="5" fill="#312e81" />
      <path d="M37 18c4-6 8-8 8-8s1 6-2 12c-2-1-4-3-6-4Z" fill="white" opacity="0.35" />
    </svg>
  );
}

function SocialCluster() {
  const items = [
    { label: "X", bg: "#111827", text: "text-white", icon: "x" },
    { label: "Facebook", bg: "#1877F2", text: "text-white", icon: "f" },
    { label: "LinkedIn", bg: "#0A66C2", text: "text-white", icon: "in" },
    { label: "YouTube", bg: "#FF0000", text: "text-white", icon: "yt" },
  ] as const;

  return (
    <div className="grid grid-cols-2 gap-1.5 rounded-2xl bg-white/70 p-1.5 shadow-[0_10px_28px_rgba(37,99,235,0.14)] ring-1 ring-white">
      {items.map((item) => (
        <span
          key={item.label}
          title={item.label}
          className="flex h-8 w-8 items-center justify-center rounded-full text-[11px] font-bold text-white shadow-sm"
          style={{ background: item.bg }}
        >
          {item.icon === "x" && (
            <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" fill="currentColor">
              <path d="M14.7 10.3 21.4 3h-1.6l-5.8 6.4L9.2 3H3.5l7 10.1L3.5 21h1.6l6.2-6.8L14.8 21h5.7l-7.3-10.7Zm-2.2 2.4-.7-1-5.6-7.7h2.4l4.5 6.3.7 1 5.9 8.1h-2.4l-4.8-6.7Z" />
            </svg>
          )}
          {item.icon === "f" && <span className="font-serif text-[15px] leading-none">f</span>}
          {item.icon === "in" && <span className="text-[9px] font-extrabold tracking-tight">in</span>}
          {item.icon === "yt" && (
            <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" fill="currentColor">
              <path d="M22 12.2s0-3.2-.4-4.6c-.2-.9-.9-1.6-1.8-1.8C18.2 5.4 12 5.4 12 5.4s-6.2 0-7.8.4c-.9.2-1.6.9-1.8 1.8C2 9 2 12.2 2 12.2s0 3.2.4 4.6c.2.9.9 1.6 1.8 1.8 1.6.4 7.8.4 7.8.4s6.2 0 7.8-.4c.9-.2 1.6-.9 1.8-1.8.4-1.4.4-4.6.4-4.6ZM10 15.5v-6.6l5.2 3.3-5.2 3.3Z" />
            </svg>
          )}
        </span>
      ))}
    </div>
  );
}
