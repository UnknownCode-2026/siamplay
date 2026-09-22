import { STORAGE_KEYS, safeRead, safeWrite } from "@/lib/storage";

export type GameStat = {
  plays: number;
  bestValue: number | null;
  lastValue: number | null;
  updatedAt: string;
};

export type GameStatsMap = Record<string, GameStat>;

export function getGameStats(): GameStatsMap {
  return safeRead<GameStatsMap>(STORAGE_KEYS.stats, {});
}

export function recordPerfect10(value: number) {
  const stats = getGameStats();
  const current = stats["perfect-10"];
  const distance = Math.abs(10 - value);
  const bestDistance = current?.bestValue == null ? Number.POSITIVE_INFINITY : Math.abs(10 - current.bestValue);

  stats["perfect-10"] = {
    plays: (current?.plays ?? 0) + 1,
    bestValue: distance < bestDistance ? value : current?.bestValue ?? value,
    lastValue: value,
    updatedAt: new Date().toISOString(),
  };

  safeWrite(STORAGE_KEYS.stats, stats);
  return stats["perfect-10"];
}
