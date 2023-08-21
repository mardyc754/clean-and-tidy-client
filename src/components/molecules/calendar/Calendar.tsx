// import 'react-calendar/dist/Calendar.css'; // for testing purposes only
import { useState } from 'react';
import {
  Calendar as ReactCalendar,
  type CalendarProps as ReactCalendarProps
} from 'react-calendar';

import { MediumTypography } from '~/components/atoms/typography/regular-text';

type ValuePiece = Date | null;

type Value = ValuePiece | [ValuePiece, ValuePiece];

type CalendarProps = {
  label: string;
} & ReactCalendarProps;

const Calendar = ({ label, ...props }: CalendarProps) => {
  const [value, onChange] = useState<Value>(new Date());
  return (
    <div className="flex flex-col">
      <MediumTypography className="py-1">{label}</MediumTypography>
      <ReactCalendar
        onChange={onChange}
        value={value}
        // temporary in order to quiet hydrate errors
        calendarType="iso8601"
        locale="en-US"
        {...props}
      />
    </div>
  );
};

export default Calendar;
