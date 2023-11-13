import DialogBase from './DialogBase';
import { Button } from '~/components/atoms/buttons';
import { ReservationDetails } from '../data-display';
import type { Reservation } from '~/schemas/api/reservation';

type ReservationDetailsDialogProps = {
  isOpen: boolean;
  onClose: VoidFunction;
  data: Reservation;
};

const ReservationDetailsDialog = ({
  isOpen,
  onClose,
  data
}: ReservationDetailsDialogProps) => {
  return (
    <DialogBase
      className="min-w-[60vw]"
      onClose={onClose}
      isOpen={isOpen}
      title="Visit Details"
      buttonRenderer={() => (
        <div className="flex items-center justify-between space-x-4">
          <Button>Accept</Button>
          <Button color="danger">Reject</Button>
        </div>
      )}
    >
      <ReservationDetails data={data} expandVisitDetails />
    </DialogBase>
  );
};

export default ReservationDetailsDialog;
