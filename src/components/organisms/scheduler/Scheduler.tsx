import clsx from 'clsx';
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
 *  events={getEventsFromReservation(reservation)}
 *  length={daysBetween(Date.now(), data.endDate)}
 * />
 * ```
 * @param props the props that can be used with react-big-calendar's Calendar component
 */
const Scheduler = ({
  className,
  ...props
}: Omit<CalendarProps, 'localizer'>) => {
  return (
    <div className={clsx('h-[80vh]', className)}>
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
