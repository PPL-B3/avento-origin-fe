import { UploadDocumentModule } from '@/components';
import { render, screen } from '@testing-library/react';
import UploadDocumentPage from '../../app/(routes)/upload-document/page';

// Mock the UploadDocumentModule component
jest.mock('@/components', () => ({
  UploadDocumentModule: jest.fn(() => (
    <div data-testid="upload-document-module">
      Mocked Upload Document Module
    </div>
  )),
}));

describe('UploadDocumentPage', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders the UploadDocumentModule', () => {
    render(<UploadDocumentPage />);

    // Check if the mocked component is rendered
    expect(screen.getByTestId('upload-document-module')).toBeInTheDocument();
    expect(
      screen.getByText('Mocked Upload Document Module')
    ).toBeInTheDocument();

    // Verify the module was called
    expect(UploadDocumentModule).toHaveBeenCalled();
  });

  it('renders with no props passed to UploadDocumentModule', () => {
    render(<UploadDocumentPage />);

    // Verify the module was called with no props
    expect(UploadDocumentModule).toHaveBeenCalledWith({}, {});
  });
});
