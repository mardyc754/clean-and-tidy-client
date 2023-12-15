import { createContext, useEffect, useState } from 'react';

import type {
  ReservationWithExtendedVisits,
  VisitPart,
  VisitWithEmployees
} from '~/schemas/api/reservation';

import { mergeDayDateAndHourDate } from '~/utils/dateUtils';

import type { CleaningFrequencyData, ValidDate } from '~/types/forms';

type VisitDataProviderProps = {
  children: React.ReactNode;
  visitData: VisitWithEmployees;
  reservationData: ReservationWithExtendedVisits;
};

type ChangeVisitDateFormContextData = {
  startDate: ValidDate;
  hourDate: ValidDate;
  visitPartsData: VisitPart[];
};

export const ChangeVisitDateFormContext =
  createContext<ChangeVisitDateFormContextData>({
    // startDate: null,
    // hourDate: null,
    // visitPartsData: []
  });

export const ChangeVisitDateProvider = ({
  visitData,
  reservationData,
  children
}: VisitDataProviderProps) => {
  const [fullDate, setFullDate] = useState<
    Pick<ChangeVisitDateFormContextData, 'startDate' | 'hourDate'>
  >({
    startDate: null,
    hourDate: null
  });

  const [isReservationAvailable, setIsReservationAvailable] = useState(false);

  const getFullStartDate = () => {
    const { startDate, hourDate } = fullDate;
    return startDate && hourDate
      ? mergeDayDateAndHourDate(new Date(startDate), new Date(hourDate))
      : null;
  };

  // useEffect(() => {
  //   setIsReservationAvailable(
  //     ...fullDate,

  //   )
  // }, [fullDate])

  const onChangeStartDate = (value: ValidDate) => {
    setFullDate((prev) => ({ ...prev, startDate: value }));
  };

  return (
    <ChangeVisitDateFormContext.Provider value={{ visitData, reservationData }}>
      {children}
    </ChangeVisitDateFormContext.Provider>
  );
};
