import { fetchAuditLogTableColumnDefs } from '@/components/modules/audit-log/list/elements/audit-log-table-columns-def';

describe('audit-log-table-columns-def', () => {
  describe('fetchAuditLogTableColumnDefs', () => {
    it('should return an array of column definitions', () => {
      const columnDefs = fetchAuditLogTableColumnDefs();
      expect(columnDefs).toBeInstanceOf(Array);
      expect(columnDefs.length).toBe(5);
    });

    it('should format timestamp correctly', () => {
      const columnDefs = fetchAuditLogTableColumnDefs();
      const timestampColumn = columnDefs.find((col) => col.id === 'timestamp');

      expect(timestampColumn).toBeDefined();
      expect(timestampColumn?.cell).toBeDefined();
    });

    it('should define correct headers for all columns', () => {
      const columnDefs = fetchAuditLogTableColumnDefs();

      expect(columnDefs[0].header).toBe('Timestamp');
      expect(columnDefs[1].header).toBe('Log ID');
      expect(columnDefs[2].header).toBe('Event Type');
      expect(columnDefs[3].header).toBe('User ID');
      expect(columnDefs[4].header).toBe('Document ID');
    });
  });
});
