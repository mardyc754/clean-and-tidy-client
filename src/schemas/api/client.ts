import { z } from 'zod';

export const clientSchema = z
  .object({
    id: z.number().int(),
    firstName: z.string().max(50),
    lastName: z.string().max(50),
    email: z.string().email(),
    phone: z.string().max(15)
  })
  .strict();

export type Client = z.infer<typeof clientSchema>;
