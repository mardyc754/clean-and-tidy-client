import type { ZodType } from 'zod';

import { visitSchema, type Visit } from '~/schemas/api/reservation';

import { basicError } from '~/schemas/api/common';

import { handleFetchingData } from './handleFetchingData';

import type { VisitQueryOptions } from './types';

export const getVisitById = async (id: number, options?: VisitQueryOptions) => {
  return await handleFetchingData({
    path: `/visits/${id}`,
    method: 'get',
    successSchema: visitSchema as unknown as ZodType<Visit>,
    errorSchema: basicError,
    params: options
  });
};
