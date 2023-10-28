import { basicError } from './schemas/common';

import { handleFetchingData } from './handleFetchingData';

import {
  recurringReservationSchema,
  type RecurringReservationCreationData
} from './schemas/reservation';

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
