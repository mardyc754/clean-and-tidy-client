import clsx from 'clsx';
import { useWatch } from 'react-hook-form';

import type { TimeInterval } from '~/schemas/api/services';

import { MediumTypography } from '~/components/atoms/typography/regular-text';
import { Calendar } from '~/components/molecules/calendar';
import { HourSelection } from '~/components/molecules/form-fields';

import { endOfDay, isSame, startOfDay } from '~/utils/dateUtils';
import { getHourAvailabilityData } from '~/utils/serviceUtils';

import type { ValidDate } from '~/types/forms';

type CalendarWithLabelProps = {
  calendarInputName: string;
  hourInputName: string;
  label: string;
  busyHours: TimeInterval[];
  currentDuration?: number;
  direction?: 'column' | 'row';
  onChangeHour?: (value: ValidDate) => void;
  onChangeDate?: (value: ValidDate) => void;
  dateErrorLabel?: string;
  hourErrorLabel?: string;
};

const CalendarWithHours = ({
  label,
  direction = 'row',
  calendarInputName,
  hourInputName,
  onChangeDate,
  onChangeHour,
  dateErrorLabel,
  hourErrorLabel,
  busyHours,
  currentDuration
}: CalendarWithLabelProps) => {
  const currentDate = useWatch({ name: calendarInputName }) as ValidDate;

  // const busyDays = busyHours.filter(
  //   (busyHour) =>
  //     isSame(busyHour.startDate, startOfDay(busyHour.startDate)) &&
  //     isSame(busyHour.endDate, endOfDay(busyHour.endDate))
  // );

  // console.log('>>> busyDays', busyDays);

  return (
    <div className="flex flex-col">
      <MediumTypography className="py-1">{label}</MediumTypography>
      <div
        className={clsx(
          'flex',
          direction === 'column' && 'flex-col items-center space-x-8 space-y-4'
        )}
      >
        <Calendar
          name={calendarInputName}
          onChange={onChangeDate}
          errorLabel={dateErrorLabel}
          defaultValue={currentDate}
          // busyDays={busyDays}
        />
        <HourSelection
          selectedDuration={currentDuration}
          direction="row"
          hourAvailabilityData={getHourAvailabilityData(currentDate, busyHours)}
          name={hourInputName}
          disableSelection={!currentDate}
          onChange={onChangeHour}
          errorLabel={hourErrorLabel}
        />
      </div>
    </div>
  );
};

export default CalendarWithHours;
