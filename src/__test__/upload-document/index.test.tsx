import { render, screen } from '@testing-library/react';
import React from 'react';
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

describe('UploadDocumentModule', () => {
  beforeEach(() => {
    jest.clearAllMocks();
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
});
