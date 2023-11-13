import { createReservationTitleForEmployee } from '~/utils/reservationUtils';

import type { Reservation } from '~/schemas/api/reservation';

import SectionWithButton from './SectionWithButton';
import { ReservationDetailsDialog } from '../dialogs';
import { useState } from 'react';

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
        data={data}
      />
    </>
  );
};

export default ReservationToBeConfirmedField;
