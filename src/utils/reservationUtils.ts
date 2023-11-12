import { frequencyToDescriptionMap } from '~/constants/mappings';
import type { Reservation } from '~/schemas/api/reservation';
import { displayDateWithHours } from './dateUtils';

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
