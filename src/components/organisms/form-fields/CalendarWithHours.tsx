// import 'react-calendar/dist/Calendar.css'; // for testing purposes only
import { useState } from 'react';
import { type CalendarProps as ReactCalendarProps } from 'react-calendar';

import { MediumTypography } from '~/components/atoms/typography/regular-text';
import { Calendar } from '~/components/molecules/calendar';
import { HourSelection } from '~/components/molecules/form-fields';

type ValuePiece = Date | null;

type Value = ValuePiece | [ValuePiece, ValuePiece];

type CalendarWithLabelProps = {
  label: string;
} & ReactCalendarProps;

const CalendarWithHours = ({ label, ...props }: CalendarWithLabelProps) => {
  const [value, onChange] = useState<Value>(new Date());
  console.log({ value });

  return (
    <div className="flex flex-col">
      <MediumTypography className="py-1">{label}</MediumTypography>
      <div className="flex">
        <Calendar onChange={onChange} value={value} {...props} />
        <HourSelection className="px-16" />
      </div>
    </div>
  );
};

export default CalendarWithHours;
