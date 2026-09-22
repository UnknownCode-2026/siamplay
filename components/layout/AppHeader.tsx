"use client";

import Link from "next/link";
import { Search, Settings } from "lucide-react";
import { usePathname } from "next/navigation";

function Wordmark() {
  return (
    <div className="flex items-center gap-2.5">
      <span className="relative grid h-9 w-9 place-items-center overflow-hidden rounded-[14px] bg-gradient-to-br from-[#1547d9] via-[#2764ff] to-[#17c8ff] text-[11px] font-extrabold tracking-[-.03em] text-white shadow-sm">
        SP
      </span>
      <div className="leading-none">
        <div className="text-[15px] font-extrabold tracking-[-.04em] text-main">SIAMPLAY</div>
        <div className="mt-1 text-[10px] font-medium text-muted">สยามเพลย์</div>
      </div>
    </div>
  );
}

export function AppHeader() {
  const pathname = usePathname();
  const isGame = pathname.startsWith("/games/") && pathname !== "/games";
  if (isGame) return null;

  return (
    <header className="sticky top-0 z-50 border-b bg-[color:var(--bg)]/88 backdrop-blur-xl" style={{borderColor:"var(--border)"}}>
      <div className="mx-auto flex h-16 max-w-7xl items-center gap-3 px-4 sm:px-6 lg:px-8">
        <Link href="/" aria-label="SiamPlay หน้าแรก"><Wordmark/></Link>

        <nav className="ml-8 hidden items-center gap-6 text-sm font-semibold text-muted lg:flex">
          <Link href="/" className="hover:text-main">หน้าแรก</Link>
          <Link href="/games" className="hover:text-main">เกม</Link>
          <Link href="/stats" className="hover:text-main">สถิติ</Link>
        </nav>

        <div className="ml-auto flex items-center gap-2">
          <Link href="/games?focus=search" aria-label="ค้นหาเกม" className="grid h-10 w-10 place-items-center rounded-[14px] border surface text-main">
            <Search size={18}/>
          </Link>
          <Link href="/settings" aria-label="ตั้งค่า" className="hidden h-10 w-10 place-items-center rounded-[14px] border surface text-main sm:grid">
            <Settings size={18}/>
          </Link>
        </div>
      </div>
    </header>
  );
}
