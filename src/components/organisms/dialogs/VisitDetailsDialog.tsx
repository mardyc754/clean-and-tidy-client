import DialogBase from './DialogBase';
import type { Visit } from '~/schemas/api/reservation';
import { Button } from '~/components/atoms/buttons';
import { ExtendedVisitDetailsList } from '../lists';
import { visit } from '~/constants/queryKeys';
import { getVisitById } from '~/api/visit';
import { useQuery } from '@tanstack/react-query';
import { Spinner } from '~/components/molecules/status-indicators';

type VisitDetailsDialogProps = {
  isOpen: boolean;
  onClose: VoidFunction;
  visitId: Visit['id'];
};

const VisitDetailsDialog = ({
  isOpen,
  onClose,
  visitId
}: VisitDetailsDialogProps) => {
  const options = { includeEmployees: true };

  const { data, isLoading } = useQuery({
    queryKey: visit.detail(visitId, options),
    queryFn: () => getVisitById(visitId, { includeEmployees: true })
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
