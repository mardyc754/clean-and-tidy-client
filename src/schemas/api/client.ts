import { z } from 'zod';

// import { reservationSchema } from './reservation';

export const clientSchema = z
  .object({
    id: z.number().int(),
    firstName: z.string().max(50).or(z.null()),
    lastName: z.string().max(50).or(z.null()),
    email: z.string().email(),
    username: z.string().max(30).or(z.null()),
    phone: z.string().max(15).or(z.null())
  })
  .strict();

export type Client = z.infer<typeof clientSchema>;
