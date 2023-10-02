import {
  registrationSuccessDataSchema,
  registrationErrorDataSchema
} from './schemas/auth';
import { handleFetchingData } from './utils';

type RegistrationData = {
  username: string;
  password: string;
  email: string;
};

export const register = async (data: RegistrationData) => {
  return await handleFetchingData({
    path: '/auth/register',
    method: 'post',
    successSchema: registrationSuccessDataSchema,
    errorSchema: registrationErrorDataSchema,
    data
  });
};
