import clsx from 'clsx';
import React, { useMemo } from 'react';
import {
  Calendar,
  type Event as CalendarEvent,
  type EventProps,
  type CalendarProps,
  EventWrapperProps
} from 'react-big-calendar';

import type { Visit } from '~/schemas/api/reservation';
import { localizer } from '~/lib/dayjs';
import { dateWithHour } from '~/utils/dateUtils';
import { VisitDetailsDialog } from '../dialogs';

function getRandomBackgroudColor() {
  const colors = [
    'bg-red-500',
    'bg-yellow-500',
    'bg-green-500',
    'bg-blue-500',
    'bg-indigo-500',
    'bg-purple-500',
    'bg-pink-500',
    'bg-rose-500',
    'bg-fuchsia-500',
    'bg-cyan-500',
    'bg-amber-500',
    'bg-lime-500',
    'bg-teal-500',
    'bg-lightBlue-500',
    'bg-violet-500',
    'bg-emerald-500',
    'bg-sky-500'
  ];

  return colors[Math.floor(Math.random() * colors.length)];
}

interface VisitEvent extends CalendarEvent {
  resource: Visit;
}

const Event = React.memo(({ event, ...props }: EventProps<VisitEvent>) => {
  const { resource } = event;
  const [isOpen, setIsOpen] = React.useState(false);
  return (
    <div className="h-full" onClick={() => setIsOpen(true)}>
      <p>{event.title}</p>
      {isOpen && (
        <VisitDetailsDialog
          isOpen
          onClose={() => setIsOpen(false)}
          visitId={resource.id}
        />
      )}
    </div>
  );
});

Event.displayName = 'Event';

// function Event({ event, ...props }: EventProps<VisitEvent>) {
//   const { resource } = event;
//   // console.log({ event, ...props });
//   return (
//     <VisitEventPopover name={event.title} placement="right" data={resource} />
//   );
// }

function EventAgenda({ event }: EventProps) {
  return (
    // <span className="text-rose-300">
    <>
      <span>{event.title}</span>
    </>
  );
}

// function EventWrapper({
//   event,
//   label,
//   children,
//   ...props
// }: EventWrapperProps<VisitEvent>) {
//   console.log({ ...props });
//   return (
//     <BasicPopover buttonComponent={children}>
//       <p>test content</p>
//     </BasicPopover>
//     // <>{children}</>
//   );
// }

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
}: Omit<CalendarProps<VisitEvent>, 'localizer'>) => {
  const { components } = useMemo(
    () => ({
      components: {
        // agenda: {
        //   event: EventAgenda
        // },
        event: Event
        // eventContentWrapper: Event
        // eventContentWrapper: ({ children }) => <div>{children}</div>
      }
    }),
    []
  );

  return (
    <div className={clsx('h-[80vh]', className)}>
      <Calendar
        {...props}
        components={components}
        // eventPropGetter={() => ({ className: getRandomBackgroudColor() })}
        // eventPropGetter={() => ({ className: 'bg-cyan-500 overflow-visible' })}
        // dayPropGetter={() => ({ className: 'overflow-visible' })}
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
