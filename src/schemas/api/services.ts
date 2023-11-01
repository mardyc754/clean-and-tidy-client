import { z } from 'zod';
import { type SetNonNullable } from 'type-fest';

import { CleaningFrequency } from '~/types/enums';

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

// TODO: divide into main service and extra service
export const orderedServiceSchema = basicService.extend({
  isMainServiceForReservation: z.boolean(),
  numberOfUnits: z.number().int().max(500).min(1)
});

export const serviceForReservation = z.object({
  isMainServiceForReservation: z.boolean(),
  numberOfUnits: z.number().int().max(500).min(1),
  recurringReservationId: z.number().int(),
  serviceId: z.number().int(),
  service: service.pick({ id: true, name: true })
});

export const primaryServices = z.array(primaryService);

export type Service = z.infer<typeof service>;

export type ServiceWithUnit = SetNonNullable<BasicServiceData, 'unit'>;

export type BasicServiceData = z.infer<typeof basicService>;

export type PrimaryService = z.infer<typeof primaryService>;

export type OrderedService = z.infer<typeof orderedServiceSchema>;

export type ServiceForReservation = z.infer<typeof serviceForReservation>;
