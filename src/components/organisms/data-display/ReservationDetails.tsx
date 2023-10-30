import type { RecurringReservationWithReservations } from '~/schemas/api/reservation';
import { LabeledTypographyList } from '../layout';

interface ReservationDetailsProps {
  data: RecurringReservationWithReservations;
}

const ReservationDetails = ({ data }: ReservationDetailsProps) => {
  const reservationDetailsData = new Map();
  return (
    <LabeledTypographyList
      name="ReservationDetails"
      data={reservationDetailsData}
    />
  );
};

export default ReservationDetails;
