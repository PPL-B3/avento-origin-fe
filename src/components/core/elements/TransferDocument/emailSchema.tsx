import { z } from 'zod';

export const emailSchema = z
  .string()
  .email({ message: 'Email invalid' })
  .refine((email) => email.endsWith('@gmail.com'), {
    message: 'Email must be a Gmail address',
  });
