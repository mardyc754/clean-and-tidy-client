import type { ZodType } from 'zod';

import { service, type Service } from './schemas/services';
import { basicError } from './schemas/common';

import { handleFetchingData } from './handleFetchingData';

import type { RecurringReservationCreationData } from './schemas/reservation';

export const createRecurringReservation = async (
  data: RecurringReservationCreationData
) => {
  return await handleFetchingData({
    path: '/recurrent-reservations',
    method: 'post',
    successSchema: service as ZodType<Service>,
    errorSchema: basicError,
    data
  });
};
