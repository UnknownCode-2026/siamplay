"use client";

import Link from "next/link";
import { Menu, Search, Gamepad2 } from "lucide-react";
import { useState } from "react";

export function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-black/5 bg-white/90 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-6xl items-center gap-3 px-4 sm:px-6 lg:px-8">
        <Link href="/" className="flex min-w-0 items-center gap-2 font-black text-siam-900">
          <span className="grid h-10 w-10 shrink-0 place-items-center rounded-2xl bg-siam-900 text-white shadow-soft">
            <Gamepad2 size={21} />
          </span>
          <span className="truncate text-lg">SiamPlay <span className="text-siam-500">สยามเพลย์</span></span>
        </Link>

        <nav className="ml-auto hidden items-center gap-5 text-sm font-semibold text-slate-600 lg:flex">
          <Link href="/">หน้าหลัก</Link>
          <Link href="/games">เกมทั้งหมด</Link>
          <Link href="/stats">สถิติ</Link>
          <Link href="/about">เกี่ยวกับเรา</Link>
        </nav>

        <Link href="/games" aria-label="ค้นหาเกม" className="ml-auto grid h-11 w-11 place-items-center rounded-xl border border-slate-200 bg-white lg:ml-2">
          <Search size={20} />
        </Link>
        <button onClick={() => setOpen(!open)} aria-label="เปิดเมนู" className="grid h-11 w-11 place-items-center rounded-xl border border-slate-200 bg-white lg:hidden">
          <Menu size={21} />
        </button>
      </div>

      {open && (
        <div className="border-t border-slate-100 bg-white px-4 py-3 lg:hidden">
          <div className="mx-auto grid max-w-6xl gap-2 text-sm font-semibold">
            {[
              ["/", "หน้าหลัก"],
              ["/games", "เกมทั้งหมด"],
              ["/stats", "สถิติ"],
              ["/settings", "ตั้งค่า"],
              ["/about", "เกี่ยวกับเรา"],
            ].map(([href, label]) => (
              <Link key={href} href={href} onClick={() => setOpen(false)} className="rounded-xl px-3 py-3 hover:bg-slate-50">
                {label}
              </Link>
            ))}
          </div>
        </div>
      )}
    </header>
  );
}