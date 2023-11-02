import type { SingleVisitData } from '~/types/user';
import DialogBase from './DialogBase';
import { LabeledTypography } from '~/components/atoms/typography/labeled-text';
import { extractHourStringFromDate, getDateAfter } from '~/utils/dateUtils';
import { Button, NavigationButton } from '~/components/atoms/buttons';

type ReservationManagementDialogProps = {
  isOpen: boolean;
  onClose: VoidFunction;
  data: SingleVisitData;
};

const ReservationManagementDialog = ({
  isOpen,
  onClose,
  data
}: ReservationManagementDialogProps) => {
  const { name, duration, date, id } = data;

  const startHour = extractHourStringFromDate(date);
  const endHour = extractHourStringFromDate(getDateAfter(date, duration, 'h'));

  return (
    <DialogBase
      title="Reservation Management"
      isOpen={isOpen}
      onClose={onClose}
      buttonRenderer={() => (
        <div className="flex items-center justify-between space-x-6">
          <NavigationButton
            navigateOnClickTo={`/user/reservations/${id}`}
            name="Change reservation details"
          />
          {/* for periodic reservation only */}
          <Button color="danger">Cancel reservation</Button>
        </div>
      )}
    >
      <div className="grow-1 overflow-y-auto">
        <p className="font-link text-2xl">{name}</p>
        <LabeledTypography
          label="Cleaning date"
          contentDistribution="stretch"
          value={`${date.toLocaleDateString()}`}
        />
        <LabeledTypography
          label="Start"
          contentDistribution="stretch"
          value={`${startHour}`}
        />
        <LabeledTypography
          label="End"
          contentDistribution="stretch"
          value={`${endHour}`}
        />
        <LabeledTypography
          label="Duration"
          contentDistribution="stretch"
          value={`${duration} hours`}
        />
        {/* <div className="align-content-center">
          <p className="font-link text-2xl">Actions</p>
          <div className="py-6">
            <CalendarWithHours
              label="Change Cleaning Date once:"
              direction="column"
            />
          </div>
        </div> */}
      </div>
    </DialogBase>
  );
};

export default ReservationManagementDialog;
