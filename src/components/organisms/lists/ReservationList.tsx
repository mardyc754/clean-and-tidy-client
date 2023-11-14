import type { Reservation } from '~/schemas/api/reservation';
import { ReservationField } from '~/components/organisms/button-fields';

import ListWrapper from '../wrappers/ListWrapper';

interface ReservationListProps {
  data: Reservation[];
}

const ReservationList = ({ data }: ReservationListProps) => {
  return (
    <ListWrapper
      component="h2"
      contentWrapperClasses="flex w-full flex-col space-y-4 pt-8"
      title="Your reservations"
    >
      {data.map((reservation) => (
        <ReservationField
          data={reservation}
          key={`Reservation-${reservation.id}`}
        />
      ))}
    </ListWrapper>
  );
};

export default ReservationList;
