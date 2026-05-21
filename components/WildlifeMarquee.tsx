/**
 * WildlifeMarquee — an infinite strip of animal silhouettes alternating
 * with destination names. Slower (30s) than the text Marquee for a more
 * majestic feel. Decorative only — hidden from assistive tech.
 */
import type { ReactNode } from "react";
import {
  ElephantIcon,
  GiraffeIcon,
  LionIcon,
  BirdIcon,
} from "@/components/AnimalIcons";

interface MarqueeUnit {
  icon: ReactNode;
  place: string;
}

const UNITS: MarqueeUnit[] = [
  { icon: <ElephantIcon className="animal-icon" />, place: "MAASAI MARA" },
  { icon: <GiraffeIcon className="animal-icon animal-icon-tall" />, place: "AMBOSELI" },
  { icon: <LionIcon className="animal-icon" />, place: "TSAVO" },
  { icon: <BirdIcon className="animal-icon animal-icon-wide" />, place: "DIANI" },
  { icon: <ElephantIcon className="animal-icon" />, place: "ZANZIBAR" },
  { icon: <GiraffeIcon className="animal-icon animal-icon-tall" />, place: "MT KENYA" },
  { icon: <LionIcon className="animal-icon" />, place: "NAIROBI" },
  { icon: <BirdIcon className="animal-icon animal-icon-wide" />, place: "KILIFI" },
];

export default function WildlifeMarquee() {
  // Duplicate the set so the -50% keyframe produces a seamless loop.
  const row = [...UNITS, ...UNITS];

  return (
    <div className="wildlife-marquee" aria-hidden="true">
      <div className="wildlife-track">
        {row.map((unit, i) => (
          <div className="wildlife-unit" key={i}>
            <span className="wildlife-ico">{unit.icon}</span>
            <span className="wildlife-place">{unit.place}</span>
            <span className="wildlife-sep" />
          </div>
        ))}
      </div>
    </div>
  );
}
