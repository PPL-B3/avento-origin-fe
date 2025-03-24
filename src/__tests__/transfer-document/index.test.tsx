import { TransferDocumentModal } from '@/components/core/elements/TransferDocument';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { toast } from 'sonner';

// Mock dependencies
jest.mock('sonner', () => ({
  toast: {
    error: jest.fn(),
    success: jest.fn(),
  },
}));

describe('TransferDocumentModal', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  // Positive case
  it('renders correctly', () => {
    render(<TransferDocumentModal />);
    expect(screen.getByText('Transfer Dokumen')).toBeInTheDocument();
  });

  it('opens TransferDialog when clicking Transfer Dokumen button', async () => {
    render(<TransferDocumentModal />);
    await userEvent.click(screen.getByText('Transfer Dokumen'));
    expect(screen.getByText('Transfer Form')).toBeInTheDocument();
  });

  it('enables send button when a valid email is entered', async () => {
    render(<TransferDocumentModal />);
    await userEvent.click(screen.getByText('Transfer Dokumen'));
    await userEvent.type(
      screen.getByPlaceholderText('abc@gmail.com'),
      'valid@email.com'
    );
    expect(screen.getByText('Send')).toBeEnabled();
  });

  it('submits valid email and triggers OTP process', async () => {
    render(<TransferDocumentModal />);
    await userEvent.click(screen.getByText('Transfer Dokumen'));
    await userEvent.type(
      screen.getByPlaceholderText('abc@gmail.com'),
      'duljaelani@gmail.com'
    );
    await userEvent.click(screen.getByText('Send'));
    expect(toast.success).toHaveBeenCalledWith('Email valid, OTP dikirim!');
  });

  // Negative case
  it('shows error toast for invalid email submission', async () => {
    render(<TransferDocumentModal />);
    await userEvent.click(screen.getByText('Transfer Dokumen'));
    await userEvent.type(
      screen.getByPlaceholderText('abc@gmail.com'),
      'invalid-email'
    );
    await userEvent.click(screen.getByText('Send'));
    expect(toast.error).toHaveBeenCalledWith('Email tidak valid');
  });

  // Corner case
  it('shows error toast when invalid email format is entered multiple times', async () => {
    render(<TransferDocumentModal />);

    await userEvent.click(screen.getByText('Transfer Dokumen'));
    await userEvent.type(
      screen.getByPlaceholderText('abc@gmail.com'),
      'invalid-email'
    );
    await userEvent.click(screen.getByText('Send'));
    expect(toast.error).toHaveBeenCalledWith('Email tidak valid');

    await userEvent.type(
      screen.getByPlaceholderText('abc@gmail.com'),
      'invalid-email2'
    );
    await userEvent.click(screen.getByText('Send'));
    expect(toast.error).toHaveBeenCalledWith('Email tidak valid');
  });

  it('handles case when OTP is empty and OtpDialog does not render', () => {
    render(<TransferDocumentModal />);

    expect(screen.queryByText('Here is your OTP!')).not.toBeInTheDocument();
  });
});
