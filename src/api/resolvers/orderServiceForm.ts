import { zodResolver } from '@hookform/resolvers/zod';
import { orderServiceSubmitDataSchema } from '../schemas/reservation';

export const cleaningDetailsResolver = zodResolver(
  orderServiceSubmitDataSchema
);
