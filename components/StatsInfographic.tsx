"use client";

import type { ReactNode } from "react";
import { BIG_FIVE } from "@/lib/data";
import { useCounter } from "@/lib/useCounter";

/* ------------------------------------------------------------------ *
 * Stat icons — inline SVG, stroked, inherit colour via currentColor.
 * ------------------------------------------------------------------ */
const ICON_PROPS = {
  width: 22,
  height: 22,
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.5,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
};

function CompassIcon() {
  return (
    <svg {...ICON_PROPS}>
      <circle cx="12" cy="12" r="9" />
      <path d="M15.5 8.5 13 13l-4.5 2.5L11 11l4.5-2.5Z" />
    </svg>
  );
}

function MapPinIcon() {
  return (
    <svg {...ICON_PROPS}>
      <path d="M12 22s7-6.2 7-12a7 7 0 1 0-14 0c0 5.8 7 12 7 12Z" />
      <circle cx="12" cy="10" r="2.6" />
    </svg>
  );
}

function UsersIcon() {
  return (
    <svg {...ICON_PROPS}>
      <circle cx="9" cy="8" r="3.2" />
      <path d="M3.5 20c0-3.3 2.5-5.5 5.5-5.5s5.5 2.2 5.5 5.5" />
      <path d="M16 5.2A3.2 3.2 0 0 1 16 11.6M16.5 14.7c2.6.4 4.5 2.5 4.5 5.3" />
    </svg>
  );
}

function StarIcon() {
  return (
    <svg {...ICON_PROPS}>
      <path d="M12 3.5 14.6 9l6 .8-4.3 4.2 1 6-5.3-2.9L6.7 20l1-6L3.4 9.8l6-.8L12 3.5Z" />
    </svg>
  );
}

/* ------------------------------------------------------------------ *
 * Stat definitions.
 * ------------------------------------------------------------------ */
interface StatDef {
  icon: ReactNode;
  target: number;
  decimals: number;
  unit: string;
  label: string;
}

const STATS: StatDef[] = [
  { icon: <CompassIcon />, target: 10,    decimals: 0, unit: "+", label: "Years of expertise" },
  { icon: <MapPinIcon />,  target: 50,    decimals: 0, unit: "+", label: "Destinations worldwide" },
  { icon: <UsersIcon />,   target: 10000, decimals: 0, unit: "+", label: "Happy travellers" },
  { icon: <StarIcon />,    target: 4.8,   decimals: 1, unit: "★", label: "Guest rating" },
];

/** A single animated counter card. Each card owns its own observer. */
function StatCard({ icon, target, decimals, unit, label }: StatDef) {
  const { ref, value } = useCounter<HTMLDivElement>({ target, decimals });

  return (
    <div className="stat-counter-card reveal" ref={ref}>
      <div className="ico">{icon}</div>
      <div className="num">
        {value}
        <span className="unit">{unit}</span>
      </div>
      <div className="stat-counter-label">{label}</div>
    </div>
  );
}

export default function StatsInfographic() {
  return (
    <section id="impact" className="stats-infographic">
      <div className="container">
        <div className="section-head reveal">
          <div>
            <div className="eyebrow">04 · By the numbers</div>
            <h2>
              A decade of expeditions, <em>measured in moments.</em>
            </h2>
          </div>
          <p>
            Ten years guiding curious travellers across Kenya and beyond — the
            numbers only tell half the story.
          </p>
        </div>

        {/* Animated stat counters */}
        <div className="stat-counter-grid">
          {STATS.map((stat) => (
            <StatCard key={stat.label} {...stat} />
          ))}
        </div>

        {/* Africa's Big Five 3D encounter cards */}
        <div className="big-five-head reveal">
          <div className="eyebrow">Wildlife · Kenya</div>
          <h3>Africa&rsquo;s Big Five</h3>
          <p>
            The five legendary animals every safari chases — and where in Kenya
            you&rsquo;re most likely to meet them.
          </p>
        </div>

        <div className="big-five-grid">
          {BIG_FIVE.map((animal) => (
            <article
              key={animal.key}
              className="big-five-card reveal"
              style={{ backgroundImage: `url(${animal.img})` }}
            >
              <div className="big-five-overlay" />
              <div className="big-five-badge">{animal.fact}</div>
              <div className="big-five-body">
                <div className="big-five-loc">{animal.location}</div>
                <h4 className="big-five-name">{animal.name}</h4>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
