import { z } from 'zod';

export interface AuditLogEntry {
  logID: string;
  timestamp: string;
  eventType: string;
  userID: string;
  email: string;
  details: string;
  documentID: string;
  q?: string;
  startDate?: string;
  documentName?: string;
  endDate?: string;
}

export interface PaginationMeta {
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}
export interface AuditLogPaginatedResponse {
  data: AuditLogEntry[];
  meta: PaginationMeta;
}

export const auditLogParamsSchema = z.object({
  page: z.coerce.number().default(1),
  limit: z.coerce.number().default(10),
  q: z.string().default(''),
  startDate: z.string().optional(),
  endDate: z.string().optional(),
  eventType: z.string().optional(),
});
