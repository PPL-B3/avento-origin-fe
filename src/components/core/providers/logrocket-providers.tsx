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

      if (user?.id) {
        // User is logged in, identify them with their information
        LogRocket.identify(user.id, {
          email: user.email,
        });
      } else {
        // User is not logged in, track as anonymous with a random session ID
        const anonymousId = `anonymous-${Math.random().toString(36).substring(2, 15)}`;
        LogRocket.identify(anonymousId, {
          isAuthenticated: false,
        });
      }
    } else {
      console.warn('LogRocket ID not found. LogRocket initialization skipped.');
    }
  }, []);

  return <>{children}</>;
}
