import '@testing-library/jest-dom';
import { fireEvent, render, screen } from '@testing-library/react';
import { RegisterModule } from '../../../components/modules/register';

// Mock the child components
jest.mock('../../../components/modules/register/elements', () => ({
  Logo: () => <div data-testid="mock-logo">Logo Component</div>,
  RegistrationForm: () => (
    <div data-testid="mock-registration-form">Registration Form Component</div>
  ),
}));

jest.mock('../../../components/modules/login/components', () => ({
  AuthTabs: ({
    activeTab,
    setActiveTab,
  }: {
    activeTab: string;
    setActiveTab: (tab: string) => void;
  }) => (
    <div data-testid="mock-auth-tabs">
      <span data-testid="active-tab">{activeTab}</span>
      <button
        data-testid="switch-tab"
        onClick={() =>
          setActiveTab(activeTab === 'REGISTRASI' ? 'LOGIN' : 'REGISTRASI')
        }
      >
        Switch Tab
      </button>
    </div>
  ),
}));

describe('RegisterModule', () => {
  it('renders the component correctly', () => {
    render(<RegisterModule />);

    expect(screen.getByTestId('register-module')).toBeInTheDocument();
  });

  it('displays the Logo component', () => {
    render(<RegisterModule />);

    expect(screen.getByTestId('mock-logo')).toBeInTheDocument();
  });

  it('displays the AuthTabs component with correct initial props', () => {
    render(<RegisterModule />);

    expect(screen.getByTestId('mock-auth-tabs')).toBeInTheDocument();
    expect(screen.getByTestId('active-tab')).toHaveTextContent('REGISTRASI');
  });

  it('displays the RegistrationForm when activeTab is REGISTRASI', () => {
    render(<RegisterModule />);

    expect(screen.getByTestId('mock-registration-form')).toBeInTheDocument();
  });

  it('does not display RegistrationForm when activeTab is not REGISTRASI', () => {
    render(<RegisterModule />);

    // Change tab to something other than REGISTRASI
    fireEvent.click(screen.getByTestId('switch-tab'));

    expect(
      screen.queryByTestId('mock-registration-form')
    ).not.toBeInTheDocument();
  });

  it('can switch between tabs', () => {
    render(<RegisterModule />);

    // Initial state is REGISTRASI
    expect(screen.getByTestId('active-tab')).toHaveTextContent('REGISTRASI');
    expect(screen.getByTestId('mock-registration-form')).toBeInTheDocument();

    // Switch to LOGIN
    fireEvent.click(screen.getByTestId('switch-tab'));
    expect(screen.getByTestId('active-tab')).toHaveTextContent('LOGIN');
    expect(
      screen.queryByTestId('mock-registration-form')
    ).not.toBeInTheDocument();

    // Switch back to REGISTRASI
    fireEvent.click(screen.getByTestId('switch-tab'));
    expect(screen.getByTestId('active-tab')).toHaveTextContent('REGISTRASI');
    expect(screen.getByTestId('mock-registration-form')).toBeInTheDocument();
  });
});
