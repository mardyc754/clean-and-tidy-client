export type RadioFieldOption = {
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
