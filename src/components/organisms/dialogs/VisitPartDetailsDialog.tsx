import { DialogPortal, DialogTrigger } from '@radix-ui/react-dialog';
import { useQuery } from '@tanstack/react-query';

import { visitPart } from '~/constants/queryKeys';

import { getVisitPartById } from '~/api/visit';

import type { VisitWithEmployees } from '~/schemas/api/reservation';

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
  const { data, isLoading, refetch } = useQuery({
    queryKey: visitPart.detail(visitId, { includeEmployee: true }),
    queryFn: () => getVisitPartById(visitId),
    enabled: false
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
            <VisitPartDetailsList data={data} />
          )}
          <DialogFooter className="flex items-center justify-between space-x-4">
            <Button>Manage</Button>
            {/* <Button>Confirm</Button> */}
            <Button color="danger">Cancel visit</Button>
          </DialogFooter>
        </DialogContent>
      </DialogPortal>
    </Dialog>
  );
};

export default VisitPartDetailsDialog;
