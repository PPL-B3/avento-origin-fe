export interface AuditLogEntry {
  logID: string
  timestamp: string;
  eventType: string;
  userID: string;
  details: string;
  documentID: string;
}
