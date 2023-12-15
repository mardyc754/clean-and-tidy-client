import type { ManipulateType } from 'dayjs';

import {
  frequencyToDescriptionMap,
  frequencyToPrefixMap
} from '~/constants/mappings';

import dayjs from '~/lib/dayjs';

import type { CleaningFrequency } from '~/types/enums';

export type ValidDayjsDate =
  | dayjs.Dayjs
  | Date
  | string
  | number
  | null
  | undefined;

export function extractDateStringFromDate(date: ValidDayjsDate) {
  return date ? dayjs(date).format('DD.MM.YYYY') : '--.--.----';
}

export function extractHourStringFromDate(date: ValidDayjsDate) {
  return date ? dayjs(date).format('HH:mm') : '--:--';
}

export function changeHourToDate(hour: number) {
  return dayjs().hour(hour).minute(0).format('HH:mm');
}

export function dateWithHour(date: ValidDayjsDate, hour: number, minute = 0) {
  return dayjs(date).hour(hour).minute(minute).second(0).toDate();
}

export function create(date: ValidDayjsDate, hour: number) {
  return dayjs(date).hour(hour).minute(0).toDate();
}

export function displayDateWithHours(date: ValidDayjsDate) {
  return dayjs(date).format('DD.MM.YYYY HH:mm');
}

export function mergeDayDateAndHourDate(
  dayDate: ValidDayjsDate,
  hourDate: ValidDayjsDate
) {
  return dateWithHour(
    dayDate,
    dayjs(hourDate).hour(),
    dayjs(hourDate).minute()
  );
}

export function displayDayDateAndHourDate(
  dayDate: ValidDayjsDate,
  hourDate: ValidDayjsDate
) {
  return `${extractDateStringFromDate(dayDate)} ${extractHourStringFromDate(
    hourDate
  )}`;
}

export function getDateAfter(
  date: ValidDayjsDate,
  duration: number,
  unit?: ManipulateType
) {
  return dayjs(date).add(duration, unit).toDate();
}

export function displayTimeInHours(duration: number) {
  const durationObject = dayjs.duration(duration, 'm');
  const hours = durationObject.hours();
  const minutes = durationObject.minutes();

  return `${
    hours === 0 ? '' : `${hours} ${hours === 1 ? 'hour' : 'hours'} `
  }${minutes} ${minutes === 1 ? 'minute' : 'minutes'}`;
}

export function advanceDateByNMinutes(date: ValidDayjsDate, minutes: number) {
  return dayjs(date).add(minutes, 'm').toDate();
}

export function advanceDateByWeeks(date: ValidDayjsDate, weeks: number) {
  return dayjs(date).add(weeks, 'w').toDate();
}

export function nextDay(date: ValidDayjsDate) {
  return dayjs(date).add(1, 'd').toDate();
}

export function advanceByMinutes(date: ValidDayjsDate, minutes: number) {
  return dayjs(date).add(minutes, 'm').toDate();
}

export function displayDatesAsTimeslot(
  startDate: ValidDayjsDate,
  endDate: ValidDayjsDate
) {
  return `${extractHourStringFromDate(startDate)} - ${extractHourStringFromDate(
    endDate
  )}`;
}

export function displayDatesAsFullTimeslot(
  startDate: ValidDayjsDate,
  endDate: ValidDayjsDate
) {
  return `${displayDateWithHours(startDate)} - ${extractHourStringFromDate(
    endDate
  )}`;
}

export function convertISOStringToDate(date: string) {
  return dayjs(date).toDate();
}

export function daysBetween(
  startDate: ValidDayjsDate,
  endDate: ValidDayjsDate
) {
  return Math.abs(dayjs(endDate).diff(startDate, 'day'));
}

export function minutesBetween(
  startDate: ValidDayjsDate,
  endDate: ValidDayjsDate
) {
  return Math.abs(dayjs(endDate).diff(startDate, 'minute'));
}

export function hoursBetween(
  startDate: ValidDayjsDate,
  endDate: ValidDayjsDate
) {
  return Math.abs(dayjs(endDate).diff(startDate, 'hour'));
}

export function getWeekDayName(date: ValidDayjsDate) {
  return dayjs(date).format('dddd');
}

