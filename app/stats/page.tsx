import { StatsDashboard } from "@/components/stats/StatsDashboard";

export default function StatsPage() {
  return (
    <div className="space-y-5">
      <div className="pt-1">
        <p className="text-sm font-medium text-siam-500">ของฉัน</p>
        <h1 className="mt-1 text-3xl font-bold tracking-tight text-main">สถิติการเล่น</h1>
        <p className="mt-2 text-sm text-muted">ดูจำนวนครั้งที่เล่น เกมโปรด และสถิติที่ดีที่สุดของคุณ</p>
      </div>
      <StatsDashboard />
    </div>
  );
}
