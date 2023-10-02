import { ZodError, type ZodSchema } from 'zod';

import { AxiosError, type AxiosResponse, type AxiosRequestConfig } from 'axios';

import { fetcher } from '~/lib/axios';

function handleTypeErrors(err: unknown, typeErrorMessage: string) {
  if (err instanceof ZodError) {
    // eslint-disable-next-line no-console
    console.error(err);
    return { message: typeErrorMessage };
  } else {
    return { message: 'An unexpected error ocurred' };
  }
}

type FetchingData<
  SuccessData extends Partial<Record<string, unknown>> & {
    message: string;
  },
  ErrorData extends Partial<Record<string, unknown>> & {
    message: string;
  },
  InputData = Record<string, unknown>
> =
  | {
      path: string;
      method: 'get' | 'delete';
      successSchema: ZodSchema<SuccessData>;
      errorSchema: ZodSchema<ErrorData>;
      data?: undefined;
    }
  | {
      path: string;
      method: 'post' | 'put';
      successSchema: ZodSchema<SuccessData>;
      errorSchema: ZodSchema<ErrorData>;
      data?: InputData;
    };

export async function handleFetchingData<
  SuccessData extends Partial<Record<string, unknown>> & {
    message: string;
  },
  ErrorData extends Partial<Record<string, unknown>> & {
    message: string;
  },
  InputData = Record<string, unknown>
>({
  path,
  method,
  successSchema,
  errorSchema,
  data
}: FetchingData<SuccessData, ErrorData, InputData>) {
  let responseData = { message: 'Connection error' } as SuccessData | ErrorData;

  await fetcher[method]<
    AxiosRequestConfig<InputData>,
    AxiosResponse<SuccessData>
  >(path, data, { withCredentials: true })
    .then((res) => {
      responseData = successSchema.parse(res.data);
    })
    .catch((err) => {
      if (err instanceof AxiosError) {
        responseData = errorSchema.parse(err.response?.data as ErrorData);
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

export async function handlePostData<
  SuccessData extends Partial<Record<string, unknown>> & {
    message: string;
  },
  ErrorData extends Partial<Record<string, unknown>> & {
    message: string;
  },
  InputData = Record<string, unknown>
>(
  path: string,
  successSchema: ZodSchema<SuccessData>,
  errorSchema: ZodSchema<ErrorData>,
  data: InputData
) {
  let responseData = { message: 'Connection error' } as SuccessData | ErrorData;

  await fetcher
    .post<AxiosRequestConfig<InputData>, AxiosResponse<SuccessData>>(path, data)
    .then((res) => {
      responseData = successSchema.parse(res.data);
    })
    .catch((err) => {
      if (err instanceof AxiosError) {
        responseData = errorSchema.parse(err.response?.data as ErrorData);
        return;
      }
      handleTypeErrors(err, 'Type error of received data');
    })
    .catch((err) => {
      handleTypeErrors(err, 'Type error of received error data');
    });

  return responseData;
}

export async function handleGetData<
  SuccessData extends Partial<Record<string, unknown>> & {
    message: string;
  },
  ErrorData extends Partial<Record<string, unknown>> & {
    message: string;
  },
  InputData = Record<string, unknown>
>(
  path: string,
  successSchema: ZodSchema<SuccessData>,
  errorSchema: ZodSchema<ErrorData>
) {
  let responseData = { message: 'Connection error' } as SuccessData | ErrorData;

  await fetcher
    .get<AxiosRequestConfig<InputData>, AxiosResponse<SuccessData>>(path)
    .then((res) => {
      responseData = successSchema.parse(res.data);
    })
    .catch((err) => {
      if (err instanceof AxiosError) {
        responseData = errorSchema.parse(err.response?.data as ErrorData);
        return;
      }
      handleTypeErrors(err, 'Type error of received data');
    })
    .catch((err) => {
      handleTypeErrors(err, 'Type error of received error data');
    });

  return responseData;
}
