import type { ServiceWithBusyHours } from '~/schemas/api/services';

import type { TimeInterval } from '~/types/service';

import {
  ValidDayjsDate,
  advanceByMinutes,
  dateWithHour,
  getTime,
  isAfter,
  isAfterOrSame,
  isBefore,
  isBeforeOrSame,
  minutesBetween
} from './dateUtils';

/**
 * Calculates the busy hours by using intersection on the sets of working hours
 * @param allEmployeeWorkingHours the working hours of all employees
 * @returns the list with time intervals when all employees are busy
 */
export const calculateBusyHours = (busyHours: TimeInterval[][]) => {
  let calculatedBusyHours = busyHours[0] ?? [];

  busyHours.slice(1).forEach((singleEmployeeWorkingHours) => {
    const newBusyHours: TimeInterval[] = [];

    // check the hour conflicts between employees
    // by comparing employee working hours with the rest of the employees
    singleEmployeeWorkingHours.forEach((interval) => {
      const conflicts = calculatedBusyHours.filter(
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

    calculatedBusyHours = [...newBusyHours];
  });

  return calculatedBusyHours;
};

/**
 * Merges busy hours into larger intervals
 * by using the sum of the sets of working hours
 * This is useful when calculating busy hours for multiple services at once
 * @param busyHours
 * @returns
 */
export const mergeBusyHours = (busyHours: TimeInterval[][]) => {
  let mergedBusyHours = busyHours[0] ?? [];

  busyHours.slice(1).forEach((singleServiceBusyHours) => {
    const newBusyHours: TimeInterval[] = [];

    // check the hour conflicts between employees
    // by comparing employee working hours with the rest of the employees
    singleServiceBusyHours.forEach((interval) => {
      const conflicts = mergedBusyHours.filter(
        (busyInterval) =>
          // four cases:
          // - interval starts before and finishes while busy
          // - interval is contained inside busy interval
          // - busy interval contains interval
          // - interval starts while busy and finishes after
          isAfterOrSame(interval.endDate, busyInterval.startDate) &&
          isAfterOrSame(busyInterval.endDate, interval.startDate)
      );

      const otherIntervals = mergedBusyHours.filter(
        (interval) => !conflicts.includes(interval)
      );

      newBusyHours.push(...otherIntervals);

      // create new intervals from conflicting intervals
      // these are the merged intervals with the current one
      const conflictingIntervals = conflicts.map((conflict) => {
        return {
          startDate: isAfter(interval.startDate, conflict.startDate)
            ? conflict.startDate
            : interval.startDate,
          endDate: isAfter(interval.endDate, conflict.endDate)
            ? interval.endDate
            : conflict.endDate
        };
      });

      const currentInterval = {
        startDate: new Date(0).toISOString(),
        endDate: new Date(0).toISOString()
      };

      // there could happen that calculated intervals overlaps with each other
      // so we need to merge them into larger intervals
      conflictingIntervals
        .toSorted((a, b) => getTime(b.startDate) - getTime(a.startDate))
        .forEach((conflict, i) => {
          if (i === 0) {
            currentInterval.startDate = conflict.startDate;
            currentInterval.endDate = conflict.endDate;
          } else {
            const nextConflict = conflictingIntervals[i + 1];

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
          }
        });
    });

    mergedBusyHours = newBusyHours.toSorted(
      (a, b) => getTime(b.startDate) - getTime(a.startDate)
    );
  });

  return mergedBusyHours;
};

export function getDisplayedHours(
  currentDate: ValidDayjsDate,
  start: number,
  end: number,
  step: number
) {
  const hourList: string[] = [];

  const startHour = dateWithHour(currentDate, start).toISOString();
  const endHour = dateWithHour(currentDate, end).toISOString();

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
