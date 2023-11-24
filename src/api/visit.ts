import type { ZodType } from 'zod';

import {
  type Visit,
  type VisitWithEmployees,
  visitSchema
} from '~/schemas/api/reservation';
import { basicError } from '~/schemas/common';

import { handleFetchingData } from './handleFetchingData';

export const getVisitById = async (id: number) => {
  return await handleFetchingData({
    path: `/visits/${id}`,
    method: 'get',
    successSchema: visitSchema as unknown as ZodType<Visit>,
    errorSchema: basicError
  });
};

export const getVisitByIdWithEmployees = async (id: number) => {
  return await handleFetchingData({
    path: `/visits/${id}`,
    method: 'get',
    successSchema: visitSchema as unknown as ZodType<VisitWithEmployees>,
    errorSchema: basicError,
    params: { includeEmployees: true }
  });
};
