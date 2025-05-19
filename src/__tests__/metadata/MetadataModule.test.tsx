import { MetadataModule } from '@/components/modules/metadata';
import { render, screen } from '@testing-library/react';
import { useParams } from 'next/navigation';
import { QueryClient, QueryClientProvider } from 'react-query';

jest.mock('next/navigation', () => ({
  useParams: jest.fn(),
}));

jest.mock('@/components/modules/metadata/hooks/use-metadata', () => ({
  UseMetadata: () => ({
    data: null,
    isFetching: false,
  }),
}));

jest.mock('@/components/modules/metadata/hooks/use-otp-verification', () => ({
  useOtpVerification: () => ({
    otp: '',
    setOtp: jest.fn(),
    isOtpVerified: false,
    responseMessage: '',
    handleSubmit: jest.fn(),
    handleResend: jest.fn(),
    isLoadingRequestAccess: true,
    isLoadingAccessDocument: false,
  }),
}));

const createWrapper = () => {
  const testQueryClient = new QueryClient();
  return ({ children }: { children: React.ReactNode }) => (
    <QueryClientProvider client={testQueryClient}>
      {children}
    </QueryClientProvider>
  );
};

describe('MetadataModule - Loading Access State', () => {
  it('renders requesting access screen when isLoadingRequestAccess is true', () => {
    (useParams as jest.Mock).mockReturnValue({ qr_code: 'dummy-code' });

    render(<MetadataModule />, { wrapper: createWrapper() });

    expect(screen.getByText(/Requesting access/i)).toBeInTheDocument();
  });
});
