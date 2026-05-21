const PLACES = [
  "Maasai Mara", "Diani", "Mykonos", "Mt Fuji",
  "Zanzibar", "Dubai", "Amboseli", "Cairo",
  "Tsavo", "Santorini", "Cape Town", "Kilifi",
];

export default function Marquee() {
  const row = [...PLACES, ...PLACES];
  return (
    <div className="marquee" aria-hidden="true">
      <div className="marquee-track">
        {row.map((t, i) => (
          <span className="marquee-item" key={i}>
            {t} <span className="dot" />
          </span>
        ))}
      </div>
    </div>
  );
}
