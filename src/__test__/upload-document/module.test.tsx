import { UploadDocumentModule } from '@/components/modules/upload-document';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { toast } from 'sonner';

// Mock dependencies
jest.mock('sonner', () => ({
  toast: {
    info: jest.fn(),
    success: jest.fn(),
    error: jest.fn(),
  },
}));

// Mock react-hook-form
jest.mock('react-hook-form', () => ({
  useForm: () => ({
    register: jest.fn(),
    handleSubmit:
      (onSubmit: (data: Record<string, unknown>) => void) =>
      (e: React.FormEvent) => {
        e.preventDefault();
        return onSubmit({ image: 'test-image' });
      },
    formState: {
      errors: {},
      isSubmitting: false,
    },
    setValue: jest.fn(),
    control: { register: jest.fn() },
  }),
}));

// Create a mock component for FileInput
jest.mock('@/components/core', () => ({
  FileInput: ({
    submission,
    setSubmission,
  }: {
    submission?: { file?: File | null; error?: boolean };
    setSubmission?: (submission: { file: File | null; error: boolean }) => void;
  }) => {
    return (
      <div data-testid="file-input">
        <button
          data-testid="select-file-button"
          onClick={() => {
            if (setSubmission) {
              setSubmission({
                ...submission,
                file: new File(['test content'], 'test.pdf', {
                  type: 'application/pdf',
                }),
                error: false,
              });
            }
          }}
        >
          Select File
        </button>
        <button
          data-testid="select-invalid-file-button"
          onClick={() => {
            if (setSubmission) {
              setSubmission({
                ...submission,
                file: null,
                error: true,
              });
            }
          }}
        >
          Select Invalid File
        </button>
        {submission?.file && (
          <div data-testid="selected-filename">{submission.file.name}</div>
        )}
      </div>
    );
  },
}));

describe('UploadDocumentModule', () => {
  beforeEach(() => {
    jest.useFakeTimers();
    jest.clearAllMocks();
  });

  afterEach(() => {
    jest.runOnlyPendingTimers();
    jest.useRealTimers();
  });

  it('executes onSubmit function when form is submitted', async () => {
    // Spy on console.log to verify it's called
    const consoleLogSpy = jest
      .spyOn(console, 'log')
      .mockImplementation(() => {});

    render(<UploadDocumentModule />);

    // Select a file first to enable the submit button
    const selectFileButton = screen.getByTestId('select-file-button');
    fireEvent.click(selectFileButton);

    // Verify file was selected
    expect(screen.getByTestId('file-selected')).toBeInTheDocument();

    // Submit the form
    const uploadButton = screen.getByTestId('upload-button');
    expect(uploadButton).not.toBeDisabled();
    fireEvent.click(uploadButton);

    // Verify onSubmit was executed (console.log was called with form values)
    expect(consoleLogSpy).toHaveBeenCalledWith({ image: 'test-image-value' });

    // Verify handleUpload was called (toast.info was called)
    expect(toast.info).toHaveBeenCalledWith('Uploading file...');

    // Verify button shows loading state
    expect(screen.getByText('Uploading...')).toBeInTheDocument();

    // Fast-forward timer to complete the upload
    jest.advanceTimersByTime(2000);

    // Verify upload completed successfully
    await waitFor(() => {
      expect(toast.success).toHaveBeenCalledWith(
        'Document uploaded successfully'
      );
    });

    // Verify the file object was logged
    expect(consoleLogSpy).toHaveBeenCalledWith(
      expect.objectContaining({
        file: expect.any(File),
      })
    );

    // Restore console.log
    consoleLogSpy.mockRestore();
  });

  it('renders correctly', () => {
    render(<UploadDocumentModule />);

    expect(screen.getByTestId('upload-document-module')).toBeInTheDocument();
    expect(screen.getByText('UPLOAD HERE!')).toBeInTheDocument();
    expect(screen.getByTestId('upload-button')).toBeInTheDocument();
  });

  it('has disabled upload button when no file is selected', () => {
    render(<UploadDocumentModule />);

    const uploadButton = screen.getByTestId('upload-button');
    expect(uploadButton).toBeDisabled();
  });

  it('enables upload button when file is selected', async () => {
    render(<UploadDocumentModule />);

    // Click the select file button in our mock component
    const selectFileButton = screen.getByTestId('select-file-button');
    fireEvent.click(selectFileButton);

    // Check if button is enabled
    const uploadButton = screen.getByTestId('upload-button');
    expect(uploadButton).not.toBeDisabled();

    // Check that the filename is displayed
    expect(screen.getByTestId('selected-filename')).toHaveTextContent(
      'test.pdf'
    );
  });

  it('shows upload progress and success message when upload button is clicked', async () => {
    render(<UploadDocumentModule />);

    // Select a file
    const selectFileButton = screen.getByTestId('select-file-button');
    fireEvent.click(selectFileButton);

    // Click the upload button
    const uploadButton = screen.getByTestId('upload-button');
    fireEvent.click(uploadButton);

    // Check if toast.info was called
    expect(toast.info).toHaveBeenCalledWith('Uploading file...');

    // Check if button text changes to "Uploading..."
    expect(screen.getByText('Uploading...')).toBeInTheDocument();
    expect(uploadButton).toBeDisabled();

    // Fast-forward timer to simulate upload completion
    jest.advanceTimersByTime(2000);

    // Check if toast.success was called
    await waitFor(() => {
      expect(toast.success).toHaveBeenCalledWith(
        'Document uploaded successfully'
      );
    });

    // Check if button text changes back to "Upload"
    await waitFor(() => {
      expect(screen.getByText('Upload')).toBeInTheDocument();
      expect(screen.getByTestId('upload-button')).not.toBeDisabled();
    });
  });

  it('keeps button disabled when there is a file error', async () => {
    render(<UploadDocumentModule />);

    // Simulate selecting an invalid file
    const selectInvalidButton = screen.getByTestId(
      'select-invalid-file-button'
    );
    fireEvent.click(selectInvalidButton);

    // Check if button remains disabled
    const uploadButton = screen.getByTestId('upload-button');
    expect(uploadButton).toBeDisabled();
  });

  it('logs form values on submit', async () => {
    // Spy on console.log
    const consoleSpy = jest.spyOn(console, 'log');

    render(<UploadDocumentModule />);

    // Select a file
    const selectFileButton = screen.getByTestId('select-file-button');
    fireEvent.click(selectFileButton);

    // Submit the form
    const uploadButton = screen.getByTestId('upload-button');
    fireEvent.click(uploadButton);

    // Check if values were logged
    expect(consoleSpy).toHaveBeenCalledWith({ image: 'test-image' });
    expect(consoleSpy).toHaveBeenCalledWith(
      expect.objectContaining({
        file: expect.any(File),
      })
    );

    // Restore console.log
    consoleSpy.mockRestore();
  });
});
