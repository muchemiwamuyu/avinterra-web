"use client";

import { useState } from "react";
import { LOCAL, WA_NUMBER, type Destination } from "@/lib/data";
import { useCurrency, displayPrice } from "@/lib/useCurrency";
import WishlistButton from "@/components/WishlistButton";

/* ---- Projection -----------------------------------------------------------
   Simple equirectangular projection of the Kenya bounding box onto the SVG
   viewBox. Everything below is authored as [lng, lat] and projected here, so
   pins and outline can never drift apart.                                    */

const LNG_MIN = 33.5, LNG_MAX = 42.2;
const LAT_MAX = 5.7, LAT_MIN = -5.0;
const W = 520;
const H = Math.round((W / (LNG_MAX - LNG_MIN)) * (LAT_MAX - LAT_MIN));

type Coord = [number, number];

function px([lng, lat]: Coord): [number, number] {
  return [
    ((lng - LNG_MIN) / (LNG_MAX - LNG_MIN)) * W,
    ((LAT_MAX - lat) / (LAT_MAX - LAT_MIN)) * H,
  ];
}

function path(coords: Coord[]): string {
  return coords.map((c, i) => `${i === 0 ? "M" : "L"}${px(c).map((n) => n.toFixed(1)).join(" ")}`).join(" ") + " Z";
}

// Stylised national outline — recognisable, not survey-accurate
const OUTLINE: Coord[] = [
  [33.98, 4.22], [34.42, 4.62], [35.30, 5.42], [35.86, 4.62], [36.05, 4.45],
  [36.85, 4.45], [38.12, 3.62], [39.50, 3.42], [41.00, 3.95], [41.90, 3.98],
  [41.55, 1.60], [41.00, 0.85], [40.98, -0.85], [41.55, -1.68], [40.20, -2.60],
  [39.70, -4.05], [39.20, -4.68], [37.80, -3.68], [37.60, -3.05], [36.20, -2.10],
  [34.90, -1.70], [34.00, -1.05], [33.90, -0.40], [34.10, 0.40], [34.55, 1.10],
  [34.80, 2.20], [34.55, 3.20], [34.30, 3.90],
];

const TURKANA: Coord[] = [
  [36.05, 4.55], [36.25, 4.20], [36.35, 3.60], [36.60, 3.00], [36.50, 2.45],
  [36.25, 2.60], [36.10, 3.20], [35.95, 3.70], [35.90, 4.20],
];

const VICTORIA: Coord[] = [
  [34.00, -0.10], [34.30, -0.30], [34.55, -0.70], [34.20, -1.05], [33.90, -0.95],
  [33.85, -0.45],
];

interface Spot {
  id: string;
  name: string;
  blurb: string;
  at: Coord;
  /** Destination names in LOCAL that start from this place */
  trips: string[];
  /** Nudge for the label when a neighbouring pin would collide */
  labelSide?: "left";
}

const SPOTS: Spot[] = [
  { id: "mara",     name: "Maasai Mara",   blurb: "Big cats, balloon dawns and the Migration river crossings.", at: [35.14, -1.49], trips: ["Maasai Mara", "Masai Mara NP"], labelSide: "left" },
  { id: "amboseli", name: "Amboseli",      blurb: "Elephant herds framed by Kilimanjaro.",                      at: [37.26, -2.65], trips: ["Amboseli"] },
  { id: "tsavo",    name: "Tsavo",         blurb: "Red elephants across Kenya's largest wilderness.",           at: [38.46, -2.98], trips: ["Tsavo Safari", "Tsavo National Park"] },
  { id: "nairobi",  name: "Nairobi",       blurb: "The only capital with lions on the skyline.",                at: [36.82, -1.30], trips: ["Nairobi National Park"], labelSide: "left" },
  { id: "nakuru",   name: "Lake Nakuru",   blurb: "Flamingo shallows and rhino country in the Rift.",           at: [36.08, -0.36], trips: ["Lake Nakuru NP"], labelSide: "left" },
  { id: "mtkenya",  name: "Mt Kenya",      blurb: "Glaciers on the equator, forest lodges below.",              at: [37.31, -0.15], trips: ["Mt Kenya Hike", "The Ark Lodge"] },
  { id: "longonot", name: "Mt Longonot",   blurb: "A crater-rim hike an hour from the city.",                   at: [36.45, -0.91], trips: ["Mt. Longonot"], labelSide: "left" },
  { id: "aberdare", name: "Aberdares",     blurb: "Moorland, bamboo forest and the Karuru falls.",              at: [36.71, -0.42], trips: ["Karuru Falls"] },
  { id: "muranga",  name: "Murang'a",      blurb: "Gorges, ridges and hanging bridges.",                        at: [37.15, -0.78], trips: ["Kiambicho Hills"] },
  { id: "kilifi",   name: "Kilifi",        blurb: "Creek water sports north of Mombasa.",                       at: [39.78, -3.63], trips: ["Salty's on the Creek"] },
  { id: "mombasa",  name: "Mombasa",       blurb: "Old town spice, white sand, all-inclusive resorts.",         at: [39.60, -4.02], trips: ["PrideInn Paradise", "Pangoni Beach Resort", "Jambo Travellers Hotel"] },
  { id: "diani",    name: "Diani",         blurb: "Kenya's most-photographed stretch of beach.",                at: [39.40, -4.30], trips: ["Southern Palms Beach", "Sun & Sand Resort"], labelSide: "left" },
];

