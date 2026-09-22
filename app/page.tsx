import Link from "next/link";
import { ArrowRight, Smartphone, ShieldCheck, Zap, Gift, Gamepad2 } from "lucide-react";
import { EmptyState } from "@/components/ui/EmptyState";

const categories = ["ทั้งหมด", "เล่นเร็ว", "ความเร็ว", "ฝึกสมอง", "เกมปริศนา", "คลาสสิก"];

export default function HomePage() {
  return (
    <div className="space-y-8">
      <section className="overflow-hidden rounded-[2rem] bg-siam-900 p-6 text-white shadow-soft sm:p-9">
        <div className="max-w-2xl">
          <span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-2 text-xs font-bold"><Gamepad2 size={15} /> สยามเพลย์ V1.0</span>
          <h1 className="mt-5 text-4xl font-black leading-tight sm:text-5xl">เล่นสนุกได้ทุกที่<br/><span className="text-gold">ฟรีทุกเกม</span></h1>
          <p className="mt-4 max-w-xl text-sm leading-7 text-white/75 sm:text-base">เว็บไซต์รวมมินิเกมสำหรับคนไทย เปิดแล้วเล่นได้ทันที ไม่ต้องสมัครสมาชิก และออกแบบให้ใช้งานบนมือถือได้เต็มรูปแบบ</p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Link href="/games" className="inline-flex min-h-12 items-center gap-2 rounded-2xl bg-white px-5 py-3 text-sm font-black text-siam-900">ดูเกมทั้งหมด <ArrowRight size={17}/></Link>
            <Link href="/games?random=1" className="inline-flex min-h-12 items-center rounded-2xl border border-white/20 px-5 py-3 text-sm font-bold">สุ่มเกมให้ฉัน</Link>
          </div>
        </div>
      </section>

      <section>
        <div className="flex gap-2 overflow-x-auto pb-2">
          {categories.map((name, i) => <span key={name} className={`whitespace-nowrap rounded-full px-4 py-2 text-sm font-bold ${i === 0 ? "bg-siam-600 text-white" : "border border-slate-200 bg-white text-slate-600"}`}>{name}</span>)}
        </div>
      </section>

      <section className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {[
          [Gift, "ฟรี 100%", "ทุกเกมเล่นฟรี ไม่มีค่าใช้จ่าย"],
          [ShieldCheck, "ไม่ต้องสมัคร", "ไม่ต้องล็อกอินหรือกรอกข้อมูล"],
          [Zap, "เล่นได้ทันที", "เปิดเว็บ เลือกเกม แล้วเริ่มเล่น"],
          [Smartphone, "มือถือเต็มรูปแบบ", "ออกแบบ Mobile First ตั้งแต่ต้น"],
        ].map(([Icon, title, desc]: any) => (
          <div key={title} className="rounded-3xl border border-slate-200 bg-white p-5 shadow-soft">
            <div className="mb-4 grid h-11 w-11 place-items-center rounded-2xl bg-siam-50 text-siam-600"><Icon size={21}/></div>
            <h2 className="font-black text-siam-900">{title}</h2>
            <p className="mt-1 text-sm leading-6 text-slate-500">{desc}</p>
          </div>
        ))}
      </section>

      <section>
        <div className="mb-4 flex items-end justify-between gap-4">
          <div><p className="text-xs font-black uppercase tracking-[.2em] text-siam-500">เกมแนะนำ</p><h2 className="mt-1 text-2xl font-black text-siam-900">เตรียมพบกับเกมแรก</h2></div>
          <Link href="/games" className="text-sm font-bold text-siam-600">ดูทั้งหมด</Link>
        </div>
        <EmptyState title="เกมกำลังเดินทางมา" description="SiamPlay V1.0 เป็นเวอร์ชันวางรากฐานเว็บไซต์ เกมแรกจะถูกเพิ่มในเวอร์ชันถัดไป" />
      </section>
    </div>
  );
}