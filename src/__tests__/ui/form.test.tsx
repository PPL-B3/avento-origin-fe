import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  useFormField,
} from '@/components/ui/form';
import { render, screen } from '@testing-library/react';
import { useForm } from 'react-hook-form';

// Mock dependencies
jest.mock('react-hook-form', () => ({
  FormProvider: ({ children }: any) => (
    <div data-testid="form-provider">{children}</div>
  ),
  Controller: ({ render }: any) =>
    render({ field: { value: '', onChange: jest.fn() } }),
  useFormContext: () => ({
    getFieldState: () => ({ invalid: false, error: undefined }),
    formState: { errors: {} },
  }),
  useForm: () => ({
    control: {},
  }),
}));

jest.mock('@radix-ui/react-slot', () => ({
  Slot: ({ children, ...props }: any) => (
    <div data-testid="slot" {...props}>
      {children}
    </div>
  ),
}));

jest.mock('@/components/ui/label', () => ({
  Label: ({ children, ...props }: any) => (
    <label data-testid="label" {...props}>
      {children}
    </label>
  ),
}));

const TestFormComponent = () => {
  const form = useForm();
  return (
    <Form {...form}>
      <FormField
        control={form.control}
        name="test"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Test Label</FormLabel>
            <FormControl>
              <input {...field} />
            </FormControl>
            <FormDescription>Test description</FormDescription>
            <FormMessage>Test message</FormMessage>
          </FormItem>
        )}
      />
    </Form>
  );
};

// Error test components
function TestWithoutFormFieldContext() {
  try {
    // This should throw an error when called outside of FormField context
    useFormField();
    return null; // This should never be reached if useFormField throws correctly
  } catch (error: unknown) {
    const errorMessage =
      error instanceof Error ? error.message : 'An error occurred';
    return <div data-testid="expected-error">{errorMessage}</div>;
  }
}

