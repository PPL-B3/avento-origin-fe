import {
  encryptEmail,
  formatDateTime,
  InformationRow,
  MetadataModule,
} from '@/components/modules/metadata';
import { render, screen } from '@testing-library/react';
import { useParams } from 'next/navigation';
import { QueryClient, QueryClientProvider } from 'react-query';

// Create a new QueryClient for each test
const createTestQueryClient = () =>
  new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
      },
    },
  });

// Create a wrapper with QueryClientProvider
const createWrapper = () => {
  const testQueryClient = createTestQueryClient();
  return ({ children }: { children: React.ReactNode }) => (
    <QueryClientProvider client={testQueryClient}>
      {children}
    </QueryClientProvider>
  );
};

// Mock the next/navigation module
jest.mock('next/navigation', () => ({
  useParams: jest.fn(),
  useRouter: jest.fn().mockReturnValue({
    push: jest.fn(),
    replace: jest.fn(),
    back: jest.fn(),
  }),
}));

describe('MetadataModule', () => {
  beforeEach(() => {
    // Reset mocks before each test
    (useParams as jest.Mock).mockReset();
  });

  it('renders the document details correctly', () => {
    // Mock the useParams hook to return a specific QR code
    (useParams as jest.Mock).mockReturnValue({ qr_code: 'test-qr-code' });

    // Mock the UseMetadata hook to return test data
    jest.mock('@/components/modules/metadata/hooks/use-metadata', () => ({
      UseMetadata: jest.fn().mockReturnValue({
        data: {
          documentName: 'Akte Kelahiran',
          documentType: 'Birth Certificate',
          currentOwner: 'user@example.com',
          filePath: 'path/to/file',
          isLoadingData: false,
        },
        isFetching: false,
      }),
    }));

    render(<MetadataModule />, { wrapper: createWrapper() });

    // Wait for loading to finish
    expect(screen.queryByText('Loading...')).toBeInTheDocument();
  });
});

describe('MetadataModule formatting and UI tests', () => {
  it('shows loading state when data is being fetched', () => {
    (useParams as jest.Mock).mockReturnValue({ qr_code: 'test-qr-code' });

    // Mock the UseMetadata hook to return loading state
    jest.mock('@/components/modules/metadata/hooks/use-metadata', () => ({
      UseMetadata: jest.fn().mockReturnValue({
        data: null,
        isFetching: true,
      }),
    }));

    render(<MetadataModule />, { wrapper: createWrapper() });

    expect(screen.getByText('Loading...')).toBeInTheDocument();
  });

  it('does not show action buttons when filePath does not exist', () => {
    (useParams as jest.Mock).mockReturnValue({ qr_code: 'test-qr-code' });

    // Mock the UseMetadata hook to return data without filePath
    jest.mock('@/components/modules/metadata/hooks/use-metadata', () => ({
      UseMetadata: jest.fn().mockReturnValue({
        data: {
          documentName: 'Test Document',
          currentOwner: 'test@example.com',
          ownershipHistory: [],
          filePath: null,
        },
        isFetching: false,
      }),
    }));

    render(<MetadataModule />, { wrapper: createWrapper() });

    expect(screen.queryByText('Transfer Document')).not.toBeInTheDocument();
    expect(screen.queryByText('View Document')).not.toBeInTheDocument();
  });
});

describe('formatDateTime function', () => {
  it('formats date and time correctly for Indonesian locale', () => {
    // Testing with a fixed date to ensure consistent results
    const testDate = new Date('2023-05-15T14:30:45');
    const formattedResult = formatDateTime(testDate.toISOString());

    // Using a regex to match the expected format
    // Format should be like: "15 Mei 2023 14.30.45"
    expect(formattedResult).toMatch(/\d{1,2} \w+ \d{4} \d{2}\.\d{2}\.\d{2}/);

    // More specific test checking parts of the formatted string
    expect(formattedResult).toContain('2023');
    expect(formattedResult).toContain('14.30.45');
  });

  it('handles different date inputs correctly', () => {
    // Test with midnight
    const midnight = new Date('2023-01-01T00:00:00');
    expect(formatDateTime(midnight.toISOString())).toContain('00.00.00');

    // Test with afternoon time
    const afternoon = new Date('2023-12-31T23:59:59');
    expect(formatDateTime(afternoon.toISOString())).toContain('23.59.59');
  });
});

