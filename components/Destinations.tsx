"use client";

import { useState } from "react";
import { LOCAL, INTL, type Destination } from "@/lib/data";

function DestCard({ d, tab, tall }: { d: Destination; tab: string; tall: boolean }) {
  const [type, duration] = d.meta.split(" · ");

  const openWhatsApp = () => {
    const msg = `Hi! I'm interested in the *${d.name}* package (${d.meta} · ${d.price}). Could you share more details and availability?`;
    window.open(`https://wa.me/254759935642?text=${encodeURIComponent(msg)}`, "_blank", "noopener,noreferrer");
  };

  return (
    <div
      className={`cat-card${tall ? " tall" : ""}`}
      style={{ backgroundImage: `url(${d.img})` }}
      onClick={openWhatsApp}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => e.key === "Enter" && openWhatsApp()}
      aria-label={`Book ${d.name} on WhatsApp`}
    >
      <div className="cat-card-price">
        <span className="from">FROM</span>
        {d.price}
      </div>
      <div className="cat-card-arrow">
        <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
          <path d="M1 13L13 1M13 1H4M13 1V10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
      </div>
      <div className="cat-card-inner">
        <div className="cat-card-tag">
          {tab === "local" ? "KENYA" : "INTERNATIONAL"} · {duration?.toUpperCase()}
        </div>
        <h3>{d.name}</h3>
        <div className="cat-card-meta">
          <span>● {type}</span>
          <span>● Group · Family · Solo</span>
        </div>
      </div>
    </div>
  );
}

export default function Destinations() {
  const [tab, setTab] = useState<"local" | "intl">("local");

  const data = tab === "local" ? LOCAL : INTL;

  return (
    <section id="destinations">
      <div className="container">
        <div className="section-head reveal">
          <div>
            <div className="eyebrow">03 · Tour categories</div>
            <h2>
              Two passports, <em>one expedition house.</em>
            </h2>
          </div>
          <p>
            Pick where Kenya takes you next, or where in the world we&rsquo;ll
            take you. Every package below is fully outfitted — transport,
            lodging, guide.
          </p>
        </div>

        <div className="cats-tabs reveal">
          <button
            className={`cats-tab${tab === "local" ? " active" : ""}`}
            onClick={() => setTab("local")}
          >
            <span className="pill">KE</span> Local tours · Kenya
          </button>
          <button
            className={`cats-tab${tab === "intl" ? " active" : ""}`}
            onClick={() => setTab("intl")}
          >
            <span className="pill">INTL</span> International tours
          </button>
        </div>

        <div className="cats-grid" key={tab}>
          {data.map((d, i) => (
            <DestCard key={d.name} d={d} tab={tab} tall={i === 0} />
          ))}
        </div>
      </div>
    </section>
  );
}
