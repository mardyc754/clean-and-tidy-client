import type { CleaningFrequency } from './enums';

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

export type CleaningFrequencyData = {
  name: string;
  value: CleaningFrequency;
};

export type NullableDate = Date | null;
// export type ValidDate = NullableDate | [NullableDate, NullableDate];
export type ValidDate = NullableDate;
