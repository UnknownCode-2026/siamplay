"use client";

import Link from "next/link";
import { BarChart3, Gamepad2, Home, Settings } from "lucide-react";
import { usePathname } from "next/navigation";

const items = [
  { href: "/", label: "หน้าหลัก", icon: Home },
  { href: "/games", label: "เกม", icon: Gamepad2 },
  { href: "/stats", label: "สถิติ", icon: BarChart3 },
  { href: "/settings", label: "ตั้งค่า", icon: Settings },
];

export function BottomNav() {
  const pathname = usePathname();
  if (pathname.startsWith("/games/") && pathname !== "/games") return null;

  return (
    <nav className="fixed inset-x-0 bottom-0 z-50 border-t bg-[color:var(--surface)]/96 px-3 pt-2 backdrop-blur-xl lg:hidden safe-bottom" style={{borderColor:"var(--border)"}}>
      <div className="mx-auto grid max-w-md grid-cols-4 gap-1">
        {items.map(({href,label,icon:Icon})=>{
          const active=href==="/"?pathname==="/":pathname.startsWith(href);
          return <Link key={href} href={href} className={`flex min-h-14 flex-col items-center justify-center gap-1 rounded-[14px] text-[11px] font-semibold transition ${active?"bg-[color:var(--surface-3)] text-siam-600":"text-muted"}`}>
            <Icon size={19} strokeWidth={active?2.6:2}/>
            <span>{label}</span>
          </Link>;
        })}
      </div>
    </nav>
  );
}
