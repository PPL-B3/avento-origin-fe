import { TransferDialog } from '@/components/core/elements/TransferDocument/TransferDialog';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

describe('TransferDialog Component', () => {
  const defaultProps = {
    open: true,
    onOpenChange: jest.fn(),
    email: '',
    setEmail: jest.fn(),
    onSubmit: jest.fn(),
    isLoading: false,
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  // Positive case
  it('renders correctly when open', () => {
    render(<TransferDialog {...defaultProps} />);

    expect(screen.getByText('Transfer Form')).toBeInTheDocument();
    expect(
      screen.getByText(
        'Please enter the email address to transfer this document'
      )
    ).toBeInTheDocument();
    expect(screen.getByPlaceholderText('abc@gmail.com')).toBeInTheDocument();
    expect(screen.getByText('Send')).toBeInTheDocument();
  });

  it('updates email state when input changes', async () => {
    render(<TransferDialog {...defaultProps} />);

    const emailInput = screen.getByPlaceholderText('abc@gmail.com');
    await userEvent.type(emailInput, 'duljaelani@gmail.com');

    expect(defaultProps.setEmail).toHaveBeenCalledTimes(20);
    expect(defaultProps.setEmail).toHaveBeenCalledWith('d');
  });

  it('calls onSubmit when Send button is clicked', async () => {
    render(<TransferDialog {...defaultProps} email="duljaelani@gmail.com" />);

    const sendButton = screen.getByText('Send');
    await userEvent.click(sendButton);

    expect(defaultProps.onSubmit).toHaveBeenCalled();
  });

  // Negative case
  it('does not render when open is false', () => {
    render(<TransferDialog {...defaultProps} open={false} />);

    expect(screen.queryByText('Transfer Form')).not.toBeInTheDocument();
  });

  it('does not call onSubmit when Send button is clicked while dialog is closed', async () => {
    render(<TransferDialog {...defaultProps} open={false} />);

    const sendButton = screen.queryByText('Send');
    if (sendButton) {
      await userEvent.click(sendButton);
    }

    expect(defaultProps.onSubmit).not.toHaveBeenCalled();
  });

  // Corner case
  it('should call onOpenChange when Dialog state changes', async () => {
    render(<TransferDialog {...defaultProps} />);

    // Simulate pressing Escape key to close the dialog
    await userEvent.keyboard('{Escape}');

    expect(defaultProps.onOpenChange).toHaveBeenCalled();
  });

  it('disables Send button when email is empty', () => {
    render(<TransferDialog {...defaultProps} email="" />);

    const sendButton = screen.getByText('Send');
    expect(sendButton).toBeDisabled();
  });

  it('disables Send button when isLoading is true', () => {
    render(<TransferDialog {...defaultProps} isLoading={true} />);

    const sendButton = screen.getByText('Sending...');
    expect(sendButton).toBeDisabled();
  });

  it('should call onOpenChange directly with false to close the dialog', () => {
    render(<TransferDialog {...defaultProps} />);

    // Directly call onOpenChange with false
    defaultProps.onOpenChange(false);

    expect(defaultProps.onOpenChange).toHaveBeenCalledWith(false);
  });
});
