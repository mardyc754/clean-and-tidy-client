import { type SetNonNullable } from 'type-fest';
import { z } from 'zod';

import { CleaningFrequency } from '~/types/enums';

import { decimalToFloat } from '../common';

export const basicService = z.object({
  id: z.number().int(),
  name: z.string().max(100),
  unit: z
    .object({
      shortName: z.string().max(40),
      fullName: z.string().max(60),
      price: z.string().transform((val) => parseFloat(val.replace(',', '.'))),
      duration: z.number().max(480)
    })
    .nullish(),
  minNumberOfUnitsIfPrimary: z.number().int().min(0).nullish(),
  minCostIfPrimary: decimalToFloat.nullish(),
  detergentsCost: decimalToFloat.nullish()
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

export const orderedVisitPart = z.object({
  employeeId: z.number().int().optional(),
  serviceId: z.number().int(),
  numberOfUnits: z.number().int(),
  startDate: z.string().datetime().optional(),
  endDate: z.string().datetime().optional(),
  cost: z.number().int().optional()
});

// TODO: divide into main service and extra service
export const orderedServiceSchema = basicService.extend({
  isMainServiceForReservation: z.boolean(),
  visitParts: z.array(orderedVisitPart)
});

export const serviceForVisitPart = z
  .object({
    isMainServiceForReservation: z.boolean(),
    reservationId: z.number().int()
  })
  .merge(basicService);

export const primaryServices = z.array(primaryService);

export const timeInterval = z.object({
  startDate: z.string().datetime(),
  endDate: z.string().datetime()
});

export const serviceWithBusyHours = basicService.extend({
  busyHours: z.array(timeInterval)
});

export type Service = z.infer<typeof service>;

export type ServiceWithUnit = SetNonNullable<BasicServiceData, 'unit'>;

export type BasicServiceData = z.infer<typeof basicService>;

export type PrimaryService = z.infer<typeof primaryService>;

export type OrderedService = z.infer<typeof orderedServiceSchema>;

export type OrderedVisitPart = z.infer<typeof orderedVisitPart>;

export type ServiceForVisitPart = z.infer<typeof serviceForVisitPart>;

export type TimeInterval = z.infer<typeof timeInterval>;

export type ServiceWithBusyHours = z.infer<typeof serviceWithBusyHours>;
