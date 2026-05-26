"use client";

import { useRef, useEffect } from "react";

const DEG = Math.PI / 180;

// Simplified continent polygons — [longitude, latitude] per vertex
const LAND: [number, number][][] = [
  // Africa
  [
    [-6,35],[5,37],[15,37],[25,36],[30,32],[37,24],[44,12],
    [44,8],[42,2],[41,-2],[40,-10],[38,-15],[36,-18],[34,-26],
    [28,-33],[18,-34],[15,-35],[10,-34],[0,-28],[-7,-15],
    [-17,-10],[-17,0],[-16,14],[-17,20],[-15,25],[-13,28],[-6,35],
  ],
  // Europe
  [
    [-9,37],[-9,43],[0,43],[10,43],[15,44],[20,44],[28,42],[37,36],
    [33,42],[28,46],[30,50],[22,52],[25,55],[20,60],[10,58],[5,58],
    [0,60],[-5,58],[-8,52],[-10,44],[-9,37],
  ],
  // Asia (simplified monolith)
  [
    [26,38],[37,36],[44,12],[56,24],[60,22],[65,22],[68,24],
    [74,32],[80,28],[90,22],[100,20],[108,18],[115,22],[120,28],
    [122,32],[130,32],[132,36],[135,38],[140,40],[142,48],
    [138,55],[128,58],[110,55],[90,52],[80,48],[65,45],[56,38],
    [44,42],[36,43],[26,38],
  ],
  // North America
  [
    [-165,68],[-130,72],[-85,78],[-80,68],[-65,55],[-55,47],
    [-67,44],[-75,35],[-80,25],[-88,15],[-78,8],[-84,10],
    [-90,20],[-104,20],[-110,22],[-117,32],[-124,48],
    [-135,58],[-148,60],[-157,62],[-165,68],
  ],
  // South America
  [
    [-80,10],[-68,12],[-62,12],[-50,5],[-35,-5],[-35,-15],
    [-38,-30],[-52,-55],[-68,-55],[-73,-45],
    [-75,-35],[-75,-15],[-80,-5],[-80,10],
  ],
  // Australia
  [
    [114,-22],[122,-20],[130,-12],[136,-12],[140,-18],
    [148,-20],[152,-25],[152,-35],[148,-38],
    [138,-36],[130,-33],[117,-35],[114,-22],
  ],
  // Greenland
  [
    [-70,83],[-30,83],[-18,76],[-18,70],
    [-32,62],[-52,60],[-64,66],[-70,76],[-70,83],
  ],
  // Madagascar
  [
    [44,-13],[46,-16],[48,-18],[50,-22],[50,-25],
    [48,-26],[44,-25],[43,-22],[43,-18],[44,-13],
  ],
  // Japan (rough)
  [
    [130,32],[132,34],[134,35],[136,37],[140,40],
    [142,44],[143,43],[143,40],[140,38],[136,35],[132,34],[130,32],
  ],
  // UK/Ireland (rough)
  [[-8,52],[-5,55],[0,58],[2,52],[-2,50],[-5,50],[-8,52]],
];

const DESTINATIONS = [
  { name: "Nairobi",      lat:  -1.3, lon:  36.8 },
  { name: "Maasai Mara",  lat:  -1.5, lon:  35.1 },
  { name: "Diani",        lat:  -4.3, lon:  39.6 },
  { name: "Zanzibar",     lat:  -6.1, lon:  39.2 },
  { name: "South Africa", lat: -33.9, lon:  18.4 },
  { name: "Dubai",        lat:  25.2, lon:  55.3 },
  { name: "Greece",       lat:  37.4, lon:  25.3 },
  { name: "Japan",        lat:  35.7, lon: 139.7 },
];

function project(lat: number, lon: number, rot: number, R: number) {
  const phi = lat * DEG;
  const lam = lon * DEG + rot;
  const c = Math.cos(phi);
  return {
    x: c * Math.sin(lam) * R,
    y: -Math.sin(phi) * R,
    z: c * Math.cos(lam),
  };
}

