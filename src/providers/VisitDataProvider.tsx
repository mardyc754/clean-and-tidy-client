import { createContext, useState } from 'react';

import type {
  ReservationWithExtendedVisits,
  VisitWithEmployees
} from '~/schemas/api/reservation';

type VisitDataProviderProps = {
  children: React.ReactNode;
};

export const VisitDataContext = createContext<{
  visitData: VisitWithEmployees | null;
  reservationName: ReservationWithExtendedVisits['name'] | null;
}>({
  visitData: null,
  reservationName: null
});

const VisitDataProvicder = ({ children }: VisitDataProviderProps) => {
  const [visitData, setVisitData] = useState(null);

  return (
    <VisitDataContext.Provider value={{ visitData, reservationName: null }}>
      {children}
    </VisitDataContext.Provider>
  );
};
