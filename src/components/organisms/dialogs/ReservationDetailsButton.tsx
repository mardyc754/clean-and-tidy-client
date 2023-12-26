import { useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';

import { reservation } from '~/constants/queryKeys';

import { confirmReservation } from '~/api/reservation';

import type { Reservation } from '~/schemas/api/reservation';

import { useAuth } from '~/hooks/auth/useAuth';
import { useReservation } from '~/hooks/reservation/useReservation';

import { Button } from '~/components/atoms/buttons';
import { Spinner } from '~/components/molecules/status-indicators';
import { DialogFooter } from '~/components/shadcn/ui/dialog';

import { ReservationDetails } from '../tables';
import DialogTriggerButton from './DialogTriggerButton';

type ReservationDetailsButtonProps = {
  reservationName: Reservation['name'];
};

const ReservationDetailsButton = ({
  reservationName
}: ReservationDetailsButtonProps) => {
  const queryClient = useQueryClient();

  const { currentUser } = useAuth();

  const { data, isLoading, refetch } = useReservation(reservationName, {
    enabled: false
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
    <DialogTriggerButton
      className="h-full min-w-full lg:h-[unset] lg:min-w-[70vw]"
      buttonLabel="Manage"
      dialogTitle="Reservation Details"
      onClick={async () => await refetch()}
    >
      {isLoading || !data ? (
        <Spinner caption="Loading reservation data..." />
      ) : (
        <div className="space-y-4 overflow-auto p-4 md:max-h-[60vh]">
          <ReservationDetails data={data} expandVisitDetails />
        </div>
      )}
      <DialogFooter>
        <Button onClick={() => currentUser && mutation.mutate(currentUser.id)}>
          Accept
        </Button>
        {/* <Button color="danger">Reject</Button> */}
      </DialogFooter>
    </DialogTriggerButton>
  );
};

export default ReservationDetailsButton;
