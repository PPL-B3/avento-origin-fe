/**
 * Error Handling Strategy Pattern
 *
 * This pattern defines a family of algorithms, encapsulates each one, and makes them interchangeable.
 *
 * Benefits:
 * - Eliminates conditional statements
 * - Makes error handling logic reusable
 * - Allows easy extension with new error handling strategies
 */

export interface ErrorHandlingStrategy {
  handleError(error: unknown): string;
}

export class ApiErrorHandlingStrategy implements ErrorHandlingStrategy {
  handleError(error: unknown): string {
    if (!error || typeof error !== 'object') {
      return 'An unknown error occurred';
    }

    // Handle axios-like errors
    if (
      'response' in error &&
      error.response &&
      typeof error.response === 'object'
    ) {
      const errorResponse = error.response as { data?: { message?: string } };

      if (errorResponse.data?.message) {
        const errorMessage = errorResponse.data.message;

        if (Array.isArray(errorMessage)) {
          return errorMessage[0] ?? 'Something went wrong';
        } else if (typeof errorMessage === 'string') {
          return errorMessage;
        }
      }
    }

    // Handle native Error objects
    if (error instanceof Error) {
      return error.message;
    }

    return 'Something went wrong';
  }
}

// Singleton instance of the default error handling strategy
export const defaultErrorHandler = new ApiErrorHandlingStrategy();
