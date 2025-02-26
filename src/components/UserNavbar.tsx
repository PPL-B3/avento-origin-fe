'use client';

import Image from 'next/image';
import { useRouter } from 'next/navigation';

const UserNavbar = () => {
  const router = useRouter();

  const handleLogout = () => {
    localStorage.removeItem('token');
    router.push('/');
  };

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

        {/* Menu Tengah */}
        <div className="flex gap-8">
          <span
            onClick={() => router.push('/')}
            className="text-gray-700 hover:text-blue-600 transition font-medium cursor-pointer"
          >
            Home
          </span>
          <span
            onClick={() => router.push('/upload')}
            className="text-gray-700 hover:text-blue-600 transition font-medium cursor-pointer"
          >
            Upload Dokumen
          </span>
        </div>

        {/* Tombol Logout */}
        <button
          onClick={handleLogout}
          className="px-6 py-2 text-white bg-red-600 rounded-lg hover:bg-red-700 transition"
        >
          Logout
        </button>
      </div>
    </nav>
  );
};

export default UserNavbar;
