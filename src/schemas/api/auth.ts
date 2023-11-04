import { z } from 'zod';

import { UserRole } from '~/types/enums';

import { basicError } from './common';
import { clientSchema } from './client';
import { employeeSchema } from './employee';

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
  role: z.nativeEnum(UserRole),
  email: z.string().email(),
  userId: z.number().int()
});

export const loginError = basicError.merge(
  z.object({
    affectedField: z
      .union([z.literal('password'), z.literal('email')])
      .optional()
  })
);

export const clientUserSchema = clientSchema.extend({
  role: z.literal(UserRole.CLIENT)
});

export const employeeUserSchema = employeeSchema.extend({
  role: z.union([z.literal(UserRole.EMPLOYEE), z.literal(UserRole.ADMIN)])
});

export const userSchema = z.union([clientUserSchema, employeeUserSchema]);

export type LoginSuccessData = z.infer<typeof loginSuccess>;

export type User = z.infer<typeof userSchema>;

export type ClientUser = z.infer<typeof clientUserSchema>;

export type EmployeeUser = z.infer<typeof employeeUserSchema>;
