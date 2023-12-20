import type { ZodType } from 'zod';

import {
  type ReservationWithExtendedVisits,
  ReservationWithVisits,
  reservationWithExtendedVisitsSchema,
  reservationWithVisitsSchema
} from '~/schemas/api/reservation';
import { basicError } from '~/schemas/common';

import { handleFetchingData } from './handleFetchingData';

export const getClientReservations = async (clientId: number) => {
  return await handleFetchingData({
    path: `/clients/${clientId}/reservations`,
    method: 'get',
    successSchema:
      reservationWithExtendedVisitsSchema.array() as unknown as ZodType<
        ReservationWithExtendedVisits[]
      >,
    errorSchema: basicError
  });
};
