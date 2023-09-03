export type RadioFieldOption = {
  id: string;
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
