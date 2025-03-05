import { Toaster } from '@/components/ui/sonner';
import { render } from '@testing-library/react';

// Create a mockUseTheme function that we can control for different tests
const mockUseTheme = jest.fn().mockReturnValue({ theme: 'dark' });

// Mock the dependencies
jest.mock('next-themes', () => ({
  useTheme: () => mockUseTheme(),
}));

jest.mock('sonner', () => ({
  Toaster: ({ theme, className, position, toastOptions, ...props }: any) => (
    <div
      data-testid="mock-sonner"
      data-theme={theme}
      data-class={className}
      data-position={position}
      data-props={JSON.stringify(props)}
    >
      {JSON.stringify(toastOptions)}
    </div>
  ),
}));

describe('Toaster component', () => {
  beforeEach(() => {
    // Reset the mock before each test
    mockUseTheme.mockReturnValue({ theme: 'dark' });
  });

  test('renders with dark theme', () => {
    const { getByTestId } = render(<Toaster />);
    const toaster = getByTestId('mock-sonner');
    expect(toaster).toHaveAttribute('data-theme', 'dark');
    expect(toaster).toHaveAttribute('data-class', 'toaster group');
    expect(toaster).toHaveAttribute('data-position', 'top-center');
  });

  test('renders with light theme', () => {
    mockUseTheme.mockReturnValue({ theme: 'light' });
    const { getByTestId } = render(<Toaster />);
    const toaster = getByTestId('mock-sonner');
    expect(toaster).toHaveAttribute('data-theme', 'light');
  });

  test('renders with system theme', () => {
    mockUseTheme.mockReturnValue({ theme: 'system' });
    const { getByTestId } = render(<Toaster />);
    const toaster = getByTestId('mock-sonner');
    expect(toaster).toHaveAttribute('data-theme', 'system');
  });

  test('handles undefined theme gracefully', () => {
    mockUseTheme.mockReturnValue({});
    const { getByTestId } = render(<Toaster />);
    const toaster = getByTestId('mock-sonner');
    expect(toaster).toHaveAttribute('data-theme', 'system');
  });

  test('passes additional props to Sonner', () => {
    const { getByTestId } = render(
      <Toaster closeButton={true} richColors={true} />
    );
    const toaster = getByTestId('mock-sonner');
    const props = JSON.parse(toaster.getAttribute('data-props') || '{}');
    expect(props.closeButton).toBe(true);
    expect(props.richColors).toBe(true);
  });

  test('allows overriding className', () => {
    const { getByTestId } = render(<Toaster className="custom-toaster" />);
    const toaster = getByTestId('mock-sonner');
    expect(toaster).toHaveAttribute(
      'data-class',
      'toaster group custom-toaster'
    );
  });

  test('allows overriding position', () => {
    const { getByTestId } = render(<Toaster position="bottom-right" />);
    const toaster = getByTestId('mock-sonner');
    expect(toaster).toHaveAttribute('data-position', 'bottom-right');
  });

  test('allows overriding theme directly', () => {
    mockUseTheme.mockReturnValue({ theme: 'dark' });
    const { getByTestId } = render(<Toaster theme="light" />);
    const toaster = getByTestId('mock-sonner');
    // Direct theme prop should override the theme from useTheme
    expect(toaster).toHaveAttribute('data-theme', 'light');
  });

  test('sets toast class options correctly', () => {
    const { getByTestId } = render(<Toaster />);
    const toaster = getByTestId('mock-sonner');
    const toastOptions = JSON.parse(toaster.textContent || '{}');
    expect(toastOptions.classNames.error).toBe('!bg-red-500');
    expect(toastOptions.classNames.success).toBe('!bg-[#54ba25]');
    expect(toastOptions.classNames.warning).toBe(
      '!bg-yellow-500 !text-neutral-950'
    );
    expect(toastOptions.classNames.info).toBe('!bg-blue-400');
  });

  test('allows overriding toast options', () => {
    const customToastOptions = {
      classNames: {
        error: '!bg-custom-red',
        success: '!bg-custom-green',
      },
      duration: 5000,
    };

    const { getByTestId } = render(
      <Toaster toastOptions={customToastOptions} />
    );
    const toaster = getByTestId('mock-sonner');
    const toastOptions = JSON.parse(toaster.textContent || '{}');

    // The component should merge our custom options with the defaults
    expect(toastOptions.classNames.error).toBe('!bg-custom-red');
    expect(toastOptions.classNames.success).toBe('!bg-custom-green');
    expect(toastOptions.duration).toBe(5000);

    // These should still be the default values
    expect(toastOptions.classNames.warning).toBe(
      '!bg-yellow-500 !text-neutral-950'
    );
    expect(toastOptions.classNames.info).toBe('!bg-blue-400');
  });

  test('handles conflicting classNames in toastOptions correctly', () => {
    const customClassNames = {
      toast: 'my-custom-toast-class',
      error: '!bg-custom-red',
    };

    const { getByTestId } = render(
      <Toaster toastOptions={{ classNames: customClassNames }} />
    );

    const toaster = getByTestId('mock-sonner');
    const toastOptions = JSON.parse(toaster.textContent || '{}');

    expect(toastOptions.classNames.toast).toBe('my-custom-toast-class');
    expect(toastOptions.classNames.error).toBe('!bg-custom-red');
    expect(toastOptions.classNames.success).toBe('!bg-[#54ba25]');
  });
});
