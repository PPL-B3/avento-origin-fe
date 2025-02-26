'use client';
import Image from 'next/image';

const Logo = () => (
  <div className="flex flex-col items-center">
    <Image
      src="/images/momogin-logo.webp"
      alt="Logo"
      width={373}
      height={68}
      className="mt-2"
      priority
    />
    <p className="text-2xl text-secondary font-bold mt-4">Kelola Dokumen</p>
    <p className="text-2xl text-secondary font-bold">Digitalmu Sekarang!</p>
  </div>
);

export default Logo;
