import { frequencyToDescriptionMap } from '~/constants/mappings';
import { reservation } from '~/constants/queryKeys';

import type {
  EmployeeWithVisits,
  ReservationWithVisits
} from '~/schemas/api/reservation';
import type {
  EmployeeReservation,
  Reservation,
  ReservationWithExtendedVisits,
  VisitPartWithServiceAndReservation
} from '~/schemas/api/reservation';
import type { BasicServiceData } from '~/schemas/api/services';

import { displayDateWithHours } from './dateUtils';
import { getCumulatedStatus, getVisitStartEndDates } from './visitUtils';

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

export const getReservationEndDate = (
  reservation: ReservationWithVisits | ReservationWithExtendedVisits
) => {
  const visitParts = reservation.visits.flatMap((visit) => visit.visitParts);

  visitParts.sort((a, b) => {
    return new Date(b.endDate).getTime() - new Date(a.endDate).getTime();
  });

  return visitParts[0]!.endDate;
};

export const getVisitPartsFromReservation = (
  reservation: ReservationWithVisits | ReservationWithExtendedVisits
) => {
  return reservation.visits.flatMap((visit) => visit.visitParts);
};

export const getReservationStatus = (
  reservation: ReservationWithVisits | ReservationWithExtendedVisits
) => {
  return getCumulatedStatus(
    getVisitPartsFromReservation(reservation).map(
      (visitPart) => visitPart.status
    )
  );
};
