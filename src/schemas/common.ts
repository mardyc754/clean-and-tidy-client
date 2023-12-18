import { z } from 'zod';

export const basicError = z.object({
  message: z.string()
  // hasError: z.literal(true)
});

export const ISOString = z.string().datetime();

export const decimalToFloat = z
  .string()
  .transform((val) => parseFloat(val.replace(',', '.')));

export const price = z
  .string()
  .transform((val) => parseFloat(val))
  .refine(
    (val) => {
      return !isNaN(val);
    },
    { message: 'Price must be a valid number' }
  )
  .refine((val) => val > 0, { message: 'Price must be greater than 0' })
  .refine((val) => val < 10000, {
    message: 'Price must be less than 10000'
  });

export type BackendBasicErrorData = z.infer<typeof basicError>;
