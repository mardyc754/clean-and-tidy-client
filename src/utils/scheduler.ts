import { type EventAttributes, type EventStatus, createEvents } from 'ics';
import { omit } from 'lodash';

import type { AuthenticatedUser } from '~/schemas/api/auth';
import type {
  EmployeeWithVisits,
  ReservationWithExtendedVisits,
  ReservationWithVisits,
  VisitPartWithServiceAndReservation
} from '~/schemas/api/reservation';

import type { VisitEvent } from '~/components/organisms/scheduler/Scheduler';

import { Status } from '~/types/enums';

import { convertISOStringToDate } from './dateUtils';
import {
  createReservationTitle,
  createReservationTitleForEmployee,
  createVisitPartTitleForAdmin
} from './reservationUtils';
import { generateAddressAsString, getUserFullName } from './userUtils';
import { getStatusFromVisitParts, getVisitStartEndDates } from './visitUtils';

const reservationStatusesToEventOnes = new Map([
  [Status.TO_BE_CONFIRMED, 'TENTATIVE'],
  [Status.ACTIVE, 'CONFIRMED'],
  [Status.CLOSED, 'CANCELLED'],
  [Status.TO_BE_CANCELLED, 'TENTATIVE'],
  [Status.CANCELLED, 'CANCELLED'],
  [Status.UNKNOWN, 'TENTATIVE']
]);

export const getEventsFromReservation = (
  reservation: ReservationWithVisits
) => {
  const visits =
    reservation.visits.filter((visit) => {
      const visitStatus = getStatusFromVisitParts(visit.visitParts);
      return visitStatus !== Status.CLOSED && visitStatus !== Status.CANCELLED;
    }) ?? [];

  const title = createReservationTitle(reservation);

  return visits.map((visit) => {
    const { startDate, endDate } = getVisitStartEndDates(visit);
    return {
      title: title,
      start: convertISOStringToDate(startDate),
      end: convertISOStringToDate(endDate),
      resource: {
        visitId: visit.id,
        serviceFullName:
          reservation.services.find((service) => {
            return service.isMainServiceForReservation;
          })?.name ?? 'Visit Details',
        reservationName: reservation.name
      }
    };
  });
};

export const getEventsFromVisitParts = (
  visits: VisitPartWithServiceAndReservation[]
) => {
  return visits
    .filter((visit) => visit.status !== Status.CANCELLED)
    .map((visit) => {
      return {
        title: createReservationTitleForEmployee(
          visit.reservation,
          visit.service
        ),
        start: convertISOStringToDate(visit.startDate),
        end: convertISOStringToDate(visit.endDate),
        resource: { visitId: visit.id, serviceFullName: visit.service.name }
      };
    });
};

export const getEventsFromEmployees = (employees: EmployeeWithVisits[]) => {
  return employees.map((employee) => ({
    ...omit(employee, 'visitParts'),
    visits: employee.visitParts
      .filter((visit) => visit.status !== Status.CANCELLED)
      .map((visit) => ({
        title: createVisitPartTitleForAdmin(employee, visit),
        start: convertISOStringToDate(visit.startDate),
        end: convertISOStringToDate(visit.endDate),
        resource: { visitId: visit.id, serviceFullName: visit.service.name }
      }))
  }));
};

export const getMaxEndDateFromReservationVisits = (visits: VisitEvent[]) => {
  const endDates = visits.map((visit) => visit.end!);

  const maxDate = Math.max(...endDates.map((date) => new Date(date).getTime()));

  return new Date(maxDate);
};

const generateIcsFile = async (
  events: EventAttributes[],
  calendarNamePrefix: string,
  calendarNameSuffix?: string
) => {
  const filename = `${calendarNamePrefix}${
    calendarNameSuffix ? `- ${calendarNameSuffix}` : ''
  }.ics`;
  const file = await new Promise<File>((resolve, reject) => {
    createEvents(events, (error, value) => {
      if (error) {
        reject(error);
      }

      resolve(
        new File([value], filename, {
          type: 'text/calendar'
        })
      );
    });
  });

  const url = URL.createObjectURL(file);

  const anchor = document.createElement('a');
  anchor.href = url;
  anchor.download = filename;

  document.body.appendChild(anchor);
  anchor.click();
  document.body.removeChild(anchor);

  URL.revokeObjectURL(url);
};

