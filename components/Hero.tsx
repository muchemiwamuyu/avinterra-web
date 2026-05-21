"use client";

import { useRef, useEffect } from "react";
import Link from "next/link";
import { PHOTOS } from "@/lib/data";
import { ElephantIcon, GiraffeIcon, BirdFlock } from "@/components/AnimalIcons";

const CARDS = [
  { cls: "card-a", img: PHOTOS.balloons, meta: "CAPPADOCIA",      title: "Dawn over Göreme" },
  { cls: "card-b", img: PHOTOS.safari,   meta: "MAASAI MARA · KE", title: "The Great Migration" },
  { cls: "card-c", img: PHOTOS.diani,    meta: "DIANI · KE",       title: "White sand coast" },
  { cls: "card-d", img: PHOTOS.fuji,     meta: "JAPAN",             title: "Fuji & cherry" },
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
      <div className="float-label fl-3"><span className="dot g" />DIANI · 04°S</div>
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
            <Link href="/contact" className="btn" style={{ borderColor: "transparent", paddingLeft: 8 }}>
              <span style={{ width: 6, height: 6, background: "#25D366", borderRadius: 99, boxShadow: "0 0 10px #25D366", display: "inline-block" }} />
              Talk to us
            </Link>
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

      {/* Stats */}
      <div className="hero-stats">
        {[
          { num: "10", unit: "+",  label: "Years of expertise" },
          { num: "2K", unit: "+",  label: "Destinations served" },
          { num: "10K",unit: "+",  label: "Happy travellers" },
          { num: "4.8",unit: "★",  label: "Overall rating" },
        ].map(({ num, unit, label }) => (
          <div className="stat" key={label}>
            <div className="stat-num">{num}<span className="unit">{unit}</span></div>
            <div className="stat-label">{label}</div>
          </div>
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
