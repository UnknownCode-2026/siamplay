import { Heart, ShieldCheck, Smartphone } from "lucide-react";

export default function AboutPage() {
  return (
    <div className="space-y-6">
      <div className="pt-2"><p className="text-sm font-black text-siam-500">เกี่ยวกับเรา</p><h1 className="mt-1 text-3xl font-black tracking-tight text-main">SiamPlay — สยามเพลย์</h1><p className="mt-2 text-sm text-muted">แพลตฟอร์มมินิเกมสำหรับคนที่อยากเปิดเว็บแล้วเล่นได้ทันที</p></div>
      <section className="rounded-[1.7rem] border surface p-5 leading-7 shadow-soft sm:p-6"><p className="text-sm text-muted">SiamPlay คือเว็บไซต์รวมมินิเกม เล่นฟรี 100% ไม่ต้องสมัครสมาชิก และออกแบบแบบ Mobile First โดยเกมทำงานบนเบราว์เซอร์โดยตรง</p></section>
      <div className="grid gap-3 sm:grid-cols-3">
        {[[Heart,"เล่นฟรี","ไม่มีระบบเติมเงินหรือเกมเสียเงิน"],[Smartphone,"มือถือก่อน","ควบคุมด้วยหน้าจอสัมผัสได้เต็มรูปแบบ"],[ShieldCheck,"เรียบง่ายและเป็นส่วนตัว","ข้อมูลสถิติเก็บไว้บนอุปกรณ์ของคุณ"]].map(([Icon,title,desc]:any)=><div key={title} className="rounded-[1.5rem] border surface p-5 shadow-soft"><Icon className="text-siam-600"/><h2 className="mt-4 font-black text-main">{title}</h2><p className="mt-1 text-sm leading-6 text-muted">{desc}</p></div>)}
      </div>
    </div>
  );
}