export const generateIcsFileFromVisitEvents = async (
  visitEvents: VisitEvent[],
  owner: Omit<AuthenticatedUser, 'isAdmin'>,
  extraOptions?: Partial<{
    calendarNameSuffix: string;
    organizer: EventAttributes['organizer'];
    attendees: EventAttributes['attendees'];
    location: EventAttributes['location'];
  }>
) => {
  const calendarNamePrefix = getUserFullName(owner) ?? 'Visit calendar';

  const events = visitEvents.map((visitEvent) => {
    const { start, end, title } = visitEvent;

    return {
      startOutputType: 'local',
      start: start!.getTime(),
      end: end!.getTime(),
      title: title,
      calName: calendarNamePrefix,
      attendees: extraOptions?.attendees,
      organizer: extraOptions?.organizer,
      location: extraOptions?.location
    } satisfies EventAttributes;
  });

  await generateIcsFile(
    events,
    calendarNamePrefix,
    extraOptions?.calendarNameSuffix
  );
};

export const generateIcsFromReservationList = async (
  reservationList: ReservationWithExtendedVisits[],
  owner: Omit<AuthenticatedUser, 'isAdmin'>,
  extraOptions?: Partial<{
    calendarNameSuffix: string;
  }>
) => {
  const calendarNamePrefix = getUserFullName(owner) ?? 'Visit calendar';

  const events = reservationList.flatMap((reservation) => {
    const { visits, address, extraInfo } = reservation;

    return visits.map((visit) => {
      const numberOfVisitParts = visit.visitParts.length;

      const visitStatus = getStatusFromVisitParts(visit.visitParts);

      return {
        start: convertISOStringToDate(visit.visitParts[0]!.startDate).getTime(),
        end: convertISOStringToDate(
          visit.visitParts[numberOfVisitParts - 1]!.endDate
        ).getTime(),
        calName: calendarNamePrefix,
        title: createReservationTitle(reservation),
        location: address ? generateAddressAsString(address) : undefined,
        description: extraInfo ?? undefined,
        status: reservationStatusesToEventOnes.get(visitStatus) as
          | EventStatus
          | undefined
      } satisfies EventAttributes;
    });
  });

  await generateIcsFile(
    events,
    calendarNamePrefix,
    extraOptions?.calendarNameSuffix
  );
};

export const generateIscFileForReservationVisits = async (
  visitEvents: VisitPartWithServiceAndReservation[],
  owner: Omit<AuthenticatedUser, 'isAdmin'>,
  extraOptions?: Partial<{
    calendarNameSuffix: string;
    organizer: EventAttributes['organizer'];
    attendees: EventAttributes['attendees'];
    location: EventAttributes['location'];
  }>
) => {
  const calendarNamePrefix = getUserFullName(owner) ?? 'Visit calendar';

  const events = visitEvents
    .filter(
      (visit) =>
        visit.status !== Status.CLOSED && visit.status !== Status.CANCELLED
    )
    .map((visitEvent) => {
      const { reservation, service, startDate, endDate } = visitEvent;

      return {
        startOutputType: 'local',
        start: new Date(startDate).getTime(),
        end: new Date(endDate).getTime(),
        title: createReservationTitleForEmployee(reservation, service),
        calName: calendarNamePrefix,
        location: reservation.address
          ? generateAddressAsString(reservation.address)
          : undefined,
        status: reservationStatusesToEventOnes.get(reservation.status) as
          | EventStatus
          | undefined
      } satisfies EventAttributes;
    });

  await generateIcsFile(
    events,
    calendarNamePrefix,
    extraOptions?.calendarNameSuffix
  );
};
