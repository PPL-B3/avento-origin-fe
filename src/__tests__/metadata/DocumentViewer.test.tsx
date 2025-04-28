import { MetadataModule } from '@/components';
import { UseMetadata } from '@/components/modules/metadata/hooks/use-metadata';
import { getSignedUrlFromSpaces } from '@/components/modules/metadata/utils/getSignedUrl';
import '@testing-library/jest-dom';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { QueryClient, QueryClientProvider } from 'react-query';

// Add ResizeObserver mock
class ResizeObserverMock {
  observe() {}
  unobserve() {}
  disconnect() {}
}

global.ResizeObserver = ResizeObserverMock;

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

// Mock hook use-metadata
jest.mock('@/components/modules/metadata/hooks/use-metadata', () => ({
  UseMetadata: jest.fn(),
}));

// Mock getSignedUrlFromSpaces
jest.mock('@/components/modules/metadata/utils/getSignedUrl', () => ({
  getSignedUrlFromSpaces: jest.fn(),
}));

// Mock Dialog dan komponen UI lainnya
jest.mock('@/components/ui/dialog', () => ({
  Dialog: ({ children, open, onOpenChange }: any) => (
    <div
      data-testid="dialog"
      data-open={open ? 'true' : 'false'}
      onClick={() => onOpenChange(!open)}
    >
      {children}
    </div>
  ),
  DialogContent: ({ children, className }: any) => (
    <div data-testid="dialog-content" className={className}>
      {children}
    </div>
  ),
}));

jest.mock('@/components/ui/button', () => ({
  Button: ({ children, onClick, variant, size }: any) => (
    <button
      data-testid="view-document-button"
      data-variant={variant}
      data-size={size}
      onClick={onClick}
    >
      {children}
    </button>
  ),
}));

// Mock TransferDocumentModal
jest.mock('@/components/core/elements/TransferDocument', () => ({
  TransferDocumentModal: ({ documentId }: any) => (
    <div data-testid="transfer-document-modal" data-document-id={documentId}>
      Transfer Document
    </div>
  ),
}));

let mockIsOtpVerified = true;

jest.mock('@/components/modules/metadata/hooks/use-otp-verification', () => ({
  useOtpVerification: () => ({
    isOtpVerified: mockIsOtpVerified,
    otp: '',
    setOtp: jest.fn(),
    responseMessage: '',
    handleSubmit: jest.fn(),
    handleResend: jest.fn(),
    isLoadingRequestAccess: false,
    isLoadingAccessDocument: false,
  }),
}));

