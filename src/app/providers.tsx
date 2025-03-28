'use client';

import { useAuth } from '@/components';
import LogRocket from 'logrocket';
import { ReactNode, useEffect } from 'react';

interface ProvidersProps {
  children: ReactNode;
}

export function LogRocketProviders({ children }: ProvidersProps) {
  const { user } = useAuth();

  useEffect(() => {
    if (process.env.LOGROCKET_ID) {
      LogRocket.init(process.env.LOGROCKET_ID);
      console.log(process.env.LOGROCKET_ID);

      // Identify users if you have authentication
      LogRocket.identify('user-id', {
        email: user?.email || '',
      });
    } else {
      console.warn('LogRocket ID not found. LogRocket initialization skipped.');
    }
  }, []);

  return <>{children}</>;
}
