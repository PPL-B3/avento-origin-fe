import GuestNavbar from '@/components/GuestNavbar';
import { fireEvent, render, screen } from '@testing-library/react';
import { useRouter } from 'next/navigation';

// 🔧 Mock next/navigation
jest.mock('next/navigation', () => ({
  useRouter: jest.fn(),
}));

describe('GuestNavbar', () => {
  const pushMock = jest.fn();

  beforeEach(() => {
    (useRouter as jest.Mock).mockReturnValue({ push: pushMock });
    jest.clearAllMocks();
  });

  // positive test
  it('should render logo and login button', () => {
    render(<GuestNavbar />);
    expect(screen.getByAltText(/Logo/i)).toBeInTheDocument();
    expect(screen.getByText(/Login/i)).toBeInTheDocument();
  });

  it('should navigate to /login when Login button is clicked', () => {
    render(<GuestNavbar />);
    fireEvent.click(screen.getByText(/Login/i));
    expect(pushMock).toHaveBeenCalledWith('/login');
  });

  it('should navigate to home when logo is clicked', () => {
    render(<GuestNavbar />);
    fireEvent.click(screen.getByAltText(/Logo/i));
    expect(pushMock).toHaveBeenCalledWith('/');
  });

  // negative test
  it('should not render logout button', () => {
    render(<GuestNavbar />);
    expect(screen.queryByText(/Logout/i)).not.toBeInTheDocument();
  });

  it('should not navigate to incorrect paths', () => {
    render(<GuestNavbar />);
    fireEvent.click(screen.getByText(/Login/i));
    expect(pushMock).not.toHaveBeenCalledWith('/home');
    expect(pushMock).not.toHaveBeenCalledWith('/upload');
  });
});
