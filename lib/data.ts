// All images served locally from /public/images/ — no external dependency
const I = (name: string) => `/images/${name}`;

// WhatsApp contact number (international format, no +)
export const WA_NUMBER = "254712894097";
export const WA_DISPLAY = "+254 712 894 097";

export const PHOTOS = {
  balloons:     I("balloons.jpg"),
  safari:       I("safari.jpg"),
  fuji:         I("fuji.jpg"),
  diani:        I("diani.jpg"),
  // Hotel / lodge imagery — used in About page
  aboutA:       I("lodge.jpg"),
  aboutB:       I("suite.jpg"),
  hotel1:       I("hotel-pool.jpg"),
  hotel2:       I("hotel-dining.jpg"),
  hotel3:       I("hotel-coastal.jpg"),
  lodge1:       I("lodge.jpg"),
  lodge2:       I("luxury-camp.jpg"),
  mara:         I("mara.jpg"),
  amboseli:     I("amboseli.jpg"),
  beach:        I("beach.jpg"),
  mtkenya:      I("mtkenya.jpg"),
  tsavo:        I("safari.jpg"),
  cultural:     I("cultural.jpg"),
  dubai:        I("dubai.jpg"),
  greece:       I("greece.jpg"),
  japan:        I("fuji.jpg"),
  egypt:        I("egypt.jpg"),
  zanzibar:     I("zanzibar.jpg"),
  sa:           I("cultural.jpg"),
  lion:         I("lion.jpg"),
  elephant:     I("amboseli.jpg"),
  leopard:      I("leopard.jpg"),
  buffalo:      I("buffalo.jpg"),
  rhino:        I("rhino.jpg"),
  pkgGreece:    I("greece.jpg"),
  pkgJapan:     I("japan-pkg.jpg"),
  pkgKiambicho: I("kiambicho.jpg"),
  pkgSaltys:    I("saltys.jpg"),
  gal1:         I("gal1.jpg"),
  gal2:         I("gal2.jpg"),
  gal3:         I("gal3.jpg"),
  gal4:         I("gal4.jpg"),
  gal5:         I("gal5.jpg"),
  gal6:         I("gal6.jpg"),
  avA:          I("av-a.jpg"),
  avB:          I("av-b.jpg"),
  avC:          I("av-c.jpg"),
  bookingArt:   I("gal6.jpg"),
};

/** @deprecated kept for any remaining direct callers — prefer PHOTOS keys */
export const img = (_id: string, _w = 1200) => "";

export interface Destination {
  name: string;
  meta: string;
  price: string;
  img: string;
}

export const LOCAL: Destination[] = [
  { name: "Maasai Mara",       meta: "3 days · safari",    price: "KSH 18,500", img: PHOTOS.mara },
  { name: "Diani Beach",       meta: "4 days · coast",     price: "KSH 24,900", img: PHOTOS.beach },
  { name: "Amboseli",          meta: "2 days · safari",    price: "KSH 16,200", img: PHOTOS.amboseli },
  { name: "Mt Kenya",          meta: "5 days · hiking",    price: "KSH 32,000", img: PHOTOS.mtkenya },
  { name: "Tsavo",             meta: "3 days · safari",    price: "KSH 17,800", img: PHOTOS.tsavo },
  { name: "Cultural · Maasai", meta: "1 day · cultural",   price: "KSH  5,200", img: PHOTOS.cultural },
];

export const INTL: Destination[] = [
  { name: "Dubai",             meta: "5 days · city",     price: "USD 1,290", img: PHOTOS.dubai },
  { name: "Mykonos · Greece",  meta: "8 days · island",   price: "USD 2,269", img: PHOTOS.greece },
  { name: "Tokyo & Kyoto",     meta: "10 days · culture", price: "USD 3,150", img: PHOTOS.japan },
  { name: "Egypt",             meta: "7 days · history",  price: "USD 1,780", img: PHOTOS.egypt },
  { name: "Zanzibar",          meta: "5 days · coast",    price: "USD   890", img: PHOTOS.zanzibar },
  { name: "South Africa",      meta: "8 days · safari",   price: "USD 2,540", img: PHOTOS.sa },
];

export interface Package {
  badge: string;
  intl: boolean;
  title: string;
  duration: string;
  price: string;
  img: string;
  inclusions?: string[];
  exclusions?: string[];
}

