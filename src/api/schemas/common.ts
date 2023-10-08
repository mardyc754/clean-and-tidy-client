import { z } from 'zod';

export const basicError = z.object({
  message: z.string()
});

export type BackendBasicErrorData = z.infer<typeof basicError>;
