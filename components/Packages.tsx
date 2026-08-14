"use client";

import { useState, useMemo } from "react";
import { PACKAGES, PHOTOS, WA_NUMBER } from "@/lib/data";
import {
  useCurrency,
  displayPrice,
  parsePrice,
  convert,
  formatAmount,
  type Currency,
} from "@/lib/useCurrency";
import WishlistButton from "@/components/WishlistButton";

type Filter = "all" | "local" | "intl" | "corporate";
type Budget = "any" | "b1" | "b2" | "b3" | "b4";
type Length = "any" | "day" | "short" | "long";
type Sort = "featured" | "price-asc" | "price-desc" | "duration";

// Budget bucket edges per currency, so the labels stay round numbers in both
const BUDGET_EDGES: Record<Currency, [number, number, number]> = {
  KSH: [10_000, 30_000, 60_000],
  USD: [100, 250, 500],
};

const LENGTHS: { key: Length; label: string }[] = [
  { key: "any", label: "Any length" },
  { key: "day", label: "Day trips" },
  { key: "short", label: "2–4 days" },
  { key: "long", label: "5+ days" },
];

const SORTS: { key: Sort; label: string }[] = [
  { key: "featured", label: "Featured" },
  { key: "price-asc", label: "Price: low to high" },
  { key: "price-desc", label: "Price: high to low" },
  { key: "duration", label: "Trip length" },
];

/** Days extracted from an authored duration string like "3 DAYS · 2 NIGHTS · SAFARI". */
function parseDays(duration: string): number | null {
  const m = duration.match(/(\d+)\s*DAYS?/i);
  return m ? parseInt(m[1], 10) : null;
}

function budgetLabel(key: Budget, currency: Currency): string {
  const [a, b, c] = BUDGET_EDGES[currency];
  const f = (n: number) => formatAmount(n, currency);
  switch (key) {
    case "b1": return `Under ${f(a)}`;
    case "b2": return `${f(a)} – ${f(b)}`;
    case "b3": return `${f(b)} – ${f(c)}`;
    case "b4": return `${f(c)}+`;
    default:   return "Any budget";
  }
}

