import { zodResolver } from '@hookform/resolvers/zod';

import {
  contactDetails,
  orderServiceSubmitDataSchema
} from '../schemas/reservation';

export const cleaningDetailsResolver = zodResolver(
  orderServiceSubmitDataSchema
);

export const contactDetailsResolver = zodResolver(contactDetails);
