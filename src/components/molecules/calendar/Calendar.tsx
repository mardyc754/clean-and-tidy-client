import clsx from 'clsx';
import { useEffect } from 'react';
import { useFormContext } from 'react-hook-form';

import { ErrorLabel } from '~/components/atoms/forms';
import { Calendar as ShadcnCalendar } from '~/components/shadcn/ui/calendar';

import { type ValidDayjsDate, isTheSameDay, nextDay } from '~/utils/dateUtils';

import type { ValidDate } from '~/types/forms';

interface CalendarProps {
  name: string;
  errorLabel?: string;
  defaultValue?: ValidDate;
  onChange?: (value: ValidDate) => void;
}

const Calendar = ({
  name,
  errorLabel,
  onChange,
  defaultValue,
  ...props
}: CalendarProps) => {
  const { register, setValue, getValues } = useFormContext();

  useEffect(() => {
    register(name);
  }, [name, register]);

  const handleChange = (value: ValidDate) => {
    setValue(name, value);
    onChange?.(value);
  };

  return (
    <div className={clsx('flex flex-col', !errorLabel && 'mb-4')}>
      <ShadcnCalendar
        ISOWeek
        disabled={{ before: nextDay(new Date()) }}
        onDayClick={handleChange}
        selected={(date) => {
          return isTheSameDay(
            date,
            (getValues(name) as ValidDayjsDate) ?? defaultValue
          );
        }}
        fromMonth={nextDay(new Date())}
        initialFocus
        {...props}
      />
      <ErrorLabel>{errorLabel}</ErrorLabel>
    </div>
  );
};

export default Calendar;
