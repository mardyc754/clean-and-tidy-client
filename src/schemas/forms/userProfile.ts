import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

export const changeUserDataSchema = z.object({
  firstName: z
    .string()
    .min(1, { message: 'First name is required' })
    .max(50, { message: 'First name is too long' }),
  lastName: z
    .string()
    .min(1, { message: 'Last name is required' })
    .max(50, { message: 'Last name is too long' }),
  phone: z
    .string()
    .min(9, { message: 'Phone number must have at least 9 digits' })
    .max(15, { message: 'Phone number is too long' })
    .nullish()
});

export type ChangeUserData = z.infer<typeof changeUserDataSchema>;

export const changeUserDataResolver = zodResolver(changeUserDataSchema);
