'use client';

import { useRouter } from 'next/navigation';
import { UserProps } from '../../hooks';

interface NavLinksProps {
  user: UserProps | null;
}

export function NavLinks({ user }: Readonly<NavLinksProps>) {
  const router = useRouter();

  // Define links based on user state
  const links = user
    ? [
        { label: 'Home', href: '/home' },
        { label: 'Upload Document', href: '/upload-document' },
      ]
    : [];

  return (
    <div className="flex gap-8">
      {links.map((link) => (
        <button
          key={link.href}
          onClick={() => router.push(link.href)}
          className="text-gray-700 hover:text-blue-600 transition font-medium cursor-pointer"
        >
          {link.label}
        </button>
      ))}
    </div>
  );
}
