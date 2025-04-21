import { OTPVerificationCard } from '@/components/modules/shared/OTPVerification/OTPVerificationCard';
import { render, screen } from '@testing-library/react';

// Add ResizeObserver mock
class ResizeObserverMock {
    observe() {}
    unobserve() {}
    disconnect() {}
  }
  
global.ResizeObserver = ResizeObserverMock;

describe('OTPVerificationCard', () => {
  const mockSubmit = jest.fn();
  const mockResend = jest.fn();
  const mockSetOtp = jest.fn();

  const defaultProps = {
    title: 'OTP Verification',
    description: 'Please enter the OTP sent to your email.',
    otp: '',
    setOtp: mockSetOtp,
    isLoading: false,
    onSubmit: mockSubmit,
    onResend: mockResend,
    isResending: false,
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  // Positive case
  it('renders the title and description', () => {
    render(<OTPVerificationCard {...defaultProps} />);
    expect(screen.getByText(defaultProps.title)).toBeInTheDocument();
    expect(screen.getByText(defaultProps.description)).toBeInTheDocument();
  });

  it('renders the OTP input form', () => {
    render(<OTPVerificationCard {...defaultProps} />);
    expect(screen.getByText('Enter OTP:')).toBeInTheDocument();
    const inputs = screen.getByRole('textbox');
    expect(inputs).toBeInTheDocument();
  });

  it('should render DocumentInfo with currentOwnerEmail and documentName', () => {
    render(<OTPVerificationCard {...defaultProps} currentOwnerEmail="duljaelani@gmail.com" documentName="Roman Picisan.pdf" />);
    expect(screen.getByText(/From:/i)).toBeInTheDocument();
    expect(screen.getByText(/Document Name:/i)).toBeInTheDocument();
  });

  // Negative case
  it('should not render Resend OTP button if onResend is not provided', () => {
    render(<OTPVerificationCard {...defaultProps} onResend={undefined} />);
    expect(screen.queryByText(/Resend OTP/)).not.toBeInTheDocument();
  });

  it('should disable Verify button when isLoading is true', () => {
    render(<OTPVerificationCard {...defaultProps} isLoading={true} />);
    expect(screen.getByText('Verifying...')).toBeDisabled();
  });

  // Corner case
  it('can be rendered without optional props', () => {
    const minimalProps = {
      ...defaultProps,
      currentOwnerEmail: undefined,
      documentName: undefined,
    };
    render(<OTPVerificationCard {...minimalProps} />);
    expect(screen.queryByText(/From:/)).not.toBeInTheDocument();
    expect(screen.queryByText(/Document Name:/)).not.toBeInTheDocument();
  });
});
