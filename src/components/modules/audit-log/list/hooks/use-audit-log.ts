import { ENDPOINTS, useAventoClient } from '@/components/core';
import { useQuery } from 'react-query';
import { AuditLogEntry } from '../types';

export const UseAuditLog = () => {
  const client = useAventoClient();

  const { data, isFetching, error } = useQuery<AuditLogEntry[], Error>(
    ['audit-log'],
    {
      queryFn: async () => {
        let apiUrl = `${ENDPOINTS.AUDIT_LOG}`;

        const { data } = await client.get(apiUrl);
        return data as AuditLogEntry[];
      },
      refetchOnWindowFocus: false,
    }
  );

  return {
    data,
    error,
    isFetching,
  };
};
