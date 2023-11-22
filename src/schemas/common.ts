import { z } from 'zod';

export const basicError = z.object({
  message: z.string()
  // hasError: z.literal(true)
});

export const ISOString = z.string().datetime();

export const decimalToFloat = z
  .string()
  .transform((val) => parseFloat(val.replace(',', '.')));

export type BackendBasicErrorData = z.infer<typeof basicError>;

export const timespanSchema = z.object({
  start: ISOString,
  end: ISOString
});

export type Timespan = z.infer<typeof timespanSchema>;
