import Link from "next/link";
import { ChevronLeft } from "lucide-react";
import { Perfect10Game } from "@/games/perfect-10/Perfect10Game";

export default function Perfect10Page() {
  return (
    <div className="space-y-4">
      <Link href="/games" className="inline-flex min-h-11 items-center gap-2 rounded-xl px-2 text-sm font-bold text-slate-600">
        <ChevronLeft size={18}/> กลับไปเกมทั้งหมด
      </Link>
      <Perfect10Game />
    </div>
  );
}
