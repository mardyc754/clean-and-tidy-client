import type { ZodType } from 'zod';

import { basicError } from '~/schemas/api/common';
import { visitListSchema, type Visit } from '~/schemas/api/reservation';

import { handleFetchingData } from './handleFetchingData';

export const getEmployeeVisits = async (employeeId: number) => {
  return await handleFetchingData({
    path: `/employees/${employeeId}/visits`,
    method: 'get',
    successSchema: visitListSchema as unknown as ZodType<Visit[]>,
    errorSchema: basicError
  });
};
