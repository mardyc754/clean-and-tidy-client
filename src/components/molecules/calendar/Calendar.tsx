// import 'react-calendar/dist/Calendar.css'; // for testing purposes only
import { useEffect } from 'react';
import {
  Calendar as ReactCalendar,
  type CalendarProps as ReactCalendarProps
} from 'react-calendar';
import { useFormContext } from 'react-hook-form';

import type { ValidDate } from '~/types/forms';

const Calendar = ({
  name,
  value,
  ...props
}: ReactCalendarProps & { name: string }) => {
  const { register, setValue } = useFormContext();

  useEffect(() => {
    register(name);
  }, [name, register]);

  const onChange = (value: ValidDate) => {
    setValue(name, value);
  };

  return (
    // <div className="flex flex-col">
    <ReactCalendar
      onChange={onChange}
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
