import DialogBase from './DialogBase';
import { Button } from '~/components/atoms/buttons';
import { ReservationDetails } from '../data-display';
import type { Reservation } from '~/schemas/api/reservation';
import { useQuery } from '@tanstack/react-query';
import { getReservationByName } from '~/api/reservation';
import { reservation } from '~/constants/queryKeys';
import { Spinner } from '~/components/molecules/status-indicators';

type ReservationDetailsDialogProps = {
  isOpen: boolean;
  onClose: VoidFunction;
  reservationName: Reservation['name'];
};

const ReservationDetailsDialog = ({
  isOpen,
  onClose,
  reservationName
}: ReservationDetailsDialogProps) => {
  const options = {
    includeVisits: true,
    includeServices: true,
    includeAddress: true
  };

  const { data, isLoading } = useQuery({
    queryKey: [...reservation.find(), reservationName, options],
    queryFn: () => getReservationByName(reservationName, options)
  });

  return (
    <DialogBase
      className="min-w-[60vw]"
      onClose={onClose}
      isOpen={isOpen}
      title="Reservation Details"
      buttonRenderer={() => (
        <div className="flex items-center justify-between space-x-4">
          <Button>Accept</Button>
          <Button color="danger">Reject</Button>
        </div>
      )}
    >
      {isLoading || !data ? (
        <Spinner caption="Loading reservation data..." />
      ) : (
        <ReservationDetails data={data} expandVisitDetails />
      )}
    </DialogBase>
  );
};

export default ReservationDetailsDialog;
