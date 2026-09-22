import Link from "next/link";
import { ChevronLeft, MoreHorizontal } from "lucide-react";
import { Perfect10Game } from "@/games/perfect-10/Perfect10Game";

export default function Perfect10Page() {
  return (
    <div className="-mx-4 -mt-4 min-h-[100dvh] sm:-mx-6 lg:-mx-8">
      <div className="mx-auto flex h-14 max-w-xl items-center justify-between px-4">
        <Link href="/games" aria-label="กลับ" className="grid h-10 w-10 place-items-center rounded-xl surface"><ChevronLeft size={20}/></Link>
        <p className="text-sm font-semibold text-main">Perfect 10</p>
        <span className="grid h-10 w-10 place-items-center text-muted"><MoreHorizontal size={20}/></span>
      </div>
      <div className="px-4 pb-5"><Perfect10Game /></div>
    </div>
  );
}
