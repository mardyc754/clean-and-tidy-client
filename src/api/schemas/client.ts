import { z } from 'zod';

export const clientDataSchema = z.object({
  id: z.number().int(),
  firstName: z.string().max(50),
  lastName: z.string().max(50),
  email: z.string().email(),
  password: z.string().min(8).max(32),
  phone: z.string().max(15)
});

export type ClientData = z.infer<typeof clientDataSchema>;
