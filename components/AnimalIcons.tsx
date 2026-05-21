/**
 * Shared inline-SVG animal silhouettes.
 *
 * Single source of truth so the WildlifeMarquee strip and the Hero
 * ghost decorations stay visually consistent. All paths use
 * `fill="currentColor"` so callers control colour via CSS `color`.
 */
import type { SVGProps } from "react";

type IconProps = SVGProps<SVGSVGElement>;

/** Elephant — trunk-up silhouette. viewBox 0 0 100 70 */
export function ElephantIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 100 70" xmlns="http://www.w3.org/2000/svg" {...props}>
      <path
        fill="currentColor"
        d="M14 56c-2-12 1-23 12-29 2-9 9-15 18-15 4 0 8 1 11 4 4-4 11-5 16-2 8-3 17 1 20 9 6 1 9 7 7 13 3 4 3 9-1 12-1 5-6 8-11 7l-1-7c3-1 4-4 2-6-3 6-9 9-15 8l-2-8c-1 7-7 11-14 11H32c-10 0-17-2-18-7Zm22-37c-7 5-10 14-8 22"
      />
      {/* tusk + eye accents */}
      <path
        fill="currentColor"
        d="M30 54c-3 3-3 8 0 11l3-2c-2-2-2-5 0-7l-3-2Z"
      />
      <circle cx="58" cy="26" r="2.4" fill="currentColor" />
    </svg>
  );
}

/** Giraffe — long-necked standing silhouette. viewBox 0 0 60 100 */
export function GiraffeIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 60 100" xmlns="http://www.w3.org/2000/svg" {...props}>
      <path
        fill="currentColor"
        d="M22 96V64c-6-5-9-13-8-22-5-6-7-15-3-23 2-5 7-9 12-9 1-3 2-6 4-7l3 2c-1 1-2 3-2 5 4 1 8 5 9 10 1 8-2 16-5 23 3 9 2 19 0 26v32h-5V66h-4v30h-1Zm6-78 4-7 3 2-4 7-3-2Zm5 9 7-4 2 3-7 4-2-3Z"
      />
    </svg>
  );
}

/** Lion — maned head over a compact body. viewBox 0 0 80 80 */
export function LionIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 80 80" xmlns="http://www.w3.org/2000/svg" {...props}>
      {/* mane — ring of rounded tufts */}
      <path
        fill="currentColor"
        d="M40 6c4 0 7 2 9 5 4-2 9-1 11 3 5 0 8 4 8 9 4 2 6 7 4 11 3 3 3 8 0 11-2 5-7 7-12 6 1 4 0 8-3 11H23c-3-3-4-7-3-11-5 1-10-1-12-6-3-3-3-8 0-11-2-4 0-9 4-11 0-5 3-9 8-9 2-4 7-5 11-3 2-3 5-5 9-5Z"
      />
      {/* face — lighter inset (uses overlap so face reads as a circle) */}
      <circle cx="40" cy="38" r="17" fill="currentColor" />
      {/* body */}
      <path
        fill="currentColor"
        d="M24 60h32c5 0 9 4 9 9v3h-9v-6H24v6h-9v-3c0-5 4-9 9-9Z"
      />
    </svg>
  );
}

/** Bird in flight — clean double-wing chevron. viewBox 0 0 100 50 */
export function BirdIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 100 50" xmlns="http://www.w3.org/2000/svg" {...props}>
      <path
        fill="currentColor"
        d="M50 30c-9-9-22-15-36-15 11 4 21 11 28 21 4 5 12 5 16 0 7-10 17-17 28-21-14 0-27 6-36 15Z"
      />
    </svg>
  );
}

/** Three small flying-bird "V" shapes — for ghost hero decoration. */
export function BirdFlock(props: IconProps) {
  return (
    <svg viewBox="0 0 140 70" xmlns="http://www.w3.org/2000/svg" {...props}>
      <path
        fill="none"
        stroke="currentColor"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M8 28c8-9 16-9 22 0 6-9 14-9 22 0M62 14c8-9 16-9 22 0 6-9 14-9 22 0M48 50c7-8 14-8 19 0 5-8 12-8 19 0"
      />
    </svg>
  );
}
