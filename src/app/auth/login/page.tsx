'use client';

import Image from 'next/image';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
  const router = useRouter();

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white shadow-lg rounded-lg p-6 w-96">
        <div className="flex justify-center mb-6">
          <Image src="/logo_momofin.png" width={200} height={200} alt="Logo" />
        </div>

        <p className="text-sm text-gray-600 text-center">
          Selamat Datang! Silahkan input email dan password untuk login. Belum
          punya akun? silahkan registrasi
        </p>

        <div className="mt-4 flex border-b">
          <button className="flex-1 py-2 text-center border-b-2 border-black font-semibold text-black">
            LOGIN
          </button>
          <button
            className="flex-1 py-2 text-center text-gray-500"
            onClick={() => router.push('/auth/register')}
          >
            REGISTRASI
          </button>
        </div>

        <form className="mt-4">
          <label className="block text-sm font-medium text-gray-700">
            Email
          </label>
          <input
            type="email"
            className="w-full p-2 border border-gray-300 rounded mt-1 text-black"
            placeholder="abc@gmail.com"
          />

          <label
            htmlFor="password"
            className="block text-sm font-medium text-gray-700 mt-4"
          >
            Password
          </label>
          <input
            id="password"
            type="password"
            className="w-full p-2 border border-gray-300 rounded mt-1 text-black"
          />

          <button
            type="submit"
            className="w-full bg-navy hover:bg-orange text-white mt-6 py-2 rounded"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
}
