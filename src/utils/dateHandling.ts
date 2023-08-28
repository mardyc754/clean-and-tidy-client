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
