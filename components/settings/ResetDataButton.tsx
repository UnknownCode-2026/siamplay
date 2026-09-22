"use client";

import { Trash2 } from "lucide-react";
import { STORAGE_KEYS } from "@/lib/storage";

export function ResetDataButton() {
  function reset() {
    if (!window.confirm("ต้องการล้างสถิติ เกมโปรด และประวัติการเล่นบนเครื่องนี้หรือไม่?")) return;
    localStorage.removeItem(STORAGE_KEYS.stats);
    localStorage.removeItem(STORAGE_KEYS.favorites);
    localStorage.removeItem(STORAGE_KEYS.recent);
    window.location.reload();
  }

  return (
    <button onClick={reset} className="flex w-full items-center gap-3 px-4 py-4 text-left">
      <span className="grid h-10 w-10 shrink-0 place-items-center rounded-2xl bg-red-50 text-red-600 dark:bg-red-500/10 dark:text-red-300"><Trash2 size={18}/></span>
      <span className="flex-1">
        <span className="block text-sm font-semibold text-main">ล้างข้อมูลการเล่น</span>
        <span className="mt-0.5 block text-xs text-muted">ลบสถิติ เกมโปรด และเกมล่าสุดของเครื่องนี้</span>
      </span>
    </button>
  );
}
