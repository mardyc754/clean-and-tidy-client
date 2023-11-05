import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

const findReservationSchema = z.object({
  reservationName: z
    .string()
    .nonempty({ message: 'Reservation name is required' })
});

export type FindReservationData = z.infer<typeof findReservationSchema>;

export const findReservationResolver = zodResolver(findReservationSchema);