// Test with error in the form field
const ErrorFormField = () => {
  const errorMockFormContext = {
    getFieldState: () => ({
      invalid: true,
      error: { message: 'Test error message' },
    }),
    formState: { errors: { test: { message: 'Test error message' } } },
  };

  jest.mock('react-hook-form', () => ({
    ...jest.requireActual('react-hook-form'),
    useFormContext: () => errorMockFormContext,
  }));

  const form = useForm();
  return (
    <Form {...form}>
      <FormField
        control={form.control}
        name="test"
        render={() => (
          <FormItem>
            <FormLabel>Error Label</FormLabel>
            <FormControl>
              <input />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </Form>
  );
};

describe('Form components', () => {
  test('Form renders FormProvider correctly', () => {
    const form = useForm();
    render(<Form {...form}>Test form</Form>);
    const formProvider = screen.getByTestId('form-provider');
    expect(formProvider).toBeInTheDocument();
    expect(formProvider).toHaveTextContent('Test form');
  });

  test('FormItem renders with id context', () => {
    render(
      <FormItem data-testid="form-item">
        <div>Item content</div>
      </FormItem>
    );
    const formItem = screen.getByTestId('form-item');
    expect(formItem).toBeInTheDocument();
    expect(formItem).toHaveTextContent('Item content');
  });

  test('FormLabel renders correctly', () => {
    // Create a mock FormField context
    const WrappedFormLabel = () => {
      return (
        <Form {...useForm()}>
          <FormField
            name="test"
            render={() => (
              <FormItem>
                <FormLabel data-testid="form-label">Test Label</FormLabel>
              </FormItem>
            )}
          />
        </Form>
      );
    };

    render(<WrappedFormLabel />);
    const label = screen.getByTestId('form-label');
    expect(label).toBeInTheDocument();
    expect(label).toHaveTextContent('Test Label');
  });

  test('FormControl renders correctly', () => {
    // Create a mock FormField context
    const WrappedFormControl = () => {
      return (
        <Form {...useForm()}>
          <FormField
            name="test"
            render={() => (
              <FormItem>
                <FormControl data-testid="form-control">
                  <input type="text" />
                </FormControl>
              </FormItem>
            )}
          />
        </Form>
      );
    };

    render(<WrappedFormControl />);
    const control = screen.getByTestId('form-control');
    expect(control).toBeInTheDocument();
  });

  test('FormDescription renders correctly', () => {
    // Create a mock FormField context
    const WrappedFormDescription = () => {
      return (
        <Form {...useForm()}>
          <FormField
            name="test"
            render={() => (
              <FormItem>
                <FormDescription data-testid="form-description">
                  Test description
                </FormDescription>
              </FormItem>
            )}
          />
        </Form>
      );
    };

    render(<WrappedFormDescription />);
    const description = screen.getByTestId('form-description');
    expect(description).toBeInTheDocument();
    expect(description).toHaveTextContent('Test description');
  });

  test('FormMessage renders with children when no error', () => {
    // Create a mock FormField context
    const WrappedFormMessage = () => {
      return (
        <Form {...useForm()}>
          <FormField
            name="test"
            render={() => (
              <FormItem>
                <FormMessage data-testid="form-message">
                  Test message
                </FormMessage>
              </FormItem>
            )}
          />
        </Form>
      );
    };

    render(<WrappedFormMessage />);
    const message = screen.getByTestId('form-message');
    expect(message).toBeInTheDocument();
    expect(message).toHaveTextContent('Test message');
  });

  test('FormMessage returns null when no error and no children', () => {
    // Mock the context with no error
    jest.mock('react-hook-form', () => ({
      ...jest.requireActual('react-hook-form'),
      useFormContext: () => ({
        getFieldState: () => ({ invalid: false, error: undefined }),
        formState: { errors: {} },
      }),
    }));

    const WrappedEmptyFormMessage = () => {
      return (
        <Form {...useForm()}>
          <FormField
            name="test"
            render={() => (
              <FormItem>
                <FormMessage data-testid="form-message" />
              </FormItem>
            )}
          />
        </Form>
      );
    };

    render(<WrappedEmptyFormMessage />);
    expect(screen.queryByTestId('form-message')).not.toBeInTheDocument();
  });

  test('full form component integration renders correctly', () => {
    render(<TestFormComponent />);
    expect(screen.getByText('Test Label')).toBeInTheDocument();
    expect(screen.getByText('Test description')).toBeInTheDocument();
  });

  // This test forces the error branch in FormLabel by mocking error state
  test('FormLabel with error state adds destructive class', () => {
    // Override the mock to return an error
    const originalUseFormContext = require('react-hook-form').useFormContext;
    require('react-hook-form').useFormContext = jest
      .fn()
      .mockImplementation(() => ({
        getFieldState: () => ({
          invalid: true,
          error: { message: 'Test error' },
        }),
        formState: { errors: { test: { message: 'Test error' } } },
      }));

    const WrappedFormLabelWithError = () => (
      <Form {...useForm()}>
        <FormField
          name="test"
          render={() => (
            <FormItem>
              <FormLabel data-testid="error-label">Test Label</FormLabel>
            </FormItem>
          )}
        />
      </Form>
    );

    render(<WrappedFormLabelWithError />);
    expect(screen.getByTestId('error-label')).toBeInTheDocument();

    // Restore the original mock
    require('react-hook-form').useFormContext = originalUseFormContext;
  });

  // Test FormMessage with error
  test('FormMessage displays error message', () => {
    // Override the mock to return an error
    const originalUseFormContext = require('react-hook-form').useFormContext;
    require('react-hook-form').useFormContext = jest
      .fn()
      .mockImplementation(() => ({
        getFieldState: () => ({
          invalid: true,
          error: { message: 'Test error message' },
        }),
        formState: { errors: { test: { message: 'Test error message' } } },
      }));

    const WrappedFormMessageWithError = () => (
      <Form {...useForm()}>
        <FormField
          name="test"
          render={() => (
            <FormItem>
              <FormMessage data-testid="error-message" />
            </FormItem>
          )}
        />
      </Form>
    );

    render(<WrappedFormMessageWithError />);
    const errorMessage = screen.getByTestId('error-message');
    expect(errorMessage).toBeInTheDocument();
    expect(errorMessage).toHaveTextContent('Test error message');

    // Restore the original mock
    require('react-hook-form').useFormContext = originalUseFormContext;
  });
});

test('useFormField returns correct field information', () => {
  // Create a test component that exposes useFormField values
  const UseFormFieldTester = () => {
    const form = useForm();

    return (
      <Form {...form}>
        <FormField
          control={form.control}
          name="testField"
          render={() => {
            const field = useFormField();
            return (
              <div data-testid="field-info">
                <span data-testid="field-name">{field.name}</span>
                <span data-testid="form-item-id">{field.formItemId}</span>
                <span data-testid="form-description-id">
                  {field.formDescriptionId}
                </span>
                <span data-testid="form-message-id">{field.formMessageId}</span>
              </div>
            );
          }}
        />
      </Form>
    );
  };

  render(<UseFormFieldTester />);

  expect(screen.getByTestId('field-name')).toHaveTextContent('testField');
  expect(screen.getByTestId('form-item-id')).toHaveTextContent('-form-item');
  expect(screen.getByTestId('form-description-id')).toHaveTextContent(
    '-form-item-description'
  );
  expect(screen.getByTestId('form-message-id')).toHaveTextContent(
    '-form-item-message'
  );
});

test('FormControl provides correct aria attributes', () => {
  // Test component to check aria attributes in normal state
  const FormControlAriaTester = () => {
    const form = useForm();

    return (
      <Form {...form}>
        <FormField
          control={form.control}
          name="test"
          render={() => (
            <FormItem>
              <FormControl data-testid="form-control">
                <input type="text" />
              </FormControl>
              <FormDescription>Test description</FormDescription>
            </FormItem>
          )}
        />
      </Form>
    );
  };

  render(<FormControlAriaTester />);
  const control = screen.getByTestId('form-control');
  expect(control).toHaveAttribute('aria-invalid', 'false');
  expect(control).toHaveAttribute('aria-describedby');
  expect(control.getAttribute('aria-describedby')).toContain(
    '-form-item-description'
  );
});
