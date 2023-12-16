import {
  type AuthenticatedUser,
  loginError,
  loginSuccess,
  logoutSuccess,
  registrationError,
  registrationSuccess,
  userSchema
} from '~/schemas/api/auth';
import { basicError } from '~/schemas/common';
import type { LoginData, RegistrationData } from '~/schemas/forms/auth';
import type { ChangeUserData } from '~/schemas/forms/userProfile';

import { UserRole } from '~/types/enums';

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

export const changeUserData = async (
  userId: AuthenticatedUser['id'],
  data: ChangeUserData,
  role: AuthenticatedUser['role']
) => {
  let path: string | undefined;

  switch (role) {
    case UserRole.CLIENT:
      path = `/clients/${userId}`;
      break;
    case UserRole.EMPLOYEE:
    case UserRole.ADMIN:
      path = `/employees/${userId}`;
      break;
    default:
      // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
      throw new Error(`Unhandled role: ${role}`);
  }

  return await handleFetchingData({
    path,
    method: 'put',
    successSchema: userSchema,
    errorSchema: basicError,
    data
  });
};
