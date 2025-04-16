import { z } from 'zod';

export const registerSchema = z.object({
  email: z.string().email(),
  password: z
    .string()
    .min(8, 'Password harus memiliki minimal 8 karakter!')
    .regex(/\d/, 'Password harus memiliki minimal 1 angka!')
    .regex(/[a-zA-Z]/, 'Password harus memiliki minimal 1 huruf!')
    .regex(/[!@#$%^&*]/, 'Password harus memiliki minimal 1 karakter spesial!')
    .regex(/[a-z]/, 'Password harus memiliki minimal 1 huruf kecil!')
    .regex(/[A-Z]/, 'Password harus memiliki minimal 1 huruf besar!'),
});
