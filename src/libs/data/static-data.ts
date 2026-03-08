// ---------------------------  Navbar Data ------------------
export const NAVBAR_LINKS = [
  { label: "Home", href: "/" },
  { label: "Properties", href: "/properties" },
  { label: "Agents", href: "/agents" },
  { label: "Community", href: "/community" },
  { label: "CS", href: "/CS" },
];

// ---------------------------  Language Options ------------------
export const LANGUAGE_OPTIONS = [
  { code: "ko", label: "한국어", flag: "🇰🇷" },
  { code: "en", label: "English", flag: "🇺🇸" },
  { code: "ru", label: "Русский", flag: "🇷🇺" },
];

// ---------------------------  Advertisement -----------------

export const ADVERTISEMENT_VIDEOS = [
  {
    id: 0,
    src: "/videos/advertisement/video1.mp4",
  },
  {
    id: 1,
    src: "/videos/advertisement/video2.mp4",
  },
  {
    id: 2,
    src: "/videos/advertisement/video3.mp4",
  },
  {
    id: 3,
    src: "/videos/advertisement/video4.mp4",
  },
];

// ---------------------------  Agents ------------------
export const messageLoaders = {
  en: async () => ({
    home: (await import("../../../messages/en/home.json")).default,
    navbar: (await import("../../../messages/en/navbar.json")).default,
    properties: (await import("../../../messages/en/properties.json")).default,
  }),
  ko: async () => ({
    home: (await import("../../../messages/ko/home.json")).default,
    navbar: (await import("../../../messages/ko/navbar.json")).default,
    properties: (await import("../../../messages/ko/properties.json")).default,
  }),

  ru: async () => ({
    home: (await import("../../../messages/ru/home.json")).default,
    navbar: (await import("../../../messages/ru/navbar.json")).default,
    properties: (await import("../../../messages/ru/properties.json")).default,
  }),
};

// ---------------------------  Price Options -----------------
export const PRICE_OPTIONS = [
  0, 50000, 100000, 150000, 200000, 300000, 400000, 500000, 600000, 700000,
  800000, 900000, 1000000, 1200000, 1400000, 1600000, 1800000, 2000000,
];

export const PROPERTY_SQUARE = [0, 25, 50, 75, 100, 125, 150, 200, 300, 500];
