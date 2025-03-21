import { MetadataModule } from '@/components/modules/metadata';
import { render, screen } from '@testing-library/react';
import { useParams } from 'next/navigation';

// Mock the next/navigation module
jest.mock('next/navigation', () => ({
  useParams: jest.fn(),
}));

describe('MetadataModule', () => {
  beforeEach(() => {
    // Reset mocks before each test
    (useParams as jest.Mock).mockReset();
  });

  it('renders the document details correctly', () => {
    // Mock the useParams hook to return a specific QR code
    (useParams as jest.Mock).mockReturnValue({ qr_code: 'test-qr-code' });

    render(<MetadataModule />);

    // Check if the header is present
    expect(screen.getByText('DOCUMENT DETAIL')).toBeInTheDocument();

    // Check if Information rows are rendered with correct values
    expect(screen.getByText('Document Name')).toBeInTheDocument();
    expect(screen.getByText('Akte Kelahiran')).toBeInTheDocument();

    expect(screen.getByText('Document Owner')).toBeInTheDocument();
    expect(screen.getByText('natnanda04@gmail.com')).toBeInTheDocument();

    expect(screen.getByText('Document Type')).toBeInTheDocument();
    expect(screen.getByText('Tipe')).toBeInTheDocument();
  });

  it('renders the InformationRow component correctly', () => {
    (useParams as jest.Mock).mockReturnValue({ qr_code: 'test-qr-code' });

    render(<MetadataModule />);

    // Check the structure of information rows
    const rows = screen.getAllByText(/Document (Name|Owner|Type)/);
    expect(rows).toHaveLength(3);

    // Check that dividers are present (can check number of dividers if needed)
    const dividers = screen.getAllByTestId('divider');
    expect(dividers.length).toBe(2);
  });
});

// Test for the InformationRow component
describe('InformationRow', () => {
  it('renders label and value correctly', () => {
    // We can get to InformationRow through MetadataModule since it's not exported
    (useParams as jest.Mock).mockReturnValue({ qr_code: 'test-qr-code' });

    render(<MetadataModule />);

    // Check if a specific row renders correctly
    const labelElement = screen.getByText('Document Name');
    const valueElement = screen.getByText('Akte Kelahiran');

    expect(labelElement).toHaveClass('font-bold');
    expect(valueElement).toBeInTheDocument();
  });
});