function CheckIcon({ color }: { color: string }) {
  return (
    <svg width="14" height="14" viewBox="0 0 12 12" fill="none" aria-hidden>
      <path d="M2 6l3 3 5-5" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

const CORP_SERVICES = [
  {
    num: "01",
    title: "Corporate Team Building",
    img: PHOTOS.corpAdventure,
    items: ["Indoor & outdoor team-building", "Problem-solving challenges", "Team strategy games", "Leadership development exercises", "Communication workshops", "Trust-building activities"],
  },
  {
    num: "02",
    title: "Employee Bonding",
    img: PHOTOS.corpCoastal,
    items: ["Corporate retreats", "Adventure-based bonding", "Social engagement events", "Wellness & recreation programs", "Staff appreciation events"],
  },
  {
    num: "03",
    title: "Leadership Development",
    img: PHOTOS.corpLeadership,
    items: ["Emerging leaders training", "Executive team retreats", "Decision-making simulations", "Conflict resolution activities", "Strategic thinking exercises"],
  },
  {
    num: "04",
    title: "Events Management",
    img: PHOTOS.corpEvents,
    items: ["Company retreats", "Annual staff outings", "Corporate family days", "End-of-year celebrations", "Conference team engagement"],
  },
];

const WHY_ITEMS = [
  "Customized programs tailored to organizational goals",
  "Experienced facilitators and event coordinators",
  "Innovative and engaging activities",
  "Focus on measurable outcomes and team performance",
  "Safe and professionally managed experiences",
  "Flexible packages for organizations of all sizes",
];

const BENEFIT_ITEMS = [
  "Improve communication among employees",
  "Strengthen workplace relationships",
  "Enhance collaboration and teamwork",
  "Increase employee motivation and morale",
  "Develop leadership capabilities",
  "Improve problem-solving and decision-making skills",
  "Foster a positive organizational culture",
  "Increase productivity and employee retention",
];

const CLIENT_TAGS = [
  "Corporations & Private Companies",
  "Government Institutions",
  "NGOs & Development Organizations",
  "Educational Institutions",
  "Financial Institutions",
  "Technology Companies",
  "Manufacturing Firms",
  "SMEs & Startups",
];

function CorporateProfile() {
  const waMsg = `Hi! I'm interested in Avinterra's corporate team-building and employee bonding programs.\n\nCould you share more details and pricing for our organization?`;

  return (
    <div className="corp-profile">
      {/* Hero banner */}
      <div className="corp-hero reveal" style={{ backgroundImage: `url(${PHOTOS.corpHero})` }}>
        <div className="corp-hero-overlay">
          <div className="eyebrow" style={{ color: "rgba(255,255,255,0.7)" }}>Corporate Solutions</div>
          <h2 style={{ color: "#fff", marginTop: 12 }}>
            Team Building &amp; <em>Employee Bonding</em> Solutions
          </h2>
          <p className="corp-overview-text">
            Avinterra Expeditions is a leading provider of corporate team-building, employee bonding,
            and experiential learning programs designed to strengthen workplace relationships, improve
            communication, and enhance organizational performance.
          </p>
        </div>
      </div>

      {/* Mission & Vision */}
      <div className="corp-mv-grid reveal">
        <div className="corp-mv-card">
          <div className="corp-label accent">Our Mission</div>
          <p>To empower organizations through innovative team-building experiences that strengthen relationships, improve collaboration, and drive business success.</p>
        </div>
        <div className="corp-mv-card">
          <div className="corp-label accent">Our Vision</div>
          <p>To be the preferred corporate team-building and employee engagement partner, delivering transformative experiences that create stronger, more connected, and high-performing teams.</p>
        </div>
      </div>

      {/* Services */}
      <div className="reveal">
        <div className="corp-label dim">Our Services</div>
        <div className="corp-services-grid">
          {CORP_SERVICES.map((s) => (
            <div className="corp-service-card" key={s.num}>
              <div className="corp-service-img" style={{ backgroundImage: `url(${s.img})` }} />
              <div className="corp-service-body">
                <div className="corp-service-num">{s.num}</div>
                <div className="corp-service-title">{s.title}</div>
                <ul className="corp-service-list">
                  {s.items.map((item) => <li key={item}>{item}</li>)}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Photo strip */}
      <div className="corp-photo-strip reveal">
        <div className="corp-photo" style={{ backgroundImage: `url(${PHOTOS.corpStrip1})` }} />
        <div className="corp-photo" style={{ backgroundImage: `url(${PHOTOS.corpStrip2})` }} />
        <div className="corp-photo" style={{ backgroundImage: `url(${PHOTOS.corpBushBoard})` }} />
      </div>

      {/* Why Choose + Benefits */}
      <div className="corp-two-col reveal">
        <div className="corp-list-card">
          <div className="corp-label accent">Why Choose Avinterra?</div>
          <ul className="corp-check-list">
            {WHY_ITEMS.map((item) => (
              <li key={item}><CheckIcon color="var(--teal)" />{item}</li>
            ))}
          </ul>
        </div>
        <div className="corp-list-card">
          <div className="corp-label accent">Benefits to Organizations</div>
          <ul className="corp-check-list">
            {BENEFIT_ITEMS.map((item) => (
              <li key={item}><CheckIcon color="var(--accent-2)" />{item}</li>
            ))}
          </ul>
        </div>
      </div>

      {/* Target Clients */}
      <div className="reveal">
        <div className="corp-label dim">Who We Serve</div>
        <div className="corp-client-tags">
          {CLIENT_TAGS.map((tag) => <span className="corp-tag" key={tag}>{tag}</span>)}
        </div>
      </div>

      {/* Approach + CTA */}
      <div className="corp-approach reveal">
        <div className="corp-label dim">Our Approach</div>
        <p>
          We begin by understanding each client&rsquo;s objectives, team dynamics, and organizational
          culture. Based on these insights, we design customized experiences that deliver meaningful
          engagement and lasting impact. Every program includes professional facilitation, structured
          activities, and post-event feedback to ensure maximum value.
        </p>
        <button
          className="corp-wa-btn"
          onClick={() => window.open(`https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(waMsg)}`, "_blank", "noopener,noreferrer")}
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
            <path d="M17.5 14.4l-2.4-1.2c-.4-.2-.9-.1-1.2.2l-1 1c-1.5-.8-2.7-2-3.5-3.5l1-1c.3-.3.4-.8.2-1.2L9.4 6.3c-.3-.6-1-.8-1.5-.4-1.6 1-2.5 2.8-2.1 4.8.7 4 4 7.3 8 8 2 .4 3.8-.5 4.8-2.1.3-.5.1-1.2-.4-1.5z" />
          </svg>
          Get a Corporate Quote on WhatsApp
        </button>
      </div>
    </div>
  );
}

export default function Packages() {
  const [openCards, setOpenCards] = useState<Set<string>>(new Set());
  const [filter, setFilter] = useState<Filter>("all");
  const [search, setSearch] = useState("");
  const [budget, setBudget] = useState<Budget>("any");
  const [length, setLength] = useState<Length>("any");
  const [sort, setSort] = useState<Sort>("featured");
  const [calcPkg, setCalcPkg] = useState(PACKAGES[0].title);
  const [travelers, setTravelers] = useState(2);
  const currency = useCurrency();

  const toggle = (title: string) =>
    setOpenCards((prev) => {
      const next = new Set(prev);
      if (next.has(title)) next.delete(title);
      else next.add(title);
      return next;
    });

  const filtered = useMemo(() => {
    const [e1, e2, e3] = BUDGET_EDGES[currency];

    const matches = PACKAGES.filter((p) => {
      const matchFilter =
        filter === "all" ||
        (filter === "local" && !p.intl && !p.corporate) ||
        (filter === "intl" && p.intl) ||
        (filter === "corporate" && p.corporate);
      const q = search.toLowerCase();
      const matchSearch =
        !q ||
        p.title.toLowerCase().includes(q) ||
        p.duration.toLowerCase().includes(q) ||
        p.badge.toLowerCase().includes(q);

      // Budget compares in the reader's currency; quote-only packages are shown under "Any budget"
      let matchBudget = true;
      if (budget !== "any") {
        const parsed = parsePrice(p.price);
        if (!parsed) matchBudget = false;
        else {
          const v = convert(parsed.num, parsed.currency, currency);
          matchBudget =
            budget === "b1" ? v < e1 :
            budget === "b2" ? v >= e1 && v < e2 :
            budget === "b3" ? v >= e2 && v < e3 :
            v >= e3;
        }
      }

      let matchLength = true;
      if (length !== "any") {
        const d = parseDays(p.duration);
        if (d === null) matchLength = false;
        else matchLength = length === "day" ? d <= 1 : length === "short" ? d >= 2 && d <= 4 : d >= 5;
      }

      return matchFilter && matchSearch && matchBudget && matchLength;
    });

    if (sort === "featured") return matches;

    const priceIn = (price: string): number | null => {
      const parsed = parsePrice(price);
      return parsed ? convert(parsed.num, parsed.currency, currency) : null;
    };

    // Quote-only packages have no comparable value — always park them at the end
    return [...matches].sort((a, b) => {
      if (sort === "duration") {
        const da = parseDays(a.duration), db = parseDays(b.duration);
        if (da === null) return db === null ? 0 : 1;
        if (db === null) return -1;
        return da - db;
      }
      const pa = priceIn(a.price), pb = priceIn(b.price);
      if (pa === null) return pb === null ? 0 : 1;
      if (pb === null) return -1;
      return sort === "price-asc" ? pa - pb : pb - pa;
    });
  }, [filter, search, budget, length, sort, currency]);


  const selectedPkg = PACKAGES.find((p) => p.title === calcPkg) ?? PACKAGES[0];
  const parsed = parsePrice(selectedPkg.price);
  const safeT = Math.max(1, Math.min(50, travelers));
  const perPerson = parsed ? convert(parsed.num, parsed.currency, currency) : null;
  const total = perPerson !== null ? perPerson * safeT : null;
  const totalStr = total !== null
    ? formatAmount(total, currency)
    : "Contact us for pricing";

  const calcWaMsg = total !== null
    ? `Hi! I'd like a quote for *${selectedPkg.title}* for ${safeT} traveller${safeT > 1 ? "s" : ""}.\n\n📍 ${selectedPkg.duration}\n💰 Estimated total: ${totalStr} (${formatAmount(perPerson!, currency)} × ${safeT})\n\nCould you confirm availability and final pricing?`
    : `Hi! I'm interested in the *${selectedPkg.title}* package for ${safeT} traveller${safeT > 1 ? "s" : ""}.\n\n📍 ${selectedPkg.duration}\n\nCould you share pricing and availability?`;

  const isCorporate = filter === "corporate";

  return (
    <section id="packages" className="packages">
      <div className="container">
        {!isCorporate && (
          <div className="section-head reveal">
            <div>
              <div className="eyebrow">04 · Featured packages</div>
              <h2>This season&rsquo;s <em>most-booked</em> escapes.</h2>
            </div>
            <p>
              Hand-picked, fully outfitted itineraries. Click any card to see the
              full inclusion list, flight options, and what&rsquo;s not in the box.
            </p>
          </div>
        )}

        {/* Filter bar */}
        <div className="pkg-filters reveal">
          {(["all", "local", "intl", "corporate"] as Filter[]).map((f) => (
            <button
              key={f}
              className={`pkg-filter-btn${filter === f ? " active" : ""}`}
              onClick={() => setFilter(f)}
            >
              {f === "all" ? "All packages" : f === "local" ? "Local · Kenya" : f === "intl" ? "International" : "Corporate"}
            </button>
          ))}
          {!isCorporate && (
            <div className="pkg-search-wrap">
              <svg width="13" height="13" viewBox="0 0 16 16" fill="none" className="pkg-search-icon">
                <circle cx="7" cy="7" r="5" stroke="currentColor" strokeWidth="1.6" />
                <path d="M11 11l3 3" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
              </svg>
              <input
                className="pkg-search"
                type="search"
                placeholder="Search destinations…"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
          )}
          {!isCorporate && (
            <span className="pkg-count">
              {filtered.length} package{filtered.length !== 1 ? "s" : ""}
            </span>
          )}
        </div>

        {/* Refine bar — budget, trip length, sort */}
        {!isCorporate && (
          <div className="pkg-refine reveal">
            <div className="pkg-refine-group">
              <span className="pkg-refine-label">Budget</span>
              <div className="pkg-chips">
                {(["any", "b1", "b2", "b3", "b4"] as Budget[]).map((b) => (
                  <button
                    key={b}
                    className={`pkg-chip${budget === b ? " active" : ""}`}
                    onClick={() => setBudget(b)}
                    aria-pressed={budget === b}
                  >
                    {budgetLabel(b, currency)}
                  </button>
                ))}
              </div>
            </div>

            <div className="pkg-refine-group">
              <span className="pkg-refine-label">Length</span>
              <div className="pkg-chips">
                {LENGTHS.map(({ key, label }) => (
                  <button
                    key={key}
                    className={`pkg-chip${length === key ? " active" : ""}`}
                    onClick={() => setLength(key)}
                    aria-pressed={length === key}
                  >
                    {label}
                  </button>
                ))}
              </div>
            </div>

            <div className="pkg-refine-group pkg-refine-sort">
              <label className="pkg-refine-label" htmlFor="pkg-sort">Sort</label>
              <select
                id="pkg-sort"
                className="pkg-sort-select"
                value={sort}
                onChange={(e) => setSort(e.target.value as Sort)}
              >
                {SORTS.map(({ key, label }) => (
                  <option key={key} value={key}>{label}</option>
                ))}
              </select>
            </div>

            {(budget !== "any" || length !== "any" || sort !== "featured" || search) && (
              <button
                className="pkg-reset"
                onClick={() => { setBudget("any"); setLength("any"); setSort("featured"); setSearch(""); }}
              >
                Reset
              </button>
            )}
          </div>
        )}

        {isCorporate ? (
          <CorporateProfile />
        ) : (
          <>
            <div className="pkg-rail">
              {filtered.length === 0 ? (
                <div className="pkg-empty">
                  <svg width="32" height="32" viewBox="0 0 24 24" fill="none">
                    <circle cx="11" cy="11" r="8" stroke="currentColor" strokeWidth="1.5" />
                    <path d="M21 21l-4.35-4.35" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                  </svg>
                  <p>
                    {search
                      ? `No packages match “${search}” with these filters.`
                      : "No packages match these filters."}
                  </p>
                  <button
                    className="pkg-filter-btn"
                    onClick={() => { setSearch(""); setFilter("all"); setBudget("any"); setLength("any"); }}
                  >
                    Clear filters
                  </button>
                </div>
              ) : (
                filtered.map((p) => {
                  const isOpen = openCards.has(p.title);
                  return (
                    <article className="pkg reveal" key={p.title}>
                      <div className="pkg-img" style={{ backgroundImage: `url(${p.img})` }}>
                        <span className={`pkg-stamp${p.intl ? " intl" : p.corporate ? " corporate" : ""}`}>{p.badge}</span>
                        {!p.corporate && (
                          <WishlistButton
                            className="wish-btn--card"
                            item={{ title: p.title, meta: p.duration, price: p.price, img: p.img }}
                          />
                        )}
                      </div>
                      <div className="pkg-body">
                        <h3 className="pkg-title">{p.title}</h3>
                        <div className="pkg-meta">{p.duration}</div>
                        <div className="pkg-foot">
                          <div className="pkg-price">
                            {p.corporate ? (
                              <span className="from">CUSTOM PRICING</span>
                            ) : (
                              <>
                                <span className="from">STARTING FROM</span>
                                {displayPrice(p.price, currency)}
                              </>
                            )}
                          </div>
                          <button
                            className={`pkg-book${p.corporate ? " pkg-book--quote" : ""}`}
                            onClick={() => {
                              const msg = p.corporate
                                ? `Hi! We're interested in the *${p.title}* corporate package for our team.\n\n📍 ${p.duration}\n\nCould you share pricing and availability for our group?`
                                : `Hi! I'd like to book the *${p.title}* package.\n\n📍 ${p.duration}\n💰 ${p.price}\n\nCould you share availability and next steps?`;
                              window.open(`https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(msg)}`, "_blank", "noopener,noreferrer");
                            }}
                          >
                            {p.corporate ? "Get a Quote ↗" : "Book now ↗"}
                          </button>
                        </div>

                        {p.inclusions && (
                          <>
                            <button
                              className="pkg-details-toggle"
                              onClick={() => toggle(p.title)}
                              aria-expanded={isOpen}
                            >
                              <span>{isOpen ? "Hide details" : "What's included"}</span>
                              <svg width="12" height="12" viewBox="0 0 12 12" fill="none"
                                style={{ transform: isOpen ? "rotate(180deg)" : "none" }}>
                                <path d="M2 4l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                              </svg>
                            </button>

                            <div className={`pkg-details${isOpen ? " open" : ""}`}>
                              <div className="pkg-details-section">
                                <div className="pkg-details-label">INCLUDED</div>
                                <ul className="pkg-details-list">
                                  {p.inclusions.map((item) => (
                                    <li key={item}>
                                      <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                                        <path d="M2 6l3 3 5-5" stroke="var(--teal)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                      </svg>
                                      {item}
                                    </li>
                                  ))}
                                </ul>
                              </div>
                              {p.exclusions && (
                                <div className="pkg-details-section">
                                  <div className="pkg-details-label">NOT INCLUDED</div>
                                  <ul className="pkg-details-list">
                                    {p.exclusions.map((item) => (
                                      <li key={item}>
                                        <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                                          <path d="M3 3l6 6M9 3l-6 6" stroke="var(--accent)" strokeWidth="1.5" strokeLinecap="round" />
                                        </svg>
                                        {item}
                                      </li>
                                    ))}
                                  </ul>
                                </div>
                              )}
                            </div>
                          </>
                        )}
                      </div>
                    </article>
                  );
                })
              )}
            </div>

            {/* Trip Cost Calculator */}
            <div className="calc-card reveal">
              <div className="calc-header">
                <div className="eyebrow">Quick estimate</div>
                <h3>Trip Cost <em>Calculator</em></h3>
                <p>Pick a package and group size — we&rsquo;ll give you a ballpark total instantly.</p>
              </div>

              <div className="calc-controls">
                <div className="calc-field">
                  <label className="calc-label">Destination</label>
                  <select
                    className="calc-select"
                    value={calcPkg}
                    onChange={(e) => setCalcPkg(e.target.value)}
                  >
                    <optgroup label="Local · Kenya">
                      {PACKAGES.filter((p) => !p.intl && !p.corporate).map((p) => (
                        <option key={p.title} value={p.title}>{p.title} — {displayPrice(p.price, currency)}</option>
                      ))}
                    </optgroup>
                    <optgroup label="International">
                      {PACKAGES.filter((p) => p.intl).map((p) => (
                        <option key={p.title} value={p.title}>{p.title} — {displayPrice(p.price, currency)}</option>
                      ))}
                    </optgroup>
                    <optgroup label="Corporate (custom quote)">
                      {PACKAGES.filter((p) => p.corporate).map((p) => (
                        <option key={p.title} value={p.title}>{p.title} — Custom pricing</option>
                      ))}
                    </optgroup>
                  </select>
                </div>

                <div className="calc-field">
                  <label className="calc-label">Travellers</label>
                  <div className="calc-stepper">
                    <button className="calc-step-btn" onClick={() => setTravelers((t) => Math.max(1, t - 1))} aria-label="Decrease">−</button>
                    <span className="calc-step-val">{safeT}</span>
                    <button className="calc-step-btn" onClick={() => setTravelers((t) => Math.min(50, t + 1))} aria-label="Increase">+</button>
                  </div>
                </div>
              </div>

              <div className="calc-result-row">
                <div>
                  <div className="calc-result-label">Estimated total</div>
                  <div className="calc-result">{totalStr}</div>
                  {perPerson !== null && (
                    <div className="calc-note">
                      {formatAmount(perPerson, currency)} × {safeT} traveller{safeT > 1 ? "s" : ""}
                      {" · "}prices may vary — contact us for final quote
                    </div>
                  )}
                  {perPerson === null && (
                    <div className="calc-note">Pricing varies — message us for a custom quote</div>
                  )}
                </div>
                <button
                  className="calc-cta"
                  onClick={() => window.open(`https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(calcWaMsg)}`, "_blank", "noopener,noreferrer")}
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M17.5 14.4l-2.4-1.2c-.4-.2-.9-.1-1.2.2l-1 1c-1.5-.8-2.7-2-3.5-3.5l1-1c.3-.3.4-.8.2-1.2L9.4 6.3c-.3-.6-1-.8-1.5-.4-1.6 1-2.5 2.8-2.1 4.8.7 4 4 7.3 8 8 2 .4 3.8-.5 4.8-2.1.3-.5.1-1.2-.4-1.5z" />
                  </svg>
                  Get this quote on WhatsApp
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </section>
  );
}
