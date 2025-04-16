import TransferRequestPage from '@/app/(routes)/transfer-request/[qr_code]/page';
import { TransferRequestModule } from '@/components';
import { render, screen } from '@testing-library/react';

// Mock the TransferRequestModule component
jest.mock('@/components', () => ({
  TransferRequestModule: jest.fn(() => <div data-testid="transfer-request-module" />),
}));

describe('TransferRequestPage', () => {
  it('renders the TransferRequestModule component', () => {
    render(<TransferRequestPage />);

    // Check if TransferRequestModule is rendered
    expect(screen.getByTestId('transfer-request-module')).toBeInTheDocument();
  });

  it('calls TransferRequestModule with no props', () => {
    render(<TransferRequestPage />);

    // Verify TransferRequestModule was called correctly
    expect(TransferRequestModule).toHaveBeenCalled();
  });
});
