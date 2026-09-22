"use client";

import { Moon, Sparkles, Volume2, Vibrate } from "lucide-react";
import { useEffect, useState } from "react";

type Settings = { sound: boolean; vibration: boolean; motion: boolean; dark: boolean };
const defaults: Settings = { sound: true, vibration: true, motion: true, dark: false };

export default function SettingsPage() {
  const [settings, setSettings] = useState<Settings>(defaults);

  useEffect(() => {
    const raw = localStorage.getItem("siamplay-settings");
    const next = raw ? { ...defaults, ...JSON.parse(raw) } : defaults;
    setSettings(next);
    document.documentElement.classList.toggle("dark", !!next.dark);
  }, []);

  function toggle(key: keyof Settings) {
    const next = { ...settings, [key]: !settings[key] };
    setSettings(next);
    localStorage.setItem("siamplay-settings", JSON.stringify(next));
    if (key === "dark") document.documentElement.classList.toggle("dark", next.dark);
  }

  const rows: [keyof Settings, any, string, string][] = [
    ["sound", Volume2, "เสียง", "เสียงเอฟเฟกต์ภายในเกม"],
    ["vibration", Vibrate, "การสั่น", "สั่นตอบสนองเมื่ออุปกรณ์รองรับ"],
    ["motion", Sparkles, "แอนิเมชัน", "เอฟเฟกต์การเคลื่อนไหวของหน้าเว็บ"],
    ["dark", Moon, "โหมดมืด", "ใช้ธีมมืดสำหรับทั้งเว็บไซต์"],
  ];

  return (
    <div className="space-y-6">
      <div className="pt-2"><p className="text-sm font-black text-siam-500">ปรับแต่ง</p><h1 className="mt-1 text-3xl font-black tracking-tight text-main">ตั้งค่า</h1><p className="mt-2 text-sm text-muted">ค่าของคุณจะบันทึกไว้ในเบราว์เซอร์เครื่องนี้</p></div>
      <section className="overflow-hidden rounded-[1.7rem] border surface shadow-soft">
        {rows.map(([key,Icon,title,desc], index)=>(
          <div key={key} className={`flex items-center gap-3 p-4 sm:p-5 ${index ? "border-t" : ""}`} style={{borderColor:"var(--border)"}}>
            <div className="grid h-11 w-11 shrink-0 place-items-center rounded-2xl bg-siam-50 text-siam-600 dark:bg-siam-500/15 dark:text-sky-300"><Icon size={20}/></div>
            <div className="min-w-0 flex-1"><p className="text-sm font-black text-main">{title}</p><p className="mt-1 text-xs leading-5 text-muted">{desc}</p></div>
            <button onClick={()=>toggle(key)} aria-pressed={settings[key]} className={`relative h-8 w-14 shrink-0 rounded-full transition ${settings[key]?"bg-siam-600":"bg-slate-300 dark:bg-slate-600"}`}><span className={`absolute top-1 h-6 w-6 rounded-full bg-white shadow transition ${settings[key]?"left-7":"left-1"}`}/></button>
          </div>
        ))}
      </section>
    </div>
  );
}
