export const REFORGE_ASSETS = {
  hero: "/assets/hero-dawn.jpg",
  dashboard: "/assets/hero-dawn.jpg",
  reflection: "/assets/journal-morning.jpg",
  guides: "/assets/hero-dawn.jpg",
  rituals: "/assets/journal-morning.jpg",
  signIn: "/assets/hero-dawn.jpg",
  journal: "/assets/journal-morning.jpg",
  checkIn: "/assets/hero-dawn.jpg",
  goals: "/assets/hero-dawn.jpg",
  music: "/assets/journal-morning.jpg",
  settings: "/assets/hero-dawn.jpg",
} as const;

export type ReforgeAssetKey = keyof typeof REFORGE_ASSETS;

export const natureAsset = (key: ReforgeAssetKey) => REFORGE_ASSETS[key];
