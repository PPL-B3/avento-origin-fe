import { AuthButtons } from '@/components/core/elements/Navbar/AuthButton';
import { fireEvent, render, screen } from '@testing-library/react';

// Mock useRouter
const mockPush = jest.fn();
jest.mock('next/navigation', () => ({
  useRouter: () => ({
    push: mockPush,
  }),
}));

describe('AuthButtons Component', () => {
  const mockLogout = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders login button when user is not logged in', () => {
    render(<AuthButtons user={null} logout={mockLogout} />);

    const loginButton = screen.getByText('Login');
    expect(loginButton).toBeInTheDocument();
    expect(screen.queryByText('Logout')).not.toBeInTheDocument();
  });

  it('renders logout button when user is logged in', () => {
    render(
      <AuthButtons
        user={{
          id: '1',
          email: 'john-doe@gmail.com',
          role: 'user',
          lastLogout: new Date().toISOString(),
        }}
        logout={mockLogout}
      />
    );

    const logoutButton = screen.getByText('Logout');
    expect(logoutButton).toBeInTheDocument();
    expect(screen.queryByText('Login')).not.toBeInTheDocument();
  });

  it('navigates to login page when login button is clicked', () => {
    render(<AuthButtons user={null} logout={mockLogout} />);

    fireEvent.click(screen.getByText('Login'));
    expect(mockPush).toHaveBeenCalledWith('/auth/login');
    expect(mockLogout).not.toHaveBeenCalled();
  });

  it('calls logout function when logout button is clicked', () => {
    render(
      <AuthButtons
        user={{
          id: '1',
          email: 'john-doe@gmail.com',
          role: 'user',
          lastLogout: new Date().toISOString(),
        }}
        logout={mockLogout}
      />
    );

    fireEvent.click(screen.getByText('Logout'));
    expect(mockLogout).toHaveBeenCalledTimes(1);
    expect(mockPush).not.toHaveBeenCalled();
  });
});
