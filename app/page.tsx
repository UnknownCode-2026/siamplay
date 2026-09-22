import Link from "next/link";
import { ArrowRight, Brain, Clock3, Gamepad2, Search, ShieldCheck, Sparkles, Smartphone, Zap } from "lucide-react";
import { activeGames } from "@/data/games";
import { GameCard } from "@/components/games/GameCard";

export default function HomePage() {
  const featured = activeGames.filter((game) => game.featured);

  return (
    <div className="space-y-8">
      <section className="pt-2">
        <p className="text-sm font-black text-siam-500">สวัสดี 👋</p>
        <h1 className="mt-1 text-3xl font-black tracking-tight text-main sm:text-4xl">วันนี้เล่นอะไรดี?</h1>
        <p className="mt-2 max-w-xl text-sm leading-6 text-muted">เกมสั้น ๆ เล่นฟรี เปิดแล้วเล่นได้ทันทีบนมือถือ</p>

        <Link href="/games" className="mt-5 flex min-h-14 items-center gap-3 rounded-[1.4rem] border surface px-4 shadow-soft">
          <Search size={19} className="text-muted"/>
          <span className="text-sm font-semibold text-muted">ค้นหาเกมที่อยากเล่น...</span>
        </Link>
      </section>

      <section className="overflow-hidden rounded-[2rem] bg-gradient-to-br from-[#071f4f] via-[#1557d6] to-[#16c8ff] p-5 text-white shadow-soft sm:p-8">
        <div className="max-w-2xl">
          <div className="inline-flex items-center gap-2 rounded-full bg-white/12 px-3 py-1.5 text-xs font-black backdrop-blur"><Sparkles size={14}/> เกมแนะนำ</div>
          <h2 className="mt-5 text-3xl font-black leading-tight sm:text-5xl">หยุดเวลาให้ตรง<br/><span className="text-[#ffd36b]">10.000 วินาที</span></h2>
          <p className="mt-3 max-w-lg text-sm leading-6 text-white/75">เกมสั้นแต่ท้าทาย ทดสอบความแม่นยำของคุณและทำลายสถิติเดิมให้ได้</p>
          <Link href="/games/perfect-10" className="mt-5 inline-flex min-h-12 items-center gap-2 rounded-2xl bg-white px-5 py-3 text-sm font-black text-[#10275a]">เล่นตอนนี้ <ArrowRight size={17}/></Link>
        </div>
      </section>

      <section>
        <div className="mb-4 flex items-center justify-between">
          <div><p className="text-xs font-black uppercase tracking-[.16em] text-siam-500">หมวดเกม</p><h2 className="mt-1 text-xl font-black text-main">เลือกตามสไตล์ที่ชอบ</h2></div>
          <Link href="/games" className="text-xs font-black text-siam-600">ดูทั้งหมด</Link>
        </div>
        <div className="grid grid-cols-4 gap-2">
          {[
            [Clock3, "เล่นเร็ว"],
            [Zap, "ความเร็ว"],
            [Brain, "ฝึกสมอง"],
            [Gamepad2, "คลาสสิก"],
          ].map(([Icon,label]:any)=><Link key={label} href="/games" className="rounded-[1.3rem] border surface p-3 text-center shadow-soft"><div className="mx-auto grid h-10 w-10 place-items-center rounded-2xl bg-siam-50 text-siam-600 dark:bg-siam-500/15 dark:text-sky-300"><Icon size={19}/></div><p className="mt-2 text-[11px] font-black text-main">{label}</p></Link>)}
        </div>
      </section>

      <section>
        <div className="mb-4 flex items-end justify-between gap-4">
          <div><p className="text-xs font-black uppercase tracking-[.16em] text-siam-500">เกมเด่น</p><h2 className="mt-1 text-xl font-black text-main">เริ่มเล่นได้เลย</h2></div>
          <Link href="/games" className="text-xs font-black text-siam-600">ดูทั้งหมด</Link>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">{featured.map((game) => <GameCard key={game.id} game={game} />)}</div>
      </section>

      <section className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        {[
          [ShieldCheck, "ไม่ต้องสมัคร", "เข้าแล้วเล่นได้เลย"],
          [Smartphone, "มือถือ 100%", "ออกแบบสำหรับจอสัมผัส"],
          [Zap, "โหลดไว", "เกมทำงานในเบราว์เซอร์"],
          [Sparkles, "ฟรีทุกเกม", "ไม่มีค่าใช้จ่าย"],
        ].map(([Icon,title,desc]:any)=><div key={title} className="rounded-[1.5rem] border surface p-4"><Icon className="text-siam-600" size={20}/><h3 className="mt-3 text-sm font-black text-main">{title}</h3><p className="mt-1 text-xs leading-5 text-muted">{desc}</p></div>)}
      </section>
    </div>
  );
}
