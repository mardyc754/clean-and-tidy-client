import type { ZodType } from 'zod';

import { basicError } from '~/schemas/api/common';
import {
  type Reservation,
  reservationListSchema,
  reservationSchema
} from '~/schemas/api/reservation';
import type { ReservationCreationData } from '~/schemas/forms/orderService';
import type { StatusChangeData } from '~/schemas/forms/reservationManagement';

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

export const getAllReservations = async (options?: ReservationQueryOptions) => {
  return await handleFetchingData({
    path: '/reservations',
    method: 'get',
    successSchema: reservationListSchema as ZodType<Reservation[]>,
    errorSchema: basicError,
    params: options
  });
};

export const changeReservationStatus = async (
  name: string,
  data: StatusChangeData
  // options?: ReservationQueryOptions
) => {
  return await handleFetchingData({
    path: `/reservations/${name}/status`,
    method: 'put',
    successSchema: reservationSchema as ZodType<Reservation>,
    errorSchema: basicError,
    // params: options,
    data
  });
};

export const confirmReservation = async (
  reservationName: string,
  employeeId: number
) => {
  return await handleFetchingData({
    path: `/reservations/${reservationName}/confirm`,
    method: 'put',
    successSchema: reservationSchema as ZodType<Reservation>,
    errorSchema: basicError,
    data: { employeeId }
  });
};
