"use client";

import Link from "next/link";
import { Heart, Play, TimerReset } from "lucide-react";
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
    <Link href={game.route} className="game-card group overflow-hidden rounded-[1.65rem] border surface shadow-soft">
      <div className={`relative overflow-hidden bg-gradient-to-br from-[#0c2b68] via-[#1557d6] to-[#16c8ff] ${compact ? "aspect-[1/1]" : "aspect-[16/10]"}`}>
        <div className="absolute inset-0 opacity-30" style={{ backgroundImage: "radial-gradient(circle at 25% 25%, white 0 1px, transparent 1.5px)", backgroundSize: "22px 22px" }} />
        <div className="absolute left-4 top-4 rounded-full bg-white/12 px-3 py-1.5 text-[10px] font-black uppercase tracking-[.12em] text-white backdrop-blur">ใหม่</div>
        <button onClick={toggleFavorite} aria-label="เกมโปรด" className="absolute right-3 top-3 grid h-9 w-9 place-items-center rounded-full bg-black/15 text-white backdrop-blur">
          <Heart size={17} fill={favorite ? "currentColor" : "none"} />
        </button>
        <div className="absolute inset-x-0 bottom-0 p-4 text-white">
          <div className="mb-3 grid h-11 w-11 place-items-center rounded-2xl bg-white/14 backdrop-blur"><TimerReset size={23}/></div>
          <h3 className={`font-black leading-tight ${compact ? "text-base" : "text-xl"}`}>{game.name}</h3>
          {!compact && <p className="mt-1 line-clamp-2 text-xs leading-5 text-white/75">{game.description}</p>}
        </div>
      </div>
      <div className="flex items-center justify-between gap-3 p-4">
        <div className="min-w-0">
          <p className="truncate text-xs font-black text-main">{game.category}</p>
          <p className="mt-1 text-[11px] font-bold text-muted">{game.difficulty}</p>
        </div>
        <span className="grid h-10 w-10 shrink-0 place-items-center rounded-2xl bg-siam-600 text-white shadow-soft"><Play size={16} fill="currentColor"/></span>
      </div>
    </Link>
  );
}
