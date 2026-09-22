"use client";

import Link from "next/link";
import { Home, Gamepad2, Shuffle, BarChart3, Settings } from "lucide-react";
import { usePathname } from "next/navigation";

const items = [
  { href: "/", label: "หน้าหลัก", icon: Home },
  { href: "/games", label: "เกม", icon: Gamepad2 },
  { href: "/games?random=1", label: "สุ่มเกม", icon: Shuffle },
  { href: "/stats", label: "สถิติ", icon: BarChart3 },
  { href: "/settings", label: "ตั้งค่า", icon: Settings },
];

export function BottomNav() {
  const pathname = usePathname();
  return (
    <nav className="fixed inset-x-0 bottom-0 z-50 border-t border-slate-200 bg-white/95 px-2 pt-2 backdrop-blur lg:hidden safe-bottom">
      <div className="mx-auto grid max-w-xl grid-cols-5 gap-1">
        {items.map(({ href, label, icon: Icon }) => {
          const active = href === "/" ? pathname === "/" : pathname.startsWith(href.split("?")[0]);
          return (
            <Link key={href} href={href} className={`flex min-h-14 flex-col items-center justify-center gap-1 rounded-xl text-[11px] font-bold ${active ? "bg-siam-50 text-siam-600" : "text-slate-500"}`}>
              <Icon size={19} />
              <span>{label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}