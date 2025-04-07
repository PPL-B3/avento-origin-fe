'use client';

import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { UserProps } from '../../hooks';

interface NavLinksProps {
  user: UserProps | null;
}

export function NavLinks({ user }: Readonly<NavLinksProps>) {
  const router = useRouter();

  const [links, setLinks] = useState<{ label: string; href: string }[]>([]);

  useEffect(() => {
    if (user) {
      setLinks([{ label: 'Upload Document', href: '/upload-document' }]);
    } else {
      setLinks([]);
    }
  }, [user]);

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
