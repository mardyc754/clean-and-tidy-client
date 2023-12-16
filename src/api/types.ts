import type { RequireAtLeastOne } from 'type-fest';

import type { CleaningFrequency } from '~/types/enums';

export type AllServicesQueryOptions = RequireAtLeastOne<{
  primaryOnly: boolean;
  includeEmployee: boolean;
}>;

export type ServiceQueryOptions = RequireAtLeastOne<{
  includeSecondaryServices: boolean;
  includePrimaryServices: boolean;
  includeCleaningFrequencies: boolean;
}>;

export type ReservationQueryOptions = RequireAtLeastOne<{
  includeVisits: boolean;
  includeServices: boolean;
  includeAddress: boolean;
}>;

export type VisitQueryOptions = RequireAtLeastOne<{
  includeEmployee: boolean;
}>;

export type ServiceBusyHoursQueryOptions = Partial<{
  period: string;
  serviceIds: number[];
  frequency: Omit<CleaningFrequency, 'ONCE'>;
  excludeFrom?: string;
  excludeTo?: string;
}>;

export type EmployeeBusyHoursQueryOptions = Partial<{
  period: string;
  visitIds: number[];
  frequency: Omit<CleaningFrequency, 'ONCE'>;
  excludeFrom?: string;
  excludeTo?: string;
}>;
