import LoginPage from '@/app/(routes)/login/page';
import { LoginModule } from '@/components/modules/login';
import { render } from '@testing-library/react';

// Mock the LoginModule component
jest.mock('@/components/modules/login', () => ({
  LoginModule: jest.fn(() => <div data-testid="login-module" />),
}));

describe('LoginPage', () => {
  it('renders the LoginModule component', () => {
    const { getByTestId } = render(<LoginPage />);

    // Check if LoginModule is rendered
    expect(getByTestId('login-module')).toBeInTheDocument();

    // Verify LoginModule was called
    expect(LoginModule).toHaveBeenCalled();
  });
});
