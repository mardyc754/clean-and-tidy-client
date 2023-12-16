import type { ReservationWithExtendedVisits } from '~/schemas/api/reservation';

import { Button } from '~/components/atoms/buttons';

import CancelReservationButton from '../dialogs/CancelReservationButton';
import { ListWrapper } from '../wrappers';

interface ReservationActionsProps {
  data: ReservationWithExtendedVisits;
}

const ReservationActions = ({ data }: ReservationActionsProps) => {
  return (
    <ListWrapper title="Actions">
      <div className="flex space-x-4 pt-4">
        {/* TODO */}
        {/* <Button>Change reservation general data</Button> */}
        <CancelReservationButton reservationName={data.name} />
      </div>
    </ListWrapper>
  );
};

export default ReservationActions;
