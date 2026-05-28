"use client";

import { useState, useEffect, useCallback } from "react";
import { GALLERY } from "@/lib/data";

export default function Gallery() {
  const [activeIdx, setActiveIdx] = useState<number | null>(null);

  const close = useCallback(() => setActiveIdx(null), []);
  const prev = useCallback(() =>
    setActiveIdx((i) => (i === null ? null : (i - 1 + GALLERY.length) % GALLERY.length)), []);
  const next = useCallback(() =>
    setActiveIdx((i) => (i === null ? null : (i + 1) % GALLERY.length)), []);

  useEffect(() => {
    if (activeIdx === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      if (e.key === "ArrowLeft") prev();
      if (e.key === "ArrowRight") next();
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [activeIdx, close, prev, next]);

  return (
    <>
      <section id="gallery">
        <div className="container">
          <div className="section-head reveal">
            <div>
              <div className="eyebrow">07 · Gallery</div>
              <h2>Frames from the <em>field.</em></h2>
            </div>
            <p>Shot by our guides and guests. Click any photo to open it.</p>
          </div>

          <div className="gallery-grid reveal">
            {GALLERY.map((g, i) => (
              <div
                key={i}
                className={`g-tile ${g.cls}`}
                style={{ backgroundImage: `url(${g.src})` }}
                onClick={() => setActiveIdx(i)}
                role="button"
                tabIndex={0}
                aria-label={`View ${g.cap}`}
                onKeyDown={(e) => e.key === "Enter" && setActiveIdx(i)}
              >
                <div className="g-tile-cap">{g.cap}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {activeIdx !== null && (
        <div className="lightbox" onClick={close} role="dialog" aria-modal>
          <button className="lb-close" onClick={close} aria-label="Close">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M3 3l10 10M13 3L3 13" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
            </svg>
          </button>

          <button className="lb-nav lb-prev" onClick={(e) => { e.stopPropagation(); prev(); }} aria-label="Previous">
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
              <path d="M11 4L6 9l5 5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>

          <img
            className="lb-img"
            src={GALLERY[activeIdx].src}
            alt={GALLERY[activeIdx].cap}
            onClick={(e) => e.stopPropagation()}
          />

          <button className="lb-nav lb-next" onClick={(e) => { e.stopPropagation(); next(); }} aria-label="Next">
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
              <path d="M7 4l5 5-5 5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>

          <div className="lb-meta" onClick={(e) => e.stopPropagation()}>
            <span className="lb-cap">{GALLERY[activeIdx].cap}</span>
            <span className="lb-counter">{activeIdx + 1} / {GALLERY.length}</span>
          </div>
        </div>
      )}
    </>
  );
}
