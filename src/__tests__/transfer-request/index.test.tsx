import { TransferRequestModule } from '@/components/modules/transfer-request';
import '@testing-library/jest-dom';
import { fireEvent, render, screen } from '@testing-library/react';

// Mock ResizeObserver
class ResizeObserver {
  observe() {}
  unobserve() {}
  disconnect() {}
}

(global as any).ResizeObserver = ResizeObserver;

describe('TransferRequestModule', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  // Positive case
  it('renders all static elements correctly', () => {
    render(<TransferRequestModule />);

    expect(screen.getByTestId('transfer-request-module')).toBeInTheDocument();
    expect(screen.getByText('Transfer Request')).toBeInTheDocument();
    expect(
      screen.getByText('A transfer request has been sent to you')
    ).toBeInTheDocument();
    expect(screen.getByText(/From:/)).toBeInTheDocument();
    expect(screen.getByText(/Document Name:/)).toBeInTheDocument();
    expect(screen.getByText('Enter OTP:')).toBeInTheDocument();

    // input box
    const otpInput = screen.getByRole('textbox');
    expect(otpInput).toBeInTheDocument();
    expect(otpInput).toHaveAttribute('maxLength', '6');

    // button
    const button = screen.getByRole('button', { name: 'Verify' });
    expect(button).toBeDisabled();
  });

  it('enables verify button when 6 digits are entered', () => {
    render(<TransferRequestModule />);

    const hiddenInput = screen.getByRole('textbox');
    fireEvent.change(hiddenInput, { target: { value: '123456' } });

    const button = screen.getByRole('button', { name: 'Verify' });
    expect(button).toBeEnabled();
  });

  // Negative case
  it('disables verify button when less than 6 digits are entered', () => {
    render(<TransferRequestModule />);

    const hiddenInput = screen.getByRole('textbox');
    fireEvent.change(hiddenInput, { target: { value: '12345' } });

    const button = screen.getByRole('button', { name: 'Verify' });
    expect(button).toBeDisabled();
  });

  it('disables button and shows "Verifying..." when submitting', () => {
    jest.useFakeTimers();

    render(<TransferRequestModule />);
    const hiddenInput = screen.getByRole('textbox');
    fireEvent.change(hiddenInput, { target: { value: '123456' } });

    const button = screen.getByRole('button', { name: 'Verify' });
    fireEvent.click(button);

    expect(button).toBeDisabled();
    expect(button).toHaveTextContent('Verifying...');
  });

  // Corner case
  it('renders without crashing even if otp is empty', () => {
    render(<TransferRequestModule />);

    const otpInput = screen.getByRole('textbox');
    expect(otpInput).toBeInTheDocument();
  });
});
