'use client';

import { aventoClient } from '@/lib';

export const useAventoClient = () => {
  // const { data: session } = useSession();

  // useEffect(() => {
  //   // Set the Authorization header when session changes
  //   if (session?.accessToken) {
  //     aventoClient.defaults.headers.common['Authorization'] =
  //       `Bearer ${session.accessToken}`;
  //   } else {
  //     // Remove the Authorization header if no session
  //     delete aventoClient.defaults.headers.common['Authorization'];
  //   }
  // }, [session]);

  return aventoClient;
};
