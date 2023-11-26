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

// Example response:
// [
//   {
//       "visitId": 108,
//       "employeeId": 2,
//       "status": "TO_BE_CONFIRMED",
//       "visit": {
//           "id": 108,
//           "name": "reservation-uEan3YEAuLvFs1T5ZvTeXL-1",
//           "startDate": "2023-11-28T09:00:00.000Z",
//           "endDate": "2023-11-28T13:30:00.000Z",
//           "includeDetergents": false,
//           "cost": "225",
//           "reservationId": 18,
//           "reservation": {
//               "id": 18,
//               "name": "reservation-uEan3YEAuLvFs1T5ZvTeXL",
//               "frequency": "ONCE",
//               "endDate": "2023-11-28T13:30:00.000Z",
//               "weekDay": 2,
//               "status": "TO_BE_CONFIRMED",
//               "bookerEmail": "test@example.com",
//               "addressId": 18,
//               "bookerFirstName": "Jan",
//               "bookerLastName": "Testowy",
//               "extraInfo": null,
//               "services": [
//                   {
//                       "reservationId": 18,
//                       "serviceId": 1,
//                       "isMainServiceForReservation": true,
//                       "numberOfUnits": 45,
//                       "service": {
//                           "id": 1,
//                           "name": "Home Cleaning",
//                           "unitId": 1,
//                           "isPrimary": true,
//                           "minNumberOfUnitsIfPrimary": 30,
//                           "minCostIfPrimary": null,
//                           "unit": {
//                               "id": 1,
//                               "shortName": "m2",
//                               "fullName": "Area size (in m2)",
//                               "price": "5",
//                               "duration": 6
//                           }
//                       }
//                   }
//               ]
//           }
//       }
//   },
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

// Example response:
// [
//   {
//       "id": 18,
//       "name": "reservation-uEan3YEAuLvFs1T5ZvTeXL",
//       "frequency": "ONCE",
//       "endDate": "2023-11-28T13:30:00.000Z",
//       "weekDay": 2,
//       "status": "TO_BE_CONFIRMED",
//       "bookerEmail": "test@example.com",
//       "addressId": 18,
//       "bookerFirstName": "Jan",
//       "bookerLastName": "Testowy",
//       "extraInfo": null,
//       "services": [
//           {
//               "reservationId": 18,
//               "serviceId": 1,
//               "isMainServiceForReservation": true,
//               "numberOfUnits": 45,
//               "service": {
//                   "id": 1,
//                   "name": "Home Cleaning",
//                   "unitId": 1,
//                   "isPrimary": true,
//                   "minNumberOfUnitsIfPrimary": 30,
//                   "minCostIfPrimary": null,
//                   "unit": {
//                       "id": 1,
//                       "shortName": "m2",
//                       "fullName": "Area size (in m2)",
//                       "price": "5",
//                       "duration": 6
//                   }
//               }
//           }
//       ],
//       "visits": [
//           {
//               "id": 108,
//               "name": "reservation-uEan3YEAuLvFs1T5ZvTeXL-1",
//               "startDate": "2023-11-28T09:00:00.000Z",
//               "endDate": "2023-11-28T13:30:00.000Z",
//               "includeDetergents": false,
//               "cost": "225",
//               "reservationId": 18
//           }
//       ]
//   },
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

// Example response:
// [
//   {
//       "id": 1,
//       "firstName": "Admin",
//       "lastName": "User",
//       "email": "admin@testmail.com",
//       "startHour": "1970-01-01T06:00:00.000Z",
//       "endHour": "1970-01-01T14:00:00.000Z",
//       "isAdmin": true,
//       "visits": []
//   },
//   {
//       "id": 2,
//       "firstName": "Rusty",
//       "lastName": "Simonis",
//       "email": "Rusty.Simonis@hotmail.com",
//       "startHour": "1970-01-01T06:00:00.000Z",
//       "endHour": "1970-01-01T14:00:00.000Z",
//       "isAdmin": false,
//       "visits": [
//           {
//               "visitId": 108,
//               "employeeId": 2,
//               "status": "TO_BE_CONFIRMED",
//               "visit": {
//                   "id": 108,
//                   "name": "reservation-uEan3YEAuLvFs1T5ZvTeXL-1",
//                   "startDate": "2023-11-28T09:00:00.000Z",
//                   "endDate": "2023-11-28T13:30:00.000Z",
//                   "includeDetergents": false,
//                   "cost": "225",
//                   "reservationId": 18,
//                   "reservation": {
//                       "id": 18,
//                       "name": "reservation-uEan3YEAuLvFs1T5ZvTeXL",
//                       "frequency": "ONCE",
//                       "endDate": "2023-11-28T13:30:00.000Z",
//                       "weekDay": 2,
//                       "status": "TO_BE_CONFIRMED",
//                       "bookerEmail": "test@example.com",
//                       "addressId": 18,
//                       "bookerFirstName": "Jan",
//                       "bookerLastName": "Testowy",
//                       "extraInfo": null,
//                       "services": [
//                           {
//                               "reservationId": 18,
//                               "serviceId": 1,
//                               "isMainServiceForReservation": true,
//                               "numberOfUnits": 45,
//                               "service": {
//                                   "id": 1,
//                                   "name": "Home Cleaning",
//                                   "unitId": 1,
//                                   "isPrimary": true,
//                                   "minNumberOfUnitsIfPrimary": 30,
//                                   "minCostIfPrimary": null,
//                                   "unit": {
//                                       "id": 1,
//                                       "shortName": "m2",
//                                       "fullName": "Area size (in m2)",
//                                       "price": "5",
//                                       "duration": 6
//                                   }
//                               }
//                           }
//                       ]
//                   }
//               }
//           },
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
