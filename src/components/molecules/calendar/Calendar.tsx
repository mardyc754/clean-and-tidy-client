// import 'react-calendar/dist/Calendar.css'; // for testing purposes only
import { useEffect } from 'react';
import {
  Calendar as ReactCalendar,
  type CalendarProps as ReactCalendarProps
} from 'react-calendar';
import { useFormContext } from 'react-hook-form';

import type { ValidDate } from '~/types/forms';

interface CalendarProps extends Omit<ReactCalendarProps, 'onChange'> {
  name: string;
  onChange?: (value: ValidDate) => void;
}

const Calendar = ({ name, value, onChange, ...props }: CalendarProps) => {
  const { register, setValue } = useFormContext();

  useEffect(() => {
    register(name);
  }, [name, register]);

  const handleChange = (value: ValidDate) => {
    setValue(name, value);
    onChange?.(value);
  };

  return (
    // <div className="flex flex-col">
    <ReactCalendar
      onChange={handleChange}
      value={value}
      // temporary in order to quiet hydrate errors
      calendarType="iso8601"
      locale="en-US"
      {...props}
    />
    // </div>
  );
};

export default Calendar;
