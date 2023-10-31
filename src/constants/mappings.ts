import { CleaningFrequency, ReservationStatus } from '~/types/enums';

export const changeDataModeData = [
  {
    name: 'Once',
    value: 'once'
  },
  {
    name: 'Permanently',
    value: 'permanently'
  }
];

export const frequencyValues = [
  {
    name: 'Once',
    value: CleaningFrequency.ONCE
  },
  {
    name: 'Once a week',
    value: CleaningFrequency.ONCE_A_WEEK
  },
  {
    name: 'Every two weeks',
    value: CleaningFrequency.EVERY_TWO_WEEKS
  },
  {
    name: 'Once a month',
    value: CleaningFrequency.ONCE_A_MONTH
  }
];

export const frequencyToDescriptionMap = new Map([
  [CleaningFrequency.ONCE, 'Once'],
  [CleaningFrequency.ONCE_A_WEEK, 'Once a week'],
  [CleaningFrequency.EVERY_TWO_WEEKS, 'Every two weeks'],
  [CleaningFrequency.ONCE_A_MONTH, 'Once a month']
]);

export const reservationStatusMap = new Map([
  [ReservationStatus.TO_BE_CONFIRMED, 'To be confirmed'],
  [ReservationStatus.ACTIVE, 'Active'],
  [ReservationStatus.CLOSED, 'Closed'],
  [ReservationStatus.TO_BE_CANCELLED, 'To be cancelled'],
  [ReservationStatus.CANCELLED, 'Cancelled']
]);
