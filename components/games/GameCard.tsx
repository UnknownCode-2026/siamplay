"use client";

import Link from "next/link";
import { Heart, Play } from "lucide-react";
import { useEffect, useState } from "react";
import type { GameDefinition } from "@/types/game";
import { STORAGE_KEYS, safeRead, safeWrite } from "@/lib/storage";

export function GameCard({ game }: { game: GameDefinition }) {
  const [favorite, setFavorite] = useState(false);

  useEffect(() => {
    const favorites = safeRead<string[]>(STORAGE_KEYS.favorites, []);
    setFavorite(favorites.includes(game.id));
  }, [game.id]);

  function toggleFavorite() {
    const favorites = safeRead<string[]>(STORAGE_KEYS.favorites, []);
    const next = favorites.includes(game.id) ? favorites.filter((id) => id !== game.id) : [...favorites, game.id];
    safeWrite(STORAGE_KEYS.favorites, next);
    setFavorite(next.includes(game.id));
  }

  return (
    <article className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-soft">
      <div className="relative aspect-[16/10] bg-gradient-to-br from-siam-900 via-siam-600 to-sky-400 p-5 text-white">
        <div className="absolute right-4 top-4">
          <button onClick={toggleFavorite} aria-label="เพิ่มเกมโปรด" className="grid h-10 w-10 place-items-center rounded-full bg-white/15 backdrop-blur">
            <Heart size={18} fill={favorite ? "currentColor" : "none"} />
          </button>
        </div>
        <div className="flex h-full flex-col justify-end">
          <span className="w-fit rounded-full bg-white/15 px-3 py-1 text-xs font-bold">ใหม่</span>
          <h3 className="mt-3 text-2xl font-black">{game.name}</h3>
        </div>
      </div>
      <div className="p-5">
        <div className="flex flex-wrap gap-2 text-xs font-bold text-slate-500">
          <span>{game.category}</span><span>•</span><span>{game.difficulty}</span>
        </div>
        <p className="mt-3 text-sm leading-6 text-slate-500">{game.description}</p>
        <Link href={game.route} className="mt-5 inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-2xl bg-siam-900 px-5 py-3 text-sm font-black text-white">
          <Play size={17} /> เล่นเลย
        </Link>
      </div>
    </article>
  );
}
