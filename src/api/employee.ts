import type { ZodType } from 'zod';

import { basicError } from '~/schemas/api/common';
import {
  type VisitWithReservation,
  visitWithReservationListSchema
} from '~/schemas/api/reservation';

import { handleFetchingData } from './handleFetchingData';

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
