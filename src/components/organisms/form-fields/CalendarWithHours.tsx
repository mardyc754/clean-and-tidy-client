import clsx from 'clsx';
import { useEffect } from 'react';
// import 'react-calendar/dist/Calendar.css'; // for testing purposes only
import { type CalendarProps as ReactCalendarProps } from 'react-calendar';
import { useFormContext } from 'react-hook-form';

import { MediumTypography } from '~/components/atoms/typography/regular-text';
import { Calendar } from '~/components/molecules/calendar';
import { HourSelection } from '~/components/molecules/form-fields';

import type { ValidDate } from '~/types/forms';

type CalendarWithLabelProps = {
  calendarInputName: string;
  hourInputName: string;
  label: string;
  direction?: 'column' | 'row';
  onChangeHour?: (value: ValidDate) => void;
  onChangeDate?: (value: ValidDate) => void;
  dateErrorLabel?: string;
  hourErrorLabel?: string;
} & Omit<ReactCalendarProps, 'onChange' | 'value'>;

const CalendarWithHours = ({
  label,
  direction = 'row',
  calendarInputName,
  hourInputName,
  onChangeDate,
  onChangeHour,
  dateErrorLabel,
  hourErrorLabel,
  ...props
}: CalendarWithLabelProps) => {
  const { setValue, watch } = useFormContext();

  const currentDate = watch(calendarInputName) as ValidDate;

  useEffect(() => {
    setValue(hourInputName, null);
    onChangeHour?.(null);
  }, [currentDate]);

  return (
    <div className="flex flex-col">
      <MediumTypography className="py-1">{label}</MediumTypography>
      <div
        className={clsx(
          'flex',
          direction === 'column' && 'flex-col items-center space-y-4'
        )}
      >
        <Calendar
          name={calendarInputName}
          onChange={onChangeDate}
          errorLabel={dateErrorLabel}
          {...props}
        />
        <HourSelection
          name={hourInputName}
          className="px-16"
          direction={direction === 'column' ? 'row' : 'column'}
          disableSelection={!currentDate}
          onChange={onChangeHour}
          errorLabel={hourErrorLabel}
        />
      </div>
    </div>
  );
};

export default CalendarWithHours;
