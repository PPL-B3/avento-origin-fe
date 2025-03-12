'use client';
import Image from 'next/image';

export const Logo = () => (
  <div className="flex flex-col items-center">
    <Image
      src="/images/logo_momofin.png"
      alt="Momofin Logo"
      width={373}
      height={68}
      className="mt-2"
      priority
    />
    <h1 className="text-2xl text-secondary.sec font-bold mt-4">
      Kelola Dokumen
    </h1>
    <h1 className="text-2xl text-secondary.sec font-bold">
      Digitalmu Sekarang!
    </h1>
  </div>
);
