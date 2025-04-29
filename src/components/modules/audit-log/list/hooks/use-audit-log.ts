import { ENDPOINTS, useAventoClient } from '@/components/core';
import { useQuery } from 'react-query';
import { AuditLogPaginatedResponse } from '../types';

export const UseAuditLog = (
  query?: string,
  startDate?: string,
  endDate?: string,
  limit = 10,
  page = 1
) => {
  const client = useAventoClient();

  const { data, isFetching, error } = useQuery<
    AuditLogPaginatedResponse,
    Error
  >(['get-audit-log', query, limit, page, startDate, endDate], {
    queryFn: async () => {
      let apiUrl = `${ENDPOINTS.AUDIT_LOG_SEARCH}?limit=${limit}&page=${page}`;
      if (query) {
        apiUrl += `&query=${encodeURIComponent(query)}`;
      }
      if (startDate) {
        apiUrl += `&startDate=${encodeURIComponent(startDate)}`;
      }
      if (endDate) {
        apiUrl += `&endDate=${encodeURIComponent(endDate)}`;
      }
      const { data } = await client.get(apiUrl);
      return data as AuditLogPaginatedResponse;
    },
    refetchOnWindowFocus: false,
  });

  return {
    data,
    error,
    isFetching,
  };
};
