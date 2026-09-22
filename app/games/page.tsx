import { activeGames } from "@/data/games";
import { GamesBrowser } from "@/components/games/GamesBrowser";

type GamesPageProps = {
  searchParams?: { random?: string };
};

export default function GamesPage({ searchParams }: GamesPageProps) {
  const random = searchParams?.random === "1";

  return (
    <div className="space-y-6">
      <div>
        <p className="text-sm font-black text-siam-500">{random ? "สุ่มเกม" : "คลังเกม"}</p>
        <h1 className="mt-1 text-3xl font-black text-siam-900">{random ? "สุ่มเกมให้ฉัน" : "เกมทั้งหมด"}</h1>
        <p className="mt-2 text-sm text-slate-500">ค้นหา กรองหมวดหมู่ หรือสุ่มเกมแล้วเริ่มเล่นได้ทันที</p>
      </div>
      <GamesBrowser games={activeGames} randomMode={random} />
    </div>
  );
}