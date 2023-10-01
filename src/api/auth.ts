import { AxiosError, type AxiosResponse, type AxiosRequestConfig } from 'axios';

import { fetcher } from '~/lib/axios';

import type {
  RegistrationSuccessData,
  RegistrationErrorData
} from './schemas/auth';

type RegistrationData = {
  username: string;
  password: string;
  email: string;
};

export const register = async ({
  username,
  email,
  password
}: RegistrationData) => {
  let data: RegistrationSuccessData | RegistrationErrorData = {
    message: 'Connection error'
  };

  await fetcher
    .post<
      AxiosRequestConfig<RegistrationData>,
      AxiosResponse<RegistrationSuccessData>
    >('/auth/register', {
      username,
      email,
      password
    })
    .then((res) => {
      data = res.data;
    })
    .catch((err) => {
      if (err instanceof AxiosError) {
        data = err.response?.data as RegistrationErrorData;
      } else {
        data = { message: 'An unexpected error ocurred' };
      }
    });
  return data;
};
