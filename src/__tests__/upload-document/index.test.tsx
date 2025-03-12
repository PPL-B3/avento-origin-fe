import { fireEvent, render, screen } from '@testing-library/react';
import React from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';
import { UploadDocumentModule } from '../../components/modules/upload-document/index';

// Mock dependencies
jest.mock('sonner', () => ({
  toast: {
    info: jest.fn(),
    success: jest.fn(),
    error: jest.fn(),
  },
}));

// Mock FileUploader component
jest.mock('react-drag-drop-files', () => ({
  FileUploader: (props: {
    handleChange: (file: File) => void;
    onTypeError: () => void;
    onSizeError: () => void;
    children: React.ReactNode;
  }) => {
    return (
      <div
        data-testid="file-uploader"
        onClick={() =>
          props.handleChange(
            new File(['test content'], 'test.pdf', { type: 'application/pdf' })
          )
        }
      >
        {props.children}
      </div>
    );
  },
}));

// Mock next/image
jest.mock('next/image', () => ({
  __esModule: true,
  default: (props: React.ComponentProps<'img'>) => {
    return React.createElement('img', props);
  },
}));

// Mock setTimeout
jest.useFakeTimers();

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

describe('UploadDocumentModule', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders correctly', () => {
    render(<UploadDocumentModule />, { wrapper: createWrapper() });

    expect(screen.getByTestId('upload-document-module')).toBeInTheDocument();
    expect(screen.getByText('UPLOAD HERE!')).toBeInTheDocument();
    expect(screen.getByTestId('upload-button')).toBeInTheDocument();
  });

  it('has disabled upload button when no file is selected', () => {
    render(<UploadDocumentModule />, { wrapper: createWrapper() });

    const uploadButton = screen.getByTestId('upload-button');
    expect(uploadButton).toBeDisabled();
  });

  it('enables upload button when a file is selected', async () => {
    render(<UploadDocumentModule />, { wrapper: createWrapper() });

    // Initially the upload button should be disabled
    const uploadButton = screen.getByTestId('upload-button');
    expect(uploadButton).toBeDisabled();

    // Click on the file uploader to trigger file selection
    const fileUploader = screen.getByTestId('file-uploader');
    fireEvent.click(fileUploader);

    // After file selection, the button should be enabled
    expect(uploadButton).not.toBeDisabled();
  });

  it('shows file preview after file selection', async () => {
    render(<UploadDocumentModule />, { wrapper: createWrapper() });

    // Initially the dropzone should be visible and preview should not
    expect(screen.queryByTestId('file-input-dropzone')).toBeInTheDocument();
    expect(screen.queryByTestId('file-input-preview')).not.toBeInTheDocument();

    // Select a file
    const fileUploader = screen.getByTestId('file-uploader');
    fireEvent.click(fileUploader);

    // Now the preview should be visible and dropzone should not
    expect(screen.queryByTestId('file-input-dropzone')).not.toBeInTheDocument();
    expect(screen.queryByTestId('file-input-preview')).toBeInTheDocument();
    expect(screen.getByTestId('file-input-filename')).toHaveTextContent(
      'test.pdf'
    );
  });
});
