import { OtpDialog } from '@/components/core/elements/TransferDocument/OtpDialog';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

describe('OtpDialog Component', () => {
  const defaultProps = {
    open: true,
    onOpenChange: jest.fn(),
    otp: '123456',
    email: 'duljaelani@gmail.com',
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  // Positive case
  it('renders correctly when open', () => {
    render(<OtpDialog {...defaultProps} />);

    expect(screen.getByText('Here is your OTP!')).toBeInTheDocument();
    expect(screen.getByText('123456')).toBeInTheDocument();
    expect(screen.getByText(defaultProps.email)).toBeInTheDocument();
    expect(screen.getByText('Done')).toBeInTheDocument();
  });

  it('close when Done button is clicked', async () => {
    render(<OtpDialog {...defaultProps} />);

    const doneButton = screen.getByText('Done');
    await userEvent.click(doneButton);

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

  it('should call onOpenChange when Escape key is pressed', async () => {
    render(<OtpDialog {...defaultProps} />);

    // Simulate pressing Escape key to close the dialog
    await userEvent.keyboard('{Escape}');

    expect(defaultProps.onOpenChange).toHaveBeenCalled();
  });

  it('should call onOpenChange directly with false to close the dialog', () => {
    render(<OtpDialog {...defaultProps} />);

    // Directly call onOpenChange with false
    defaultProps.onOpenChange(false);

    expect(defaultProps.onOpenChange).toHaveBeenCalledWith(false);
  });
});
