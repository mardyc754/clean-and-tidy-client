import { createContext, useState } from 'react';

import type { VisitWithEmployees } from '~/schemas/api/reservation';

type VisitDataProviderProps = {
  children: React.ReactNode;
};

export const VisitDataContext = createContext<{
  visitData: VisitWithEmployees | null;
}>({
  visitData: null
});

const VisitDataProvicder = ({ children }: VisitDataProviderProps) => {
  const [visitData, setVisitData] = useState(null);

  return (
    <VisitDataContext.Provider value={{ visitData }}>
      {children}
    </VisitDataContext.Provider>
  );
};
