import { emailSchema } from '@/components/core/elements/TransferDocument/emailSchema';

describe('emailSchema', () => {
  it('accepts valid gmail email', () => {
    const result = emailSchema.safeParse('test@gmail.com');
    expect(result.success).toBe(true);
  });

  it('rejects invalid email format', () => {
    const result = emailSchema.safeParse('not-an-email');
    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.errors[0].message).toBe('Email invalid');
    }
  });

  it('rejects non-gmail email', () => {
    const result = emailSchema.safeParse('test@yahoo.com');
    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.errors[0].message).toBe(
        'Email must be a Gmail address'
      );
    }
  });
});
