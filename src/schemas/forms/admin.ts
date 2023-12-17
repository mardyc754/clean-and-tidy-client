import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

import { basicError } from '../common';
import { loginDataValidator } from './auth';

export const createEmployeeSchema = z
  .object({
    firstName: z
      .string()
      .min(1, { message: 'First name is required' })
      .max(50, { message: 'First name is too long' }),
    lastName: z
      .string()
      .min(1, { message: 'Last name is required' })
      .max(50, { message: 'Last name is too long' }),
    phone: z
      .string()
      .min(9, { message: 'Phone number must have at least 9 digits' })
      .max(15, { message: 'Phone number is too long' })
      .nullish(),
    services: z
      .record(z.string(), z.boolean())
      .refine((data) => Object.values(data).find((value) => value === true), {
        message: 'At least one service must be selected'
      })
  })
  .merge(loginDataValidator)
  .extend({
    confirmPassword: z
      .string()
      .min(8, { message: 'Password must be atleast 8 characters' })
      .max(32, { message: 'Password is too long' })
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Passwords do not match',
    path: ['confirmPassword', 'password']
  });

export type CreateEmployeeData = z.infer<typeof createEmployeeSchema>;

export const createEmployeeResolver = zodResolver(createEmployeeSchema);

export const createEmployeeErrorSchema = basicError.extend({
  affectedField: z
    .union([z.literal('confirmPassword'), z.literal('email')])
    .optional()
});

export type CreateEmployeeError = z.infer<typeof createEmployeeErrorSchema>;
