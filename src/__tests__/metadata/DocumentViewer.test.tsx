import { MetadataModule } from '@/components';
import { UseMetadata } from '@/components/modules/metadata/hooks/use-metadata';
import { getSignedUrlFromSpaces } from '@/components/modules/metadata/utils/getSignedUrl';
import '@testing-library/jest-dom';
import { fireEvent, render, screen } from '@testing-library/react';

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
  });

  it('renders the View Document button when document exists', () => {
    render(<MetadataModule />);

    const viewButton = screen.getByTestId('view-document-button');
    expect(viewButton).toBeInTheDocument();
    expect(viewButton).toHaveTextContent('View Document');
  });

  it('opens the document viewer modal when View Document button is clicked', () => {
    render(<MetadataModule />);

    const viewButton = screen.getByTestId('view-document-button');
    fireEvent.click(viewButton);

    const dialog = screen.getByTestId('dialog');
    expect(dialog).toHaveAttribute('data-open', 'true');
  });
});
