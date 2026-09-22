import Link from "next/link";

export default function NotFound() {
  return (
    <div className="grid min-h-[60dvh] place-items-center text-center">
      <div>
        <p className="text-7xl font-black text-siam-600">404</p>
        <h1 className="mt-3 text-2xl font-black text-siam-900">โอ๊ะ! หาหน้านี้ไม่เจอ</h1>
        <p className="mt-2 text-sm text-slate-500">หน้าที่คุณเปิดอาจถูกย้ายหรือไม่มีอยู่ใน SiamPlay</p>
        <Link href="/" className="mt-6 inline-flex min-h-12 items-center rounded-2xl bg-siam-900 px-5 py-3 text-sm font-black text-white">กลับหน้าหลัก</Link>
      </div>
    </div>
  );
}