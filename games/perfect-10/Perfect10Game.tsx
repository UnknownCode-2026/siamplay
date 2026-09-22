"use client";

import { Home, RotateCcw, Trophy } from "lucide-react";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { recordPerfect10, type GameStat } from "@/lib/game-stats";
import { STORAGE_KEYS, safeRead, safeWrite } from "@/lib/storage";

type Phase="ready"|"running"|"result";
function label(v:number){const d=Math.abs(10-v);if(d<=.01)return"สมบูรณ์แบบ!";if(d<=.05)return"ใกล้มาก!";if(d<=.2)return"ยอดเยี่ยม";if(d<=.5)return"ดีมาก";return"ลองอีกครั้ง";}

export function Perfect10Game(){
  const [phase,setPhase]=useState<Phase>("ready");
  const [elapsed,setElapsed]=useState(0);
  const [best,setBest]=useState<number|null>(null);
  const [newBest,setNewBest]=useState(false);
  const startRef=useRef(0);
  const rafRef=useRef<number|null>(null);

  useEffect(()=>{
    const stats=safeRead<Record<string,GameStat>>(STORAGE_KEYS.stats,{});
    setBest(stats["perfect-10"]?.bestValue??null);
    const recent=safeRead<string[]>(STORAGE_KEYS.recent,[]);
    safeWrite(STORAGE_KEYS.recent,["perfect-10",...recent.filter(id=>id!=="perfect-10")].slice(0,8));
    return ()=>{if(rafRef.current)cancelAnimationFrame(rafRef.current);};
  },[]);

  function tick(now:number){setElapsed((now-startRef.current)/1000);rafRef.current=requestAnimationFrame(tick);}
  function start(){if(rafRef.current)cancelAnimationFrame(rafRef.current);setNewBest(false);setElapsed(0);setPhase("running");startRef.current=performance.now();rafRef.current=requestAnimationFrame(tick);}
  function finish(){
    if(phase!=="running")return;
    if(rafRef.current)cancelAnimationFrame(rafRef.current);
    const value=(performance.now()-startRef.current)/1000;
    const wasBest=best==null||Math.abs(10-value)<Math.abs(10-best);
    setElapsed(value);setPhase("result");setNewBest(wasBest);
    const stat=recordPerfect10(value);setBest(stat.bestValue);
    const settings=safeRead<{vibration?:boolean}>(STORAGE_KEYS.settings,{vibration:true});
    if(settings.vibration&&"vibrate"in navigator)navigator.vibrate(wasBest?[35,30,35]:35);
  }
  function reset(){if(rafRef.current)cancelAnimationFrame(rafRef.current);setElapsed(0);setNewBest(false);setPhase("ready");}
  const diff=elapsed-10;

  return <div className="mx-auto flex min-h-[calc(100dvh-74px)] max-w-xl">
    <div className="relative flex w-full flex-col overflow-hidden rounded-[24px] bg-gradient-to-b from-[#071731] via-[#0a2250] to-[#103b7e] p-4 text-white shadow-md">
      <div className="flex items-center justify-between gap-4"><div><p className="text-xs font-medium text-white/55">เป้าหมาย</p><p className="mt-1 text-lg font-bold">10.000 วินาที</p></div><div className="text-right"><p className="text-xs font-medium text-white/55">สถิติดีที่สุด</p><p className="mt-1 font-mono text-sm font-bold">{best==null?"--":best.toFixed(3)+" วิ"}</p></div></div>

      <div className="grid flex-1 place-items-center py-8 text-center">
        <div><p className="text-sm font-medium text-white/55">{phase==="ready"?"กดเริ่มเมื่อพร้อม":phase==="running"?"หยุดเมื่อคิดว่าครบ 10 วินาที":"ผลลัพธ์ของคุณ"}</p><div className="mt-5 font-mono text-[21vw] font-extrabold leading-none tracking-[-.07em] sm:text-8xl">{elapsed.toFixed(3)}</div></div>
      </div>

      {phase==="ready"&&<button onClick={start} className="min-h-16 rounded-[16px] bg-white text-lg font-bold text-[#10275a]">เริ่มเล่น</button>}
      {phase==="running"&&<button onClick={finish} className="min-h-20 rounded-[16px] bg-[#ffc857] text-2xl font-extrabold text-[#10275a] active:scale-[.99]">หยุด!</button>}

      {phase==="result"&&<div className="absolute inset-0 flex items-end bg-[#041126]/45 p-3 backdrop-blur-[2px]"><div className="w-full rounded-[22px] bg-white p-5 text-[#0b1220] shadow-2xl">
        <div className="text-center">{newBest&&<div className="mx-auto mb-3 inline-flex items-center gap-2 rounded-full bg-amber-50 px-3 py-1.5 text-xs font-bold text-amber-700"><Trophy size={14}/> NEW BEST</div>}<p className="text-sm font-bold text-siam-600">{label(elapsed)}</p><p className="mt-2 font-mono text-4xl font-extrabold tracking-[-.06em]">{elapsed.toFixed(3)}</p><p className="mt-2 text-sm text-slate-500">คลาดเคลื่อน {diff>=0?"+":""}{diff.toFixed(3)} วินาที</p></div>
        <button onClick={start} className="mt-5 min-h-13 w-full rounded-[14px] bg-siam-600 px-4 py-3.5 text-sm font-bold text-white">เล่นอีกครั้ง</button>
        <div className="mt-2 grid grid-cols-2 gap-2"><button onClick={reset} className="inline-flex items-center justify-center gap-2 rounded-[14px] bg-slate-100 px-3 py-3 text-sm font-semibold text-slate-600"><RotateCcw size={15}/> รีเซ็ต</button><Link href="/" className="inline-flex items-center justify-center gap-2 rounded-[14px] bg-slate-100 px-3 py-3 text-sm font-semibold text-slate-600"><Home size={15}/> หน้าหลัก</Link></div>
      </div></div>}
    </div>
  </div>;
}
