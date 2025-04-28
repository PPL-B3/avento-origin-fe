import { z } from 'zod';

export interface AuditLogEntry {
  logID: string;
  timestamp: string;
  eventType: string;
  userID: string;
  details: string;
  documentID: string;
}

export const auditLogParamsSchema = z.object({
  page: z.coerce.number().default(1),
  limit: z.coerce.number().default(10),
  query: z.string().default(''),
});
