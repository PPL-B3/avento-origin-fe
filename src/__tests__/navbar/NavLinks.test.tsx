import NavLinks from '@/components/core/elements/Navbar/NavLinks';
import { fireEvent, render, screen } from '@testing-library/react';

import { useRouter } from 'next/navigation';

jest.mock('next/navigation', () => ({
  useRouter: jest.fn(),
}));

describe('NavLinks Component', () => {
  it('shows Home and Upload Document when logged in', () => {
    render(<NavLinks isLoggedIn={true} />);

    expect(screen.getByText('Home')).toBeInTheDocument();
    expect(screen.getByText('Upload Document')).toBeInTheDocument();
  });

  it('does not show any links when not logged in', () => {
    render(<NavLinks isLoggedIn={false} />);

    expect(screen.queryByText('Home')).not.toBeInTheDocument();
    expect(screen.queryByText('Upload Document')).not.toBeInTheDocument();
  });

  it('calls `router.push` when clicking a menu item', () => {
    const pushMock = jest.fn();
    (useRouter as jest.Mock).mockReturnValue({ push: pushMock });

    render(<NavLinks isLoggedIn={true} />);

    const homeLink = screen.getByText('Home');
    fireEvent.click(homeLink);

    expect(pushMock).toHaveBeenCalledWith('/home');
  });
});
