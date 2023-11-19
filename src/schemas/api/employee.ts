import { z } from 'zod';

import { ISOString } from '../common';

export const employeeSchema = z.object({
  id: z.number().int(),
  firstName: z.string().max(50),
  lastName: z.string().max(50),
  email: z.string().email().max(100),
  startHour: ISOString,
  endHour: ISOString
});

export const adminSchema = employeeSchema.extend({
  isAdmin: z.literal(true)
});

export type Employee = z.infer<typeof employeeSchema>;

export type Admin = z.infer<typeof adminSchema>;
