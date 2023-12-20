import clsx from 'clsx';
import { useEffect } from 'react';
import { useWatch } from 'react-hook-form';

import type { TimeInterval } from '~/schemas/api/services';

import { MediumTypography } from '~/components/atoms/typography/regular-text';
import { Calendar } from '~/components/molecules/calendar';
import type { CalendarProps } from '~/components/molecules/calendar/Calendar';
import { HourSelection } from '~/components/molecules/form-fields';

import { getHourAvailabilityData } from '~/utils/serviceUtils';

import type { ValidDate } from '~/types/forms';

type CalendarWithLabelProps = {
  calendarInputName: string;
  hourInputName: string;
  label: string;
  busyHours?: TimeInterval[];
  currentDuration?: number;
  disableHourSelection?: boolean;
  direction?: 'column' | 'row';
  onChangeHour?: (value: ValidDate) => void;
  onChangeDate?: (value: ValidDate) => void;
  dateErrorLabel?: string;
  hourErrorLabel?: string;
} & Omit<CalendarProps, 'name'>;

const CalendarWithHours = ({
  label,
  direction = 'row',
  calendarInputName,
  hourInputName,
  onChangeDate,
  onChangeHour,
  dateErrorLabel,
  hourErrorLabel,
  busyHours = [],
  currentDuration = 0,
  disableHourSelection = false,
  ...props
}: CalendarWithLabelProps) => {
  const currentDate = useWatch({ name: calendarInputName }) as ValidDate;

  return (
    <div className="flex flex-col">
      <MediumTypography className="py-1">{label}</MediumTypography>
      <div
        className={clsx(
          'flex items-center',
          'space-x-8',
          direction === 'column' && 'flex-col space-y-4'
        )}
      >
        <Calendar
          {...props}
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
          disableHours={disableHourSelection}
          onChange={onChangeHour}
          errorLabel={hourErrorLabel}
        />
      </div>
    </div>
  );
};

export default CalendarWithHours;
