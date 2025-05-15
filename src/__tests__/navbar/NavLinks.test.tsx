import { NavLinks } from '@/components/core/elements/Navbar/NavLinks';
import { fireEvent, render, screen } from '@testing-library/react';

const mockPush = jest.fn();
jest.mock('next/navigation', () => ({
  useRouter: () => ({
    push: mockPush,
  }),
}));

describe('NavLinks Component', () => {
  it('does not show any links when not logged in', () => {
    render(<NavLinks user={null} />);

    expect(screen.queryByText('Home')).not.toBeInTheDocument();
    expect(screen.queryByText('Upload Document')).not.toBeInTheDocument();
  });


  it('shows both links for ADMIN user', () => {
    render(<NavLinks user={{ role: 'ADMIN', id: '1', email: 'admin@example.com', lastLogout: new Date().toISOString() }} />);
    expect(screen.getByText('Upload Document')).toBeInTheDocument();
    expect(screen.getByText('Audit Log')).toBeInTheDocument();
  });

  it('shows only upload link for USER', () => {
    render(<NavLinks user={{ role: 'USER', id: '2', email: 'user@example.com', lastLogout: new Date().toISOString() }} />);
    expect(screen.getByText('Upload Document')).toBeInTheDocument();
    expect(screen.queryByText('Audit Log')).not.toBeInTheDocument();
  });

  it('navigates when link is clicked', () => {
    render(<NavLinks user={{ role: 'USER', id: '2', email: 'user@example.com', lastLogout: new Date().toISOString() }} />);
    fireEvent.click(screen.getByText('Upload Document'));
    expect(mockPush).toHaveBeenCalledWith('/upload-document');
  });

});
