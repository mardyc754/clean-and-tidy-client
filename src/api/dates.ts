import { ZodType } from 'zod';

import { ISOString, basicError } from '~/schemas/common';

import { handleFetchingData } from './handleFetchingData';

export const getHolidayDates = async (year: number) => {
  return await handleFetchingData({
    path: `dates/holidays`,
    method: 'get',
    successSchema: ISOString.array(),
    errorSchema: basicError,
    params: { year }
  });
};
