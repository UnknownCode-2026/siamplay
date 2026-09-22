"use client";

import { Gamepad2, Heart, Trophy } from "lucide-react";
import { useEffect, useState } from "react";
import { activeGames } from "@/data/games";
import { getGameStats, type GameStatsMap } from "@/lib/game-stats";
import { STORAGE_KEYS, safeRead } from "@/lib/storage";

export function StatsDashboard() {
  const [stats,setStats]=useState<GameStatsMap>({});
  const [favorites,setFavorites]=useState<string[]>([]);
  useEffect(()=>{setStats(getGameStats());setFavorites(safeRead<string[]>(STORAGE_KEYS.favorites,[]));},[]);
  const played=Object.values(stats).filter(s=>s.plays>0);
  const totalPlays=played.reduce((sum,item)=>sum+item.plays,0);

  return (
    <div className="space-y-6">
      <section className="rounded-[1.6rem] border surface p-5">
        <div className="grid grid-cols-3 gap-4 text-center">
          {[
            [Gamepad2,totalPlays,"เล่นทั้งหมด"],
            [Trophy,played.length,"เกมที่มีสถิติ"],
            [Heart,favorites.length,"เกมโปรด"],
          ].map(([Icon,value,label]:any)=><div key={label}><div className="mx-auto grid h-10 w-10 place-items-center rounded-2xl surface-soft text-siam-600"><Icon size={18}/></div><p className="mt-2 text-2xl font-bold text-main">{value}</p><p className="mt-1 text-[11px] font-medium text-muted">{label}</p></div>)}
        </div>
      </section>

      <section>
        <h2 className="mb-3 text-sm font-semibold text-main">สถิติแต่ละเกม</h2>
        {played.length ? <div className="space-y-3">
          {activeGames.filter(game=>stats[game.id]).map(game=>{const stat=stats[game.id];return <div key={game.id} className="rounded-[1.4rem] border surface p-4"><div className="flex items-start justify-between gap-3"><div><p className="font-semibold text-main">{game.name}</p><p className="mt-1 text-xs text-muted">{game.category}</p></div><p className="text-xs text-muted">{stat.plays} ครั้ง</p></div><div className="mt-4 rounded-xl surface-soft p-3"><p className="text-[11px] text-muted">สถิติดีที่สุด</p><p className="mt-1 text-lg font-bold text-main">{stat.bestValue==null?"--":stat.bestValue.toFixed(3)+" วิ"}</p></div></div>})}
        </div> : <div className="rounded-[1.4rem] border border-dashed p-9 text-center surface"><p className="text-sm font-semibold text-main">ยังไม่มีสถิติ</p><p className="mt-1 text-xs text-muted">เริ่มเล่นเกมแล้วข้อมูลจะมาแสดงที่นี่</p></div>}
      </section>
    </div>
  );
}
