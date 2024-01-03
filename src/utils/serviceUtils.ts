import { difference } from 'lodash';

import type { OrderedService, Service } from '~/schemas/api/services';
import type { Timeslot } from '~/schemas/forms/orderService';

import { calculateServiceCostAndDuration } from '~/stores/orderService/utils';

import {
  type ValidDayjsDate,
  advanceByMinutes,
  dateWithHour,
  isAfter,
  isAfterOrSame,
  isBeforeOrSame,
  minutesBetween,
  nextDay
} from './dateUtils';

/**
 * Calculates the busy hours by using intersection on the sets of working hours
 * @param allEmployeeWorkingHours the working hours of all employees
 * @returns the list with time intervals when all employees are busy
 */
export const timeslotsIntersection = (
  allEmployeeWorkingHours: Timeslot[][]
) => {
  let busyHours = allEmployeeWorkingHours[0] ?? [];

  allEmployeeWorkingHours.slice(1).forEach((singleEmployeeWorkingHours) => {
    const newBusyHours: Timeslot[] = [];

    // check the hour conflicts between employees
    // by comparing employee working hours with the rest of the employees
    singleEmployeeWorkingHours.forEach((interval) => {
      const conflicts = busyHours.filter(
        (busyInterval) =>
          // four cases:
          // - interval starts before and finishes while busy
          // - interval is contained inside busy interval
          // - busy interval contains interval
          // - interval starts while busy and finishes after
          isAfter(interval.endDate, busyInterval.startDate) &&
          isAfter(busyInterval.endDate, interval.startDate)
      );

      conflicts.forEach((conflict) => {
        newBusyHours.push({
          startDate: isAfter(interval.startDate, conflict.startDate)
            ? interval.startDate
            : conflict.startDate,
          endDate: isAfter(interval.endDate, conflict.endDate)
            ? conflict.endDate
            : interval.endDate
        });
      });
    });

    busyHours = [...newBusyHours];
  });

  return busyHours;
};

export function getDisplayedHours(
  currentDate: ValidDayjsDate,
  start: number,
  end: number,
  step: number
) {
  const hourList: string[] = [];

  const date = currentDate ?? nextDay(new Date());

  const startHour = dateWithHour(date, start).toISOString();
  const endHour = dateWithHour(date, end).toISOString();

  const minutesDifference = minutesBetween(startHour, endHour);

  for (let i = 0; i <= minutesDifference; i += step) {
    const hour = advanceByMinutes(startHour, i).toISOString();
    hourList.push(hour);
  }

  return hourList;
}

export function getHourAvailabilityData(
  currentDate: ValidDayjsDate,
  busyHours: Timeslot[]
) {
  return getDisplayedHours(currentDate, 7, 19, 30).map((hour) => ({
    hour,
    available: busyHours.reduce((acc, busyHour) => {
      const isBusy =
        isAfterOrSame(hour, busyHour.startDate) &&
        isBeforeOrSame(hour, busyHour.endDate);
      return acc && !isBusy;
    }, true)
  }));
}

export function findMainService(services: Array<OrderedService | undefined>) {
  return services.find((service) => service?.isMainServiceForReservation);
}

export function getStartDateForService(
  orderedServices: Array<OrderedService | undefined>,
  positionOnList: number,
  baseStartDate: ValidDayjsDate
) {
  const mainService = findMainService(orderedServices);

  const services = [
    mainService,
    ...difference(orderedServices, [mainService])
  ].slice(0, positionOnList);

  return services.reduce((acc, service) => {
    const duration = calculateServiceCostAndDuration(service).durationInMinutes;

    return advanceByMinutes(acc, duration);
  }, baseStartDate);
}

export const getLabelForServiceUnit = (service: Service) => {
  const { unit } = service;
  return unit ? `${unit.price} zł/${unit.shortName}` : '---';
};
