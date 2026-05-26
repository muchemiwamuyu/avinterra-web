"use client";

import { useSyncExternalStore, useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const NAV_ITEMS: [string, string][] = [
  ["Home", "/"],
  ["Destinations", "/destinations"],
  ["Packages", "/packages"],
  ["Why us", "/why"],
  ["Gallery", "/gallery"],
  ["Contact", "/contact"],
];

type Theme = "dark" | "light";
const THEME_EVENT = "av-theme-change";

function subscribeTheme(onChange: () => void): () => void {
  window.addEventListener(THEME_EVENT, onChange);
  return () => window.removeEventListener(THEME_EVENT, onChange);
}
function getThemeSnapshot(): Theme {
  return document.documentElement.getAttribute("data-theme") === "light" ? "light" : "dark";
}
function getServerThemeSnapshot(): Theme { return "dark"; }

export default function Nav() {
  const pathname = usePathname();
  const theme = useSyncExternalStore(subscribeTheme, getThemeSnapshot, getServerThemeSnapshot);
  const [menuOpen, setMenuOpen] = useState(false);

  // Close mobile menu on route change
  useEffect(() => { setMenuOpen(false); }, [pathname]);

  // Prevent body scroll when menu open
  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen]);

  const toggleTheme = () => {
    const next: Theme = theme === "dark" ? "light" : "dark";
    document.documentElement.setAttribute("data-theme", next);
    localStorage.setItem("av-theme", next);
    window.dispatchEvent(new Event(THEME_EVENT));
  };

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <>
      <nav className="nav">
        <div className="nav-inner">
          <Link href="/" className="brand">
            <img
              src="/logo.svg"
              alt="Avinterra Expeditions"
              className="brand-logo"
              height={80}
              style={{ height: 80, width: "auto", maxWidth: "none", flexShrink: 0 }}
            />
          </Link>

          {/* Desktop links */}
          <div className="nav-links">
            {NAV_ITEMS.map(([label, href]) => (
              <Link key={href} href={href} className={`nav-link${isActive(href) ? " active" : ""}`}>
                {label}
              </Link>
            ))}
          </div>

          {/* Right controls */}
          <div className="nav-right">
            <button
              className="theme-toggle"
              onClick={toggleTheme}
              aria-label={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
            >
              {theme === "dark" ? (
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none">
                  <circle cx="12" cy="12" r="5" stroke="currentColor" strokeWidth="1.5" />
                  <path d="M12 2v2M12 20v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M2 12h2M20 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                </svg>
              ) : (
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                  <path d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              )}
            </button>

            <Link href="/contact" className="nav-cta">
              Book a tour
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                <path d="M2 10L10 2M10 2H4M10 2V8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
              </svg>
            </Link>

            {/* Hamburger — mobile only */}
            <button
              className="nav-hamburger"
              onClick={() => setMenuOpen((o) => !o)}
              aria-label={menuOpen ? "Close menu" : "Open menu"}
              aria-expanded={menuOpen}
            >
              <span className={`ham-bar${menuOpen ? " open" : ""}`} />
              <span className={`ham-bar${menuOpen ? " open" : ""}`} />
              <span className={`ham-bar${menuOpen ? " open" : ""}`} />
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile full-screen menu */}
      <div className={`nav-mobile${menuOpen ? " open" : ""}`} aria-hidden={!menuOpen}>
        <nav className="nav-mobile-inner">
          {NAV_ITEMS.map(([label, href]) => (
            <Link
              key={href}
              href={href}
              className={`nav-mobile-link${isActive(href) ? " active" : ""}`}
              onClick={() => setMenuOpen(false)}
            >
              {label}
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M3 13L13 3M13 3H5M13 3V11" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
              </svg>
            </Link>
          ))}
          <Link href="/contact" className="nav-mobile-cta" onClick={() => setMenuOpen(false)}>
            Book a tour ↗
          </Link>
        </nav>
      </div>
    </>
  );
}
