import type { ManipulateType } from 'dayjs';

import dayjs from '~/lib/dayjs';

import type { NullableDate } from '~/types/forms';

export function extractDateStringFromDate(date: NullableDate) {
  return date ? dayjs(date).format('DD.MM.YYYY') : '--.--.----';
}

export function extractHourStringFromDate(date: NullableDate) {
  return date ? dayjs(date).format('HH:mm') : '--:--';
}

export function extractHourFromDate(date: Date) {
  return dayjs(date).hour();
}

export function changeHourToDate(hour: number) {
  return dayjs().hour(hour).minute(0).format('HH:mm');
}

export function dateWithHour(date: NullableDate, hour: number) {
  return dayjs(date ?? undefined)
    .hour(hour)
    .minute(0)
    .second(0)
    .toDate();
}

export function create(date: Date, hour: number) {
  return dayjs(date).hour(hour).minute(0).toDate();
}

export function displayDateWithHours(date: Date) {
  return dayjs(date).format('DD.MM.YYYY HH:mm');
}

export function mergeDayDateAndHourDate(dayDate: Date, hourDate: Date) {
  return dateWithHour(dayDate, extractHourFromDate(hourDate));
}

export function displayDayDateAndHourDate(
  dayDate: Date | null,
  hourDate: Date | null
) {
  return `${extractDateStringFromDate(dayDate)} ${extractHourStringFromDate(
    hourDate
  )}`;
}

export function getDateAfter(
  date: Date,
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

export function advanceDateByNMinutes(date: Date, minutes: number) {
  return dayjs(date).add(minutes, 'm').toDate();
}

export function nextDay(date: Date) {
  return dayjs(date).add(1, 'd').toDate();
}

export function advanceByMinutes(date: Date, minutes: number) {
  return dayjs(date).add(minutes, 'm').toDate();
}
