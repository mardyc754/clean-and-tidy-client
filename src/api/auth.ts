import {
  registrationSuccess,
  registrationError,
  loginClientSuccess,
  loginClientError
} from './schemas/auth';
import { handleFetchingData } from './utils';

type RegistrationData = {
  username: string;
  password: string;
  email: string;
};

type LoginData = {
  email: string;
  password: string;
};

export const register = async (data: RegistrationData) => {
  return await handleFetchingData({
    path: '/auth/register',
    method: 'post',
    successSchema: registrationSuccess,
    errorSchema: registrationError,
    data
  });
};

export const loginClient = async (data: LoginData) => {
  return await handleFetchingData({
    path: '/auth/login-client',
    method: 'post',
    successSchema: loginClientSuccess,
    errorSchema: loginClientError,
    data
  });
};
