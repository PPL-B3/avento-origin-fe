import RegisterPage from '@/app/(routes)/register/page';
import '@testing-library/jest-dom';
import { render } from '@testing-library/react';

// Mock the RegisterModule component
jest.mock('../../../components/modules/register', () => ({
  RegisterModule: () => (
    <div data-testid="mocked-register-module">Mocked Register Module</div>
  ),
}));

describe('RegisterPage', () => {
  it('renders the RegisterModule component', () => {
    const { getByTestId } = render(<RegisterPage />);
    expect(getByTestId('mocked-register-module')).toBeInTheDocument();
  });
});