export const PACKAGES: Package[] = [
  {
    badge: "INTERNATIONAL",
    intl: true,
    title: "Greece",
    duration: "8 DAYS · 7 NIGHTS · ATHENS / MYKONOS / SANTORINI",
    price: "USD 2,269",
    img: PHOTOS.pkgGreece,
    inclusions: [
      "All taxes & service charges",
      "Return economy flights from Nairobi",
      "3 nights Athens + 2 nights Mykonos + 2 nights Santorini (breakfast)",
      "Airport & port transfers throughout",
      "Ferry Piraeus – Mykonos",
      "Half-day Athens city tour (Acropolis)",
      "Hydrofoil Mykonos – Santorini – Piraeus",
      "Entrance fees per itinerary",
    ],
    exclusions: [
      "Visa fees",
      "Travel insurance",
      "Personal expenses & tips",
      "Accommodation taxes (paid locally)",
    ],
  },
  {
    badge: "INTERNATIONAL",
    intl: true,
    title: "Japan",
    duration: "10 DAYS · TOKYO · KYOTO · MT FUJI",
    price: "USD 3,150",
    img: PHOTOS.pkgJapan,
    inclusions: [
      "10 breakfasts",
      "10 nights accommodation",
      "Tokyo, Hiroshima, Kyoto, Osaka & Nara city tours",
      "Mt Fuji full-day tour",
      "Shinkansen bullet train (Tokyo–Hiroshima–Shin-Osaka, ordinary reserved)",
      "Private transfers per itinerary",
    ],
    exclusions: [
      "International flights",
      "Visa fee",
      "Travel insurance",
      "Night-surcharge airport/station transfers",
      "Entrance fees",
      "Personal expenses",
    ],
  },
  {
    badge: "LOCAL · KE",
    intl: false,
    title: "Kiambicho Hills",
    duration: "1 DAY · MURANG'A GORGES · SCARY BRIDGE",
    price: "KSH 5,200",
    img: PHOTOS.pkgKiambicho,
  },
  {
    badge: "LOCAL · KE",
    intl: false,
    title: "Salty's on the Creek",
    duration: "3 DAYS · KILIFI · WATER SPORTS",
    price: "KSH 21,950",
    img: PHOTOS.pkgSaltys,
  },
];

export interface WhyItem {
  n: string;
  t: string;
  d: string;
  icon: string;
}

export const WHY: WhyItem[] = [
  { n: "01", t: "Affordable prices",  d: "Group discounts and lipa-polepole deposits as low as KSH 10,000.", icon: "M12 2v20M5 7l7-3 7 3M5 17l7 3 7-3" },
  { n: "02", t: "Experienced guides", d: "A decade of expedition leaders who know every viewpoint by name.",  icon: "M12 22s8-7 8-13a8 8 0 10-16 0c0 6 8 13 8 13zM12 9a3 3 0 100 6 3 3 0 000-6z" },
  { n: "03", t: "Secure travel",      d: "Verified accommodation, vetted transport, fully insured itineraries.", icon: "M12 2l8 4v6c0 5-3.5 9-8 10-4.5-1-8-5-8-10V6l8-4z" },
  { n: "04", t: "Custom packages",    d: "Pick the rhythm — slow honeymoon, fast family run, or solo deep dive.", icon: "M3 6h18M3 12h18M3 18h12" },
  { n: "05", t: "24/7 support",       d: "We're a WhatsApp away the entire time you're on the road.", icon: "M21 12c0 4.5-4 8-9 8-1.5 0-3-.3-4.3-1L3 20l1-4.7C3.3 14 3 12.5 3 12c0-4.5 4-8 9-8s9 3.5 9 8z" },
  { n: "06", t: "Trusted partners",   d: "Airlines, hotels and operators we've worked with for years, not weeks.", icon: "M9 12l2 2 4-4M12 2a10 10 0 100 20 10 10 0 000-20z" },
];

export interface Testimonial {
  q: string;
  n: string;
  role: string;
  av: string;
  s: number;
}

export const TESTIMONIALS: Testimonial[] = [
  {
    q: "Avinterra planned our Mara trip top-to-bottom. The guide knew where the cats were, the lodge was spotless, and the price was exactly what they quoted. We're booking Greece next.",
    n: "Wanjiku M.", role: "MAASAI MARA · 2025", av: PHOTOS.avA, s: 5,
  },
  {
    q: "Our Japan honeymoon felt completely bespoke. Train tickets, ryokan, the lot — they sorted the visa and we just packed. Easily the smoothest international trip I've taken.",
    n: "James & Lina O.", role: "JAPAN · 2025", av: PHOTOS.avB, s: 5,
  },
  {
    q: "Booked the Salty's on the Creek weekend with twelve friends. Lipa-polepole made it painless and the dhow ride at sunset — I have no words. Just go.",
    n: "Brian K.", role: "KILIFI · 2024", av: PHOTOS.avC, s: 5,
  },
];

export interface GalleryItem {
  cls: string;
  src: string;
  cap: string;
}

export const GALLERY: GalleryItem[] = [
  { cls: "g-1", src: PHOTOS.mara,     cap: "MAASAI MARA" },
  { cls: "g-2", src: PHOTOS.beach,    cap: "DIANI BEACH" },
  { cls: "g-3", src: PHOTOS.greece,   cap: "MYKONOS" },
  { cls: "g-4", src: PHOTOS.lion,     cap: "AFRICAN LION" },
  { cls: "g-5", src: PHOTOS.leopard,  cap: "LEOPARD · TSAVO" },
  { cls: "g-6", src: PHOTOS.dubai,    cap: "DUBAI" },
];

export interface BigFiveAnimal {
  key: string;
  name: string;
  location: string;
  fact: string;
  img: string;
}

export const BIG_FIVE: BigFiveAnimal[] = [
  { key: "lion",     name: "Lion",     location: "MAASAI MARA",   fact: "Big Five · Kenya",    img: PHOTOS.lion },
  { key: "elephant", name: "Elephant", location: "AMBOSELI",      fact: "Big Five · Kenya",    img: PHOTOS.elephant },
  { key: "leopard",  name: "Leopard",  location: "TSAVO",         fact: "Big Five · Kenya",    img: PHOTOS.leopard },
  { key: "buffalo",  name: "Buffalo",  location: "LAKE NAKURU",   fact: "Big Five · Kenya",    img: PHOTOS.buffalo },
  { key: "rhino",    name: "Rhino",    location: "OL PEJETA",     fact: "Big Five · Kenya",    img: PHOTOS.rhino },
];
