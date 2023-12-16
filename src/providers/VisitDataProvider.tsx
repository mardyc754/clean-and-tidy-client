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
  reservationData: Omit<
    ReservationWithExtendedVisits,
    'visits' | 'services'
  > | null;
}>({
  visitData: null,
  reservationData: null
});

const VisitDataProvicder = ({ children }: VisitDataProviderProps) => {
  const [visitData, setVisitData] = useState(null);

  return (
    <VisitDataContext.Provider value={{ visitData, reservationData: null }}>
      {children}
    </VisitDataContext.Provider>
  );
};
