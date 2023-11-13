import type { ZodType } from 'zod';

import { basicError } from '~/schemas/api/common';
import {
  visitWithReservationListSchema,
  reservationListSchema,
  type VisitWithReservation,
  type Reservation
} from '~/schemas/api/reservation';

import type { Status } from '~/types/enums';

import { handleFetchingData } from './handleFetchingData';

type EmployeeReservationQueryOptions = {
  status: Status;
};

export const getEmployeeVisits = async (employeeId: number) => {
  return await handleFetchingData({
    path: `/employees/${employeeId}/visits`,
    method: 'get',
    successSchema: visitWithReservationListSchema as unknown as ZodType<
      VisitWithReservation[]
    >,
    errorSchema: basicError
  });
};

export const getEmployeeReservations = async (
  employeeId: number,
  options?: EmployeeReservationQueryOptions
) => {
  return await handleFetchingData({
    path: `/employees/${employeeId}/reservations`,
    method: 'get',
    successSchema: reservationListSchema as ZodType<Reservation[]>,
    errorSchema: basicError,
    params: options
  });
};