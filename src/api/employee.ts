import type { RequireAtLeastOne } from 'type-fest';
import type { ZodType } from 'zod';

import {
  type Employee,
  employeeSchema,
  employeeWithWorkingHoursSchema
} from '~/schemas/api/employee';
import {
  type EmployeeReservation,
  type EmployeeWithVisits,
  type VisitPartWithServiceAndReservation,
  employeeReservationsSchema,
  employeeWithVisitsSchema,
  visitPartWithServiceAndReservation
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
      visitPartWithServiceAndReservation.array() as unknown as ZodType<
        VisitPartWithServiceAndReservation[]
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
    successSchema: employeeReservationsSchema.array() as unknown as ZodType<
      EmployeeReservation[]
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

// Example response:
// [
//   {
//       "id": 2,
//       "firstName": "Rusty",
//       "lastName": "Simonis",
//       "email": "Rusty.Simonis@hotmail.com",
//       "startHour": "1970-01-01T06:00:00.000Z",
//       "endHour": "1970-01-01T14:00:00.000Z",
//       "isAdmin": false,
//       "workingHours": [
//           {
//               "start": "2023-11-23T08:00:00.000Z",
//               "end": "2023-11-23T13:00:00.000Z"
//           },
//           {
//               "start": "2023-11-24T09:00:00.000Z",
//               "end": "2023-11-24T15:00:00.000Z"
//           },
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
