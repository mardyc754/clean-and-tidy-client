// import 'react-calendar/dist/Calendar.css'; // for testing purposes only
import { useState } from 'react';
import { type CalendarProps as ReactCalendarProps } from 'react-calendar';

import { MediumTypography } from '~/components/atoms/typography/regular-text';

import Calendar from './Calendar';

type ValuePiece = Date | null;

type Value = ValuePiece | [ValuePiece, ValuePiece];

type CalendarWithLabelProps = {
  label: string;
} & ReactCalendarProps;

const CalendarWithLabel = ({ label, ...props }: CalendarWithLabelProps) => {
  const [value, onChange] = useState<Value>(new Date());
  return (
    <div className="flex flex-col">
      <MediumTypography className="py-1">{label}</MediumTypography>
      <Calendar onChange={onChange} value={value} />
    </div>
  );
};

export default CalendarWithLabel;
