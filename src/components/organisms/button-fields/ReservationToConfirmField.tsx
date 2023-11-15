import { useState } from 'react';

import type { Reservation } from '~/schemas/api/reservation';

import { createReservationTitleForEmployee } from '~/utils/reservationUtils';

import { ReservationDetailsDialog } from '../dialogs';
import SectionWithButton from './SectionWithButton';

interface ReservationToBeConfirmedField {
  data: Reservation;
}

const ReservationToBeConfirmedField = ({
  data
}: ReservationToBeConfirmedField) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <SectionWithButton
        label={createReservationTitleForEmployee(data)}
        buttonProps={{ onClick: () => setIsOpen(true), content: 'Manage' }}
      />
      <ReservationDetailsDialog
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        reservationName={data.name}
      />
    </>
  );
};

export default ReservationToBeConfirmedField;
