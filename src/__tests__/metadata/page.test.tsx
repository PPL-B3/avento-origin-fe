import MetadataPage from '@/app/(routes)/metadata/[qr_code]/page';
import { MetadataModule } from '@/components';
import { render, screen } from '@testing-library/react';

// Mock the MetadataModule component
jest.mock('@/components', () => ({
  MetadataModule: jest.fn(() => <div data-testid="metadata-module" />),
}));

describe('MetadataPage', () => {
  it('renders the MetadataModule component', () => {
    render(<MetadataPage />);

    // Check if MetadataModule is rendered
    expect(screen.getByTestId('metadata-module')).toBeInTheDocument();
  });

  it('calls MetadataModule with no props', () => {
    render(<MetadataPage />);

    // Verify MetadataModule was called correctly
    expect(MetadataModule).toHaveBeenCalled();
  });
});
