/* istanbul ignore file */
'use client';

import { LogRocketProviders, QueryProvider } from '@/components';
import Navbar from '@/components/core/elements/Navbar';

export default function BaseLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <QueryProvider>
      <LogRocketProviders>
        <main
          className={`relative transition-all ease-in-out duration-1000 flex min-h-screen overflow-y-auto overflow-hidden flex-col w-screen`}
        >
          <Navbar />
          {children}
        </main>
      </LogRocketProviders>
    </QueryProvider>
  );
}
