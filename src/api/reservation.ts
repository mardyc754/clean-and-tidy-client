import type { ZodType } from 'zod';

import {
  recurringReservationSchema,
  type RecurringReservation
} from '~/schemas/api/reservation';

import { basicError } from '~/schemas/api/common';
import type { RecurringReservationCreationData } from '~/schemas/forms/orderService';

import { handleFetchingData } from './handleFetchingData';
import type { RecurringReservationQueryOptions } from './types';

export const createRecurringReservation = async (
  data: RecurringReservationCreationData
) => {
  return await handleFetchingData({
    path: '/recurring-reservations',
    method: 'post',
    successSchema: recurringReservationSchema as ZodType<RecurringReservation>,
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
    successSchema: recurringReservationSchema as ZodType<RecurringReservation>,
    errorSchema: basicError,
    params: options
  });
};
