import { createReservationTitle } from '~/utils/reservationUtils';

import type { Reservation } from '~/schemas/api/reservation';

import SectionWithButton from './SectionWithButton';

interface ReservationDetailsProps {
  data: Reservation;
}

const ReservationField = ({ data }: ReservationDetailsProps) => {
  return (
    <SectionWithButton
      label={createReservationTitle(data)}
      buttonProps={{ href: `/reservations/${data.name}`, content: 'Manage' }}
    />
  );
};

export default ReservationField;
