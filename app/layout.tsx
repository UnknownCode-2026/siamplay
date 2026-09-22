import type { Metadata } from "next";
import "./globals.css";
import { AppHeader } from "@/components/layout/AppHeader";
import { BottomNav } from "@/components/layout/BottomNav";
import { Footer } from "@/components/layout/Footer";

export const metadata: Metadata = {
  title: "SiamPlay | สยามเพลย์ - มินิเกม เล่นฟรี",
  description: "SiamPlay เว็บไซต์รวมมินิเกม เล่นฟรี 100% ไม่ต้องสมัครสมาชิก รองรับมือถือ",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="th">
      <body className="min-h-screen">
        <AppHeader />
        <main className="mx-auto min-h-[calc(100dvh-120px)] max-w-6xl px-4 pb-24 pt-4 sm:px-6 lg:px-8 lg:pb-10">
          {children}
        </main>
        <Footer />
        <BottomNav />
      </body>
    </html>
  );
}
