"use client";

import { useState, useEffect } from "react";
import { LOCAL, INTL, isPoster, type Destination } from "@/lib/data";
import { useCurrency, displayPrice } from "@/lib/useCurrency";
import WishlistButton from "@/components/WishlistButton";

function openWhatsApp(d: Destination) {
  const msg = `Hi! I'm interested in the *${d.name}* package (${d.meta} · ${d.price}). Could you share more details and availability?`;
  window.open(`https://wa.me/254141920923?text=${encodeURIComponent(msg)}`, "_blank", "noopener,noreferrer");
}

function DestCard({
  d, tab, tall, onViewPoster,
}: { d: Destination; tab: string; tall: boolean; onViewPoster: (d: Destination) => void }) {
  const [type, duration] = d.meta.split(" · ");
  const currency = useCurrency();
  const poster = isPoster(d.img);
  const activate = () => (poster ? onViewPoster(d) : openWhatsApp(d));

  return (
    <div
      className={`cat-card${tall ? " tall" : ""}`}
      style={{ backgroundImage: `url(${d.img})` }}
      onClick={activate}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => e.key === "Enter" && activate()}
      aria-label={poster ? `View ${d.name} poster` : `Book ${d.name} on WhatsApp`}
    >
      <div className="cat-card-price">
        <span className="from">FROM</span>
        {displayPrice(d.price, currency)}
      </div>
      <WishlistButton
        className="wish-btn--card wish-btn--dest"
        item={{ title: d.name, meta: d.meta, price: d.price, img: d.img }}
      />
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

  const [viewing, setViewing] = useState<Destination | null>(null);

  const data = tab === "local" ? LOCAL : INTL;

  useEffect(() => {
    if (!viewing) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setViewing(null);
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [viewing]);

  return (
    <>
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
            <DestCard key={d.name} d={d} tab={tab} tall={i === 0} onViewPoster={setViewing} />
          ))}
        </div>
      </div>
    </section>

    {viewing && (
      <div className="lightbox" onClick={() => setViewing(null)} role="dialog" aria-modal aria-label={`${viewing.name} poster`}>
        <button className="lb-close" onClick={() => setViewing(null)} aria-label="Close">
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path d="M3 3l10 10M13 3L3 13" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
          </svg>
        </button>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          className="lb-img poster-lb-img"
          src={viewing.img}
          alt={`${viewing.name} travel poster`}
          onClick={(e) => e.stopPropagation()}
        />
        <div className="lb-meta">
          <button
            className="btn btn-primary"
            onClick={(e) => { e.stopPropagation(); openWhatsApp(viewing); }}
          >
            Book {viewing.name} on WhatsApp
          </button>
        </div>
      </div>
    )}
    </>
  );
}
