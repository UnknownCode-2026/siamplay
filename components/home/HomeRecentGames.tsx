"use client";

import { useEffect, useState } from "react";
import { activeGames } from "@/data/games";
import { GameCard } from "@/components/games/GameCard";
import { STORAGE_KEYS, safeRead } from "@/lib/storage";

export function HomeRecentGames() {
  const [ids, setIds] = useState<string[]>([]);

  useEffect(() => {
    setIds(safeRead<string[]>(STORAGE_KEYS.recent, []));
  }, []);

  const games = ids
    .map((id) => activeGames.find((game) => game.id === id))
    .filter(Boolean)
    .slice(0, 4);

  if (!games.length) return null;

  return (
    <section>
      <div className="mb-3 flex items-end justify-between gap-4">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[.14em] text-siam-500">เล่นล่าสุด</p>
          <h2 className="mt-1 text-lg font-bold text-main">กลับไปเล่นต่อ</h2>
        </div>
        <a href="/games?view=recent" className="text-xs font-semibold text-siam-600">ดูทั้งหมด</a>
      </div>
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
        {games.map((game:any) => <GameCard key={game.id} game={game} compact />)}
      </div>
    </section>
  );
}
