import { StatsDashboard } from "@/components/stats/StatsDashboard";

export default function StatsPage() {
  return (
    <div className="space-y-6">
      <div>
        <p className="text-sm font-black text-siam-500">สถิติส่วนตัว</p>
        <h1 className="mt-1 text-3xl font-black text-siam-900">สถิติการเล่น</h1>
        <p className="mt-2 text-sm text-slate-500">คะแนนและสถิติถูกเก็บไว้ในเบราว์เซอร์ของอุปกรณ์นี้เท่านั้น</p>
      </div>
      <StatsDashboard />
    </div>
  );
}