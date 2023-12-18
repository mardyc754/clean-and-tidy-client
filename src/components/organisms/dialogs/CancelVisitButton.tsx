import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useContext } from 'react';
import toast from 'react-hot-toast';
import { VisitDataContext } from '~/providers/VisitDataProvider';

import { reservation, visit } from '~/constants/queryKeys';

import { cancelVisit } from '~/api/visit';

import { useAuth } from '~/hooks/auth/useAuth';

import { Button } from '~/components/atoms/buttons';
import { DialogFooter } from '~/components/shadcn/ui/dialog';

import {
  displayDateWithHours,
  isAtLeastOneDayBetween
} from '~/utils/dateUtils';

import DialogTriggerButton, {
  type DialogTriggerButtonProps
} from './DialogTriggerButton';

const CancelVisitButton = (
  props: Omit<DialogTriggerButtonProps, 'buttonLabel' | 'children'>
) => {
  const queryClient = useQueryClient();
  const { currentUser } = useAuth();

  const { visitData, reservationName } = useContext(VisitDataContext);

  const visitStartDate = visitData?.visitParts[0]!.startDate;

  const mutation = useMutation({
    mutationFn: cancelVisit,
    onSuccess: () => {
      if (!visitData) {
        return null;
      }

      return toast.promise(
        (async () => {
          await queryClient.invalidateQueries({
            queryKey: reservation.byName(reservationName!)
          });

          await queryClient.invalidateQueries({
            queryKey: visit.detail(visitData.id)
          });

          await queryClient.invalidateQueries({
            queryKey: visit.client(currentUser!.id)
          });
        })(),
        {
          loading: 'Canceling visit...',
          success: 'Visit cancelled',
          error: 'Failed to cancel visit'
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
      dialogTitle="Confirm visit cancellation"
      buttonLabel="Cancel visit"
      color="danger"
      actions={[
        {
          children: 'Confirm',
          type: 'submit'
        }
      ]}
      className="w-full max-w-lg"
    >
      <p>{`The start date of this visit is ${displayDateWithHours(
        visitStartDate
      )}.`}</p>

      <p>
        {`That means, ${
          isAtLeastOneDayBetween(visitStartDate, Date.now())
            ? 'you can cancel visit for free.'
            : 'you will be charged the half of the visit cost'
        }`}
      </p>
      <p className="text-xs">
        Remember, that you can cancel visit for free up to 24 hours before the
        visit. After that time, you will be charged the half of the full amount.
      </p>

      <DialogFooter className="flex justify-end">
        <Button
          onClick={() =>
            visitData ? mutation.mutate(visitData.id) : undefined
          }
        >
          Confirm
        </Button>
      </DialogFooter>
    </DialogTriggerButton>
  );
};

export default CancelVisitButton;
