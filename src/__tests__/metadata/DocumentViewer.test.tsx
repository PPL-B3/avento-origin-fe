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
