"use client";

import Link from "next/link";
import { Menu, Search } from "lucide-react";
import { useState } from "react";

function BrandMark() {
  return (
    <span className="relative grid h-10 w-10 shrink-0 place-items-center overflow-hidden rounded-2xl bg-gradient-to-br from-siam-500 to-cyan-400 text-white shadow-soft">
      <span className="text-sm font-black tracking-tight">SP</span>
      <span className="absolute -bottom-2 -right-2 h-5 w-5 rounded-full bg-white/20" />
    </span>
  );
}

export function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-black/5 bg-white/82 backdrop-blur-xl dark:border-white/10 dark:bg-[#071120]/82">
      <div className="mx-auto flex h-14 max-w-6xl items-center gap-3 px-4 sm:px-6 lg:px-8">
        <Link href="/" className="flex min-w-0 items-center gap-2.5">
          <BrandMark />
          <div className="leading-tight">
            <div className="text-[15px] font-black tracking-tight text-main">SiamPlay</div>
            <div className="text-[10px] font-bold text-siam-500">สยามเพลย์</div>
          </div>
        </Link>

        <nav className="ml-auto hidden items-center gap-6 text-sm font-bold text-muted lg:flex">
          <Link href="/">หน้าหลัก</Link>
          <Link href="/games">เกมทั้งหมด</Link>
          <Link href="/stats">สถิติ</Link>
          <Link href="/about">เกี่ยวกับเรา</Link>
        </nav>

        <Link href="/games" aria-label="ค้นหาเกม" className="ml-auto grid h-10 w-10 place-items-center rounded-2xl border surface text-main lg:ml-3">
          <Search size={18} />
        </Link>
        <button onClick={() => setOpen(!open)} aria-label="เปิดเมนู" className="grid h-10 w-10 place-items-center rounded-2xl border surface text-main lg:hidden">
          <Menu size={19} />
        </button>
      </div>

      {open && (
        <div className="border-t border-black/5 px-4 py-3 dark:border-white/10">
          <div className="mx-auto grid max-w-6xl gap-1">
            {[
              ["/", "หน้าหลัก"],
              ["/games", "เกมทั้งหมด"],
              ["/stats", "สถิติ"],
              ["/settings", "ตั้งค่า"],
              ["/about", "เกี่ยวกับเรา"],
            ].map(([href, label]) => (
              <Link key={href} href={href} onClick={() => setOpen(false)} className="rounded-2xl px-4 py-3 text-sm font-bold text-main hover:bg-black/5 dark:hover:bg-white/5">
                {label}
              </Link>
            ))}
          </div>
        </div>
      )}
    </header>
  );
}
