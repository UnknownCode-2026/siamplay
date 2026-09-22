"use client";

import Link from "next/link";
import { Info, Monitor, Moon, Sparkles, Sun, Volume2, Vibrate } from "lucide-react";
import { useEffect, useState } from "react";
import { ResetDataButton } from "@/components/settings/ResetDataButton";

type Theme="system"|"light"|"dark";
type Settings={sound:boolean;vibration:boolean;motion:boolean;theme:Theme};
const defaults:Settings={sound:true,vibration:true,motion:true,theme:"system"};

export default function SettingsPage(){
  const [settings,setSettings]=useState<Settings>(defaults);

  useEffect(()=>{
    try{const raw=localStorage.getItem("siamplay-settings");const saved=raw?JSON.parse(raw):{};const next={...defaults,...saved,theme:saved.theme??(saved.dark?"dark":"system")};setSettings(next);}catch{}
  },[]);

  function applyTheme(theme:Theme){
    const dark=theme==="dark"||(theme==="system"&&window.matchMedia("(prefers-color-scheme: dark)").matches);
    document.documentElement.classList.toggle("dark",dark);
  }
  function save(next:Settings){setSettings(next);localStorage.setItem("siamplay-settings",JSON.stringify(next));applyTheme(next.theme);}
  function toggle(key:"sound"|"vibration"|"motion"){save({...settings,[key]:!settings[key]});}

  return <div className="space-y-6">
    <div className="pt-1"><p className="text-xs font-semibold uppercase tracking-[.14em] text-siam-500">SETTINGS</p><h1 className="mt-2 text-3xl font-extrabold tracking-[-.04em] text-main">ตั้งค่า</h1><p className="mt-2 text-sm text-muted">ปรับการเล่นและหน้าตาของ SiamPlay บนอุปกรณ์นี้</p></div>

    <section><p className="mb-2 px-1 text-xs font-semibold text-muted">การเล่น</p><div className="overflow-hidden rounded-[18px] border surface">
      {[["sound",Volume2,"เสียง","เสียงเอฟเฟกต์ภายในเกม"],["vibration",Vibrate,"การสั่น","แรงสั่นตอบสนองบนอุปกรณ์ที่รองรับ"],["motion",Sparkles,"แอนิเมชัน","เอฟเฟกต์การเคลื่อนไหวของเว็บไซต์"]].map(([key,Icon,title,desc]:any,index)=><div key={key} className={`flex items-center gap-3 p-4 ${index?"border-t":""}`} style={{borderColor:"var(--border)"}}><span className="grid h-10 w-10 place-items-center rounded-[14px] surface-3 text-siam-600"><Icon size={18}/></span><div className="min-w-0 flex-1"><p className="text-sm font-semibold text-main">{title}</p><p className="mt-0.5 text-xs text-muted">{desc}</p></div><button onClick={()=>toggle(key)} className={`relative h-8 w-14 rounded-full ${(settings as any)[key]?"bg-siam-600":"bg-slate-300 dark:bg-slate-600"}`}><span className={`absolute top-1 h-6 w-6 rounded-full bg-white shadow ${(settings as any)[key]?"left-7":"left-1"}`}/></button></div>)}
    </div></section>

    <section><p className="mb-2 px-1 text-xs font-semibold text-muted">ธีม</p><div className="grid grid-cols-3 gap-2">{[["system",Monitor,"ระบบ"],["light",Sun,"สว่าง"],["dark",Moon,"มืด"]].map(([value,Icon,label]:any)=><button key={value} onClick={()=>save({...settings,theme:value})} className={`rounded-[16px] border p-4 text-center ${settings.theme===value?"border-siam-500 bg-[color:var(--surface-3)]":"surface"}`}><Icon size={19} className="mx-auto text-siam-600"/><p className="mt-2 text-xs font-semibold text-main">{label}</p></button>)}</div></section>

    <section><p className="mb-2 px-1 text-xs font-semibold text-muted">ข้อมูล</p><div className="overflow-hidden rounded-[18px] border surface"><ResetDataButton/><Link href="/about" className="flex items-center gap-3 border-t px-4 py-4" style={{borderColor:"var(--border)"}}><span className="grid h-10 w-10 place-items-center rounded-[14px] surface-3 text-siam-600"><Info size={18}/></span><span><span className="block text-sm font-semibold text-main">เกี่ยวกับ SiamPlay</span><span className="mt-0.5 block text-xs text-muted">เวอร์ชัน 2.0.0</span></span></Link></div></section>
  </div>;
}
