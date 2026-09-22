"use client";

import Link from "next/link";
import { Heart, Play, TimerReset } from "lucide-react";
import { useEffect, useState } from "react";
import type { GameDefinition } from "@/types/game";
import { STORAGE_KEYS, safeRead, safeWrite } from "@/lib/storage";

export function GameCard({ game }: { game: GameDefinition }) {
  const [favorite,setFavorite]=useState(false);

  useEffect(()=>setFavorite(safeRead<string[]>(STORAGE_KEYS.favorites,[]).includes(game.id)),[game.id]);

  function toggleFavorite(e:React.MouseEvent){
    e.preventDefault();
    const current=safeRead<string[]>(STORAGE_KEYS.favorites,[]);
    const next=current.includes(game.id)?current.filter(id=>id!==game.id):[...current,game.id];
    safeWrite(STORAGE_KEYS.favorites,next);
    setFavorite(next.includes(game.id));
  }

  return (
    <Link href={game.route} className="card-press group overflow-hidden rounded-[18px] border surface shadow-sm">
      <div className="relative aspect-[4/3] overflow-hidden bg-gradient-to-br from-[#10275a] via-[#2764ff] to-[#17c8ff]">
        <div className="absolute inset-0 opacity-25" style={{backgroundImage:"radial-gradient(circle at 25% 25%, white 0 1px, transparent 1.4px)",backgroundSize:"20px 20px"}}/>
        <div className="absolute left-3 top-3 flex gap-2">
          {game.isNew && <span className="rounded-full bg-white/15 px-2.5 py-1 text-[10px] font-bold text-white backdrop-blur">NEW</span>}
        </div>
        <button onClick={toggleFavorite} aria-label="เกมโปรด" className="absolute right-3 top-3 grid h-9 w-9 place-items-center rounded-full bg-black/15 text-white backdrop-blur">
          <Heart size={16} fill={favorite?"currentColor":"none"}/>
        </button>
        <div className="absolute inset-x-0 bottom-0 p-4 text-white">
          <div className="mb-3 grid h-10 w-10 place-items-center rounded-[14px] bg-white/14 backdrop-blur"><TimerReset size={21}/></div>
          <p className="text-[11px] font-semibold text-white/65">{game.shortName}</p>
          <h3 className="mt-1 text-[15px] font-bold leading-tight">{game.name}</h3>
        </div>
        <div className="absolute inset-0 hidden items-center justify-center bg-[#081834]/55 opacity-0 transition group-hover:opacity-100 lg:flex">
          <span className="inline-flex items-center gap-2 rounded-[14px] bg-white px-4 py-2.5 text-sm font-bold text-[#10275a]"><Play size={16} fill="currentColor"/> เล่นเลย</span>
        </div>
      </div>
      <div className="flex items-center justify-between gap-3 px-4 py-3">
        <span className="text-xs font-medium text-muted">{game.category}</span>
        <span className="text-[11px] font-semibold text-siam-600">{game.difficulty}</span>
      </div>
    </Link>
  );
}
