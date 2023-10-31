import { CleaningFrequency } from '~/types/enums';

export const EMPTY_DATA_PLACEHOLDER = '---';
export const DETERGENT_COST = 15;

export const frequencyToDescriptionMap = new Map([
  [CleaningFrequency.ONCE, 'Once'],
  [CleaningFrequency.ONCE_A_WEEK, 'Once a week'],
  [CleaningFrequency.EVERY_TWO_WEEKS, 'Every two weeks'],
  [CleaningFrequency.ONCE_A_MONTH, 'Once a month']
]);

// export const StatusToDescriptionMap = new Map([
//   [Recurring]