export default function DestinationsGlobe() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const rotRef    = useRef(-36 * DEG); // start with East Africa centered
  const pausedRef = useRef(false);
  const rafRef    = useRef(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let dpr = 1;

    const setup = () => {
      dpr = window.devicePixelRatio || 1;
      const parent = canvas.parentElement;
      if (!parent) return;
      const size = parent.clientWidth || 400;
      canvas.width  = Math.round(size * dpr);
      canvas.height = Math.round(size * dpr);
      canvas.style.width  = size + "px";
      canvas.style.height = size + "px";
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    setup();
    const ro = new ResizeObserver(setup);
    if (canvas.parentElement) ro.observe(canvas.parentElement);

    const onEnter = () => { pausedRef.current = true; };
    const onLeave = () => { pausedRef.current = false; };
    canvas.addEventListener("mouseenter", onEnter);
    canvas.addEventListener("mouseleave", onLeave);

    const draw = () => {
      const W  = canvas.width / dpr;
      const H  = canvas.height / dpr;
      const cx = W / 2;
      const cy = H / 2;
      const R  = Math.min(W, H) * 0.46;
      const rot = rotRef.current;

      ctx.clearRect(0, 0, W, H);

      // ── Ocean sphere ──────────────────────────────────────────────
      const og = ctx.createRadialGradient(
        cx - R * 0.28, cy - R * 0.28, R * 0.04,
        cx, cy, R,
      );
      og.addColorStop(0,    "#17304a");
      og.addColorStop(0.45, "#0e1e30");
      og.addColorStop(1,    "#060e18");
      ctx.beginPath();
      ctx.arc(cx, cy, R, 0, Math.PI * 2);
      ctx.fillStyle = og;
      ctx.fill();

      // ── Clip everything to the globe circle ───────────────────────
      ctx.save();
      ctx.beginPath();
      ctx.arc(cx, cy, R, 0, Math.PI * 2);
      ctx.clip();

      // ── Grid lines ───────────────────────────────────────────────
      ctx.lineWidth     = 0.4;
      ctx.strokeStyle   = "rgba(100,160,220,0.10)";

      // Latitude parallels every 30°
      for (let lt = -60; lt <= 60; lt += 30) {
        ctx.beginPath();
        let first = true;
        for (let ln = -180; ln <= 180; ln += 3) {
          const p = project(lt, ln, rot, R);
          if (p.z < 0) { first = true; continue; }
          first
            ? ctx.moveTo(cx + p.x, cy + p.y)
            : ctx.lineTo(cx + p.x, cy + p.y);
          first = false;
        }
        ctx.stroke();
      }
      // Meridians every 30°
      for (let ln = 0; ln < 360; ln += 30) {
        ctx.beginPath();
        let first = true;
        for (let lt = -88; lt <= 88; lt += 3) {
          const p = project(lt, ln, rot, R);
          if (p.z < 0) { first = true; continue; }
          first
            ? ctx.moveTo(cx + p.x, cy + p.y)
            : ctx.lineTo(cx + p.x, cy + p.y);
          first = false;
        }
        ctx.stroke();
      }

      // ── Continent fills ───────────────────────────────────────────
      LAND.forEach((poly) => {
        ctx.beginPath();
        let penDown = false;
        for (const [ln, lt] of poly) {
          const p = project(lt, ln, rot, R);
          if (p.z < 0) { penDown = false; continue; }
          penDown
            ? ctx.lineTo(cx + p.x, cy + p.y)
            : ctx.moveTo(cx + p.x, cy + p.y);
          penDown = true;
        }
        ctx.fillStyle   = "rgba(48,122,68,0.34)";
        ctx.fill();
        ctx.strokeStyle = "rgba(85,185,105,0.55)";
        ctx.lineWidth   = 0.7;
        ctx.stroke();
      });

      ctx.restore();

      // ── Atmospheric glow (outside clip) ───────────────────────────
      const ag = ctx.createRadialGradient(cx, cy, R * 0.90, cx, cy, R * 1.14);
      ag.addColorStop(0,   "rgba(30,100,200,0)");
      ag.addColorStop(0.4, "rgba(30,100,200,0.07)");
      ag.addColorStop(1,   "rgba(30,100,200,0.22)");
      ctx.beginPath();
      ctx.arc(cx, cy, R * 1.14, 0, Math.PI * 2);
      ctx.fillStyle = ag;
      ctx.fill();

      // ── Limb darkening vignette ───────────────────────────────────
      const vg = ctx.createRadialGradient(cx, cy, R * 0.60, cx, cy, R);
      vg.addColorStop(0, "transparent");
      vg.addColorStop(1, "rgba(0,0,0,0.58)");
      ctx.beginPath();
      ctx.arc(cx, cy, R, 0, Math.PI * 2);
      ctx.fillStyle = vg;
      ctx.fill();

      // ── Specular highlight (top-left) ─────────────────────────────
      ctx.save();
      ctx.beginPath();
      ctx.arc(cx, cy, R, 0, Math.PI * 2);
      ctx.clip();
      const sg = ctx.createRadialGradient(
        cx - R * 0.38, cy - R * 0.38, 0,
        cx - R * 0.20, cy - R * 0.20, R * 0.68,
      );
      sg.addColorStop(0, "rgba(255,255,255,0.10)");
      sg.addColorStop(1, "rgba(255,255,255,0)");
      ctx.fillStyle = sg;
      ctx.fillRect(cx - R, cy - R, R * 2, R * 2);
      ctx.restore();

      // ── Destination dots ──────────────────────────────────────────
      DESTINATIONS.forEach(({ lat, lon }, i) => {
        const p = project(lat, lon, rot, R);
        if (p.z < 0.06) return;

        const dx    = cx + p.x;
        const dy    = cy + p.y;
        const alpha = Math.min(1, (p.z - 0.06) * 5);

        // Soft ambient glow
        const gg = ctx.createRadialGradient(dx, dy, 0, dx, dy, 20);
        gg.addColorStop(0, `rgba(232,92,43,${0.5 * alpha})`);
        gg.addColorStop(1, "rgba(232,92,43,0)");
        ctx.beginPath();
        ctx.arc(dx, dy, 20, 0, Math.PI * 2);
        ctx.fillStyle = gg;
        ctx.fill();

        // Expanding pulse ring (staggered phase per dot)
        const phase = (rotRef.current * 1.6 + i * 1.15) % (Math.PI * 2);
        const pulse = (1 - Math.cos(phase)) * 0.5; // 0→1
        ctx.beginPath();
        ctx.arc(dx, dy, 4 + pulse * 14, 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(232,92,43,${0.7 * (1 - pulse) * alpha})`;
        ctx.lineWidth   = 1.4;
        ctx.stroke();

        // Core dot — amber
        ctx.beginPath();
        ctx.arc(dx, dy, 4, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(243,166,74,${alpha})`;
        ctx.fill();

        // Hot centre — near-white
        ctx.beginPath();
        ctx.arc(dx, dy, 1.8, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255,240,200,${alpha})`;
        ctx.fill();
      });

      // ── Outer border ring ─────────────────────────────────────────
      ctx.beginPath();
      ctx.arc(cx, cy, R, 0, Math.PI * 2);
      ctx.strokeStyle = "rgba(80,150,220,0.20)";
      ctx.lineWidth   = 1;
      ctx.stroke();
    };

    // 0.0008 rad/frame @ 60fps ≈ one full rotation every ~130 s
    const SPEED = 0.0008;

    const loop = () => {
      if (!pausedRef.current) rotRef.current -= SPEED;
      draw();
      rafRef.current = requestAnimationFrame(loop);
    };

    rafRef.current = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(rafRef.current);
      ro.disconnect();
      canvas.removeEventListener("mouseenter", onEnter);
      canvas.removeEventListener("mouseleave", onLeave);
    };
  }, []);

  return (
    <section id="reach" className="globe-section">
      <div className="container globe-container">
        <div className="globe-copy reveal">
          <div className="eyebrow">06 · Our reach</div>
          <h2>
            One expedition house, <em>a whole spinning world</em> of
            destinations.
          </h2>
          <p>
            From the Mara&rsquo;s plains to the lights of Dubai and the temples
            of Kyoto — every glowing point is a trip we have planned, walked and
            signed off in person.
          </p>
          <div className="globe-legend">
            <span className="globe-legend-dot" />
            Live destination · {DESTINATIONS.length} regions
          </div>
        </div>

        <div className="globe-stage reveal">
          <canvas ref={canvasRef} className="globe-canvas" />
        </div>
      </div>
    </section>
  );
}
