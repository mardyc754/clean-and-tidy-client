import {
  registrationSuccess,
  registrationError,
  loginSuccess as loginSuccess,
  loginError as loginError
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

export const login = async (data: LoginData) => {
  return await handleFetchingData({
    path: '/auth/login',
    method: 'post',
    successSchema: loginSuccess,
    errorSchema: loginError,
    data
  });
};
