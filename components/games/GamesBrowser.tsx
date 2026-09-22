"use client";

import { Search, Shuffle } from "lucide-react";
import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import type { GameDefinition } from "@/types/game";
import { GameCard } from "@/components/games/GameCard";

const categories = ["ทั้งหมด", "เล่นเร็ว", "ความเร็ว", "ฝึกสมอง", "เกมปริศนา", "คลาสสิก"];

export function GamesBrowser({ games, randomMode = false }: { games: GameDefinition[]; randomMode?: boolean }) {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("ทั้งหมด");
  const router = useRouter();

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return games.filter((game) => {
      const matchCategory = category === "ทั้งหมด" || game.category === category;
      const haystack = [game.name, game.description, game.category, ...(game.keywords ?? [])].join(" ").toLowerCase();
      return matchCategory && (!q || haystack.includes(q));
    });
  }, [games, query, category]);

  function randomGame() {
    if (!games.length) return;
    const game = games[Math.floor(Math.random() * games.length)];
    router.push(game.route);
  }

  return (
    <div className="space-y-6">
      {randomMode && (
        <button onClick={randomGame} className="inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-2xl bg-siam-900 px-5 py-3 font-black text-white sm:w-auto">
          <Shuffle size={18}/> สุ่มเกมตอนนี้
        </button>
      )}
      <label className="flex min-h-12 items-center gap-3 rounded-2xl border border-slate-200 bg-white px-4 shadow-soft">
        <Search size={19} className="text-slate-400" />
        <input value={query} onChange={(e) => setQuery(e.target.value)} className="w-full bg-transparent text-sm outline-none" placeholder="ค้นหาเกม..." />
      </label>
      <div className="flex gap-2 overflow-x-auto pb-1">
        {categories.map((name) => (
          <button key={name} onClick={() => setCategory(name)} className={`whitespace-nowrap rounded-full px-4 py-2 text-sm font-bold ${category === name ? "bg-siam-600 text-white" : "border border-slate-200 bg-white text-slate-600"}`}>
            {name}
          </button>
        ))}
      </div>
      {filtered.length ? <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">{filtered.map((game) => <GameCard key={game.id} game={game} />)}</div> : <div className="rounded-3xl border border-dashed border-slate-300 bg-white p-10 text-center text-sm text-slate-500">ไม่พบเกมที่ค้นหา</div>}
    </div>
  );
}
