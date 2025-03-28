'use client';

import LogRocket from 'logrocket';
import { ReactNode, useEffect } from 'react';

interface ProvidersProps {
  children: ReactNode;
}

export function LogRocketProviders({ children }: ProvidersProps) {
  useEffect(() => {
    if (process.env.LOGROCKET_ID) {
      LogRocket.init(process.env.LOGROCKET_ID);

      // Identify users if you have authentication
      // LogRocket.identify('user-id', {
      //   name: 'User Name',
      //   email: 'user@example.com',
      // });
    } else {
      console.warn('LogRocket ID not found. LogRocket initialization skipped.');
    }
  }, []);

  return <>{children}</>;
}
