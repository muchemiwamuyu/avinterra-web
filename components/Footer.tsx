"use client";

import Link from "next/link";
import { useState } from "react";

export default function Footer() {
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);

  const subscribeViaWhatsApp = () => {
    const trimmed = email.trim();
    if (!trimmed) return;
    const msg = `Hi! I'd like to subscribe to the Avinterra newsletter. My email: ${trimmed}`;
    window.open(`https://wa.me/254141920923?text=${encodeURIComponent(msg)}`, "_blank", "noopener,noreferrer");
    setSent(true);
    setEmail("");
  };

  return (
    <footer className="foot">
      <div className="container">
        <div className="foot-top">
          {/* Brand */}
          <Link href="/" className="brand" style={{ marginBottom: 24, display: "inline-flex" }}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/logo.png"
              alt="Avinterra Expeditions"
              className="brand-logo"
              height={120}
              style={{ height: 120, width: "auto", maxWidth: "none", flexShrink: 0 }}
            />
          </Link>
          <p className="foot-tag">
            Cinematic safaris, coastal escapes, and international getaways —
            engineered for the story.
          </p>

          {/* Explore */}
          <div className="foot-col">
            <h5>EXPLORE</h5>
            <ul>
              {[["Home","/"],["Destinations","/destinations"],["Packages","/packages"],["Gallery","/gallery"]].map(([l,h]) => (
                <li key={l}><Link href={h}>{l}</Link></li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div className="foot-col">
            <h5>COMPANY</h5>
            <ul>
              {[["About us","/about"],["Why Avinterra","/why"],["Reviews","/gallery"],["Contact","/contact"]].map(([l,h]) => (
                <li key={l}><Link href={h}>{l}</Link></li>
              ))}
            </ul>
          </div>

          {/* Legal */}
          <div className="foot-col">
            <h5>LEGAL</h5>
            <ul>
              {[["Privacy policy","/privacy"],["Terms of service","/terms"],["Booking conditions","/refund"],["Refund policy","/refund"]].map(([l,h]) => (
                <li key={l}><Link href={h}>{l}</Link></li>
              ))}
            </ul>
          </div>

          {/* Newsletter */}
          <div className="foot-col">
            <h5>NEWSLETTER</h5>
            <p style={{ fontSize: 13, color: "var(--ink-2)", margin: "0 0 14px" }}>
              One concise email a month. New routes, seasonal pricing.
            </p>
            {sent ? (
              <p style={{ fontSize: 13, color: "var(--teal)", margin: 0 }}>
                Thanks! We&rsquo;ll add you via WhatsApp. ✓
              </p>
            ) : (
              <div className="foot-news">
                <input
                  type="email"
                  placeholder="your@email.com"
                  aria-label="Newsletter email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && subscribeViaWhatsApp()}
                />
                <button aria-label="Subscribe" onClick={subscribeViaWhatsApp}>
                  <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                    <path d="M1 6H11M11 6L7 2M11 6L7 10" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
                  </svg>
                </button>
              </div>
            )}
          </div>
        </div>

        <div className="foot-bottom">
          <div>© 2026 Avinterra Expeditions Limited · Nairobi, Kenya</div>
          <div className="foot-socials">
            <a href="https://wa.me/254141920923" target="_blank" rel="noopener noreferrer" aria-label="WhatsApp">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                <path d="M.057 24l1.687-6.163A11.867 11.867 0 010 11.93C0 5.351 5.351 0 11.93 0 18.51 0 23.86 5.351 23.86 11.93c0 6.579-5.35 11.93-11.93 11.93-2.029 0-4.017-.514-5.79-1.488L.057 24zm6.597-3.807c1.676.995 3.276 1.591 5.282 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.886a9.825 9.825 0 001.518 5.27l-.999 3.648 3.726-.97zM17.99 14.34c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.149-.173.198-.297.298-.495.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51l-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.247-.694.247-1.289.173-1.413z" />
              </svg>
            </a>
            <a href="https://www.instagram.com/avinterra/" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none"><rect x="3" y="3" width="18" height="18" rx="5" stroke="currentColor" strokeWidth="1.5"/><circle cx="12" cy="12" r="4" stroke="currentColor" strokeWidth="1.5"/><circle cx="17.5" cy="6.5" r="1" fill="currentColor"/></svg>
            </a>
            <a href="https://www.facebook.com/profile.php?id=61590465815846" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none"><path d="M14 9V7a1 1 0 011-1h2V3h-3a4 4 0 00-4 4v2H8v3h2v9h3v-9h2.5l.5-3H13z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round"/></svg>
            </a>
            <a href="https://tiktok.com/@avinterraexpeditions" target="_blank" rel="noopener noreferrer" aria-label="TikTok">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M19.6 8.5a6.4 6.4 0 01-3.8-1.2v8.6a5.6 5.6 0 11-5.6-5.6c.3 0 .6 0 .9.1v3a2.7 2.7 0 102 2.6V2h3a3.4 3.4 0 003.4 3.4v3z"/></svg>
            </a>
            <a href="https://youtube.com/@avinterraexpeditions" target="_blank" rel="noopener noreferrer" aria-label="YouTube">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none"><rect x="2" y="5" width="20" height="14" rx="3" stroke="currentColor" strokeWidth="1.5"/><path d="M10 9l5 3-5 3V9z" fill="currentColor"/></svg>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
