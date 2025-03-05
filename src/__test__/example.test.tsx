import { render, screen } from '@testing-library/react';

describe('Example Test', () => {
  it('should pass', () => {
    render(<div data-testid="example">Example Test</div>);
    expect(screen.getByTestId('example')).toBeInTheDocument();
    expect(screen.getByText('Example Test')).toBeInTheDocument();
  });
});
