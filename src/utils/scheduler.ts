import { EventAttributes, createEvent, createEvents } from 'ics';
import { omit } from 'lodash';

import type {
  EmployeeWithVisits,
  ReservationWithVisits,
  VisitPartWithServiceAndReservation
} from '~/schemas/api/reservation';

import type { VisitEvent } from '~/components/organisms/scheduler/Scheduler';

import { convertISOStringToDate } from './dateUtils';
import {
  createReservationTitle,
  createReservationTitleForEmployee,
  createVisitPartTitleForAdmin
} from './reservationUtils';
import { getVisitStartEndDates } from './visitUtils';

export const getEventsFromReservation = (
  reservation: ReservationWithVisits
) => {
  const visits = reservation.visits ?? [];

  const title = createReservationTitle(reservation);

  return visits.map((visit) => {
    const { startDate, endDate } = getVisitStartEndDates(visit);
    return {
      title: title,
      start: convertISOStringToDate(startDate),
      end: convertISOStringToDate(endDate),
      resource: { visitId: visit.id }
    };
  });
};

export const getEventsFromVisitParts = (
  visits: VisitPartWithServiceAndReservation[]
) => {
  return visits.map((visit) => {
    return {
      title: createReservationTitleForEmployee(
        visit.reservation,
        visit.service
      ),
      start: convertISOStringToDate(visit.startDate),
      end: convertISOStringToDate(visit.endDate),
      resource: { visitId: visit.id }
    };
  });
};

export const getEventsFromEmployees = (employees: EmployeeWithVisits[]) => {
  return employees.map((employee) => ({
    ...omit(employee, 'visitParts'),
    visits: employee.visitParts.map((visit) => ({
      title: createVisitPartTitleForAdmin(employee, visit),
      start: convertISOStringToDate(visit.startDate),
      end: convertISOStringToDate(visit.endDate),
      resource: { visitId: visit.id }
    }))
  }));
};

export const getMaxEndDateFromReservationVisits = (visits: VisitEvent[]) => {
  const endDates = visits.map((visit) => visit.end!);

  const maxDate = Math.max(...endDates.map((date) => new Date(date).getTime()));

  return new Date(maxDate);
};

// export const generateIcsFile = async (reservation: ReservationWithVisits) => {
export const generateIcsFile = async (visitEvents: VisitEvent[]) => {
  const events = visitEvents.map((visitEvent) => {
    const { start, end, title } = visitEvent;

    return {
      startOutputType: 'local',
      start: start!.getTime(),
      end: end!.getTime(),
      title: title
      // alarms: alarms
    } satisfies EventAttributes;
  });

  const filename = 'ExampleEvent.ics';
  const file = await new Promise<File>((resolve, reject) => {
    createEvents(events, (error, value) => {
      if (error) {
        reject(error);
      }

      resolve(new File([value], filename, { type: 'text/calendar' }));
    });
  });

  const url = URL.createObjectURL(file);

  // trying to assign the file URL to a window could cause cross-site
  // issues so this is a workaround using HTML5
  const anchor = document.createElement('a');
  anchor.href = url;
  anchor.download = filename;

  document.body.appendChild(anchor);
  anchor.click();
  document.body.removeChild(anchor);

  URL.revokeObjectURL(url);
};
