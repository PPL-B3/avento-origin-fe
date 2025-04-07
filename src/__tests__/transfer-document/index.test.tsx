import { TransferDocumentModal } from '@/components/core/elements/TransferDocument';
import { render, screen } from '@testing-library/react';
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

  it('renders correctly', () => {
    renderWithQueryClient(<TransferDocumentModal documentId={''} />);
    expect(screen.getByText('Transfer Document')).toBeInTheDocument();
  });

  it('opens TransferDialog when clicking Transfer Document button', async () => {
    renderWithQueryClient(<TransferDocumentModal documentId={''} />);
    await userEvent.click(screen.getByText('Transfer Document'));
    expect(screen.getByText('Transfer Form')).toBeInTheDocument();
  });

  it('enables send button when a valid email is entered', async () => {
    renderWithQueryClient(<TransferDocumentModal documentId={''} />);
    await userEvent.click(screen.getByText('Transfer Document'));
    await userEvent.type(
      screen.getByPlaceholderText('abc@gmail.com'),
      'valid@email.com'
    );
    expect(screen.getByText('Send')).toBeEnabled();
  });

  it('submits valid email and triggers OTP process', async () => {
    renderWithQueryClient(<TransferDocumentModal documentId={''} />);
    await userEvent.click(screen.getByText('Transfer Document'));
    await userEvent.type(
      screen.getByPlaceholderText('abc@gmail.com'),
      'duljaelani@gmail.com'
    );
    await userEvent.click(screen.getByText('Send'));
    expect(toast.success).toHaveBeenCalledWith('Email valid, OTP dikirim!');
  });

  it('shows error toast for invalid email submission', async () => {
    renderWithQueryClient(<TransferDocumentModal documentId={''} />);
    await userEvent.click(screen.getByText('Transfer Document'));
    await userEvent.type(
      screen.getByPlaceholderText('abc@gmail.com'),
      'invalid-email'
    );
    await userEvent.click(screen.getByText('Send'));
    expect(toast.error).toHaveBeenCalledWith('Email tidak valid');
  });

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

  it('does not render OtpDialog if OTP is empty', () => {
    renderWithQueryClient(<TransferDocumentModal documentId={''} />);
    expect(screen.queryByText('Here is your OTP!')).not.toBeInTheDocument();
  });
});
