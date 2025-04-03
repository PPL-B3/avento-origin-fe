import { AuditLogModule } from '@/components';
import { render, screen } from '@testing-library/react';

describe('AuditLogModule', () => {
  it('renders the component correctly', () => {
    render(<AuditLogModule />);

    // Check if the component renders
    const sectionElement = screen.getByRole('region');
    expect(sectionElement).toBeInTheDocument();
  });

  it('displays the Audit Log heading', () => {
    render(<AuditLogModule />);

    // Check if the heading is present
    const headingElement = screen.getByRole('heading', { name: /Audit Log/i });
    expect(headingElement).toBeInTheDocument();
    expect(headingElement.tagName).toBe('H2');
  });

  it('has the correct structure', () => {
    const { container } = render(<AuditLogModule />);

    // Check the structure
    expect(container.firstChild).toHaveProperty('tagName', 'SECTION');
    expect(container.firstChild?.firstChild).toHaveProperty('tagName', 'H2');
  });
});
