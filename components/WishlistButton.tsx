"use client";

import { toggleWish, useWishlist, type WishItem } from "@/lib/useWishlist";

/** Heart toggle rendered on package / destination cards. */
export default function WishlistButton({
  item,
  className,
}: {
  item: WishItem;
  className?: string;
}) {
  const list = useWishlist();
  const saved = list.some((i) => i.title === item.title);

  return (
    <button
      type="button"
      className={`wish-btn${saved ? " saved" : ""}${className ? ` ${className}` : ""}`}
      aria-pressed={saved}
      aria-label={saved ? `Remove ${item.title} from shortlist` : `Save ${item.title} to shortlist`}
      title={saved ? "Saved to your shortlist" : "Save to your shortlist"}
      onClick={(e) => {
        e.stopPropagation();
        e.preventDefault();
        toggleWish(item);
      }}
    >
      <svg width="16" height="16" viewBox="0 0 24 24" fill={saved ? "currentColor" : "none"} aria-hidden="true">
        <path
          d="M12 20.5l-1.4-1.27C5.6 14.7 2.5 11.9 2.5 8.5A4.5 4.5 0 0112 5.9a4.5 4.5 0 019.5 2.6c0 3.4-3.1 6.2-8.1 10.73L12 20.5z"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinejoin="round"
        />
      </svg>
    </button>
  );
}
