"use client";

import { useEffect, useState } from "react";

type SettingKey = "sound" | "vibration" | "motion";

export default function SettingsPage() {
  const [settings, setSettings] = useState<Record<SettingKey, boolean>>({ sound: true, vibration: true, motion: true });

  useEffect(() => {
    const raw = localStorage.getItem("siamplay-settings");
    if (raw) setSettings(JSON.parse(raw));
  }, []);

  function toggle(key: SettingKey) {
    const next = { ...settings, [key]: !settings[key] };
    setSettings(next);
    localStorage.setItem("siamplay-settings", JSON.stringify(next));
  }

  const rows: [SettingKey,string,string][] = [
    ["sound","เสียง","เปิดหรือปิดเสียงของเกมในอนาคต"],
    ["vibration","การสั่น","ใช้แรงสั่นตอบสนองบนอุปกรณ์ที่รองรับ"],
    ["motion","แอนิเมชัน","เปิดเอฟเฟกต์การเคลื่อนไหวของหน้าเว็บ"],
  ];

  return (
    <div className="space-y-6">
      <div><p className="text-sm font-black text-siam-500">ปรับแต่ง</p><h1 className="mt-1 text-3xl font-black text-siam-900">ตั้งค่า</h1><p className="mt-2 text-sm text-slate-500">การตั้งค่าจะถูกบันทึกไว้ในเบราว์เซอร์ของเครื่องนี้</p></div>
      <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-soft">
        {rows.map(([key,title,desc], index)=>(
          <div key={key} className={`flex items-center gap-4 p-5 ${index ? "border-t border-slate-100" : ""}`}>
            <div className="min-w-0 flex-1"><p className="font-black text-siam-900">{title}</p><p className="mt-1 text-sm text-slate-500">{desc}</p></div>
            <button onClick={()=>toggle(key)} aria-pressed={settings[key]} className={`relative h-8 w-14 rounded-full transition ${settings[key]?"bg-siam-600":"bg-slate-300"}`}>
              <span className={`absolute top-1 h-6 w-6 rounded-full bg-white transition ${settings[key]?"left-7":"left-1"}`}/>
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}