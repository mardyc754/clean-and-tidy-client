import type { ZodType } from 'zod';

import {
  type ClientWithReservations,
  clientWithReservationsSchema
} from '~/schemas/api/client';
import { basicError } from '~/schemas/api/common';

import { handleFetchingData } from './handleFetchingData';

export const getClientReservations = async (clientId: number) => {
  return await handleFetchingData({
    path: `/clients/${clientId}/reservations`,
    method: 'get',
    successSchema:
      clientWithReservationsSchema as ZodType<ClientWithReservations>,
    errorSchema: basicError
  });
};
