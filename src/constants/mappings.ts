import { CleaningFrequency } from '~/types/enums';

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
