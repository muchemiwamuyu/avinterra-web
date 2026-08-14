"use client";

import { useEffect, useState } from "react";
import { clearWishlist, removeWish, useWishlist } from "@/lib/useWishlist";
import { useCurrency, displayPrice, parsePrice, convert, formatAmount } from "@/lib/useCurrency";
import { WA_NUMBER } from "@/lib/data";

export default function WishlistTray() {
  const list = useWishlist();
  const currency = useCurrency();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  // Emptying the shortlist also collapses the panel, so it can't pop back open later
  const emptyAndClose = (fn: () => void) => {
    fn();
    setOpen(false);
  };

  if (list.length === 0) return null;

  const priced = list
    .map((i) => parsePrice(i.price))
    .filter((p): p is NonNullable<typeof p> => p !== null)
    .map((p) => convert(p.num, p.currency, currency));
  const subtotal = priced.reduce((a, b) => a + b, 0);
  const quoteOnly = list.length - priced.length;

  const waMsg = [
    "*My Avinterra shortlist*",
    "",
    ...list.map((i, n) => `${n + 1}. ${i.title} — ${displayPrice(i.price, currency)}${i.meta ? ` (${i.meta})` : ""}`),
    "",
    subtotal > 0 ? `Indicative total: ${formatAmount(subtotal, currency)} per person` : null,
    "",
    "Could you help me compare these and check availability?",
  ]
    .filter((l) => l !== null)
    .join("\n");

  return (
    <>
      <button
        className="wish-fab"
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
        aria-label={`My shortlist — ${list.length} trip${list.length !== 1 ? "s" : ""} saved`}
      >
        <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
          <path d="M12 20.5l-1.4-1.27C5.6 14.7 2.5 11.9 2.5 8.5A4.5 4.5 0 0112 5.9a4.5 4.5 0 019.5 2.6c0 3.4-3.1 6.2-8.1 10.73L12 20.5z" />
        </svg>
        <span className="wish-fab-count">{list.length}</span>
      </button>

      {open && <div className="wish-scrim" onClick={() => setOpen(false)} aria-hidden="true" />}

      <aside className={`wish-panel${open ? " open" : ""}`} aria-hidden={!open} aria-label="Saved trips">
        <header className="wish-panel-head">
          <div>
            <div className="eyebrow">Your shortlist</div>
            <h4>
              {list.length} trip{list.length !== 1 ? "s" : ""} saved
            </h4>
          </div>
          <button className="wish-close" onClick={() => setOpen(false)} aria-label="Close shortlist">
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path d="M2 2l10 10M12 2L2 12" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
            </svg>
          </button>
        </header>

        <ul className="wish-list">
          {list.map((i) => (
            <li key={i.title} className="wish-row">
              <span className="wish-thumb" style={{ backgroundImage: `url(${i.img})` }} aria-hidden="true" />
              <span className="wish-row-body">
                <span className="wish-row-title">{i.title}</span>
                <span className="wish-row-meta">{i.meta}</span>
                <span className="wish-row-price">{displayPrice(i.price, currency)}</span>
              </span>
              <button
                className="wish-remove"
                onClick={() =>
                  list.length === 1 ? emptyAndClose(() => removeWish(i.title)) : removeWish(i.title)
                }
                aria-label={`Remove ${i.title}`}
              >
                <svg width="12" height="12" viewBox="0 0 14 14" fill="none">
                  <path d="M2 2l10 10M12 2L2 12" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
                </svg>
              </button>
            </li>
          ))}
        </ul>

        <footer className="wish-foot">
          {subtotal > 0 && (
            <div className="wish-total">
              <span>Indicative total · per person</span>
              <strong>{formatAmount(subtotal, currency)}</strong>
            </div>
          )}
          {quoteOnly > 0 && (
            <p className="wish-quote-note">
              {quoteOnly} item{quoteOnly !== 1 ? "s" : ""} priced on request — not counted above.
            </p>
          )}
          <a
            className="wish-send"
            href={`https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(waMsg)}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            Send my shortlist on WhatsApp
          </a>
          <button className="wish-clear" onClick={() => emptyAndClose(clearWishlist)}>
            Clear all
          </button>
        </footer>
      </aside>
    </>
  );
}
