'use client';

import React, { useState } from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';

interface QueryProviderProps {
  children: React.ReactNode;
}

export const QueryProvider = ({ children }: QueryProviderProps) => {
  const [client] = useState<QueryClient>(
    () =>
      new QueryClient({
        defaultOptions: { queries: { staleTime: 5000 } },
      })
  );

  return <QueryClientProvider client={client}>{children}</QueryClientProvider>;
};
