import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useContext } from 'react';
import toast from 'react-hot-toast';
import { VisitDataContext } from '~/providers/VisitDataProvider';

import { reservation } from '~/constants/queryKeys';

import { cancelReservation } from '~/api/reservation';

import type { Reservation } from '~/schemas/api/reservation';

import { Button } from '~/components/atoms/buttons';
import { DialogFooter } from '~/components/shadcn/ui/dialog';

import DialogTriggerButton, {
  type DialogTriggerButtonProps
} from './DialogTriggerButton';

type CancelReservationButtonProps = {
  reservationName: Reservation['name'];
} & Omit<DialogTriggerButtonProps, 'buttonLabel' | 'children'>;

const CancelReservationButton = ({
  reservationName,
  ...props
}: CancelReservationButtonProps) => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: cancelReservation,
    onSuccess: () => {
      return toast.promise(
        (async () => {
          await queryClient.invalidateQueries({
            queryKey: reservation.byName(reservationName)
          });
        })(),
        {
          loading: 'Canceling reservation...',
          success: 'Reservation cancelled',
          error: 'Failed to cancel reservation'
        }
      );
    },
    onError: (error) => {
      toast.error(error.message);
    }
  });

  return (
    <DialogTriggerButton
      {...props}
      dialogTitle="Confirm reservation cancellation"
      buttonLabel="Cancel reservation"
      color="danger"
      actions={[
        {
          children: 'Confirm',
          type: 'submit'
        }
      ]}
    >
      <p>
        When you cancel a reservation, you will be charged the half of the full
        price for the visits that occur to 24 hours from now. You will be not
        charged for the visits that occur after 24 hours.
      </p>
      <DialogFooter className="flex justify-end">
        <Button onClick={() => mutation.mutate(reservationName)}>
          Confirm
        </Button>
      </DialogFooter>
    </DialogTriggerButton>
  );
};

export default CancelReservationButton;
