'use client';
import { Menu, X } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import AuthButton from './AuthButton';
import NavLinks from './NavLinks';

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <nav className="fixed top-0 left-0 w-full h-fit bg-white shadow-md z-50">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-4">
        {/* Logo */}
        <Link href="/">
          <Image
            src="/images/momogin-logo.webp"
            alt="Logo"
            width={160}
            height={40}
            className="cursor-pointer"
          />
        </Link>

        {/* Menu Navbar */}
        <div className="hidden md:flex flex-1 justify-center absolute left-1/2 transform -translate-x-1/2">
          <NavLinks isLoggedIn={isLoggedIn} />
        </div>

        {/* Tombol Login/Logout */}
        <div className="hidden md:flex">
          <AuthButton isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
        </div>

        {/* Tombol Hamburger */}
        <button
          className="md:hidden block text-gray-700"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Menu Dropdown */}
      <div
        className={`md:hidden fixed top-20 left-0 w-full bg-white shadow-md flex flex-col items-center gap-6 p-6 transition-all duration-300 ${
          menuOpen
            ? 'opacity-100 scale-100'
            : 'opacity-0 scale-95 pointer-events-none'
        }`}
      >
        <NavLinks isLoggedIn={isLoggedIn} />
        <AuthButton isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
      </div>
    </nav>
  );
};

export default Navbar;
