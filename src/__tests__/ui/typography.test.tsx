import { Typography } from '@/components/ui/typography';
import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';

describe('Typography Component', () => {
  it('renders correctly with default props', () => {
    render(<Typography>Default Text</Typography>);
    const element = screen.getByText('Default Text');
    expect(element).toBeInTheDocument();
    expect(element.tagName).toBe('P');
  });

  it('applies the correct variant classes', () => {
    const { rerender } = render(
      <Typography variant="title">Title Text</Typography>
    );
    expect(screen.getByText('Title Text')).toHaveClass(
      'text-2xl',
      'font-bold',
      'text-blue-700'
    );

    rerender(<Typography variant="subtitle">Subtitle Text</Typography>);
    expect(screen.getByText('Subtitle Text')).toHaveClass(
      'text-lg',
      'font-medium',
      'text-blue-600'
    );

    rerender(<Typography variant="body">Body Text</Typography>);
    expect(screen.getByText('Body Text')).toHaveClass(
      'text-base',
      'text-gray-800'
    );
  });

  it('applies the correct weight classes', () => {
    const { rerender } = render(
      <Typography weight="bold">Bold Text</Typography>
    );
    expect(screen.getByText('Bold Text')).toHaveClass('font-bold');

    rerender(<Typography weight="light">Light Text</Typography>);
    expect(screen.getByText('Light Text')).toHaveClass('font-light');
  });

  it('uses appropriate default HTML elements based on variant', () => {
    const { rerender } = render(
      <Typography variant="title">Title Element</Typography>
    );
    expect(screen.getByText('Title Element').tagName).toBe('H1');

    rerender(<Typography variant="subtitle">Subtitle Element</Typography>);
    expect(screen.getByText('Subtitle Element').tagName).toBe('H2');

    rerender(<Typography variant="body">Body Element</Typography>);
    expect(screen.getByText('Body Element').tagName).toBe('P');
  });

  it('allows overriding the default HTML element', () => {
    const { rerender } = render(
      <Typography variant="title" as="span">
        Title as Span
      </Typography>
    );
    expect(screen.getByText('Title as Span').tagName).toBe('SPAN');

    rerender(
      <Typography variant="body" as="div">
        Body as Div
      </Typography>
    );
    expect(screen.getByText('Body as Div').tagName).toBe('DIV');
  });

  it('applies custom className correctly', () => {
    render(<Typography className="custom-class">Custom Class Text</Typography>);
    expect(screen.getByText('Custom Class Text')).toHaveClass('custom-class');
  });

  it('forwards ref correctly', () => {
    const testId = 'typography-test';
    render(<Typography data-testid={testId}>Typography with ref</Typography>);
    expect(screen.getByTestId(testId)).toBeInTheDocument();
  });

  it('combines variant and weight classes correctly', () => {
    render(
      <Typography variant="subtitle" weight="bold">
        Bold Subtitle
      </Typography>
    );
    const element = screen.getByText('Bold Subtitle');
    expect(element).toHaveClass(
      'text-lg',
      'font-medium',
      'text-blue-600',
      'font-bold'
    );
  });
});
