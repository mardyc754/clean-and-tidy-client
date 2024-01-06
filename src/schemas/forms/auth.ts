import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

export const loginDataValidator = z.object({
  email: z.string().email(),
  password: z
    .string()
    .min(8, { message: 'Password must be atleast 8 characters' })
    .max(32, { message: 'Password must be atmost 32 characters' })
});

export const registrationDataValidator = loginDataValidator
  .extend({
    confirmPassword: z
      .string()
      .min(8, { message: 'Password must be atleast 8 characters' })
      .max(32, { message: 'Password is too long' })
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Passwords do not match',
    path: ['confirmPassword']
  });

export type LoginData = z.infer<typeof loginDataValidator>;

export type RegistrationData = z.infer<typeof registrationDataValidator>;

export const loginDataResolver = zodResolver(loginDataValidator);

export const registrationDataResolver = zodResolver(registrationDataValidator);
