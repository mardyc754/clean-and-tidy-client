import type { ZodType } from 'zod';

import {
  type Reservation,
  type ReservationWithExtendedVisits,
  reservationSchema,
  reservationWithExtendedVisitsSchema
} from '~/schemas/api/reservation';
import { basicError } from '~/schemas/common';
import type { ReservationCreationData } from '~/schemas/forms/orderService';

import { handleFetchingData } from './handleFetchingData';

export const createReservation = async (data: ReservationCreationData) => {
  return await handleFetchingData({
    path: '/reservations',
    method: 'post',
    successSchema: reservationSchema as ZodType<Reservation>,
    errorSchema: basicError,
    data
  });
};

export const getReservationByName = async (name: string) => {
  return await handleFetchingData({
    path: `/reservations/${name}`,
    method: 'get',
    successSchema:
      reservationWithExtendedVisitsSchema as unknown as ZodType<ReservationWithExtendedVisits>,
    errorSchema: basicError,
    params: {
      includeVisits: true,
      includeServices: true,
      includeAddress: true
    }
  });
};

export const getAllReservations = async () => {
  return await handleFetchingData({
    path: '/reservations',
    method: 'get',
    successSchema: reservationSchema.array() as ZodType<Reservation[]>,
    errorSchema: basicError
  });
};

export const confirmReservation = async (
  reservationName: string,
  employeeId: number
) => {
  return await handleFetchingData({
    path: `/reservations/${reservationName}/confirm`,
    method: 'put',
    successSchema: reservationSchema as unknown as ZodType<Reservation>,
    errorSchema: basicError,
    data: { employeeId }
  });
};

export const cancelReservation = async (reservationName: string) => {
  return await handleFetchingData({
    path: `/reservations/${reservationName}/cancel`,
    method: 'put',
    successSchema:
      reservationWithExtendedVisitsSchema as unknown as ZodType<ReservationWithExtendedVisits>,
    errorSchema: basicError
  });
};
