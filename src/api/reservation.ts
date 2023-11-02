import type { ZodType } from 'zod';

import { reservationSchema, type Reservation } from '~/schemas/api/reservation';

import { basicError } from '~/schemas/api/common';
import type { ReservationCreationData } from '~/schemas/forms/orderService';

import { handleFetchingData } from './handleFetchingData';
import type { ReservationQueryOptions } from './types';

export const createReservation = async (data: ReservationCreationData) => {
  return await handleFetchingData({
    path: '/reservations',
    method: 'post',
    successSchema: reservationSchema as ZodType<Reservation>,
    errorSchema: basicError,
    data
  });
};

export const getReservationByName = async (
  name: string,
  options?: ReservationQueryOptions
) => {
  return await handleFetchingData({
    path: `/reservations/${name}`,
    method: 'get',
    successSchema: reservationSchema as ZodType<Reservation>,
    errorSchema: basicError,
    params: options
  });
};
