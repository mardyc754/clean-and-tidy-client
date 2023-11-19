import {
  loginError,
  loginSuccess,
  logoutSuccess,
  registrationError,
  registrationSuccess,
  userSchema
} from '~/schemas/api/auth';
import { basicError } from '~/schemas/common';
import type { LoginData, RegistrationData } from '~/schemas/forms/auth';

import { handleFetchingData } from './handleFetchingData';

export const register = async (
  data: Omit<RegistrationData, 'confirmPassword'>
) => {
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

export const getCurrentUser = async () => {
  return await handleFetchingData({
    path: '/auth/user',
    method: 'get',
    successSchema: userSchema,
    errorSchema: basicError
  });
};

export const logout = async () => {
  return await handleFetchingData({
    path: '/auth/logout',
    method: 'post',
    successSchema: logoutSuccess,
    errorSchema: basicError
  });
};
