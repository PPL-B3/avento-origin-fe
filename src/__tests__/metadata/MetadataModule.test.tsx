import { MetadataModule } from '@/components/modules/metadata';
import { UseMetadata } from '@/components/modules/metadata/hooks/use-metadata';
import { render } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from 'react-query';

jest.mock('@/components/modules/metadata/hooks/use-metadata', () => ({
  UseMetadata: jest.fn(),
}));

jest.mock('next/navigation', () => ({
  useParams: () => ({
    qr_code: 'dummy-code',
  }),
}));

const createWrapper = () => {
  const queryClient = new QueryClient();
  return ({ children }: { children: React.ReactNode }) => (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
};

describe('MetadataModule', () => {
  it('should skip fetching signed URL if filePath is missing', () => {
    (UseMetadata as jest.Mock).mockReturnValue({
      data: {
        documentName: 'Dummy',
        currentOwner: 'user@mail.com',
        // filePath intentionally missing
      },
      isFetching: false,
    });

    const Wrapper = createWrapper();

    render(<MetadataModule />, { wrapper: Wrapper });
  });
});
