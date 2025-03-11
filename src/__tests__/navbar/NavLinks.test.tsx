import { NavLinks } from '@/components/core/elements/Navbar/NavLinks';
import { fireEvent, render, screen } from '@testing-library/react';

const mockPush = jest.fn();
jest.mock('next/navigation', () => ({
  useRouter: () => ({
    push: mockPush,
  }),
}));

describe('NavLinks Component', () => {
  it('shows Home and Upload Document when logged in', () => {
    render(<NavLinks user={{ id: '1', name: 'dul' }} />);

    expect(screen.getByText('Home')).toBeInTheDocument();
    expect(screen.getByText('Upload Document')).toBeInTheDocument();
  });

  it('does not show any links when not logged in', () => {
    render(<NavLinks user={null} />);

    expect(screen.queryByText('Home')).not.toBeInTheDocument();
    expect(screen.queryByText('Upload Document')).not.toBeInTheDocument();
  });

  it('navigates to correct route when link is clicked', () => {
    render(<NavLinks user={{ id: '1', name: 'Test User' }} />);

    fireEvent.click(screen.getByText('Home'));
    expect(mockPush).toHaveBeenCalledWith('/home');

    fireEvent.click(screen.getByText('Upload Document'));
    expect(mockPush).toHaveBeenCalledWith('/upload-document');
  });
});
