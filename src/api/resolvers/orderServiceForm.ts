import { zodResolver } from '@hookform/resolvers/zod';

import {
  contactDetailsForm,
  orderServiceSubmitDataSchema
} from '../schemas/reservation';

export const cleaningDetailsResolver = zodResolver(
  orderServiceSubmitDataSchema
);

export const contactDetailsResolver = zodResolver(contactDetailsForm);
