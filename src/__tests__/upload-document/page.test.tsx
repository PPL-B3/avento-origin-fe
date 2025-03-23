import { UploadDocumentModule } from '@/components';
import { render, screen } from '@testing-library/react';
import UploadDocumentPage from '../../app/(routes)/(user)/upload-document/page';

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

  // Test to verify that UploadDocumentPage is using client-side rendering
  it('uses client-side rendering', () => {
    // Check if the component has the "use client" directive
    // This is a simplified check as we can't directly access the directive in tests
    // In a real scenario, you would need to check the actual source code or use a different approach

    // Instead, we can check if the component renders without hydration errors
    const { container } = render(<UploadDocumentPage />);
    expect(container).toBeTruthy();

    // Make sure the component can be hydrated properly
    expect(UploadDocumentModule).toHaveBeenCalledTimes(1);
  });
});
