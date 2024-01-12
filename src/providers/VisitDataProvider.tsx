import { createContext } from 'react';

import type {
  ReservationWithExtendedVisits,
  VisitWithEmployees
} from '~/schemas/api/reservation';

export const VisitDataContext = createContext<{
  visitData: VisitWithEmployees | null;
  reservationName: ReservationWithExtendedVisits['name'] | null;
}>({
  visitData: null,
  reservationName: null
});
