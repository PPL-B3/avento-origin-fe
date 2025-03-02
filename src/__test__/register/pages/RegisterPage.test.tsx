import RegisterPage from '@/app/(routes)/register/page';
import { render, screen } from '@testing-library/react';

// Mock the RegisterModule component since we want to test the page in isolation
jest.mock('../../components', () => ({
  RegisterModule: () => (
    <div data-testid="register-module">Register Module</div>
  ),
}));

describe('Register Page', () => {
  it('renders the RegisterModule component', () => {
    render(<RegisterPage />);
    expect(screen.getByTestId('register-module')).toBeInTheDocument();
  });
});
