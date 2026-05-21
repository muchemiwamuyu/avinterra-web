/**
 * DestinationsGlobe — a pure-CSS rotating "globe" of destination dots.
 *
 * No JS: rotation, pulse and hover-pause all live in globals.css.
 * The dots are positioned by `left`/`top` percentages within a circle.
 */

interface GlobeDot {
  name: string;
  left: string;
  top: string;
}

const GLOBE_DOTS: GlobeDot[] = [
  { name: "Nairobi",      left: "52%", top: "54%" },
  { name: "Maasai Mara",  left: "51%", top: "55%" },
  { name: "Diani",        left: "52%", top: "58%" },
  { name: "Dubai",        left: "60%", top: "44%" },
  { name: "Greece",       left: "47%", top: "38%" },
  { name: "Japan",        left: "75%", top: "38%" },
  { name: "Zanzibar",     left: "53%", top: "59%" },
  { name: "South Africa", left: "51%", top: "65%" },
];

export default function DestinationsGlobe() {
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
            Live destination · {GLOBE_DOTS.length} regions
          </div>
        </div>

        <div className="globe-stage reveal">
          <div className="globe-3d">
            {/* Latitude rings */}
            <span className="globe-lat globe-lat-1" />
            <span className="globe-lat globe-lat-2" />
            <span className="globe-lat globe-lat-3" />
            {/* Longitude rings */}
            <span className="globe-lng globe-lng-1" />
            <span className="globe-lng globe-lng-2" />
            <span className="globe-lng globe-lng-3" />
            {/* Surface sheen */}
            <span className="globe-sheen" />

            {/* Destination dots */}
            {GLOBE_DOTS.map((dot) => (
              <span
                key={dot.name}
                className="globe-dot"
                style={{ left: dot.left, top: dot.top }}
                data-name={dot.name}
              >
                <span className="globe-dot-pulse" />
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
