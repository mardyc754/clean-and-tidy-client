import type { ZodType } from 'zod';

import {
  Visit,
  type VisitPartWithVisitData,
  VisitWithEmployees,
  visitPartWithVisitData,
  visitSchemaWithEmployees
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

export const changeVisitData = async (
  visitId: Visit['id'],
  newStartDate: string
) => {
  return await handleFetchingData({
    path: `/visits/${visitId}`,
    method: 'put',
    successSchema:
      visitSchemaWithEmployees as unknown as ZodType<VisitWithEmployees>,
    errorSchema: basicError,
    data: { startDate: newStartDate }
  });
};
