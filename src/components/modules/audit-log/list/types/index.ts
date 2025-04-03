export interface AuditLogEntry {
  timestamp: string;
  activity: string;
  detail: string;
  previous_user: string;
  new_user: string;
}
