import clsx from 'clsx';
import { useEffect } from 'react';
import { useFormContext } from 'react-hook-form';

import { ErrorLabel } from '~/components/atoms/forms';
import {
  Calendar as ShadcnCalendar,
  type CalendarProps as ShadcnCalendarProps
} from '~/components/shadcn/ui/calendar';

import { type ValidDayjsDate, isTheSameDay, nextDay } from '~/utils/dateUtils';

import type { ValidDate } from '~/types/forms';
import type { TimeInterval } from '~/types/service';

type CalendarProps = {
  name: string;
  errorLabel?: string;
  defaultValue?: ValidDate;
  onChange?: (value: ValidDate) => void;
  holidays?: TimeInterval[];
} & Omit<
  ShadcnCalendarProps,
  'selected' | 'onDayClick' | 'mode' | 'disabled' | 'fromMonth'
>;

const Calendar = ({
  name,
  errorLabel,
  onChange,
  defaultValue,
  holidays,
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
        disabled={[
          { before: nextDay(new Date()) },
          // ...(holidays ?? []).map((holiday) => ({
          //   from: new Date(holiday.startDate),
          //   to: new Date(holiday.endDate)
          // }))
          ...(holidays ?? []).map((holiday) => new Date(holiday.startDate))
        ]}
        onDayClick={handleChange}
        selected={(date) => {
          return isTheSameDay(
            date,
            (getValues(name) as ValidDayjsDate) ?? defaultValue
          );
        }}
        fromMonth={nextDay(new Date())}
        {...props}
      />
      <ErrorLabel>{errorLabel}</ErrorLabel>
    </div>
  );
};

export default Calendar;
