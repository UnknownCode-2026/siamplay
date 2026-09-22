import type { Metadata } from "next";
import "./globals.css";
import { Header } from "@/components/layout/Header";
import { BottomNav } from "@/components/layout/BottomNav";
import { Footer } from "@/components/layout/Footer";

export const metadata: Metadata = {
  title: "SiamPlay | สยามเพลย์ - มินิเกมออนไลน์ เล่นฟรี",
  description: "SiamPlay เว็บไซต์รวมมินิเกม เล่นฟรี 100% ไม่ต้องสมัครสมาชิก รองรับมือถือ",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="th">
      <body className="min-h-screen">
        <Header />
        <main className="mx-auto min-h-[calc(100dvh-140px)] max-w-6xl px-4 pb-28 pt-5 sm:px-6 lg:px-8 lg:pb-10">
          {children}
        </main>
        <Footer />
        <BottomNav />
      </body>
    </html>
  );
}