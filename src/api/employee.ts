import type { RequireAtLeastOne } from 'type-fest';
import type { ZodType } from 'zod';

import {
  type Employee,
  employeeSchema,
  employeeWithWorkingHoursSchema
} from '~/schemas/api/employee';
import {
  type EmployeeWithVisits,
  type Reservation,
  ReservationWithServices,
  type VisitWithStatusAndReservation,
  employeeWithVisitsSchema,
  reservationWithExtendedVisitsSchema,
  reservationWithServicesSchema,
  visitWithStatusAndReservationSchema
} from '~/schemas/api/reservation';
import { type Service, service } from '~/schemas/api/services';
import { basicError } from '~/schemas/common';

import type { Status } from '~/types/enums';

import { handleFetchingData } from './handleFetchingData';

type EmployeeReservationQueryOptions = {
  status: Status;
};

type EmployeeWorkingHoursQueryOptions = {
  from: string;
  to: string;
};

export type AllEmployeesQueryOptions = RequireAtLeastOne<{
  includeVisits: boolean;
}>;

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
  params?: EmployeeReservationQueryOptions
) => {
  return await handleFetchingData({
    path: `/employees/${employeeId}/reservations`,
    method: 'get',
    successSchema: reservationWithServicesSchema.array() as unknown as ZodType<
      ReservationWithServices[]
    >,
    errorSchema: basicError,
    params
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

export const getAllEmployeesWithVisits = async () => {
  return await handleFetchingData({
    path: '/employees',
    method: 'get',
    successSchema: employeeWithVisitsSchema.array() as unknown as ZodType<
      EmployeeWithVisits[]
    >,
    errorSchema: basicError,
    params: { includeVisits: true }
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

export const getEmployeesWorkingHours = async (
  serviceId: Service['id'],
  params?: EmployeeWorkingHoursQueryOptions
) => {
  return await handleFetchingData({
    path: `/employees/services/${serviceId}/working-hours`,
    method: 'get',
    successSchema: employeeWithWorkingHoursSchema.array(),
    errorSchema: basicError,
    params
  });
};
