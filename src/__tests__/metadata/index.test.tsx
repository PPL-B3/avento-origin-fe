import { encryptEmail, MetadataModule } from '@/components/modules/metadata';
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

    // Check if Information rows are rendered with correct values
    expect(screen.getByText('Document Name')).toBeInTheDocument();

    expect(screen.getByText('Document Owner')).toBeInTheDocument();

    expect(screen.getByText('Document Type')).toBeInTheDocument();
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
// Test for the encryptEmail function with direct approach
describe('encryptEmail function', () => {
  it('handles null or invalid email correctly', () => {
    expect(encryptEmail('')).toBe('');
    expect(encryptEmail('invalid-email')).toBe('');
    expect(encryptEmail(null as unknown as string)).toBe('');
  });

  it('masks the middle part of local part when more than 4 characters', () => {
    expect(encryptEmail('username@example.com')).toBe('us****me@e*****e.c*m');
    expect(encryptEmail('johndoe@domain.co')).toBe('jo***oe@d****n.co');
  });

  it('preserves the local part when 4 or fewer characters', () => {
    expect(encryptEmail('joe@example.com')).toBe('jo*@e*****e.c*m');
    expect(encryptEmail('a@b.com')).toBe('a@b.c*m');
  });

  it('handles domains with multiple parts correctly', () => {
    expect(encryptEmail('test@sub.example.co.uk')).toBe(
      'te**@s*b.e*****e.co.uk'
    );
  });

  it('preserves single character domain parts', () => {
    expect(encryptEmail('test@a.b.c')).toBe('te**@a.b.c');
  });

  it('preserves two character domain parts', () => {
    expect(encryptEmail('user@ab.cd.ef')).toBe('us**@ab.cd.ef');
  });
});
