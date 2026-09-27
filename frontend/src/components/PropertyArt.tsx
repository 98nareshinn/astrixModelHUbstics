import type { PropertyType } from "../data/types";

// Deterministic palette variation so cards don't all look identical
const PALETTES = [
  { sky: "#F6E7C6", roof: "#1E4C8A", roof2: "#3E77C4", wall: "#FBF3E2", accent: "#E8A317" },
  { sky: "#EFE0F2", roof: "#C1701F", roof2: "#D6923F", wall: "#FFFDF9", accent: "#1E4C8A" },
  { sky: "#DCEAF6", roof: "#2F7D4F", roof2: "#4CA173", wall: "#FBF3E2", accent: "#D6432E" },
  { sky: "#FBE4D8", roof: "#1E4C8A", roof2: "#4C86D1", wall: "#FFFDF9", accent: "#B9740F" },
];

function paletteFor(seed: string) {
  const idx = seed.split("").reduce((a, c) => a + c.charCodeAt(0), 0) % PALETTES.length;
  return PALETTES[idx];
}

export default function PropertyArt({ id, type }: { id: string; type: PropertyType }) {
  const p = paletteFor(id);

  if (type === "plot" || type === "land") {
    return (
      <svg viewBox="0 0 320 180" width="100%" height="100%" preserveAspectRatio="xMidYMid slice">
        <rect width="320" height="180" fill={p.sky} />
        <circle cx="272" cy="34" r="22" fill={p.accent} opacity="0.5" />
        {/* plot grid */}
        <g stroke={p.roof} strokeWidth="2" opacity="0.7">
          <path d="M20 150 L60 60 L260 60 L300 150 Z" fill={p.wall} stroke={p.roof} />
          <line x1="20" y1="150" x2="300" y2="150" />
          <line x1="93" y1="60" x2="76" y2="150" />
          <line x1="166" y1="60" x2="166" y2="150" />
          <line x1="239" y1="60" x2="256" y2="150" />
        </g>
        <path d="M0 160 Q80 148 160 158 T320 154 V180 H0 Z" fill={p.roof2} opacity="0.25" />
      </svg>
    );
  }

  if (type === "shop" || type === "office" || type === "warehouse") {
    return (
      <svg viewBox="0 0 320 180" width="100%" height="100%" preserveAspectRatio="xMidYMid slice">
        <rect width="320" height="180" fill={p.sky} />
        <rect x="40" y="60" width="240" height="100" fill={p.wall} stroke={p.roof} strokeWidth="2" />
        <rect x="40" y="46" width="240" height="18" fill={p.roof} />
        {[70, 130, 190, 250].map((x, i) => (
          <rect key={i} x={x - 14} y="90" width="28" height="70" fill={i === 1 ? p.accent : p.roof2} opacity="0.85" />
        ))}
        <path d="M0 165 Q80 150 160 162 T320 158 V180 H0 Z" fill={p.roof2} opacity="0.2" />
      </svg>
    );
  }

  // apartment / house / villa
  return (
    <svg viewBox="0 0 320 180" width="100%" height="100%" preserveAspectRatio="xMidYMid slice">
      <rect width="320" height="180" fill={p.sky} />
      <circle cx="264" cy="38" r="20" fill={p.accent} opacity="0.55" />
      <path d="M160 34 L250 92 H232 V158 H88 V92 H70 Z" fill={p.roof} />
      <path d="M160 34 L250 92 H232 L160 48 L88 92 H70 Z" fill={p.roof2} />
      <rect x="140" y="118" width="40" height="40" rx="2" fill={p.wall} />
      <rect x="98" y="104" width="22" height="22" rx="2" fill={p.wall} opacity="0.9" />
      <rect x="198" y="104" width="22" height="22" rx="2" fill={p.wall} opacity="0.9" />
      <path d="M0 165 Q80 150 160 162 T320 158 V180 H0 Z" fill={p.roof2} opacity="0.22" />
    </svg>
  );
}
