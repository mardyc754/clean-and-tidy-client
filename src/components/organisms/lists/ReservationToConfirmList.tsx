import type { Reservation } from '~/schemas/api/reservation';
import { ReservationToConfirmField } from '~/components/organisms/button-fields';

import ListWrapper from '../wrappers/ListWrapper';

interface ReservationToConfirmListProps {
  data: Reservation[];
}

const ReservationToConfirmList = ({ data }: ReservationToConfirmListProps) => {
  return (
    <ListWrapper
      component="h2"
      contentWrapperClasses="flex w-full flex-col space-y-4 pt-8"
      title="Awaiting reservations"
    >
      {data.map((reservation) => (
        <ReservationToConfirmField
          data={reservation}
          key={`ReservationToConfirmField-${reservation.id}`}
        />
      ))}
    </ListWrapper>
  );
};

export default ReservationToConfirmList;
