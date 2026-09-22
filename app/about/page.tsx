import { Heart, ShieldCheck, Smartphone } from "lucide-react";

export default function AboutPage() {
  return (
    <div className="space-y-6">
      <div><p className="text-sm font-black text-siam-500">เกี่ยวกับเรา</p><h1 className="mt-1 text-3xl font-black text-siam-900">SiamPlay — สยามเพลย์</h1></div>
      <div className="rounded-3xl border border-slate-200 bg-white p-6 leading-7 text-slate-600 shadow-soft">
        <p>SiamPlay คือเว็บไซต์รวมมินิเกมที่ตั้งใจให้ทุกคนเข้ามาเล่นได้ง่าย ฟรี 100% และไม่ต้องสมัครสมาชิก</p>
        <p className="mt-4">เว็บไซต์ถูกออกแบบแบบ Mobile First เพื่อให้ใช้งานบนมือถือได้สะดวก และสามารถขยายเกมใหม่ได้ในเวอร์ชันถัดไปโดยไม่ต้องรื้อโครงหลัก</p>
      </div>
      <div className="grid gap-3 sm:grid-cols-3">
        {[[Heart,"เล่นฟรี","ไม่มีระบบเติมเงินหรือเกมเสียเงิน"],[Smartphone,"มือถือก่อน","ออกแบบสำหรับหน้าจอสัมผัสตั้งแต่ต้น"],[ShieldCheck,"เรียบง่ายและเป็นส่วนตัว","ไม่ต้องสร้างบัญชีเพื่อใช้งาน"]].map(([Icon,title,desc]:any)=><div key={title} className="rounded-3xl border border-slate-200 bg-white p-5 shadow-soft"><Icon className="text-siam-600"/><h2 className="mt-4 font-black">{title}</h2><p className="mt-1 text-sm leading-6 text-slate-500">{desc}</p></div>)}
      </div>
    </div>
  );
}