describe('MetadataModule - View Document Feature', () => {
  const mockData = {
    documentName: 'Test Document',
    currentOwner: 'test@example.com',
    filePath: 'path/to/document.pdf',
    documentId: 'doc-123',
    ownershipHistory: [
      { owner: 'test@example.com', generatedDate: '2023-01-01T10:00:00Z' },
    ],
  };

  beforeEach(() => {
    jest.clearAllMocks();
    (UseMetadata as jest.Mock).mockReturnValue({
      data: mockData,
      isFetching: false,
    });
    (getSignedUrlFromSpaces as jest.Mock).mockResolvedValue(
      'https://mocked-signed-url.com'
    );
    mockIsOtpVerified = true;
  });

  it('shows OTP Verification Card when user is not verified', () => {
    mockIsOtpVerified = false;

    renderWithQueryClient(<MetadataModule />);

    expect(screen.getByText('Verify Document Ownership')).toBeInTheDocument();
  });

  it('renders the View Document button when document exists', () => {
    mockIsOtpVerified = true;
    renderWithQueryClient(<MetadataModule />);

    const viewButton = screen.getByTestId('view-document-button');
    expect(viewButton).toBeInTheDocument();
    expect(viewButton).toHaveTextContent('View Document');
  });

  it('opens the document viewer modal when View Document button is clicked', () => {
    renderWithQueryClient(<MetadataModule />);

    const viewButton = screen.getByTestId('view-document-button');
    fireEvent.click(viewButton);

    const dialog = screen.getByTestId('dialog');
    expect(dialog).toHaveAttribute('data-open', 'true');
  });

  it('shows loading state before the signed URL is fetched', () => {
    renderWithQueryClient(<MetadataModule />);

    const viewButton = screen.getByTestId('view-document-button');
    fireEvent.click(viewButton);

    expect(screen.getByText('Loading document...')).toBeInTheDocument();
  });

  it('fetches signed URL when modal opens', async () => {
    renderWithQueryClient(<MetadataModule />);

    const viewButton = screen.getByTestId('view-document-button');

    await userEvent.click(viewButton); // userEvent sudah otomatis async + act
    await waitFor(() => {
      expect(getSignedUrlFromSpaces).toHaveBeenCalledWith(
        'path/to/document.pdf'
      );
    });
  });

  it('displays iframe with correct URL when signed URL is available', async () => {
    renderWithQueryClient(<MetadataModule />);

    const viewButton = screen.getByTestId('view-document-button');
    fireEvent.click(viewButton);

    await waitFor(() => {
      const iframe = screen.getByTitle('Document Viewer');
      expect(iframe).toBeInTheDocument();
      expect(iframe).toHaveAttribute(
        'src',
        'https://mocked-signed-url.com#toolbar=0&navpanes=0&scrollbar=0'
      );
    });
  });

  it('does not fetch URL if filePath is not available', async () => {
    (UseMetadata as jest.Mock).mockReturnValue({
      data: { ...mockData, filePath: undefined },
      isFetching: false,
    });

    renderWithQueryClient(<MetadataModule />);
    const viewButton = screen.queryByTestId('view-document-button');

    expect(viewButton).not.toBeInTheDocument();

    await waitFor(() => {
      expect(getSignedUrlFromSpaces).not.toHaveBeenCalled();
    });
  });

  it('closes the modal when clicking outside content', async () => {
    renderWithQueryClient(<MetadataModule />);

    const viewButton = screen.getByTestId('view-document-button');
    fireEvent.click(viewButton);

    const dialog = screen.getByTestId('dialog');
    fireEvent.click(dialog);

    await waitFor(() => {
      expect(dialog).toHaveAttribute('data-open', 'false');
    });
  });

  it('does not show View Document button when document does not exist', () => {
    (UseMetadata as jest.Mock).mockReturnValue({
      data: null,
      isFetching: false,
    });

    renderWithQueryClient(<MetadataModule />);

    expect(
      screen.queryByTestId('view-document-button')
    ).not.toBeInTheDocument();
  });

  it('does not show View Document button when still fetching data', () => {
    (UseMetadata as jest.Mock).mockReturnValue({
      data: null,
      isFetching: true,
    });

    renderWithQueryClient(<MetadataModule />);

    expect(
      screen.queryByTestId('view-document-button')
    ).not.toBeInTheDocument();
  });

  it('should not call getSignedUrlFromSpaces if filePath is missing', async () => {
    (UseMetadata as jest.Mock).mockReturnValue({
      data: { ...mockData, filePath: undefined },
      isFetching: false,
    });

    renderWithQueryClient(<MetadataModule />);

    const viewButton = screen.queryByTestId('view-document-button');

    if (viewButton) {
      await userEvent.click(viewButton);
    }

    await waitFor(() => {
      expect(getSignedUrlFromSpaces).not.toHaveBeenCalled();
    });
  });

  it('should fetch signed URL when modal opens and filePath exists', async () => {
    renderWithQueryClient(<MetadataModule />);

    fireEvent.click(screen.getByTestId('view-document-button'));

    await waitFor(() => {
      expect(getSignedUrlFromSpaces).toHaveBeenCalledWith(
        'path/to/document.pdf'
      );
    });
  });

  it('should not fetch signed URL when modal is closed', async () => {
    renderWithQueryClient(<MetadataModule />);

    expect(getSignedUrlFromSpaces).not.toHaveBeenCalled();
  });
});
