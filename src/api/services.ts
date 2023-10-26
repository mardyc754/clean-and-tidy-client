import { handleFetchingData } from './utils';
import { primaryServices, services, service } from './schemas/services';
import { basicError } from './schemas/common';
import type { AllServicesQueryOptions, ServiceQueryOptions } from './types';

// /services?primaryOnly=true
export const getAllServices = async (options?: AllServicesQueryOptions) => {
  const primaryOnly = options?.primaryOnly ?? false;

  return await handleFetchingData({
    path: `/services`,
    method: 'get',
    successSchema: primaryOnly ? primaryServices : services,
    errorSchema: basicError,
    params: options
  });
};

export const getServiceById = async (
  id: string,
  options?: ServiceQueryOptions
) => {
  return await handleFetchingData({
    path: `/services/${id}`,
    method: 'get',
    successSchema: service,
    errorSchema: basicError,
    params: options
  });
};
