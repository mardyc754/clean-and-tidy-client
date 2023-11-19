import type { ZodType } from 'zod';

import {
  type Reservation,
  reservationListSchema
} from '~/schemas/api/reservation';
import { basicError } from '~/schemas/common';

import { handleFetchingData } from './handleFetchingData';

export const getClientReservations = async (clientId: number) => {
  return await handleFetchingData({
    path: `/clients/${clientId}/reservations`,
    method: 'get',
    successSchema: reservationListSchema as ZodType<Reservation[]>,
    errorSchema: basicError
  });
};
