"use client";

import Link from "next/link";
import { Heart, TimerReset } from "lucide-react";
import { useEffect, useState } from "react";
import type { GameDefinition } from "@/types/game";
import { STORAGE_KEYS, safeRead, safeWrite } from "@/lib/storage";

export function GameCard({ game, compact = false }: { game: GameDefinition; compact?: boolean }) {
  const [favorite, setFavorite] = useState(false);

  useEffect(() => {
    setFavorite(safeRead<string[]>(STORAGE_KEYS.favorites, []).includes(game.id));
  }, [game.id]);

  function toggleFavorite(e: React.MouseEvent) {
    e.preventDefault();
    const favorites = safeRead<string[]>(STORAGE_KEYS.favorites, []);
    const next = favorites.includes(game.id) ? favorites.filter((id) => id !== game.id) : [...favorites, game.id];
    safeWrite(STORAGE_KEYS.favorites, next);
    setFavorite(next.includes(game.id));
  }

  return (
    <Link href={game.route} className="game-card overflow-hidden rounded-[1.35rem] border surface shadow-soft">
      <div className={`relative overflow-hidden bg-gradient-to-br from-[#102b67] via-[#216cff] to-[#15c7ff] ${compact ? "aspect-[1.15/1]" : "aspect-[16/10]"}`}>
        <div className="absolute inset-0 opacity-25" style={{backgroundImage:"radial-gradient(circle at 20% 20%, white 0 1px, transparent 1.3px)",backgroundSize:"20px 20px"}}/>
        <button onClick={toggleFavorite} aria-label="เกมโปรด" className="absolute right-2.5 top-2.5 z-10 grid h-8 w-8 place-items-center rounded-full bg-black/15 text-white backdrop-blur">
          <Heart size={15} fill={favorite ? "currentColor" : "none"} />
        </button>
        <div className="absolute inset-x-0 bottom-0 p-3.5 text-white">
          <div className="mb-2.5 grid h-9 w-9 place-items-center rounded-xl bg-white/14 backdrop-blur"><TimerReset size={19}/></div>
          <h3 className={`font-bold leading-tight ${compact ? "text-sm" : "text-lg"}`}>{game.name}</h3>
        </div>
      </div>
      <div className="px-3.5 py-3">
        <p className="truncate text-xs font-semibold text-main">{game.category}</p>
        <p className="mt-1 text-[11px] font-medium text-muted">{game.difficulty}</p>
      </div>
    </Link>
  );
}
