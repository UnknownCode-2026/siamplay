"use client";

import { RotateCcw, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { recordPerfect10, type GameStat } from "@/lib/game-stats";
import { STORAGE_KEYS, safeRead, safeWrite } from "@/lib/storage";

type Phase="ready"|"running"|"result";
function resultLabel(value:number){const d=Math.abs(10-value);if(d<=.01)return"สมบูรณ์แบบ!";if(d<=.05)return"ใกล้มาก!";if(d<=.2)return"ยอดเยี่ยม";if(d<=.5)return"ดีมาก";return"ลองอีกครั้ง";}

export function Perfect10Game(){
 const [phase,setPhase]=useState<Phase>("ready"); const [elapsed,setElapsed]=useState(0); const [best,setBest]=useState<number|null>(null); const startRef=useRef(0); const rafRef=useRef<number|null>(null);
 useEffect(()=>{const stats=safeRead<Record<string,GameStat>>(STORAGE_KEYS.stats,{});setBest(stats["perfect-10"]?.bestValue??null);const recent=safeRead<string[]>(STORAGE_KEYS.recent,[]);safeWrite(STORAGE_KEYS.recent,["perfect-10",...recent.filter(id=>id!=="perfect-10")].slice(0,5));},[]);
 useEffect(()=>{function hidden(){if(document.hidden&&phase==="running")finish();}document.addEventListener("visibilitychange",hidden);return()=>document.removeEventListener("visibilitychange",hidden);});
 function tick(now:number){setElapsed((now-startRef.current)/1000);rafRef.current=requestAnimationFrame(tick);}
 function start(){setElapsed(0);setPhase("running");startRef.current=performance.now();rafRef.current=requestAnimationFrame(tick);}
 function finish(){if(phase!=="running")return;if(rafRef.current)cancelAnimationFrame(rafRef.current);const value=(performance.now()-startRef.current)/1000;setElapsed(value);setPhase("result");const stat=recordPerfect10(value);setBest(stat.bestValue);const settings=safeRead<{vibration?:boolean}>(STORAGE_KEYS.settings,{vibration:true});if(settings.vibration&&"vibrate"in navigator)navigator.vibrate(35);}
 function reset(){if(rafRef.current)cancelAnimationFrame(rafRef.current);setElapsed(0);setPhase("ready");}
 const diff=elapsed-10;

 return <div className="mx-auto flex min-h-[calc(100dvh-76px)] max-w-xl items-stretch">
   <div className="relative flex w-full flex-col overflow-hidden rounded-[1.6rem] bg-gradient-to-b from-[#071936] to-[#0c2d63] p-4 text-white shadow-soft">
     <div className="flex items-center justify-between"><div><p className="text-xs font-medium text-white/55">เป้าหมาย</p><p className="mt-1 text-lg font-semibold">10.000 วินาที</p></div><div className="text-right"><p className="text-xs font-medium text-white/55">ดีที่สุด</p><p className="mt-1 text-sm font-semibold">{best==null?"--":best.toFixed(3)+" วิ"}</p></div></div>
     <div className="grid flex-1 place-items-center py-8 text-center"><div><p className="text-sm font-medium text-white/55">{phase==="ready"?"พร้อมเมื่อไหร่ก็กดเริ่ม":phase==="running"?"หยุดเมื่อคิดว่าครบ 10 วินาที":"ผลลัพธ์"}</p><div className="mt-5 font-mono text-[20vw] font-bold leading-none tracking-[-.055em] sm:text-8xl">{elapsed.toFixed(3)}</div></div></div>
     {phase==="ready"&&<button onClick={start} className="min-h-16 rounded-[1.2rem] bg-white text-lg font-semibold text-[#10275a]">เริ่ม</button>}
     {phase==="running"&&<button onClick={finish} className="min-h-20 rounded-[1.2rem] bg-[#ffd36b] text-2xl font-bold text-[#10275a] active:scale-[.99]">หยุด!</button>}

     {phase==="result"&&<div className="absolute inset-x-3 bottom-3 rounded-[1.5rem] bg-white p-5 text-[#111827] shadow-2xl">
       <div className="flex items-start justify-between gap-4"><div><p className="text-sm font-semibold text-siam-600">{resultLabel(elapsed)}</p><p className="mt-1 text-3xl font-bold">{elapsed.toFixed(3)}</p><p className="mt-2 text-sm text-slate-500">คลาดเคลื่อน {diff>=0?"+":""}{diff.toFixed(3)} วินาที</p></div><button onClick={reset} className="grid h-9 w-9 place-items-center rounded-xl bg-slate-100"><X size={18}/></button></div>
       <button onClick={start} className="mt-5 min-h-13 w-full rounded-xl bg-siam-600 px-4 py-3 text-sm font-semibold text-white">เล่นอีกครั้ง</button>
       <button onClick={reset} className="mt-2 inline-flex w-full items-center justify-center gap-2 py-2 text-sm font-medium text-slate-500"><RotateCcw size={15}/> รีเซ็ต</button>
     </div>}
   </div>
 </div>;
}
