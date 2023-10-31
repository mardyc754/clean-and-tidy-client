import type { RecurringReservationWithReservations } from '~/schemas/api/reservation';
import { LabeledTypographyList } from '../layout';
import { Heading2 } from '~/components/atoms/typography/headings';
import {
  frequencyToDescriptionMap,
  reservationStatusMap
} from '~/constants/mappings';

interface ReservationDetailsProps {
  data: RecurringReservationWithReservations;
}

const ReservationDetails = ({ data }: ReservationDetailsProps) => {
  const reservationDetailsData = new Map([
    ['Name', data.name],
    // ['Start date', data.startDate],
    ['End date', data.endDate],
    ['Frequency', frequencyToDescriptionMap.get(data.frequency)],
    ['Number of visits', `${data.reservations?.length ?? 0}`],
    ['Status', reservationStatusMap.get(data.status)]
  ]);
  return (
    <>
      <Heading2>Reservation details</Heading2>
      <LabeledTypographyList
        name="ReservationDetails"
        data={reservationDetailsData}
      />
    </>
  );
};

export default ReservationDetails;
