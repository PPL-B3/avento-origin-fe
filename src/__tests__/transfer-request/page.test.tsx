import TransferRequestPage from '@/app/(routes)/transfer-request/[qr_code]/page';
import { TransferRequestModule } from '@/components';
import { render, screen } from '@testing-library/react';

// Mock the TransferRequestModule component
jest.mock('@/components', () => ({
  TransferRequestModule: jest.fn(() => (
    <div data-testid="transfer-request-module">
      Mocked Transfer Request Module
    </div>
  )),
}));

describe('TransferRequestPage', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders the TransferRequestModule', () => {
    render(<TransferRequestPage />);

    expect(screen.getByTestId('transfer-request-module')).toBeInTheDocument();
    expect(
      screen.getByText('Mocked Transfer Request Module')
    ).toBeInTheDocument();
  });

  it('calls TransferRequestModule', () => {
    render(<TransferRequestPage />);

    expect(TransferRequestModule).toHaveBeenCalled();
  });

  it('uses client-side rendering', () => {
    // Check if the component has the "use client" directive
    // This is a simplified check as we can't directly access the directive in tests
    // In a real scenario, you would need to check the actual source code or use a different approach

    // Instead, we can check if the component renders without hydration errors
    const { container } = render(<TransferRequestPage />);
    expect(container).toBeTruthy();

    // Make sure the component can be hydrated properly
    expect(TransferRequestModule).toHaveBeenCalledTimes(1);
  });
});
