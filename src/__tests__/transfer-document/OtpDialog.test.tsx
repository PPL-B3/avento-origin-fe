import { OtpDialog } from '@/components/core/elements/TransferDocument/OtpDialog';
import { fireEvent, render, screen } from '@testing-library/react';

describe('OtpDialog Component', () => {
  const defaultProps = {
    open: true,
    onOpenChange: jest.fn(),
    otp: '123456',
    email: '',
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  // Positive case
  it('renders correctly when open', () => {
    render(<OtpDialog {...defaultProps} />);

    expect(screen.getByText('Here is your OTP!')).toBeInTheDocument();
    expect(screen.getByText('123456')).toBeInTheDocument();
  });

  it('close when Done button is clicked', () => {
    render(<OtpDialog {...defaultProps} />);

    fireEvent.click(screen.getByText('Done'));
    expect(defaultProps.onOpenChange).toHaveBeenCalled();
  });

  // Negative case
  it('does not render when open is false', () => {
    render(<OtpDialog {...defaultProps} open={false} />);

    expect(screen.queryByText('123456')).not.toBeInTheDocument();
  });

  // Corner case
  it('does not render if no OTP is provided', () => {
    render(<OtpDialog {...defaultProps} otp="" />);

    expect(screen.queryByText('Here is your OTP!')).not.toBeInTheDocument();
  });
});
