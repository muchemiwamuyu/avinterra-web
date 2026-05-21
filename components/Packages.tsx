"use client";

import { useRef, useEffect, useState } from "react";
import { PACKAGES } from "@/lib/data";

export default function Packages() {
  const railRef = useRef<HTMLDivElement>(null);
  const [openCards, setOpenCards] = useState<Set<string>>(new Set());

  const toggle = (title: string) =>
    setOpenCards((prev) => {
      const next = new Set(prev);
      next.has(title) ? next.delete(title) : next.add(title);
      return next;
    });

  useEffect(() => {
    const rail = railRef.current;
    if (!rail) return;
    const cards = rail.querySelectorAll<HTMLElement>(".pkg");

    const onScroll = () => {
      const vh = window.innerHeight;
      cards.forEach((c) => {
        const r = c.getBoundingClientRect();
        const dist = (r.top + r.height / 2 - vh / 2) / vh;
        const rx = Math.max(-8, Math.min(8, dist * 8));
        const ty = Math.max(-10, Math.min(10, dist * 10));
        c.style.transform = `translateY(${ty}px) rotateX(${-rx}deg)`;
      });
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <section id="packages" className="packages">
      <div className="container">
        <div className="section-head reveal">
          <div>
            <div className="eyebrow">04 · Featured packages</div>
            <h2>
              This season&rsquo;s <em>most-booked</em> escapes.
            </h2>
          </div>
          <p>
            Hand-picked, fully outfitted itineraries. Click any card to see the
            full inclusion list, flight options, and what&rsquo;s not in the box.
          </p>
        </div>

        <div className="pkg-rail" ref={railRef}>
          {PACKAGES.map((p) => {
            const isOpen = openCards.has(p.title);
            return (
              <article className="pkg reveal" key={p.title}>
                <div className="pkg-img" style={{ backgroundImage: `url(${p.img})` }}>
                  <span className={`pkg-stamp${p.intl ? " intl" : ""}`}>{p.badge}</span>
                </div>
                <div className="pkg-body">
                  <h3 className="pkg-title">{p.title}</h3>
                  <div className="pkg-meta">{p.duration}</div>
                  <div className="pkg-foot">
                    <div className="pkg-price">
                      <span className="from">STARTING FROM</span>
                      {p.price}
                    </div>
                    <button className="pkg-book">Book now ↗</button>
                  </div>

                  {p.inclusions && (
                    <>
                      <button
                        className="pkg-details-toggle"
                        onClick={() => toggle(p.title)}
                        aria-expanded={isOpen}
                      >
                        <span>{isOpen ? "Hide details" : "What's included"}</span>
                        <svg
                          width="12" height="12" viewBox="0 0 12 12" fill="none"
                          style={{ transform: isOpen ? "rotate(180deg)" : "none" }}
                        >
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
          })}
        </div>
      </div>
    </section>
  );
}
