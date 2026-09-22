"use client";

import { Brain, Clock3, Gamepad2, Search, Shuffle, Sparkles } from "lucide-react";
import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import type { GameDefinition } from "@/types/game";
import { GameCard } from "@/components/games/GameCard";

const categories = [
  ["ทั้งหมด", Gamepad2],
  ["เล่นเร็ว", Clock3],
  ["ความเร็ว", Sparkles],
  ["ฝึกสมอง", Brain],
];

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
    router.push(games[Math.floor(Math.random() * games.length)].route);
  }

  return (
    <div className="space-y-5">
      <label className="flex min-h-14 items-center gap-3 rounded-[1.4rem] border surface px-4 shadow-soft">
        <Search size={19} className="text-muted" />
        <input value={query} onChange={(e) => setQuery(e.target.value)} className="w-full bg-transparent text-sm font-semibold text-main outline-none placeholder:text-muted" placeholder="ค้นหาเกมที่อยากเล่น..." />
        <button type="button" onClick={randomGame} aria-label="สุ่มเกม" className="grid h-10 w-10 shrink-0 place-items-center rounded-2xl bg-siam-600 text-white"><Shuffle size={18}/></button>
      </label>

      {randomMode && (
        <button onClick={randomGame} className="inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-siam-600 to-cyan-400 px-5 py-3 font-black text-white shadow-soft">
          <Shuffle size={18}/> สุ่มเกมให้ฉัน
        </button>
      )}

      <div className="flex gap-2 overflow-x-auto pb-1">
        {categories.map(([name, Icon]: any) => (
          <button key={name} onClick={() => setCategory(name)} className={`inline-flex min-h-10 items-center gap-2 whitespace-nowrap rounded-2xl px-3.5 text-xs font-black transition ${category === name ? "bg-siam-600 text-white" : "border surface text-muted"}`}>
            <Icon size={15}/>{name}
          </button>
        ))}
      </div>

      {filtered.length ? (
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {filtered.map((game) => <GameCard key={game.id} game={game} compact />)}
        </div>
      ) : (
        <div className="rounded-[1.6rem] border border-dashed p-10 text-center surface">
          <p className="font-black text-main">ไม่เจอเกมนี้</p>
          <p className="mt-2 text-sm text-muted">ลองค้นหาด้วยคำอื่นดู</p>
        </div>
      )}
    </div>
  );
}
