import { Heart, ShieldCheck, Smartphone, Zap } from "lucide-react";

export default function AboutPage(){
  return <div className="space-y-6">
    <div className="pt-1"><p className="text-xs font-semibold uppercase tracking-[.14em] text-siam-500">ABOUT</p><h1 className="mt-2 text-3xl font-extrabold tracking-[-.04em] text-main">SiamPlay — สยามเพลย์</h1><p className="mt-2 text-sm text-muted">มินิเกมฟรีที่ตั้งใจให้เปิดเว็บแล้วเล่นได้ทันที</p></div>
    <section className="rounded-[22px] border surface p-5 sm:p-6"><p className="text-sm leading-7 text-muted">SiamPlay เป็นเว็บไซต์รวมมินิเกมสำหรับมือถือและเดสก์ท็อป เล่นฟรี 100% ไม่ต้องสร้างบัญชี ระบบเกมและสถิติทำงานบนเบราว์เซอร์ของคุณ</p></section>
    <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
      {[[Heart,"ฟรีทุกเกม","ไม่มีค่าใช้จ่ายในการเล่น"],[Smartphone,"Mobile First","ออกแบบให้กดและเล่นบนมือถือสะดวก"],[ShieldCheck,"ไม่ต้องสมัคร","ไม่ต้องสร้างบัญชีเพื่อเริ่มเล่น"],[Zap,"เล่นได้ทันที","เลือกเกมแล้วเริ่มได้ในไม่กี่วินาที"]].map(([Icon,title,desc]:any)=><div key={title} className="rounded-[18px] border surface p-5"><Icon size={20} className="text-siam-600"/><h2 className="mt-4 text-sm font-bold text-main">{title}</h2><p className="mt-1 text-xs leading-5 text-muted">{desc}</p></div>)}
    </div>
  </div>;
}
