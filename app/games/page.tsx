import { activeGames } from "@/data/games";
import { GamesBrowser } from "@/components/games/GamesBrowser";

type GamesPageProps = { searchParams?: { random?: string; view?: string; focus?: string } };

export default function GamesPage({ searchParams }: GamesPageProps) {
  const view = searchParams?.view === "favorites" ? "favorites" : searchParams?.view === "recent" ? "recent" : "all";
  return (
    <div className="space-y-5">
      <div className="pt-1">
        <p className="text-sm font-medium text-siam-500">คลังเกม</p>
        <h1 className="mt-1 text-3xl font-bold tracking-tight text-main">เกมทั้งหมด</h1>
        <p className="mt-2 text-sm text-muted">ค้นหา เลือกหมวด หรือเปิดเกมที่ชอบได้จากที่เดียว</p>
      </div>
      <GamesBrowser games={activeGames} randomMode={searchParams?.random === "1"} initialView={view} autoFocus={searchParams?.focus === "search"} />
    </div>
  );
}
