import { downloadFile, FileInput } from '@/components/core';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { ClassAttributes, ImgHTMLAttributes, JSX } from 'react';
import { toast } from 'sonner';

// Mock dependencies
jest.mock('sonner', () => ({
  toast: {
    error: jest.fn(),
    promise: jest.fn(),
  },
}));

jest.mock('next/image', () => ({
  __esModule: true,
  default: (
    props: JSX.IntrinsicAttributes &
      ClassAttributes<HTMLImageElement> &
      ImgHTMLAttributes<HTMLImageElement>
  ) => {
    // eslint-disable-next-line @next/next/no-img-element
    return <img {...props} alt={props.alt} />;
  },
}));

jest.mock('react-drag-drop-files', () => ({
  FileUploader: ({
    children,
    handleChange,
    onTypeError,
    onSizeError,
  }: {
    children: React.ReactNode;
    handleChange: (file: File) => void;
    onTypeError: () => void;
    onSizeError: () => void;
  }) => {
    return (
      <div
        data-testid="mock-file-uploader"
        onClick={() =>
          handleChange(
            new File(['test'], 'test.pdf', { type: 'application/pdf' })
          )
        }
      >
        <button data-testid="trigger-type-error" onClick={onTypeError}>
          Trigger Type Error
        </button>
        <button data-testid="trigger-size-error" onClick={onSizeError}>
          Trigger Size Error
        </button>
        {children}
      </div>
    );
  },
}));

// Mock fetch for downloadFile tests
global.fetch = jest.fn();
global.URL.createObjectURL = jest.fn();
global.URL.revokeObjectURL = jest.fn();

describe('FileInput Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  const defaultProps = {
    label: 'Test Label',
    name: 'testFile',
    submission: { file: null, error: false, loading: false },
    setSubmission: jest.fn(),
  };

  it('renders correctly with default props', () => {
    render(<FileInput {...defaultProps} />);

    expect(screen.getByText('Test Label')).toBeInTheDocument();
    expect(
      screen.getByText('Drop Document Here to Upload (max 10 MB)')
    ).toBeInTheDocument();
    expect(screen.getByText('Select From Device')).toBeInTheDocument();
    expect(screen.getByAltText('file')).toBeInTheDocument();
  });

  it('renders with custom caption', () => {
    render(<FileInput {...defaultProps} caption="Custom Caption" />);

    expect(screen.getByText('Custom Caption (max 10 MB)')).toBeInTheDocument();
  });

  it('renders with custom max size', () => {
    render(<FileInput {...defaultProps} maxSize={5} />);

    expect(
      screen.getByText('Drop Document Here to Upload (max 5 MB)')
    ).toBeInTheDocument();
  });

  it('shows file types in the footer text', () => {
    render(<FileInput {...defaultProps} fileTypes={['pdf', 'docx']} />);

    expect(screen.getByText('The file must be in format')).toBeInTheDocument();
    expect(screen.getByText('*pdf, *docx')).toBeInTheDocument();
  });

  it('handles type error correctly', () => {
    render(<FileInput {...defaultProps} />);

    fireEvent.click(screen.getByTestId('trigger-type-error'));

    expect(toast.error).toHaveBeenCalledWith('File type not supported.');
  });

  it('handles size error correctly', () => {
    render(<FileInput {...defaultProps} />);

    fireEvent.click(screen.getByTestId('trigger-size-error'));

    expect(toast.error).toHaveBeenCalledWith('File size exceeded limit.');
  });

  it('renders in disabled state correctly', () => {
    render(<FileInput {...defaultProps} disabled={true} />);

    const dropzone = screen.getByTestId('file-input-dropzone');
    expect(dropzone).toHaveClass('cursor-not-allowed');
  });
});

describe('downloadFile function', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    document.body.innerHTML = '';
  });

  it('downloads file successfully', async () => {
    // Mock successful fetch
    const mockBlob = new Blob(['test'], { type: 'application/pdf' });
    (global.fetch as jest.Mock).mockResolvedValue({
      ok: true,
      blob: jest.fn().mockResolvedValue(mockBlob),
    });

    // Mock createObjectURL
    const mockObjectUrl = 'blob:test';
    (global.URL.createObjectURL as jest.Mock).mockReturnValue(mockObjectUrl);

    // Mock document.createElement
    const mockAnchor = document.createElement('a');
    const mockAnchorClickSpy = jest.spyOn(mockAnchor, 'click');
    jest.spyOn(document, 'createElement').mockReturnValue(mockAnchor);

    // Call downloadFile
    await downloadFile('https://test.com/file.pdf', 'test.pdf');

    await waitFor(() => {
      // Verify toast.promise was called
      expect(toast.promise).toHaveBeenCalled();

      // Verify fetch was called with the right URL
      expect(global.fetch).toHaveBeenCalledWith('https://test.com/file.pdf');

      // Verify createObjectURL was called with the blob
      expect(global.URL.createObjectURL).toHaveBeenCalledWith(mockBlob);

      // Verify anchor properties and click
      expect(mockAnchor.href).toBe(mockObjectUrl);
      expect(mockAnchor.download).toBe('test.pdf');
      expect(mockAnchorClickSpy).toHaveBeenCalled();

      // Verify cleanup
      expect(global.URL.revokeObjectURL).toHaveBeenCalledWith(mockObjectUrl);
    });
  });
});
