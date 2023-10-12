export type RadioFieldOption = {
  value: string;
  name: string;
  details?: string;
};

export type SummaryData = Map<string, string>;

export type StepIndicator = {
  name: string;
  rectangleColorClass: string;
  outerTriangleColorClass?: string;
  innerTriangleColorClass?: string;
};

export type AddressData = {
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  street: string;
  houseNumber: string;
  postcode: string;
  city: string;
  extraInfo?: string;
};

export type ChangeDataMode = 'once' | 'permanently';

export enum CleaningFrequency {
  ONCE = 'ONCE',
  ONCE_A_WEEK = 'ONCE_A_WEEK',
  EVERY_TWO_WEEKS = 'EVERY_TWO_WEEKS',
  ONCE_A_MONTH = 'ONCE_A_MONTH'
}
