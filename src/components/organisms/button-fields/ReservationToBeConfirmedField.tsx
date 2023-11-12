import { createReservationTitle } from '~/utils/reservationUtils';

import type { Reservation } from '~/schemas/api/reservation';

import SectionWithButton from './SectionWithButton';

interface ReservationToBeConfirmedField {
  data: Reservation;
}

const ReservationToBeConfirmedField = ({
  data
}: ReservationToBeConfirmedField) => {
  return (
    <SectionWithButton
      label={createReservationTitle(data)}
      buttonProps={{ href: `/reservations/${data.name}`, content: 'Manage' }}
    />
  );
};

export default ReservationToBeConfirmedField;
