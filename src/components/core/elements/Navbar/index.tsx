'use client';

import { useAuth } from '@/components/core';
import Link from 'next/link';
import { useState } from 'react';

import { Menu, X } from 'lucide-react';
import Image from 'next/image';
import { AuthButtons } from './AuthButton';
import { NavLinks } from './NavLinks';

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const { user, logout, isLoading } = useAuth();

  if (isLoading) return null;

  /* istanbul ignore next */
  return (
    <nav className="fixed top-0 left-0 w-full h-fit bg-white shadow-md z-50">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-4">
        {/* Logo */}
        <Link href="/">
          <Image
            src="/images/momofin-logo.webp"
            alt="Logo"
            width={160}
            height={40}
            className="cursor-pointer"
          />
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-12">
          <NavLinks user={user || null} />
          <AuthButtons user={user || null} logout={logout} />
        </div>

        {/* Mobile Menu Toggle */}
        <button
          data-testid="mobile-menu-button"
          className="md:hidden block text-gray-700"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Menu Dropdown */}
      <div
        data-testid="mobile-menu"
        className={`md:hidden fixed top-20 left-0 w-full bg-white shadow-md flex flex-col items-center gap-6 p-6 transition-all duration-300 ${
          menuOpen
            ? 'opacity-100 scale-100'
            : 'opacity-0 scale-95 pointer-events-none'
        }`}
      >
        <NavLinks user={user || null} />
        <AuthButtons user={user || null} logout={logout} />
      </div>
    </nav>
  );
};

export default Navbar;
