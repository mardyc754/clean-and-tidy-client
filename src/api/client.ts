import type { ZodType } from 'zod';

import {
  type ReservationWithExtendedVisits,
  ReservationWithVisits,
  reservationWithVisitsSchema
} from '~/schemas/api/reservation';
import { basicError } from '~/schemas/common';

import { handleFetchingData } from './handleFetchingData';

export const getClientReservations = async (clientId: number) => {
  return await handleFetchingData({
    path: `/clients/${clientId}/reservations`,
    method: 'get',
    successSchema: reservationWithVisitsSchema.array() as unknown as ZodType<
      ReservationWithVisits[]
    >,
    errorSchema: basicError
  });
};
