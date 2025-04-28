import { ENDPOINTS, useAventoClient } from '@/components/core';
import { useQuery } from 'react-query';
import { AuditLogEntry } from '../types';

export const UseAuditLog = (query?: string, limit = 10, page = 1) => {
  const client = useAventoClient();

  const { data, isFetching, error } = useQuery<AuditLogEntry[], Error>(
    ['get-audit-log', query, limit, page],
    {
      queryFn: async () => {
        let apiUrl = `${ENDPOINTS.AUDIT_LOG}?limit=${limit}&page=${page}`;
        if (query) {
          apiUrl += `&query=${encodeURIComponent(query)}`;
        }
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
