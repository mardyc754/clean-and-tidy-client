import { CleaningFrequency, Status } from '~/types/enums';

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

export const frequencyToPrefixMap = new Map([
  [CleaningFrequency.ONCE, ''],
  [CleaningFrequency.ONCE_A_WEEK, 'Every '],
  [CleaningFrequency.EVERY_TWO_WEEKS, 'Every second '],
  [CleaningFrequency.ONCE_A_MONTH, 'Once a month on ']
]);

export const reservationStatusMap = new Map([
  [
    Status.TO_BE_CONFIRMED,
    { label: 'To be confirmed', style: 'text-yellow-500' }
  ],
  [Status.ACTIVE, { label: 'Active', style: 'text-green-500' }],
  [Status.CLOSED, { label: 'Closed', style: '' }],
  [
    Status.TO_BE_CANCELLED,
    { label: 'To be cancelled', style: 'text-orange-500' }
  ],
  [Status.CANCELLED, { label: 'Cancelled', style: 'text-stone-500' }],
  [Status.UNKNOWN, { label: 'Unknown', style: '' }]
]);

export const employeeReservationStatusMap = new Map([
  [
    Status.TO_BE_CONFIRMED,
    { label: 'Needs to confirm', style: 'text-yellow-500' }
  ],
  [Status.ACTIVE, { label: 'Accepted', style: 'text-green-500' }],
  [Status.CLOSED, { label: 'Closed', style: '' }],
  [
    Status.TO_BE_CANCELLED,
    { label: 'Needs to confirm cancelation', style: 'text-orange-500' }
  ],
  [Status.CANCELLED, { label: 'Cancelled', style: 'text-stone-500' }],
  [Status.UNKNOWN, { label: 'Unknown', style: '' }]
]);
