import { WHY } from "@/lib/data";

export default function Why() {
  return (
    <section id="why">
      <div className="container">
        <div className="section-head reveal">
          <div>
            <div className="eyebrow">05 · Why Avinterra</div>
            <h2>
              Six reasons our <em>guests come back</em> with their friends.
            </h2>
          </div>
          <p>
            We&rsquo;re not a marketplace. We&rsquo;re a small expedition house
            and every trip is signed off by a human who&rsquo;s been there.
          </p>
        </div>

        <div className="why-grid reveal">
          {WHY.map((w) => (
            <div className="why-cell" key={w.n}>
              <div className="ico">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                  <path
                    d={w.icon}
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
              <div className="num">{w.n}</div>
              <h4>{w.t}</h4>
              <p>{w.d}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
