import { AuditLogModule } from '@/components/modules/audit-log/list';
import { render, screen } from '@testing-library/react';

describe('AuditLogModule', () => {
  it('renders the audit log title', () => {
    render(<AuditLogModule />);
    expect(screen.getByText('Audit Log')).toBeInTheDocument();
  });

  it('renders the audit log table with dummy data', () => {
    render(<AuditLogModule />);
    // Check for table entries from dummy data
    expect(screen.getByText('User login')).toBeInTheDocument();
    expect(screen.getByText("User 'admin' logged in")).toBeInTheDocument();
    expect(screen.getByText('Transfer dokumen')).toBeInTheDocument();
    expect(screen.getByText('Lorem Ipsum')).toBeInTheDocument();
    expect(screen.getByText('Tuan Krab')).toBeInTheDocument();
    expect(screen.getByText('Plankton')).toBeInTheDocument();
  });
});
