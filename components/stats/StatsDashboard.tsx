"use client";

import { Gamepad2, Heart, Trophy } from "lucide-react";
import { useEffect, useState } from "react";
import { activeGames } from "@/data/games";
import { getGameStats, type GameStatsMap } from "@/lib/game-stats";
import { STORAGE_KEYS, safeRead } from "@/lib/storage";

export function StatsDashboard(){
  const [stats,setStats]=useState<GameStatsMap>({});
  const [favorites,setFavorites]=useState<string[]>([]);
  useEffect(()=>{setStats(getGameStats());setFavorites(safeRead<string[]>(STORAGE_KEYS.favorites,[]));},[]);
  const played=Object.values(stats).filter(s=>s.plays>0);
  const totalPlays=played.reduce((sum,item)=>sum+item.plays,0);
  const perfect=stats["perfect-10"];

  return <div className="space-y-6">
    <section className="grid grid-cols-3 gap-3">
      {[[Gamepad2,totalPlays,"ครั้งที่เล่น"],[Trophy,played.length,"เกมที่เคยเล่น"],[Heart,favorites.length,"เกมโปรด"]].map(([Icon,value,label]:any)=><div key={label} className="rounded-[18px] border surface p-4 text-center shadow-sm"><div className="mx-auto grid h-9 w-9 place-items-center rounded-[12px] surface-3 text-siam-600"><Icon size={17}/></div><p className="mt-3 text-2xl font-extrabold text-main">{value}</p><p className="mt-1 text-[11px] font-medium text-muted">{label}</p></div>)}
    </section>

    {perfect?.bestValue!=null&&<section className="rounded-[22px] border surface p-5"><p className="text-xs font-semibold uppercase tracking-[.14em] text-siam-500">PERSONAL BEST</p><div className="mt-2 flex items-end justify-between gap-4"><div><p className="text-sm font-semibold text-main">Perfect 10</p><p className="mt-2 font-mono text-3xl font-extrabold tracking-[-.05em] text-main">{perfect.bestValue.toFixed(3)} <span className="text-sm font-medium text-muted">วิ</span></p></div><p className="text-xs text-muted">{perfect.plays} ครั้ง</p></div></section>}

    <section><h2 className="mb-3 text-sm font-bold text-main">สถิติแต่ละเกม</h2>{played.length?<div className="space-y-3">{activeGames.filter(game=>stats[game.id]).map(game=>{const stat=stats[game.id];return <div key={game.id} className="rounded-[18px] border surface p-4"><div className="flex items-center justify-between gap-4"><div><p className="font-semibold text-main">{game.shortName}</p><p className="mt-1 text-xs text-muted">{game.category}</p></div><div className="text-right"><p className="text-xs text-muted">เล่นแล้ว</p><p className="mt-1 text-sm font-bold text-main">{stat.plays} ครั้ง</p></div></div></div>})}</div>:<div className="rounded-[18px] border surface p-9 text-center"><p className="text-sm font-bold text-main">ยังไม่มีสถิติ</p><p className="mt-1 text-xs text-muted">ลองเล่นเกมแรก แล้วสถิติจะมาแสดงตรงนี้</p></div>}</section>
  </div>;
}
