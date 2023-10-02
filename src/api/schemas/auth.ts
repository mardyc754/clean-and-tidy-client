import { z } from 'zod';

export const registrationSuccessDataSchema = z.object({
  id: z.number().int(),
  username: z.string().max(30),
  email: z.string().email(),
  message: z.string()
});

export type RegistrationSuccessData = z.infer<
  typeof registrationSuccessDataSchema
>;

export const registrationErrorDataSchema = z.object({
  message: z.string(),
  affectedField: z.string().optional()
});

export type RegistrationErrorData = z.infer<typeof registrationErrorDataSchema>;
