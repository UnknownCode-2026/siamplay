export const STORAGE_KEYS = {
  settings: "siamplay-settings",
  stats: "siamplay-stats",
  favorites: "siamplay-favorites",
  recent: "siamplay-recent-games",
} as const;

export function safeRead<T>(key: string, fallback: T): T {
  if (typeof window === "undefined") return fallback;
  try {
    const raw = localStorage.getItem(key);
    return raw ? (JSON.parse(raw) as T) : fallback;
  } catch {
    return fallback;
  }
}

export function safeWrite<T>(key: string, value: T) {
  if (typeof window === "undefined") return;
  localStorage.setItem(key, JSON.stringify(value));
}
