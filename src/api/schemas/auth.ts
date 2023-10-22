import { z } from 'zod';

import { UserRole } from '~/types/user';
import { basicError } from './common';

export const registrationSuccess = z.object({
  id: z.number().int(),
  username: z.string().max(30),
  email: z.string().email(),
  message: z.literal('Client created succesfully')
});

export const registrationError = basicError.merge(
  z.object({
    affectedField: z
      .union([z.literal('username'), z.literal('email')])
      .optional()
  })
);

export const loginSuccess = z.object({
  message: z.literal('Logged in successfully'),
  isAuthenticated: z.literal(true),
  role: z.nativeEnum(UserRole)
});

export const loginError = basicError.merge(
  z.object({
    affectedField: z
      .union([z.literal('password'), z.literal('email')])
      .optional()
  })
);

export const loginDataValidator = z.object({
  email: z.string().email(),
  password: z
    .string()
    .min(8, { message: 'Password is too short' })
    .max(32, { message: 'Password is too long' })
});

export type LoginData = z.infer<typeof loginDataValidator>;

export const registrationDataValidator = loginDataValidator
  .extend({
    username: z
      .string()
      .min(6, { message: 'Username is too short' })
      .max(30, { message: 'Username is too long' }),
    confirmPassword: z
      .string()
      .min(8, { message: 'Password is too short' })
      .max(32, { message: 'Password is too long' })
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Passwords do not match',
    path: ['confirmPassword']
  });

export type RegistrationData = z.infer<typeof registrationDataValidator>;
