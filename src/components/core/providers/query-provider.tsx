/* istanbul ignore file */
'use client';

import React, { useState } from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';

interface QueryProviderProps {
  children: React.ReactNode;
}

/* istanbul ignore next */
export const QueryProvider = ({ children }: QueryProviderProps) => {
  /* istanbul ignore next */
  const [client] = useState<QueryClient>(
    () =>
      new QueryClient({
        defaultOptions: { queries: { staleTime: 5000 } },
      })
  );

  return <QueryClientProvider client={client}>{children}</QueryClientProvider>;
};
