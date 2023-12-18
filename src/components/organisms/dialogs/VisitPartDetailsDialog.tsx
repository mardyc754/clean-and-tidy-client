import { DialogPortal, DialogTrigger } from '@radix-ui/react-dialog';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';

import { visit, visitPart } from '~/constants/queryKeys';

import { cancelVisitPart, getVisitPartById } from '~/api/visit';

import type { VisitWithEmployees } from '~/schemas/api/reservation';

import { useAuth } from '~/hooks/auth/useAuth';

import { Button } from '~/components/atoms/buttons';
import { Spinner } from '~/components/molecules/status-indicators';
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogTitle
} from '~/components/shadcn/ui/dialog';

import { VisitPartDetailsList } from '../lists';

type VisitPartDetailsDialogProps = {
  visitId: VisitWithEmployees['id'];
  children: React.ReactNode;
  title: string;
};

const VisitPartDetailsDialog = ({
  visitId,
  children,
  title
}: VisitPartDetailsDialogProps) => {
  const { currentUser } = useAuth();

  const queryClient = useQueryClient();

  const { data, isLoading, refetch } = useQuery({
    queryKey: visitPart.detail(visitId, { includeEmployee: true }),
    queryFn: () => getVisitPartById(visitId),
    enabled: false
  });

  const cancelVisitPartMutation = useMutation({
    mutationFn: () => cancelVisitPart(visitId),
    onSuccess: () => {
      return toast.promise(
        (async () => {
          await queryClient.invalidateQueries({
            queryKey: visit.employee(currentUser!.id)
          });

          await queryClient.invalidateQueries({
            queryKey: visitPart.detail(visitId, { includeEmployee: true })
          });
        })(),
        {
          loading: 'Canceling visit...',
          success: 'Visit cancelled',
          error: 'Failed to cancel visit'
        }
      );
    }
  });
  return (
    <Dialog>
      <DialogTrigger
        onClick={async () => await refetch()}
        className="h-full w-full flex-col"
      >
        {children}
      </DialogTrigger>
      <DialogPortal>
        <DialogContent>
          <DialogTitle>{title}</DialogTitle>
          {!data || isLoading ? (
            <Spinner caption="Loading visit data..." />
          ) : (
            <>
              <VisitPartDetailsList data={data} />
            </>
          )}
          <DialogFooter className="flex items-center justify-between space-x-4">
            {/* <Button>Manage</Button> */}
            {/* <Button>Confirm</Button> */}
            <Button
              color="danger"
              onClick={() => {
                cancelVisitPartMutation.mutate();
              }}
            >
              Cancel visit
            </Button>
          </DialogFooter>
        </DialogContent>
      </DialogPortal>
    </Dialog>
  );
};

export default VisitPartDetailsDialog;
