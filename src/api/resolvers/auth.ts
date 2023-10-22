import { zodResolver } from '@hookform/resolvers/zod';

import { loginDataValidator, registrationDataValidator } from '../schemas/auth';

export const loginDataResolver = zodResolver(loginDataValidator);

export const registrationDataResolver = zodResolver(registrationDataValidator);
