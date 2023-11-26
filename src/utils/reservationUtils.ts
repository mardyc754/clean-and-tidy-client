import {
  frequencyToDescriptionMap,
  reservationStatusMap
} from '~/constants/mappings';

import { Employee, EmployeeWithVisits } from '~/schemas/api/employee';
import type {
  EmployeeWithStatus,
  Reservation,
  ReservationWithExtendedVisits,
  ReservationWithServices
} from '~/schemas/api/reservation';

import { Status } from '~/types/enums';

import { displayDateWithHours } from './dateUtils';
import { getVisitStartEndDates } from './visitUtils';

export const getMainServiceForReservation = (
  reservation: ReservationWithServices
) => {
  return reservation.services?.find(
    (service) => service.isMainServiceForReservation
  );
};

export const getExtraServicesForReservation = (
  reservation: ReservationWithServices
) => {
  return reservation.services?.filter(
    (service) => service.isMainServiceForReservation
  );
};

export const createReservationTitle = (
  reservation: ReservationWithExtendedVisits
) => {
  const mainServiceName =
    getMainServiceForReservation(reservation)?.service.name;
  const frequencyName = frequencyToDescriptionMap.get(reservation.frequency);

  return `${mainServiceName}, ${frequencyName}, from ${displayDateWithHours(
    getVisitStartEndDates(reservation.visits[0]!).startDate
  )}`;
};

export const createReservationTitleForAdmin = (
  employee: EmployeeWithVisits,
  reservation: Reservation
) => {
  const { firstName, lastName } = employee;

  const mainServiceName =
    getMainServiceForReservation(reservation)?.service.name;

  const frequencyName = frequencyToDescriptionMap.get(reservation.frequency);

  return `${firstName} ${lastName}, ${mainServiceName}, ${frequencyName}`;
};

export const createReservationTitleForEmployee = (reservation: Reservation) => {
  const { bookerFirstName, bookerLastName } = reservation;

  const mainServiceName =
    getMainServiceForReservation(reservation)?.service.name;

  const frequencyName = frequencyToDescriptionMap.get(reservation.frequency);

  return `${bookerFirstName} ${bookerLastName}, ${mainServiceName}, ${frequencyName}`;
};

export const getStatusFromEmployees = (employees: EmployeeWithStatus[]) => {
  const statuses = employees.map((employee) => employee.status);

  if (statuses.includes(Status.TO_BE_CONFIRMED)) {
    return Status.TO_BE_CONFIRMED;
  }

  if (
    statuses.some((status) => status === Status.ACTIVE) &&
    !statuses.includes(Status.TO_BE_CONFIRMED) &&
    !statuses.includes(Status.TO_BE_CANCELLED)
  ) {
    return Status.ACTIVE;
  }

  if (statuses.some((status) => status === Status.TO_BE_CANCELLED)) {
    return Status.TO_BE_CANCELLED;
  }

  if (
    statuses.every(
      (status) => status === Status.CLOSED || status === Status.CANCELLED
    )
  ) {
    return Status.CLOSED;
  }

  return Status.UNKNOWN;
};

export const getReservationStatusDescription = (
  employees: EmployeeWithStatus[] | undefined
) => {
  return employees
    ? reservationStatusMap.get(getStatusFromEmployees(employees ?? []))
    : undefined;
};
