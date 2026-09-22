"use client";

import { RotateCcw, Trophy } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { recordPerfect10, type GameStat } from "@/lib/game-stats";
import { STORAGE_KEYS, safeRead, safeWrite } from "@/lib/storage";

type Phase = "ready" | "running" | "result";
function resultLabel(value:number){const d=Math.abs(10-value);if(d<=.01)return"สมบูรณ์แบบ!";if(d<=.05)return"ใกล้มาก!";if(d<=.2)return"ยอดเยี่ยม";if(d<=.5)return"ดีมาก";return"ลองอีกครั้ง";}

export function Perfect10Game() {
  const [phase,setPhase]=useState<Phase>("ready");
  const [elapsed,setElapsed]=useState(0);
  const [best,setBest]=useState<number|null>(null);
  const startRef=useRef(0);
  const rafRef=useRef<number|null>(null);

  useEffect(()=>{const stats=safeRead<Record<string,GameStat>>(STORAGE_KEYS.stats,{});setBest(stats["perfect-10"]?.bestValue??null);const recent=safeRead<string[]>(STORAGE_KEYS.recent,[]);safeWrite(STORAGE_KEYS.recent,["perfect-10",...recent.filter(id=>id!=="perfect-10")].slice(0,5));},[]);
  useEffect(()=>{function hidden(){if(document.hidden&&phase==="running")finish();}document.addEventListener("visibilitychange",hidden);return()=>document.removeEventListener("visibilitychange",hidden);});

  function tick(now:number){setElapsed((now-startRef.current)/1000);rafRef.current=requestAnimationFrame(tick);}
  function start(){setElapsed(0);setPhase("running");startRef.current=performance.now();rafRef.current=requestAnimationFrame(tick);}
  function finish(){if(phase!=="running")return;if(rafRef.current)cancelAnimationFrame(rafRef.current);const value=(performance.now()-startRef.current)/1000;setElapsed(value);setPhase("result");const stat=recordPerfect10(value);setBest(stat.bestValue);const settings=safeRead<{vibration?:boolean}>(STORAGE_KEYS.settings,{vibration:true});if(settings.vibration&&"vibrate"in navigator)navigator.vibrate(35);}
  function reset(){if(rafRef.current)cancelAnimationFrame(rafRef.current);setElapsed(0);setPhase("ready");}
  const diff=elapsed-10;

  return (
    <div className="mx-auto flex min-h-[calc(100dvh-130px)] max-w-xl items-center">
      <div className="w-full">
        <div className="mb-4 flex items-center justify-between gap-3">
          <div><p className="text-xs font-black uppercase tracking-[.16em] text-siam-500">Perfect 10</p><h1 className="mt-1 text-xl font-black text-main">หยุดเวลา 10.000 วิ</h1></div>
          <div className="rounded-2xl border surface px-3 py-2 text-right"><p className="text-[10px] font-bold text-muted">ดีที่สุด</p><p className="text-sm font-black text-main">{best==null?"--":best.toFixed(3)+" วิ"}</p></div>
        </div>

        <div className="overflow-hidden rounded-[2rem] bg-gradient-to-b from-[#081a3a] to-[#0b285c] p-5 text-white shadow-soft">
          <div className="grid min-h-[48dvh] place-items-center text-center">
            <div>
              <p className="text-sm font-bold text-white/60">{phase==="ready"?"เป้าหมาย 10.000 วินาที":phase==="running"?"แตะเมื่อคิดว่าครบ 10 วิ":resultLabel(elapsed)}</p>
              <div className="mt-5 font-mono text-[18vw] font-black leading-none tracking-[-.05em] sm:text-7xl">{elapsed.toFixed(3)}</div>
              {phase==="result"&&<p className="mt-4 text-sm font-bold text-white/70">คลาดเคลื่อน {diff>=0?"+":""}{diff.toFixed(3)} วิ</p>}
            </div>
          </div>
          {phase==="ready"&&<button onClick={start} className="min-h-16 w-full rounded-[1.4rem] bg-white px-5 py-4 text-lg font-black text-[#10275a]">เริ่ม!</button>}
          {phase==="running"&&<button onClick={finish} className="min-h-20 w-full rounded-[1.4rem] bg-[#ffd36b] px-5 py-4 text-2xl font-black text-[#10275a] active:scale-[.99]">หยุด!</button>}
          {phase==="result"&&<div className="grid grid-cols-2 gap-3"><button onClick={reset} className="inline-flex min-h-14 items-center justify-center gap-2 rounded-2xl bg-white/10 px-4 font-black text-white"><RotateCcw size={18}/> รีเซ็ต</button><button onClick={start} className="inline-flex min-h-14 items-center justify-center gap-2 rounded-2xl bg-white px-4 font-black text-[#10275a]"><Trophy size={18}/> เล่นอีกครั้ง</button></div>}
        </div>

        <p className="mt-4 text-center text-xs leading-5 text-muted">กดเริ่ม แล้วหยุดให้ใกล้ 10.000 วินาทีที่สุด ยิ่งคลาดเคลื่อนน้อยยิ่งดี</p>
      </div>
    </div>
  );
}
