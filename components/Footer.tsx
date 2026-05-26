import Link from "next/link";

export default function Footer() {
  return (
    <footer className="foot">
      <div className="container">
        <div className="foot-top">
          {/* Brand */}
          <div>
            <div className="brand">
              <img
                src="/logo.svg"
                alt="Avinterra Expeditions"
                className="brand-logo"
                height={96}
                style={{ height: 96, width: "auto", maxWidth: "none", flexShrink: 0 }}
              />
            </div>
            <div className="foot-brand">Expeditions Limited.</div>
            <p className="foot-tag">
              Cinematic safaris, coastal escapes, and international getaways —
              engineered for the story.
            </p>
          </div>

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
            <div className="foot-news">
              <input type="email" placeholder="your@email.com" aria-label="Newsletter email" />
              <button aria-label="Subscribe">
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                  <path d="M1 6H11M11 6L7 2M11 6L7 10" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
                </svg>
              </button>
            </div>
          </div>
        </div>

        <div className="foot-bottom">
          <div>© 2026 Avinterra Expeditions Limited · Nairobi, Kenya</div>
          <div className="foot-socials">
            <a href="#" aria-label="Instagram">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none"><rect x="3" y="3" width="18" height="18" rx="5" stroke="currentColor" strokeWidth="1.5"/><circle cx="12" cy="12" r="4" stroke="currentColor" strokeWidth="1.5"/><circle cx="17.5" cy="6.5" r="1" fill="currentColor"/></svg>
            </a>
            <a href="#" aria-label="Facebook">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none"><path d="M14 9V7a1 1 0 011-1h2V3h-3a4 4 0 00-4 4v2H8v3h2v9h3v-9h2.5l.5-3H13z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round"/></svg>
            </a>
            <a href="#" aria-label="TikTok">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M19.6 8.5a6.4 6.4 0 01-3.8-1.2v8.6a5.6 5.6 0 11-5.6-5.6c.3 0 .6 0 .9.1v3a2.7 2.7 0 102 2.6V2h3a3.4 3.4 0 003.4 3.4v3z"/></svg>
            </a>
            <a href="#" aria-label="YouTube">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none"><rect x="2" y="5" width="20" height="14" rx="3" stroke="currentColor" strokeWidth="1.5"/><path d="M10 9l5 3-5 3V9z" fill="currentColor"/></svg>
            </a>
            <a href="#" aria-label="X / Twitter">
              <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor"><path d="M17 3h3l-7 8 8 10h-6l-5-6-5 6H2l7-9L2 3h6l4 5 5-5z"/></svg>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
