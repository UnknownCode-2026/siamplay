"use client";

import { Heart, History, Search, Shuffle } from "lucide-react";
import { useEffect, useMemo, useRef, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import type { GameDefinition } from "@/types/game";
import { GameCard } from "@/components/games/GameCard";
import { STORAGE_KEYS, safeRead } from "@/lib/storage";

const categories=["ทั้งหมด","เล่นเร็ว","ความเร็ว","ฝึกสมอง","เกมปริศนา","คลาสสิก"] as const;

export function GamesBrowser({games,initialView="all",autoFocus=false}:{games:GameDefinition[];initialView?:"all"|"favorites"|"recent";autoFocus?:boolean}){
  const params=useSearchParams();
  const [query,setQuery]=useState("");
  const [category,setCategory]=useState<string>(params.get("category")||"ทั้งหมด");
  const [view,setView]=useState<"all"|"favorites"|"recent">(initialView);
  const [favorites,setFavorites]=useState<string[]>([]);
  const [recent,setRecent]=useState<string[]>([]);
  const inputRef=useRef<HTMLInputElement>(null);
  const router=useRouter();

  useEffect(()=>{
    setFavorites(safeRead<string[]>(STORAGE_KEYS.favorites,[]));
    setRecent(safeRead<string[]>(STORAGE_KEYS.recent,[]));
    if(autoFocus)setTimeout(()=>inputRef.current?.focus(),80);
  },[autoFocus]);

  const filtered=useMemo(()=>{
    const q=query.trim().toLowerCase();
    return games.filter(game=>{
      if(view==="favorites"&&!favorites.includes(game.id))return false;
      if(view==="recent"&&!recent.includes(game.id))return false;
      if(category!=="ทั้งหมด"&&game.category!==category)return false;
      const haystack=[game.name,game.shortName,game.description,game.category,...(game.keywords??[])].join(" ").toLowerCase();
      return !q||haystack.includes(q);
    }).sort((a,b)=>view==="recent"?recent.indexOf(a.id)-recent.indexOf(b.id):0);
  },[games,query,category,view,favorites,recent]);

  function randomGame(){if(games.length)router.push(games[Math.floor(Math.random()*games.length)].route);}

  return <div className="space-y-5">
    <label className="flex min-h-14 items-center gap-3 rounded-[16px] border surface px-4 shadow-sm">
      <Search size={18} className="text-muted"/>
      <input ref={inputRef} value={query} onChange={e=>setQuery(e.target.value)} className="w-full bg-transparent text-sm font-medium text-main outline-none placeholder:text-muted" placeholder="พิมพ์ชื่อเกม..."/>
      <button type="button" onClick={randomGame} aria-label="สุ่มเกม" className="grid h-9 w-9 shrink-0 place-items-center rounded-[12px] bg-siam-600 text-white"><Shuffle size={16}/></button>
    </label>

    <div className="rail flex gap-2 overflow-x-auto pb-1">
      {[["all","ทั้งหมด",null],["favorites","เกมโปรด",Heart],["recent","เล่นล่าสุด",History]].map(([id,label,Icon]:any)=><button key={id} onClick={()=>setView(id)} className={`inline-flex min-h-10 items-center gap-2 whitespace-nowrap rounded-[12px] px-3.5 text-xs font-semibold ${view===id?"bg-siam-600 text-white":"border surface text-muted"}`}>{Icon&&<Icon size={14}/>} {label}</button>)}
    </div>

    <div className="rail flex gap-2 overflow-x-auto pb-1">
      {categories.map(name=><button key={name} onClick={()=>setCategory(name)} className={`whitespace-nowrap rounded-full px-3.5 py-2 text-xs font-medium ${category===name?"bg-[color:var(--surface-3)] text-siam-600":"text-muted"}`}>{name}</button>)}
    </div>

    <div className="flex items-center justify-between">
      <p className="text-sm font-bold text-main">{view==="favorites"?"เกมโปรด":view==="recent"?"เล่นล่าสุด":"เกมทั้งหมด"}</p>
      <p className="text-xs text-muted">{filtered.length} เกม</p>
    </div>

    {filtered.length?<div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">{filtered.map(game=><GameCard key={game.id} game={game}/>)}</div>:<div className="rounded-[18px] border surface p-10 text-center"><p className="text-sm font-bold text-main">ยังไม่มีเกมในรายการนี้</p><p className="mt-1 text-xs text-muted">ลองค้นหาด้วยคำอื่นหรือเปลี่ยนหมวดเกม</p></div>}
  </div>;
}
