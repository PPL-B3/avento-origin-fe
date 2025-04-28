import { OtpInputForm } from '@/components/modules/shared/OTPVerification/OTPInputForm';
import { fireEvent, render, screen } from '@testing-library/react';

// Add ResizeObserver mock
class ResizeObserverMock {
  observe() {}
  unobserve() {}
  disconnect() {}
}

global.ResizeObserver = ResizeObserverMock;

describe('OtpInputForm', () => {
  const baseProps = {
    otp: '',
    setOtp: jest.fn(),
    isLoading: false,
    onSubmit: jest.fn(),
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  // Positive case
  it('should render the OTP input slots and verify button', () => {
    render(<OtpInputForm {...baseProps} />);

    expect(screen.getByText('Enter OTP:')).toBeInTheDocument();
    // 6 OTP slots
    const inputs = screen.getByRole('textbox');
    expect(inputs).toBeInTheDocument();

    const button = screen.getByRole('button', { name: 'Verify' });
    expect(button).toBeInTheDocument();
  });

  it('should enable Verify button if otp is complete and calls onSubmit when clicked', () => {
    render(<OtpInputForm {...baseProps} otp="123456" />);
    const button = screen.getByRole('button', { name: 'Verify' });
    expect(button).toBeEnabled();

    fireEvent.click(button);
    expect(baseProps.onSubmit).toHaveBeenCalled();
  });

  it('should show loading text when isLoading is true', () => {
    render(<OtpInputForm {...baseProps} isLoading={true} otp="123456" />);
    const button = screen.getByRole('button', { name: 'Verifying...' });
    expect(button).toBeDisabled();
  });

  // Negative case
  it('should disable Verify button if otp is incomplete', () => {
    render(<OtpInputForm {...baseProps} otp="123" />);
    const button = screen.getByRole('button', { name: 'Verify' });
    expect(button).toBeDisabled();
  });

  it('should disable Verify button if isLoading is true', () => {
    render(<OtpInputForm {...baseProps} isLoading={true} />);
    const button = screen.getByRole('button', { name: 'Verifying...' });
    expect(button).toBeDisabled();
  });

  it('should not render resend button if onResend is not provided', () => {
    render(<OtpInputForm {...baseProps} />);
    const resend = screen.queryByRole('button', { name: /Resend OTP/i });
    expect(resend).not.toBeInTheDocument();
  });

  // Corner case
  it('should render resend button if onResend is provided and calls onResend when clicked', () => {
    const propsWithResend = { ...baseProps, onResend: jest.fn() };
    render(<OtpInputForm {...propsWithResend} />);
    const resend = screen.getByRole('button', { name: /Resend OTP/i });
    expect(resend).toBeInTheDocument();
  });

  it('should show loading text when isResending is true', () => {
    const propsWithResend = {
      ...baseProps,
      onResend: jest.fn(),
      isResending: true,
    };
    render(<OtpInputForm {...propsWithResend} />);
    const resend = screen.getByRole('button', { name: /Resending.../i });
    expect(resend).toBeDisabled();
  });
});
