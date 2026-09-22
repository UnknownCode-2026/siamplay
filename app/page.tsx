import Link from "next/link";
import { ArrowRight, Brain, Clock3, Gamepad2, Search, Sparkles, Target, Zap } from "lucide-react";
import { activeGames } from "@/data/games";
import { GameCard } from "@/components/games/GameCard";
import { HomeRecentGames } from "@/components/home/HomeRecentGames";

export default function HomePage() {
  const featured = activeGames.find((game)=>game.featured) ?? activeGames[0];

  return (
    <div className="space-y-7">
      <section className="pt-1">
        <p className="text-sm font-medium text-siam-500">SiamPlay</p>
        <h1 className="mt-1 text-3xl font-bold tracking-tight text-main">วันนี้เล่นอะไรดี?</h1>
        <p className="mt-2 text-sm text-muted">เลือกเกมแล้วเริ่มเล่นได้ทันที ไม่ต้องสมัครสมาชิก</p>
        <Link href="/games?focus=search" className="mt-4 flex min-h-14 items-center gap-3 rounded-[1.2rem] border surface px-4">
          <Search size={18} className="text-muted"/>
          <span className="text-sm font-medium text-muted">ค้นหาเกมที่อยากเล่น...</span>
        </Link>
      </section>

      <section className="rail flex gap-2 overflow-x-auto pb-1">
        {[
          [Gamepad2,"ทั้งหมด","/games"],
          [Clock3,"เล่นเร็ว","/games?category=เล่นเร็ว"],
          [Target,"ความแม่นยำ","/games"],
          [Brain,"ฝึกสมอง","/games?category=ฝึกสมอง"],
          [Zap,"ความเร็ว","/games?category=ความเร็ว"],
        ].map(([Icon,label,href]:any)=><Link key={label} href={href} className="inline-flex min-h-10 shrink-0 items-center gap-2 rounded-full border surface px-3.5 text-xs font-medium text-main"><Icon size={14}/>{label}</Link>)}
      </section>

      {featured && (
        <section>
          <div className="mb-3 flex items-center justify-between"><div><p className="text-xs font-medium uppercase tracking-[.14em] text-siam-500">เกมแนะนำวันนี้</p></div><Sparkles size={17} className="text-siam-500"/></div>
          <Link href={featured.route} className="relative block overflow-hidden rounded-[1.7rem] bg-gradient-to-br from-[#0a2252] via-[#1557d6] to-[#16c8ff] p-5 text-white shadow-soft sm:p-7">
            <div className="absolute inset-0 opacity-20" style={{backgroundImage:"radial-gradient(circle at 20% 20%, white 0 1px, transparent 1.3px)",backgroundSize:"24px 24px"}}/>
            <div className="relative max-w-lg">
              <p className="text-xs font-medium text-white/65">{featured.category} • {featured.difficulty}</p>
              <h2 className="mt-3 text-3xl font-bold leading-tight">10.000</h2>
              <h3 className="mt-1 text-xl font-semibold">{featured.name}</h3>
              <p className="mt-2 text-sm leading-6 text-white/70">{featured.description}</p>
              <span className="mt-4 inline-flex min-h-11 items-center gap-2 rounded-xl bg-white px-4 text-sm font-semibold text-[#10275a]">เล่นเลย <ArrowRight size={16}/></span>
            </div>
          </Link>
        </section>
      )}

      <HomeRecentGames />

      <section>
        <div className="mb-3 flex items-end justify-between gap-4">
          <div><p className="text-xs font-medium uppercase tracking-[.14em] text-siam-500">เกมทั้งหมด</p><h2 className="mt-1 text-lg font-bold text-main">เลือกเกมแล้วเริ่มได้เลย</h2></div>
          <Link href="/games" className="text-xs font-semibold text-siam-600">ดูทั้งหมด</Link>
        </div>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
          {activeGames.slice(0,10).map((game)=><GameCard key={game.id} game={game} compact />)}
        </div>
      </section>
    </div>
  );
}
