import { AuditLogModule } from '@/components/modules/audit-log';
import { render, screen } from '@testing-library/react';

jest.mock('@/components/modules/audit-log/list/hooks', () => ({
  UseAuditLog: jest.fn(),
}));

const mockQueryParams = {
  q: '',
  startDate: '2024-01-01',
  endDate: '2024-01-31',
  limit: 10,
  page: 1,
};

describe('AuditLogModule', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('shows loading state when isFetching is true', () => {
    const {
      UseAuditLog,
    } = require('@/components/modules/audit-log/list/hooks');
    UseAuditLog.mockReturnValue({
      data: null,
      isFetching: true,
    });

    render(<AuditLogModule queryParams={mockQueryParams} />);
    expect(screen.getByText('Loading audit logs...')).toBeInTheDocument();
  });

  it('shows loading state when data is null and isFetching is false', () => {
    const {
      UseAuditLog,
    } = require('@/components/modules/audit-log/list/hooks');
    UseAuditLog.mockReturnValue({
      data: null,
      isFetching: false,
    });

    render(<AuditLogModule queryParams={mockQueryParams} />);
    expect(screen.getByText('Loading audit logs...')).toBeInTheDocument();
  });

  it('renders AuditLogTable when data is available', () => {
    const {
      UseAuditLog,
    } = require('@/components/modules/audit-log/list/hooks');
    const mockData = {
      data: [
        {
          logID: 'log-001',
          timestamp: '2024-01-15T10:30:00Z',
          eventType: 'DOCUMENT_UPLOAD',
          userID: 'user-001',
          email: 'user@example.com',
          details: 'Document uploaded successfully',
          documentID: 'doc-001',
          documentName: 'Sample Document',
        },
        {
          logID: 'log-002',
          timestamp: '2024-01-15T11:00:00Z',
          eventType: 'DOCUMENT_TRANSFER',
          userID: 'user-002',
          email: 'user2@example.com',
          details: 'Document transferred to another user',
          documentID: 'doc-002',
          documentName: 'Transfer Document',
        },
      ],
      meta: {
        total: 2,
        page: 1,
        limit: 10,
        totalPages: 1,
      },
    };

    UseAuditLog.mockReturnValue({
      data: mockData,
      isFetching: false,
    });

    render(<AuditLogModule queryParams={mockQueryParams} />);
    expect(screen.getByText('Audit Log')).toBeInTheDocument();
  });
});