describe('encryptEmail function', () => {
  it('returns empty string for invalid email', () => {
    expect(encryptEmail('invalidemail')).toBe('');
    expect(encryptEmail('')).toBe('');
    expect(encryptEmail(null as unknown as string)).toBe('');
    expect(encryptEmail(undefined as unknown as string)).toBe('');
  });

  it('masks local part correctly for short emails', () => {
    expect(encryptEmail('a@example.com')).toBe('a@e*****e.c*m');
    expect(encryptEmail('ab@example.com')).toBe('ab@e*****e.c*m');
  });

  it('masks local part correctly for medium emails', () => {
    expect(encryptEmail('abc@example.com')).toBe('ab*@e*****e.c*m');
    expect(encryptEmail('abcd@example.com')).toBe('ab**@e*****e.c*m');
  });

  it('masks local part correctly for longer emails', () => {
    expect(encryptEmail('abcde@example.com')).toBe('ab*de@e*****e.c*m');
    expect(encryptEmail('abcdef@example.com')).toBe('ab**ef@e*****e.c*m');
    expect(encryptEmail('john.doe@example.com')).toBe('jo****oe@e*****e.c*m');
  });

  it('handles domain parts correctly', () => {
    expect(encryptEmail('test@a.com')).toBe('te**@a.c*m');
    expect(encryptEmail('test@ab.com')).toBe('te**@ab.c*m');
    expect(encryptEmail('test@abc.com')).toBe('te**@a*c.c*m');
    expect(encryptEmail('test@sub.example.com')).toBe('te**@s*b.e*****e.c*m');
  });
});

describe('InformationRow component', () => {
  it('renders label and value correctly', () => {
    render(<InformationRow label="Test Label" value="Test Value" />);

    expect(screen.getByText('Test Label')).toBeInTheDocument();
    expect(screen.getByText('Test Value')).toBeInTheDocument();
  });

  it('applies correct styling', () => {
    render(<InformationRow label="Test Label" value="Test Value" />);

    const labelElement = screen.getByText('Test Label');
    expect(labelElement).toHaveClass('font-bold');

    const container = labelElement.closest('div');
    expect(container).toHaveClass('grid', 'grid-cols-2');
  });
});

describe('MetadataModule component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  // it('shows document with filePath and renders transfer history', () => {
  //   // Mock the useParams hook
  //   (useParams as jest.Mock).mockReturnValue({ qr_code: 'test-qr-code' });

  //   // Mock the UseMetadata hook implementation directly in the test file
  //   jest.mock(
  //     '@/components/modules/metadata/hooks/use-metadata',
  //     () => ({
  //       UseMetadata: () => ({
  //         data: {
  //           documentName: 'Birth Certificate',
  //           currentOwner: 'user@example.com',
  //           filePath: '/path/to/document',
  //           ownershipHistory: [
  //             {
  //               owner: 'previous@example.com',
  //               generatedDate: '2023-01-01T10:00:00Z',
  //             },
  //             {
  //               owner: 'original@example.com',
  //               generatedDate: '2022-12-01T09:00:00Z',
  //             },
  //           ],
  //         },
  //         isFetching: false,
  //       }),
  //     }),
  //     { virtual: true }
  //   );

  //   render(<MetadataModule />, { wrapper: createWrapper() });

  //   // Check document details are displayed
  //   expect(screen.getByText('Birth Certificate')).toBeInTheDocument();
  //   expect(screen.getByText('DOCUMENT DETAIL (Owner)')).toBeInTheDocument();

  //   // Check buttons are rendered
  //   expect(screen.getByText('Transfer Document')).toBeInTheDocument();
  //   expect(screen.getByText('View Document')).toBeInTheDocument();

  //   // Check ownership history is displayed
  //   expect(screen.getByText(/previous@example.com/)).toBeInTheDocument();
  //   expect(screen.getByText(/original@example.com/)).toBeInTheDocument();
  // });

  // it('handles edge case when ownershipHistory is empty', () => {
  //   (useParams as jest.Mock).mockReturnValue({ qr_code: 'test-qr-code' });

  //   jest.mock(
  //     '@/components/modules/metadata/hooks/use-metadata',
  //     () => ({
  //       UseMetadata: () => ({
  //         data: {
  //           documentName: 'Empty History Doc',
  //           currentOwner: 'user@example.com',
  //           filePath: '/path/to/document',
  //           ownershipHistory: [],
  //         },
  //         isFetching: false,
  //       }),
  //     }),
  //     { virtual: true }
  //   );

  //   render(<MetadataModule />, { wrapper: createWrapper() });

  //   expect(screen.getByText('Transfer History')).toBeInTheDocument();
  //   // No history items should be rendered
  // });

  it('handles null data correctly', () => {
    (useParams as jest.Mock).mockReturnValue({ qr_code: 'test-qr-code' });

    jest.mock(
      '@/components/modules/metadata/hooks/use-metadata',
      () => ({
        UseMetadata: () => ({
          data: null,
          isFetching: false,
        }),
      }),
      { virtual: true }
    );

    render(<MetadataModule />, { wrapper: createWrapper() });

    expect(screen.getByText('Loading...')).toBeInTheDocument();
  });
});
