import { ZodError, type ZodType } from 'zod';

import { AxiosError, type AxiosResponse, type AxiosRequestConfig } from 'axios';

import { fetcher } from '~/lib/axios';
import type { BackendBasicErrorData } from '~/schemas/api/common';
import { ResponseError } from './errors/ResponseError';

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
    throw err;
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
  let responseData = { message: 'Connection error', hasError: true } as
    | SuccessData
    | (ErrorData & { hasError: true });
  // return Promise.resolve(responseData);
  return await fetcher<
    AxiosRequestConfig<InputData>,
    AxiosResponse<SuccessData>
  >({
    method,
    url: path,
    data,
    withCredentials: true,
    params
  })
    .then((res) => {
      responseData = successSchema.parse(res.data);
      return responseData;
    })
    .catch((err) => {
      if (err instanceof AxiosError) {
        responseData = {
          ...errorSchema.parse(err.response?.data),
          hasError: true
        } as ErrorData & { hasError: true };
        throw new ResponseError(responseData.message!, responseData);
      }

      responseData = handleTypeErrors(err, 'Type error of received data') as
        | SuccessData
        | (ErrorData & { hasError: true });

      throw new ResponseError(
        (responseData as ErrorData & { hasError: true }).message,
        responseData
      );
    })
    .catch((err) => {
      responseData = handleTypeErrors(
        err,
        'Type error of received error data'
      ) as SuccessData | (ErrorData & { hasError: true });
      throw new ResponseError('Unexpected error occured', responseData);
    });
}

export function hasError<ErrorData extends ErrorResponseData>(
  data: Record<string, unknown> | null | undefined
): data is ErrorData & { hasError: true } {
  return (
    !!data && !Array.isArray(data) && 'hasError' in data && !!data.hasError
  );
}
