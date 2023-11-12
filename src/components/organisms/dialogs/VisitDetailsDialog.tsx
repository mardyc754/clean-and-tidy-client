import DialogBase from './DialogBase';
import type { Visit } from '~/schemas/api/reservation';
import { Button } from '~/components/atoms/buttons';
import { ExtendedVisitDetailsList } from '../lists';

type VisitDetailsDialogProps = {
  isOpen: boolean;
  onClose: VoidFunction;
  data: Visit;
};

const VisitDetailsDialog = ({
  isOpen,
  onClose,
  data
}: VisitDetailsDialogProps) => {
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
      <ExtendedVisitDetailsList data={data} />
    </DialogBase>
  );
};

export default VisitDetailsDialog;
