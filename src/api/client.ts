import type { ZodType } from 'zod';

import { basicError } from '~/schemas/api/common';
import {
  reservationListSchema,
  type Reservation
} from '~/schemas/api/reservation';

import { handleFetchingData } from './handleFetchingData';

export const getClientReservations = async (clientId: number) => {
  return await handleFetchingData({
    path: `/clients/${clientId}/reservations`,
    method: 'get',
    successSchema: reservationListSchema as ZodType<Reservation[]>,
    errorSchema: basicError
  });
};
