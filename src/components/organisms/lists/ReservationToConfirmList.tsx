import { useState } from 'react';

import type { Reservation } from '~/schemas/api/reservation';
import { SectionWithButton } from '~/components/organisms/button-fields';

import { createReservationTitleForEmployee } from '~/utils/reservationUtils';

import ListWrapper from '../wrappers/ListWrapper';
import { ReservationDetailsDialog } from '../dialogs';

interface ReservationToConfirmListProps {
  data: Reservation[];
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
              label={createReservationTitleForEmployee(reservation)}
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
