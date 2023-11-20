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

export function extractHourFromDate(date: ValidDayjsDate) {
  return dayjs(date).hour();
}

export function changeHourToDate(hour: number) {
  return dayjs().hour(hour).minute(0).format('HH:mm');
}

export function dateWithHour(date: ValidDayjsDate, hour: number) {
  return dayjs(date ?? undefined)
    .hour(hour)
    .minute(0)
    .second(0)
    .toDate();
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
  return dateWithHour(dayDate, extractHourFromDate(hourDate));
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

export function nextDay(date: ValidDayjsDate) {
  return dayjs(date).add(1, 'd').toDate();
}

export function advanceByMinutes(date: ValidDayjsDate, minutes: number) {
  return dayjs(date).add(minutes, 'm').toDate();
}

export function displayDatesAsTimespan(
  startDate: ValidDayjsDate,
  endDate: ValidDayjsDate
) {
  return `${extractHourStringFromDate(startDate)} - ${extractHourStringFromDate(
    endDate
  )}`;
}

export function displayDatesAsFullTimespan(
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
