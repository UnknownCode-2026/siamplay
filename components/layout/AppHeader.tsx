"use client";

import Link from "next/link";
import { Search } from "lucide-react";
import { usePathname } from "next/navigation";

export function AppHeader() {
  const pathname = usePathname();
  const isGame = pathname.startsWith("/games/") && pathname !== "/games";
  if (isGame) return null;

  return (
    <header className="sticky top-0 z-50 border-b border-black/5 bg-[color:var(--bg)]/90 backdrop-blur-xl dark:border-white/10">
      <div className="mx-auto flex h-14 max-w-6xl items-center gap-3 px-4 sm:px-6 lg:px-8">
        <Link href="/" className="flex min-w-0 items-center gap-2.5">
          <span className="grid h-9 w-9 shrink-0 place-items-center rounded-[14px] bg-gradient-to-br from-siam-600 to-cyan-400 text-xs font-extrabold text-white shadow-soft">SP</span>
          <div className="leading-tight">
            <div className="text-[15px] font-bold tracking-tight text-main">SiamPlay</div>
            <div className="text-[10px] font-medium text-muted">เล่นสนุกทุกวัน</div>
          </div>
        </Link>

        <nav className="ml-auto hidden items-center gap-6 text-sm font-medium text-muted lg:flex">
          <Link href="/">หน้าหลัก</Link>
          <Link href="/games">เกมทั้งหมด</Link>
          <Link href="/stats">สถิติ</Link>
          <Link href="/settings">ตั้งค่า</Link>
        </nav>

        <Link href="/games?focus=search" aria-label="ค้นหาเกม" className="ml-auto grid h-10 w-10 place-items-center rounded-2xl border surface text-main lg:ml-3">
          <Search size={18}/>
        </Link>
      </div>
    </header>
  );
}
