import DialogBase from './DialogBase';
import { Button } from '~/components/atoms/buttons';
import { ReservationDetails } from '../data-display';
import type { Reservation } from '~/schemas/api/reservation';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { confirmReservation, getReservationByName } from '~/api/reservation';
import { reservation } from '~/constants/queryKeys';
import { Spinner } from '~/components/molecules/status-indicators';
import { useAuth } from '~/hooks/auth/useAuth';
import toast from 'react-hot-toast';

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
  const queryClient = useQueryClient();

  const options = {
    includeVisits: true,
    includeServices: true,
    includeAddress: true
  };

  const { currentUser } = useAuth();

  const { data, isLoading } = useQuery({
    queryKey: [...reservation.find(), reservationName, options],
    queryFn: () => getReservationByName(reservationName, options)
  });

  const mutation = useMutation({
    mutationFn: (userId: number) => confirmReservation(reservationName, userId),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: reservation.all });
    },
    onError: (err) => {
      toast.error(err.message);
    }
  });

  return (
    <DialogBase
      className="min-w-[60vw]"
      onClose={onClose}
      isOpen={isOpen}
      title="Reservation Details"
      buttonRenderer={() => (
        <div className="flex items-center justify-between space-x-4">
          <Button
            onClick={() => currentUser && mutation.mutate(currentUser.id)}
          >
            Accept
          </Button>
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
