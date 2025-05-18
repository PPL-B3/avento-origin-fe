'use client';
import Image from 'next/image';
import Link from 'next/link';

export default function Home() {
  return (
    <main className="min-h-screen text-white bg-[#12181D] h-fit border-2 overflow-hidden relative">
      {/* Bottom right ellipse (Ellipse 9) */}
      <div className="absolute bottom-[-800px] right-[-400px]">
        <img
          src="/images/ellipse-9.svg"
          alt=""
          className="h-auto w-[1804px] max-w-none"
        />
      </div>

      {/* Left ellipse (Ellipse 6) */}
      <div className="absolute -left-[400px] top-1/2 -translate-y-1/2">
        <img
          src="/images/ellipse-6.svg"
          alt=""
          className="h-auto w-[1375px] max-w-none"
        />
      </div>

      {/* Right ellipse (Ellipse 7) */}
      <div className="absolute -right-[400px] top-1/2 -translate-y-1/2">
        <img
          src="/images/ellipse-7.svg"
          alt=""
          className="h-auto w-[1134px] max-w-none"
        />
      </div>
      {/* Hero Section */}
      <section className="flex flex-col items-center justify-center px-4 py-20 text-center min-h-screen">
        <h1 className="mb-4 text-2xl font-bold md:text-3xl text-neutral-50">
          Hello!
        </h1>
        <h2 className="mb-8 text-3xl font-bold md:text-4xl text-neutral-50">
          Document Management System with QR Code
        </h2>
        <p className="mx-auto max-w-2xl text-center text-sm leading-relaxed md:text-base text-neutral-50">
          Kami menyediakan cara yang aman dan transparan untuk melakukan
          transfer kepemilikan dokumen menggunakan QR code. Setiap dokumen
          dienkripsi secara unik, memastikan kerahasiaan penuh selama proses
          transfer.
        </p>
        <Link
          href="/upload-document"
          className="mt-8 w-full max-w-md rounded-md bg-orange-500 px-6 py-3 text-center font-medium text-white transition-colors hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 focus:ring-offset-blue-900"
        >
          Coba Sekarang
        </Link>
      </section>

      
    </main>
  );
}
