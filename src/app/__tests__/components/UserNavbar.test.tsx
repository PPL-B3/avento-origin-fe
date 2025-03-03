import UserNavbar from '@/components/UserNavbar';
import { fireEvent, render, screen } from '@testing-library/react';
import { useRouter } from 'next/navigation';

// Mock next/navigation
jest.mock('next/navigation', () => ({
  useRouter: jest.fn(),
}));

describe('UserNavbar', () => {
  const pushMock = jest.fn();

  beforeEach(() => {
    (useRouter as jest.Mock).mockReturnValue({ push: pushMock });
    jest.clearAllMocks();
  });

  // positive test
  it('should render logo, Home, Upload Dokumen, and Logout button', () => {
    render(<UserNavbar />);
    expect(screen.getByAltText(/Logo/i)).toBeInTheDocument();
    expect(screen.getByText(/Home/i)).toBeInTheDocument();
    expect(screen.getByText(/Upload Dokumen/i)).toBeInTheDocument();
    expect(screen.getByText(/Logout/i)).toBeInTheDocument();
  });

  it('should navigate to home when logo is clicked', () => {
    render(<UserNavbar />);
    fireEvent.click(screen.getByAltText(/Logo/i));
    expect(pushMock).toHaveBeenCalledWith('/');
  });

  it('should navigate to home when Home is clicked', () => {
    render(<UserNavbar />);
    fireEvent.click(screen.getByText(/Home/i));
    expect(pushMock).toHaveBeenCalledWith('/');
  });

  it('should navigate to upload page when Upload Dokumen is clicked', () => {
    render(<UserNavbar />);
    fireEvent.click(screen.getByText(/Upload Dokumen/i));
    expect(pushMock).toHaveBeenCalledWith('/upload');
  });

  it('should call handleLogout and refresh page when Logout is clicked', () => {
    render(<UserNavbar />);
    fireEvent.click(screen.getByText(/Logout/i));
    expect(pushMock).toHaveBeenCalledWith('/');
  });

  // negative test
  it('should not navigate to incorrect paths', () => {
    render(<UserNavbar />);
    fireEvent.click(screen.getByText(/Home/i));
    expect(pushMock).not.toHaveBeenCalledWith('/upload');
    expect(pushMock).not.toHaveBeenCalledWith('/login');
  });
});
