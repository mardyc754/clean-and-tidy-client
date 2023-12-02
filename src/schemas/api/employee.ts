import { z } from 'zod';

import { Status } from '~/types/enums';

import { ISOString } from '../common';

export const employeeSchema = z.object({
  id: z.number().int(),
  firstName: z.string().max(50),
  lastName: z.string().max(50),
  email: z.string().email().max(100),
  startHour: ISOString,
  endHour: ISOString,
  isAdmin: z.boolean()
});

export const adminSchema = employeeSchema.extend({
  isAdmin: z.literal(true)
});

export const employeeWithStatusSchema = z.object({
  employee: employeeSchema,
  status: z.nativeEnum(Status)
});

export type Employee = z.infer<typeof employeeSchema>;

export type Admin = z.infer<typeof adminSchema>;

export type EmployeeWithStatus = z.infer<typeof employeeWithStatusSchema>;
