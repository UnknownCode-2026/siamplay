"use client";

import { RotateCcw, Trophy } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { recordPerfect10, type GameStat } from "@/lib/game-stats";
import { STORAGE_KEYS, safeRead, safeWrite } from "@/lib/storage";

type Phase = "ready" | "running" | "result";

function resultLabel(value: number) {
  const diff = Math.abs(10 - value);
  if (diff <= 0.01) return "สมบูรณ์แบบ!";
  if (diff <= 0.05) return "ใกล้มาก!";
  if (diff <= 0.2) return "ยอดเยี่ยม";
  if (diff <= 0.5) return "ดีมาก";
  return "ลองอีกครั้ง";
}

export function Perfect10Game() {
  const [phase, setPhase] = useState<Phase>("ready");
  const [elapsed, setElapsed] = useState(0);
  const [best, setBest] = useState<number | null>(null);
  const startRef = useRef(0);
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    const stats = safeRead<Record<string, GameStat>>(STORAGE_KEYS.stats, {});
    setBest(stats["perfect-10"]?.bestValue ?? null);
    const recent = safeRead<string[]>(STORAGE_KEYS.recent, []);
    safeWrite(STORAGE_KEYS.recent, ["perfect-10", ...recent.filter((id) => id !== "perfect-10")].slice(0, 5));
  }, []);

  useEffect(() => {
    function stopOnHidden() {
      if (document.hidden && phase === "running") finish();
    }
    document.addEventListener("visibilitychange", stopOnHidden);
    return () => document.removeEventListener("visibilitychange", stopOnHidden);
  });

  function tick(now: number) {
    setElapsed((now - startRef.current) / 1000);
    rafRef.current = requestAnimationFrame(tick);
  }

  function start() {
    setElapsed(0);
    setPhase("running");
    startRef.current = performance.now();
    rafRef.current = requestAnimationFrame(tick);
  }

  function finish() {
    if (phase !== "running") return;
    if (rafRef.current) cancelAnimationFrame(rafRef.current);
    const value = (performance.now() - startRef.current) / 1000;
    setElapsed(value);
    setPhase("result");
    const stat = recordPerfect10(value);
    setBest(stat.bestValue);
    const settings = safeRead<{ vibration?: boolean }>(STORAGE_KEYS.settings, { vibration: true });
    if (settings.vibration && "vibrate" in navigator) navigator.vibrate(35);
  }

  function reset() {
    if (rafRef.current) cancelAnimationFrame(rafRef.current);
    setElapsed(0);
    setPhase("ready");
  }

  const diff = elapsed - 10;

  return (
    <div className="mx-auto max-w-xl">
      <div className="rounded-[2rem] border border-slate-200 bg-white p-5 shadow-soft sm:p-8">
        <div className="flex items-center justify-between gap-4">
          <div>
            <p className="text-xs font-black uppercase tracking-[.18em] text-siam-500">Perfect 10</p>
            <h1 className="mt-1 text-2xl font-black text-siam-900">หยุดเวลา 10.000 วิ</h1>
          </div>
          <div className="rounded-2xl bg-siam-50 px-3 py-2 text-right">
            <p className="text-[11px] font-bold text-slate-500">สถิติดีที่สุด</p>
            <p className="font-black text-siam-900">{best == null ? "--" : best.toFixed(3) + " วิ"}</p>
          </div>
        </div>

        <div className="my-8 grid min-h-56 place-items-center rounded-3xl bg-siam-900 px-4 text-center text-white">
          <div>
            <p className="text-sm font-bold text-white/60">{phase === "ready" ? "เป้าหมาย 10.000 วินาที" : phase === "running" ? "จับเวลาอยู่..." : resultLabel(elapsed)}</p>
            <div className="mt-3 font-mono text-6xl font-black tracking-tight sm:text-7xl">{elapsed.toFixed(3)}</div>
            {phase === "result" && <p className="mt-3 text-sm font-bold text-white/75">คลาดเคลื่อน {diff >= 0 ? "+" : ""}{diff.toFixed(3)} วิ</p>}
          </div>
        </div>

        {phase === "ready" && <button onClick={start} className="min-h-14 w-full rounded-2xl bg-siam-600 px-5 py-4 text-base font-black text-white">เริ่มจับเวลา</button>}
        {phase === "running" && <button onClick={finish} className="min-h-14 w-full rounded-2xl bg-gold px-5 py-4 text-base font-black text-siam-900">หยุด!</button>}
        {phase === "result" && (
          <div className="grid grid-cols-2 gap-3">
            <button onClick={reset} className="inline-flex min-h-14 items-center justify-center gap-2 rounded-2xl border border-slate-200 bg-white px-4 py-4 font-black text-siam-900"><RotateCcw size={18}/> เล่นใหม่</button>
            <button onClick={start} className="inline-flex min-h-14 items-center justify-center gap-2 rounded-2xl bg-siam-900 px-4 py-4 font-black text-white"><Trophy size={18}/> ลองอีกครั้ง</button>
          </div>
        )}

        <div className="mt-6 rounded-2xl bg-slate-50 p-4 text-sm leading-6 text-slate-600">
          <span className="font-black text-siam-900">วิธีเล่น:</span> กดเริ่ม แล้วพยายามกดหยุดให้ตรง 10.000 วินาทีที่สุด ยิ่งคลาดเคลื่อนน้อยยิ่งดี
        </div>
      </div>
    </div>
  );
}
