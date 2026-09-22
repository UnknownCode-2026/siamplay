"use client";

import { Search } from "lucide-react";
import { useSearchParams } from "next/navigation";
import { EmptyState } from "@/components/ui/EmptyState";

export default function GamesPage() {
  const params = useSearchParams();
  const random = params.get("random") === "1";
  return (
    <div className="space-y-6">
      <div>
        <p className="text-sm font-black text-siam-500">{random ? "สุ่มเกม" : "คลังเกม"}</p>
        <h1 className="mt-1 text-3xl font-black text-siam-900">{random ? "สุ่มเกมให้ฉัน" : "เกมทั้งหมด"}</h1>
        <p className="mt-2 text-sm text-slate-500">ค้นหาและเลือกเกมที่คุณอยากเล่นได้จากหน้านี้</p>
      </div>

      <label className="flex min-h-12 items-center gap-3 rounded-2xl border border-slate-200 bg-white px-4 shadow-soft">
        <Search size={19} className="text-slate-400"/>
        <input className="w-full bg-transparent text-sm outline-none" placeholder="ค้นหาเกม..." disabled />
      </label>

      <div className="flex gap-2 overflow-x-auto pb-1">
        {["ทั้งหมด","เล่นเร็ว","ความเร็ว","ฝึกสมอง","เกมปริศนา","คลาสสิก"].map((x,i)=><span key={x} className={`whitespace-nowrap rounded-full px-4 py-2 text-sm font-bold ${i===0?"bg-siam-600 text-white":"border border-slate-200 bg-white text-slate-600"}`}>{x}</span>)}
      </div>

      <EmptyState title="ยังไม่มีเกมในตอนนี้" description={random ? "ยังไม่สามารถสุ่มเกมได้ เพราะ V1.0 ยังไม่ได้เพิ่มเกมจริง" : "เกมสนุก ๆ กำลังมาในเวอร์ชันถัดไป"} />
    </div>
  );
}