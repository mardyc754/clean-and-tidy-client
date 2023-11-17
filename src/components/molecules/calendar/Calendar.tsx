// import 'react-calendar/dist/Calendar.css'; // for testing purposes only
import clsx from 'clsx';
import { useEffect } from 'react';
import {
  Calendar as ReactCalendar,
  type CalendarProps as ReactCalendarProps
} from 'react-calendar';
import { useFormContext } from 'react-hook-form';

import { ErrorLabel } from '~/components/atoms/forms';

import { nextDay } from '~/utils/dateUtils';

import type { ValidDate } from '~/types/forms';

interface CalendarProps extends Omit<ReactCalendarProps, 'onChange'> {
  name: string;
  errorLabel?: string;
  onChange?: (value: ValidDate) => void;
}

const Calendar = ({
  name,
  value,
  errorLabel,
  onChange,
  ...props
}: CalendarProps) => {
  const { register, setValue } = useFormContext();

  useEffect(() => {
    register(name);
  }, [name, register]);

  const handleChange = (value: ValidDate) => {
    setValue(name, value);
    onChange?.(value);
  };

  return (
    <div className={clsx('flex flex-col', !errorLabel && 'mb-4')}>
      <ReactCalendar
        minDate={nextDay(new Date())}
        // tileDisabled={({ date }) => date.getDay() === 0 || date.getDay() === 6}
        onChange={handleChange}
        value={value}
        // defaultValue={value}
        // temporary in order to quiet hydrate errors
        calendarType="iso8601"
        locale="en-US"
        {...props}
      />
      <ErrorLabel>{errorLabel}</ErrorLabel>
    </div>
  );
};

export default Calendar;
