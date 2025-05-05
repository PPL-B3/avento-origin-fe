import { z } from 'zod';

export const emailSchema = z
  .string()
  .email({ message: 'Email tidak valid' })
  .refine((email) => email.endsWith('@gmail.com'), {
    message: 'Email must be a Gmail address',
  });
