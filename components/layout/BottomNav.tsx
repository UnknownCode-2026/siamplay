"use client";

import Link from "next/link";
import { Home, Gamepad2, BarChart3, Settings } from "lucide-react";
import { usePathname } from "next/navigation";

const items = [
  { href: "/", label: "หน้าหลัก", icon: Home },
  { href: "/games", label: "เกม", icon: Gamepad2 },
  { href: "/stats", label: "สถิติ", icon: BarChart3 },
  { href: "/settings", label: "ตั้งค่า", icon: Settings },
];

export function BottomNav() {
  const pathname = usePathname();
  const isGame = pathname.startsWith("/games/") && pathname !== "/games";
  if (isGame) return null;

  return (
    <nav className="fixed inset-x-0 bottom-0 z-50 border-t border-black/5 bg-white/92 px-3 pt-2 backdrop-blur-xl dark:border-white/10 dark:bg-[#091426]/92 lg:hidden safe-bottom">
      <div className="mx-auto grid max-w-md grid-cols-4 gap-1">
        {items.map(({ href, label, icon: Icon }) => {
          const active = href === "/" ? pathname === "/" : pathname.startsWith(href);
          return (
            <Link key={href} href={href} className={`flex min-h-14 flex-col items-center justify-center gap-1 rounded-2xl text-[11px] font-black transition ${active ? "bg-siam-50 text-siam-600 dark:bg-siam-500/15 dark:text-sky-300" : "text-muted"}`}>
              <Icon size={19} strokeWidth={active ? 2.7 : 2.1} />
              <span>{label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
