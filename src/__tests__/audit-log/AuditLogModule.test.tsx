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
      data: [{ id: 1, action: 'VIEWED' }],
      meta: { totalPages: 5 },
    };

    UseAuditLog.mockReturnValue({
      data: mockData,
      isFetching: false,
    });

    render(<AuditLogModule queryParams={mockQueryParams} />);
    expect(screen.getByText('Audit Log')).toBeInTheDocument();
  });
});
