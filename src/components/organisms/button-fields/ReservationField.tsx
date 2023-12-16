import type {
  Reservation,
  ReservationWithVisits
} from '~/schemas/api/reservation';

import { createReservationTitle } from '~/utils/reservationUtils';

import SectionWithButton from './SectionWithButton';

interface ReservationDetailsProps {
  data: ReservationWithVisits;
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
