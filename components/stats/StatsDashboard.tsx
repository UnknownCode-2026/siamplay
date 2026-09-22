"use client";

import { useEffect, useState } from "react";
import { activeGames } from "@/data/games";
import { getGameStats, type GameStatsMap } from "@/lib/game-stats";
import { STORAGE_KEYS, safeRead } from "@/lib/storage";

export function StatsDashboard() {
  const [stats, setStats] = useState<GameStatsMap>({});
  const [favorites, setFavorites] = useState<string[]>([]);

  useEffect(() => {
    setStats(getGameStats());
    setFavorites(safeRead<string[]>(STORAGE_KEYS.favorites, []));
  }, []);

  const played = Object.values(stats).filter((s) => s.plays > 0);
  const totalPlays = played.reduce((sum, item) => sum + item.plays, 0);

  return (
    <div className="space-y-5">
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        {[
          ["เกมที่เล่น", played.length],
          ["จำนวนครั้ง", totalPlays],
          ["สถิติที่บันทึก", played.filter((s) => s.bestValue != null).length],
          ["เกมโปรด", favorites.length],
        ].map(([label, value]) => (
          <div key={label} className="rounded-3xl border border-slate-200 bg-white p-5 shadow-soft">
            <p className="text-xs font-bold text-slate-500">{label}</p>
            <p className="mt-2 text-2xl font-black text-siam-900">{value}</p>
          </div>
        ))}
      </div>

      {played.length ? (
        <div className="space-y-3">
          {activeGames.filter((game) => stats[game.id]).map((game) => {
            const stat = stats[game.id];
            return (
              <div key={game.id} className="rounded-3xl border border-slate-200 bg-white p-5 shadow-soft">
                <p className="font-black text-siam-900">{game.name}</p>
                <div className="mt-3 grid grid-cols-2 gap-3 text-sm">
                  <div><p className="text-slate-500">เล่นแล้ว</p><p className="font-black">{stat.plays} ครั้ง</p></div>
                  <div><p className="text-slate-500">สถิติดีที่สุด</p><p className="font-black">{stat.bestValue == null ? "--" : stat.bestValue.toFixed(3) + " วิ"}</p></div>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="rounded-3xl border border-dashed border-slate-300 bg-white p-10 text-center text-sm text-slate-500">ยังไม่มีสถิติ ลองเล่นเกมแรกของ SiamPlay ก่อน</div>
      )}
    </div>
  );
}
