"use client";

import { useSyncExternalStore } from "react";
import { USD_TO_KSH } from "./data";

export type Currency = "KSH" | "USD";

const KEY = "av-currency";
const EVENT = "av-currency-change";

function subscribe(onChange: () => void): () => void {
  window.addEventListener(EVENT, onChange);
  window.addEventListener("storage", onChange);
  return () => {
    window.removeEventListener(EVENT, onChange);
    window.removeEventListener("storage", onChange);
  };
}

function getSnapshot(): Currency {
  try {
    return localStorage.getItem(KEY) === "USD" ? "USD" : "KSH";
  } catch {
    return "KSH";
  }
}

// Prices are authored in KSH/USD as written in lib/data.ts — KSH is the pre-hydration default
function getServerSnapshot(): Currency {
  return "KSH";
}

export function setCurrency(next: Currency) {
  try {
    localStorage.setItem(KEY, next);
  } catch {
    // Storage blocked (private mode) — the choice just won't persist
  }
  window.dispatchEvent(new Event(EVENT));
}

export function useCurrency(): Currency {
  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}

export interface ParsedPrice {
  currency: Currency;
  num: number;
}

/** Parses an authored price string like "KSH 19,500" or "USD 5,369". Returns null for "Contact us". */
export function parsePrice(price: string): ParsedPrice | null {
  if (/contact|get quote|custom/i.test(price)) return null;
  const currency: Currency = /usd|\$/i.test(price) ? "USD" : "KSH";
  const match = price.match(/[\d,]+/);
  if (!match) return null;
  const num = parseInt(match[0].replace(/,/g, ""), 10);
  return isNaN(num) ? null : { currency, num };
}

/** Converts an amount between KSH and USD, rounded to a sensible display step. */
export function convert(num: number, from: Currency, to: Currency): number {
  if (from === to) return num;
  if (from === "USD") return Math.round((num * USD_TO_KSH) / 1000) * 1000;
  return Math.round(num / USD_TO_KSH);
}

/** Always in KSH — used for budget filtering and shortlist totals across mixed currencies. */
export function toKsh(parsed: ParsedPrice): number {
  return convert(parsed.num, parsed.currency, "KSH");
}

export function formatAmount(num: number, currency: Currency): string {
  return `${currency} ${num.toLocaleString()}`;
}

/**
 * Renders an authored price in the reader's chosen currency.
 * Converted values are prefixed with "≈" since the rate is indicative.
 */
export function displayPrice(price: string, target: Currency): string {
  const parsed = parsePrice(price);
  if (!parsed) return price;
  if (parsed.currency === target) return formatAmount(parsed.num, target);
  return `≈ ${formatAmount(convert(parsed.num, parsed.currency, target), target)}`;
}
