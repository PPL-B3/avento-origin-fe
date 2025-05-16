import { AuditLogModule } from '@/components';
import { render, screen } from '@testing-library/react';

import AuditLogDetailPage from '@/app/(routes)/(admin)/audit-log/[doc_id]/page';
import AuditLogPage from '@/app/(routes)/(admin)/audit-log/page';

// Mock the AuditLogModule component
jest.mock('@/components', () => ({
  AuditLogModule: jest.fn(() => <div data-testid="audit-log-module" />),
  AuditLogDetailModule: jest.fn(() => (
    <div data-testid="audit-log-detail-module" />
  )),
}));

describe('AuditLogPage', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should render the AuditLogModule component', () => {
    render(<AuditLogPage />);

    // Check if AuditLogModule is rendered
    expect(screen.getByTestId('audit-log-module')).toBeInTheDocument();
    expect(AuditLogModule).toHaveBeenCalledTimes(1);
  });
});

describe('AuditLogDetailPage', () => {
  it('should render the AuditLogDetailModule component', () => {
    render(<AuditLogDetailPage />);

    expect(screen.getByTestId('audit-log-detail-module')).toBeInTheDocument();
  });
});
