import type { ZodType } from 'zod';

import {
  type Visit,
  type VisitPart,
  type VisitPartWithVisitData,
  type VisitWithEmployees,
  visitPartWithVisitData,
  visitSchemaWithEmployees
} from '~/schemas/api/reservation';
import { basicError } from '~/schemas/common';

import { handleFetchingData } from './handleFetchingData';

export const getVisitById = async (id: VisitPart['id']) => {
  return await handleFetchingData({
    path: `/visits/${id}`,
    method: 'get',
    successSchema:
      visitSchemaWithEmployees as unknown as ZodType<VisitWithEmployees>,
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

export const cancelVisit = async (visitId: Visit['id']) => {
  return await handleFetchingData({
    path: `/visits/${visitId}/cancel`,
    method: 'put',
    successSchema:
      visitSchemaWithEmployees as unknown as ZodType<VisitWithEmployees>,
    errorSchema: basicError
  });
};

export const getVisitPartById = async (id: VisitPart['id']) => {
  return await handleFetchingData({
    path: `/visit-parts/${id}`,
    method: 'get',
    successSchema:
      visitPartWithVisitData as unknown as ZodType<VisitPartWithVisitData>,
    errorSchema: basicError,
    params: { includeEmployee: true }
  });
};
