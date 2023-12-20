import type { RequireAtLeastOne, Stringified } from 'type-fest';
import type { ZodType } from 'zod';

import { type Employee, employeeSchema } from '~/schemas/api/employee';
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
import {
  type CreateEmployeeData,
  createEmployeeErrorSchema
} from '~/schemas/forms/admin';
import { busyHoursData } from '~/schemas/forms/orderService';

import type { Status } from '~/types/enums';

import { handleFetchingData } from './handleFetchingData';
import type { EmployeeBusyHoursQueryOptions } from './types';

type EmployeeReservationQueryOptions = {
  status: Status;
};

// type EmployeeWorkingHoursQueryOptions = {
//   from: string;
//   to: string;
// };

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

export const getEmployeesBusyHours = async (
  params?: EmployeeBusyHoursQueryOptions
) => {
  let parsedParams: Stringified<EmployeeBusyHoursQueryOptions> | undefined =
    undefined;

  if (params) {
    parsedParams = {
      ...params,
      frequency: params.frequency as string | undefined,
      visitIds: params.visitIds?.join(',')
    };
  }

  return await handleFetchingData({
    path: `/employees/busy-hours`,
    method: 'get',
    successSchema: busyHoursData,
    errorSchema: basicError,
    params: parsedParams
  });
};

export const createEmployee = async (data: CreateEmployeeData) => {
  return await handleFetchingData({
    path: '/employees',
    method: 'post',
    successSchema: employeeSchema,
    errorSchema: createEmployeeErrorSchema,
    data: {
      ...data,
      services: Object.entries(data.services)
        .filter(([, value]) => value)
        .map(([key]) => parseInt(key))
    }
  });
};
