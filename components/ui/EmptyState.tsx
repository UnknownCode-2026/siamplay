import { Sparkles } from "lucide-react";

export function EmptyState({ title, description }: { title: string; description: string }) {
  return (
    <div className="rounded-3xl border border-dashed border-slate-300 bg-white px-6 py-12 text-center shadow-soft">
      <div className="mx-auto mb-4 grid h-14 w-14 place-items-center rounded-2xl bg-siam-50 text-siam-600">
        <Sparkles />
      </div>
      <h3 className="text-lg font-black text-siam-900">{title}</h3>
      <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-slate-500">{description}</p>
    </div>
  );
}