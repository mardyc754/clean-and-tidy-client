import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

import { Status } from '~/types/enums';

export const statusChangeSchema = z.object({
  status: z.nativeEnum(Status),
  employeeId: z.number().int()
});

export type StatusChangeData = z.infer<typeof statusChangeSchema>;

export const changeVisitDataSchema = z.object({
  startDate: z.date({
    required_error: 'Select a date',
    invalid_type_error: 'Select a date'
  }),
  hourDate: z.date({
    required_error: 'Select an hour',
    invalid_type_error: 'Select an hour'
  })
});

export type ChangeVisitData = z.infer<typeof changeVisitDataSchema>;

export const changeVisitDataResolver = zodResolver(changeVisitDataSchema);
