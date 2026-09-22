import Link from "next/link";
import { ArrowRight, Brain, Clock3, Gamepad2, Search, Target, Zap } from "lucide-react";
import { activeGames } from "@/data/games";
import { GameCard } from "@/components/games/GameCard";
import { HomeRecentGames } from "@/components/home/HomeRecentGames";

export default function HomePage(){
  const featured=activeGames.find(game=>game.featured)??activeGames[0];

  return <div className="space-y-8">
    <section className="pt-2">
      <p className="text-xs font-semibold uppercase tracking-[.16em] text-siam-500">PLAY SOMETHING</p>
      <h1 className="mt-2 max-w-xl text-4xl font-extrabold tracking-[-.05em] text-main sm:text-5xl">วันนี้เล่นอะไรดี?</h1>
      <p className="mt-3 max-w-xl text-sm leading-6 text-muted">มินิเกมสั้น ๆ เล่นฟรีบนเว็บ เปิดแล้วเล่นได้ทันที ไม่ต้องสมัครสมาชิก</p>
      <Link href="/games?focus=search" className="mt-5 flex min-h-14 max-w-2xl items-center gap-3 rounded-[16px] border surface px-4 shadow-sm">
        <Search size={18} className="text-muted"/>
        <span className="text-sm font-medium text-muted">ค้นหาเกมที่อยากเล่น...</span>
      </Link>
    </section>

    <section className="rail flex gap-2 overflow-x-auto pb-1">
      {[[Gamepad2,"ทั้งหมด","/games"],[Clock3,"เล่นเร็ว","/games?category=เล่นเร็ว"],[Target,"ความแม่นยำ","/games"],[Brain,"ฝึกสมอง","/games?category=ฝึกสมอง"],[Zap,"ความเร็ว","/games?category=ความเร็ว"]].map(([Icon,label,href]:any)=><Link key={label} href={href} className="inline-flex min-h-11 shrink-0 items-center gap-2 rounded-[14px] border surface px-4 text-xs font-semibold text-main"><Icon size={15}/>{label}</Link>)}
    </section>

    {featured&&<section>
      <div className="mb-3 flex items-center justify-between"><div><p className="text-xs font-semibold uppercase tracking-[.14em] text-siam-500">FEATURED</p><h2 className="mt-1 text-xl font-bold text-main">เกมแนะนำวันนี้</h2></div></div>
      <Link href={featured.route} className="card-press relative block overflow-hidden rounded-[26px] bg-gradient-to-br from-[#0b1f49] via-[#174bd2] to-[#17c8ff] p-6 text-white shadow-md sm:p-8">
        <div className="absolute inset-0 opacity-20" style={{backgroundImage:"radial-gradient(circle at 20% 20%, white 0 1px, transparent 1.3px)",backgroundSize:"24px 24px"}}/>
        <div className="relative grid gap-6 sm:grid-cols-[1.4fr_.6fr] sm:items-end">
          <div>
            <p className="text-xs font-semibold text-white/60">{featured.category} • {featured.difficulty}</p>
            <div className="mt-4 font-mono text-5xl font-extrabold tracking-[-.07em] sm:text-7xl">10.000</div>
            <h3 className="mt-2 text-xl font-bold">{featured.shortName}</h3>
            <p className="mt-2 max-w-md text-sm leading-6 text-white/72">{featured.description}</p>
          </div>
          <div className="sm:text-right"><span className="inline-flex min-h-12 items-center gap-2 rounded-[14px] bg-white px-5 text-sm font-bold text-[#10275a]">เล่นเลย <ArrowRight size={16}/></span></div>
        </div>
      </Link>
    </section>}

    <HomeRecentGames/>

    <section>
      <div className="mb-4 flex items-end justify-between gap-4"><div><p className="text-xs font-semibold uppercase tracking-[.14em] text-siam-500">DISCOVER</p><h2 className="mt-1 text-xl font-bold text-main">เกมทั้งหมด</h2></div><Link href="/games" className="text-xs font-semibold text-siam-600">ดูทั้งหมด</Link></div>
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">{activeGames.map(game=><GameCard key={game.id} game={game}/>)}</div>
    </section>
  </div>;
}
