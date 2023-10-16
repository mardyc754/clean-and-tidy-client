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
