// import 'react-calendar/dist/Calendar.css'; // for testing purposes only
import { type CalendarProps as ReactCalendarProps } from 'react-calendar';

import { MediumTypography } from '~/components/atoms/typography/regular-text';
import { Calendar } from '~/components/molecules/calendar';
import { HourSelection } from '~/components/molecules/form-fields';

import { type ValidDate } from '~/types/forms';

type CalendarWithLabelProps = {
  label: string;
  direction?: 'column' | 'row';
  day: ValidDate;
  hour: ValidDate;
  onChangeDate: (value: ValidDate) => void;
  onChangeHour: (value: ValidDate) => void;
} & Omit<ReactCalendarProps, 'onChange' | 'value'>;

const CalendarWithHours = ({
  label,
  direction = 'row',
  day,
  hour,
  onChangeDate,
  onChangeHour,
  ...props
}: CalendarWithLabelProps) => {
  return (
    <div className="flex flex-col">
      <MediumTypography className="py-1">{label}</MediumTypography>
      <div
        className={`flex ${
          direction === 'column' ? 'flex-col items-center space-y-4' : ''
        }`}
      >
        <Calendar onChange={onChangeDate} value={day} {...props} />
        <HourSelection
          currentHour={hour}
          onChange={onChangeHour}
          className="px-16"
          direction={direction === 'column' ? 'row' : 'column'}
          disableSelection={!day}
        />
      </div>
    </div>
  );
};

export default CalendarWithHours;
