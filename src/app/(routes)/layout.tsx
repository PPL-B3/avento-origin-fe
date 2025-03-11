'use client';

import { QueryProvider } from '@/components';
import Navbar from '@/components/core/elements/Navbar';

export default function BaseLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <QueryProvider>
      <div
        className={`relative transition-all ease-in-out duration-1000 flex h-screen overflow-y-auto overflow-hidden flex-col`}
      >
        <main className="w-screen">
          <Navbar />
          {children}
        </main>
      </div>
    </QueryProvider>
  );
}
