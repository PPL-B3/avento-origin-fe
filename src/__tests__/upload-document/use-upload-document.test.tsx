import { ENDPOINTS, useAventoClient } from '@/components/core';
import { useUploadDocument } from '@/components/modules/upload-document/hooks/use-upload-document';
import { act, renderHook } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from 'react-query';
import { toast } from 'sonner';

// Mock dependencies
jest.mock('@/components/core', () => ({
  ENDPOINTS: {
    DOCUMENTS_UPLOAD: '/api/documents/upload',
  },
  useAventoClient: jest.fn(),
}));

jest.mock('sonner', () => ({
  toast: {
    promise: jest.fn(),
    error: jest.fn(),
  },
}));

const createWrapper = () => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
      },
    },
  });

  const Wrapper = ({ children }: { children: React.ReactNode }) => (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );

  Wrapper.displayName = 'QueryClientWrapper';

  return Wrapper;
};

describe('useUploadDocument', () => {
  const mockClient = {
    post: jest.fn(),
  };

  beforeEach(() => {
    jest.clearAllMocks();
    (useAventoClient as jest.Mock).mockReturnValue(mockClient);
  });

  it('should return upload document mutation', () => {
    const { result } = renderHook(() => useUploadDocument(), {
      wrapper: createWrapper(),
    });

    expect(result.current).toHaveProperty('onUploadDocument');
    expect(result.current).toHaveProperty('isLoadingUploadDocument');
    expect(typeof result.current.onUploadDocument).toBe('function');
    expect(typeof result.current.isLoadingUploadDocument).toBe('boolean');
  });

  it('should handle successful document upload', async () => {
    // Mock successful response
    const mockResponse = {
      data: { message: 'Document uploaded successfully' },
    };
    mockClient.post.mockResolvedValueOnce(mockResponse);

    const { result } = renderHook(() => useUploadDocument(), {
      wrapper: createWrapper(),
    });

    const mockFile = new File(['test'], 'test.pdf', {
      type: 'application/pdf',
    });
    const mockValues = {
      documentName: 'Test Document',
      ownerName: 'Test Owner',
      file: mockFile,
    };

    await act(async () => {
      await result.current.onUploadDocument(mockValues);
    });

    // Verify client.post was called with correct arguments
    expect(mockClient.post).toHaveBeenCalledWith(
      ENDPOINTS.DOCUMENTS_UPLOAD,
      expect.any(FormData),
      {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      }
    );

    // Verify FormData was constructed correctly
    const formDataArg = mockClient.post.mock.calls[0][1];
    expect(formDataArg instanceof FormData).toBeTruthy();

    // Verify toast.promise was called
    expect(toast.promise).toHaveBeenCalled();
  });

  it('should handle upload error with error message in response', async () => {
    // Mock error response with specific error message
    const errorResponse = {
      response: {
        data: {
          message: ['Invalid file type'],
        },
      },
    };
    mockClient.post.mockRejectedValueOnce(errorResponse);

    const { result } = renderHook(() => useUploadDocument(), {
      wrapper: createWrapper(),
    });

    const mockFile = new File(['test'], 'test.pdf', {
      type: 'application/pdf',
    });
    const mockValues = {
      documentName: 'Test Document',
      ownerName: 'Test Owner',
      file: mockFile,
    };

    await act(async () => {
      try {
        await result.current.onUploadDocument(mockValues);
      } catch (error) {
        console.error(error);
      }
    });

    // Verify toast.promise was called with correct error handler
    const toastPromiseCall = (toast.promise as jest.Mock).mock.calls[0];
    const errorHandler = toastPromiseCall[1].error;

    expect(errorHandler(errorResponse)).toBe('Invalid file type');
  });

  it('should handle upload error with generic message when no specific error', async () => {
    // Mock error response without specific error message
    const errorResponse = {
      response: {
        data: {
          message: [],
        },
      },
    };
    mockClient.post.mockRejectedValueOnce(errorResponse);

    const { result } = renderHook(() => useUploadDocument(), {
      wrapper: createWrapper(),
    });

    const mockFile = new File(['test'], 'test.pdf', {
      type: 'application/pdf',
    });
    const mockValues = {
      documentName: 'Test Document',
      ownerName: 'Test Owner',
      file: mockFile,
    };

    await act(async () => {
      try {
        await result.current.onUploadDocument(mockValues);
      } catch (error) {
        console.error(error);
      }
    });

    // Verify toast.promise was called with correct error handler
    const toastPromiseCall = (toast.promise as jest.Mock).mock.calls[0];
    const errorHandler = toastPromiseCall[1].error;

    expect(errorHandler(errorResponse)).toBe('Something went wrong');
  });

  it('should set loading state correctly during upload', async () => {
    // Mock a promise that we can control to test loading state
    let resolvePromise: (value: unknown) => void;
    const promise = new Promise((resolve) => {
      resolvePromise = resolve;
    });
    mockClient.post.mockReturnValueOnce(promise);

    const { result, rerender } = renderHook(() => useUploadDocument(), {
      wrapper: createWrapper(),
    });

    const mockFile = new File(['test'], 'test.pdf', {
      type: 'application/pdf',
    });
    const mockValues = {
      documentName: 'Test Document',
      ownerName: 'Test Owner',
      file: mockFile,
    };

    // Start upload but don't resolve yet
    act(() => {
      result.current.onUploadDocument(mockValues);
    });

    rerender();

    // Should be in loading state
    expect(result.current.isLoadingUploadDocument).toBe(true);

    // Now resolve the promise
    await act(async () => {
      resolvePromise!({});
      await promise;
    });

    rerender();

    // Should no longer be in loading state
    expect(result.current.isLoadingUploadDocument).toBe(false);
  });
});