function tripsOf(spot: Spot): Destination[] {
  return spot.trips
    .map((t) => LOCAL.find((d) => d.name === t))
    .filter((d): d is Destination => d !== undefined);
}

export default function KenyaMap() {
  const [activeId, setActiveId] = useState<string>(SPOTS[0].id);
  const currency = useCurrency();

  const active = SPOTS.find((s) => s.id === activeId) ?? SPOTS[0];
  const trips = tripsOf(active);

  return (
    <section id="map" className="kmap">
      <div className="container">
        <div className="section-head reveal" style={{ marginBottom: 40 }}>
          <div>
            <div className="eyebrow">Where we go</div>
            <h2 style={{ fontSize: "clamp(32px, 4vw, 48px)" }}>
              Kenya, <em>pin by pin.</em>
            </h2>
          </div>
          <p>
            Tap any pin to see what departs from there — parks, peaks and the coast,
            with live pricing in your chosen currency.
          </p>
        </div>

        <div className="kmap-grid reveal">
          {/* Map */}
          <div className="kmap-stage">
            <svg viewBox={`0 0 ${W} ${H}`} className="kmap-svg" role="img" aria-label="Stylised map of Kenya with destination pins">
              <defs>
                <linearGradient id="kmap-fill" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="var(--accent)" stopOpacity="0.16" />
                  <stop offset="100%" stopColor="var(--teal)" stopOpacity="0.10" />
                </linearGradient>
              </defs>

              <path d={path(OUTLINE)} fill="url(#kmap-fill)" stroke="var(--accent)" strokeWidth="1.6" strokeLinejoin="round" />
              <path d={path(TURKANA)} fill="var(--teal)" fillOpacity="0.28" stroke="var(--teal)" strokeWidth="0.8" />
              <path d={path(VICTORIA)} fill="var(--teal)" fillOpacity="0.28" stroke="var(--teal)" strokeWidth="0.8" />

              {/* Equator */}
              <line
                x1={0} x2={W}
                y1={px([LNG_MIN, 0])[1]} y2={px([LNG_MIN, 0])[1]}
                stroke="currentColor" strokeOpacity="0.18" strokeWidth="0.8" strokeDasharray="4 6"
              />
              <text x={6} y={px([LNG_MIN, 0])[1] - 6} className="kmap-equator">EQUATOR</text>

              {SPOTS.map((s) => {
                const [x, y] = px(s.at);
                const isActive = s.id === activeId;
                return (
                  <g
                    key={s.id}
                    className={`kmap-pin${isActive ? " active" : ""}`}
                    transform={`translate(${x.toFixed(1)} ${y.toFixed(1)})`}
                    role="button"
                    tabIndex={0}
                    aria-label={`${s.name} — ${s.trips.length} trip${s.trips.length !== 1 ? "s" : ""}`}
                    aria-pressed={isActive}
                    onClick={() => setActiveId(s.id)}
                    onMouseEnter={() => setActiveId(s.id)}
                    onFocus={() => setActiveId(s.id)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" || e.key === " ") {
                        e.preventDefault();
                        setActiveId(s.id);
                      }
                    }}
                  >
                    <circle className="kmap-pin-halo" r={14} />
                    <circle className="kmap-pin-dot" r={5} />
                    <text
                      className="kmap-pin-label"
                      x={s.labelSide === "left" ? -12 : 12}
                      y={4}
                      textAnchor={s.labelSide === "left" ? "end" : "start"}
                    >
                      {s.name}
                    </text>
                  </g>
                );
              })}
            </svg>
          </div>

          {/* Detail card */}
          <div className="kmap-detail">
            <div className="kmap-detail-head">
              <div className="kmap-detail-name">{active.name}</div>
              <p className="kmap-detail-blurb">{active.blurb}</p>
            </div>

            <ul className="kmap-trips">
              {trips.map((d) => (
                <li key={d.name} className="kmap-trip">
                  <span className="kmap-trip-thumb" style={{ backgroundImage: `url(${d.img})` }} aria-hidden="true" />
                  <span className="kmap-trip-body">
                    <span className="kmap-trip-name">{d.name}</span>
                    <span className="kmap-trip-meta">{d.meta}</span>
                  </span>
                  <span className="kmap-trip-right">
                    <span className="kmap-trip-price">{displayPrice(d.price, currency)}</span>
                    <span className="kmap-trip-actions">
                      <WishlistButton item={{ title: d.name, meta: d.meta, price: d.price, img: d.img }} />
                      <a
                        className="kmap-trip-book"
                        href={`https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(
                          `Hi! I'd like to book *${d.name}* (${d.meta} · ${d.price}). Could you share availability?`
                        )}`}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        Book ↗
                      </a>
                    </span>
                  </span>
                </li>
              ))}
            </ul>

            {/* Pin list — the keyboard/touch-friendly path through the same data */}
            <div className="kmap-chips">
              {SPOTS.map((s) => (
                <button
                  key={s.id}
                  className={`kmap-chip${s.id === activeId ? " active" : ""}`}
                  onClick={() => setActiveId(s.id)}
                  aria-pressed={s.id === activeId}
                >
                  {s.name}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
