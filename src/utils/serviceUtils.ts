import { difference } from 'lodash';

import type { OrderedService } from '~/schemas/api/services';

import { calculateServiceCostAndDuration } from '~/stores/orderService/utils';

import type { TimeInterval } from '~/types/service';

import {
  type ValidDayjsDate,
  advanceByMinutes,
  dateWithHour,
  getTime,
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
export const calculateBusyHours = (
  allEmployeeWorkingHours: TimeInterval[][]
) => {
  let busyHours = allEmployeeWorkingHours[0] ?? [];

  allEmployeeWorkingHours.slice(1).forEach((singleEmployeeWorkingHours) => {
    const newBusyHours: TimeInterval[] = [];

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

/**
 * Merges busy hours into larger intervals
 * by using the sum of the sets of working hours
 *
 * This is useful when calculating busy hours for multiple services at once
 * @param busyHours
 * @returns
 */
export const mergeBusyHours = (busyHours: TimeInterval[][]) => {
  const currentInterval = {
    startDate: new Date(0).toISOString(),
    endDate: new Date(0).toISOString()
  };

  const mergedBusyHours = busyHours.flatMap((busyHours) => busyHours);

  mergedBusyHours.sort((a, b) => getTime(a.startDate) - getTime(b.startDate));

  const newBusyHours: TimeInterval[] = [];

  mergedBusyHours.forEach((conflict, i) => {
    if (i === 0) {
      currentInterval.startDate = conflict.startDate;
      currentInterval.endDate = conflict.endDate;
    }
    const nextConflict = mergedBusyHours[i + 1];

    if (
      nextConflict &&
      isAfterOrSame(conflict.endDate, nextConflict.startDate)
    ) {
      currentInterval.endDate = nextConflict.endDate;
    } else {
      newBusyHours.push({ ...currentInterval });

      currentInterval.endDate = nextConflict
        ? nextConflict.endDate
        : conflict.endDate;
      currentInterval.startDate = nextConflict
        ? nextConflict.startDate
        : conflict.startDate;
    }
  });

  return newBusyHours;
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
  busyHours: TimeInterval[]
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
