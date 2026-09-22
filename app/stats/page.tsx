import { EmptyState } from "@/components/ui/EmptyState";

export default function StatsPage() {
  return (
    <div className="space-y-6">
      <div><p className="text-sm font-black text-siam-500">สถิติส่วนตัว</p><h1 className="mt-1 text-3xl font-black text-siam-900">สถิติการเล่น</h1><p className="mt-2 text-sm text-slate-500">ในอนาคตคะแนนและสถิติจะเก็บไว้บนอุปกรณ์ของคุณ</p></div>
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        {["เกมที่เล่น","จำนวนครั้ง","สถิติสูงสุด","เกมโปรด"].map(x=><div key={x} className="rounded-3xl border border-slate-200 bg-white p-5 shadow-soft"><p className="text-xs font-bold text-slate-500">{x}</p><p className="mt-2 text-2xl font-black text-siam-900">0</p></div>)}
      </div>
      <EmptyState title="ยังไม่มีสถิติ" description="เริ่มเล่นเกมในเวอร์ชันถัดไป แล้วสถิติของคุณจะปรากฏที่นี่" />
    </div>
  );
}