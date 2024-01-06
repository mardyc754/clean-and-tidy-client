import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

import { basicError, price } from '../common';
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
      .min(8, { message: 'Password must have at least 8 characters' })
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

export const changeEmployeeDataSchema = z.object({
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
  services: z.record(z.string(), z.boolean()),
  isAdmin: z.boolean().optional()
});

export type EmployeeChangeData = z.infer<typeof changeEmployeeDataSchema>;

export const changeEmployeeDataResolver = zodResolver(changeEmployeeDataSchema);

export const updateServiceSchema = z.object({
  unit: z.object({
    // price: z.number().min(0.01, { message: 'Price must be greater than 0' })
    price: price
  })
});

export const updateServiceResolver = zodResolver(updateServiceSchema);

export type UpdateServiceData = z.infer<typeof updateServiceSchema>;

export const createServiceDataSchema = z
  .object({
    name: z
      .string()
      .min(1, { message: 'Name is required' })
      .max(50, { message: 'Name is too long' }),
    unit: z
      .object({
        fullName: z
          .string()
          .min(1, { message: 'Unit name is required' })
          .max(50, { message: 'Unit name is too long' }),
        price: price,
        shortName: z
          .string()
          .min(1, { message: 'Short name is required' })
          .max(10, { message: 'Short name is too long' }),
        duration: z
          .number()
          .int()
          .min(1, { message: 'Duration must be greater than 0' })
          .max(480, { message: 'Duration must be less than 8 hours' })
      })
      .strict()
      .optional(),
    isPrimary: z.boolean(),
    minNumberOfUnitsIfPrimary: z
      .number()
      .int()
      .max(500, { message: 'Minimum number of units must be less than 500' })
      .optional(),
    minCostIfPrimary: z
      .string()
      .transform((val) => parseFloat(val))
      .optional(),
    secondaryServices: z.record(z.string(), z.boolean())
  })
  .refine(
    (data) => {
      if (!data.isPrimary) return true;
      if (data.minCostIfPrimary) return true;
      if (!data.minCostIfPrimary && (data.minNumberOfUnitsIfPrimary ?? 0) > 0)
        return true;

      return false;
    },
    {
      message:
        'Primary service must have minimum number of units or minimum cost',
      path: ['minCostIfPrimary']
    }
  )
  .refine(
    (data) => {
      if (!data.isPrimary) return true;
      if (data.minNumberOfUnitsIfPrimary) return true;
      if ((data?.minCostIfPrimary ?? 0) > 0) return true;
    },
    {
      message:
        'Primary service must have minimum number of units or minimum cost',
      path: ['minNumberOfUnitsIfPrimary']
    }
  );

export type CreateServiceData = z.infer<typeof createServiceDataSchema>;

export const createServiceErrorSchema = basicError.extend({
  affectedField: z
    .union([
      z.literal('name'),
      z.literal('unit.fullName'),
      z.literal('unit.shortName'),
      z.literal('unit.price'),
      z.literal('secondaryServices'),
      z.literal('minNumberOfUnitsIfPrimary'),
      z.literal('minCostIfPrimary')
    ])
    .optional()
});

export type CreateServiceError = z.infer<typeof createServiceErrorSchema>;

export const createServiceResolver = zodResolver(createServiceDataSchema);
