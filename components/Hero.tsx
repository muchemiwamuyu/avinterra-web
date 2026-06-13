"use client";

import { useRef, useEffect } from "react";
import Link from "next/link";
import { PHOTOS } from "@/lib/data";
import { ElephantIcon, GiraffeIcon, BirdFlock } from "@/components/AnimalIcons";

const HERO_BG = [PHOTOS.safari, PHOTOS.mara, PHOTOS.pkgMasaiMara, PHOTOS.fuji];

const CARDS = [
  { cls: "card-a", img: PHOTOS.balloons,    meta: "CAPPADOCIA",       title: "Dawn over Göreme" },
  { cls: "card-b", img: PHOTOS.safari,      meta: "MAASAI MARA · KE", title: "The Great Migration" },
  { cls: "card-c", img: PHOTOS.amboseli,    meta: "AMBOSELI · KE",    title: "Giants at Kilimanjaro" },
  { cls: "card-d", img: PHOTOS.fuji,        meta: "JAPAN",             title: "Fuji & cherry" },
];

export default function Hero() {
  const stageRef = useRef<HTMLDivElement>(null);
  const innerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const stage = stageRef.current;
    const inner = innerRef.current;
    if (!stage || !inner) return;

    let raf: number;
    const onMove = (e: MouseEvent) => {
      const rect = stage.getBoundingClientRect();
      const dx = (e.clientX - (rect.left + rect.width  / 2)) / rect.width;
      const dy = (e.clientY - (rect.top  + rect.height / 2)) / rect.height;
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        inner.style.transform = `rotateY(${dx * 8}deg) rotateX(${-dy * 6}deg)`;
      });
    };
    const onLeave = () => { inner.style.transform = "rotateY(0) rotateX(0)"; };

    window.addEventListener("mousemove", onMove);
    stage.addEventListener("mouseleave", onLeave);
    return () => {
      window.removeEventListener("mousemove", onMove);
      stage.removeEventListener("mouseleave", onLeave);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <section id="home" className="hero">
      <div className="hero-bg-reel" aria-hidden="true">
        {HERO_BG.map((src, i) => (
          <div key={i} className="hero-slide" style={{ backgroundImage: `url(${src})` }} />
        ))}
      </div>
      <div className="hero-grid" />
      <div className="hero-halo" />
      <div className="globe-wrap"><div className="globe" /></div>

      {/* Ghost wildlife decorations — barely-visible depth, non-interactive */}
      <ElephantIcon className="hero-animal hero-elephant" aria-hidden="true" />
      <BirdFlock className="hero-animal hero-birds" aria-hidden="true" />
      <GiraffeIcon className="hero-animal hero-giraffe" aria-hidden="true" />

      <div className="xhair" style={{ top: "18%", left: "44%" }} />
      <div className="xhair" style={{ top: "70%", left: "32%" }} />
      <div className="xhair" style={{ top: "30%", right: "30%" }} />

      <div className="float-label fl-1"><span className="dot" />MAASAI MARA · 04°S</div>
      <div className="float-label fl-2"><span className="dot t" />MYKONOS · 37°N</div>
      <div className="float-label fl-3"><span className="dot g" />AMBOSELI · 02°S</div>
      <div className="float-label fl-4"><span className="dot t" />MT FUJI · 35°N</div>

      <div className="hero-inner">
        {/* Copy */}
        <div className="hero-copy">
          <div className="hero-tag">
            <span className="hero-tag-chip">NEW</span>
            <span>Greece 8d/7n package · from USD 2,269</span>
          </div>
          <h1>
            Explore Kenya <br />
            and the world,<br />
            <em>one expedition</em> at a time.
          </h1>
          <p className="hero-sub">
            Avinterra Expeditions crafts cinematic safaris, coastal escapes and
            international getaways for curious travellers. From Maasai Mara to
            Mykonos — life is short, book the trip.
          </p>
          <div className="hero-cta-row">
            <Link href="/packages" className="btn btn-primary">
              View packages
              <span className="btn-arrow">
                <svg width="10" height="10" viewBox="0 0 10 10" fill="none"><path d="M1 5H9M9 5L5 1M9 5L5 9" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" /></svg>
              </span>
            </Link>
            <Link href="/contact" className="btn">
              Book a tour
              <span className="btn-arrow">
                <svg width="10" height="10" viewBox="0 0 10 10" fill="none"><path d="M1 5H9M9 5L5 1M9 5L5 9" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" /></svg>
              </span>
            </Link>
            <a
              href="https://wa.me/254141920923"
              className="btn"
              target="_blank"
              rel="noopener noreferrer"
              style={{ borderColor: "transparent", paddingLeft: 8 }}
            >
              <span style={{ width: 6, height: 6, background: "#25D366", borderRadius: 99, boxShadow: "0 0 10px #25D366", display: "inline-block" }} />
              Talk to us
            </a>
          </div>
        </div>

        {/* 3D card stack */}
        <div className="stage" ref={stageRef}>
          <div className="stage-inner" ref={innerRef}>
            {CARDS.map(({ cls, img, meta, title }) => (
              <div
                key={cls}
                className={`card-3d ${cls}`}
                style={{ backgroundImage: `url(${img})` }}
              >
                <div className="card-label">
                  <div>
                    <div className="card-label-meta">{meta}</div>
                    <div className="card-label-title">{title}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Signature Journeys strip */}
      <div className="hero-journeys">
        {[
          { img: PHOTOS.pkgMasaiMara, country: "KE", tag: "3 DAYS · SAFARI",  label: "Maasai Mara",   price: "from KSH 18,500" },
          { img: PHOTOS.beach,  country: "KE", tag: "4 DAYS · COAST",      label: "Diani Beach",   price: "from KSH 24,900" },
          { img: PHOTOS.greece, country: "GR", tag: "8 DAYS · ISLANDS",    label: "Greek Islands", price: "from USD 2,269"  },
          { img: PHOTOS.fuji,   country: "JP", tag: "10 DAYS · CULTURE",   label: "Japan",         price: "from USD 3,150"  },
        ].map(({ img, country, tag, label, price }) => (
          <Link href="/packages" key={label} className="hero-jcard">
            <div className="hero-jcard-bg" style={{ backgroundImage: `url(${img})` }} />
            <div className="hero-jcard-body">
              <span className="hero-jcard-country">{country}</span>
              <div className="hero-jcard-tag">{tag}</div>
              <div className="hero-jcard-label">{label}</div>
              <div className="hero-jcard-price">{price}</div>
            </div>
            <div className="hero-jcard-arrow">
              <svg width="11" height="11" viewBox="0 0 11 11" fill="none">
                <path d="M1 10L10 1M10 1H3M10 1V8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
              </svg>
            </div>
          </Link>
        ))}
      </div>

      <div className="scroll-cue">
        <div className="scroll-cue-bar" />
        SCROLL TO EXPLORE
      </div>
      <div className="scroll-cue-page">01 / 09</div>
    </section>
  );
}
