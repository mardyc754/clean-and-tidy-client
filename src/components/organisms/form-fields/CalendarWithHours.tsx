import clsx from 'clsx';
import { useEffect, useState } from 'react';
import { useFormContext, useWatch } from 'react-hook-form';

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
  ...props
}: CalendarWithLabelProps) => {
  const { setValue } = useFormContext();
  const [isMounted, setIsMounted] = useState(false);

  const currentDate = useWatch({ name: calendarInputName }) as ValidDate;

  useEffect(() => {
    // do not reset hour value on first render
    if (isMounted) {
      setValue(hourInputName, null);
      onChangeHour?.(null);
    } else {
      setIsMounted(true);
    }
  }, [currentDate, hourInputName, isMounted, onChangeHour, setValue]);

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
          defaultValue={currentDate}
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
