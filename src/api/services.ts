import { Stringified } from 'type-fest';
import type { ZodType } from 'zod';

import {
  type PrimaryService,
  type Service,
  type ServiceWithBusyHours,
  type ServiceWithEmployees,
  primaryServices,
  service,
  serviceWithBusyHours,
  serviceWithEmployees,
  services
} from '~/schemas/api/services';
import { basicError } from '~/schemas/common';

import { handleFetchingData } from './handleFetchingData';
import type {
  AllServicesQueryOptions,
  ServiceBusyHoursQueryOptions
} from './types';

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

export const getAllServicesWithEmployees = async () => {
  return await handleFetchingData({
    path: `/services`,
    method: 'get',
    successSchema: serviceWithEmployees.array() as ZodType<
      ServiceWithEmployees[]
    >,
    errorSchema: basicError,
    params: { includeEmployees: true }
  });
};

export const getServiceById = async (id: string) => {
  return await handleFetchingData({
    path: `/services/${id}`,
    method: 'get',
    successSchema: service as ZodType<Service>,
    errorSchema: basicError,
    params: {
      includeSecondaryServices: true,
      includeCleaningFrequencies: true
    }
  });
};

export const getServiceByIdWithEmployees = async (id: string) => {
  return await handleFetchingData({
    path: `/services/${id}`,
    method: 'get',
    successSchema: serviceWithEmployees as ZodType<ServiceWithEmployees>,
    errorSchema: basicError,
    params: {
      includeSecondaryServices: true,
      includeCleaningFrequencies: true,
      includeEmployee: true
    }
  });
};

export const getServicesBusyHours = async (
  params?: ServiceBusyHoursQueryOptions
) => {
  let parsedParams: Stringified<ServiceBusyHoursQueryOptions> | undefined =
    undefined;

  if (params) {
    parsedParams = {
      from: params.from,
      to: params.to,
      step: params.step as string | undefined,
      serviceIds: params.serviceIds?.join(',')
    };
  }

  return await handleFetchingData({
    path: `/services/busy-hours`,
    method: 'get',
    successSchema: serviceWithBusyHours.array() as ZodType<
      ServiceWithBusyHours[]
    >,
    errorSchema: basicError,
    params: parsedParams
  });
};
