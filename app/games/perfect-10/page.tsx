import type { Metadata } from "next";
import Link from "next/link";
import { ChevronLeft, MoreHorizontal } from "lucide-react";
import { Perfect10Game } from "@/games/perfect-10/Perfect10Game";

export const metadata:Metadata={
  title:"Perfect 10 - เกมหยุดเวลา 10 วินาที | SiamPlay",
  description:"ทดสอบความแม่นยำของคุณ หยุดเวลาให้ใกล้ 10.000 วินาทีที่สุด เล่นฟรีบน SiamPlay",
};

export default function Perfect10Page(){
  return <div className="-mx-4 -mt-5 min-h-[100dvh] sm:-mx-6 lg:-mx-8">
    <div className="mx-auto flex h-14 max-w-xl items-center justify-between px-4">
      <Link href="/games" aria-label="กลับ" className="grid h-10 w-10 place-items-center rounded-[14px] border surface"><ChevronLeft size={20}/></Link>
      <p className="text-sm font-bold text-main">Perfect 10</p>
      <span className="grid h-10 w-10 place-items-center text-muted"><MoreHorizontal size={20}/></span>
    </div>
    <div className="px-4 pb-4"><Perfect10Game/></div>
  </div>;
}
