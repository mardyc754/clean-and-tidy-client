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

// example request body
// {
//   "frequency": "EVERY_TWO_WEEKS",
//   "includeDetergents": false,
//   "visitParts": [
//       {
//           "serviceId": 1,
//           "employeeId": 2,
//           "numberOfUnits": 80,
//           "startDate": "2023-11-28T06:00:00.000Z",
//           "endDate": "2023-11-28T14:00:00.000Z",
//           "cost": 400
//       },
//       {
//           "serviceId": 8,
//           "employeeId": 2,
//           "numberOfUnits": 1,
//           "startDate": "2023-11-28T14:00:00.000Z",
//           "endDate": "2023-11-28T15:00:00.000Z",
//           "cost": 40
//       },
//       {
//           "serviceId": 9,
//           "employeeId": 2,
//           "numberOfUnits": 2,
//           "startDate": "2023-11-28T15:00:00.000Z",
//           "endDate": "2023-11-28T16:00:00.000Z",
//           "cost": 40
//       }
//   ],
//   "bookerEmail": "test@example.com",
//   "address": {
//       "street": "Testowa",
//       "houseNumber": "123",
//       "postCode": "12-345",
//       "city": "Testowo"
//   },
//   "contactDetails": {
//       "firstName": "Jan",
//       "lastName": "Testowy",
//       "email": "test@example.com",
//       "phone": "123456789"
//   },
//   "services": [
//       {
//           "serviceId": 1,
//           "isMainServiceForReservation": true
//       },
//       {
//           "serviceId": 8,
//           "isMainServiceForReservation": false
//       },
//       {
//           "serviceId": 9,
//           "isMainServiceForReservation": false
//       }
//   ],
//   "extraInfo": null
// }
// example response
// {
//   "id": 11,
//   "name": "reservation-bQ1ftTuBa1arH8Qk6c1YzG",
//   "frequency": "EVERY_TWO_WEEKS",
//   "endDate": "2024-11-28T16:00:00.000Z",
//   "weekDay": 4,
//   "status": "TO_BE_CONFIRMED",
//   "bookerEmail": "test@example.com",
//   "addressId": 15,
//   "bookerFirstName": "Jan",
//   "bookerLastName": "Testowy",
//   "extraInfo": null
// }
export const createReservation = async (data: ReservationCreationData) => {
  return await handleFetchingData({
    path: '/reservations',
    method: 'post',
    successSchema: reservationSchema as ZodType<Reservation>,
    errorSchema: basicError,
    data
  });
};

// Example response
// {
//   "id": 18,
//   "name": "reservation-uEan3YEAuLvFs1T5ZvTeXL",
//   "frequency": "ONCE",
//   "endDate": "2023-11-28T13:30:00.000Z",
//   "weekDay": 2,
//   "status": "TO_BE_CONFIRMED",
//   "bookerEmail": "test@example.com",
//   "addressId": 18,
//   "bookerFirstName": "Jan",
//   "bookerLastName": "Testowy",
//   "extraInfo": null,
//   "visits": [
//       {
//           "id": 108,
//           "name": "reservation-uEan3YEAuLvFs1T5ZvTeXL-1",
//           "startDate": "2023-11-28T09:00:00.000Z",
//           "endDate": "2023-11-28T13:30:00.000Z",
//           "includeDetergents": false,
//           "cost": "225",
//           "reservationId": 18,
//           "employees": [
//               {
//                   "status": "TO_BE_CONFIRMED",
//                   "employee": {
//                       "id": 2,
//                       "firstName": "Rusty",
//                       "lastName": "Simonis",
//                       "email": "Rusty.Simonis@hotmail.com",
//                       "startHour": "1970-01-01T06:00:00.000Z",
//                       "endHour": "1970-01-01T14:00:00.000Z",
//                       "isAdmin": false
//                   }
//               }
//           ]
//       }
//   ],
//   "services": [
//       {
//           "reservationId": 18,
//           "serviceId": 1,
//           "isMainServiceForReservation": true,
//           "numberOfUnits": 45,
//           "service": {
//               "id": 1,
//               "name": "Home Cleaning",
//               "unitId": 1,
//               "isPrimary": true,
//               "minNumberOfUnitsIfPrimary": 30,
//               "minCostIfPrimary": null,
//               "unit": {
//                   "id": 1,
//                   "shortName": "m2",
//                   "fullName": "Area size (in m2)",
//                   "price": "5",
//                   "duration": 6
//               }
//           }
//       }
//   ],
//   "address": {
//       "id": 18,
//       "street": "Testowa",
//       "houseNumber": "123",
//       "postCode": "12-345",
//       "city": "Testowo"
//   }
// }
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
