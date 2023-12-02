import { useState } from 'react';

import type {
  EmployeeReservation,
  Reservation
} from '~/schemas/api/reservation';

import { SectionWithButton } from '~/components/organisms/button-fields';

import {
  createReservationTitleForEmployee,
  getMainServiceForReservation
} from '~/utils/reservationUtils';

import { ReservationDetailsDialog } from '../dialogs';
import ListWrapper from '../wrappers/ListWrapper';

interface ReservationToConfirmListProps {
  data: EmployeeReservation[];
}

const ReservationToConfirmList = ({ data }: ReservationToConfirmListProps) => {
  const [currentData, setCurrentData] = useState<Reservation | null>(null);

  return (
    <>
      {data.length > 0 && (
        <ListWrapper
          component="h2"
          contentWrapperClasses="flex w-full flex-col space-y-4 pt-8"
          title="Awaiting reservations"
        >
          {data.map((reservation) => (
            <SectionWithButton
              buttonProps={{
                onClick: () => setCurrentData(reservation),
                content: 'Manage'
              }}
              label={createReservationTitleForEmployee(
                reservation,
                getMainServiceForReservation(reservation)
              )}
              key={`ReservationToConfirmField-${reservation.id}`}
            />
          ))}
        </ListWrapper>
      )}
      {currentData && (
        <ReservationDetailsDialog
          isOpen={currentData !== null}
          onClose={() => setCurrentData(null)}
          reservationName={currentData.name}
        />
      )}
    </>
  );
};

export default ReservationToConfirmList;
