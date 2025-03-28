/* istanbul ignore file */
'use client';

import { LogRocketProviders, QueryProvider } from '@/components';

export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <QueryProvider>
      <LogRocketProviders>
        <div
          className={`relative transition-all ease-in-out duration-1000 flex h-screen overflow-y-auto overflow-hidden flex-col`}
        >
          <main className="w-screen">{children}</main>
        </div>
      </LogRocketProviders>
    </QueryProvider>
  );
}
