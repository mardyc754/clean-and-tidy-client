// import 'react-calendar/dist/Calendar.css'; // for testing purposes only
import {
  Calendar as ReactCalendar,
  type CalendarProps as ReactCalendarProps
} from 'react-calendar';

const Calendar = ({ onChange, value, ...props }: ReactCalendarProps) => {
  return (
    <div className="flex flex-col">
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
