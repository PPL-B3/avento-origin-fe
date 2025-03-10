import { registerSchema } from '@/components/modules/register/schema';

describe('registerSchema', () => {
  // Test valid data
  it('validates correct registration data', () => {
    const validData = {
      email: 'john@example.com',
      password: 'Password123!',
    };

    const result = registerSchema.safeParse(validData);
    expect(result.success).toBe(true);
  });

  // Test invalid email
  it('rejects invalid email format', () => {
    const invalidEmailData = {
      email: 'invalid-email',
      password: 'Password123!',
    };

    const result = registerSchema.safeParse(invalidEmailData);
    expect(result.success).toBe(false);
    if (!result.success) {
      const formattedErrors = result.error.format();
      expect(formattedErrors.email?._errors).toBeDefined();
    }
  });
});
