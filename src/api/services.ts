import { handleFetchingData } from './utils';
import { primaryServices, services, service } from './schemas/services';
import { basicError } from './schemas/common';
import type { AllServicesQueryOptions } from './types';

// /services?primaryOnly=true
export const getAllServices = async (options?: AllServicesQueryOptions) => {
  const primaryOnly = options?.primaryOnly ?? false;
  const queryString = primaryOnly ? '?primaryOnly=true' : '';

  return await handleFetchingData({
    path: `/services${queryString}`,
    method: 'get',
    successSchema: primaryOnly ? primaryServices : services,
    errorSchema: basicError
  });
};

export const getServiceById = async (id: string) => {
  return await handleFetchingData({
    path: `/services/${id}`,
    method: 'get',
    successSchema: service,
    errorSchema: basicError
  });
};
