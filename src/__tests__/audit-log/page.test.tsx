import AuditLogPage from '@/app/(routes)/(admin)/audit-log/page';
import { AuditLogModule } from '@/components';
import { render, screen } from '@testing-library/react';

// Mock the AuditLogModule component
jest.mock('@/components', () => ({
  AuditLogModule: jest.fn(() => <div data-testid="audit-log-module" />),
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
