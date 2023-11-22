import { z } from 'zod';

import { ISOString, timespanSchema } from '../common';

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

export const employeeWithWorkingHoursSchema = employeeSchema.extend({
  workingHours: timespanSchema.array()
});

export type Employee = z.infer<typeof employeeSchema>;

export type Admin = z.infer<typeof adminSchema>;

export type EmployeeWithWorkingHours = z.infer<
  typeof employeeWithWorkingHoursSchema
>;
