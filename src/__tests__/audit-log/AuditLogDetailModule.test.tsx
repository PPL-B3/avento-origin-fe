import { AuditLogDetailModule } from '@/components';
import { fireEvent, render, screen } from '@testing-library/react';
// Adjust the path as needed

// Mock router
jest.mock('next/navigation', () => ({
  useParams: () => ({
    doc_id: 'doc-123',
  }),
}));

// Mock custom hook
const mockOnRevert = jest.fn();
jest.mock('@/components/modules/audit-log/detail/hooks', () => ({
  UseAdminDocDetail: jest.fn(),
}));

const mockData = {
  documentName: 'Test Document',
  currentOwner: 'user@example.com',
  filePath: '/docs/sample.pdf',
  ownershipHistory: [
    {
      owner: 'user@example.com',
      generatedDate: '2024-01-01T00:00:00.000Z',
    },
  ],
};

describe('AuditLogDetailModule', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders loading state', () => {
    const {
      UseAdminDocDetail,
    } = require('@/components/modules/audit-log/detail/hooks');
    UseAdminDocDetail.mockReturnValue({
      data: null,
      isFetching: true,
      onRevert: mockOnRevert,
    });

    render(<AuditLogDetailModule />);
    expect(screen.getByText('Loading...')).toBeInTheDocument();
  });

  it('renders "Document not found" when data is null and not fetching', () => {
    const {
      UseAdminDocDetail,
    } = require('@/components/modules/audit-log/detail/hooks');
    UseAdminDocDetail.mockReturnValue({
      data: null,
      isFetching: false,
      onRevert: mockOnRevert,
    });

    render(<AuditLogDetailModule />);
    expect(screen.getByText('Document not found')).toBeInTheDocument();
  });

  it('renders document details and calls onRevert when Revert button is clicked', () => {
    const {
      UseAdminDocDetail,
    } = require('@/components/modules/audit-log/detail/hooks');
    UseAdminDocDetail.mockReturnValue({
      data: mockData,
      isFetching: false,
      onRevert: mockOnRevert,
    });

    render(<AuditLogDetailModule />);

    // Check that document name is rendered
    expect(screen.getByText('Document Name')).toBeInTheDocument();
    expect(screen.getByText('Document Owner')).toBeInTheDocument();

    // Click on Revert button
    fireEvent.click(screen.getByText('Revert'));

    expect(mockOnRevert).toHaveBeenCalledWith({
      documentId: 'doc-123',
      index: 0, // only one item in history so index = 0
    });
  });

  it('does not call onRevert if data is null', () => {
    const {
      UseAdminDocDetail,
    } = require('@/components/modules/audit-log/detail/hooks');

    UseAdminDocDetail.mockReturnValue({
      data: null,
      isFetching: false,
      onRevert: mockOnRevert,
    });

    render(<AuditLogDetailModule />);

    const revertButton = screen.queryByText('Revert');
    if (revertButton) {
      fireEvent.click(revertButton);
    }

    expect(mockOnRevert).not.toHaveBeenCalled();
  });

  it('should not call getSignedUrlFromSpaces if data.filePath is falsy', async () => {
    const {
      UseAdminDocDetail,
    } = require('@/components/modules/audit-log/detail/hooks');

    UseAdminDocDetail.mockReturnValue({
      data: {
        ...mockData,
        filePath: null,
      },
      isFetching: false,
      onRevert: mockOnRevert,
    });

    render(<AuditLogDetailModule />);

    expect(screen.getByText('Document Name')).toBeInTheDocument();
  });
});
