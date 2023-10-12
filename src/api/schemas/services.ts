import { z } from 'zod';
import { type SetNonNullable } from 'type-fest';
import { CleaningFrequency } from '~/types/forms';

export const basicService = z.object({
  id: z.number().int(),
  name: z.string().max(100),
  unit: z.union([
    z.object({
      name: z.string().max(40),
      price: z.string().transform((val) => parseFloat(val.replace(',', '.'))),
      duration: z.number().max(480)
    }),
    z.null()
  ])
});

export const service = basicService.merge(
  z.object({
    cleaningFrequencies: z
      .array(
        z.object({ value: z.nativeEnum(CleaningFrequency), name: z.string() })
      )
      .optional(),
    isPrimary: z.boolean(),
    secondaryServices: z.array(basicService).optional(),
    primaryServices: z.array(basicService).optional()
  })
);

export const services = z.array(service);

export const primaryService = service.merge(
  z.object({
    isPrimary: z.literal(true)
  })
);

export const primaryServices = z.array(primaryService);

export type Service = z.infer<typeof service>;

export type ServiceWithUnit = SetNonNullable<BasicServiceData, 'unit'>;

export type BasicServiceData = z.infer<typeof basicService>;

export type PrimaryService = z.infer<typeof primaryService>;
