import { TransferDocumentModal } from '@/components/core/elements/TransferDocument';
import { useTransferDocument } from '@/components/core/hooks/use-transfer-document';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { QueryClient, QueryClientProvider } from 'react-query';
import { toast } from 'sonner';

const createTestQueryClient = () =>
  new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
      },
    },
  });

const renderWithQueryClient = (ui: React.ReactElement) => {
  const queryClient = createTestQueryClient();
  return render(
    <QueryClientProvider client={queryClient}>{ui}</QueryClientProvider>
  );
};

jest.mock('@/components/core/hooks/use-transfer-document', () => ({
  useTransferDocument: jest.fn(),
}));

// Mock dependencies
jest.mock('sonner', () => ({
  toast: {
    error: jest.fn(),
    success: jest.fn(),
    loading: jest.fn(),
    dismiss: jest.fn(),
  },
}));

describe('TransferDocumentModal', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    (useTransferDocument as jest.Mock).mockReturnValue({
      onTransferDocument: jest.fn(() => Promise.resolve({ otp: '123456' })), // Mock OTP response
      isLoadingTransferDocument: false,
    });
  });

  // Positive case
  it('renders correctly', () => {
    renderWithQueryClient(<TransferDocumentModal documentId={'123'} />);

    expect(screen.getByText('Transfer Document')).toBeInTheDocument();
  });

  it('opens TransferDialog when clicking Transfer Document button', async () => {
    renderWithQueryClient(<TransferDocumentModal documentId={'123'} />);

    await userEvent.click(screen.getByText('Transfer Document'));
    expect(screen.getByText('Transfer Form')).toBeInTheDocument();
  });

  it('submits valid email and triggers OTP process', async () => {
    renderWithQueryClient(<TransferDocumentModal documentId={'123'} />);

    await userEvent.click(screen.getByText('Transfer Document'));
    await userEvent.type(
      screen.getByPlaceholderText('abc@gmail.com'),
      'duljaelani@gmail.com'
    );
    await userEvent.click(screen.getByText('Send'));

    expect(screen.getByText('Here is your OTP!')).toBeInTheDocument();
    expect(screen.getByText('123456')).toBeInTheDocument();
  });

  // Negative case
  it('shows error toast for invalid email submission', async () => {
    renderWithQueryClient(<TransferDocumentModal documentId={'123'} />);

    await userEvent.click(screen.getByText('Transfer Document'));
    await userEvent.type(
      screen.getByPlaceholderText('abc@gmail.com'),
      'invalid-email'
    );
    await userEvent.click(screen.getByText('Send'));
    expect(toast.error).toHaveBeenCalledWith('Email tidak valid');
  });

  it('shows error toast when transfer document fails', async () => {
    (useTransferDocument as jest.Mock).mockReturnValue({
      onTransferDocument: jest.fn(() => Promise.reject(new Error('Error'))), // Simulate failed transfer
      isLoadingTransferDocument: false,
    });

    renderWithQueryClient(<TransferDocumentModal documentId="123" />);
    await userEvent.click(screen.getByText('Transfer Document'));
    await userEvent.type(
      screen.getByPlaceholderText('abc@gmail.com'),
      'duljaelani@gmail.com'
    );
    await userEvent.click(screen.getByText('Send'));

    await waitFor(() => {
      expect(toast.error).toHaveBeenCalledWith(
        'Terjadi kesalahan saat mentransfer dokumen'
      );
    });
  });

  // Corner case
  it('shows error toast when invalid email format is entered multiple times', async () => {
    renderWithQueryClient(<TransferDocumentModal documentId={''} />);
    await userEvent.click(screen.getByText('Transfer Document'));

    const input = screen.getByPlaceholderText('abc@gmail.com');

    await userEvent.type(input, 'invalid-email');
    await userEvent.click(screen.getByText('Send'));
    expect(toast.error).toHaveBeenCalledWith('Email tidak valid');

    await userEvent.clear(input);
    await userEvent.type(input, 'invalid-email2');
    await userEvent.click(screen.getByText('Send'));
    expect(toast.error).toHaveBeenCalledWith('Email tidak valid');
  });

  it('enables send button when a valid email is entered', async () => {
    renderWithQueryClient(<TransferDocumentModal documentId={'123'} />);

    await userEvent.click(screen.getByText('Transfer Document'));
    await userEvent.type(
      screen.getByPlaceholderText('abc@gmail.com'),
      'duljaelani@gmail.com'
    );
    expect(screen.getByText('Send')).toBeEnabled();
  });

  it('disables Send button when transfer document is loading', async () => {
    (useTransferDocument as jest.Mock).mockReturnValue({
      onTransferDocument: jest.fn(() => new Promise(() => {})), // Simulate loading
      isLoadingTransferDocument: true,
    });

    renderWithQueryClient(<TransferDocumentModal documentId={''} />);
    await userEvent.click(screen.getByText('Transfer Document'));
    expect(screen.getByText('Sending...')).toBeDisabled();
  });
});
