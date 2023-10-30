import type { ZodType } from 'zod';

import {
  primaryServices,
  services,
  service,
  type PrimaryService,
  type Service
} from '~/schemas/api/services';
import { basicError } from '~/schemas/api/common';

import { handleFetchingData } from './handleFetchingData';
import type { AllServicesQueryOptions, ServiceQueryOptions } from './types';

export const getAllServices = async (options?: AllServicesQueryOptions) => {
  const primaryOnly = options?.primaryOnly ?? false;

  return await handleFetchingData({
    path: `/services`,
    method: 'get',
    successSchema: primaryOnly
      ? (primaryServices as ZodType<PrimaryService[]>)
      : (services as ZodType<Service[]>),
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
    successSchema: service as ZodType<Service>,
    errorSchema: basicError,
    params: options
  });
};
