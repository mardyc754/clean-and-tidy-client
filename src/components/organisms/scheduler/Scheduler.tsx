import clsx from 'clsx';
import React, { useMemo } from 'react';
import {
  Calendar,
  type Event as CalendarEvent,
  type CalendarProps,
  type EventProps
} from 'react-big-calendar';

import { localizer } from '~/lib/dayjs';

import type { VisitWithEmployees } from '~/schemas/api/reservation';

import { Button } from '~/components/atoms/buttons';

import { dateWithHour } from '~/utils/dateUtils';

import { VisitDetailsDialog, VisitPartDetailsDialog } from '../dialogs';

export interface VisitEvent extends CalendarEvent {
  title: string;
  resource: {
    visitId: VisitWithEmployees['id'];
    serviceFullName: string;
    reservationName?: string;
  };
}

export type SchedulerProps = Omit<CalendarProps<VisitEvent>, 'localizer'> & {
  actionsSlot?: React.ReactNode;
  events: VisitEvent[];
  onClickDownloadIcs?: () => Promise<void>;
  userRole: 'client' | 'employee';
};

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

const EmployeeEvent = React.memo(
  ({ event, ...props }: EventProps<VisitEvent>) => {
    return (
      <VisitPartDetailsDialog
        title={event.resource.serviceFullName}
        visitId={event.resource.visitId}
      >
        <p className="text-left">{event.title}</p>
      </VisitPartDetailsDialog>
    );
  }
);

EmployeeEvent.displayName = 'EmployeeEvent';

const ClientEvent = React.memo(
  ({ event, ...props }: EventProps<VisitEvent>) => {
    return (
      <VisitDetailsDialog
        title={event.resource.serviceFullName}
        visitId={event.resource.visitId}
        reservationName={event.resource.reservationName ?? ''}
      >
        <p className="text-left">{event.title}</p>
      </VisitDetailsDialog>
    );
  }
);

ClientEvent.displayName = 'ClientEvent';

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
  actionsSlot,
  events,
  userRole,
  onClickDownloadIcs,
  ...props
}: SchedulerProps) => {
  const { components } = useMemo(
    () => ({
      components: {
        // agenda: {
        //   event: EventAgenda
        // },
        event: userRole === 'employee' ? EmployeeEvent : ClientEvent
        // eventContentWrapper: Event
        // eventContentWrapper: ({ children }) => <div>{children}</div>
      }
    }),
    []
  );

  return (
    <>
      <div className="flex items-center justify-end space-x-2 py-4">
        {actionsSlot}
        <Button onClick={onClickDownloadIcs}>Export to .ics</Button>
      </div>
      <div className={clsx('h-[80vh]', className)}>
        <Calendar
          {...props}
          events={events}
          components={components}
          // eventPropGetter={() => ({ className: getRandomBackgroudColor() })}
          // eventPropGetter={() => ({ className: 'bg-cyan-500 overflow-visible' })}
          // dayPropGetter={() => ({ className: 'overflow-visible' })}
          localizer={localizer}
          startAccessor="start"
          endAccessor="end"
          className="bg-white"
          // culture='pl'
          min={dateWithHour(undefined, 6)}
          // max={dateWithHour(undefined, 22)}
        />
      </div>
    </>
  );
};

export default Scheduler;
