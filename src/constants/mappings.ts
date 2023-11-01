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
  [
    ReservationStatus.TO_BE_CONFIRMED,
    { label: 'To be confirmed', style: 'text-yellow-500' }
  ],
  [ReservationStatus.ACTIVE, { label: 'Active', style: 'text-green-500' }],
  [ReservationStatus.CLOSED, { label: 'Closed', style: '' }],
  [
    ReservationStatus.TO_BE_CANCELLED,
    { label: 'To be cancelled', style: 'text-orange-500' }
  ],
  [ReservationStatus.CANCELLED, { label: 'Cancelled', style: 'text-stone-500' }]
]);
