import clsx from 'clsx';
import { useEffect, useState } from 'react';
import { useFormContext } from 'react-hook-form';

import type { Timeslot } from '~/schemas/forms/orderService';

import { useHolidays } from '~/hooks/dates/useHolidays';

import { ErrorLabel } from '~/components/atoms/forms';
import {
  Calendar as ShadcnCalendar,
  type CalendarProps as ShadcnCalendarProps
} from '~/components/shadcn/ui/calendar';

import { type ValidDayjsDate, isTheSameDay, nextDay } from '~/utils/dateUtils';

import type { ValidDate } from '~/types/forms';

type CalendarProps = {
  name: string;
  errorLabel?: string;
  defaultValue?: ValidDate;
  busyDays?: Timeslot[];
  onChange?: (value: ValidDate) => void;
} & Omit<
  ShadcnCalendarProps,
  'selected' | 'onDayClick' | 'mode' | 'disabled' | 'fromMonth'
>;

const Calendar = ({
  name,
  errorLabel,
  onChange,
  defaultValue,
  busyDays,
  ...props
}: CalendarProps) => {
  const { register, setValue, getValues } = useFormContext();
  const [currentMonth, setCurrentMonth] = useState(new Date());

  const { holidays } = useHolidays(currentMonth.getFullYear());

  useEffect(() => {
    register(name);
  }, [name, register]);

  const handleChange = (value: ValidDate) => {
    setValue(name, value);
    onChange?.(value);
  };

  const holidayDates = (holidays ?? []).map((holiday) => new Date(holiday));

  return (
    <div className={clsx('flex flex-col', !errorLabel && 'mb-4')}>
      <ShadcnCalendar
        ISOWeek
        disabled={[
          { before: nextDay(new Date()) },
          ...holidayDates,
          ...(busyDays ?? []).map((busyDay) => new Date(busyDay.startDate))
          // to: new Date(busyDay.endDate)
        ]}
        modifiers={{
          holidays: holidayDates
        }}
        modifiersClassNames={{ holidays: 'text-cyan-500 font-bold' }}
        onDayClick={handleChange}
        selected={(date) => {
          return isTheSameDay(
            date,
            (getValues(name) as ValidDayjsDate) ?? defaultValue
          );
        }}
        fromMonth={nextDay(new Date())}
        onMonthChange={(month) => {
          setCurrentMonth(month);
        }}
        {...props}
      />
      <ErrorLabel>{errorLabel}</ErrorLabel>
    </div>
  );
};

export default Calendar;
