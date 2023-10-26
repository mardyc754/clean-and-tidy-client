import { z } from 'zod';

export const basicError = z.object({
  message: z.string(),
  hasError: z.literal(true)
});

export const ISOString = z.string().datetime();

export type BackendBasicErrorData = z.infer<typeof basicError>;
