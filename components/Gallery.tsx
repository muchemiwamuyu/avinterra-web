import { GALLERY } from "@/lib/data";

export default function Gallery() {
  return (
    <section id="gallery">
      <div className="container">
        <div className="section-head reveal">
          <div>
            <div className="eyebrow">07 · Gallery</div>
            <h2>
              Frames from the <em>field.</em>
            </h2>
          </div>
          <p>Shot by our guides and guests. Hover to see where.</p>
        </div>

        <div className="gallery-grid reveal">
          {GALLERY.map((g, i) => (
            <div
              key={i}
              className={`g-tile ${g.cls}`}
              style={{ backgroundImage: `url(${g.src})` }}
            >
              <div className="g-tile-cap">{g.cap}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
