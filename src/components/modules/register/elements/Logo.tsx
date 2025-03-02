'use client';
import Image from 'next/image';

export const Logo = () => (
  <div className="flex flex-col items-center">
    <Image
      src="/images/momogin-logo.webp"
      alt="Momogin Logo"
      width={373}
      height={68}
      className="mt-2"
      priority
    />
    <h1 className="text-2xl text-[#0067CC] font-bold mt-4">Kelola Dokumen</h1>
    <h1 className="text-2xl text-[#0067CC] font-bold">Digitalmu Sekarang!</h1>
  </div>
);
