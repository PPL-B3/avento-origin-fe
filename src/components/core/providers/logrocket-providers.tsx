'use client';

import { useAuth } from '@/components';
import LogRocket from 'logrocket';
import { ReactNode, useEffect } from 'react';

interface ProvidersProps {
  children: ReactNode;
}

export function LogRocketProviders({ children }: Readonly<ProvidersProps>) {
  const { user } = useAuth();

  useEffect(() => {
    if (process.env.LOGROCKET_ID) {
      LogRocket.init(process.env.LOGROCKET_ID);

      if (user?.id) {
        // User is logged in, identify them with their information
        LogRocket.identify(user.id, {
          email: user.email,
        });
      } else {
        // User is not logged in, track as anonymous with a random session ID
        const anonymousId = generateSecureRandomId();
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

// Generate a cryptographically secure random ID
function generateSecureRandomId(): string {
  // Define a type for window with msCrypto property
  type WindowWithMsCrypto = Window & {
    msCrypto?: Crypto;
  };

  const crypto = window.crypto || (window as WindowWithMsCrypto).msCrypto;
  if (crypto) {
    // Create a typed array of 4 bytes (32 bits)
    const array = new Uint32Array(4);
    // Fill with random values
    crypto.getRandomValues(array);
    // Convert to base36 string and remove '0.' prefix
    return Array.from(array)
      .map((n) => n.toString(36))
      .join('')
      .substring(0, 16);
  }

  // Fallback for any environment (less secure)
  return `anonymous-${Math.random().toString(36).substring(2, 15)}`;
}
