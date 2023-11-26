import { useQuery } from '@tanstack/react-query';

import { visit } from '~/constants/queryKeys';

import { getVisitByIdWithEmployees } from '~/api/visit';

import type { VisitWithEmployees } from '~/schemas/api/reservation';

import { Button } from '~/components/atoms/buttons';
import { Spinner } from '~/components/molecules/status-indicators';

import { ExtendedVisitDetailsList } from '../lists';
import DialogBase from './DialogBase';

type VisitDetailsDialogProps = {
  isOpen: boolean;
  onClose: VoidFunction;
  visitId: VisitWithEmployees['id'];
};

const VisitDetailsDialog = ({
  isOpen,
  onClose,
  visitId
}: VisitDetailsDialogProps) => {
  const { data, isLoading } = useQuery({
    queryKey: visit.detail(visitId, { includeEmployee: true }),
    queryFn: () => getVisitByIdWithEmployees(visitId)
  });

  return (
    <DialogBase
      onClose={onClose}
      isOpen={isOpen}
      title="Visit Details"
      buttonRenderer={() => (
        <div className="flex items-center justify-between space-x-4">
          <Button>Manage</Button>
          {/* <Button>Confirm</Button> */}
          <Button color="danger">Cancel visit</Button>
        </div>
      )}
    >
      {!data || isLoading ? (
        <Spinner caption="Loading visit data..." />
      ) : (
        <ExtendedVisitDetailsList data={data} />
      )}
    </DialogBase>
  );
};

export default VisitDetailsDialog;