export function getWeekDayNameWithFrequency(
  date: ValidDayjsDate,
  frequency: CleaningFrequency
) {
  const prefix = frequencyToPrefixMap.get(frequency);

  return `${prefix}${getWeekDayName(date)}`;
}

export function getWeekDayNameWithFrequencyAndDate(
  date: ValidDayjsDate,
  frequency: CleaningFrequency
) {
  const frequencyDescription = frequencyToDescriptionMap.get(frequency);
  return `${frequencyDescription}, from ${displayDateWithHours(date)}`;
}

export function isTheSameDay(
  firstDate: ValidDayjsDate,
  secondDate: ValidDayjsDate
) {
  return dayjs(firstDate).isSame(secondDate, 'day');
}

export function isAfter(firstDate: ValidDayjsDate, secondDate: ValidDayjsDate) {
  return dayjs(firstDate).isAfter(secondDate);
}

export function isBefore(
  firstDate: ValidDayjsDate,
  secondDate: ValidDayjsDate
) {
  return dayjs(firstDate).isBefore(secondDate);
}

export function isAfterOrSame(
  firstDate: ValidDayjsDate,
  secondDate: ValidDayjsDate
) {
  return (
    dayjs(firstDate).isAfter(secondDate) || dayjs(firstDate).isSame(secondDate)
  );
}

export function isBeforeOrSame(
  firstDate: ValidDayjsDate,
  secondDate: ValidDayjsDate
) {
  return (
    dayjs(firstDate).isBefore(secondDate) || dayjs(firstDate).isSame(secondDate)
  );
}

export function isSame(firstDate: ValidDayjsDate, secondDate: ValidDayjsDate) {
  return dayjs(firstDate).isSame(secondDate);
}

export const startOfDay = (date: ValidDayjsDate) =>
  dayjs(date).startOf('day').toDate();

export const endOfDay = (date: ValidDayjsDate) =>
  dayjs(date).endOf('day').toDate();

export const getTime = (date: ValidDayjsDate) => dayjs(date).toDate().getTime();

export const nextDayTimeSlot = () => {
  const nextDay = dayjs().add(1, 'day');
  return {
    from: nextDay.startOf('day').toISOString(),
    to: nextDay.endOf('day').toISOString()
  };
};

export const startOfWeek = (date: ValidDayjsDate) =>
  dayjs(date).startOf('week').toDate();

export const endOfWeek = (date: ValidDayjsDate) =>
  dayjs(date).endOf('week').toDate();

export const getTimeSlot = (date: ValidDayjsDate, duration: number) => {
  return {
    startDate: dayjs(date).toISOString(),
    endDate: advanceByMinutes(date, duration).toISOString()
  };
};

export const weekOfYear = (date: ValidDayjsDate) => dayjs(date).week();

export const getDaysBetween = (
  startDate: ValidDayjsDate,
  endDate: ValidDayjsDate
) => {
  const days = [];
  let currentDate = startDate;

  while (isBeforeOrSame(currentDate, endDate)) {
    days.push(currentDate);
    currentDate = nextDay(currentDate);
  }

  return days;
};

export const getYearFromDate = (date: ValidDayjsDate) => dayjs(date).year();

export const getClosestDateFromNow = (dates: ValidDayjsDate[]) => {
  const now = dayjs();
  const futureDates = dates.filter((date) => isAfter(date, now));

  futureDates.sort((a, b) => getTime(a) - getTime(b));

  return futureDates[0];
  // const closestDate = futureDates.reduce((closest, date) => {
  //   const dateDiff = Math.abs(dayjs(date).diff(now));
  //   const closestDiff = Math.abs(dayjs(closest).diff(now));

  //   return dateDiff < closestDiff ? date : closest;
  // });

  // return closestDate;
};

export const extractYearAndMonthFromDateToString = (date: ValidDayjsDate) => {
  const year = dayjs(date).year();
  const month = dayjs(date).month();
  return `${year}-${month}`;
};

export const timeDifferenceBetween = (
  end: ValidDayjsDate,
  start: ValidDayjsDate
) => {
  const duration = dayjs.duration(dayjs(end).diff(start));
  return duration.asMinutes();
};
