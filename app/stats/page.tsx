import { StatsDashboard } from "@/components/stats/StatsDashboard";

export default function StatsPage(){
  return <div className="space-y-6">
    <div className="pt-1"><p className="text-xs font-semibold uppercase tracking-[.14em] text-siam-500">MY STATS</p><h1 className="mt-2 text-3xl font-extrabold tracking-[-.04em] text-main">สถิติของฉัน</h1><p className="mt-2 text-sm text-muted">ดูสถิติการเล่นและผลงานที่ดีที่สุดบนอุปกรณ์นี้</p></div>
    <StatsDashboard/>
  </div>;
}
