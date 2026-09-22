import type { Metadata } from "next";
import "./globals.css";
import { AppHeader } from "@/components/layout/AppHeader";
import { BottomNav } from "@/components/layout/BottomNav";
import { Footer } from "@/components/layout/Footer";

export const metadata:Metadata={
  title:"SiamPlay - มินิเกมฟรี เล่นบนเว็บ ไม่ต้องสมัคร",
  description:"SiamPlay เว็บไซต์รวมมินิเกม เล่นฟรี 100% เล่นบนมือถือและเดสก์ท็อปได้ทันที ไม่ต้องสมัครสมาชิก",
};

const themeScript=`(()=>{try{const raw=localStorage.getItem("siamplay-settings");const s=raw?JSON.parse(raw):{};const t=s.theme||"system";const dark=t==="dark"||(t==="system"&&matchMedia("(prefers-color-scheme: dark)").matches);document.documentElement.classList.toggle("dark",dark);}catch{}})();`;

export default function RootLayout({children}:{children:React.ReactNode}){
  return <html lang="th" suppressHydrationWarning>
    <head><script dangerouslySetInnerHTML={{__html:themeScript}}/></head>
    <body className="min-h-screen">
      <AppHeader/>
      <main className="mx-auto min-h-[calc(100dvh-120px)] max-w-7xl px-4 pb-24 pt-5 sm:px-6 lg:px-8 lg:pb-12">{children}</main>
      <Footer/>
      <BottomNav/>
    </body>
  </html>;
}
