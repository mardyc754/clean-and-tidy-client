import { ZodError, type ZodType } from 'zod';

import { AxiosError, type AxiosResponse, type AxiosRequestConfig } from 'axios';

import { fetcher } from '~/lib/axios';

import type { BackendBasicErrorData } from './schemas/common';

type ResponseRecord = Partial<Record<string, unknown>> & {
  message?: string;
};

type ResponseData = ResponseRecord | ResponseRecord[];

export type ErrorResponseData = BackendBasicErrorData;

type FetchingData<
  SuccessData extends ResponseData,
  ErrorData extends ErrorResponseData,
  InputData = Record<string, unknown>
> =
  | {
      path: string;
      method: 'get' | 'delete';
      successSchema: ZodType<SuccessData>;
      errorSchema: ZodType<ErrorData>;
      data?: undefined;
      params?: Record<string, unknown>;
    }
  | {
      path: string;
      method: 'post' | 'put';
      successSchema: ZodType<SuccessData>;
      errorSchema: ZodType<ErrorData>;
      data?: InputData;
      params?: Record<string, unknown>;
    };

function handleTypeErrors(err: unknown, typeErrorMessage: string) {
  if (err instanceof ZodError) {
    // eslint-disable-next-line no-console
    console.error(err);
    return { message: typeErrorMessage, hasError: true };
  } else {
    return { message: 'An unexpected error ocurred', hasError: true };
  }
}

export async function handleFetchingData<
  SuccessData extends ResponseData,
  ErrorData extends ErrorResponseData,
  InputData = Record<string, unknown>
>({
  path,
  method,
  successSchema,
  errorSchema,
  data,
  params
}: FetchingData<SuccessData, ErrorData, InputData>) {
  let responseData = { message: 'Connection error' } as SuccessData | ErrorData;

  await fetcher<AxiosRequestConfig<InputData>, AxiosResponse<SuccessData>>({
    method,
    url: path,
    data,
    withCredentials: true,
    params
  })
    .then((res) => {
      responseData = successSchema.parse(res.data);
    })
    .catch((err) => {
      if (err instanceof AxiosError) {
        responseData = {
          ...errorSchema.parse(err.response?.data),
          hasError: true
        } as ErrorData;
        return;
      }
      responseData = handleTypeErrors(err, 'Type error of received data') as
        | SuccessData
        | ErrorData;
    })
    .catch((err) => {
      responseData = handleTypeErrors(
        err,
        'Type error of received error data'
      ) as SuccessData | ErrorData;
    });

  return responseData;
}