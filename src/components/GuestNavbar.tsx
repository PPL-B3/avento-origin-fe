'use client';

import Image from 'next/image';
import { useRouter } from 'next/navigation';

const GuestNavbar = () => {
  const router = useRouter();
  return (
    <nav className="w-full bg-white shadow-md h-20">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-12 py-4">
        {/* Logo */}
        <Image
          src="/momofin.png"
          alt="Logo"
          width={160}
          height={40}
          className="cursor-pointer"
          onClick={() => router.push('/')}
        />

        {/* Tombol Login */}
        <button
          onClick={() => router.push('/login')}
          className="px-6 py-2 text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition"
        >
          Login
        </button>
      </div>
    </nav>
  );
};

export default GuestNavbar;
