"use client";

import { useSyncExternalStore } from "react";

export interface WishItem {
  title: string;
  meta: string;
  price: string;
  img: string;
}

const KEY = "av-wishlist";
const EVENT = "av-wishlist-change";
const EMPTY: WishItem[] = [];

// Cached parse so getSnapshot returns a referentially stable value between changes
let cachedRaw: string | null = null;
let cachedList: WishItem[] = EMPTY;

function read(): WishItem[] {
  let raw: string | null = null;
  try {
    raw = localStorage.getItem(KEY);
  } catch {
    return EMPTY;
  }
  if (raw === cachedRaw) return cachedList;
  cachedRaw = raw;
  if (!raw) {
    cachedList = EMPTY;
    return cachedList;
  }
  try {
    const parsed: unknown = JSON.parse(raw);
    cachedList = Array.isArray(parsed)
      ? (parsed.filter(
          (i) => i && typeof i === "object" && typeof (i as WishItem).title === "string"
        ) as WishItem[])
      : EMPTY;
  } catch {
    cachedList = EMPTY;
  }
  return cachedList;
}

function write(list: WishItem[]) {
  try {
    localStorage.setItem(KEY, JSON.stringify(list));
  } catch {
    // Storage blocked — the shortlist just won't survive a reload
  }
  window.dispatchEvent(new Event(EVENT));
}

function subscribe(onChange: () => void): () => void {
  window.addEventListener(EVENT, onChange);
  window.addEventListener("storage", onChange);
  return () => {
    window.removeEventListener(EVENT, onChange);
    window.removeEventListener("storage", onChange);
  };
}

function getServerSnapshot(): WishItem[] {
  return EMPTY;
}

export function toggleWish(item: WishItem) {
  const list = read();
  const next = list.some((i) => i.title === item.title)
    ? list.filter((i) => i.title !== item.title)
    : [...list, item];
  write(next);
}

export function removeWish(title: string) {
  write(read().filter((i) => i.title !== title));
}

export function clearWishlist() {
  write([]);
}

export function useWishlist(): WishItem[] {
  return useSyncExternalStore(subscribe, read, getServerSnapshot);
}
