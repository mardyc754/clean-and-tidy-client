import type { ZodType } from 'zod';

import { Employee, employeeSchema } from '~/schemas/api/employee';
import {
  type Reservation,
  type VisitWithStatusAndReservation,
  reservationSchema,
  visitWithStatusAndReservationSchema
} from '~/schemas/api/reservation';
import { type Service, service } from '~/schemas/api/services';
import { basicError } from '~/schemas/common';

import type { Status } from '~/types/enums';

import { handleFetchingData } from './handleFetchingData';

type EmployeeReservationQueryOptions = {
  status: Status;
};

export const getEmployeeVisits = async (employeeId: number) => {
  return await handleFetchingData({
    path: `/employees/${employeeId}/visits`,
    method: 'get',
    successSchema:
      visitWithStatusAndReservationSchema.array() as unknown as ZodType<
        VisitWithStatusAndReservation[]
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
    successSchema: reservationSchema.array() as unknown as ZodType<
      Reservation[]
    >,
    errorSchema: basicError,
    params: options
  });
};

export const getAllEmployees = async () => {
  return await handleFetchingData({
    path: '/employees',
    method: 'get',
    successSchema: employeeSchema.array(),
    errorSchema: basicError
  });
};

export const changeEmployeeServiceAssignment = async (
  employeeId: Employee['id'],
  serviceIds: Array<Service['id']>
) => {
  return await handleFetchingData({
    path: `/employees/${employeeId}/services`,
    method: 'put',
    successSchema: service.array() as unknown as ZodType<Service[]>,
    errorSchema: basicError,
    data: { serviceIds }
  });
};
