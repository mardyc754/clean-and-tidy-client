import React from 'react';
import { Calendar, type CalendarProps } from 'react-big-calendar';

import { localizer } from '~/lib/dayjs';
import { dateWithHour } from '~/utils/dateUtils';

/**
 * The component for displaying detailed calendar view with events
 *
 * Example usage:
 *
 * ```tsx
 * <Scheduler
 *  events={getEventsFromReservations(reservations)}
 *  length={daysBetween(Date.now(), data.endDate)}
 * />
 * ```
 * @param props the props that can be used with react-big-calendar's Calendar component
 */
const Scheduler = (props: Omit<CalendarProps, 'localizer'>) => {
  return (
    <div className="h-[80vh]">
      <Calendar
        {...props}
        localizer={localizer}
        startAccessor="start"
        endAccessor="end"
        // culture='pl'
        min={dateWithHour(undefined, 6)}
        // max={dateWithHour(undefined, 22)}
      />
    </div>
  );
};

export default Scheduler;
