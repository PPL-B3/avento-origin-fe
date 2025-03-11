import Navbar from '@/components/core/elements/Navbar';
import { render, screen } from '@testing-library/react';

// Mock useAuth hook - must be before the describe block
jest.mock('@/components/core', () => ({
  useAuth: () => ({
    user: {
      id: '1',
      name: 'Test User',
      email: 'test@example.com',
    },
    logout: jest.fn(),
    isLoading: false,
  }),
}));

describe('Navbar', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  const mockUser = {
    id: '1',
    name: 'Test User',
    email: 'test@example.com',
  };

  const mockLogout = jest.fn();

  it('renders correctly when user is logged in', () => {
    render(<Navbar />);

    expect(screen.getByRole('navigation')).toBeInTheDocument();
    expect(screen.getByAltText('Logo')).toBeInTheDocument();
  });

  it('does not render when user is loading', () => {
    jest
      .spyOn(require('@/components/core'), 'useAuth')
      .mockImplementation(() => ({
        user: null,
        logout: mockLogout,
        isLoading: true,
      }));

    const { container } = render(<Navbar />);
    expect(container).toBeEmptyDOMElement();
  });
});
