import { frequencyToDescriptionMap } from '~/constants/mappings';

import type { EmployeeWithVisits } from '~/schemas/api/reservation';
import type {
  EmployeeReservation,
  Reservation,
  ReservationWithExtendedVisits,
  VisitPartWithServiceAndReservation
} from '~/schemas/api/reservation';
import type { BasicServiceData } from '~/schemas/api/services';

import { displayDateWithHours } from './dateUtils';
import { getVisitStartEndDates } from './visitUtils';

export const getMainServiceForReservation = (
  reservation: EmployeeReservation | ReservationWithExtendedVisits
) => {
  return reservation.services?.find(
    (service) => service.isMainServiceForReservation
  );
};

export const getExtraServicesForReservation = (
  reservation: EmployeeReservation
) => {
  return reservation.services?.filter(
    (service) => service.isMainServiceForReservation
  );
};

export const createReservationTitle = (
  reservation: ReservationWithExtendedVisits | EmployeeReservation
) => {
  const mainServiceName = getMainServiceForReservation(reservation)?.name;
  const frequencyName = frequencyToDescriptionMap.get(reservation.frequency);

  return `${mainServiceName}, ${frequencyName}, from ${displayDateWithHours(
    getVisitStartEndDates(reservation.visits[0]!).startDate
  )}`;
};

export const createVisitPartTitleForAdmin = (
  employee: EmployeeWithVisits,
  visitPart: VisitPartWithServiceAndReservation
  // reservation: Reservation
) => {
  const { firstName, lastName } = employee;

  const serviceName = visitPart.service.name;

  // const frequencyName = frequencyToDescriptionMap.get(reservation.frequency);

  // return `${firstName} ${lastName}, ${serviceName}, ${frequencyName}`;
  return `${firstName} ${lastName}, ${serviceName}`;
};

export const createReservationTitleForEmployee = (
  reservation: Reservation,
  service?: BasicServiceData
) => {
  const { bookerFirstName, bookerLastName } = reservation;

  const serviceName = service?.name ?? 'Service';

  const frequencyName = frequencyToDescriptionMap.get(reservation.frequency);

  return `${bookerFirstName} ${bookerLastName}, ${serviceName}, ${frequencyName}`;
};
