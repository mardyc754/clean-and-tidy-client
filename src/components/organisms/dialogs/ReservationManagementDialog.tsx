import type { SingleReservationData } from '~/types/user';
import DialogBase from './DialogBase';
import { LabeledTypography } from '~/components/atoms/typography/labeled-text';
import { extractHourFromDate, getDateAfter } from '~/utils/dateHandling';
import { Button, NavigationButton } from '~/components/atoms/buttons';
import { CalendarWithHours } from '../form-fields';

type ReservationManagementDialogProps = {
  isOpen: boolean;
  onClose: VoidFunction;
  data: SingleReservationData;
};

const ReservationManagementDialog = ({
  isOpen,
  onClose,
  data
}: ReservationManagementDialogProps) => {
  const { name, duration, date, id } = data;

  const startHour = extractHourFromDate(date);
  const endHour = extractHourFromDate(getDateAfter(date, duration, 'h'));

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
