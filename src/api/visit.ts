import type { ZodType } from 'zod';

import { basicError } from '~/schemas/api/common';
import { type Visit, visitSchema } from '~/schemas/api/reservation';

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
