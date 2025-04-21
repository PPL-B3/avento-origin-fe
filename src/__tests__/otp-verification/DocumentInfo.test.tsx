import { DocumentInfo } from '@/components/modules/shared/OTPVerification/DocumentInfo';
import { render, screen } from '@testing-library/react';

describe('DocumentInfo', () => {
  // Positive case
  it('should render both email and document name when both are provided', () => {
    render(
      <DocumentInfo
        currentOwnerEmail="duljaelani@gmail.com"
        documentName="Roman Picisan.pdf"
      />
    );
    expect(screen.getByText(/From:/i)).toBeInTheDocument();
    expect(screen.getByText(/Document Name:/i)).toBeInTheDocument();
  });

  // Negative case
  it('should render nothing when no props are provided', () => {
    const { container } = render(<DocumentInfo />);
    expect(container).toBeEmptyDOMElement();
  });

  // Corner case
  it('should render only the email when documentName is not provided', () => {
    render(<DocumentInfo currentOwnerEmail="test@example.com" />);
    expect(screen.getByText(/From:/i)).toBeInTheDocument();
    expect(screen.queryByText(/Document Name:/i)).not.toBeInTheDocument();
  });

  it('should render only the document name when currentOwnerEmail is not provided', () => {
    render(<DocumentInfo documentName="My Document" />);
    expect(screen.getByText(/Document Name:/i)).toBeInTheDocument();
    expect(screen.queryByText(/From:/i)).not.toBeInTheDocument();
  });

  it('should render nothing when both props are empty strings', () => {
    const { container } = render(<DocumentInfo currentOwnerEmail="" documentName="" />);
    expect(container).toBeEmptyDOMElement();
  });
});
