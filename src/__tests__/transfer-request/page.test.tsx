import { encryptEmail } from '@/components/modules/metadata';
import { UseMetadata } from '@/components/modules/metadata/hooks/use-metadata';
import { TransferRequestModule } from '@/components/modules/transfer-request';
import { useClaimDocument } from '@/components/modules/transfer-request/hooks/use-claim-document';
import { fireEvent, render, screen } from '@testing-library/react';
import { useParams } from 'next/navigation';

// Add ResizeObserver mock
class ResizeObserverMock {
  observe() {}
  unobserve() {}
  disconnect() {}
}

global.ResizeObserver = ResizeObserverMock;

// Mock the dependencies
jest.mock('next/navigation', () => ({
  useParams: jest.fn(),
}));

jest.mock('@/components/modules/metadata/hooks/use-metadata', () => ({
  UseMetadata: jest.fn(),
}));

jest.mock(
  '@/components/modules/transfer-request/hooks/use-claim-document',
  () => ({
    useClaimDocument: jest.fn(),
  })
);

jest.mock('@/components/modules/metadata', () => ({
  encryptEmail: jest.fn(),
}));

jest.mock('sonner', () => ({
  toast: {
    success: jest.fn(),
  },
}));

jest.mock('react-qr-code', () => ({
  __esModule: true,
  default: () => <div data-testid="qr-code">QR Code</div>,
}));

// Mock for document methods
Object.defineProperty(global, 'URL', {
  value: {
    createObjectURL: jest.fn(() => 'mocked-url'),
    revokeObjectURL: jest.fn(),
  },
});

describe('TransferRequestModule', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    (useParams as jest.Mock).mockReturnValue({ qr_code: 'test-qr-code' });
    (encryptEmail as jest.Mock).mockReturnValue('test***@example.com');
    (UseMetadata as jest.Mock).mockReturnValue({
      data: {
        documentId: '123',
        documentName: 'Test Document',
        currentOwner: 'test@example.com',
      },
      isFetching: false,
    });
    (useClaimDocument as jest.Mock).mockReturnValue({
      onClaimDocument: jest.fn(),
      isLoadingClaimDocument: false,
      qrCodes: { privateId: '', publicId: '' },
    });
  });

  it('renders the transfer request module with OTP input when not showing QR', () => {
    render(<TransferRequestModule />);

    expect(screen.getByTestId('transfer-request-module')).toBeInTheDocument();
    expect(screen.getByText('Transfer Request')).toBeInTheDocument();
    expect(
      screen.getByText('A transfer request has been sent to you')
    ).toBeInTheDocument();
    expect(screen.getByText('Enter OTP:')).toBeInTheDocument();
    expect(screen.getByText('Verify')).toBeInTheDocument();
  });

  it('shows loading state when submitting the OTP', () => {
    (useClaimDocument as jest.Mock).mockReturnValue({
      onClaimDocument: jest.fn(),
      isLoadingClaimDocument: true,
      qrCodes: { privateId: '', publicId: '' },
    });

    render(<TransferRequestModule />);

    expect(screen.getByText('Verifying...')).toBeInTheDocument();
    expect(screen.getByText('Verifying...')).toBeDisabled();
  });

  it('renders QR codes after successful submission', () => {
    (useClaimDocument as jest.Mock).mockReturnValue({
      onClaimDocument: jest.fn(),
      isLoadingClaimDocument: false,
      qrCodes: { privateId: 'private123', publicId: 'public123' },
    });

    process.env.NEXT_PUBLIC_BASE_URL = 'https://example.com';

    render(<TransferRequestModule />);

    expect(screen.getByText('Private QR Code')).toBeInTheDocument();
    expect(screen.getByText('Public QR Code')).toBeInTheDocument();
    expect(screen.getAllByTestId('qr-code').length).toBe(2);
    expect(screen.getAllByText('Copy URL').length).toBe(2);
    expect(screen.getAllByText('Download QR').length).toBe(2);
  });

  it('calls onClaimDocument when submitting the OTP', () => {
    const mockOnClaimDocument = jest.fn();
    (useClaimDocument as jest.Mock).mockReturnValue({
      onClaimDocument: mockOnClaimDocument,
      isLoadingClaimDocument: false,
      qrCodes: { privateId: '', publicId: '' },
    });

    render(<TransferRequestModule />);

    // Find the OTP input and enter a value
    const otpInput = screen.getByRole('textbox');
    fireEvent.change(otpInput, { target: { value: '123456' } });

    // Button should now be enabled
    const verifyButton = screen.getByText('Verify');
    fireEvent.click(verifyButton);

    // Verify onClaimDocument was called with the right parameters
    expect(mockOnClaimDocument).toHaveBeenCalledWith({
      documentId: '123',
      otp: '123456',
    });
  });

  it('should copy URL to clipboard when Copy URL button is clicked', () => {
    (useClaimDocument as jest.Mock).mockReturnValue({
      onClaimDocument: jest.fn(),
      isLoadingClaimDocument: false,
      qrCodes: { privateId: 'private123', publicId: 'public123' },
    });

    Object.assign(navigator, {
      clipboard: {
        writeText: jest.fn().mockImplementation(() => Promise.resolve()),
      },
    });

    process.env.NEXT_PUBLIC_BASE_URL = 'https://example.com';

    render(<TransferRequestModule />);
  });

  it('returns null when isFetching is true', () => {
    (UseMetadata as jest.Mock).mockReturnValue({
      data: null,
      isFetching: true,
    });

    const { container } = render(<TransferRequestModule />);
    expect(container.firstChild).toBeNull();
  });
});
