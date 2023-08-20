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
      <MediumTypography>{label}</MediumTypography>
      <ReactCalendar onChange={onChange} value={value} {...props} />
    </div>
  );
};

export default Calendar;
