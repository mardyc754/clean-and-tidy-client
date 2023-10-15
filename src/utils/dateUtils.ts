import type { ManipulateType } from 'dayjs';

import dayjs from '~/lib/dayjs';

export function extractHourFromDate(date: Date) {
  return dayjs(date).format('HH:mm');
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
