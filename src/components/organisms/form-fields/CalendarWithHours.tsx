import { useFormContext } from 'react-hook-form';
// import 'react-calendar/dist/Calendar.css'; // for testing purposes only
import { type CalendarProps as ReactCalendarProps } from 'react-calendar';

import { MediumTypography } from '~/components/atoms/typography/regular-text';
import { Calendar } from '~/components/molecules/calendar';
import { HourSelection } from '~/components/molecules/form-fields';

type CalendarWithLabelProps = {
  calendarInputName: string;
  hourInputName: string;
  label: string;
  direction?: 'column' | 'row';
} & Omit<ReactCalendarProps, 'onChange' | 'value'>;

const CalendarWithHours = ({
  label,
  direction = 'row',
  calendarInputName,
  hourInputName,
  ...props
}: CalendarWithLabelProps) => {
  const { watch } = useFormContext();

  return (
    <div className="flex flex-col">
      <MediumTypography className="py-1">{label}</MediumTypography>
      <div
        className={`flex ${
          direction === 'column' ? 'flex-col items-center space-y-4' : ''
        }`}
      >
        <Calendar name={calendarInputName} {...props} />
        <HourSelection
          name={hourInputName}
          className="px-16"
          direction={direction === 'column' ? 'row' : 'column'}
          disableSelection={!watch(calendarInputName)}
        />
      </div>
    </div>
  );
};

export default CalendarWithHours;
