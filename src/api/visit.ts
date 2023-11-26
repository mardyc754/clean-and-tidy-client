import type { ZodType } from 'zod';

import {
  type VisitPartWithVisitData,
  visitPartWithVisitData
} from '~/schemas/api/reservation';
import { basicError } from '~/schemas/common';

import { handleFetchingData } from './handleFetchingData';

export const getVisitById = async (id: number) => {
  return await handleFetchingData({
    path: `/visits/${id}`,
    method: 'get',
    successSchema:
      visitPartWithVisitData as unknown as ZodType<VisitPartWithVisitData>,
    errorSchema: basicError
  });
};

export const getVisitByIdWithEmployees = async (id: number) => {
  return await handleFetchingData({
    path: `/visits/${id}`,
    method: 'get',
    successSchema:
      visitPartWithVisitData as unknown as ZodType<VisitPartWithVisitData>,
    errorSchema: basicError,
    params: { includeEmployee: true }
  });
};
