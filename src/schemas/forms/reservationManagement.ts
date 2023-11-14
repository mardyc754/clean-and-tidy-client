import { z } from 'zod';

import { Status } from '~/types/enums';

export const statusChangeSchema = z.object({
  status: z.nativeEnum(Status),
  employeeId: z.number().int()
});

export type StatusChangeData = z.infer<typeof statusChangeSchema>;
