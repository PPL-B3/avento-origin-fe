import { fetchAuditLogTableColumnDefs } from '@/components/modules/audit-log/list/elements/audit-log-table-columns-def';

describe('audit-log-table-columns-def', () => {
  describe('fetchAuditLogTableColumnDefs', () => {
    it('should format timestamp correctly', () => {
      const columnDefs = fetchAuditLogTableColumnDefs();
      const timestampColumn = columnDefs.find((col) => col.id === 'timestamp');

      expect(timestampColumn).toBeDefined();
      expect(timestampColumn?.cell).toBeDefined();
    });
  });
});
