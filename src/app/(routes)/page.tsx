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
      
    </main>
  );
}
