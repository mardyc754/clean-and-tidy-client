import type { ZodType } from 'zod';
import { basicError } from './schemas/common';

import { handleFetchingData } from './handleFetchingData';

import {
  recurringReservationSchema,
  type RecurringReservationCreationData,
  recurringReservationWithReservationsSchema,
  type RecurringReservationWithReservations
} from './schemas/reservation';
import type { RecurringReservationQueryOptions } from './types';

export const createRecurringReservation = async (
  data: RecurringReservationCreationData
) => {
  return await handleFetchingData({
    path: '/recurring-reservations',
    method: 'post',
    successSchema: recurringReservationSchema,
    errorSchema: basicError,
    data
  });
};

export const getRecurringReservationByName = async (
  name: string,
  options?: RecurringReservationQueryOptions
) => {
  return await handleFetchingData({
    path: `/recurring-reservations/${name}`,
    method: 'get',
    successSchema:
      recurringReservationWithReservationsSchema as ZodType<RecurringReservationWithReservations>,
    errorSchema: basicError,
    params: options
  });
};
