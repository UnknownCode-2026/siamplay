import { StatsDashboard } from "@/components/stats/StatsDashboard";

export default function StatsPage() {
  return (
    <div className="space-y-6">
      <div className="pt-2">
        <p className="text-sm font-black text-siam-500">ของฉัน</p>
        <h1 className="mt-1 text-3xl font-black tracking-tight text-main">สถิติการเล่น</h1>
        <p className="mt-2 text-sm text-muted">สถิติทั้งหมดเก็บไว้บนอุปกรณ์นี้ ไม่ต้องสมัครสมาชิก</p>
      </div>
      <StatsDashboard />
    </div>
  );
}
