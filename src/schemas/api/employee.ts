import { z } from 'zod';

import { Status } from '~/types/enums';

import { service } from './services';

export const employeeSchema = z.object({
  id: z.number().int(),
  firstName: z.string().max(50),
  lastName: z.string().max(50),
  phone: z.string().max(15).nullish(),
  email: z.string().email().max(100),
  isAdmin: z.boolean()
});

export const adminSchema = employeeSchema.extend({
  isAdmin: z.literal(true)
});

export const employeeWithStatusSchema = z.object({
  employee: employeeSchema,
  status: z.nativeEnum(Status)
});

export const employeeWithServicesSchema = employeeSchema.extend({
  services: z.array(service)
});

export type Employee = z.infer<typeof employeeSchema>;

export type Admin = z.infer<typeof adminSchema>;

export type EmployeeWithStatus = z.infer<typeof employeeWithStatusSchema>;

export type EmployeeWithServices = z.infer<typeof employeeWithServicesSchema>;
