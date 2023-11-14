import {
  frequencyToDescriptionMap,
  reservationStatusMap
} from '~/constants/mappings';
import type {
  EmployeeWithStatus,
  Reservation
} from '~/schemas/api/reservation';
import { displayDateWithHours } from './dateUtils';
import { Status } from '~/types/enums';

export const getMainServiceForReservation = (reservation: Reservation) => {
  return reservation.services?.find(
    (service) => service.isMainServiceForReservation
  );
};

export const getExtraServicesForReservation = (reservation: Reservation) => {
  return reservation.services?.filter(
    (service) => service.isMainServiceForReservation
  );
};

export const createReservationTitle = (reservation: Reservation) => {
  const mainServiceName =
    getMainServiceForReservation(reservation)?.service.name;
  const frequencyName = frequencyToDescriptionMap.get(reservation.frequency);

  return `${mainServiceName}, ${frequencyName}, from ${displayDateWithHours(
    reservation?.visits?.[0]?.startDate
  )}`;
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
