import { activeGames } from "@/data/games";
import { GamesBrowser } from "@/components/games/GamesBrowser";

type GamesPageProps={searchParams?:{view?:string;focus?:string}};

export default function GamesPage({searchParams}:GamesPageProps){
  const view=searchParams?.view==="favorites"?"favorites":searchParams?.view==="recent"?"recent":"all";
  return <div className="space-y-6">
    <div className="pt-1">
      <p className="text-xs font-semibold uppercase tracking-[.14em] text-siam-500">GAME LIBRARY</p>
      <div className="mt-1 flex items-end justify-between gap-4"><div><h1 className="text-3xl font-extrabold tracking-[-.04em] text-main">เกมทั้งหมด</h1><p className="mt-2 text-sm text-muted">ค้นหาเกมโปรดของคุณแล้วเริ่มเล่นได้ทันที</p></div></div>
    </div>
    <GamesBrowser games={activeGames} initialView={view} autoFocus={searchParams?.focus==="search"}/>
  </div>;
}
