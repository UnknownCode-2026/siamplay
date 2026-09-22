"use client";

import Link from "next/link";
import { Info, Moon, Sparkles, Volume2, Vibrate } from "lucide-react";
import { useEffect, useState } from "react";
import { ResetDataButton } from "@/components/settings/ResetDataButton";

type Settings = { sound:boolean; vibration:boolean; motion:boolean; dark:boolean };
const defaults:Settings={sound:true,vibration:true,motion:true,dark:false};

export default function SettingsPage(){
  const [settings,setSettings]=useState<Settings>(defaults);
  useEffect(()=>{const raw=localStorage.getItem("siamplay-settings");const next=raw?{...defaults,...JSON.parse(raw)}:defaults;setSettings(next);document.documentElement.classList.toggle("dark",!!next.dark);},[]);
  function toggle(key:keyof Settings){const next={...settings,[key]:!settings[key]};setSettings(next);localStorage.setItem("siamplay-settings",JSON.stringify(next));if(key==="dark")document.documentElement.classList.toggle("dark",next.dark);}

  const rows:[keyof Settings,any,string,string][]=[
    ["sound",Volume2,"เสียง","เสียงเอฟเฟกต์ภายในเกม"],
    ["vibration",Vibrate,"การสั่น","สั่นตอบสนองบนอุปกรณ์ที่รองรับ"],
    ["motion",Sparkles,"แอนิเมชัน","เอฟเฟกต์การเคลื่อนไหว"],
    ["dark",Moon,"โหมดมืด","เปลี่ยนหน้าตาเว็บไซต์เป็นธีมมืด"],
  ];

  return <div className="space-y-5">
    <div className="pt-1"><p className="text-sm font-medium text-siam-500">ปรับแต่ง</p><h1 className="mt-1 text-3xl font-bold tracking-tight text-main">ตั้งค่า</h1><p className="mt-2 text-sm text-muted">ควบคุมประสบการณ์การเล่นบนอุปกรณ์นี้</p></div>

    <section><p className="mb-2 px-1 text-xs font-semibold text-muted">การเล่นและการแสดงผล</p><div className="overflow-hidden rounded-[1.4rem] border surface">
      {rows.map(([key,Icon,title,desc],index)=><div key={key} className={`flex items-center gap-3 p-4 ${index?"border-t":""}`} style={{borderColor:"var(--border)"}}><span className="grid h-10 w-10 shrink-0 place-items-center rounded-2xl surface-soft text-siam-600"><Icon size={18}/></span><div className="min-w-0 flex-1"><p className="text-sm font-semibold text-main">{title}</p><p className="mt-0.5 text-xs text-muted">{desc}</p></div><button onClick={()=>toggle(key)} aria-pressed={settings[key]} className={`relative h-8 w-14 shrink-0 rounded-full transition ${settings[key]?"bg-siam-600":"bg-slate-300 dark:bg-slate-600"}`}><span className={`absolute top-1 h-6 w-6 rounded-full bg-white shadow transition ${settings[key]?"left-7":"left-1"}`}/></button></div>)}
    </div></section>

    <section><p className="mb-2 px-1 text-xs font-semibold text-muted">ข้อมูล</p><div className="overflow-hidden rounded-[1.4rem] border surface">
      <ResetDataButton/>
      <Link href="/about" className="flex items-center gap-3 border-t px-4 py-4" style={{borderColor:"var(--border)"}}><span className="grid h-10 w-10 shrink-0 place-items-center rounded-2xl surface-soft text-siam-600"><Info size={18}/></span><span><span className="block text-sm font-semibold text-main">เกี่ยวกับ SiamPlay</span><span className="mt-0.5 block text-xs text-muted">ข้อมูลเว็บไซต์และแนวทางการใช้งาน</span></span></Link>
    </div></section>
  </div>;
}
