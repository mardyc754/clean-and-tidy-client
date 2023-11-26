import { z } from 'zod';

export const visitPartSchema = z.object({
  employeeId: z.number().int(),
  serviceId: z.number().int(),
  numberOfUnits: z.number().int(),
  startDate: z.string().datetime(),
  endDate: z.string().datetime(),
  cost: z.number().min(0)
});

export type VisitPart = z.infer<typeof visitPartSchema>;
